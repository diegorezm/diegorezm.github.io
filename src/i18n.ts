export type Language = "en" | "pt";

export const EMAIL = "diegommrez12@gmail.com";
export const GITHUB = "https://github.com/diegorezm";
export const LINKEDIN = "https://www.linkedin.com/in/diegorezm/";

export const marquee = [
  "TypeScript",
  "Next.js",
  "PostgreSQL",
  "Docker",
  "Traefik",
  "Linux",
  "GitHub Actions",
  "tRPC",
  "Laravel",
  "Rust",
  "Go",
  "Redis",
];

export const translations = {
  en: {
    seoTitle: "Diego Rezende | Software Developer & Linux Infrastructure",
    seoDescription:
      "Diego Rezende is a software developer from Brazil building web apps with TypeScript, Next.js and PostgreSQL, and shipping them on Linux servers with Docker.",
    nav: { work: "Projects", xp: "Career", stack: "Inventory", contact: "Contact" },
    langLabel: "Mudar para português",
    langShort: "PT",
    themeLabel: "Toggle theme",
    hero: {
      badge: "Open to work · dev · IT support · infra",
      hello: "hey, i'm",
      first: "Diego",
      last: "Rezende",
      lead: "Software developer who also likes keeping Linux servers alive. I build web apps, put them in Docker containers, ship them to a VPS, and write docs so the next person has an easier time.",
      ctaWork: "See my stuff",
      ctaEmail: "Copy email",
      copied: "Email copied. Talk soon!",
      facts: ["Brazil", "Full-stack @ Morzen", "ADS @ Unitau ✓", "English C2"],
      dragHint: "psst, the stickers are draggable",
    },
    stickers: { hire: "hire me!" },
    terminal: {
      title: "diego@rezm: ~",
      hint: "type help",
      placeholder: "type a command…",
    },
    projects: {
      eyebrow: "01 / side quests",
      title: "Things I built for fun (and to learn)",
      lead: "Full-stack apps, AI experiments and a few systems projects. All open source.",
      view: "View code",
      items: [
        {
          name: "Vibe",
          repo: "vibe",
          tag: "AI · builder",
          stack: ["TypeScript", "Node.js", "TanStack"],
          blurb:
            "A website builder you talk to. Describe what you want and it writes Next.js code, then keeps editing it as you chat.",
        },
        {
          name: "letmeask",
          repo: "letmeask",
          tag: "AI · audio",
          stack: ["TypeScript", "Fastify", "React"],
          blurb:
            "Record or upload audio, get a transcript, then ask questions about what was said. Built during NLW Agents.",
        },
        {
          name: "FastShopping",
          repo: "FastShopping",
          tag: "perf · backend",
          stack: ["Java", "Spring Boot", "Redis"],
          blurb:
            "How fast can one node go? Stress-testing a Spring Boot + PostgreSQL API and measuring what caching really buys you.",
        },
        {
          name: "llm-notebook",
          repo: "llm-notebook",
          tag: "local-first · RAG",
          stack: ["Rust", "Ollama", "RAG"],
          blurb:
            "Ask questions about your documents with no internet needed. Everything runs locally with Rust and Ollama.",
        },
      ],
    },
    xp: {
      eyebrow: "02 / git log --career",
      title: "Where I've been committing",
      lead: "Newest first. Every entry is real and very lightly dramatized.",
      present: "present",
      items: [
        {
          hash: "f3a91c0",
          refs: ["HEAD -> main"],
          msg: "feat: join Morzen as full-stack dev",
          role: "Full-stack Developer",
          org: "Morzen",
          period: "Jul 2025 — present",
          bullets: [
            "Help scope new projects, align requirements and plan the technical approach.",
            "Build solutions for different client needs and help grow the company's services.",
            "Keep projects organized, investigate technical issues and communicate with the team.",
          ],
        },
        {
          hash: "b72e4d9",
          refs: ["tag: junior"],
          msg: "chore(infra): docker + traefik + ci on a linux vps",
          role: "Junior Full-stack Developer",
          org: "Conselheiro Tutelar Virtual",
          period: "Jan 2026 — Mar 2026",
          bullets: [
            "Built and maintained features for a Next.js + TypeScript web app.",
            "Designed and maintained the PostgreSQL database: modeling, migrations and queries.",
            "Standardized dev and prod environments with Docker.",
            "Set up production on a Linux VPS with Traefik and automated deploys with GitHub Actions + GHCR.",
            "Documented configuration and technical changes.",
          ],
        },
        {
          hash: "9c1d0aa",
          refs: [],
          msg: "feat: first real job, first real codebase",
          role: "Intern",
          org: "Conselheiro Tutelar Virtual",
          period: "Sep 2025 — Jan 2026",
          bullets: [
            "Built features with Next.js and TypeScript alongside the team.",
            "Worked on data modeling with PostgreSQL and Drizzle ORM.",
            "Maintained REST and tRPC APIs and the frontend/backend integration.",
            "Learned the deploy setup: Docker, Linux VPS and Traefik.",
          ],
        },
        {
          hash: "4e8b2f7",
          refs: ["branch: freelance"],
          msg: "feat: ship client apps in php + laravel",
          role: "Freelancer",
          org: "Self-employed",
          period: "Jan 2024 — Aug 2025",
          bullets: [
            "Built web apps in PHP and Laravel to fit what each client needed.",
            "Modeled MySQL databases and wrote the backend and business rules.",
            "Deployed and maintained apps on Hostinger VPS.",
            "Occasional hands-on support: formatting PCs, installing Windows, drivers and peripherals.",
          ],
        },
        {
          hash: "1a0c3e5",
          refs: ["tag: merit"],
          msg: "fix(discipline): serve in the Brazilian Army",
          role: "Soldier",
          org: "Brazilian Army · Pindamonhangaba, SP",
          period: "Mar 2022 — Jan 2023",
          bullets: [
            "Carried out security and access control following strict procedures.",
            "Greeted and guided visitors at the unit's entrance.",
            "Received a Certificate of Merit for performance, commitment and discipline.",
          ],
        },
      ],
      edu: {
        hash: "0000001",
        refs: ["tag: v1.0.0"],
        msg: "release: graduated",
        role: "Systems Analysis & Development (Technologist)",
        org: "Universidade de Taubaté",
        period: "Feb 2023 — Feb 2026",
      },
    },
    stack: {
      eyebrow: "03 / inventory",
      title: "Equipped items",
      lead: "What I reach for when I build, store, ship and keep things running.",
      groups: [
        {
          name: "Build",
          color: "lime",
          items: ["TypeScript", "React", "Next.js", "Node.js", "tRPC", "PHP / Laravel"],
        },
        {
          name: "Store",
          color: "pink",
          items: ["PostgreSQL", "MySQL", "Drizzle ORM", "Redis"],
        },
        {
          name: "Ship & run",
          color: "blue",
          items: ["Linux", "Docker", "Traefik", "GitHub Actions", "VPS", "DNS"],
        },
        {
          name: "Side quests",
          color: "orange",
          items: ["Rust", "Go", "Java / Spring", "Python", "Ollama"],
        },
      ],
      achievementsTitle: "Achievements unlocked",
      achievements: [
        { icon: "🗣️", title: "English C2", desc: "EF SET 72/100 · full professional" },
        { icon: "🧭", title: "ITIL Fundamentals", desc: "IT service governance & management" },
        { icon: "🎖️", title: "Certificate of Merit", desc: "Brazilian Army, 2022" },
        { icon: "🎓", title: "Graduated", desc: "Systems Analysis & Dev · Unitau" },
        { icon: "🤖", title: "NLW Agents", desc: "Advanced track" },
        { icon: "🔬", title: "CICTED 24", desc: "Intl. Congress of Science & Tech" },
      ],
    },
    contact: {
      eyebrow: "04 / ping me",
      title: "Let's build something",
      lead: "Hiring for development, IT support or infrastructure? Have a project in mind? Or just want to talk Linux? My inbox is open.",
      copy: "Copy",
      write: "Write me",
    },
    footer: {
      built: "Built with Preact, a lot of coffee and zero templates.",
      secret: "psst: ↑ ↑ ↓ ↓ ← → ← → B A",
    },
  },
  pt: {
    seoTitle: "Diego Rezende | Desenvolvedor de Software & Infraestrutura Linux",
    seoDescription:
      "Diego Rezende é desenvolvedor de software no Brasil. Cria aplicações web com TypeScript, Next.js e PostgreSQL e coloca tudo no ar em servidores Linux com Docker.",
    nav: { work: "Projetos", xp: "Carreira", stack: "Inventário", contact: "Contato" },
    langLabel: "Switch to English",
    langShort: "EN",
    themeLabel: "Alternar tema",
    hero: {
      badge: "Aberto a vagas · dev · suporte de TI · infra",
      hello: "e aí, eu sou o",
      first: "Diego",
      last: "Rezende",
      lead: "Desenvolvedor de software que também gosta de manter servidores Linux de pé. Crio aplicações web, coloco tudo em containers Docker, faço deploy em VPS e documento para facilitar a vida de quem vem depois.",
      ctaWork: "Ver meus projetos",
      ctaEmail: "Copiar email",
      copied: "Email copiado. Até já!",
      facts: ["Brasil", "Full-stack @ Morzen", "ADS @ Unitau ✓", "Inglês C2"],
      dragHint: "psiu, dá pra arrastar os adesivos",
    },
    stickers: { hire: "me contrata!" },
    terminal: {
      title: "diego@rezm: ~",
      hint: "digite help",
      placeholder: "digite um comando…",
    },
    projects: {
      eyebrow: "01 / side quests",
      title: "Coisas que criei por diversão (e pra aprender)",
      lead: "Aplicações full-stack, experimentos com IA e alguns projetos de sistemas. Tudo open source.",
      view: "Ver código",
      items: [
        {
          name: "Vibe",
          repo: "vibe",
          tag: "IA · builder",
          stack: ["TypeScript", "Node.js", "TanStack"],
          blurb:
            "Um criador de sites com quem você conversa. Descreva o que quer e ele escreve código Next.js, e continua editando conforme o papo.",
        },
        {
          name: "letmeask",
          repo: "letmeask",
          tag: "IA · áudio",
          stack: ["TypeScript", "Fastify", "React"],
          blurb:
            "Grave ou envie um áudio, receba a transcrição e faça perguntas sobre o conteúdo. Criado durante o NLW Agents.",
        },
        {
          name: "FastShopping",
          repo: "FastShopping",
          tag: "perf · backend",
          stack: ["Java", "Spring Boot", "Redis"],
          blurb:
            "Até onde vai um único nó? Testes de estresse numa API Spring Boot + PostgreSQL medindo o que o cache realmente entrega.",
        },
        {
          name: "llm-notebook",
          repo: "llm-notebook",
          tag: "local-first · RAG",
          stack: ["Rust", "Ollama", "RAG"],
          blurb:
            "Faça perguntas sobre seus documentos sem precisar de internet. Tudo roda localmente com Rust e Ollama.",
        },
      ],
    },
    xp: {
      eyebrow: "02 / git log --carreira",
      title: "Onde ando commitando",
      lead: "Do mais recente ao mais antigo. Tudo real, só um pouquinho dramatizado.",
      present: "atual",
      items: [
        {
          hash: "f3a91c0",
          refs: ["HEAD -> main"],
          msg: "feat: entra na Morzen como dev full-stack",
          role: "Desenvolvedor Full-stack",
          org: "Morzen",
          period: "jul 2025 — atual",
          bullets: [
            "Participo da definição de escopo, alinhamento de demandas e planejamento técnico de novos projetos.",
            "Colaboro em soluções para diferentes necessidades de clientes e na evolução dos serviços da empresa.",
            "Apoio a organização dos projetos, a investigação de problemas técnicos e a comunicação com o time.",
          ],
        },
        {
          hash: "b72e4d9",
          refs: ["tag: junior"],
          msg: "chore(infra): docker + traefik + ci numa vps linux",
          role: "Desenvolvedor Full-stack Júnior",
          org: "Conselheiro Tutelar Virtual",
          period: "jan 2026 — mar 2026",
          bullets: [
            "Desenvolvi e mantive funcionalidades de uma aplicação Next.js + TypeScript.",
            "Estruturei e mantive o banco PostgreSQL: modelagem, migrações e consultas.",
            "Padronizei os ambientes de desenvolvimento e produção com Docker.",
            "Configurei produção em VPS Linux com Traefik e automatizei deploys com GitHub Actions + GHCR.",
            "Documentei configurações e mudanças técnicas.",
          ],
        },
        {
          hash: "9c1d0aa",
          refs: [],
          msg: "feat: primeiro emprego, primeira codebase de verdade",
          role: "Estagiário",
          org: "Conselheiro Tutelar Virtual",
          period: "set 2025 — jan 2026",
          bullets: [
            "Desenvolvi funcionalidades com Next.js e TypeScript junto com o time.",
            "Trabalhei com modelagem de dados usando PostgreSQL e Drizzle ORM.",
            "Mantive APIs REST e tRPC e a integração entre frontend e backend.",
            "Aprendi a arquitetura de deploy: Docker, VPS Linux e Traefik.",
          ],
        },
        {
          hash: "4e8b2f7",
          refs: ["branch: freelance"],
          msg: "feat: entrega apps para clientes em php + laravel",
          role: "Freelancer",
          org: "Autônomo",
          period: "jan 2024 — ago 2025",
          bullets: [
            "Desenvolvi aplicações web em PHP e Laravel sob medida para cada cliente.",
            "Modelei bancos MySQL e implementei o backend e as regras de negócio.",
            "Fiz deploy e manutenção de aplicações em VPS na Hostinger.",
            "Suporte técnico pontual: formatação de PCs, instalação do Windows, drivers e periféricos.",
          ],
        },
        {
          hash: "1a0c3e5",
          refs: ["tag: mérito"],
          msg: "fix(disciplina): serve no Exército Brasileiro",
          role: "Soldado",
          org: "Exército Brasileiro · Pindamonhangaba, SP",
          period: "mar 2022 — jan 2023",
          bullets: [
            "Realizei atividades de segurança e controle seguindo procedimentos operacionais.",
            "Atendi e orientei visitantes na entrada da unidade.",
            "Recebi um Certificado de Mérito por desempenho, comprometimento e disciplina.",
          ],
        },
      ],
      edu: {
        hash: "0000001",
        refs: ["tag: v1.0.0"],
        msg: "release: formado",
        role: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
        org: "Universidade de Taubaté",
        period: "fev 2023 — fev 2026",
      },
    },
    stack: {
      eyebrow: "03 / inventário",
      title: "Itens equipados",
      lead: "O que eu uso para criar, guardar, entregar e manter as coisas funcionando.",
      groups: [
        {
          name: "Criar",
          color: "lime",
          items: ["TypeScript", "React", "Next.js", "Node.js", "tRPC", "PHP / Laravel"],
        },
        {
          name: "Guardar",
          color: "pink",
          items: ["PostgreSQL", "MySQL", "Drizzle ORM", "Redis"],
        },
        {
          name: "Entregar & manter",
          color: "blue",
          items: ["Linux", "Docker", "Traefik", "GitHub Actions", "VPS", "DNS"],
        },
        {
          name: "Side quests",
          color: "orange",
          items: ["Rust", "Go", "Java / Spring", "Python", "Ollama"],
        },
      ],
      achievementsTitle: "Conquistas desbloqueadas",
      achievements: [
        { icon: "🗣️", title: "Inglês C2", desc: "EF SET 72/100 · domínio pleno" },
        { icon: "🧭", title: "Fundamentos ITIL", desc: "Governança e gestão de serviços de TI" },
        { icon: "🎖️", title: "Certificado de Mérito", desc: "Exército Brasileiro, 2022" },
        { icon: "🎓", title: "Formado", desc: "Análise e Desenv. de Sistemas · Unitau" },
        { icon: "🤖", title: "NLW Agents", desc: "Trilha avançada" },
        { icon: "🔬", title: "CICTED 24", desc: "Congresso Intl. de Ciência e Tecnologia" },
      ],
    },
    contact: {
      eyebrow: "04 / me chama",
      title: "Bora construir algo",
      lead: "Contratando para desenvolvimento, suporte de TI ou infraestrutura? Tem um projeto em mente? Ou só quer falar de Linux? Minha caixa de entrada está aberta.",
      copy: "Copiar",
      write: "Mandar email",
    },
    footer: {
      built: "Feito com Preact, muito café e zero templates.",
      secret: "psiu: ↑ ↑ ↓ ↓ ← → ← → B A",
    },
  },
};

export type Translation = (typeof translations)["en"];
