import { useEffect, useState } from "preact/hooks";
import { EMAIL, GITHUB, type Language, LINKEDIN, QUEST_MAP, type Translation } from "../i18n";
import { HERO_SCENE, SYMBOLS, VALLEY_SCENE } from "./scenery";

type Props = {
  language: Language;
  t: Translation;
  theme: "light" | "dark";
  toggleTheme: () => void;
  toggleLanguage: () => void;
};

const ext = { target: "_blank", rel: "noreferrer" } as const;

/** Inline SVG markup we author ourselves (scenery.ts), never user input. */
const raw = (html: string) => ({ __html: html });

function Head({ class: className }: { class?: string }) {
  return (
    <svg class={className} aria-hidden="true">
      <use href="#axo-head" />
    </svg>
  );
}

const icons = [
  <svg key="sprout" viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16 29V12" />
    <path d="M16 18C10 18 7 13 8 7c6 0 9 5 8 11z" />
    <path d="M16 14c5 0 8-4 7-9-5 0-8 4-7 9z" />
  </svg>,
  <svg key="peak" viewBox="0 0 32 32" aria-hidden="true">
    <path d="M2 27L12 11l6 9 4-5 8 12z" />
    <path d="M10 14l2 2 2-2" />
  </svg>,
  <svg key="book" viewBox="0 0 32 32" aria-hidden="true">
    <path d="M6 5h16a4 4 0 014 4v18H10a4 4 0 01-4-4z" />
    <path d="M6 23a4 4 0 014-4h16" />
    <path d="M11 10h10M11 14h7" />
  </svg>,
];
const stripTargets = ["#work", "#quest", "#experience", "#contact"];

