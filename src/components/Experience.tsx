import { Fragment } from "preact";
import { extras, jobs } from "../content/experience";
import type { Language } from "../content/site";
import { scenes } from "../drawing";
import type { Translation } from "../i18n";
import { Grain, Sketch, Tear } from "./Sketch";

export function Experience({ lang, t }: { lang: Language; t: Translation }) {
  return (
    <section class="act log" id="experience">
      <Grain />
      <div class="inner">
        <div>
          <span class="label">{t.experience.eyebrow}</span>
          <h2>
            {t.experience.title} <em>{t.experience.titleEm}</em>
          </h2>
          <p class="note">{t.experience.note}</p>
          <ul>
            {jobs.map((j) => (
              <li key={j.period.en + j.role.en}>
                <span class="when">{j.period[lang]}</span>
                <span class="role">{j.role[lang]}</span>
                <span class="org">{j.org[lang]}</span>
              </li>
            ))}
          </ul>
          <p class="extra">
            {extras.map((line, i) => (
              <Fragment key={line.en}>
                {i > 0 && <br />}
                {line[lang]}
              </Fragment>
            ))}
          </p>
        </div>
        <Sketch class="desk" markup={scenes.desk} viewBox="0 0 520 380" />
      </div>
      <Tear index={2} fiber="#ec7a32" paper="#221c1a" />
    </section>
  );
}
