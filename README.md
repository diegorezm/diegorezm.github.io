# Portfolio

A prerendered Preact/Vite portfolio drawn like a notebook: each section is a
different sheet of paper, and every illustration is a seeded pen drawing.
English lives at `/`, Portuguese at `/pt-br/`.

## Editing the content

Everything you'd normally change is in `src/content/`, in both languages:

| What | File |
| --- | --- |
| Email, GitHub, LinkedIn, quest map link | `src/content/site.ts` |
| Projects (add, remove, reorder, `featured`) | `src/content/projects.ts` |
| Jobs, education, certificates | `src/content/experience.ts` |
| Quest stages and the current one | `src/content/quest.ts` |
| Fixed page text (titles, buttons, notes) | `src/i18n.ts` |

A project logo goes in `public/projects/` and is referenced by file name.

## Code layout

- `src/components/` — one component per section (`Hero`, `Projects`,
  `Experience`, `Quest`, `Contact`) plus `Sketch` (drawings and torn edges).
- `src/drawing/scenes.ts` — the pen: builds every drawing as SVG markup from
  a seeded random generator, so prerender and browser output are identical.
- `src/styles/global.css` — all styles.
- `src/seo.ts` — meta tags and JSON-LD.

## Images and icons

`pnpm og` regenerates `public/assets/og.png`, `og-pt.png`, the favicons and
app icons from the same drawing code (needs Chrome or Edge installed).

## Development

```sh
pnpm install
pnpm dev
pnpm build && pnpm preview
```

## GitHub Pages

`.github/workflows/deploy.yml` deploys `main` through GitHub Pages.
