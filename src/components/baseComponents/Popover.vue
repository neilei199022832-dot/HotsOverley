<script setup lang="ts">
import { Popover } from '@ark-ui/vue/popover'
import { XIcon } from 'lucide-vue-next'
</script>

<template>
  <Popover.Root
    :positioning="{
      placement: 'right-start'
    }"
  >
    <div>
      <Popover.Trigger><slot name="trigger" /></Popover.Trigger>
    </div>

    <Popover.Positioner>
      <Popover.Content class="flex flex-col gap-2">
        <Popover.Description><slot /></Popover.Description>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
