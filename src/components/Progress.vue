<script setup lang="ts">
import { Progress } from '@ark-ui/vue/progress'

defineProps<{
    size?: string
    value: number
    showValue?: boolean
    valueClass?: string
    color?: string
}>()

</script>

<template>

  <Progress.Root :model-value="value" class="flex flex-col items-start gap-2">
    <div class="relative inline-flex items-center justify-center">
      <Progress.Circle class="Circle"     :style="{ '--size': size || '4rem' }">
        <Progress.CircleTrack class="CircleTrack stroke-gray-800"   />
        <Progress.CircleRange class="CircleRange"  :style="{ stroke: color || 'red' }" />
      </Progress.Circle>
      <div class="absolute">
      <Progress.ValueText v-if="showValue" :class="valueClass" />
      </div>
    </div>
  </Progress.Root>
</template>
<style scoped>


.Circle {
  --thickness: 0.375rem;
  &[data-state='indeterminate'] {
    animation: circle-spin 2s linear infinite;
  }
}


.CircleRange {
  stroke: red;
  transition:
    stroke-dasharray 0.6s ease-out,
    stroke 0.6s ease-out;

  &[data-state='indeterminate'] {
    animation: circle-range-indeterminate 1.5s ease-in-out infinite;
  }
}

.ValueText {
  position: absolute;
  font-size: calc(var(--size) * 0.25);
  font-weight: 500;
  
}

@keyframes circle-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 
 * For --size: 4rem (64px), --thickness: 0.375rem (6px)
 * radius = (64 - 6) / 2 = 29px
 * circumference = 2 * π * 29 ≈ 182px
 */
@keyframes circle-range-indeterminate {
  0% {
    stroke-dasharray: 1px 181px;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 91px 91px;
    stroke-dashoffset: -45px;
  }
  100% {
    stroke-dasharray: 91px 91px;
    stroke-dashoffset: -182px;
  }
}


</style>