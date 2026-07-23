import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { uid } from 'radash'
import type { ModalName } from '@/models/ModalName'

export const useModalsStore = defineStore('modals', () => {
  //State
  const openedModals = ref<Map<ModalName, string[]>>(new Map())

  //Actions
  const open = (modalName: ModalName, sid?: string) => {
    const modalSid = sid || createModalSid()
    if (openedModals.value.has(modalName)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      openedModals.value.get(modalName).push(modalSid)
      return
    }
    openedModals.value.set(modalName, [modalSid])
  }
  const close = (modalName: ModalName) => {
    openedModals.value.delete(modalName)
  }
  const createModalSid = () => {
    return uid(20)
  }

  // Getters
  const isModalOpen = computed(() => (modalName: ModalName, sid?: string) => {
    if (!openedModals.value.has(modalName)) return false
    const sids = openedModals.value.get(modalName) as string[]
    if (sid) {
      return sids.includes(sid)
    }

    return !!sids.length
  })

  return { openedModals, open, close, isModalOpen, createModalSid }
})
