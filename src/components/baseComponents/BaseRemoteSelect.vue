<script setup lang="ts" generic="T">
  import { useDebounceFn } from '@vueuse/core'
  import { ref, toRef, watch } from 'vue'
  import { useField } from 'vee-validate'

  type PropsSearchHandler = (
    query?: string,
  ) => Promise<T[]>

  const props = defineProps<{
    initValue?: T
    name: string
    label?: string
    placeholder?: string
    disabled?: boolean
    searchHandler?: PropsSearchHandler
    valueField?: string
    labelField?: string
    initOption?: T[]
    lateInit?: boolean
    searchDependency?: unknown
    uncontrolled?: boolean
  }>()

  const emit = defineEmits<{
    'update:value': [value: string | null | T | string[]]
    'update:global-value': [value: T]
  }>()

  const handleSearch = useDebounceFn(async (query?: string) => {
    if(!props.searchHandler || isLoading.value){
      return
    }
    isLoading.value = true
    let response: T[] | never[] = []
    try {
      response = (await props.searchHandler(query)) as T[]
    } catch (e) {
      response = []
    }
    isLoading.value = false
  }, 400)

  const handleUpdate = (
    optionValue: typeof options.value,
  ) => {
    value.value = optionValue as T
    emit('update:global-value', optionValue as T)
  }

  const options = ref<T[]>(props.initOption || [])
  const isLoading = ref(false)

  // Получаем начальные значения для select
  if (!props.lateInit && !props.initOption) {
    handleSearch()
  }

  watch(
    () => props.searchDependency,
    (newValue, oldValue) => {
      if (newValue === undefined) return

      // Если новое значение зависимости null (дефолтное от vee-validate),
      // то сбрасываем опции
      if (newValue === null) {
        options.value = []
      }

      // Если новое значение есть, то ищем новые зависимые
      if (newValue) {
        handleSearch()
      }

      // Если старого значения не было, то и сбрасывать нечего, иначе меняем в обоих случаях
      if (oldValue) {
        value.value = null
        emit('update:value', null)
      }
    },
  )

  const { value, errorMessage } = useField<T | string | string[] | null>(
    props.name,
    undefined,
    {
      label: ' ',
      controlled: !props.uncontrolled,
      initialValue: props.initValue ? props.initValue : undefined,
    },
  )

  // селект не будет кидать emit на начальное значение от vee-validate
  // поэтому кидаю его вручную
  watch(value, (value) => {
    emit('update:value', value)
  })
</script>

<template>
  <FloatLabel class="flex flex-col h-10 w-full">
    <Select
      class="w-full h-10"
      v-model="value"
      :inputId="name"
      :aria-describedby="name+'-help'"
      showClear
      :invalid="!!errorMessage"
      :options="options"
      :loading="isLoading"
      :optionValue="valueField"
      :optionLabel="labelField"
      filter
      :disabled="disabled"
      @filter="handleSearch($event.value)"
      @update:modelValue="handleUpdate"
    />
    <label :for="name">{{ label }}</label>
    <small v-if="errorMessage" :id="name+'-help'">{{ errorMessage }}</small>

  </FloatLabel>
</template>
