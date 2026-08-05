import { useState } from "preact/hooks";
import { ArrowUpRight, Command, FileCode2, Monitor, X } from "lucide-preact";

type Project = { title: string; category: string; year: string; accent: "blue" | "yellow" | "pink"; icon: "monitor" | "code" | "command"; summary: string; details: string };
const projects: Project[] = [
  { title: "Interface systems", category: "Product design · Development", year: "2024", accent: "blue", icon: "monitor", summary: "A flexible visual language for a product that needed to feel clear at every scale.", details: "From early flows to a coded component library, I shaped the system around fewer surprises and better decisions." },
  { title: "Small web experiments", category: "Creative coding · Prototypes", year: "2023", accent: "yellow", icon: "code", summary: "A shelf of playful prototypes made to test an idea before it became a commitment.", details: "Motion, type, and tiny interactions are used as thinking tools — each experiment has one clear question behind it." },
  { title: "Tools for thinking", category: "Research · Brand direction", year: "2022", accent: "pink", icon: "command", summary: "A research-led identity for a calmer way to collect, connect, and revisit ideas.", details: "The work balanced a distinctive voice with a quiet interface, so the brand could be remembered without getting in the way." },
];

const icons = { monitor: Monitor, code: FileCode2, command: Command };

export default function ProjectExplorer() {
  const [selected, setSelected] = useState<Project | null>(null);
  return <>
    <div className="project-list" aria-label="Selected projects">{projects.map((project) => { const Icon = icons[project.icon]; return <button className="project-row" type="button" key={project.title} onClick={() => setSelected(project)}><span className={`project-row__icon project-row__icon--${project.accent}`} aria-hidden="true"><Icon size={20} strokeWidth={1.5} /></span><span className="project-row__body"><strong>{project.title}</strong><small>{project.category}</small></span><span className="project-row__year">{project.year}</span><span className="project-row__arrow" aria-hidden="true">↗</span></button>; })}</div>
    {selected && <div className="project-dialog-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title"><div className="project-dialog__titlebar"><span className="window-control window-control--close" aria-hidden="true"></span><h3 id="project-dialog-title">{selected.title}</h3><button type="button" className="project-dialog__close" onClick={() => setSelected(null)}><X size={14} aria-hidden="true" /> Close</button></div><div className={`project-dialog__icon project-dialog__icon--${selected.accent}`} aria-hidden="true">{(() => { const Icon = icons[selected.icon]; return <Icon size={25} strokeWidth={1.5} />; })()}</div><p className="project-dialog__category">{selected.category} / {selected.year}</p><p className="project-dialog__summary">{selected.summary}</p><p className="project-dialog__details">{selected.details}</p><a className="mac-button mac-button--primary" href={route("contact")} onClick={() => setSelected(null)}>Ask me about this work <ArrowUpRight size={14} aria-hidden="true" /></a></section></div>}
  </>;
}

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const route = (page = "") => page ? `${base}/${page}/` : `${base}/`;
