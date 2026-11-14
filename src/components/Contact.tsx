import { ArrowUpRight, Mail } from "lucide-preact";
import { EMAIL, GITHUB, LINKEDIN, NAME } from "../content/site";
import { scenes } from "../drawing";
import type { Translation } from "../i18n";
import { GithubIcon, ico, LinkedinIcon } from "./icons";
import { Grain, Sketch } from "./Sketch";

export function Contact({ t }: { t: Translation }) {
  return (
    <footer class="act end" id="contact">
      <Grain />
      <div class="inner">
        <span class="label">{t.contact.eyebrow}</span>
        <h2>
          {t.contact.title} <em>{t.contact.titleEm}</em>
        </h2>
        <p>{t.contact.lead}</p>
        <div class="links">
          <a class="pill" href={`mailto:${EMAIL}`}>
            <Mail {...ico} />
            {EMAIL}
          </a>
          <a class="label" href={LINKEDIN}>
            <LinkedinIcon />
            LinkedIn
            <ArrowUpRight {...ico} />
          </a>
          <a class="label" href={GITHUB}>
            <GithubIcon />
            GitHub
            <ArrowUpRight {...ico} />
          </a>
        </div>
      </div>
      <Sketch
        class="strip field"
        markup={scenes.field}
        viewBox="0 0 1600 520"
        preserveAspectRatio="xMidYMax slice"
      />
      <div class="bar">© 2026 {NAME}</div>
    </footer>
  );
}
