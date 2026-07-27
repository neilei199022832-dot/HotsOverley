<script setup lang="ts">
  import { Popover } from '@ark-ui/vue/popover'
  import { Tooltip } from '@ark-ui/vue/tooltip'
  import { Teleport, toRef, computed } from 'vue'

  const open = defineModel<boolean>('open', { default: false })
  const { side = 'tl', type = 'popover' } = defineProps<{
    width?: number
    height?: number
    contentClass?: string
    triggerClass?: string
    side?: 'tl' | 'tr' | 'bl' | 'br' | 'none'
    type?: 'popover' | 'tooltip'
  }>()

  const Component = computed(() => (type === 'tooltip' ? Tooltip : Popover))

  const isTooltip = computed(() => type === 'tooltip')

  const rounding = toRef(() => {
    return {
      'rounded-tl-3': side === 'tl',
      'rounded-tr-3': side === 'tr',
      'rounded-bl-3': side === 'bl',
      'rounded-br-3': side === 'br',
    }
  })
</script>

<template>
  <component
    :is="Component.Root"
    v-model:open="open"
    lazy-mount
    unmount-on-exit
    :interactive="isTooltip"
  >
    <component :is="Component.Trigger" :class="triggerClass">
      <slot name="trigger" />
    </component>
    <Teleport to="body">
      <component :is="Component.Positioner">
        <component
          :is="Component.Content"
          class="popover-content bg-#1C1D1F66 backdrop-blur-4 rounded-24px p-4"
          :class="[rounding, contentClass]"
          :style="{ width: `${width}px`, height: `${height}px` }"
        >
          <slot name="content" />
        </component>
      </component>
    </Teleport>
  </component>
</template>

<style scoped>
  .popover-content {
    transform-origin: var(--transform-origin);
  }

  .popover-content[data-state='open'] {
    animation: popover-in 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .popover-content[data-state='closed'] {
    animation: popover-out 0.16s cubic-bezier(0.4, 0, 1, 1);
  }

  .popover-content[data-state='open'][data-side='top'] {
    animation-name: popover-in-top;
  }

  .popover-content[data-state='open'][data-side='bottom'] {
    animation-name: popover-in-bottom;
  }

  .popover-content[data-state='open'][data-side='left'] {
    animation-name: popover-in-left;
  }

  .popover-content[data-state='open'][data-side='right'] {
    animation-name: popover-in-right;
  }

  .popover-content[data-state='closed'][data-side='top'] {
    animation-name: popover-out-top;
  }

  .popover-content[data-state='closed'][data-side='bottom'] {
    animation-name: popover-out-bottom;
  }

  .popover-content[data-state='closed'][data-side='left'] {
    animation-name: popover-out-left;
  }

  .popover-content[data-state='closed'][data-side='right'] {
    animation-name: popover-out-right;
  }

  @keyframes popover-in {
    from {
      opacity: 0;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes popover-out {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.94);
    }
  }

  @keyframes popover-in-top {
    from {
      opacity: 0;
      transform: scale(0.92) translateY(6px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes popover-in-bottom {
    from {
      opacity: 0;
      transform: scale(0.92) translateY(-6px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes popover-in-left {
    from {
      opacity: 0;
      transform: scale(0.92) translateX(6px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
  }

  @keyframes popover-in-right {
    from {
      opacity: 0;
      transform: scale(0.92) translateX(-6px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
  }

  @keyframes popover-out-top {
    from {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    to {
      opacity: 0;
      transform: scale(0.94) translateY(4px);
    }
  }

  @keyframes popover-out-bottom {
    from {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    to {
      opacity: 0;
      transform: scale(0.94) translateY(-4px);
    }
  }

  @keyframes popover-out-left {
    from {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
    to {
      opacity: 0;
      transform: scale(0.94) translateX(4px);
    }
  }

  @keyframes popover-out-right {
    from {
      opacity: 1;
      transform: scale(1) translateX(0);
    }
    to {
      opacity: 0;
      transform: scale(0.94) translateX(-4px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .popover-content[data-state='open'],
    .popover-content[data-state='closed'] {
      animation: none;
    }
  }
</style>
