<script setup lang="ts">
import { Tooltip } from '@ark-ui/vue/tooltip'
import { ref, Teleport } from 'vue'
import { Popover } from '@ark-ui/vue/popover'
import { sleep } from 'radash'
import { OnClickOutside  } from '@vueuse/components'
const open = ref(false)

const onClose = async() => {
  
  sleep(100)
  open.value = false
}

const onEnter = async() => {
  open.value = true
}
</script>

<template>
  <OnClickOutside @trigger="onClose" >
    <Popover.Root  :open="open" :lazy-mount="true" :unmount-on-exit="true">
    <Popover.Trigger @contextmenu.prevent @click.left="onClose" @click.right="onEnter" class="Trigger"><slot></slot></Popover.Trigger>
    <Teleport to="body">
      <Popover.Positioner>
        <Popover.Content  class="max-w-600px p-4 rounded-2xl backdrop-blur-xs bg-gray-500/90"><slot name="content" /></Popover.Content>
      </Popover.Positioner>
    </Teleport>
  </Popover.Root>
  </OnClickOutside>
</template>
<style scoped>
.Trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding-inline: 1rem;
padding-block: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  font-family: inherit;
  line-height: 1.25rem;
  border-radius: 0.375rem;

  user-select: none;
  white-space: nowrap;
  transition:
    background 150ms,
    border-color 150ms,
    color 150ms;

  background: transparent;
  border: 1px solid var(--demo-border-emphasized);
  color: var(--demo-neutral-fg);

  &:is(:hover, [aria-expanded='true']):not(:disabled, [data-disabled]) {
    background: var(--demo-neutral-subtle);
  }

  &:focus-visible {
    outline: 2px solid var(--demo-coral-focus-ring);
    outline-offset: -1px;
  }

  &:is(:disabled, [data-disabled]) {
    opacity: 0.5;
    filter: grayscale(100%);
  }
}

.Content {
  --arrow-background: var(--demo-bg-popover);
  --arrow-size: 10px;
  position: relative;
  color: var(--fg-inverted);
  padding-inline: 0.625rem;
  padding-block: 0.25rem;
  border-radius: 0.25rem;
  border: 1px solid var(--demo-border-muted);
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.25rem;
  box-shadow: var(--demo-shadow-md);
  max-width: 20rem;
  z-index: calc(var(--demo-popover-z-index) + var(--layer-index, 0));
  transform-origin: var(--transform-origin);

  &[data-state='open'] {
    animation: scale-fade-in 0.15s ease-out;
  }

  &[data-state='closed'] {
    animation: scale-fade-out 0.1s ease-in;
  }
}

.ArrowTip {
  border-top: 1px solid var(--demo-border-muted);
  border-left: 1px solid var(--demo-border-muted);
}

.Toolbar {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
  border: 1px solid var(--demo-border);
  border-radius: 0.5rem;
  background: var(--demo-bg-popover);
}

.ToolbarButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  color: var(--demo-neutral-fg);
  cursor: pointer;
  transition: background 150ms;

  & svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background: var(--demo-neutral-subtle);
  }
}

.Shortcut {
  color: var(--demo-neutral-emphasized);
  font-size: 0.6875rem;
}

@keyframes scale-fade-in {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scale-fade-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.96);
  }
}
:root {
  /* Coral semantic tokens */
  --demo-coral-solid: #eb5e41;
  --demo-coral-emphasized: #de5045;
  --demo-coral-muted: #ffdbda;
  --demo-coral-subtle: #ffe5e4;
  --demo-coral-fg: #c9453b;
  --demo-coral-contrast: white;
  --demo-coral-focus-ring: #ffb2a8;

  /* Neutral semantic tokens (Sand from park-ui) */
  --demo-neutral-solid: #8d8d86;
  --demo-neutral-emphasized: #82827c;
  --demo-neutral-muted: #e2e1de;
  --demo-neutral-subtle: #f1f0ef;
  --demo-neutral-fg: #21201c;
  --demo-neutral-fg-muted: #61605b;
  --demo-neutral-contrast: white;
  --demo-neutral-focus-ring: #bcbbb5;

  /* Border semantic tokens */
  --demo-border: #e9e8e6;
  --demo-border-muted: #f9f9f8;
  --demo-border-emphasized: #dad9d6;

  /* Error semantic tokens */
  --demo-error: #ff4444;

  /* Popover */
  --demo-bg-popover: white;
  --demo-bg-thumb: white;
  --demo-bg-checkbox: white;

  /* Z-index tokens */
  --demo-popover-z-index: 50;

  /* Shadow tokens (soft, modern shadows) */
  --demo-shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --demo-shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08);
  --demo-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06);
  --demo-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.04);
  --demo-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.04);
  --demo-shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.15);

  /* JSON tree view */
  --demo-json-string: #c9453b;
  --demo-json-number: #0550ae;
  --demo-json-boolean: #b35900;
  --demo-json-key: #116329;
  --demo-json-accent: #6f42c1;
}

.dark {
  /* Coral dark mode */
  --demo-coral-solid: #eb5e41;
  --demo-coral-emphasized: #ef6b4e;
  --demo-coral-muted: #722b25;
  --demo-coral-subtle: #55221e;
  --demo-coral-fg: #f47a5c;
  --demo-coral-contrast: white;
  --demo-coral-focus-ring: #e2503f;

  /* Neutral dark mode (Sand from park-ui) */
  --demo-neutral-solid: #6f6d66;
  --demo-neutral-emphasized: #7c7b74;
  --demo-neutral-muted: #31312e;
  --demo-neutral-subtle: #222221;
  --demo-neutral-fg: #eeeeec;
  --demo-neutral-fg-muted: #a9a9a3;
  --demo-neutral-contrast: white;
  --demo-neutral-focus-ring: #62605b;

  /* Border dark mode */
  --demo-border: #2a2a28;
  --demo-border-muted: #191918;
  --demo-border-emphasized: #3b3a37;

  /* Error dark mode */
  --demo-error: #ff4444;

  /* Popover dark mode */
  --demo-bg-popover: #111110;
  --demo-bg-thumb: #111110;
  --demo-bg-checkbox: #111110;

  /* Shadow tokens dark mode (slightly higher opacity for visibility) */
  --demo-shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.15);
  --demo-shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.2), 0 1px 2px -1px rgb(0 0 0 / 0.15);
  --demo-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.12);
  --demo-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.2), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --demo-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.25), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --demo-shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.35);

  /* JSON tree view dark mode */
  --demo-json-string: #ff7b72;
  --demo-json-number: #79c0ff;
  --demo-json-boolean: #ffa657;
  --demo-json-key: #7ee787;
  --demo-json-accent: #d2a8ff;
}


/* Utility classes for example layouts */

[hidden] {
  display: none !important;
}

output {
  display: flex;
  max-width: 32rem;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid var(--demo-border-emphasized);
  padding: 0.5rem 0.625rem;
  margin-bottom: 0.5rem;
  font-family: monospace;
  max-height: 200px;
  overflow-y: auto;
  font-size: 0.725rem;

  .title {
    font-weight: 600;
  }
}

.stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.vstack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.hstack {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}


@import url('https://fonts.googleapis.com/css2?family=Wix+Madefor+Text:ital,wght@0,400..800;1,400..800&display=swap');
body {
  font-family:
    'Wix Madefor Text',
    system-ui,
    -apple-system,
    sans-serif;
  position: relative;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font: inherit;
}

#root,
#storybook-root {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 3rem;
  isolation: isolate;
}


</style>