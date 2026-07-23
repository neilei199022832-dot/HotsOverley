import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss';
export default defineConfig({
    presets: [presetWind4()],
    transformers: [transformerDirectives(), transformerVariantGroup()],
    rules: [
        // Surface backgrounds - auto theme switching via CSS variable
        ['bg-surface', { 'background-color': 'var(--color-surface)' }],
        [/^bg-surface-(\d+)$/, (match) => ({ 'background-color': `var(--color-surface-${match[1]})` })],
        ['bg-surface-solid', { 'background-color': 'var(--color-surface-solid)' }],
        ['bg-surface-hover', { 'background-color': 'var(--color-surface-hover)' }],
        ['bg-surface-active', { 'background-color': 'var(--color-surface-active)' }],
        ['bg-surface-muted', { 'background-color': 'var(--color-surface-muted)' }],
        ['bg-surface-elevated', { 'background-color': 'var(--color-surface-elevated)' }],
        ['bg-primary', { 'background-color': 'var(--color-primary)' }],
        ['bg-primary-muted', { 'background-color': 'var(--color-primary-muted)' }],
        // Content/text colors
        ['text-content', { color: 'var(--color-content)' }],
        ['text-content-secondary', { color: 'var(--color-content-secondary)' }],
        ['text-content-tertiary', { color: 'var(--color-content-tertiary)' }],
        ['text-content-inverse', { color: 'var(--color-content-inverse)' }],
        ['text-primary', { color: 'var(--color-primary)' }],
        ['shadow-focus', { 'box-shadow': '0 0 2px 3px var(--color-border-focus)' }],
        ['shadow-hover', { 'box-shadow': '0 0 2px 3px var(--color-surface-hover)' }],
        // Border colors
        ['border-border-default', { 'border-color': 'var(--color-border)' }],
        ['border-border-focus', { 'border-color': 'var(--color-border-focus)' }],
        [
            /^apple-rounding-(\d+)$/,
            ([, d]) => {
                const radius = Number(d);
                // У эппл n ~= 5
                const n = 100 / (radius + 1);
                const points = [];
                const steps = 64;
                for (let i = 0; i <= steps; i++) {
                    const t = (i / steps) * Math.PI * 2;
                    const cosT = Math.cos(t);
                    const sinT = Math.sin(t);
                    const x = Math.pow(Math.abs(cosT), 2 / n) * Math.sign(cosT);
                    const y = Math.pow(Math.abs(sinT), 2 / n) * Math.sign(sinT);
                    const px = 50 + x * 50;
                    const py = 50 + y * 50;
                    points.push(`${px.toFixed(2)}% ${py.toFixed(2)}%`);
                }
                return {
                    'clip-path': `polygon(${points.join(', ')})`,
                    'border-radius': `${radius}px`
                };
            }
        ]
    ],
    shortcuts: [
        // Card shortcut
        ['card', 'bg-surface border-border-default rounded-lg shadow-md'],
        ['card-hover', 'bg-surface-hover'],
        ['card-elevated', 'bg-surface-elevated border-border-default rounded-lg shadow-lg'],
        // Input
        [
            'input-base',
            'bg-surface border-border-default rounded-md px-3 py-2 text-content focus:border-border-focus'
        ],
        // Button base
        [
            'btn',
            'rounded-md px-4 py-2 transition-colors duration-200 cursor-pointer inline-flex items-center justify-center gap-2'
        ],
        ['btn-primary', 'btn bg-primary text-content-inverse hover:opacity-90'],
        ['btn-ghost', 'btn bg-transparent hover:bg-surface-muted text-content'],
        // Text utilities
        ['text-active', 'text-content'],
        ['text-muted', 'text-content-secondary'],
        ['text-hint', 'text-content-tertiary']
    ]
});
