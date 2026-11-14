// ─── Projects ────────────────────────────────────────────────────────────────
// To add a project, add an object to `projects`. The order here is the order
// on the page. `featured: true` puts it in the big cards at the top.
//
//   repo    repository name on github.com/diegorezm (also the card link)
//   logo    file in public/projects/ (optional; without one a monogram is drawn)
//   tint    card background colour behind the logo (featured cards only)
//   status  live | beta | building | waitlist | study

import type { Text } from "./site";

export type Status = "live" | "beta" | "building" | "waitlist" | "study";

export type Project = {
  repo: string;
  name: string;
  stack: string;
  status: Status;
  blurb: Text;
  logo?: string;
  featured?: boolean;
  /** Small caption above the name (featured cards only). */
  kind?: Text;
  tint?: string;
  /** Link override when the project doesn't live on GitHub. */
  url?: string;
};

export const projects: Project[] = [
  {
    repo: "grimo",
    name: "Grimo",
    featured: true,
    kind: { pt: "Rede social · Web + mobile", en: "Social network · Web + mobile" },
    logo: "grimo.svg",
    tint: "#8d78a4",
    status: "building",
    stack: "TypeScript · Cloudflare",
    blurb: {
      pt: "Rede social pra leitores: estantes, resenhas, feed e o resumo do seu mês de leitura. Web e mobile, rodando na Cloudflare.",
      en: "A social network for readers: shelves, reviews, a feed and your monthly reading recap. Web and mobile, running on Cloudflare.",
    },
  },
  {
    repo: "pomolotl",
    name: "Pomolotl",
    featured: true,
    kind: { pt: "Timer Pomodoro · Desktop", en: "Pomodoro timer · Desktop" },
    logo: "pomolotl.svg",
    tint: "#e7708f",
    status: "live",
    stack: "Rust · egui",
    blurb: {
      pt: "Um Pomodoro aconchegante com um companheiro que foca e descansa com você. Mora na bandeja do sistema e tem timer flutuante.",
      en: "A cozy Pomodoro timer with a companion that focuses and rests with you. Lives in the system tray and has a floating timer.",
    },
  },
  {
    repo: "meu-edital",
    name: "Meu Edital",
    logo: "meu-edital.png",
    status: "waitlist",
    stack: "TypeScript · Cloudflare",
    blurb: {
      pt: "App de estudos pra concurso que monta um ciclo pelos pesos do edital.",
      en: "A study app for public exams that builds a study cycle from the exam's weights.",
    },
  },
  {
    repo: "leme",
    name: "Leme",
    logo: "leme.svg",
    status: "live",
    stack: "Rust · Slint",
    blurb: {
      pt: "Leitor de PDF rápido, minimalista e local-first.",
      en: "A fast, minimal, local-first PDF reader.",
    },
  },
  {
    repo: "dresume",
    name: "dresume",
    logo: "dresume.svg",
    status: "live",
    stack: "Rust · Typst",
    blurb: {
      pt: "Um template Typst, vários currículos. Desktop e CLI feitos pra agentes de IA.",
      en: "One Typst template, many resumes. Desktop app and CLI built for AI agents.",
    },
  },
  {
    repo: "dcom",
    name: "dcom",
    status: "beta",
    stack: "Rust · Convex",
    blurb: {
      pt: "Chat de comunidade leve e self-hostable.",
      en: "Lightweight, self-hostable community chat.",
    },
  },
  {
    repo: "proposal-skill",
    name: "proposal",
    status: "live",
    stack: "HTML · Claude Code",
    blurb: {
      pt: "Skill do Claude Code: o plano da IA vira uma proposta de uma página.",
      en: "A Claude Code skill that turns an AI's plan into a one-page proposal.",
    },
  },
  {
    repo: "KVCluster",
    name: "KVCluster",
    status: "study",
    stack: "Java 25",
    blurb: {
      pt: "Key-value store distribuído do zero, inspirado no Redis.",
      en: "A distributed key-value store built from scratch, inspired by Redis.",
    },
  },
];
