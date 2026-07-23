import { useDark, useStorage } from '@vueuse/core'

// Color palette types - expanded with all Tailwind color families
export type Palette =
  // Grays (neutral)
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  // Warm
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  // Green teal
  | 'green'
  | 'emerald'
  | 'teal'
  // Blue purple
  | 'blue'
  | 'sky'
  | 'indigo'
  | 'violet'
  | 'purple'
  // Pink rose
  | 'pink'
  | 'rose'

// Theme layer types
export type ThemeLayer = 'content' | 'surface'

// Storage keys
const CONTENT_PALETTE_KEY = 'theme-content-palette'
const SURFACE_PALETTE_KEY = 'theme-surface-palette'

// Map palette to its base Tailwind colors (used for content lookups)
const paletteBaseColors: Record<string, { content: string; surface: string }> = {
  slate: { content: '#1e293b', surface: '#f0f4f8' },
  gray: { content: '#374151', surface: '#f3f4f6' },
  zinc: { content: '#3f3f46', surface: '#f4f4f5' },
  neutral: { content: '#3f3f46', surface: '#f5f5f4' },
  red: { content: '#991b1b', surface: '#fef2f2' },
  orange: { content: '#9a3412', surface: '#fff7ed' },
  amber: { content: '#92400e', surface: '#fffbeb' },
  yellow: { content: '#854d0e', surface: '#fefce8' },
  green: { content: '#166534', surface: '#f0fdf4' },
  emerald: { content: '#065f46', surface: '#ecfdf5' },
  teal: { content: '#115e59', surface: '#f0fdfa' },
  blue: { content: '#1e40af', surface: '#eff6ff' },
  sky: { content: '#075985', surface: '#f0f9ff' },
  indigo: { content: '#3730a3', surface: '#eef2ff' },
  violet: { content: '#5b21b6', surface: '#f5f3ff' },
  purple: { content: '#6b21a9', surface: '#faf5ff' },
  pink: { content: '#9d174d', surface: '#fdf2f8' },
  rose: { content: '#9f1239', surface: '#fff1f2' }
}

