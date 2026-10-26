export type Language = "en" | "pt";

export const EMAIL = "diegommrez12@gmail.com";
export const GITHUB = "https://github.com/diegorezm";
export const LINKEDIN = "https://www.linkedin.com/in/diegorezm/";

const projectRepos = ["grimo", "meu-edital", "vibe", "letmeask", "FastShopping", "llm-notebook"];
const projectNames = ["grimo", "meu-edital", "Vibe", "letmeask", "FastShopping", "llm-notebook"];
const projectStacks = [
  "TypeScript · Cloudflare",
  "TypeScript · AI",
  "TypeScript · Node.js",
  "TypeScript · Fastify · React",
  "Java · Spring Boot · Redis",
  "Rust · Ollama",
];

const projects = (blurbs: string[]) =>
  blurbs.map((blurb, i) => ({
    name: projectNames[i],
    repo: projectRepos[i],
    stack: projectStacks[i],
    active: i < 2,
    blurb,
  }));

export const translations = {
  en: {
    seoTitle: "Diego Rezende | Software Developer & Linux Infrastructure",
    seoDescription:
      "Diego Rezende is a software developer from Brazil building web apps with TypeScript, Next.js and PostgreSQL, and shipping them on Linux servers with Docker.",
    nav: { work: "Work", experience: "Experience", contact: "Contact" },
    langLabel: "Mudar para português",
    langShort: "PT",
    themeLabel: "Toggle theme",
    tagline: ["Development", "Linux", "Infra"],
    lead: "I build web apps with TypeScript, Next.js and PostgreSQL, ship them to Linux servers with Docker, and keep them running. Currently full-stack at Morzen and open to new opportunities.",
    work: {
      title: "Work",
      building: "building",
      items: projects([
        "A social network for readers: shelves, reviews and a monthly reading recap.",
        "A study planner for public exams, with AI-imported notices.",
        "A website builder you talk to. It writes and edits Next.js code.",
        "Transcribes audio and lets you ask questions about it.",
        "Stress-testing a Spring Boot API to see what caching really buys.",
        "Ask questions about your documents, fully offline.",
      ]),
    },
    experience: {
      title: "Experience",
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
    contact: {
      title: "Contact",
      lead: "Hiring for development, IT support or infrastructure? Send me an email.",
      copy: "Copy",
      copied: "Email copied.",
    },
  },
  pt: {
    seoTitle: "Diego Rezende | Desenvolvedor de Software & Infraestrutura Linux",
    seoDescription:
      "Diego Rezende é desenvolvedor de software no Brasil. Cria aplicações web com TypeScript, Next.js e PostgreSQL e coloca tudo no ar em servidores Linux com Docker.",
    nav: { work: "Projetos", experience: "Experiência", contact: "Contato" },
    langLabel: "Switch to English",
    langShort: "EN",
    themeLabel: "Alternar tema",
    tagline: ["Desenvolvimento", "Linux", "Infra"],
    lead: "Crio aplicações web com TypeScript, Next.js e PostgreSQL, coloco tudo no ar em servidores Linux com Docker e mantenho funcionando. Hoje sou full-stack na Morzen e estou aberto a novas oportunidades.",
    work: {
      title: "Projetos",
      building: "em andamento",
      items: projects([
        "Uma rede social para leitores: estantes, resenhas e o resumo do mês de leitura.",
        "Um planejador de estudos para concursos, com importação de editais por IA.",
        "Um criador de sites com quem você conversa. Escreve e edita código Next.js.",
        "Transcreve áudio e deixa você fazer perguntas sobre ele.",
        "Testes de estresse numa API Spring Boot para medir o que o cache entrega.",
        "Faça perguntas sobre seus documentos, totalmente offline.",
      ]),
    },
    experience: {
      title: "Experiência",
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
    contact: {
      title: "Contato",
      lead: "Contratando para desenvolvimento, suporte de TI ou infraestrutura? Me manda um email.",
      copy: "Copiar",
      copied: "Email copiado.",
    },
  },
};

export type Translation = (typeof translations)["en"];
