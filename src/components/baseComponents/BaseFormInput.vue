<script setup lang="ts">
  import { useField } from 'vee-validate' 
  import { ref, toRef, watch } from 'vue'

  const props = defineProps<{
    name: string
    label?: string
    placeholder?: string
    uncontrolled?: boolean
    disabled?: boolean
    initValue?: string
  }>()

  const emit = defineEmits<{
    'update:value': [value: string]
  }>()

  const { value, errorMessage, handleChange } = useField<string>(
    toRef(props, 'name'),
    undefined,
    {
      label: ' ',
      controlled: !props.uncontrolled,
      initialValue: props.initValue ? props.initValue : undefined,
    },
  )

  const formattedValue = ref<string | undefined | null>(value.value)

  const handleUpdateInput = (inputData?: string) => {
    if (!inputData) {
      handleChange(undefined)
      formattedValue.value = null
      return
    }
    handleChange(inputData)
  }

  watch(value, (newValue: string) => {
    handleUpdateInput(newValue)
    emit('update:value', newValue)
  })
</script>

<template>
    <FloatLabel class="flex flex-col h-10 w-full">
      <label :for="name">{{ label }}</label>
      <InputText class="w-full h-10" :placeholder="placeholder" :id="name" :invalid="!!errorMessage" v-model="value" :aria-describedby="name+'-help'" />
      <small v-if="errorMessage" :id="name+'-help'">{{ errorMessage }}</small>
    </FloatLabel>
</template>
