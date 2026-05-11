# ReadMeFast

A Rapid Serial Visual Presentation (RSVP) speed reading web app. ReadMeFast displays text one word at a time in a fixed position, eliminating eye movement and highlighting each word's **Optimal Recognition Point (ORP)** — the letter where the brain recognizes words fastest.

## Features

- **RSVP Reader** — word-by-word display with ORP highlighting and adjustable speed (50–1000 WPM)
- **Dynamic timing** — automatic delays after punctuation (commas, periods, etc.) for natural pacing
- **Typography controls** — choose from 9 font families and adjust font size and word offset
- **Visual aids** — optional progress bar, guidelines, word chunks, and control panel
- **Dark / light mode** — system-aware theme with a manual toggle
- **Persistent settings** — all preferences saved to `localStorage` and restored on next visit
- **Demo content** — built-in preset texts and longer article excerpts to get started instantly

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [SvelteKit](https://kit.svelte.dev/) + Svelte 5 |
| Styling | Tailwind CSS 4, bits-ui, Lucide icons |
| Language | TypeScript (strict) |
| Build | Vite 7 |
| Deployment | Netlify (via `@sveltejs/adapter-netlify`) |
| Persistence | svelte-persisted-store (localStorage) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview   # preview the built output locally
```

### Type Checking

```bash
npm run check          # run once
npm run check:watch    # watch mode
```

## Project Structure

```
src/
├── routes/
│   ├── +page.svelte          # App entry point (routes between input/read modes)
│   ├── +layout.svelte        # Global layout with dark mode
│   └── layout.css            # Global styles, fonts, CSS variables
└── lib/
    ├── rsvp.ts               # ORP calculation and word-timing logic
    ├── stores/settings.ts    # Persisted user settings store
    ├── preset.ts             # Short educational preset texts
    ├── presetInputs.ts       # Longer article excerpts
    ├── utils.ts              # Shared utilities (cn, clamp, stripTrailing)
    └── components/
        ├── InputPage.svelte      # Text input screen
        ├── ReadPage.svelte       # RSVP reader interface
        ├── SettingsModal.svelte  # Settings dialog
        ├── ControlHelpModal.svelte # Keyboard shortcuts reference
        └── ui/                   # Headless UI primitives (button, dialog, slider, …)
```

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `Space` | Play / Pause |
| `←` / `→` | Previous / next word |
| `↑` / `↓` | Increase / decrease WPM |
| `Esc` | Return to input screen |
| Mouse wheel | Scroll through words |

## Deployment

The project is configured for [Netlify](https://netlify.com). Push to your connected branch and Netlify will build and deploy automatically using the settings in `svelte.config.js`.

## License

MIT