// Generate palette with given color as accent
function generatePalette(
  palette: string,
  isDarkMode: boolean,
  isContent: boolean
): Record<string, string> {
  const base = paletteBaseColors[palette]
  if (!base) return {}

  const mainColor = isContent ? base.content : base.surface

  // Generate tints
  const hsl = hexToHsl(mainColor)

  if (isContent) {
    // Content: text colors
    return isDarkMode
      ? {
          '--color-content': `hsl(${hsl.h}, ${hsl.s}%, 95%)`,
          '--color-content-secondary': `hsl(${hsl.h}, ${hsl.s}%, 80%)`,
          '--color-content-tertiary': `hsl(${hsl.h}, ${hsl.s}%, 60%)`,
          '--color-content-inverse': `hsl(${hsl.h}, ${hsl.s}%, 10%)`,
          '--color-border': `hsl(${hsl.h}, ${hsl.s}%, 30%)`,
          '--color-border-focus': `hsl(${hsl.h}, ${hsl.s}%, 55%)`
        }
      : {
          '--color-content': `hsl(${hsl.h}, ${hsl.s}%, 15%)`,
          '--color-content-secondary': `hsl(${hsl.h}, ${hsl.s}%, 35%)`,
          '--color-content-tertiary': `hsl(${hsl.h}, ${hsl.s}%, 55%)`,
          '--color-content-inverse': '#ffffff',
          '--color-border': `hsl(${hsl.h}, ${hsl.s}%, 85%)`,
          '--color-border-focus': `hsl(${hsl.h}, ${hsl.s}%, 50%)`
        }
  } else {
    // Surface: background colors
    return isDarkMode
      ? {
          '--color-surface': `hsl(${hsl.h}, ${hsl.s}%, 15%)`,
          '--color-surface-hover': `hsl(${hsl.h}, ${hsl.s}%, 22%)`,
          '--color-surface-active': `hsl(${hsl.h}, ${hsl.s}%, 30%)`,
          '--color-surface-muted': `hsl(${hsl.h}, ${hsl.s}%, 25%)`,
          '--color-surface-solid': `hsl(${hsl.h}, ${hsl.s}%, 8%)`,
          '--color-surface-elevated': `hsl(${hsl.h}, ${hsl.s}%, 12%)`,

          '--df-color-background': `hsl(${hsl.h}, ${hsl.s}%, 15%)`,
          '--df-color-background-hover': `hsl(${hsl.h}, ${hsl.s}%, 22%)`,
          '--df-color-background-active': `hsl(${hsl.h}, ${hsl.s}%, 30%)`,
          '--df-color-background-muted': `hsl(${hsl.h}, ${hsl.s}%, 25%)`,
          '--df-color-background-solid': `hsl(${hsl.h}, ${hsl.s}%, 8%)`,
          '--df-color-border': `var(--color-border)`,
          '--df-text-primary': `var(--color-content)`,
          '--df-color-foreground': `var(--color-content)`,

          '--color-surface-0': `hsl(${hsl.h}, ${hsl.s}%, 10%)`,
          '--color-surface-50': `hsl(${hsl.h}, ${hsl.s}%, 15%)`,
          '--color-surface-100': `hsl(${hsl.h}, ${hsl.s}%, 20%)`,
          '--color-surface-200': `hsl(${hsl.h}, ${hsl.s}%, 25%)`,
          '--color-surface-300': `hsl(${hsl.h}, ${hsl.s}%, 30%)`,
          '--color-surface-400': `hsl(${hsl.h}, ${hsl.s}%, 35%)`,
          '--color-surface-500': `hsl(${hsl.h}, ${hsl.s}%, 40%)`,
          '--color-surface-600': `hsl(${hsl.h}, ${hsl.s}%, 45%)`,
          '--color-surface-700': `hsl(${hsl.h}, ${hsl.s}%, 50%)`,
          '--color-surface-800': `hsl(${hsl.h}, ${hsl.s}%, 55%)`,
          '--color-surface-900': `hsl(${hsl.h}, ${hsl.s}%, 60%)`,
          '--color-surface-950': `hsl(${hsl.h}, ${hsl.s}%, 65%)`,
          '--color-surface-1000': `hsl(${hsl.h}, ${hsl.s}%, 70%)`,

          '--p-surface-0': `hsl(${hsl.h}, ${hsl.s}%, 10%)`,
          '--p-surface-50': `hsl(${hsl.h}, ${hsl.s}%, 15%)`,
          '--p-surface-100': `hsl(${hsl.h}, ${hsl.s}%, 20%)`,
          '--p-surface-200': `hsl(${hsl.h}, ${hsl.s}%, 25%)`,
          '--p-surface-300': `hsl(${hsl.h}, ${hsl.s}%, 30%)`,
          '--p-surface-400': `hsl(${hsl.h}, ${hsl.s}%, 35%)`,
          '--p-surface-500': `hsl(${hsl.h}, ${hsl.s}%, 40%)`,
          '--p-surface-600': `hsl(${hsl.h}, ${hsl.s}%, 45%)`,
          '--p-surface-700': `hsl(${hsl.h}, ${hsl.s}%, 50%)`,
          '--p-surface-800': `hsl(${hsl.h}, ${hsl.s}%, 55%)`,
          '--p-surface-900': `hsl(${hsl.h}, ${hsl.s}%, 60%)`,
          '--p-surface-950': `hsl(${hsl.h}, ${hsl.s}%, 65%)`,
          '--p-surface-1000': `hsl(${hsl.h}, ${hsl.s}%, 70%)`
        }
      : {
          '--color-surface': `hsl(${hsl.h}, ${hsl.s}%, 97%)`,
          '--color-surface-hover': `hsl(${hsl.h}, ${hsl.s}%, 95%)`,
          '--color-surface-active': `hsl(${hsl.h}, ${hsl.s}%, 92%)`,
          '--color-surface-muted': `hsl(${hsl.h}, ${hsl.s}%, 94%)`,
          '--color-surface-solid': `hsl(${hsl.h}, ${hsl.s}%, 100%)`,
          '--color-surface-elevated': `hsl(${hsl.h}, ${hsl.s}%, 100%)`,

          '--df-color-background': `hsl(${hsl.h}, ${hsl.s}%, 97%)`,
          '--df-color-background-hover': `hsl(${hsl.h}, ${hsl.s}%, 95%)`,
          '--df-color-background-active': `hsl(${hsl.h}, ${hsl.s}%, 92%)`,
          '--df-color-background-muted': `hsl(${hsl.h}, ${hsl.s}%, 94%)`,
          '--df-color-background-solid': `hsl(${hsl.h}, ${hsl.s}%, 100%)`,
          '--df-color-border': `var(--color-border)`,
          '--df-text-primary': `var(--color-content)`,
          '--df-color-foreground': `var(--color-content)`,

          '--color-surface-0': `hsl(${hsl.h}, ${hsl.s}%, 10%)`,
          '--color-surface-50': `hsl(${hsl.h}, ${hsl.s}%, 15%)`,
          '--color-surface-100': `hsl(${hsl.h}, ${hsl.s}%, 20%)`,
          '--color-surface-200': `hsl(${hsl.h}, ${hsl.s}%, 25%)`,
          '--color-surface-300': `hsl(${hsl.h}, ${hsl.s}%, 30%)`,
          '--color-surface-400': `hsl(${hsl.h}, ${hsl.s}%, 35%)`,
          '--color-surface-500': `hsl(${hsl.h}, ${hsl.s}%, 40%)`,
          '--color-surface-600': `hsl(${hsl.h}, ${hsl.s}%, 45%)`,
          '--color-surface-700': `hsl(${hsl.h}, ${hsl.s}%, 50%)`,
          '--color-surface-800': `hsl(${hsl.h}, ${hsl.s}%, 55%)`,
          '--color-surface-900': `hsl(${hsl.h}, ${hsl.s}%, 60%)`,
          '--color-surface-950': `hsl(${hsl.h}, ${hsl.s}%, 65%)`,
          '--color-surface-1000': `hsl(${hsl.h}, ${hsl.s}%, 70%)`,

          '--p-surface-0': `hsl(${hsl.h}, ${hsl.s}%, 10%)`,
          '--p-surface-50': `hsl(${hsl.h}, ${hsl.s}%, 15%)`,
          '--p-surface-100': `hsl(${hsl.h}, ${hsl.s}%, 20%)`,
          '--p-surface-200': `hsl(${hsl.h}, ${hsl.s}%, 25%)`,
          '--p-surface-300': `hsl(${hsl.h}, ${hsl.s}%, 30%)`,
          '--p-surface-400': `hsl(${hsl.h}, ${hsl.s}%, 35%)`,
          '--p-surface-500': `hsl(${hsl.h}, ${hsl.s}%, 40%)`,
          '--p-surface-600': `hsl(${hsl.h}, ${hsl.s}%, 45%)`,
          '--p-surface-700': `hsl(${hsl.h}, ${hsl.s}%, 50%)`,
          '--p-surface-800': `hsl(${hsl.h}, ${hsl.s}%, 55%)`,
          '--p-surface-900': `hsl(${hsl.h}, ${hsl.s}%, 60%)`,
          '--p-surface-950': `hsl(${hsl.h}, ${hsl.s}%, 65%)`,
          '--p-surface-1000': `hsl(${hsl.h}, ${hsl.s}%, 70%)`
        }
  }
}

