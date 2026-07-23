<script setup lang="ts">
import { ScrollArea } from '@ark-ui/vue/scroll-area'

defineProps<{
    height: string
}>()

</script>

<template>
  <ScrollArea.Root :style="{height: height}">
    <ScrollArea.Viewport class="Viewport">
      <ScrollArea.Content>
        <slot />
      </ScrollArea.Content>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar class="Scrollbar bg-gray-800 ">
      <ScrollArea.Thumb class="Thumb bg-gray-200" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner class="Corner" />
  </ScrollArea.Root>
</template>

<style >


.Viewport {
  height: 100%;
  outline: 1px solid var(--demo-border);
  outline-offset: -1px;
  overscroll-behavior: contain;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus-visible {
    outline: 2px solid var(--demo-coral-solid);
  }
}


.Scrollbar {
  display: flex;
  position: relative;
  
  border-radius: 0.375rem;
  margin: 0.5rem;
  opacity: 0;
  transition: opacity 150ms;
  pointer-events: none;

  &::before {
    content: '';
    position: absolute;
  }

  &[data-scrolling] {
    transition-duration: 0ms;
  }

  &[data-hover],
  &[data-scrolling] {
    opacity: 1;
    pointer-events: auto;
  }

  &[data-orientation='vertical'] {
    width: 0.25rem;

    &::before {
      width: 1.25rem;
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
    }

    &:not([data-overflow-y]) {
      display: none;
    }
  }

  &[data-orientation='horizontal'] {
    height: 0.25rem;

    &::before {
      width: 100%;
      height: 1.25rem;
      left: 0;
      right: 0;
      bottom: -0.5rem;
    }

    &:not([data-overflow-x]) {
      display: none;
    }
  }
}

.Thumb {
  width: 100%;
  border-radius: inherit;
  

  [data-orientation='horizontal'] & {
    width: unset;
    height: 100%;
  }
}

.Corner {
  background-color: transparent;
}

</style>