import { ArrowUpRight, Command, FileCode2, Monitor, X } from "lucide-preact";
import { useState } from "preact/hooks";
import { useLanguage } from "./finder-app";

type Project = {
  title: string;
  category: string;
  year: string;
  repository: string;
  accent: "blue" | "yellow" | "pink";
  icon: "monitor" | "code" | "command";
  summary: string;
  details: string;
};
const projects = [
  {
    year: "2024",
    repository: "https://github.com/diegorezm/vibe",
    accent: "blue" as const,
    icon: "monitor" as const,
  },
  {
    year: "2023",
    repository: "https://github.com/diegorezm/letmeask",
    accent: "yellow" as const,
    icon: "code" as const,
  },
  {
    year: "2023",
    repository: "https://github.com/diegorezm/FastShopping",
    accent: "pink" as const,
    icon: "monitor" as const,
  },
  {
    year: "2022",
    repository: "https://github.com/diegorezm/llm-notebook",
    accent: "blue" as const,
    icon: "command" as const,
  },
];

const icons = { monitor: Monitor, code: FileCode2, command: Command };

export default function ProjectExplorer() {
  const { language, t } = useLanguage();
  const [selected, setSelected] = useState<Project | null>(null);
  const localizedProjects = projects.map((project, index) => ({
    ...project,
    ...t.projects[index],
  }));
  return (
    <>
      <div className="project-list">
        {localizedProjects.map((project) => {
          const Icon = icons[project.icon];
          return (
            <button
              className="project-row"
              type="button"
              key={project.title}
              onClick={() => setSelected(project)}
            >
              <span
                className={`project-row__icon project-row__icon--${project.accent}`}
                aria-hidden="true"
              >
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <span className="project-row__body">
                <strong>{project.title}</strong>
                <small>{project.category}</small>
              </span>
              <span className="project-row__year">{project.year}</span>
              <span className="project-row__arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          );
        })}
      </div>
      {selected && (
        <div className="project-dialog-backdrop" role="presentation">
          <section
            className="project-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
          >
            <div className="project-dialog__titlebar">
              <span className="window-control window-control--close" aria-hidden="true"></span>
              <h3 id="project-dialog-title">{selected.title}</h3>
              <button
                type="button"
                className="project-dialog__close"
                onClick={() => setSelected(null)}
              >
                <X size={14} aria-hidden="true" /> {language === "en" ? "Close" : "Fechar"}
              </button>
            </div>
            <div
              className={`project-dialog__icon project-dialog__icon--${selected.accent}`}
              aria-hidden="true"
            >
              {(() => {
                const Icon = icons[selected.icon];
                return <Icon size={25} strokeWidth={1.5} />;
              })()}
            </div>
            <p className="project-dialog__category">
              {t.projectCategory(selected.category, selected.year)}
            </p>
            <p className="project-dialog__summary">{selected.summary}</p>
            <p className="project-dialog__details">{selected.details}</p>
            <div className="project-dialog__actions">
              <a
                className="mac-button mac-button--primary"
                href={route("contact")}
                onClick={() => setSelected(null)}
              >
                {t.askAboutWork} <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a
                className="project-dialog__repo"
                href={selected.repository}
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const route = (page = "") => (page ? `${base}/${page}/` : `${base}/`);
