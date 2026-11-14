import { useEffect } from "preact/hooks";
import { LocationProvider, useLocation } from "preact-iso";
import { Home } from "./components/Home";
import { translations } from "./i18n";

// "/" is English, "/pt-br/" is Portuguese. Both are prerendered.
function Page() {
  const { path } = useLocation();
  const lang = path.startsWith("/pt-br") ? "pt" : "en";
  // the build writes these per page; this keeps dev and client navigation in sync
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = translations[lang].seoTitle;
  }, [lang]);
  return <Home lang={lang} />;
}

export function App({ url }: { url?: string }) {
  return (
    // @ts-expect-error preact-iso accepts the prerender URL at runtime.
    <LocationProvider url={url}>
      <Page />
    </LocationProvider>
  );
}
