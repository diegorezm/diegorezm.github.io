// Generates the Open Graph images and the PNG favicons from the site's own
// scenery, with a headless Chrome (or Edge) screenshot.
//
//   pnpm og                      # uses Chrome/Edge from the default install paths
//   CHROME_PATH=/path/to/chrome pnpm og
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { HERO_SCENE, SYMBOLS } from "../src/components/scenery.ts";

const root = resolve(import.meta.dirname, "..");
const out = (file: string) => join(root, "public", file);

const browser = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((p) => p && existsSync(p));
if (!browser) throw new Error("No Chrome or Edge found. Set CHROME_PATH.");

// Light-theme tokens straight from global.css, so the image follows the design system.
const css = readFileSync(join(root, "src/styles/global.css"), "utf8");
const tokens = /:root\s*\{([^}]*)\}/.exec(css)?.[1] ?? "";

const font = (pkg: string, file: string, family: string, weight: number, style = "normal") =>
  `@font-face{font-family:"${family}";font-weight:${weight};font-style:${style};src:url("${
    pathToFileURL(join(root, "node_modules/@fontsource", pkg, "files", file)).href
  }") format("woff2")}`;

const fonts = [
  font(
    "cormorant-garamond",
    "cormorant-garamond-latin-500-normal.woff2",
    "Cormorant Garamond",
    500,
  ),
  font(
    "cormorant-garamond",
    "cormorant-garamond-latin-400-italic.woff2",
    "Cormorant Garamond",
    400,
    "italic",
  ),
  font("dm-mono", "dm-mono-latin-500-normal.woff2", "DM Mono", 500),
].join("");

const page = (body: string, extra = "") => `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts}
:root{${tokens}}
*{box-sizing:border-box}html,body{margin:0;overflow:hidden}
${extra}
</style></head><body>
<svg width="0" height="0" style="position:absolute"><defs>${SYMBOLS}</defs></svg>
${body}</body></html>`;

const copy = {
  en: { tagline: "Useful software, built with care.", role: "Full-stack · Linux · Infra" },
  pt: { tagline: "Software útil, feito com cuidado.", role: "Full-stack · Linux · Infra" },
};

const og = (lang: keyof typeof copy) =>
  page(
    `<main>
  <svg class="scene" viewBox="0 0 1440 560" preserveAspectRatio="xMaxYMax slice">${HERO_SCENE}</svg>
  <div class="text">
    <span class="label">${copy[lang].role}</span>
    <h1>Diego Rezende</h1>
    <p>${copy[lang].tagline}</p>
  </div>
  <span class="url label">diegorezm.github.io</span>
</main>`,
    `main{position:relative;width:1200px;height:630px;overflow:hidden;
  background:linear-gradient(var(--sky-top),var(--sky-bottom) 72%)}
.scene{position:absolute;left:0;right:0;bottom:0;width:1200px;height:360px}
.text{position:absolute;left:72px;top:64px}
.label{font:500 15px/1.4 "DM Mono",monospace;text-transform:uppercase;letter-spacing:.2em;color:var(--ink)}
h1{margin:14px 0 6px;font:500 104px/.95 "Cormorant Garamond",serif;letter-spacing:-.02em;color:var(--ink)}
p{margin:0;font:italic 400 46px/1.1 "Cormorant Garamond",serif;color:var(--ink-muted)}
.url{position:absolute;left:72px;bottom:44px;color:var(--paper);background:var(--ink);
  padding:10px 18px;border-radius:999px;font-size:14px}`,
  );

const icon = (size: number) =>
  page(
    `<svg style="display:block;width:${size}px;height:${size}px" viewBox="-100 -100 200 200">
  <rect x="-100" y="-100" width="200" height="200" rx="${size > 64 ? 44 : 0}" fill="${size > 64 ? "#dfe8d6" : "none"}"/>
  <use href="#axo-head" x="${size > 64 ? -84 : -100}" y="${size > 64 ? -64 : -78}" width="${size > 64 ? 168 : 200}" height="${size > 64 ? 128 : 156}"/>
</svg>`,
    "body{background:transparent}",
  );

const dir = mkdtempSync(join(tmpdir(), "og-"));
function shoot(html: string, file: string, w: number, h: number) {
  const src = join(dir, `${file.replace(/\W/g, "_")}.html`);
  writeFileSync(src, html);
  execFileSync(browser as string, [
    "--headless=new",
    `--user-data-dir=${join(dir, "profile")}`,
    "--no-first-run",
    "--disable-gpu",
    "--hide-scrollbars",
    "--default-background-color=00000000",
    "--force-device-scale-factor=1",
    "--virtual-time-budget=3000",
    `--window-size=${w},${h}`,
    `--screenshot=${out(file)}`,
    pathToFileURL(src).href,
  ]);
  console.log(`wrote public/${file}`);
}

try {
  shoot(og("en"), "assets/og.png", 1200, 630);
  shoot(og("pt"), "assets/og-pt.png", 1200, 630);
  shoot(icon(32), "favicon-32.png", 32, 32);
  shoot(icon(180), "apple-touch-icon.png", 180, 180);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
