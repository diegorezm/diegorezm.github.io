export type Language = "en" | "pt";

export const EMAIL = "diegommrez12@gmail.com";
export const GITHUB = "https://github.com/diegorezm";
export const LINKEDIN = "https://www.linkedin.com/in/diegorezm/";

export type Plate = "rings" | "grid" | "waves" | "hatch" | "orbit" | "blocks";

type Project = {
  id: string;
  name: string;
  repo: string;
  plate: Plate;
  active: boolean;
  type: string;
  stack: string[];
  blurb: string;
};

const projectBase = [
  { id: "WRK-06", name: "grimo", repo: "grimo", plate: "rings", active: true },
  { id: "WRK-05", name: "meu-edital", repo: "meu-edital", plate: "grid", active: true },
  { id: "WRK-04", name: "Vibe", repo: "vibe", plate: "waves", active: false },
  { id: "WRK-03", name: "letmeask", repo: "letmeask", plate: "orbit", active: false },
  { id: "WRK-02", name: "FastShopping", repo: "FastShopping", plate: "blocks", active: false },
  { id: "WRK-01", name: "llm-notebook", repo: "llm-notebook", plate: "hatch", active: false },
] as const;

const projects = (items: { type: string; stack: string[]; blurb: string }[]): Project[] =>
  projectBase.map((p, i) => ({ ...p, ...items[i] }));

