import type { ComponentChildren } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { useLocation } from "preact-iso";
import {
  Apple,
  ArrowUpRight,
  ExternalLink,
  FileText,
  Folder,
  Globe,
  Users,
  Mail,
  Monitor,
} from "lucide-preact";
import ProjectExplorer from "./project-explorer";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const route = (page = "") => page ? `${base}/${page}/` : `${base}/`;

const activePage = (path: string) => {
  const normalized = path.replace(base, "");
  if (normalized.startsWith("/about")) return "about";
  if (normalized.startsWith("/work")) return "work";
  if (normalized.startsWith("/contact")) return "contact";
  return "desktop";
};

function FinderApp({ children }: { children: ComponentChildren }) {
  const { path } = useLocation();
  const windowRef = useRef<HTMLElement>(null);
  const interaction = useRef<{
    type: "drag" | "resize";
    pointer: { x: number; y: number };
    position: { x: number; y: number };
    size: { width: number; height: number };
    rect: DOMRect;
  } | null>(null);
  const position = useRef({ x: 0, y: 0 });
  const size = useRef<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("portfolio-finder-window");
    if (!saved || !windowRef.current || window.innerWidth <= 760) return;

    try {
      const state = JSON.parse(saved);
      position.current = state.position ?? { x: 0, y: 0 };
      size.current = state.size ?? null;
      if (size.current) {
        windowRef.current.style.width = `${size.current.width}px`;
        windowRef.current.style.height = `${size.current.height}px`;
        windowRef.current.classList.add("is-resized");
      }
      windowRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
    } catch {
      sessionStorage.removeItem("portfolio-finder-window");
    }
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const current = interaction.current;
      const windowElement = windowRef.current;
      if (!current || !windowElement || window.innerWidth <= 760) return;

      const deltaX = event.clientX - current.pointer.x;
      const deltaY = event.clientY - current.pointer.y;

      if (current.type === "drag") {
        const minX = 16 - (current.rect.left - current.position.x);
        const maxX = window.innerWidth - 16 - (current.rect.right - current.position.x);
        const minY = 44 - (current.rect.top - current.position.y);
        const maxY = window.innerHeight - 28 - (current.rect.bottom - current.position.y);
        position.current = {
          x: clamp(current.position.x + deltaX, minX, Math.max(minX, maxX)),
          y: clamp(current.position.y + deltaY, minY, Math.max(minY, maxY)),
        };
        windowElement.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
      } else {
        const minWidth = 620;
        const minHeight = 520;
        size.current = {
          width: clamp(current.size.width + deltaX, minWidth, Math.max(minWidth, window.innerWidth - current.rect.left - 16)),
          height: clamp(current.size.height + deltaY, minHeight, Math.max(minHeight, window.innerHeight - current.rect.top - 28)),
        };
        windowElement.style.width = `${size.current.width}px`;
        windowElement.style.height = `${size.current.height}px`;
      }
    };

    const stopInteraction = () => {
      const current = interaction.current;
      if (!current || !windowRef.current) return;
      sessionStorage.setItem("portfolio-finder-window", JSON.stringify({ position: position.current, size: size.current }));
      interaction.current = null;
      windowRef.current.classList.remove("is-interacting");
      document.body.classList.remove("window-is-interacting");
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", stopInteraction);
    window.addEventListener("blur", stopInteraction);
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", stopInteraction);
      window.removeEventListener("blur", stopInteraction);
    };
  }, []);

  const startInteraction = (event: PointerEvent, type: "drag" | "resize") => {
    if (window.innerWidth <= 760 || !windowRef.current) return;
    const target = event.target as Element;
    if (type === "drag" && target.closest("a, button, .window-control")) return;
    const rect = windowRef.current.getBoundingClientRect();
    interaction.current = {
      type,
      pointer: { x: event.clientX, y: event.clientY },
      position: { ...position.current },
      size: { width: rect.width, height: rect.height },
      rect,
    };
    if (type === "resize") windowRef.current.classList.add("is-resized");
    windowRef.current.classList.add("is-interacting");
    document.body.classList.add("window-is-interacting");
    event.preventDefault();
  };

  const page = activePage(path);
  const metadata = {
    desktop: { title: "portfolio — Finder", path: "portfolio" },
    about: { title: "about-me.txt — Finder", path: "portfolio / about-me.txt" },
    work: { title: "selected-work — Finder", path: "portfolio / selected-work" },
    contact: { title: "contact — Finder", path: "portfolio / contact" },
  }[page];

  return (
    <main className="desktop-shell">
      <div className="desktop-experience">
      <header className="menu-bar" aria-label="System menu">
        <nav className="menu-bar__left">
          <a className="apple-mark" href={route()} aria-label="Back to desktop"><Apple size={16} strokeWidth={2.4} aria-hidden="true" /></a>
          <a href={route("about")}>About</a>
          <a href={route("work")}>Work</a>
          <a href={route("contact")}>Contact</a>
        </nav>
        <div className="menu-bar__right"><span className="menu-status"><span className="status-dot"></span> Available for select work</span><span className="menu-clock">09:41</span></div>
      </header>

      <div className="desktop-icons" aria-label="Desktop shortcuts">
        <a className="desktop-icon" href={route("work")}><span className="desktop-icon__glyph desktop-icon__glyph--folder"><Folder size={27} strokeWidth={1.4} aria-hidden="true" /></span><span>Selected Work</span></a>
        <a className="desktop-icon" href={route("about")}><span className="desktop-icon__glyph"><FileText size={27} strokeWidth={1.4} aria-hidden="true" /></span><span>About Me</span></a>
        <a className="desktop-icon" href={route("contact")}><span className="desktop-icon__glyph"><Mail size={27} strokeWidth={1.4} aria-hidden="true" /></span><span>Contact</span></a>
      </div>

      <section className="finder-window" id="top" aria-labelledby="window-title" ref={windowRef}>
        <div className="window-titlebar" data-window-drag-handle onPointerDown={(event) => startInteraction(event, "drag")}>
          <span className="window-control window-control--close" aria-hidden="true"></span><span className="window-titlebar__title" id="window-title">{metadata.title}</span><span className="window-control window-control--resize" aria-hidden="true"></span>
        </div>
        <div className="window-toolbar"><div className="window-toolbar__path"><Folder size={14} strokeWidth={1.8} aria-hidden="true" /> Macintosh HD <span aria-hidden="true">›</span> {metadata.path}</div><span className="window-toolbar__meta">portfolio</span></div>
        <div className="finder-layout">
          <aside className="finder-sidebar" aria-label="Portfolio sections">
            <p className="sidebar-label">Favorites</p>
            <SidebarLink href={route()} active={page === "desktop"}><Monitor size={15} aria-hidden="true" /> Desktop</SidebarLink>
            <SidebarLink href={route("about")} active={page === "about"}><FileText size={15} aria-hidden="true" /> About Me</SidebarLink>
            <SidebarLink href={route("work")} active={page === "work"}><Folder size={15} aria-hidden="true" /> Work</SidebarLink>
            <SidebarLink href={route("contact")} active={page === "contact"}><Mail size={15} aria-hidden="true" /> Contact</SidebarLink>
            <div className="sidebar-rule"></div><p className="sidebar-label">Places</p>
            <a className="sidebar-item" href="https://github.com" target="_blank" rel="noreferrer"><Globe size={15} aria-hidden="true" /> GitHub <ExternalLink size={11} aria-hidden="true" /></a>
            <a className="sidebar-item" href="https://linkedin.com" target="_blank" rel="noreferrer"><Users size={15} aria-hidden="true" /> LinkedIn <ExternalLink size={11} aria-hidden="true" /></a>
          </aside>
          <div className="finder-content">{children}</div>
        </div>
        <div className="window-statusbar"><span>© 2024 — Built with care</span><span>Memory available: plenty</span><span className="window-resize-handle" data-window-resize-handle aria-hidden="true" onPointerDown={(event) => startInteraction(event, "resize")}></span></div>
      </section>
      <footer className="desktop-footer"><span>© 2024 Your Name</span><span>Made on a Macintosh (metaphorically)</span></footer>
      </div>
      <div className="mobile-shell">
        <header className="mobile-header">
          <a className="mobile-header__brand" href={route()} aria-label="Back to home"><Apple size={17} strokeWidth={2.4} aria-hidden="true" /><span>portfolio</span></a>
          <span className="mobile-header__availability"><span className="status-dot"></span> Available</span>
        </header>
        <nav className="mobile-nav" aria-label="Portfolio sections">
          <MobileNavLink href={route()} active={page === "desktop"}>Home</MobileNavLink>
          <MobileNavLink href={route("about")} active={page === "about"}>About</MobileNavLink>
          <MobileNavLink href={route("work")} active={page === "work"}>Work</MobileNavLink>
          <MobileNavLink href={route("contact")} active={page === "contact"}>Contact</MobileNavLink>
        </nav>
        <div className="mobile-content">{children}</div>
        <footer className="mobile-footer"><span>© 2024 Your Name</span><span>Made with care</span></footer>
      </div>
    </main>
  );
}