// Helper: convert hex to HSL
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { h: 210, s: 50, l: 50 }

  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = 0,
    s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

// Exportable palette options for UI
export const paletteOptions = Object.keys(paletteBaseColors).map((key) => ({
  value: key,
  label: key.charAt(0).toUpperCase() + key.slice(1),
  color: paletteBaseColors[key].content
}))

// Create content palette store
export const useContentPalette = () => {
  return useStorage<Palette>(CONTENT_PALETTE_KEY, 'slate')
}

// Create surface palette store
export const useSurfacePalette = () => {
  return useStorage<Palette>(SURFACE_PALETTE_KEY, 'slate')
}

// Create dark mode detection
export const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light'
})

// Apply CSS variables for a palette
function applyPalette(layer: ThemeLayer, palette: Palette, dark: boolean) {
  const variables = generatePalette(palette, dark, layer === 'content')
  const root = document.documentElement

  for (const [key, value] of Object.entries(variables)) {
    root.style.setProperty(key, value)
  }
}

// Initialize themes
export function initThemes() {
  const content = useContentPalette()
  const surface = useSurfacePalette()
  const dark = isDark.value

  applyPalette('content', content.value, dark)
  applyPalette('surface', surface.value, dark)

  return { content, surface }
}

// Switch content palette
export function setContentPalette(palette: Palette) {
  const store = useContentPalette()
  store.value = palette
  applyPalette('content', palette, isDark.value)
}

// Switch surface palette
export function setSurfacePalette(palette: Palette) {
  const store = useSurfacePalette()
  store.value = palette
  applyPalette('surface', palette, isDark.value)
}

// Toggle dark mode and reapply palettes
export function toggleDarkMode() {
  isDark.value = !isDark.value
  const content = useContentPalette()
  const surface = useSurfacePalette()
  applyPalette('content', content.value, isDark.value)
  applyPalette('surface', surface.value, isDark.value)
}
