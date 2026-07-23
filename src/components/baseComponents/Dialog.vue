<script setup lang="ts">
import { Dialog } from '@ark-ui/vue/dialog'
import { Tooltip } from '@ark-ui/vue/tooltip'
import { XCircle } from 'lucide-vue-next'
import { useId } from 'vue'

const trigger = useId()
const open = defineModel<boolean>('open', { default: false })

defineProps<{
  title?: string
  tooltip?: string
}>()
</script>

<template>
  <Dialog.Root v-slot="data" v-model:open="open" ref="dialog" :ids="{ trigger }">
    <Tooltip.Root :ids="{ trigger }">
      <Dialog.Trigger asChild>
        <Tooltip.Trigger><slot name="trigger" /></Tooltip.Trigger>
      </Dialog.Trigger>
      <Teleport to="#ui-canvas">
        <Tooltip.Positioner>
          <Tooltip.Content>{{ tooltip }}</Tooltip.Content>
        </Tooltip.Positioner>
      </Teleport>
    </Tooltip.Root>

    <Teleport to="#ui-canvas">
      <Dialog.Backdrop class="fixed top-0 bg-black/40 w-full h-full backdrop-blur-md" />
      <Dialog.Positioner
        class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center"
      >
        <Dialog.Content class="flex flex-col gap-2">
          <div class="flex w-full gap-2">
            <div class="bg-surface w-full rounded-full p-2 flex items-center justify-center">
              <Dialog.Title v-if="title" class="font-semibold text-content">{{
                title
              }}</Dialog.Title>
            </div>

            <Dialog.CloseTrigger class="bg-surface rounded-full p-2"
              ><XCircle />
            </Dialog.CloseTrigger>
          </div>

          <Dialog.Description>
            <slot />
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
