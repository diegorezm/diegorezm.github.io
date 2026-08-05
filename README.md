# Portfolio

A fast, prerendered Preact/Vite portfolio that behaves like a small Macintosh desktop.

The Finder shell stays mounted while the inner page changes, so window position,
size, and other desktop state persist across navigation.

## Development

```sh
pnpm install
pnpm dev
```

Build and preview the static output with:

```sh
pnpm build
pnpm preview
```

`preact-iso` handles page navigation and `@preact/preset-vite` prerenders the
routes during the production build.

## GitHub Pages

`.github/workflows/deploy.yml` deploys `main` through GitHub Pages. The Vite
config reads `GITHUB_REPOSITORY` in CI and automatically sets the repository
subpath for project pages.

In the repository settings, open **Pages**, choose **GitHub Actions** as the
source, and push to `main` to deploy.
