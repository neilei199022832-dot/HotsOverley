<script setup lang="ts">
import { computed, ref } from 'vue'
import { useToggle } from '@vueuse/core'
import { Moon, Sun, Paintbrush } from 'lucide-vue-next'
import {
  useContentPalette,
  useSurfacePalette,
  setContentPalette,
  setSurfacePalette,
  toggleDarkMode,
  isDark,
  paletteOptions,
  type Palette
} from '@/composables/useTheme'
import Popover from '@/components/baseComponents/Popover.vue'

// Toggle dark mode from composable
const toggleDark = useToggle(isDark)

// Palette stores
const contentPalette = useContentPalette()
const surfacePalette = useSurfacePalette()

// Current showing dropdown
const showContentDropdown = ref(false)
const showSurfaceDropdown = ref(false)

function getBaseColor(palette: Palette, isContent: boolean, palettes: typeof paletteOptions) {
  const p = palettes.find((x) => x.value === palette)
  return p?.color || (isContent ? '#1e293b' : '#f0f4f8')
}

function handleDarkToggle() {
  toggleDarkMode()
}
</script>

<template>
  <div class="relative flex flex-col gap-2 p-2">
    <button
      @click="handleDarkToggle"
      class="flex items-center justify-center p-2 rounded-full transition-colors duration-200 cursor-pointer hover:bg-surface-muted"
      :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      aria-label="Toggle dark mode"
    >
      <Sun v-if="isDark" class="w-5 h-5" style="color: #facc15" />
      <Moon v-else class="w-5 h-5 text-primary" />
    </button>

    <div class="relative">
      <Popover>
        <template #trigger>
          <button
            class="flex items-center justify-center p-2 rounded-full transition-colors duration-200 cursor-pointer hover:bg-surface-muted"
            title="Content palette"
            aria-label="Content palette"
          >
            <Paintbrush
              class="w-5 h-5"
              :style="{ color: getBaseColor(contentPalette, true, paletteOptions) }"
            />
          </button>
        </template>

        <div
          class="left-full ml-2 top-0 bg-surface-elevated rounded-lg shadow-lg border border-border-default p-2 pt-0 flex flex-col gap-1 min-w-32 z-50 max-h-64 overflow-y-auto"
          @click.stop
        >
          <span class="text-xs text-content-tertiary px-2 py-1 sticky top-0 bg-surface-elevated"
            >Content</span
          >
          <button
            v-for="p in paletteOptions"
            :key="p.value"
            @click="
              () => {
                setContentPalette(p.value as Palette)
                showContentDropdown = false
              }
            "
            class="flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors"
            :class="contentPalette === p.value ? 'bg-surface-muted' : 'hover:bg-surface-hover'"
          >
            <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: p.color }" />
            <span class="text-sm text-content">{{ p.label }}</span>
          </button>
        </div>
      </Popover>
    </div>

    <div class="relative">
      <Popover>
        <template #trigger>
          <button
            class="flex items-center justify-center p-2 rounded-full transition-colors duration-200 cursor-pointer hover:bg-surface-muted"
            title="Surface palette"
            aria-label="Surface palette"
          >
            <span
              class="w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
              :style="{
                backgroundColor: getBaseColor(surfacePalette, false, paletteOptions),
                color: '#fff'
              }"
            >
              S
            </span>
          </button></template
        >

        <div
          class="left-full ml-2 top-0 bg-surface-elevated rounded-lg shadow-lg border border-border-default p-2 pt-0 flex flex-col gap-1 min-w-32 z-50 max-h-64 overflow-y-auto"
          @click.stop
        >
          <span class="text-xs text-content-tertiary px-2 py-1 sticky top-0 bg-surface-elevated"
            >Surface</span
          >
          <button
            v-for="p in paletteOptions"
            :key="p.value"
            @click="
              () => {
                setSurfacePalette(p.value as Palette)
                showSurfaceDropdown = false
              }
            "
            class="flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors"
            :class="surfacePalette === p.value ? 'bg-surface-muted' : 'hover:bg-surface-hover'"
          >
            <span class="w-3 h-3 rounded-full" :style="{ backgroundColor: p.color }" />
            <span class="text-sm text-content">{{ p.label }}</span>
          </button>
        </div>
      </Popover>
    </div>
  </div>
</template>
