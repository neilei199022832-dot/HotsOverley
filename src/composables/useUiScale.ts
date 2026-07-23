/** Design baseline — layout is authored for 2K, then scaled to fit the viewport. */
export const DESIGN_WIDTH = 2560
export const DESIGN_HEIGHT = 1440

function applyUiScale() {
  const scale = Math.min(
    window.innerWidth / DESIGN_WIDTH,
    window.innerHeight / DESIGN_HEIGHT,
    1,
  )
  document.documentElement.style.setProperty('--ui-scale', String(scale))
}

/** Keeps the 2K canvas fitting inside 1920 / 1600 / any smaller window. */
export function initUiScale() {
  applyUiScale()
  window.addEventListener('resize', applyUiScale)
}