export const translations = {
  en: {
    seoTitle: "Diego Rezende | Software Developer & Linux Infrastructure",
    seoDescription:
      "Diego Rezende is a software developer from Brazil building web apps with TypeScript, Next.js and PostgreSQL, and shipping them on Linux servers with Docker.",
    archive: "Personal archive & portfolio",
    nav: {
      works: "Works",
      career: "Career",
      inventory: "Inventory",
      console: "Console",
      contact: "Contact",
    },
    langLabel: "Mudar para português",
    langShort: "PT",
    themeLabel: "Toggle theme",
    status: { mode: "Open to work", integrity: "Data integrity", ok: "OK", db: "Local database" },
    hero: {
      kicker: "Software developer · Linux infrastructure",
      lead: "I build web apps with TypeScript, Next.js and PostgreSQL, put them in Docker, ship them to a Linux VPS and write the docs so the next person has an easier time.",
      ctaWorks: "Browse the archive",
      ctaContact: "Get in touch",
    },
    record: {
      title: "Record inspector",
      id: "Record ID",
      fields: [
        ["Type", "Developer"],
        ["Status", "● Open to work"],
        ["Location", "Brazil · remote"],
        ["Current", "Full-stack @ Morzen"],
        ["Education", "ADS · Unitau (2026)"],
        ["Languages", "PT native · EN C2"],
      ],
      seeking: "Seeking",
      seekingText: "Development, IT support or infrastructure roles.",
    },
    stats: [
      { label: "Roles", value: "05", note: "since 2022" },
      { label: "Works", value: "06", note: "in this archive" },
      { label: "Building", value: "02", note: "grimo · meu-edital" },
      { label: "English", value: "C2", note: "EF SET 72/100" },
    ],
    works: {
      eyebrow: "01 — Works",
      title: "Selected works",
      lead: "Products I'm building, plus the experiments I learned the most from. Everything is open source.",
      type: "Type",
      status: "Status",
      active: "In progress",
      archived: "Archived",
      open: "Open record",
      items: projects([
        {
          type: "Product",
          stack: ["TypeScript", "Cloudflare", "Mobile"],
          blurb:
            "A social network for readers: shelves, reviews, a feed and a monthly reading recap. Web and mobile.",
        },
        {
          type: "Product",
          stack: ["TypeScript", "AI", "Planning"],
          blurb:
            "Study planner for public exams: import notices with AI help, plan the week, log sessions and track reviews.",
        },
        {
          type: "Experiment",
          stack: ["TypeScript", "Node.js", "TanStack"],
          blurb:
            "A website builder you talk to. It writes Next.js code from your instructions and keeps editing it.",
        },
        {
          type: "Experiment",
          stack: ["TypeScript", "Fastify", "React"],
          blurb:
            "Transcribes audio and lets you ask questions about what was said. Built during NLW Agents.",
        },
        {
          type: "Research",
          stack: ["Java", "Spring Boot", "Redis"],
          blurb:
            "Stress-testing a single-node Spring Boot + PostgreSQL API to measure what caching really buys.",
        },
        {
          type: "Research",
          stack: ["Rust", "Ollama", "RAG"],
          blurb: "Ask questions about your documents with no internet. Everything runs locally.",
        },
      ]),
    },
    career: {
      eyebrow: "02 — Career",
      title: "Career log",
      lead: "Newest first. Select an entry to read the details.",
      cols: ["Period", "Role", "Organization", "Status"],
      current: "Current",
      done: "Closed",
      merit: "Merit",
      items: [
        {
          period: "Jul 2025 — now",
          role: "Full-stack Developer",
          org: "Morzen",
          state: "current",
          bullets: [
            "Help scope new projects, align requirements and plan the technical approach.",
            "Build solutions for different client needs and help grow the company's services.",
            "Keep projects organized, investigate technical issues and communicate with the team.",
          ],
        },
        {
          period: "Jan 2026 — Mar 2026",
          role: "Junior Full-stack Developer",
          org: "Conselheiro Tutelar Virtual",
          state: "done",
          bullets: [
            "Built and maintained features for a Next.js + TypeScript web app.",
            "Designed and maintained the PostgreSQL database: modeling, migrations and queries.",
            "Standardized dev and prod environments with Docker.",
            "Set up production on a Linux VPS with Traefik; automated deploys with GitHub Actions + GHCR.",
            "Documented configuration and technical changes.",
          ],
        },
        {
          period: "Sep 2025 — Jan 2026",
          role: "Intern",
          org: "Conselheiro Tutelar Virtual",
          state: "done",
          bullets: [
            "Built features with Next.js and TypeScript alongside the team.",
            "Worked on data modeling with PostgreSQL and Drizzle ORM.",
            "Maintained REST and tRPC APIs and the frontend/backend integration.",
            "Learned the deploy setup: Docker, Linux VPS and Traefik.",
          ],
        },
        {
          period: "Jan 2024 — Aug 2025",
          role: "Freelancer",
          org: "Self-employed",
          state: "done",
          bullets: [
            "Built web apps in PHP and Laravel to fit what each client needed.",
            "Modeled MySQL databases and wrote the backend and business rules.",
            "Deployed and maintained apps on Hostinger VPS.",
            "Occasional hands-on support: formatting PCs, installing Windows, drivers and peripherals.",
          ],
        },
        {
          period: "Mar 2022 — Jan 2023",
          role: "Soldier",
          org: "Brazilian Army",
          state: "merit",
          bullets: [
            "Security and access control following strict operational procedures.",
            "Greeted and guided visitors at the unit's entrance.",
            "Received a Certificate of Merit for performance, commitment and discipline.",
          ],
        },
      ],
      edu: {
        label: "Education",
        role: "Systems Analysis & Development (Technologist)",
        org: "Universidade de Taubaté",
        period: "Feb 2023 — Feb 2026",
      },
    },
    inventory: {
      eyebrow: "03 — Inventory",
      title: "Tools & credentials",
      lead: "What I reach for to build, store, ship and keep things running.",
      groups: [
        {
          name: "Build",
          items: ["TypeScript", "React", "Next.js", "Node.js", "tRPC", "PHP / Laravel"],
        },
        { name: "Store", items: ["PostgreSQL", "MySQL", "Drizzle ORM", "Redis"] },
        {
          name: "Ship & run",
          items: ["Linux", "Docker", "Traefik", "GitHub Actions", "VPS", "DNS"],
        },
        { name: "Also", items: ["Rust", "Go", "Java / Spring", "Python", "Ollama"] },
      ],
      credentials: "Credentials",
      creds: [
        ["English C2", "EF SET 72/100"],
        ["ITIL Fundamentals", "IT service governance"],
        ["Certificate of Merit", "Brazilian Army, 2022"],
        ["NLW Agents", "Advanced track"],
        ["CICTED 24", "Intl. science & tech congress"],
      ],
    },
    console: {
      eyebrow: "04 — Console",
      title: "Query the archive",
      lead: "A small shell with my data in it. Try help, ls or neofetch.",
    },
    terminal: {
      title: "archive@rezm — shell",
      hint: "help",
      placeholder: "type a command…",
    },
    contact: {
      eyebrow: "05 — Contact",
      title: "Open a new record",
      lead: "Hiring for development, IT support or infrastructure, or have a project in mind? Send a message.",
      email: "Email",
      copy: "Copy",
      copied: "Email copied to clipboard.",
      write: "Write an email",
    },
    footer: { built: "Built with Preact. No templates.", backup: "Last build" },
  },
  pt: {
    seoTitle: "Diego Rezende | Desenvolvedor de Software & Infraestrutura Linux",
    seoDescription:
      "Diego Rezende é desenvolvedor de software no Brasil. Cria aplicações web com TypeScript, Next.js e PostgreSQL e coloca tudo no ar em servidores Linux com Docker.",
    archive: "Arquivo pessoal & portfólio",
    nav: {
      works: "Projetos",
      career: "Carreira",
      inventory: "Inventário",
      console: "Console",
      contact: "Contato",
    },
    langLabel: "Switch to English",
    langShort: "EN",
    themeLabel: "Alternar tema",
    status: { mode: "Aberto a vagas", integrity: "Integridade", ok: "OK", db: "Banco local" },
    hero: {
      kicker: "Desenvolvedor de software · Infraestrutura Linux",
      lead: "Crio aplicações web com TypeScript, Next.js e PostgreSQL, coloco tudo em Docker, faço deploy em VPS Linux e documento para facilitar a vida de quem vem depois.",
      ctaWorks: "Explorar o arquivo",
      ctaContact: "Entrar em contato",
    },
    record: {
      title: "Inspetor de registro",
      id: "ID do registro",
      fields: [
        ["Tipo", "Desenvolvedor"],
        ["Status", "● Aberto a vagas"],
        ["Local", "Brasil · remoto"],
        ["Atual", "Full-stack @ Morzen"],
        ["Formação", "ADS · Unitau (2026)"],
        ["Idiomas", "PT nativo · EN C2"],
      ],
      seeking: "Busco",
      seekingText: "Vagas de desenvolvimento, suporte de TI ou infraestrutura.",
    },
    stats: [
      { label: "Cargos", value: "05", note: "desde 2022" },
      { label: "Projetos", value: "06", note: "neste arquivo" },
      { label: "Em andamento", value: "02", note: "grimo · meu-edital" },
      { label: "Inglês", value: "C2", note: "EF SET 72/100" },
    ],
    works: {
      eyebrow: "01 — Projetos",
      title: "Projetos selecionados",
      lead: "Produtos que estou construindo e os experimentos com que mais aprendi. Tudo open source.",
      type: "Tipo",
      status: "Status",
      active: "Em andamento",
      archived: "Arquivado",
      open: "Abrir registro",
      items: projects([
        {
          type: "Produto",
          stack: ["TypeScript", "Cloudflare", "Mobile"],
          blurb:
            "Rede social para leitores: estantes, resenhas, feed e o resumo do seu mês de leitura. Web e mobile.",
        },
        {
          type: "Produto",
          stack: ["TypeScript", "IA", "Planejamento"],
          blurb:
            "Organize os estudos para concursos: importe editais com apoio de IA, planeje a semana, registre sessões e revisões.",
        },
        {
          type: "Experimento",
          stack: ["TypeScript", "Node.js", "TanStack"],
          blurb:
            "Um criador de sites com quem você conversa. Gera código Next.js a partir das instruções e continua editando.",
        },
        {
          type: "Experimento",
          stack: ["TypeScript", "Fastify", "React"],
          blurb:
            "Transcreve áudio e permite fazer perguntas sobre o conteúdo. Criado durante o NLW Agents.",
        },
        {
          type: "Pesquisa",
          stack: ["Java", "Spring Boot", "Redis"],
          blurb:
            "Testes de estresse numa API Spring Boot + PostgreSQL de nó único, medindo o que o cache realmente entrega.",
        },
        {
          type: "Pesquisa",
          stack: ["Rust", "Ollama", "RAG"],
          blurb: "Faça perguntas sobre seus documentos sem internet. Tudo roda localmente.",
        },
      ]),
    },
    career: {
      eyebrow: "02 — Carreira",
      title: "Registro de carreira",
      lead: "Do mais recente ao mais antigo. Selecione uma entrada para ver os detalhes.",
      cols: ["Período", "Cargo", "Organização", "Status"],
      current: "Atual",
      done: "Encerrado",
      merit: "Mérito",
      items: [
        {
          period: "jul 2025 — atual",
          role: "Desenvolvedor Full-stack",
          org: "Morzen",
          state: "current",
          bullets: [
            "Participo da definição de escopo, alinhamento de demandas e planejamento técnico de novos projetos.",
            "Colaboro em soluções para diferentes necessidades de clientes e na evolução dos serviços da empresa.",
            "Apoio a organização dos projetos, a investigação de problemas técnicos e a comunicação com o time.",
          ],
        },
        {
          period: "jan 2026 — mar 2026",
          role: "Desenvolvedor Full-stack Júnior",
          org: "Conselheiro Tutelar Virtual",
          state: "done",
          bullets: [
            "Desenvolvi e mantive funcionalidades de uma aplicação Next.js + TypeScript.",
            "Estruturei e mantive o banco PostgreSQL: modelagem, migrações e consultas.",
            "Padronizei os ambientes de desenvolvimento e produção com Docker.",
            "Configurei produção em VPS Linux com Traefik; automatizei deploys com GitHub Actions + GHCR.",
            "Documentei configurações e mudanças técnicas.",
          ],
        },
        {
          period: "set 2025 — jan 2026",
          role: "Estagiário",
          org: "Conselheiro Tutelar Virtual",
          state: "done",
          bullets: [
            "Desenvolvi funcionalidades com Next.js e TypeScript junto com o time.",
            "Trabalhei com modelagem de dados usando PostgreSQL e Drizzle ORM.",
            "Mantive APIs REST e tRPC e a integração entre frontend e backend.",
            "Aprendi a arquitetura de deploy: Docker, VPS Linux e Traefik.",
          ],
        },
        {
          period: "jan 2024 — ago 2025",
          role: "Freelancer",
          org: "Autônomo",
          state: "done",
          bullets: [
            "Desenvolvi aplicações web em PHP e Laravel sob medida para cada cliente.",
            "Modelei bancos MySQL e implementei o backend e as regras de negócio.",
            "Fiz deploy e manutenção de aplicações em VPS na Hostinger.",
            "Suporte técnico pontual: formatação de PCs, instalação do Windows, drivers e periféricos.",
          ],
        },
        {
          period: "mar 2022 — jan 2023",
          role: "Soldado",
          org: "Exército Brasileiro",
          state: "merit",
          bullets: [
            "Segurança e controle de acesso seguindo procedimentos operacionais.",
            "Atendi e orientei visitantes na entrada da unidade.",
            "Recebi um Certificado de Mérito por desempenho, comprometimento e disciplina.",
          ],
        },
      ],
      edu: {
        label: "Formação",
        role: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
        org: "Universidade de Taubaté",
        period: "fev 2023 — fev 2026",
      },
    },
    inventory: {
      eyebrow: "03 — Inventário",
      title: "Ferramentas & credenciais",
      lead: "O que eu uso para criar, guardar, entregar e manter as coisas funcionando.",
      groups: [
        {
          name: "Criar",
          items: ["TypeScript", "React", "Next.js", "Node.js", "tRPC", "PHP / Laravel"],
        },
        { name: "Guardar", items: ["PostgreSQL", "MySQL", "Drizzle ORM", "Redis"] },
        {
          name: "Entregar & manter",
          items: ["Linux", "Docker", "Traefik", "GitHub Actions", "VPS", "DNS"],
        },
        { name: "Também", items: ["Rust", "Go", "Java / Spring", "Python", "Ollama"] },
      ],
      credentials: "Credenciais",
      creds: [
        ["Inglês C2", "EF SET 72/100"],
        ["Fundamentos ITIL", "Governança de serviços de TI"],
        ["Certificado de Mérito", "Exército Brasileiro, 2022"],
        ["NLW Agents", "Trilha avançada"],
        ["CICTED 24", "Congresso intl. de ciência e tecnologia"],
      ],
    },
    console: {
      eyebrow: "04 — Console",
      title: "Consulte o arquivo",
      lead: "Um pequeno shell com meus dados. Tente help, ls ou neofetch.",
    },
    terminal: {
      title: "archive@rezm — shell",
      hint: "help",
      placeholder: "digite um comando…",
    },
    contact: {
      eyebrow: "05 — Contato",
      title: "Abrir um novo registro",
      lead: "Contratando para desenvolvimento, suporte de TI ou infraestrutura, ou tem um projeto em mente? Mande uma mensagem.",
      email: "Email",
      copy: "Copiar",
      copied: "Email copiado.",
      write: "Escrever um email",
    },
    footer: { built: "Feito com Preact. Sem templates.", backup: "Último build" },
  },
};

export type Translation = (typeof translations)["en"];
