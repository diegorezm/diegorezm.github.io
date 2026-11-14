import { type Project, projects } from "../content/projects";
import { GITHUB, type Language } from "../content/site";
import { scenes } from "../drawing";
import type { Translation } from "../i18n";
import { Grain, Sketch, Tear } from "./Sketch";

const LOGOS = `${import.meta.env.BASE_URL}projects/`;
// slight hand-placed tilt for each card, in page order
const TILT = [-1.6, 1.3, 1.1, -0.9, 1.5, -1.3, 0.8, -1.1];
const tilt = (i: number) => TILT[i % TILT.length];
const href = (p: Project) => p.url ?? `${GITHUB}/${p.repo}`;

type CardProps = { p: Project; i: number; lang: Language; t: Translation };

function Meta({ p, t }: { p: Project; t: Translation }) {
  return (
    <div class="meta">
      <span class="stamp">{t.status[p.status]}</span>
      <span>{p.stack}</span>
    </div>
  );
}

function FeaturedCard({ p, i, lang, t }: CardProps) {
  return (
    <a
      class={`card${i ? " corners" : ""}`}
      href={href(p)}
      style={`--r:${tilt(i)}deg;--tint:${p.tint ?? "#b9a58a"}`}
    >
      <div class="art">
        {p.logo ? (
          <img src={LOGOS + p.logo} alt="" />
        ) : (
          <span class="tile">{p.name.slice(0, 2)}</span>
        )}
      </div>
      {p.kind && <span class="label">{p.kind[lang]}</span>}
      <h3>{p.name}</h3>
      <p>{p.blurb[lang]}</p>
      <Meta p={p} t={t} />
    </a>
  );
}

function SmallCard({ p, i, lang, t }: CardProps) {
  return (
    <a
      class={`card card--small${i % 3 === 1 ? " corners" : ""}`}
      href={href(p)}
      style={`--r:${tilt(i + 2)}deg;--t:${i % 2 ? -2 : 2}deg`}
    >
      <div class="row">
        <span class="tile">
          {p.logo ? <img src={LOGOS + p.logo} alt="" /> : p.name.slice(0, 2)}
        </span>
        <h3>{p.name}</h3>
      </div>
      <p>{p.blurb[lang]}</p>
      <Meta p={p} t={t} />
    </a>
  );
}

export function Projects({ lang, t }: { lang: Language; t: Translation }) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  return (
    <section class="work" id="work">
      <Grain />
      <div class="work__head">
        <div>
          <span class="label">{t.work.eyebrow}</span>
          <h2>
            {t.work.title} <em>{t.work.titleEm}</em>
          </h2>
        </div>
        <p class="note">{t.work.note}</p>
      </div>

      <div class="cards cards--feat">
        {featured.map((p, i) => (
          <FeaturedCard key={p.repo} p={p} i={i} lang={lang} t={t} />
        ))}
      </div>
      <div class="cards cards--small">
        {others.map((p, i) => (
          <SmallCard key={p.repo} p={p} i={i} lang={lang} t={t} />
        ))}
      </div>

      <Sketch
        class="street"
        markup={scenes.street}
        viewBox="0 0 1600 300"
        preserveAspectRatio="xMidYMax slice"
      />
      <Tear index={1} fiber="#fbf6ea" paper="#efe6d2" />
    </section>
  );
}
