export type Language = "en" | "pt";

export const translations = {
  en: {
    seoTitle: "Diego Rezende | Full-Stack Developer",
    seoDescription:
      "Diego Rezende is a Full-Stack Developer specializing in TypeScript, Node.js and React. Open-source enthusiast and Linux user based in Brazil.",
    languageName: "English",
    languageSwitchLabel: "Language",
    languageSwitchShort: "PT",
    available: "Available for select work",
    availableShort: "Available",
    about: "About",
    work: "Work",
    contact: "Contact",
    home: "Home",
    desktopBack: "Back to desktop",
    backHome: "Back to home",
    selectedWork: "Selected Work",
    aboutMe: "About Me",
    copyright: "© 2026 Diego Rezende",
    madeMac: "Made on a Macintosh (metaphorically)",
    madeCare: "Made with care",
    finder: "Finder",
    portfolio: "portfolio",
    desktop: "Desktop",
    places: "Places",
    favorites: "Favorites",
    github: "GitHub",
    linkedin: "LinkedIn",
    memory: "Memory available: plenty",
    welcome: "Welcome to my desktop",
    heroTitleFirst: "Diego",
    heroTitleSecond: "Rezende.",
    heroIntro: "I build full-stack apps, tinker with systems programming, and love open source.",
    openWork: "See projects",
    sendMessage: "Send a message",
    helloWorldFirst: "hello,",
    helloWorldSecond: "world.",
    systemStamp: "system 7.5 / human 1.0",
    openFolder: "Open a folder",
    exploreDesktop: "Explore the desktop",
    aboutSubtitle: "A little context",
    workSubtitle: "Four things worth opening",
    contactSubtitle: "Start a conversation",
    plainText: "Plain text document",
    aboutTitle: "A bit about me",
    lastOpened: "Last opened recently · 4 KB",
    aboutLead: "I like making digital things feel obvious, considered, and a little bit human.",
    aboutBodyOne:
      "I work across design and development, usually somewhere between a rough idea and the moment it becomes useful. My favorite projects have a strong point of view, a clear audience, and enough room for the details to matter.",
    aboutBodyTwo:
      "This portfolio is intentionally built like a small desktop: a place to browse, open things, and find your way around without a tour guide.",
    basedIn: "Based in",
    basedInText: "Brazil · Available remotely",
    workingWith: "Usually working with",
    workingWithText: "TypeScript · Node.js · React · Linux",
    interestedIn: "Interested in",
    interestedInText: "Interfaces, systems, and small web experiments",
    recentDocuments: "Recent documents",
    workTitle: "Selected work",
    workCount: "01—04",
    workIntro: "Full-stack applications, systems experiments, and open-source tools.",
    outgoingMessage: "Outgoing message",
    contactTitle: "Let’s talk.",
    contactIntro:
      "Feel free to reach out to collaborate, discuss opportunities, or just talk tech.",
    bestForDetails: "Best for project details",
    startWithWork: "Start with the work",
    browseProjects: "Browse the selected projects",
    askAboutWork: "Ask me about this work",
    projects: [
      {
        title: "Vibe",
        category: "TypeScript · Node.js · TanStack",
        summary:
          "A chatbot-powered website builder that generates and modifies Next.js code from user instructions.",
        details:
          "Vibe turns a conversational brief into a working project, then lets the user keep iterating on the generated code.",
      },
      {
        title: "letmeask",
        category: "TypeScript · Fastify · React",
        summary:
          "An AI tool that transcribes audio and lets users ask questions about the content.",
        details:
          "The project combines audio transcription with a focused question-and-answer flow for exploring recorded content.",
      },
      {
        title: "FastShopping",
        category: "Java · Spring Boot · Redis",
        summary:
          "Performance optimization experiments on a single-node API backed by PostgreSQL and Redis.",
        details:
          "The work explores API performance under stress, measuring how caching and data access choices affect a Spring Boot service.",
      },
      {
        title: "llm-notebook",
        category: "Rust · Ollama · RAG",
        summary: "Ask AI about your documents, even without internet access.",
        details:
          "A local-first document assistant built with Rust and Ollama using retrieval-augmented generation.",
      },
    ],
    projectCategory: (category: string, year: string) => `${category} / ${year}`,
  },
  pt: {
    seoTitle: "Diego Rezende | Desenvolvedor Full-Stack",
    seoDescription:
      "Diego Rezende é um Desenvolvedor Full-Stack especializado em TypeScript, Node.js e React. Entusiasta de código aberto e usuário de Linux no Brasil.",
    languageName: "Português",
    languageSwitchLabel: "Idioma",
    languageSwitchShort: "EN",
    available: "Disponível para projetos selecionados",
    availableShort: "Disponível",
    about: "Sobre",
    work: "Trabalho",
    contact: "Contato",
    home: "Início",
    desktopBack: "Voltar para a área de trabalho",
    backHome: "Voltar para o início",
    selectedWork: "Trabalhos selecionados",
    aboutMe: "Sobre mim",
    copyright: "© 2026 Diego Rezende",
    madeMac: "Feito em um Macintosh (metaforicamente)",
    madeCare: "Feito com cuidado",
    finder: "Finder",
    portfolio: "portfólio",
    desktop: "Área de trabalho",
    places: "Locais",
    favorites: "Favoritos",
    github: "GitHub",
    linkedin: "LinkedIn",
    memory: "Memória disponível: bastante",
    welcome: "Boas-vindas à minha área de trabalho",
    heroTitleFirst: "Diego",
    heroTitleSecond: "Rezende.",
    heroIntro:
      "Desenvolvo aplicações full-stack, exploro programação de sistemas e adoro código aberto.",
    openWork: "Ver projetos",
    sendMessage: "Enviar mensagem",
    helloWorldFirst: "olá,",
    helloWorldSecond: "mundo.",
    systemStamp: "sistema 7.5 / humano 1.0",
    openFolder: "Abrir uma pasta",
    exploreDesktop: "Explore a área de trabalho",
    aboutSubtitle: "Um pouco de contexto",
    workSubtitle: "Quatro coisas que vale abrir",
    contactSubtitle: "Começar uma conversa",
    plainText: "Documento de texto simples",
    aboutTitle: "Um pouco sobre mim",
    lastOpened: "Aberto recentemente · 4 KB",
    aboutLead:
      "Gosto de fazer produtos digitais parecerem óbvios, cuidadosos e um pouco mais humanos.",
    aboutBodyOne:
      "Trabalho entre design e desenvolvimento, geralmente em algum lugar entre uma ideia inicial e o momento em que ela se torna útil. Meus projetos favoritos têm uma visão clara, um público definido e espaço suficiente para os detalhes importarem.",
    aboutBodyTwo:
      "Este portfólio foi pensado como uma pequena área de trabalho: um lugar para navegar, abrir coisas e encontrar seu caminho sem precisar de um tour guiado.",
    basedIn: "Onde estou",
    basedInText: "Brasil · Disponível remotamente",
    workingWith: "Trabalhando com",
    workingWithText: "TypeScript · Node.js · React · Linux",
    interestedIn: "Tenho interesse em",
    interestedInText: "Interfaces, sistemas e pequenos experimentos para a web",
    recentDocuments: "Documentos recentes",
    workTitle: "Trabalhos selecionados",
    workCount: "01—04",
    workIntro: "Aplicações full-stack, experimentos de sistemas e ferramentas de código aberto.",
    outgoingMessage: "Mensagem de saída",
    contactTitle: "Vamos conversar.",
    contactIntro:
      "Sinta-se à vontade para entrar em contato para colaborar, discutir oportunidades ou apenas falar sobre tecnologia.",
    bestForDetails: "Ideal para detalhes do projeto",
    startWithWork: "Comece pelo trabalho",
    browseProjects: "Veja os projetos selecionados",
    askAboutWork: "Fale comigo sobre este trabalho",
    projects: [
      {
        title: "Vibe",
        category: "TypeScript · Node.js · TanStack",
        summary:
          "Um criador de sites movido por chatbot que gera e modifica código Next.js a partir das instruções do usuário.",
        details:
          "O Vibe transforma um briefing em conversa em um projeto funcional e permite continuar iterando no código gerado.",
      },
      {
        title: "letmeask",
        category: "TypeScript · Fastify · React",
        summary:
          "Uma ferramenta de IA que transcreve áudio e permite fazer perguntas sobre o conteúdo.",
        details:
          "O projeto combina transcrição de áudio com um fluxo focado de perguntas e respostas para explorar conteúdo gravado.",
      },
      {
        title: "FastShopping",
        category: "Java · Spring Boot · Redis",
        summary:
          "Experimentos de otimização de desempenho em uma API de nó único com PostgreSQL e Redis.",
        details:
          "O trabalho explora o desempenho de APIs sob estresse, medindo como cache e acesso a dados afetam um serviço Spring Boot.",
      },
      {
        title: "llm-notebook",
        category: "Rust · Ollama · RAG",
        summary: "Pergunte à IA sobre seus documentos, mesmo sem acesso à internet.",
        details:
          "Um assistente de documentos local construído com Rust e Ollama usando geração aumentada por recuperação.",
      },
    ],
    projectCategory: (category: string, year: string) => `${category} / ${year}`,
  },
} as const;

export type Translation = (typeof translations)[Language];
