export type Language = "en" | "pt";

export const EMAIL = "diegommrez12@gmail.com";
export const GITHUB = "https://github.com/diegorezm";
export const LINKEDIN = "https://www.linkedin.com/in/diegorezm/";
export const QUEST_MAP = "https://diegorezm.github.io/distributed-eng-learning-path/";

type Status = "live" | "beta" | "building" | "waitlist" | "study";

export type Project = {
  repo: string;
  name: string;
  stack: string;
  status: Status;
  /** File in public/projects/. Without one the page draws a monogram. */
  logo?: string;
  logoDark?: string;
  /** Brand color used to tint the card behind the logo. */
  tint?: string;
};

const featured: Project[] = [
  {
    repo: "grimo",
    name: "Grimo",
    stack: "TypeScript · Cloudflare",
    status: "building",
    logo: "grimo.svg",
    logoDark: "grimo-dark.svg",
    tint: "#8d78a4",
  },
  {
    repo: "pomolotl",
    name: "Pomolotl",
    stack: "Rust · egui",
    status: "live",
    logo: "pomolotl.svg",
    tint: "#e7708f",
  },
];

const index: Project[] = [
  {
    repo: "meu-edital",
    name: "Meu Edital",
    stack: "TypeScript · Cloudflare",
    status: "waitlist",
    logo: "meu-edital.png",
  },
  { repo: "leme", name: "Leme", stack: "Rust · Slint", status: "live", logo: "leme.svg" },
  { repo: "dresume", name: "dresume", stack: "Rust · Typst", status: "live", logo: "dresume.svg" },
  { repo: "dcom", name: "dcom", stack: "Rust · Convex", status: "beta" },
  { repo: "proposal-skill", name: "proposal", stack: "HTML · Claude Code", status: "live" },
  { repo: "KVCluster", name: "KVCluster", stack: "Java 25", status: "study" },
];

const withFeatured = (texts: { kind: string; blurb: string }[]) =>
  featured.map((p, i) => ({ ...p, ...texts[i] }));
const withBlurbs = (blurbs: string[]) => index.map((p, i) => ({ ...p, blurb: blurbs[i] }));

const stages = [
  "Foundation Village",
  "Replica Harbor",
  "Raft Citadel",
  "Vault Keep",
  "Shard Isles",
  "Courier Docks",
  "Watchtower Peak",
  "Production Capital",
];
const withStages = (bosses: string[]) => stages.map((name, i) => ({ name, boss: bosses[i] }));

