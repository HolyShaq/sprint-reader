![GitHub Repo Banner](https://ghrb.waren.build/banner?header=%F0%9F%93%96+ReadMeFast+%F0%9F%8F%83%E2%80%8D%E2%9E%A1%EF%B8%8F&bg=431586-9231A8&color=FFFFFF&headerfont=Racing+Sans+One&watermarkpos=bottom-right)
<!-- Created with GitHub Repo Banner by Waren Gonzaga: https://ghrb.waren.build -->
<p align="center">
  <img src="https://img.shields.io/github/license/HolyShaq/readmefast?style=flat-square" alt="License" />
  <img src="https://img.shields.io/github/repo-size/HolyShaq/readmefast?style=flat-square" alt="Repo Size" />
  <br />
  <img src="https://img.shields.io/badge/Svelte-FF3E00?style=flat-square&logo=svelte&logoColor=white" alt="Svelte" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

A Rapid Serial Visual Presentation (RSVP) speed reading web app. ReadMeFast displays text one word at a time in a fixed position, eliminating eye movement and highlighting each word's **Optimal Recognition Point (ORP)** — the letter where the brain recognizes words fastest.

🌐 Try it out [here](https://readmefast.netlify.app/)!

## Features
- **RSVP Reader** — word-by-word display with ORP highlighting and adjustable speed (50–1000 WPM)
- **Dynamic timing** — automatic delays after punctuation (commas, periods, etc.) for natural pacing
- **Typography controls** — choose from 9 font families and adjust font size and word offset
- **Visual aids** — optional progress bar, guidelines, word chunks, and control panel
- **Word chunk display** — optionally display surrounding words around the current word
- **Dark / light mode** — system-aware theme with a manual toggle
- **Persistent settings** — all preferences saved to `localStorage` and restored on next visit
- **Demo content** — built-in preset texts and longer article excerpts to get started instantly

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `Space` | Play / Pause |
| `←` / `→` | Previous / next word |
| `↑` / `↓` | Increase / decrease WPM |
| `Esc` | Return to input screen |
| Mouse wheel | Scroll through words |


## Contributing
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

## Deployment

The project is configured for [Netlify](https://netlify.com). Push to your connected branch and Netlify will build and deploy automatically using the settings in `svelte.config.js`.

## License

MIT
