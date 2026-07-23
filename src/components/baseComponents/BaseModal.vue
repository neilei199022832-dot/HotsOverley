<script setup lang="ts">
import type { ModalName } from '@/models/ModalName';
import { useModalsStore } from '@/stores/modals';
import { whenever } from '@vueuse/core';
import { computed } from 'vue';

const props = defineProps<{
  name: ModalName
  title?: string
  submitButtonTitle?: string
  hiddenButton?: boolean
  cancelButtonTitle?: string
  classModal?: string
  sid?: string
  closeActive?: boolean
}>()

const emit = defineEmits<{
  onSubmitClick: []
  onEnter: []
  onLeave: []
}>()


const { close, isModalOpen } = useModalsStore()
const isOpened = computed(() => isModalOpen(props.name, props.sid))

whenever(isOpened, () => {
  emit('onEnter')
})


</script>

<template>
  <Dialog :visible="isModalOpen(name, sid)"  modal :header="title" :closable="false" :style="{ width: '45rem' }">
    <form @submit.prevent="emit('onSubmitClick')" class="py-2">
    <div class="py-4 flex flex-col gap-8">
    <slot name="default"></slot>
    </div>
    <div class="flex justify-end gap-2">
      <button class="bg-surface-600 p-2 rounded-3 text-content" type="button" label="Закрыть" severity="contrast" @click= "close(name)">Закрыть</button>
      <button class="bg-surface p-2 rounded-3 text-content" type="button"  :label="submitButtonTitle || 'Принять'" severity="success">Принять</button>
    </div>
    </form>
  </Dialog>
</template>