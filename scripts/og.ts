// Generates the Open Graph images and the icons from the page's own pen drawing,
// with a headless Chrome (or Edge) screenshot.
//
//   pnpm og                      # uses Chrome/Edge from the default install paths
//   CHROME_PATH=/path/to/chrome pnpm og
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { buildScenes, iconSvg } from "../src/drawing/scenes.ts";

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

const fontUrl = (pkg: string, file: string) =>
  pathToFileURL(join(root, "node_modules", pkg, "files", file)).href;
const fonts = `
@font-face{font-family:"Fraunces";font-weight:100 900;font-style:normal;src:url("${fontUrl("@fontsource-variable/fraunces", "fraunces-latin-full-normal.woff2")}") format("woff2")}
@font-face{font-family:"Fraunces";font-weight:100 900;font-style:italic;src:url("${fontUrl("@fontsource-variable/fraunces", "fraunces-latin-full-italic.woff2")}") format("woff2")}
@font-face{font-family:"Caveat";font-weight:500;src:url("${fontUrl("@fontsource/caveat", "caveat-latin-500-normal.woff2")}") format("woff2")}`;

// the hero's paper grain, same tile as the page
const css = readFileSync(join(root, "src/styles/global.css"), "utf8");
const grain = /\.grain\s*\{([^}]*)\}/.exec(css)?.[1] ?? "";

const scenes = buildScenes();

const copy = {
  en: {
    role: "Full-stack · Linux · Infra",
    title: "Useful software,",
    em: "built with care.",
    note: "the only light still on",
  },
  pt: {
    role: "Full-stack · Linux · Infra",
    title: "Software útil,",
    em: "feito com cuidado.",
    note: "a única luz acesa",
  },
};

const page = (body: string, extra = "") => `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts}
*{box-sizing:border-box;margin:0}html,body{overflow:hidden}
${extra}
</style></head><body>${body}</body></html>`;

const og = (lang: keyof typeof copy) =>
  page(
    `<main>
  <svg class="scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
    <defs>${scenes.defs}</defs>
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">${scenes.hero}</g>
    <text x="1172" y="318" fill="#f0aa3c" font-family="Caveat" font-size="28" transform="rotate(-4 1172 318)">${copy[lang].note}</text>
  </svg>
  <div class="grain"></div>
  <div class="text">
    <span class="sig">Diego Rezende</span>
    <span class="label">${copy[lang].role}</span>
    <h1>${copy[lang].title}<br><em>${copy[lang].em}</em></h1>
  </div>
  <span class="url">diegorezm.github.io</span>
</main>`,
    `main{position:relative;width:1200px;height:630px;overflow:hidden;isolation:isolate;
  background:radial-gradient(120% 90% at 62% 38%,#25494a,#1c3a3b 70%);color:#efe6cf;font-family:"Fraunces",serif}
.scene{position:absolute;inset:0;width:100%;height:100%;z-index:-2}
.grain{${grain}}
.text{position:absolute;left:72px;top:64px}
.sig{display:block;font:500 46px/1 "Caveat",cursive;margin-bottom:34px}
.label{font-size:15px;letter-spacing:.22em;text-transform:uppercase;color:#b9c2ae}
h1{margin-top:18px;font-weight:320;font-size:80px;line-height:1.04;letter-spacing:-.015em}
h1 em{color:#f0aa3c;font-weight:300}
.url{position:absolute;left:72px;bottom:56px;padding:9px 20px;border:1.5px solid #f0aa3c;color:#f0aa3c;font-size:20px;
  border-radius:255px 18px 225px 18px/18px 225px 18px 255px}`,
  );

const icon = (size: number, rounded: boolean) =>
  page(iconSvg(size, rounded), "body{background:transparent}svg{display:block}");

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
  writeFileSync(out("favicon.svg"), iconSvg(64, true));
  console.log("wrote public/favicon.svg");
  shoot(og("en"), "assets/og.png", 1200, 630);
  shoot(og("pt"), "assets/og-pt.png", 1200, 630);
  shoot(icon(32, true), "favicon-32.png", 32, 32);
  shoot(icon(180, false), "apple-touch-icon.png", 180, 180);
  shoot(icon(512, true), "icon-512.png", 512, 512);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
