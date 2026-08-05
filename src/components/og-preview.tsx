import { ArrowUpRight, Globe, Laptop, MapPin, Terminal, Users } from "lucide-preact";

export default function OgPreviewPage() {
  return (
    <main className="og-preview-page">
      <div
        className="og-preview-card"
        role="img"
        aria-label="Diego Rezende, Full-Stack Developer, Open Graph preview image"
      >
        <header className="og-preview-card__bar">
          <div className="og-preview-card__identity">
            <span className="og-preview-card__mark">DR</span>
            <span>DIEGO REZENDE</span>
            <span className="og-preview-card__slash">/</span>
            <span>FULL-STACK DEVELOPER</span>
          </div>
          <div className="og-preview-card__location">
            <MapPin size={15} aria-hidden="true" /> BRAZIL
          </div>
        </header>

        <div className="og-preview-card__body">
          <section className="og-preview-card__intro">
            <p className="og-preview-card__eyebrow">
              <Laptop size={16} aria-hidden="true" /> DIGITAL WORKSPACE / 2026
            </p>
            <h1>
              Diego
              <br />
              <span>Rezende.</span>
            </h1>
            <p className="og-preview-card__description">
              I build full-stack apps, tinker with systems programming, and love open source.
            </p>
            <a className="og-preview-card__link" href="https://diegorezm.github.io/">
              diegorezm.github.io <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </section>

          <section className="og-preview-card__profile" aria-label="Technical profile">
            <div className="og-preview-card__windowbar">
              <span className="og-preview-card__dots">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span>profile — Finder</span>
              <Terminal size={16} aria-hidden="true" />
            </div>
            <div className="og-preview-card__profile-content">
              <div className="og-preview-card__profile-label">CURRENTLY INTO</div>
              <div className="og-preview-card__chips">
                <span>TypeScript</span>
                <span>Node.js</span>
                <span>React</span>
                <span>Rust</span>
                <span>Linux</span>
                <span>Open Source</span>
              </div>
              <div className="og-preview-card__profile-rule"></div>
              <div className="og-preview-card__profile-label">SELECTED WORK</div>
              <div className="og-preview-card__projects">
                <strong>Vibe</strong>
                <strong>letmeask</strong>
                <strong>llm-notebook</strong>
              </div>
            </div>
          </section>
        </div>

        <footer className="og-preview-card__footer">
          <div className="og-preview-card__availability">
            <span className="og-preview-card__status"></span> AVAILABLE FOR SELECT WORK
          </div>
          <div className="og-preview-card__socials">
            <a href="https://github.com/diegorezm" target="_blank" rel="noreferrer">
              <Globe size={17} aria-hidden="true" /> github.com/diegorezm
            </a>
            <a href="https://www.linkedin.com/in/diegorezm/" target="_blank" rel="noreferrer">
              <Users size={17} aria-hidden="true" /> linkedin.com/in/diegorezm
            </a>
            <Globe size={17} aria-hidden="true" />
          </div>
        </footer>
      </div>
      <p className="og-preview-page__hint">
        1200 × 630 · capture the card above for the Open Graph image
      </p>
    </main>
  );
}
