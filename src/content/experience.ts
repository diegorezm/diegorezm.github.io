// ─── Diary: work history and education ───────────────────────────────────────
// Newest first. Add a job by adding an object to `jobs`.

import type { Text } from "./site";

export type Job = { period: Text; role: Text; org: Text };

export const jobs: Job[] = [
  {
    period: { pt: "2025 — atual", en: "2025 — now" },
    role: { pt: "Desenvolvedor Full-stack", en: "Full-stack Developer" },
    org: { pt: "Morzen", en: "Morzen" },
  },
  {
    period: { pt: "2026", en: "2026" },
    role: { pt: "Desenvolvedor Full-stack Júnior", en: "Junior Full-stack Developer" },
    org: { pt: "Conselheiro Tutelar Virtual", en: "Conselheiro Tutelar Virtual" },
  },
  {
    period: { pt: "2025 — 2026", en: "2025 — 2026" },
    role: { pt: "Estagiário", en: "Intern" },
    org: { pt: "Conselheiro Tutelar Virtual", en: "Conselheiro Tutelar Virtual" },
  },
  {
    period: { pt: "2024 — 2025", en: "2024 — 2025" },
    role: { pt: "Freelancer", en: "Freelancer" },
    org: { pt: "PHP · Laravel · VPS", en: "PHP · Laravel · VPS" },
  },
  {
    period: { pt: "2022 — 2023", en: "2022 — 2023" },
    role: { pt: "Soldado", en: "Soldier" },
    org: { pt: "Exército Brasileiro", en: "Brazilian Army" },
  },
];

/** Lines under the list (education, languages, certificates). */
export const extras: Text[] = [
  {
    pt: "Análise e Desenvolvimento de Sistemas · Universidade de Taubaté, 2026",
    en: "Systems Analysis & Development · Universidade de Taubaté, 2026",
  },
  { pt: "Inglês C2 · Fundamentos ITIL", en: "English C2 · ITIL Fundamentals" },
];
