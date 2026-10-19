import { ArrowDown, ArrowUpRight, Copy, Mail, Moon, Sun } from "lucide-preact";
import { useEffect, useState } from "preact/hooks";
import { confetti, prefersReducedMotion } from "../fx";
import { EMAIL, GITHUB, type Language, LINKEDIN, marquee, type Translation } from "../i18n";
import Stickers from "./stickers";
import Terminal from "./terminal";

type Props = {
  language: Language;
  t: Translation;
  theme: "light" | "dark";
  toggleTheme: () => void;
  toggleLanguage: () => void;
};

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

/** Splits a word into letters that bounce individually on hover. */
const Bouncy = ({ word }: { word: string }) => (
  <span class="bouncy">
    <span class="sr-only">{word}</span>
    {[...word].map((ch, i) => (
      <span key={i} aria-hidden="true" style={{ "--i": i }}>
        {ch}
      </span>
    ))}
  </span>
);

export default function Home({ language, t, theme, toggleTheme, toggleLanguage }: Props) {
  const [toast, setToast] = useState<string | null>(null);

  const copyEmail = async (event: MouseEvent) => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToast(t.hero.copied);
      confetti(event.clientX, event.clientY, 60);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  // Reveal sections as they scroll into view.
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      for (const el of items) el.classList.add("in");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    for (const el of items) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Konami code turns on party mode.
  useEffect(() => {
    const code = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let index = 0;
    const onKey = (event: KeyboardEvent) => {
      index =
        event.key.toLowerCase() === code[index].toLowerCase()
          ? index + 1
          : event.key === code[0]
            ? 1
            : 0;
      if (index === code.length) {
        index = 0;
        document.documentElement.classList.add("party");
        confetti(window.innerWidth / 4, window.innerHeight / 2);
        confetti((window.innerWidth / 4) * 3, window.innerHeight / 2);
        window.setTimeout(() => document.documentElement.classList.remove("party"), 6000);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const tilt = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = event.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - 0.5;
    const y = (event.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
  };
  const untilt = (event: PointerEvent) => {
    const el = event.currentTarget as HTMLElement;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const accents = ["lime", "pink", "blue", "orange"];

  return (
    <>
      <a class="skip" href="#work">
        Skip to content
      </a>

      <nav class="nav">
        <a class="logo" href="#top" aria-label="Diego Rezende">
          dr<span>.</span>
        </a>
        <div class="nav__links">
          <a href="#work">{t.nav.work}</a>
          <a href="#xp">{t.nav.xp}</a>
          <a href="#stack">{t.nav.stack}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>
        <div class="nav__tools">
          <button type="button" class="chip-btn" onClick={toggleLanguage} aria-label={t.langLabel}>
            {t.langShort}
          </button>
          <button type="button" class="chip-btn" onClick={toggleTheme} aria-label={t.themeLabel}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      <header class="hero" id="top">
        <Stickers hire={t.stickers.hire} />
        <div class="hero__grid">
          <div class="hero__copy">
            <p class="badge">
              <span class="pulse" aria-hidden="true" />
              {t.hero.badge}
            </p>
            <p class="hero__hello">{t.hero.hello}</p>
            <h1 class="hero__name">
              <Bouncy word={t.hero.first} />
              <span class="hero__last">
                <Bouncy word={t.hero.last} />
              </span>
            </h1>
            <p class="hero__lead">{t.hero.lead}</p>
            <div class="hero__ctas">
              <a class="btn btn--lime" href="#work">
                {t.hero.ctaWork} <ArrowDown size={18} aria-hidden="true" />
              </a>
              <button type="button" class="btn" onClick={copyEmail}>
                <Copy size={18} aria-hidden="true" /> {t.hero.ctaEmail}
              </button>
            </div>
            <ul class="facts">
              {t.hero.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p class="drag-hint">{t.hero.dragHint} ↗</p>
          </div>
          <Terminal language={language} t={t} onTheme={toggleTheme} onLang={toggleLanguage} />
        </div>
      </header>

      <div class="marquees" aria-hidden="true">
        {[0, 1].map((row) => (
          <div key={row} class={`marquee marquee--${row ? "pink" : "lime"}`}>
            <div class="marquee__track">
              {[...marquee, ...marquee].map((item, i) => (
                <span key={i}>
                  {item} <b>✦</b>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <main>
        <section class="section" id="work">
          <SectionHead
            eyebrow={t.projects.eyebrow}
            title={t.projects.title}
            lead={t.projects.lead}
          />
          <div class="projects">
            {t.projects.items.map((p, i) => (
              <a
                key={p.name}
                class={`project card accent-${accents[i % accents.length]}`}
                href={`${GITHUB}/${p.repo}`}
                target="_blank"
                rel="noreferrer"
                onPointerMove={tilt}
                onPointerLeave={untilt}
                data-reveal
                style={{ "--delay": `${i * 80}ms` }}
              >
                <div class="project__top">
                  <span class="project__num">0{i + 1}</span>
                  <span class="project__tag">{p.tag}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.blurb}</p>
                <div class="project__foot">
                  <ul class="pills">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <span class="project__go">
                    {t.projects.view} <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section class="section" id="xp">
          <SectionHead eyebrow={t.xp.eyebrow} title={t.xp.title} lead={t.xp.lead} />
          <ol class="gitlog">
            {t.xp.items.map((x, i) => (
              <li key={x.hash} class={`commit accent-${accents[i % accents.length]}`} data-reveal>
                <span class="commit__dot" aria-hidden="true" />
                <div class="commit__meta">
                  <code class="commit__hash">{x.hash}</code>
                  {x.refs.map((r) => (
                    <code key={r} class="commit__ref">
                      {r}
                    </code>
                  ))}
                  <code class="commit__msg">{x.msg}</code>
                </div>
                <div class="commit__card card">
                  <div class="commit__head">
                    <div>
                      <h3>{x.role}</h3>
                      <p class="commit__org">{x.org}</p>
                    </div>
                    <span class="commit__period">{x.period}</span>
                  </div>
                  <ul class="commit__bullets">
                    {x.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            <li class="commit commit--edu" data-reveal>
              <span class="commit__dot" aria-hidden="true" />
              <div class="commit__meta">
                <code class="commit__hash">{t.xp.edu.hash}</code>
                {t.xp.edu.refs.map((r) => (
                  <code key={r} class="commit__ref">
                    {r}
                  </code>
                ))}
                <code class="commit__msg">{t.xp.edu.msg} 🎓</code>
              </div>
              <div class="commit__card card">
                <div class="commit__head">
                  <div>
                    <h3>{t.xp.edu.role}</h3>
                    <p class="commit__org">{t.xp.edu.org}</p>
                  </div>
                  <span class="commit__period">{t.xp.edu.period}</span>
                </div>
              </div>
            </li>
          </ol>
        </section>

        <section class="section" id="stack">
          <SectionHead eyebrow={t.stack.eyebrow} title={t.stack.title} lead={t.stack.lead} />
          <div class="inventory">
            {t.stack.groups.map((g, i) => (
              <div
                key={g.name}
                class={`slot-group card accent-${g.color}`}
                data-reveal
                style={{ "--delay": `${i * 70}ms` }}
              >
                <h3>{g.name}</h3>
                <ul>
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <h3 class="sub-title">{t.stack.achievementsTitle}</h3>
          <ul class="achievements">
            {t.stack.achievements.map((a, i) => (
              <li
                key={a.title}
                class="achievement card"
                data-reveal
                style={{ "--delay": `${i * 60}ms` }}
              >
                <span class="achievement__icon" aria-hidden="true">
                  {a.icon}
                </span>
                <div>
                  <strong>{a.title}</strong>
                  <span>{a.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section class="section contact" id="contact">
          <div class="contact__box card" data-reveal>
            <p class="eyebrow">{t.contact.eyebrow}</p>
            <h2 class="contact__title">{t.contact.title}</h2>
            <p class="contact__lead">{t.contact.lead}</p>
            <div class="contact__email">
              <a href={`mailto:${EMAIL}`} class="contact__address">
                {EMAIL}
              </a>
              <button type="button" class="btn btn--sm" onClick={copyEmail}>
                <Copy size={16} aria-hidden="true" /> {t.contact.copy}
              </button>
            </div>
            <div class="contact__links">
              <a class="btn btn--lime" href={`mailto:${EMAIL}`}>
                <Mail size={18} aria-hidden="true" /> {t.contact.write}
              </a>
              <a class="btn btn--blue" href={LINKEDIN} target="_blank" rel="noreferrer">
                <LinkedinIcon /> LinkedIn
              </a>
              <a class="btn" href={GITHUB} target="_blank" rel="noreferrer">
                <GithubIcon /> GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer class="footer">
        <span>© 2026 Diego Rezende</span>
        <span>{t.footer.built}</span>
        <span class="footer__secret">{t.footer.secret}</span>
      </footer>

      <div class={`toast${toast ? " is-on" : ""}`} role="status">
        {toast}
      </div>
    </>
  );
}

function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead: string }) {
  return (
    <div class="section__head" data-reveal>
      <p class="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p class="section__lead">{lead}</p>
    </div>
  );
}
