import { ArrowRight, BriefcaseBusiness } from "lucide-preact";
import { NAME } from "../content/site";
import { scenes } from "../drawing";
import type { Translation } from "../i18n";
import { ico } from "./icons";
import { Grain, Tear } from "./Sketch";

// little birds crossing the night sky: [height, seconds to cross, start offset, size]
const BIRDS = [
  [150, 38, -4, 1],
  [178, 38, -6.5, 0.8],
  [118, 52, -30, 0.9],
  [262, 46, -18, 0.75],
  [92, 61, -47, 1.1],
] as const;

function Birds() {
  return (
    <g class="birds" fill="none" stroke="#efe6cf" stroke-width="1.6" stroke-linecap="round">
      {BIRDS.map(([y, dur, delay, size]) => (
        <g
          key={delay}
          class="bird"
          style={`--y:${y}px;--dur:${dur}s;--delay:${delay}s;--size:${size * 1.6}`}
        >
          <path class="wings" d="M-9 1Q-5 -6 0 0Q5 -6 9 1" />
        </g>
      ))}
    </g>
  );
}

type Props = { t: Translation; otherLang: { href: string; hreflang: string } };

export function Hero({ t, otherLang }: Props) {
  const h = t.hero;
  return (
    <section class="hero">
      <svg
        class="scene"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        {/* clip paths for every drawing on the page live here */}
        <defs dangerouslySetInnerHTML={{ __html: scenes.defs }} />
        <g
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          dangerouslySetInnerHTML={{ __html: scenes.hero }}
        />
        <Birds />
        <text
          x="1172"
          y="318"
          fill="#f0aa3c"
          font-family="Caveat, cursive"
          font-size="28"
          transform="rotate(-4 1172 318)"
        >
          {h.annotation}
        </text>
      </svg>

      <Grain />

      <header class="top">
        <a class="sig keep" href="#top">
          {NAME}
        </a>
        <nav>
          <a class="label" href="#work">
            {t.nav.work}
          </a>
          <a class="label" href="#quest">
            {t.nav.quest}
          </a>
          <a class="label" href="#experience">
            {t.nav.experience}
          </a>
          <a class="label keep" href="#contact">
            {t.nav.contact}
          </a>
          <a
            class="label keep"
            href={otherLang.href}
            hreflang={otherLang.hreflang}
            title={t.switchLang.title}
          >
            {t.switchLang.label}
          </a>
        </nav>
      </header>

      <div class="text">
        <span class="label">{h.eyebrow}</span>
        <h1>
          {h.title}
          <br />
          <em>{h.titleEm}</em>
        </h1>
        <p class="lead">{h.lead}</p>
        <div class="cta">
          <a class="pill" href="#contact">
            <BriefcaseBusiness {...ico} />
            {h.hire}
          </a>
          <a class="label" href="#work">
            {h.seeWork}
            <ArrowRight {...ico} />
          </a>
        </div>
      </div>

      <Tear index={0} fiber="#e9dcc0" paper="#c8a678" />
    </section>
  );
}
