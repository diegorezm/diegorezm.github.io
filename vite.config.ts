import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

const repository = process.env.GITHUB_REPOSITORY;
const [, name] = repository?.split("/") ?? [];
const isUserSite = name?.endsWith(".github.io");

export default defineConfig({
  base: name && !isUserSite ? `/${name}/` : "/",
  // lucide-preact must share the app's preact instance (hooks break otherwise)
  resolve: { dedupe: ["preact", "preact/hooks"] },
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
