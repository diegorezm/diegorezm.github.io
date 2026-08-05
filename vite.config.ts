import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

const repository = process.env.GITHUB_REPOSITORY;
const [, name] = repository?.split("/") ?? [];
const isUserSite = name?.endsWith(".github.io");

export default defineConfig({
  base: name && !isUserSite ? `/${name}/` : "/",
  plugins: [
    preact({
      prerender: {
        enabled: true,
        additionalPrerenderRoutes: ["/pt-br/"],
      },
    }),
  ],
});
