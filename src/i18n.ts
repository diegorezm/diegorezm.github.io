// Fixed page text in both languages. Projects, jobs and quest stages live in src/content/.

import type { Status } from "./content/projects";
import type { Language } from "./content/site";

export type { Language };

export const translations = {
  pt: {
    seoTitle: "Diego Rezende | Desenvolvedor Full-stack, Linux e Infraestrutura",
    seoDescription:
      "Diego Rezende é desenvolvedor full-stack no Brasil. Constrói aplicações web e desktop com TypeScript e Rust e cuida dos servidores Linux que mantêm tudo no ar.",
    nav: { work: "Projetos", quest: "Jornada", experience: "Experiência", contact: "Contato" },
    switchLang: { label: "EN", title: "Switch to English" },
    hero: {
      eyebrow: "Full-stack · Linux · Infra",
      title: "Software útil,",
      titleEm: "feito com cuidado.",
      lead: "Construo aplicações web e desktop com TypeScript e Rust, e cuido dos servidores Linux que mantêm tudo no ar.",
      hire: "Estou aberto a vagas",
      seeWork: "Ver projetos",
      annotation: "a única luz acesa",
    },
    status: {
      live: "no ar",
      beta: "beta",
      building: "construindo",
      waitlist: "lista de espera",
      study: "estudo",
    } satisfies Record<Status, string>,
    work: {
      eyebrow: "01 · Projetos",
      title: "Coisas que eu",
      titleEm: "fiz.",
      note: "uma seleção do que construí no último ano ↓",
    },
    experience: {
      eyebrow: "02 · Diário",
      title: "Por onde",
      titleEm: "passei.",
      note: "do Exército ao desenvolvimento full-stack",
    },
    quest: {
      eyebrow: "03 · Próxima aventura",
      title: "Quest: sistemas",
      titleEm: "distribuídos.",
      lead: "Uma trilha de ~22 semanas, de modelos de falha até um produto distribuído completo. Cada área destrava a próxima, e cada uma termina num projeto de verdade.",
      current: "etapa atual",
      cta: "Abrir o mapa da quest",
    },
    contact: {
      eyebrow: "04 · Contato",
      title: "Amanheceu.",
      titleEm: "Vamos conversar?",
      lead: "Estou aberto a vagas de desenvolvimento, suporte ou infra.",
    },
  },
  en: {
    seoTitle: "Diego Rezende | Full-stack Developer, Linux & Infrastructure",
    seoDescription:
      "Diego Rezende is a full-stack developer from Brazil. He builds web and desktop apps with TypeScript and Rust and runs the Linux servers that keep them online.",
    nav: { work: "Projects", quest: "Journey", experience: "Experience", contact: "Contact" },
    switchLang: { label: "PT", title: "Mudar para português" },
    hero: {
      eyebrow: "Full-stack · Linux · Infra",
      title: "Useful software,",
      titleEm: "built with care.",
      lead: "I build web and desktop apps with TypeScript and Rust, and I run the Linux servers that keep them online.",
      hire: "Open to new roles",
      seeWork: "See projects",
      annotation: "the only light still on",
    },
    status: {
      live: "live",
      beta: "beta",
      building: "building",
      waitlist: "waitlist",
      study: "study",
    } satisfies Record<Status, string>,
    work: {
      eyebrow: "01 · Projects",
      title: "Things I've",
      titleEm: "built.",
      note: "a selection of what I built this past year ↓",
    },
    experience: {
      eyebrow: "02 · Diary",
      title: "Where I've",
      titleEm: "been.",
      note: "from the Army to full-stack development",
    },
    quest: {
      eyebrow: "03 · Next adventure",
      title: "Quest: distributed",
      titleEm: "systems.",
      lead: "A path of about 22 weeks, from failure models to a complete distributed product. Each area unlocks the next, and each one ends with a real project.",
      current: "current stage",
      cta: "Open the quest map",
    },
    contact: {
      eyebrow: "04 · Contact",
      title: "Morning's here.",
      titleEm: "Shall we talk?",
      lead: "I'm open to roles in development, IT support or infrastructure.",
    },
  },
};

export type Translation = (typeof translations)["pt"];
