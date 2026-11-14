import type { Language } from "../content/site";
import { translations } from "../i18n";
import { Contact } from "./Contact";
import { Experience } from "./Experience";
import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { Quest } from "./Quest";

/** The whole page, act by act: night harbour → street → desk → volcano → morning. */
export function Home({ lang }: { lang: Language }) {
  const t = translations[lang];
  const otherLang =
    lang === "pt" ? { href: "/", hreflang: "en" } : { href: "/pt-br/", hreflang: "pt-BR" };
  return (
    <main id="top">
      <Hero t={t} otherLang={otherLang} />
      <Projects lang={lang} t={t} />
      <Experience lang={lang} t={t} />
      <Quest lang={lang} t={t} />
      <Contact t={t} />
    </main>
  );
}
