// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

const repository = process.env.GITHUB_REPOSITORY;
const [owner, name] = repository?.split('/') ?? [];
const isUserSite = owner && name === `${owner}.github.io`;

// https://astro.build/config
export default defineConfig({
  site: owner && name ? `https://${owner}.github.io` : undefined,
  base: owner && name && !isUserSite ? `/${name}` : undefined,
  vite: {
    plugins: [tailwindcss()]
  }
});