export default function Home({ t, theme, toggleTheme, toggleLanguage }: Props) {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(id);
  }, [toast]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToast(t.footer.copied);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const { work, quest, experience, footer } = t;

  return (
    <>
      <svg width="0" height="0" style="position:absolute" aria-hidden="true">
        <defs dangerouslySetInnerHTML={raw(SYMBOLS)} />
      </svg>

      <header class="top">
        <nav>
          <a class="label" href="#work">
            {t.nav.work}
          </a>
          <a class="label hide-sm" href="#quest">
            {t.nav.quest}
          </a>
        </nav>
        <a class="logo" href="#top" aria-label={t.home}>
          <Head />
        </a>
        <nav>
          <a class="label hide-sm" href="#experience">
            {t.nav.experience}
          </a>
          <a class="label hide-sm" href="#contact">
            {t.nav.contact}
          </a>
          <span class="toggles">
            <button
              type="button"
              class="toggle label"
              onClick={toggleLanguage}
              aria-label={t.langLabel}
            >
              {t.langShort}
            </button>
            <button type="button" class="toggle" onClick={toggleTheme} aria-label={t.themeLabel}>
              {theme === "dark" ? "☀" : "◐"}
            </button>
          </span>
        </nav>
      </header>

      <main id="top">
        <section class="hero">
          <div class="hero__text">
            <span class="label">{t.hero.eyebrow}</span>
            <h1>
              {t.hero.title}
              <br />
              <em>{t.hero.titleEm}</em>
            </h1>
            <p class="lead">{t.hero.lead}</p>
            <div class="cta">
              <a class="label link-arrow" href="#work">
                {t.hero.seeWork}
              </a>
              <a class="btn-pill" href="#contact">
                {t.hero.hire}
              </a>
            </div>
          </div>
          <svg
            class="scene"
            viewBox="0 0 1440 560"
            preserveAspectRatio="xMaxYMax slice"
            aria-hidden="true"
            dangerouslySetInnerHTML={raw(HERO_SCENE)}
          />
        </section>

        <nav class="strip" aria-label={t.home}>
          {t.strip.map((cell, i) => (
            <a key={cell.title} href={stripTargets[i]} class={icons[i] ? undefined : "status-cell"}>
              {icons[i]}
              <div>
                <span class="label">
                  {!icons[i] && <i class="dot" aria-hidden="true" />}
                  {cell.title}
                </span>
                <p>
                  {cell.text[0]}
                  <br />
                  {cell.text[1]}
                </p>
                <span class="go">{cell.go}</span>
              </div>
            </a>
          ))}
        </nav>

        <section class="block wrap" id="work">
          <div class="head">
            <div>
              <span class="label">{work.eyebrow}</span>
              <h2>
                {work.title} <em>{work.titleEm}</em>
              </h2>
            </div>
            <p class="aside">{work.aside}</p>
          </div>

          <div class="feature">
            <a class="feat" href={`${GITHUB}/meu-edital`} {...ext}>
              <div class="feat__art" style="background:#efe2c9">
                <svg
                  class="bg"
                  viewBox="0 0 400 225"
                  preserveAspectRatio="xMidYMax slice"
                  aria-hidden="true"
                >
                  <path
                    d="M0 170C90 140 180 160 260 150C320 142 370 160 400 152V225H0Z"
                    fill="#dcc9a3"
                  />
                  <path d="M0 195C120 180 260 200 400 185V225H0Z" fill="#cdb68a" />
                </svg>
                <div class="mock mock--edital" aria-hidden="true">
                  <div class="mock__row">
                    <span class="label">{work.edital.mock.next}</span>
                    <span class="mock__chip">50 min</span>
                  </div>
                  <strong>{work.edital.mock.subject}</strong>
                  <span class="mock__sub">{work.edital.mock.sub}</span>
                  <div class="mock__bar">
                    <i />
                  </div>
                  <div class="mock__row mock__foot">
                    <span>{work.edital.mock.lap}</span>
                    <span>+120 XP</span>
                  </div>
                </div>
              </div>
              <div class="feat__body">
                <span class="label">{work.edital.kind}</span>
                <h3>Meu Edital</h3>
                <p>{work.edital.blurb}</p>
                <div class="meta">
                  <span class="status" style="--c:#d9a441">
                    {t.status.waitlist}
                  </span>
                  <span>{work.edital.stack}</span>
                </div>
              </div>
            </a>

            <a class="feat" href={`${GITHUB}/pomolotl`} {...ext}>
              <div class="feat__art" style="background:#cfe6ea">
                <svg
                  class="bg"
                  viewBox="0 0 400 225"
                  preserveAspectRatio="xMidYMax slice"
                  aria-hidden="true"
                >
                  <circle cx="330" cy="50" r="26" fill="#f7f0d6" />
                  <path
                    d="M0 175C100 150 200 170 300 158C350 152 380 162 400 158V225H0Z"
                    fill="#a9d1cf"
                  />
                  <path d="M0 198C140 188 260 205 400 192V225H0Z" fill="#8cbfba" />
                </svg>
                <div class="mock mock--pomo" aria-hidden="true">
                  <svg viewBox="0 0 120 120" aria-hidden="true">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#d7e6e6" stroke-width="8" />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#2f6f78"
                      stroke-width="8"
                      stroke-linecap="round"
                      stroke-dasharray="314"
                      stroke-dashoffset="96"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div class="mock__time">
                    <strong>17:24</strong>
                    <span class="label">{work.pomolotl.mock.phase}</span>
                  </div>
                </div>
              </div>
              <div class="feat__body">
                <span class="label">{work.pomolotl.kind}</span>
                <h3>Pomolotl</h3>
                <p>{work.pomolotl.blurb}</p>
                <div class="meta">
                  <span class="status">{t.status.live}</span>
                  <span>{work.pomolotl.stack}</span>
                </div>
              </div>
            </a>
          </div>

          <ul class="index">
            {work.items.map((p, i) => (
              <li key={p.repo}>
                <a href={`${GITHUB}/${p.repo}`} {...ext}>
                  <span class="n">{String(i + 3).padStart(2, "0")}</span>
                  <span class="t">{p.name}</span>
                  <span class="d">{p.blurb}</span>
                  <span class="s">
                    {p.stack} · {t.status[p.status]}
                  </span>
                  <span class="arr" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section class="block wrap" id="quest">
          <div class="quest">
            <svg
              class="quest__hills"
              viewBox="0 0 1200 300"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 160C200 110 400 150 600 120C800 92 1000 150 1200 116V300H0Z"
                fill="var(--hill-far)"
                opacity=".7"
              />
              <path
                d="M0 230C240 200 480 230 720 214C960 200 1080 226 1200 216V300H0Z"
                fill="var(--hill-mid)"
                opacity=".7"
              />
            </svg>
            <div class="quest__top">
              <div>
                <span class="label">{quest.eyebrow}</span>
                <h2>
                  {quest.title} <em>{quest.titleEm}</em>
                </h2>
              </div>
              <p>{quest.lead}</p>
            </div>
            <ol class="trail">
              {quest.stages.map((s, i) => (
                <li key={s.name} class={i === 0 ? "now" : undefined}>
                  {i === 0 && (
                    <svg class="hiker" aria-hidden="true">
                      <use href="#axo-hike" />
                    </svg>
                  )}
                  <span class="stone">
                    {String(i).padStart(2, "0")}
                    {i === 0 && <span class="sr-only"> · {quest.current}</span>}
                  </span>
                  <div>
                    <b>{s.name}</b>
                    <small>{s.boss}</small>
                  </div>
                </li>
              ))}
            </ol>
            <div class="quest__cta">
              <a class="btn-pill" href={QUEST_MAP} {...ext}>
                {quest.cta}
              </a>
            </div>
          </div>
        </section>

        <section class="block wrap" id="experience">
          <div class="log">
            <div>
              <span class="label">{experience.eyebrow}</span>
              <h2>
                {experience.title} <em>{experience.titleEm}</em>
              </h2>
              <p class="aside">{experience.aside}</p>
            </div>
            <div>
              <ul>
                {experience.items.map((x) => (
                  <li key={`${x.period}${x.role}`}>
                    <span class="when">{x.period}</span>
                    <span class="role">{x.role}</span>
                    <span class="org">{x.org}</span>
                  </li>
                ))}
              </ul>
              <p class="extra">
                {experience.education}
                <br />
                {experience.extras}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer class="end" id="contact">
        <div class="end__card">
          <div class="end__cols">
            <div class="end__brand">
              <Head />
              <div>
                <strong>Diego Rezende</strong>
                <span>{footer.tagline}</span>
              </div>
            </div>
            <div>
              <h4>{footer.contact}</h4>
              <ul>
                <li>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </li>
                <li>
                  <button type="button" class="copy" onClick={copyEmail}>
                    {footer.copy}
                  </button>
                </li>
                <li>
                  <a href={LINKEDIN} {...ext}>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={GITHUB} {...ext}>
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4>{footer.projects}</h4>
              <ul>
                {["meu-edital", "pomolotl", "grimo", "leme"].map((repo) => (
                  <li key={repo}>
                    <a href={`${GITHUB}/${repo}`} {...ext}>
                      {repo === "meu-edital" ? "Meu Edital" : repo[0].toUpperCase() + repo.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>{footer.here}</h4>
              <ul>
                <li>
                  <a href="#work">{t.nav.work}</a>
                </li>
                <li>
                  <a href="#quest">{t.nav.quest}</a>
                </li>
                <li>
                  <a href="#experience">{t.nav.experience}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="end__land">
            <div class="ghost" aria-hidden="true">
              Diego
            </div>
            <svg
              class="valley"
              viewBox="0 0 1200 480"
              preserveAspectRatio="xMidYMax slice"
              aria-hidden="true"
              dangerouslySetInnerHTML={raw(VALLEY_SCENE)}
            />
            <div class="bar">
              <span>© 2026 Diego Rezende</span>
              <nav>
                <a href={GITHUB} aria-label="GitHub" {...ext}>
                  gh
                </a>
                <a href={LINKEDIN} aria-label="LinkedIn" {...ext}>
                  in
                </a>
                <a href={`mailto:${EMAIL}`} aria-label="Email">
                  @
                </a>
              </nav>
            </div>
          </div>
        </div>
      </footer>

      <div class={`toast${toast ? " is-on" : ""}`} role="status">
        {toast}
      </div>
    </>
  );
}
