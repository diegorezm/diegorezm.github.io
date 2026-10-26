import { ArrowUpRight, Copy, Moon, Sun } from "lucide-preact";
import { useEffect, useState } from "preact/hooks";
import { EMAIL, GITHUB, type Language, LINKEDIN, type Translation } from "../i18n";

type Props = {
  language: Language;
  t: Translation;
  theme: "light" | "dark";
  toggleTheme: () => void;
  toggleLanguage: () => void;
};

/** The concentric line art from the LinkedIn header. */
function Rings() {
  const c = 280;
  const circles = [];
  for (let r = 10; r < 280; r += 9) circles.push(r);
  const spokes = Array.from({ length: 24 }, (_, i) => (i / 24) * Math.PI * 2);
  return (
    <svg class="rings" viewBox="0 0 560 560" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="0.8">
        {circles.map((r) => (
          <circle key={r} cx={c} cy={c} r={r} />
        ))}
        {spokes.map((a) => (
          <line key={a} x1={c} y1={c} x2={c + Math.cos(a) * c} y2={c + Math.sin(a) * c} />
        ))}
      </g>
    </svg>
  );
}

export default function Home({ t, theme, toggleTheme, toggleLanguage }: Props) {
  const [toast, setToast] = useState<string | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToast(t.contact.copied);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(id);
  }, [toast]);

  return (
    <>
      <header class="top">
        <a class="wordmark" href="#top">
          Diego Rezende<span>.</span>
        </a>
        <nav>
          <a href="#work">{t.nav.work}</a>
          <a href="#experience">{t.nav.experience}</a>
          <a href="#contact">{t.nav.contact}</a>
          <button type="button" class="toggle" onClick={toggleLanguage} aria-label={t.langLabel}>
            {t.langShort}
          </button>
          <button type="button" class="toggle" onClick={toggleTheme} aria-label={t.themeLabel}>
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </nav>
      </header>

      <main id="top">
        <section class="hero">
          <Rings />
          <h1>
            Diego Rezende<span>.</span>
          </h1>
          <p class="tagline">
            {t.tagline.map((word, i) => (
              <span key={word}>
                {i > 0 && <i aria-hidden="true">|</i>}
                {word}
              </span>
            ))}
          </p>
          <p class="lead">{t.lead}</p>
          <p class="contacts">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={GITHUB} target="_blank" rel="noreferrer">
              github.com/diegorezm
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              linkedin.com/in/diegorezm
            </a>
          </p>
        </section>

        <section class="section" id="work">
          <h2>{t.work.title}</h2>
          <ul class="list">
            {t.work.items.map((p) => (
              <li key={p.repo}>
                <a class="work" href={`${GITHUB}/${p.repo}`} target="_blank" rel="noreferrer">
                  <span class="work__name">
                    {p.name}
                    {p.active && <small>● {t.work.building}</small>}
                  </span>
                  <span class="work__blurb">{p.blurb}</span>
                  <span class="work__stack">{p.stack}</span>
                  <ArrowUpRight class="work__arrow" size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section class="section" id="experience">
          <h2>{t.experience.title}</h2>
          <ul class="list">
            {t.experience.items.map((x) => (
              <li key={`${x.period}${x.role}`} class="job">
                <span class="job__period">{x.period}</span>
                <span class="job__role">{x.role}</span>
                <span class="job__org">{x.org}</span>
              </li>
            ))}
          </ul>
          <p class="note">{t.experience.education}</p>
          <p class="note">{t.experience.extras}</p>
        </section>

        <section class="section" id="contact">
          <h2>{t.contact.title}</h2>
          <p class="lead">{t.contact.lead}</p>
          <p class="email">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button type="button" class="toggle toggle--text" onClick={copyEmail}>
              <Copy size={13} aria-hidden="true" /> {t.contact.copy}
            </button>
          </p>
        </section>
      </main>

      <footer class="footer">
        <span>© 2026 Diego Rezende</span>
        <span>diegorezm.github.io</span>
      </footer>

      <div class={`toast${toast ? " is-on" : ""}`} role="status">
        {toast}
      </div>
    </>
  );
}
