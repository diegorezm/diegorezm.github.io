import {
  ArrowUpRight,
  ExternalLink,
  FileText,
  Folder,
  Globe,
  Mail,
  Monitor,
  Users,
} from "lucide-preact";
import type { ComponentChildren } from "preact";
import { createContext } from "preact";
import { useContext, useEffect, useRef, useState } from "preact/hooks";
import { useLocation } from "preact-iso";
import { type Language, type Translation, translations } from "../i18n";
import ProjectExplorer from "./project-explorer";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const route = (page = "") => (page ? `${base}/${page}/` : `${base}/`);

const LanguageContext = createContext<{
  language: Language;
  t: Translation;
  toggleLanguage: () => void;
}>({
  language: "en",
  t: translations.en,
  toggleLanguage: () => undefined,
});

export function useLanguage() {
  return useContext(LanguageContext);
}

const activePage = (path: string) => {
  const normalized = path.replace(base, "");
  if (normalized.startsWith("/about")) return "about";
  if (normalized.startsWith("/work")) return "work";
  if (normalized.startsWith("/contact")) return "contact";
  return "desktop";
};

function FinderApp({ children }: { children: ComponentChildren }) {
  const { path } = useLocation();
  const page = activePage(path);
  const [language, setLanguage] = useState<Language>(() => (path.includes("/pt-br") ? "pt" : "en"));
  const t = translations[language];
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
    const savedLanguage = localStorage.getItem("portfolio-language");
    const browserLanguage = path.includes("/pt-br")
      ? "pt"
      : navigator.language.toLowerCase().startsWith("pt")
        ? "pt"
        : "en";
    const detectedLanguage =
      savedLanguage === "pt" || savedLanguage === "en" ? savedLanguage : browserLanguage;
    setLanguage(detectedLanguage);
    document.documentElement.lang = detectedLanguage === "pt" ? "pt-BR" : "en";
  }, []);

  useEffect(() => {
    const pageTitle = {
      desktop: t.seoTitle,
      about: `${t.aboutTitle} | ${t.seoTitle}`,
      work: `${t.workTitle} | ${t.seoTitle}`,
      contact: `${t.contactTitle} | ${t.seoTitle}`,
    }[page];
    document.title = pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.seoDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", pageTitle);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", t.seoDescription);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", pageTitle);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", t.seoDescription);
  }, [page, t]);

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
          width: clamp(
            current.size.width + deltaX,
            minWidth,
            Math.max(minWidth, window.innerWidth - current.rect.left - 16),
          ),
          height: clamp(
            current.size.height + deltaY,
            minHeight,
            Math.max(minHeight, window.innerHeight - current.rect.top - 28),
          ),
        };
        windowElement.style.width = `${size.current.width}px`;
        windowElement.style.height = `${size.current.height}px`;
      }
    };

    const stopInteraction = () => {
      const current = interaction.current;
      if (!current || !windowRef.current) return;
      sessionStorage.setItem(
        "portfolio-finder-window",
        JSON.stringify({ position: position.current, size: size.current }),
      );
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

  const metadata = {
    desktop: { title: `${t.portfolio} — ${t.finder}`, path: t.portfolio },
    about: {
      title: `${t.aboutMe.toLowerCase()} — ${t.finder}`,
      path: `${t.portfolio} / ${t.aboutMe.toLowerCase()}.txt`,
    },
    work: {
      title: `${t.selectedWork.toLowerCase()} — ${t.finder}`,
      path: `${t.portfolio} / ${t.selectedWork.toLowerCase()}`,
    },
    contact: {
      title: `${t.contact.toLowerCase()} — ${t.finder}`,
      path: `${t.portfolio} / ${t.contact.toLowerCase()}`,
    },
  }[page];

  const toggleLanguage = () => {
    const nextLanguage = language === "en" ? "pt" : "en";
    setLanguage(nextLanguage);
    localStorage.setItem("portfolio-language", nextLanguage);
    document.documentElement.lang = nextLanguage === "pt" ? "pt-BR" : "en";
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      <main className="desktop-shell">
        <div className="desktop-experience">
          <header className="menu-bar">
            <nav className="menu-bar__left" aria-label="System menu">
              <a className="apple-mark" href={route()} aria-label={t.desktopBack}>
                <span className="brand-mark">D</span>
              </a>
              <a href={route("about")}>{t.about}</a>
              <a href={route("work")}>{t.work}</a>
              <a href={route("contact")}>{t.contact}</a>
            </nav>
            <div className="menu-bar__right">
              <span className="menu-status">
                <span className="status-dot"></span> {t.available}
              </span>
              <span className="menu-clock">09:41</span>
              <button
                className="language-toggle"
                type="button"
                onClick={toggleLanguage}
                aria-label={`${t.languageSwitchLabel}: ${t.languageSwitchShort}`}
              >
                {t.languageSwitchShort}
              </button>
            </div>
          </header>

          <nav className="desktop-icons" aria-label="Desktop shortcuts">
            <a className="desktop-icon" href={route("work")}>
              <span className="desktop-icon__glyph desktop-icon__glyph--folder">
                <Folder size={27} strokeWidth={1.4} aria-hidden="true" />
              </span>
              <span>{t.selectedWork}</span>
            </a>
            <a className="desktop-icon" href={route("about")}>
              <span className="desktop-icon__glyph">
                <FileText size={27} strokeWidth={1.4} aria-hidden="true" />
              </span>
              <span>{t.aboutMe}</span>
            </a>
            <a className="desktop-icon" href={route("contact")}>
              <span className="desktop-icon__glyph">
                <Mail size={27} strokeWidth={1.4} aria-hidden="true" />
              </span>
              <span>{t.contact}</span>
            </a>
          </nav>

          <section
            className="finder-window"
            id="top"
            aria-labelledby="window-title"
            ref={windowRef}
          >
            <div
              className="window-titlebar"
              data-window-drag-handle
              onPointerDown={(event) => startInteraction(event, "drag")}
            >
              <span className="window-control window-control--close" aria-hidden="true"></span>
              <span className="window-titlebar__title" id="window-title">
                {metadata.title}
              </span>
              <span className="window-control window-control--resize" aria-hidden="true"></span>
            </div>
            <div className="window-toolbar">
              <div className="window-toolbar__path">
                <Folder size={14} strokeWidth={1.8} aria-hidden="true" /> Macintosh HD{" "}
                <span aria-hidden="true">›</span> {metadata.path}
              </div>
              <span className="window-toolbar__meta">{t.portfolio}</span>
            </div>
            <div className="finder-layout">
              <aside className="finder-sidebar" aria-label="Portfolio sections">
                <p className="sidebar-label">{t.favorites}</p>
                <SidebarLink href={route()} active={page === "desktop"}>
                  <Monitor size={15} aria-hidden="true" /> {t.desktop}
                </SidebarLink>
                <SidebarLink href={route("about")} active={page === "about"}>
                  <FileText size={15} aria-hidden="true" /> {t.aboutMe}
                </SidebarLink>
                <SidebarLink href={route("work")} active={page === "work"}>
                  <Folder size={15} aria-hidden="true" /> {t.work}
                </SidebarLink>
                <SidebarLink href={route("contact")} active={page === "contact"}>
                  <Mail size={15} aria-hidden="true" /> {t.contact}
                </SidebarLink>
                <div className="sidebar-rule"></div>
                <p className="sidebar-label">{t.places}</p>
                <a
                  className="sidebar-item"
                  href="https://github.com/diegorezm"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Globe size={15} aria-hidden="true" /> {t.github}{" "}
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
                <a
                  className="sidebar-item"
                  href="https://www.linkedin.com/in/diegorezm/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Users size={15} aria-hidden="true" /> {t.linkedin}{" "}
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
              </aside>
              <div className="finder-content">{children}</div>
            </div>
            <div className="window-statusbar">
              <span>
                {t.copyright} — {t.madeCare}
              </span>
              <span>{t.memory}</span>
              <span
                className="window-resize-handle"
                data-window-resize-handle
                aria-hidden="true"
                onPointerDown={(event) => startInteraction(event, "resize")}
              ></span>
            </div>
          </section>
          <footer className="desktop-footer">
            <span>{t.copyright}</span>
            <span>{t.madeMac}</span>
          </footer>
        </div>
        <div className="mobile-shell">
          <header className="mobile-header">
            <a className="mobile-header__brand" href={route()} aria-label={t.backHome}>
              <span className="brand-mark">D</span>
              <span>{t.portfolio}</span>
            </a>
            <span className="mobile-header__availability">
              <span className="status-dot"></span> {t.availableShort}
            </span>
            <button
              className="language-toggle language-toggle--mobile"
              type="button"
              onClick={toggleLanguage}
              aria-label={`${t.languageSwitchLabel}: ${t.languageSwitchShort}`}
            >
              {t.languageSwitchShort}
            </button>
          </header>
          <nav className="mobile-nav" aria-label="Portfolio sections">
            <MobileNavLink href={route()} active={page === "desktop"}>
              {t.home}
            </MobileNavLink>
            <MobileNavLink href={route("about")} active={page === "about"}>
              {t.about}
            </MobileNavLink>
            <MobileNavLink href={route("work")} active={page === "work"}>
              {t.work}
            </MobileNavLink>
            <MobileNavLink href={route("contact")} active={page === "contact"}>
              {t.contact}
            </MobileNavLink>
          </nav>
          <div className="mobile-content">{children}</div>
          <footer className="mobile-footer">
            <span>{t.copyright}</span>
            <span>{t.madeCare}</span>
          </footer>
        </div>
      </main>
    </LanguageContext.Provider>
  );
}

function SidebarLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ComponentChildren;
}) {
  return (
    <a className={`sidebar-item${active ? " sidebar-item--active" : ""}`} href={href}>
      {children}
    </a>
  );
}

function MobileNavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ComponentChildren;
}) {
  return (
    <a className={`mobile-nav__link${active ? " mobile-nav__link--active" : ""}`} href={href}>
      {children}
    </a>
  );
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function DesktopPage() {
  const { t } = useLanguage();
  return (
    <>
      <section className="welcome-panel" aria-labelledby="page-title">
        <div className="welcome-panel__copy">
          <p className="system-label">
            <Monitor size={13} aria-hidden="true" /> {t.welcome}
          </p>
          <h1 id="page-title">
            {t.heroTitleFirst}
            <br />
            <span>{t.heroTitleSecond}</span>
          </h1>
          <p className="welcome-panel__intro">{t.heroIntro}</p>
          <div className="button-row">
            <a className="mac-button mac-button--primary" href={route("work")}>
              {t.openWork} <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a className="mac-button" href={route("contact")}>
              {t.sendMessage} <Mail size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="welcome-panel__stamp" aria-hidden="true">
          <div className="stamp-screen">
            <Monitor size={23} strokeWidth={1.5} />
            <span>
              {t.helloWorldFirst}
              <br />
              {t.helloWorldSecond}
            </span>
          </div>
          <span className="stamp-caption">{t.systemStamp}</span>
        </div>
      </section>
      <section className="home-launcher" aria-labelledby="launcher-title">
        <div className="section-heading">
          <div>
            <p className="system-label">
              <Folder size={13} aria-hidden="true" /> {t.openFolder}
            </p>
            <h2 id="launcher-title">{t.exploreDesktop}</h2>
          </div>
        </div>
        <div className="launcher-grid">
          <LauncherCard
            href={route("about")}
            icon={<FileText size={23} strokeWidth={1.5} />}
            title={t.aboutMe}
            subtitle={t.aboutSubtitle}
          />
          <LauncherCard
            href={route("work")}
            icon={<Folder size={23} strokeWidth={1.5} />}
            title={t.selectedWork}
            subtitle={t.workSubtitle}
            variant="folder"
          />
          <LauncherCard
            href={route("contact")}
            icon={<Mail size={23} strokeWidth={1.5} />}
            title={t.contact}
            subtitle={t.contactSubtitle}
            variant="message"
          />
        </div>
      </section>
    </>
  );
}

function LauncherCard({
  href,
  icon,
  title,
  subtitle,
  variant = "",
}: {
  href: string;
  icon: preact.ComponentChildren;
  title: string;
  subtitle: string;
  variant?: string;
}) {
  return (
    <a className={`launcher-card${variant ? ` launcher-card--${variant}` : ""}`} href={href}>
      <span className="launcher-card__icon">{icon}</span>
      <span>
        <strong>{title}</strong>
        <small>{subtitle}</small>
      </span>
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}

export function AboutPage() {
  const { t } = useLanguage();
  return (
    <article className="document-page" aria-labelledby="page-title">
      <header className="document-heading">
        <span className="document-heading__icon">
          <FileText size={28} strokeWidth={1.4} aria-hidden="true" />
        </span>
        <div>
          <p className="system-label">{t.plainText}</p>
          <h1 id="page-title">{t.aboutTitle}</h1>
          <p className="document-heading__meta">{t.lastOpened}</p>
        </div>
      </header>
      <div className="document-copy">
        <p className="document-lead">{t.aboutLead}</p>
        <p>{t.aboutBodyOne}</p>
        <p>{t.aboutBodyTwo}</p>
      </div>
      <div className="about-facts">
        <Fact icon={<Monitor size={16} />} title={t.basedIn} text={t.basedInText} />
        <Fact icon={<Folder size={16} />} title={t.workingWith} text={t.workingWithText} />
        <Fact icon={<ArrowUpRight size={16} />} title={t.interestedIn} text={t.interestedInText} />
      </div>
      <a className="mac-button mac-button--primary document-action" href={route("work")}>
        {t.openWork} <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </article>
  );
}

function Fact({
  icon,
  title,
  text,
}: {
  icon: preact.ComponentChildren;
  title: string;
  text: string;
}) {
  return (
    <div className="fact-block">
      {icon}
      <span>
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
    </div>
  );
}

export function WorkPage() {
  const { t } = useLanguage();
  return (
    <section className="work-section work-page" aria-labelledby="page-title">
      <div className="section-heading">
        <div>
          <p className="system-label">
            <Folder size={13} aria-hidden="true" /> {t.recentDocuments}
          </p>
          <h1 id="page-title">{t.workTitle}</h1>
        </div>
        <span className="section-heading__count">{t.workCount}</span>
      </div>
      <p className="section-intro">{t.workIntro}</p>
      <ProjectExplorer />
    </section>
  );
}

export function ContactPage() {
  const { language, t } = useLanguage();
  return (
    <section className="contact-page" aria-labelledby="page-title">
      <div className="contact-page__hero">
        <p className="system-label">
          <Mail size={13} aria-hidden="true" /> {t.outgoingMessage}
        </p>
        <h1 id="page-title">{t.contactTitle}</h1>
        <p>{t.contactIntro}</p>
      </div>
      <div className="contact-options">
        <a className="contact-option" href="mailto:diegommrez12@gmail.com">
          <span className="contact-option__icon">
            <Mail size={23} strokeWidth={1.5} />
          </span>
          <span>
            <strong>diegommrez12@gmail.com</strong>
            <small>{t.bestForDetails}</small>
          </span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <a
          className="contact-option contact-option--blue"
          href="https://github.com/diegorezm"
          target="_blank"
          rel="noreferrer"
        >
          <span className="contact-option__icon">
            <Globe size={23} strokeWidth={1.5} />
          </span>
          <span>
            <strong>GitHub</strong>
            <small>
              {language === "en"
                ? "Open-source work and experiments"
                : "Trabalhos open source e experimentos"}
            </small>
          </span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <a
          className="contact-option"
          href="https://www.linkedin.com/in/diegorezm/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="contact-option__icon">
            <Users size={23} strokeWidth={1.5} />
          </span>
          <span>
            <strong>LinkedIn</strong>
            <small>{language === "en" ? "Connect professionally" : "Conexões profissionais"}</small>
          </span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
        <a className="contact-option contact-option--blue" href={route("work")}>
          <span className="contact-option__icon">
            <Folder size={23} strokeWidth={1.5} />
          </span>
          <span>
            <strong>{t.startWithWork}</strong>
            <small>{t.browseProjects}</small>
          </span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export default FinderApp;
