import { ArrowUpRight } from "lucide-preact";
import { current, stages } from "../content/quest";
import { type Language, QUEST_MAP } from "../content/site";
import { scenes } from "../drawing";
import type { Translation } from "../i18n";
import { ico } from "./icons";
import { Grain, Sketch, Tear } from "./Sketch";

export function Quest({ lang, t }: { lang: Language; t: Translation }) {
  return (
    <section class="act quest" id="quest">
      <Grain />
      <div class="inner">
        <div class="quest__top">
          <div>
            <span class="label">{t.quest.eyebrow}</span>
            <h2>
              {t.quest.title} <em>{t.quest.titleEm}</em>
            </h2>
          </div>
          <p>{t.quest.lead}</p>
        </div>
        <ol class="trail">
          {stages.map((s, i) => (
            <li key={s.name} class={i === current ? "now" : undefined}>
              <span class="n">{String(i).padStart(2, "0")}</span>
              <div>
                <b>{s.name}</b>
                <small>
                  {s.boss[lang]}
                  {i === current && ` · ${t.quest.current}`}
                </small>
              </div>
            </li>
          ))}
        </ol>
        <a class="pill" href={QUEST_MAP}>
          {t.quest.cta}
          <ArrowUpRight {...ico} />
        </a>
      </div>
      <Sketch
        class="strip volcano"
        markup={scenes.volcano}
        viewBox="0 0 1600 420"
        preserveAspectRatio="xMidYMax slice"
      />
      <Tear index={3} fiber="#b9b0a2" paper="#fbf8ef" />
    </section>
  );
}