function SidebarLink({ href, active, children }: { href: string; active: boolean; children: ComponentChildren }) {
  return <a className={`sidebar-item${active ? " sidebar-item--active" : ""}`} href={href}>{children}</a>;
}

function MobileNavLink({ href, active, children }: { href: string; active: boolean; children: ComponentChildren }) {
  return <a className={`mobile-nav__link${active ? " mobile-nav__link--active" : ""}`} href={href}>{children}</a>;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function DesktopPage() {
  return <>
    <section className="welcome-panel" aria-labelledby="page-title">
      <div className="welcome-panel__copy"><p className="system-label"><Monitor size={13} aria-hidden="true" /> Welcome to my desktop</p><h1 id="page-title">Designing things<br /><span>worth opening.</span></h1><p className="welcome-panel__intro">I’m a designer and developer making clear, useful digital spaces for people and teams who care about the details.</p><div className="button-row"><a className="mac-button mac-button--primary" href={route("work")}>Open selected work <ArrowUpRight size={14} aria-hidden="true" /></a><a className="mac-button" href={route("contact")}>Send a message <Mail size={14} aria-hidden="true" /></a></div></div>
      <div className="welcome-panel__stamp" aria-hidden="true"><div className="stamp-screen"><Monitor size={23} strokeWidth={1.5} /><span>hello,<br />world.</span></div><span className="stamp-caption">system 7.5 / human 1.0</span></div>
    </section>
    <section className="home-launcher" aria-labelledby="launcher-title"><div className="section-heading"><div><p className="system-label"><Folder size={13} aria-hidden="true" /> Open a folder</p><h2 id="launcher-title">Explore the desktop</h2></div></div><div className="launcher-grid"><LauncherCard href={route("about")} icon={<FileText size={23} strokeWidth={1.5} />} title="About Me" subtitle="A little context" /><LauncherCard href={route("work")} icon={<Folder size={23} strokeWidth={1.5} />} title="Selected Work" subtitle="Three things worth opening" variant="folder" /><LauncherCard href={route("contact")} icon={<Mail size={23} strokeWidth={1.5} />} title="Contact" subtitle="Start a conversation" variant="message" /></div></section>
  </>;
}

function LauncherCard({ href, icon, title, subtitle, variant = "" }: { href: string; icon: preact.ComponentChildren; title: string; subtitle: string; variant?: string }) {
  return <a className={`launcher-card${variant ? ` launcher-card--${variant}` : ""}`} href={href}><span className="launcher-card__icon">{icon}</span><span><strong>{title}</strong><small>{subtitle}</small></span><ArrowUpRight size={15} aria-hidden="true" /></a>;
}

export function AboutPage() {
  return <article className="document-page" aria-labelledby="page-title"><header className="document-heading"><span className="document-heading__icon"><FileText size={28} strokeWidth={1.4} aria-hidden="true" /></span><div><p className="system-label">Plain text document</p><h1 id="page-title">A bit about me</h1><p className="document-heading__meta">Last opened recently · 4 KB</p></div></header><div className="document-copy"><p className="document-lead">I like making digital things feel obvious, considered, and a little bit human.</p><p>I work across design and development, usually somewhere between a rough idea and the moment it becomes useful. My favorite projects have a strong point of view, a clear audience, and enough room for the details to matter.</p><p>This portfolio is intentionally built like a small desktop: a place to browse, open things, and find your way around without a tour guide.</p></div><div className="about-facts"><Fact icon={<Monitor size={16} />} title="Based in" text="Somewhere useful · Available remotely" /><Fact icon={<Folder size={16} />} title="Usually working with" text="Preact · TypeScript · Figma · good questions" /><Fact icon={<ArrowUpRight size={16} />} title="Interested in" text="Interfaces, systems, and small web experiments" /></div><a className="mac-button mac-button--primary document-action" href={route("work")}>Open selected work <ArrowUpRight size={14} aria-hidden="true" /></a></article>;
}

function Fact({ icon, title, text }: { icon: preact.ComponentChildren; title: string; text: string }) { return <div className="fact-block">{icon}<span><strong>{title}</strong><small>{text}</small></span></div>; }

export function WorkPage() { return <section className="work-section work-page" aria-labelledby="page-title"><div className="section-heading"><div><p className="system-label"><Folder size={13} aria-hidden="true" /> Recent documents</p><h1 id="page-title">Selected work</h1></div><span className="section-heading__count">01—03</span></div><p className="section-intro">A few projects, experiments, and systems I’ve enjoyed opening up.</p><ProjectExplorer /></section>; }

export function ContactPage() { return <section className="contact-page" aria-labelledby="page-title"><div className="contact-page__hero"><p className="system-label"><Mail size={13} aria-hidden="true" /> Outgoing message</p><h1 id="page-title">Have a good idea?</h1><p>Tell me what you’re making, what’s stuck, or what you want to try next. I’ll get back to you at the speed of a thoughtful email.</p></div><div className="contact-options"><a className="contact-option" href="mailto:hello@example.com"><span className="contact-option__icon"><Mail size={23} strokeWidth={1.5} /></span><span><strong>hello@example.com</strong><small>Best for project details</small></span><ArrowUpRight size={15} aria-hidden="true" /></a><a className="contact-option contact-option--blue" href={route("work")}><span className="contact-option__icon"><Folder size={23} strokeWidth={1.5} /></span><span><strong>Start with the work</strong><small>Browse the selected projects</small></span><ArrowUpRight size={15} aria-hidden="true" /></a></div></section>; }

export default FinderApp;
