import { useEffect, useState } from "preact/hooks";
import { LocationProvider, useLocation } from "preact-iso";
import Home from "./components/home";
import { type Language, translations } from "./i18n";

type Theme = "light" | "dark";

function Page() {
  const { path } = useLocation();
  const [language, setLanguage] = useState<Language>(() => (path.includes("/pt-br") ? "pt" : "en"));
  const [theme, setTheme] = useState<Theme>("light");
  const t = translations[language];

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("portfolio-language");
    } catch {}
    const detected: Language =
      saved === "pt" || saved === "en"
        ? saved
        : path.includes("/pt-br") || navigator.language.toLowerCase().startsWith("pt")
          ? "pt"
          : "en";
    setLanguage(detected);
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
    document.title = t.seoTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.seoDescription);
  }, [language]);

  const toggleLanguage = () => {
    const next: Language = language === "pt" ? "en" : "pt";
    setLanguage(next);
    try {
      localStorage.setItem("portfolio-language", next);
    } catch {}
  };

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {}
  };

  return (
    <Home
      language={language}
      t={t}
      theme={theme}
      toggleTheme={toggleTheme}
      toggleLanguage={toggleLanguage}
    />
  );
}

export function App({ url }: { url?: string }) {
  return (
    // @ts-expect-error preact-iso accepts the prerender URL at runtime.
    <LocationProvider url={url}>
      <Page />
    </LocationProvider>
  );
}