export const translations = {
  en: {
    seoTitle: "Diego Rezende | Full-stack Developer, Linux & Infrastructure",
    seoDescription:
      "Diego Rezende is a full-stack developer from Brazil. He builds web and desktop apps with TypeScript and Rust and runs the Linux servers that keep them online.",
    nav: { work: "Projects", quest: "Quest", experience: "Experience", contact: "Contact" },
    home: "Home",
    langLabel: "Mudar para português",
    langShort: "PT",
    themeLabel: "Toggle theme",
    hero: {
      eyebrow: "Diego Rezende · Full-stack · Linux · Infra",
      title: "Useful software,",
      titleEm: "built with care.",
      lead: "I'm a full-stack developer. I build web and desktop apps with TypeScript and Rust, and I run the Linux servers that keep them online.",
      seeWork: "See projects →",
      hire: "Open to new roles",
    },
    strip: [
      { title: "Projects", text: ["Web apps, desktop", "and tools."], go: "Explore →" },
      { title: "Quest", text: ["Distributed systems,", "from zero to Raft."], go: "See map →" },
      { title: "Experience", text: ["Work history", "and education."], go: "Read →" },
      {
        title: "Available",
        text: ["Open to dev, IT support", "or infra roles."],
        go: "Get in touch →",
      },
    ],
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
      aside: "A selection of what I built this past year.",
      featured: withFeatured([
        {
          kind: "Social network · Web + mobile",
          blurb:
            "A social network for readers: shelves, reviews, a feed and a monthly reading recap. Web and mobile, running on Cloudflare.",
        },
        {
          kind: "Pomodoro timer · Desktop",
          blurb:
            "A cozy Pomodoro timer with a companion that focuses and rests with you. Lives in the system tray and has a floating timer.",
        },
      ]),
      items: withBlurbs([
        "A study app for public exams that builds a study cycle from the exam notice.",
        "A fast, minimal, local-first PDF reader.",
        "One Typst template, many resumes. Desktop app and CLI built for AI agents.",
        "Lightweight, self-hostable community chat.",
        "A Claude Code skill that turns an AI's plan into a one-page proposal.",
        "A distributed key-value store built from scratch, inspired by Redis.",
      ]),
    },
    quest: {
      eyebrow: "02 · Next up",
      title: "Quest: distributed",
      titleEm: "systems.",
      lead: "A path of about 22 weeks, from failure models to a complete distributed product. Each area unlocks the next, and each one ends with a real project.",
      cta: "Open the quest map ↗",
      current: "Current stage",
      stages: withStages([
        "resilient HTTP service",
        "replicated KV v1",
        "minimal Raft in Java",
        "KV v2 on Raft",
        "sharded KV",
        "orders with DLQ",
        "observability",
        "final project",
      ]),
    },
    experience: {
      eyebrow: "03 · Experience",
      title: "Where I've",
      titleEm: "been.",
      aside: "From the Army to full-stack development.",
      items: [
        { period: "2025 — now", role: "Full-stack Developer", org: "Morzen" },
        { period: "2026", role: "Junior Full-stack Developer", org: "Conselheiro Tutelar Virtual" },
        { period: "2025 — 2026", role: "Intern", org: "Conselheiro Tutelar Virtual" },
        { period: "2024 — 2025", role: "Freelancer", org: "PHP · Laravel · VPS" },
        { period: "2022 — 2023", role: "Soldier", org: "Brazilian Army" },
      ],
      education: "Systems Analysis & Development · Universidade de Taubaté, 2026",
      extras: "English C2 · ITIL Fundamentals",
    },
    footer: {
      tagline: "Full-stack developer, Linux and infra.",
      contact: "Contact",
      projects: "Projects",
      here: "On this page",
      copy: "Copy email",
      copied: "Email copied.",
    },
  },
  pt: {
    seoTitle: "Diego Rezende | Desenvolvedor Full-stack, Linux e Infraestrutura",
    seoDescription:
      "Diego Rezende é desenvolvedor full-stack no Brasil. Constrói aplicações web e desktop com TypeScript e Rust e cuida dos servidores Linux que mantêm tudo no ar.",
    nav: { work: "Projetos", quest: "Quest", experience: "Diário", contact: "Contato" },
    home: "Início",
    langLabel: "Switch to English",
    langShort: "EN",
    themeLabel: "Alternar tema",
    hero: {
      eyebrow: "Diego Rezende · Full-stack · Linux · Infra",
      title: "Software útil,",
      titleEm: "feito com cuidado.",
      lead: "Sou desenvolvedor full-stack. Construo aplicações web e desktop com TypeScript e Rust, e cuido dos servidores Linux que mantêm tudo no ar.",
      seeWork: "Ver projetos →",
      hire: "Estou aberto a vagas",
    },
    strip: [
      { title: "Projetos", text: ["Apps web, desktop", "e ferramentas."], go: "Explorar →" },
      { title: "Quest", text: ["Sistemas distribuídos,", "do zero ao Raft."], go: "Ver mapa →" },
      { title: "Diário", text: ["Experiência", "e formação."], go: "Ler →" },
      {
        title: "Disponível",
        text: ["Aberto a vagas de", "dev, suporte ou infra."],
        go: "Falar comigo →",
      },
    ],
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
      aside: "Uma seleção do que construí no último ano.",
      featured: withFeatured([
        {
          kind: "Rede social · Web + mobile",
          blurb:
            "Rede social pra leitores: estantes, resenhas, feed e o resumo do seu mês de leitura. Web e mobile, rodando na Cloudflare.",
        },
        {
          kind: "Timer Pomodoro · Desktop",
          blurb:
            "Um Pomodoro aconchegante com um companheiro que foca e descansa com você. Mora na bandeja do sistema e tem timer flutuante.",
        },
      ]),
      items: withBlurbs([
        "App de estudos pra concurso que monta um ciclo pelos pesos do edital.",
        "Leitor de PDF rápido, minimalista e local-first.",
        "Um template Typst, vários currículos. Desktop e CLI feitos pra agentes de IA.",
        "Chat de comunidade leve e self-hostable.",
        "Skill do Claude Code: o plano da IA vira uma proposta de uma página.",
        "Key-value store distribuído do zero, inspirado no Redis.",
      ]),
    },
    quest: {
      eyebrow: "02 · Próxima aventura",
      title: "Quest: sistemas",
      titleEm: "distribuídos.",
      lead: "Uma trilha de ~22 semanas, de modelos de falha até um produto distribuído completo. Cada área destrava a próxima, e cada uma termina num projeto de verdade.",
      cta: "Abrir o mapa da quest ↗",
      current: "Etapa atual",
      stages: withStages([
        "serviço HTTP resiliente",
        "KV replicado v1",
        "Raft mínimo em Java",
        "KV v2 sobre Raft",
        "KV com shards",
        "pedidos com DLQ",
        "observabilidade",
        "projeto final",
      ]),
    },
    experience: {
      eyebrow: "03 · Diário",
      title: "Por onde",
      titleEm: "passei.",
      aside: "Do Exército ao desenvolvimento full-stack.",
      items: [
        { period: "2025 — atual", role: "Desenvolvedor Full-stack", org: "Morzen" },
        {
          period: "2026",
          role: "Desenvolvedor Full-stack Júnior",
          org: "Conselheiro Tutelar Virtual",
        },
        { period: "2025 — 2026", role: "Estagiário", org: "Conselheiro Tutelar Virtual" },
        { period: "2024 — 2025", role: "Freelancer", org: "PHP · Laravel · VPS" },
        { period: "2022 — 2023", role: "Soldado", org: "Exército Brasileiro" },
      ],
      education: "Análise e Desenvolvimento de Sistemas · Universidade de Taubaté, 2026",
      extras: "Inglês C2 · Fundamentos ITIL",
    },
    footer: {
      tagline: "Desenvolvedor full-stack, Linux e infra.",
      contact: "Contato",
      projects: "Projetos",
      here: "Nesta página",
      copy: "Copiar email",
      copied: "Email copiado.",
    },
  },
};

export type Translation = (typeof translations)["en"];
