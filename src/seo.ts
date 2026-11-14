import { projects } from "./content/projects";
import { EMAIL, GITHUB, type Language, LINKEDIN, QUEST_MAP, SITE } from "./content/site";
import { translations } from "./i18n";

export { SITE };
export const OG_IMAGE = { width: 1200, height: 630 };

const ogImage = (lang: Language) => `${SITE}/assets/og${lang === "pt" ? "-pt" : ""}.png`;
const pageUrl = (lang: Language) => `${SITE}${lang === "pt" ? "/pt-br/" : "/"}`;

const SKILLS = [
  "TypeScript",
  "Rust",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Linux",
  "VPS administration",
  "Cloudflare Workers",
  "GitHub Actions",
  "Laravel",
  "Java",
  "Distributed systems",
  "IT support",
  "ITIL",
];

const meta = {
  en: {
    locale: "en_US",
    jobTitle: "Full-stack Developer",
    ogAlt:
      "Diego Rezende, full-stack developer. A pen drawing on blue paper of a night harbour, with an axolotl sitting on the quay under the only lit street lamp.",
  },
  pt: {
    locale: "pt_BR",
    jobTitle: "Desenvolvedor Full-stack",
    ogAlt:
      "Diego Rezende, desenvolvedor full-stack. Desenho a caneta sobre papel azul de um cais à noite, com um axolote sentado sob o único lampião aceso.",
  },
};

/** Structured data that lets search engines and AI assistants read the key facts. */
function jsonLd(lang: Language) {
  const t = translations[lang];
  const url = pageUrl(lang);
  const person = `${SITE}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: `${SITE}/`,
        name: "Diego Rezende",
        inLanguage: ["en", "pt-BR"],
        publisher: { "@id": person },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#page`,
        url,
        name: t.seoTitle,
        description: t.seoDescription,
        inLanguage: lang === "pt" ? "pt-BR" : "en",
        isPartOf: { "@id": `${SITE}/#website` },
        mainEntity: { "@id": person },
        primaryImageOfPage: ogImage(lang),
        dateModified: "2026-11-14",
      },
      {
        "@type": "Person",
        "@id": person,
        name: "Diego Rezende",
        alternateName: "diegorezm",
        url: `${SITE}/`,
        image: ogImage(lang),
        email: `mailto:${EMAIL}`,
        jobTitle: meta[lang].jobTitle,
        description: t.seoDescription,
        worksFor: { "@type": "Organization", name: "Morzen" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Universidade de Taubaté" },
        homeLocation: { "@type": "Country", name: "Brazil" },
        nationality: { "@type": "Country", name: "Brazil" },
        knowsLanguage: [
          { "@type": "Language", name: "Portuguese", alternateName: "pt-BR" },
          { "@type": "Language", name: "English", alternateName: "en" },
        ],
        knowsAbout: SKILLS,
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: "ITIL Foundation",
          credentialCategory: "certification",
        },
        seeks: {
          "@type": "Demand",
          name:
            lang === "pt"
              ? "Vagas de desenvolvimento, suporte de TI ou infraestrutura"
              : "Roles in software development, IT support or infrastructure",
        },
        sameAs: [GITHUB, LINKEDIN, QUEST_MAP],
      },
      {
        "@type": "ItemList",
        "@id": `${url}#projects`,
        name: lang === "pt" ? "Projetos de Diego Rezende" : "Projects by Diego Rezende",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: p.name,
            description: p.blurb[lang],
            codeRepository: `${GITHUB}/${p.repo}`,
            programmingLanguage: p.stack.split(" · ")[0],
            author: { "@id": person },
          },
        })),
      },
    ],
  };
}

type HeadElement = { type: string; props: Record<string, string> };

/** Per-language head tags written into each prerendered page. */
export function seoHead(lang: Language): Set<HeadElement> {
  const t = translations[lang];
  const url = pageUrl(lang);
  const image = ogImage(lang);
  const m = meta[lang];
  const metaTag = (key: "name" | "property", id: string, content: string): HeadElement => ({
    type: "meta",
    props: { [key]: id, content },
  });

  return new Set([
    metaTag("name", "description", t.seoDescription),
    { type: "link", props: { rel: "canonical", href: url } },
    metaTag("property", "og:url", url),
    metaTag("property", "og:title", t.seoTitle),
    metaTag("property", "og:description", t.seoDescription),
    metaTag("property", "og:locale", m.locale),
    metaTag("property", "og:locale:alternate", lang === "pt" ? "en_US" : "pt_BR"),
    metaTag("property", "og:image", image),
    metaTag("property", "og:image:secure_url", image),
    metaTag("property", "og:image:type", "image/png"),
    metaTag("property", "og:image:width", String(OG_IMAGE.width)),
    metaTag("property", "og:image:height", String(OG_IMAGE.height)),
    metaTag("property", "og:image:alt", m.ogAlt),
    metaTag("name", "twitter:title", t.seoTitle),
    metaTag("name", "twitter:description", t.seoDescription),
    metaTag("name", "twitter:image", image),
    metaTag("name", "twitter:image:alt", m.ogAlt),
    {
      type: "script",
      props: { type: "application/ld+json", children: JSON.stringify(jsonLd(lang)) },
    },
  ]);
}
