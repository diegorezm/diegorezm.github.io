import { hydrate, prerender as ssr } from "preact-iso";
import { App } from "./app";
import { translations } from "./i18n";
import "./styles/global.css";

if (typeof window !== "undefined") {
  const root = document.getElementById("app");
  if (root) hydrate(<App />, root);
}

export async function prerender(data: { url?: string }) {
  const isPortuguese = data.url?.includes("/pt-br") ?? false;
  const translation = isPortuguese ? translations.pt : translations.en;
  const canonicalUrl = `https://diegorezm.github.io${data.url && data.url !== "/" ? data.url : "/"}`;
  const result = await ssr(<App url={data.url} />);
  return {
    ...result,
    head: {
      lang: isPortuguese ? "pt-BR" : "en",
      title: translation.seoTitle,
      elements: new Set([
        { type: "meta", props: { name: "description", content: translation.seoDescription } },
        { type: "meta", props: { property: "og:title", content: translation.seoTitle } },
        {
          type: "meta",
          props: { property: "og:description", content: translation.seoDescription },
        },
        { type: "meta", props: { property: "og:url", content: canonicalUrl } },
        { type: "meta", props: { name: "twitter:title", content: translation.seoTitle } },
        {
          type: "meta",
          props: { name: "twitter:description", content: translation.seoDescription },
        },
        { type: "link", props: { rel: "canonical", href: canonicalUrl } },
      ]),
    },
  };
}
