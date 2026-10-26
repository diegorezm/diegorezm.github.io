import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

const repository = process.env.GITHUB_REPOSITORY;
const [, name] = repository?.split("/") ?? [];
const isUserSite = name?.endsWith(".github.io");

export default defineConfig({
  base: name && !isUserSite ? `/${name}/` : "/",
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
  plugins: [
    preact({
      prerender: {
        enabled: true,
        renderTarget: "#app",
        additionalPrerenderRoutes: ["/pt-br/"],
      },
    }),
  ],
});
