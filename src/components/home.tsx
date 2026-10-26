import { ArrowRight, ArrowUpRight, Copy, Mail, Moon, Sun } from "lucide-preact";
import { useEffect, useState } from "preact/hooks";
import { prefersReducedMotion } from "../fx";
import { EMAIL, GITHUB, type Language, LINKEDIN, type Translation } from "../i18n";
import Plate from "./plate";
import Terminal from "./terminal";

type Props = {
  language: Language;
  t: Translation;
  theme: "light" | "dark";
  toggleTheme: () => void;
  toggleLanguage: () => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

function useClock(language: Language) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return { date: "-- --- ----", time: "--:--:--" };
  const month = now.toLocaleString(language === "pt" ? "pt-BR" : "en-GB", { month: "short" });
  return {
    date: `${pad(now.getDate())} ${month.replace(".", "").toUpperCase()} ${now.getFullYear()}`,
    time: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
  };
}

export default function Home({ language, t, theme, toggleTheme, toggleLanguage }: Props) {
  const [toast, setToast] = useState<string | null>(null);
  const clock = useClock(language);

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
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of items) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stateLabel = { current: t.career.current, done: t.career.done, merit: t.career.merit };

  return (
    <>
      <a class="skip" href="#works">
        Skip to content
      </a>

      <div class="topbar">
        <span class="topbar__status">
          <i class="led" aria-hidden="true" /> {t.status.mode}
        </span>
        <span class="topbar__clock" aria-hidden="true">
          {clock.date} <b>·</b> {clock.time}
        </span>
        <span class="topbar__tools">
          <button type="button" class="tool" onClick={toggleLanguage} aria-label={t.langLabel}>
            {t.langShort}
          </button>
          <button type="button" class="tool" onClick={toggleTheme} aria-label={t.themeLabel}>
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </span>
      </div>

      <header class="masthead">
        <a class="brand" href="#top" aria-label="Diego Rezende">
          <span class="brand__mark" aria-hidden="true">
            R
          </span>
          <span>
            <span class="brand__name">Rezende</span>
            <span class="brand__sub">{t.archive}</span>
          </span>
        </a>
        <nav class="menu" aria-label="Sections">
          <a href="#works">{t.nav.works}</a>
          <a href="#career">{t.nav.career}</a>
          <a href="#inventory">{t.nav.inventory}</a>
          <a href="#console">{t.nav.console}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
      </header>

      <main id="top">
        <section class="hero">
          <div class="hero__intro">
            <p class="label">{t.hero.kicker}</p>
            <h1 class="hero__name">
              Diego
              <br />
              Rezende<span class="dot">.</span>
            </h1>
            <p class="hero__lead">{t.hero.lead}</p>
            <div class="actions">
              <a class="btn btn--solid" href="#works">
                {t.hero.ctaWorks} <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a class="btn" href="#contact">
                {t.hero.ctaContact}
              </a>
            </div>
          </div>

          <aside class="panel record" aria-label={t.record.title}>
            <div class="panel__head">
              <span>{t.record.title}</span>
              <span class="corner" aria-hidden="true">
                ⌗
              </span>
            </div>
            <div class="record__body">
              <p class="label">{t.record.id}</p>
              <p class="record__id">DEV-2026-0001</p>
              <dl class="fields">
                {t.record.fields.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd class={v.startsWith("●") ? "is-live" : ""}>{v}</dd>
                  </div>
                ))}
              </dl>
              <div class="record__note">
                <p class="label">{t.record.seeking}</p>
                <p>{t.record.seekingText}</p>
              </div>
            </div>
          </aside>
        </section>

        <section class="stats panel" aria-label="Overview">
          {t.stats.map((s) => (
            <div key={s.label} class="stat">
              <p class="label">{s.label}</p>
              <p class="stat__value">{s.value}</p>
              <p class="stat__note">{s.note}</p>
            </div>
          ))}
        </section>

        <section class="section" id="works">
          <SectionHead eyebrow={t.works.eyebrow} title={t.works.title} lead={t.works.lead} />
          <div class="works">
            {t.works.items.map((p, i) => (
              <a
                key={p.id}
                class="work panel"
                href={`${GITHUB}/${p.repo}`}
                target="_blank"
                rel="noreferrer"
                data-reveal
                style={{ "--delay": `${(i % 3) * 70}ms` }}
              >
                <div class="work__plate">
                  <Plate kind={p.plate} label={p.name} />
                  <span class="work__id">{p.id}</span>
                </div>
                <div class="work__body">
                  <h3>
                    {p.name}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </h3>
                  <dl class="meta">
                    <div>
                      <dt>{t.works.type}</dt>
                      <dd>{p.type}</dd>
                    </div>
                    <div>
                      <dt>{t.works.status}</dt>
                      <dd class={p.active ? "is-live" : "is-muted"}>
                        {p.active ? `● ${t.works.active}` : `○ ${t.works.archived}`}
                      </dd>
                    </div>
                  </dl>
                  <p>{p.blurb}</p>
                  <ul class="tags">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section class="section" id="career">
          <SectionHead eyebrow={t.career.eyebrow} title={t.career.title} lead={t.career.lead} />
          <div class="panel ledger" data-reveal>
            <div class="ledger__row ledger__row--head" aria-hidden="true">
              {t.career.cols.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            {t.career.items.map((x, i) => (
              <details key={x.period} class="ledger__entry" open={i === 0}>
                <summary class="ledger__row">
                  <span class="ledger__period">{x.period}</span>
                  <span class="ledger__role">{x.role}</span>
                  <span class="ledger__org">{x.org}</span>
                  <span class={`chip chip--${x.state}`}>
                    {stateLabel[x.state as keyof typeof stateLabel]}
                  </span>
                </summary>
                <ul class="ledger__notes">
                  {x.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </details>
            ))}
            <div class="ledger__row ledger__row--edu">
              <span class="ledger__period">{t.career.edu.period}</span>
              <span class="ledger__role">{t.career.edu.role}</span>
              <span class="ledger__org">{t.career.edu.org}</span>
              <span class="chip chip--edu">{t.career.edu.label}</span>
            </div>
          </div>
        </section>

        <section class="section" id="inventory">
          <SectionHead
            eyebrow={t.inventory.eyebrow}
            title={t.inventory.title}
            lead={t.inventory.lead}
          />
          <div class="inventory">
            {t.inventory.groups.map((g, i) => (
              <div
                key={g.name}
                class="panel group"
                data-reveal
                style={{ "--delay": `${i * 60}ms` }}
              >
                <div class="panel__head">
                  <span>{g.name}</span>
                  <span>{pad(g.items.length)}</span>
                </div>
                <ul class="tags">
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div class="panel creds" data-reveal>
              <div class="panel__head">
                <span>{t.inventory.credentials}</span>
                <span>{pad(t.inventory.creds.length)}</span>
              </div>
              <dl>
                {t.inventory.creds.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section class="section" id="console">
          <SectionHead eyebrow={t.console.eyebrow} title={t.console.title} lead={t.console.lead} />
          <div data-reveal>
            <Terminal language={language} t={t} onTheme={toggleTheme} onLang={toggleLanguage} />
          </div>
        </section>

        <section class="section" id="contact">
          <SectionHead eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead} />
          <div class="panel contact" data-reveal>
            <dl class="fields">
              <div>
                <dt>{t.contact.email}</dt>
                <dd>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  <button type="button" class="tool tool--text" onClick={copyEmail}>
                    <Copy size={13} aria-hidden="true" /> {t.contact.copy}
                  </button>
                </dd>
              </div>
              <div>
                <dt>LinkedIn</dt>
                <dd>
                  <a href={LINKEDIN} target="_blank" rel="noreferrer">
                    in/diegorezm
                  </a>
                </dd>
              </div>
              <div>
                <dt>GitHub</dt>
                <dd>
                  <a href={GITHUB} target="_blank" rel="noreferrer">
                    github.com/diegorezm
                  </a>
                </dd>
              </div>
            </dl>
            <div class="contact__cta">
              <a class="btn btn--solid" href={`mailto:${EMAIL}`}>
                <Mail size={16} aria-hidden="true" /> {t.contact.write}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer class="statusbar">
        <span>
          {t.status.db} <b>diegorezm.db</b>
        </span>
        <span>{t.footer.built}</span>
        <span>
          {t.footer.backup} <b>{__BUILD_DATE__}</b>
        </span>
        <span>
          {t.status.integrity} <b>{t.status.ok}</b> <i class="led" aria-hidden="true" />
        </span>
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
      <p class="label">{eyebrow}</p>
      <h2>{title}</h2>
      <p class="section__lead">{lead}</p>
    </div>
  );
}
