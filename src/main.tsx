import { hydrate, prerender as ssr } from "preact-iso";
import { App } from "./app";
import { translations } from "./i18n";
import { seoHead } from "./seo";
import "./styles/global.css";

if (typeof window !== "undefined") {
  const root = document.getElementById("app");
  if (root) hydrate(<App />, root);
}

export async function prerender(data: { url?: string }) {
  const lang = data.url?.includes("/pt-br") ? "pt" : "en";
  const result = await ssr(<App url={data.url} />);
  return {
    ...result,
    head: {
      lang: lang === "pt" ? "pt-BR" : "en",
      title: translations[lang].seoTitle,
      elements: seoHead(lang),
    },
  };
}
