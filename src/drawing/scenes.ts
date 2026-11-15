// Hand-drawn scenery. Every line is drawn twice, wobbly, like pen on paper.
// Builds plain SVG markup strings (no DOM), so the same drawing is rendered at
// build time (prerender), in the browser and by scripts/og.ts. The random
// generator is seeded, so the output is identical everywhere.
//
// No imports here on purpose: scripts/og.ts loads this file directly with Node.

type El = { n: string; a: Record<string, string | number>; c: El[] };
type Pt = [number, number];
type Box = [number, number, number, number];
type SkOpts = {
  c?: string;
  w?: number;
  a?: number;
  op?: number;
  passes?: number;
  close?: boolean;
  fill?: string;
};
type HatchOpts = { gap?: number; lean?: number; c?: string; w?: number; op?: number };

const esc = (v: string | number) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const serialize = (e: El): string =>
  `<${e.n}${Object.entries(e.a)
    .map(([k, v]) => ` ${k}="${esc(v)}"`)
    .join("")}>${e.c.map(serialize).join("")}</${e.n}>`;
const inner = (e: El) => e.c.map(serialize).join("");
const root = (): El => ({ n: "g", a: {}, c: [] });

function createPen(startSeed: number, clipPrefix = "c") {
  // the three colours change from act to act
  const ink = { INK: "#efe6cf", LAMP: "#f0aa3c", PAPER: "#1f3f40" };
  let seed = startSeed;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const jit = (a: number) => (rnd() - 0.5) * 2 * a;
  const defs = root();

  const node = (parent: El, name: string, attrs: Record<string, string | number>) => {
    const e: El = { n: name, a: attrs, c: [] };
    parent.c.push(e);
    return e;
  };
  const group = (parent: El, attrs: Record<string, string | number> = {}) =>
    node(parent, "g", attrs);

  // wobbly polyline through the points
  const wob = (pts: Pt[], amp: number, close?: boolean) => {
    let d = "";
    pts.forEach(([x, y], i) => {
      if (i === 0) {
        d += `M${(x + jit(amp)).toFixed(1)} ${(y + jit(amp)).toFixed(1)}`;
        return;
      }
      const [px, py] = pts[i - 1];
      const n = Math.max(1, Math.round(Math.hypot(x - px, y - py) / 18));
      for (let k = 1; k <= n; k++) {
        const t = k / n;
        d += `L${(px + (x - px) * t + jit(amp)).toFixed(1)} ${(py + (y - py) * t + jit(amp)).toFixed(1)}`;
      }
    });
    return d + (close ? "Z" : "");
  };

  // pen stroke: two passes
  const sk = (parent: El, pts: Pt[], o: SkOpts = {}) => {
    const { c = ink.INK, w = 2, a = 1.1, op = 0.92, passes = 2, close = false, fill = "none" } = o;
    for (let p = 0; p < passes; p++) {
      node(parent, "path", {
        d: wob(pts, a, close),
        stroke: c,
        "stroke-width": w * (p ? 0.6 : 1),
        opacity: op * (p ? 0.7 : 1),
        fill: p ? "none" : fill,
      });
    }
  };

  const arc = (cx: number, cy: number, rx: number, ry: number, a0 = 0, a1 = Math.PI * 2, n = 26) =>
    Array.from({ length: n + 1 }, (_, i): Pt => {
      const t = a0 + ((a1 - a0) * i) / n;
      return [cx + Math.cos(t) * rx, cy + Math.sin(t) * ry];
    });

  // hatching clipped by a shape
  let clipN = 0;
  const hatch = (parent: El, clipD: string, [x0, y0, x1, y1]: Box, o: HatchOpts = {}) => {
    const { gap = 6, lean = 0.6, c = ink.INK, w = 1.1, op = 0.5 } = o;
    const id = `${clipPrefix}${clipN++}`;
    node(node(defs, "clipPath", { id }), "path", { d: clipD });
    const g = group(parent, { "clip-path": `url(#${id})` });
    const h = y1 - y0;
    for (
      let x = x0 - h * Math.abs(lean) - 10;
      x < x1 + h * Math.abs(lean) + 10;
      x += gap * (0.7 + rnd() * 0.6)
    ) {
      sk(
        g,
        [
          [x, y1 + 2],
          [x + h * lean, y0 - 2],
        ],
        {
          c,
          w,
          op: op * (0.6 + rnd() * 0.5),
          a: 0.9,
          passes: 1,
        },
      );
    }
  };

  // the axolotl, from behind; only in the last act does it turn around
  const drawAxo = (parent: El, tf: string, front = false) => {
    const axo = group(parent, { transform: tf });
    const body = "M-19 0C-23 -22 -16 -36 0 -36C16 -36 23 -22 19 0Z";
    // tail over the quay
    sk(
      axo,
      [
        [16, -6],
        [34, -3],
        [52, -8],
        [66, -20],
      ],
      { w: 2.2, a: 0.7 },
    );
    sk(
      axo,
      [
        [18, -1],
        [40, 0],
        [58, -4],
        [66, -20],
      ],
      { w: 1.6, a: 0.6, passes: 1 },
    );
    node(axo, "path", { d: body, fill: ink.PAPER, stroke: "none" });
    hatch(axo, body, [-22, -36, 2, 0], { gap: 3.6, op: 0.5, lean: 0.5 });
    sk(
      axo,
      [
        [-19, 0],
        [-22, -16],
        [-15, -32],
        [0, -36],
        [15, -32],
        [22, -16],
        [19, 0],
      ],
      {
        w: 2.2,
        a: 0.7,
      },
    );
    // gills
    for (const s of [-1, 1]) {
      const gills: Pt[] = [
        [-58, 30],
        [-49, 34],
        [-40, 29],
      ];
      gills.forEach(([y, len], k) => {
        const x0 = s * 22;
        const x1 = s * (22 + len);
        const y1 = y - 9 + k * 9;
        sk(
          axo,
          [
            [x0, y + 1],
            [x1, y1],
          ],
          { w: 2, a: 0.6, c: s > 0 && k < 2 ? ink.LAMP : ink.INK },
        );
        for (let f = 0.35; f < 1; f += 0.22) {
          const fx = x0 + (x1 - x0) * f;
          const fy = y + (y1 - y) * f;
          sk(
            axo,
            [
              [fx, fy],
              [fx + s * 2, fy - 6],
            ],
            { w: 1, a: 0.3, passes: 1, op: 0.8 },
          );
          sk(
            axo,
            [
              [fx, fy],
              [fx + s * 3, fy + 5],
            ],
            { w: 1, a: 0.3, passes: 1, op: 0.8 },
          );
        }
      });
    }
    // head
    const head = arc(0, -50, 27, 18);
    node(axo, "path", { d: wob(head, 0, true), fill: ink.PAPER, stroke: "none" });
    hatch(axo, wob(head, 0, true), [-27, -68, -2, -32], { gap: 3.6, op: 0.5, lean: 0.5 });
    sk(axo, head, { w: 2.2, a: 0.7 });
    sk(axo, arc(0, -50, 27, 18, -1.2, 0.9, 10), {
      c: ink.LAMP,
      w: 1.6,
      a: 0.5,
      passes: 1,
      op: 0.9,
    });
    sk(
      axo,
      [
        [20, -30],
        [22, -14],
        [19, -2],
      ],
      { c: ink.LAMP, w: 1.4, a: 0.5, passes: 1, op: 0.8 },
    );
    // little legs hanging down
    sk(
      axo,
      [
        [-10, 0],
        [-11, 12],
        [-15, 16],
      ],
      { w: 1.8, a: 0.5 },
    );
    sk(
      axo,
      [
        [9, 0],
        [10, 12],
        [14, 16],
      ],
      { w: 1.8, a: 0.5 },
    );
    if (front) {
      node(axo, "circle", { cx: -10, cy: -53, r: 2.4, fill: ink.INK });
      node(axo, "circle", { cx: 10, cy: -53, r: 2.4, fill: ink.INK });
      sk(axo, arc(0, -48, 7, 5, 0.5, Math.PI - 0.5, 8), { w: 1.6, a: 0.3, passes: 1 });
      node(axo, "circle", { cx: -17, cy: -46, r: 3, fill: "#e58a8a", opacity: 0.7 });
      node(axo, "circle", { cx: 17, cy: -46, r: 3, fill: "#e58a8a", opacity: 0.7 });
    }
  };

  const setInk = (INK: string, LAMP: string, PAPER: string) =>
    Object.assign(ink, { INK, LAMP, PAPER });

  return { ink, setInk, rnd, jit, defs, node, group, wob, sk, arc, hatch, drawAxo };
}

export type Scenes = {
  /** Clip paths shared by every drawing (ids are page-global). */
  defs: string;
  hero: string;
  /** One [fiber, paper] path pair per torn edge, top to bottom. */
  tears: [string, string][];
  street: string;
  desk: string;
  volcano: string;
  field: string;
};

/** Number of torn edges on the page (hero, projects, diary, quest). */
export const TEAR_COUNT = 4;

/** Every drawing on the page, in the order the seeded pen draws them. */
export function buildScenes(): Scenes {
  const { ink, setInk, rnd, jit, defs, node, group, wob, sk, arc, hatch, drawAxo } = createPen(41);

  /* ================= act 1: night harbour ================= */
  const S = root();

  // sky
  for (let i = 0; i < 80; i++) {
    node(S, "circle", {
      cx: rnd() * 1600,
      cy: rnd() * 540,
      r: 0.7 + rnd() * 1.1,
      fill: ink.INK,
      opacity: 0.35 + rnd() * 0.5,
    });
  }
  const sparkles: Pt[] = [
    [742, 96],
    [1010, 250],
    [1488, 392],
    [1196, 86],
    [868, 470],
    [1560, 210],
  ];
  for (const [x, y] of sparkles) {
    const r = 6 + rnd() * 5;
    sk(
      S,
      [
        [x - r, y],
        [x + r, y],
      ],
      { w: 1.3, a: 0.5, passes: 1 },
    );
    sk(
      S,
      [
        [x, y - r],
        [x, y + r],
      ],
      { w: 1.3, a: 0.5, passes: 1 },
    );
  }
  // clouds: bands of horizontal hatching
  for (const [cx, cy, half] of [
    [1250, 268, 150],
    [1455, 118, 110],
    [905, 158, 120],
  ]) {
    for (let i = 0; i < 9; i++) {
      const y = cy + (i - 4) * 6;
      const k = 1 - Math.abs(i - 4) / 6;
      const off = jit(30);
      sk(
        S,
        [
          [cx - half * k + off, y],
          [cx + half * k + off, y],
        ],
        { w: 1.1, op: 0.38, a: 1.3, passes: 1 },
      );
    }
  }
  // crescent moon
  const moon = "M1340 136A44 44 0 0 1 1340 224A29 44 0 0 0 1340 136Z";
  hatch(S, moon, [1335, 132, 1388, 228], { gap: 3.2, lean: -0.5, op: 0.95, w: 1.3 });
  sk(S, arc(1340, 180, 44, 44, -Math.PI / 2, Math.PI / 2), { w: 2 });
  sk(S, arc(1340, 180, 44, 44, Math.PI / 2, Math.PI * 1.5), { w: 1, op: 0.35, passes: 1 });

  // far shore
  sk(
    S,
    [
      [0, 632],
      [70, 620],
      [150, 626],
      [230, 606],
      [320, 618],
      [400, 612],
      [480, 628],
      [560, 636],
    ],
    {
      w: 1.4,
      op: 0.6,
    },
  );
  hatch(
    S,
    "M0 632L70 620L150 626L230 606L320 618L400 612L480 628L560 636V640H0Z",
    [0, 604, 560, 640],
    {
      gap: 5,
      op: 0.3,
      lean: 0.8,
    },
  );
  for (const x of [96, 212, 268, 356, 452]) {
    node(S, "circle", { cx: x, cy: 634, r: 1.8, fill: ink.INK, opacity: 0.9 });
  }

  // horizon and water
  sk(
    S,
    [
      [0, 642],
      [980, 642],
    ],
    { w: 1.6, a: 0.9 },
  );
  // ripples are split into groups so they can drift out of step (see .water in CSS)
  const waves = [0, 1, 2].map((k) => group(S, { class: `water water--${k}` }));
  const glint = group(S, { class: "glint" });
  for (let i = 0; i < 360; i++) {
    const t = rnd() ** 1.5;
    const y = 654 + t * 215;
    const x = rnd() * 1600;
    const len = 8 + t * 44;
    const warm = Math.abs(x + len / 2 - 1112) < 12 + t * 44 && rnd() < 0.85;
    sk(
      warm ? glint : waves[i % 3],
      [
        [x, y],
        [x + len, y + jit(1)],
      ],
      {
        c: warm ? ink.LAMP : ink.INK,
        w: 1 + t * 1.1,
        op: warm ? 0.85 : 0.2 + rnd() * 0.4,
        a: 0.8,
        passes: rnd() < 0.3 ? 2 : 1,
      },
    );
  }

  // ship
  const ship = group(S, { opacity: 0.9 });
  sk(
    ship,
    [
      [612, 624],
      [856, 618],
    ],
    { w: 1.8 },
  );
  sk(
    ship,
    [
      [618, 625],
      [640, 644],
      [822, 644],
      [850, 619],
    ],
    { w: 1.8 },
  );
  sk(
    ship,
    [
      [614, 624],
      [578, 606],
    ],
    { w: 1.5 },
  );
  hatch(ship, "M618 625L640 644H822L850 619Z", [615, 618, 852, 646], {
    gap: 4.5,
    op: 0.45,
    lean: 0.7,
  });
  const masts: Pt[] = [
    [676, 426],
    [738, 394],
    [800, 434],
  ];
  masts.forEach(([x, top], i) => {
    sk(
      ship,
      [
        [x, 622],
        [x, top],
      ],
      { w: 1.8, a: 0.7 },
    );
    [0.24, 0.48, 0.7].forEach((f, j) => {
      const y = top + (622 - top) * f;
      const half = 13 + j * 9;
      sk(
        ship,
        [
          [x - half, y + 1],
          [x + half, y - 1],
        ],
        { w: 1.4, a: 0.6, passes: 1 },
      );
    });
    sk(
      ship,
      [
        [x, top + 20],
        [x - 26, 622],
      ],
      { w: 0.8, op: 0.6, a: 0.4, passes: 1 },
    );
    sk(
      ship,
      [
        [x, top + 20],
        [x + 26, 620],
      ],
      { w: 0.8, op: 0.6, a: 0.4, passes: 1 },
    );
    const next = masts[i + 1];
    if (next)
      sk(
        ship,
        [
          [x, top + 6],
          [next[0], next[1] + 44],
        ],
        { w: 0.8, op: 0.6, a: 0.4, passes: 1 },
      );
  });
  sk(
    ship,
    [
      [676, 432],
      [580, 607],
    ],
    { w: 0.8, op: 0.6, a: 0.4, passes: 1 },
  );
  for (let i = 0; i < 12; i++) {
    const x = 640 + rnd() * 190;
    sk(
      ship,
      [
        [x, 652],
        [x + jit(3), 664 + rnd() * 22],
      ],
      { w: 1, op: 0.3, a: 1, passes: 1 },
    );
  }

  // quay
  node(S, "path", { d: "M980 600H1600V646H980Z", fill: ink.PAPER, stroke: "none" });
  sk(
    S,
    [
      [980, 600],
      [1600, 600],
    ],
    { w: 2.2 },
  );
  sk(
    S,
    [
      [980, 600],
      [980, 646],
    ],
    { w: 2 },
  );
  sk(
    S,
    [
      [980, 646],
      [1600, 646],
    ],
    { w: 1.6, op: 0.8 },
  );
  sk(
    S,
    [
      [984, 622],
      [1600, 622],
    ],
    { w: 0.9, op: 0.4, passes: 1 },
  );
  for (let x = 1020, r = 0; x < 1600; x += 54 + rnd() * 26, r++) {
    const top = r % 2 ? 600 : 622;
    sk(
      S,
      [
        [x, top + 2],
        [x, top + 21],
      ],
      { w: 0.9, op: 0.45, a: 0.5, passes: 1 },
    );
  }
  hatch(S, "M980 600H1600V646H980Z", [980, 600, 1600, 646], { gap: 9, op: 0.2, lean: 0.9 });

  // houses
  const town = group(S, { opacity: 0.78 });
  const lit = 2;
  for (let i = 0, hx = 1232; hx < 1600; i++) {
    const w = 72 + rnd() * 44;
    const h = 120 + rnd() * 100;
    const top = 600 - h;
    const x1 = hx + w;
    node(town, "path", {
      d: `M${hx} 600V${top}L${hx + w / 2} ${top - 34}L${x1} ${top}V600Z`,
      fill: ink.PAPER,
      stroke: "none",
    });
    sk(
      town,
      [
        [hx, 600],
        [hx, top],
        [hx + w / 2, top - 34 * (i % 3 ? 1 : 0.2)],
        [x1, top],
        [x1, 600],
      ],
      {
        w: 1.5,
        a: 0.9,
      },
    );
    if (i % 3)
      hatch(
        town,
        `M${hx} ${top}L${hx + w / 2} ${top - 34}L${x1} ${top}Z`,
        [hx, top - 34, x1, top],
        {
          gap: 4,
          op: 0.5,
          lean: 0.6,
        },
      );
    sk(
      town,
      [
        [hx + w / 2 - 9, 600],
        [hx + w / 2 - 9, 572],
        [hx + w / 2 + 9, 572],
        [hx + w / 2 + 9, 600],
      ],
      {
        w: 1.2,
        a: 0.5,
      },
    );
    if (i % 2 === 0)
      sk(
        town,
        [
          [hx + w * 0.7, top - 6],
          [hx + w * 0.7, top - 34],
          [hx + w * 0.86, top - 34],
          [hx + w * 0.86, top],
        ],
        {
          w: 1.2,
          a: 0.5,
          passes: 1,
        },
      );
    const colsN = w > 92 ? 3 : 2;
    const rowsN = Math.floor((h - 40) / 44);
    for (let r = 0; r < rowsN; r++)
      for (let c = 0; c < colsN; c++) {
        const wx = hx + (w / (colsN + 1)) * (c + 1) - 8;
        const wy = top + 20 + r * 44;
        const box: Pt[] = [
          [wx, wy],
          [wx + 16, wy],
          [wx + 16, wy + 24],
          [wx, wy + 24],
        ];
        if (i === lit && r === 1 && c === 0) {
          hatch(S, `M${wx} ${wy}h16v24h-16Z`, [wx, wy, wx + 16, wy + 24], {
            c: ink.LAMP,
            gap: 2.2,
            op: 1,
            w: 1.4,
            lean: 0.5,
          });
          sk(S, box, { c: ink.LAMP, w: 1.3, a: 0.5, close: true });
        } else {
          sk(town, box, { w: 1, a: 0.5, close: true, passes: 1 });
          sk(
            town,
            [
              [wx + 8, wy],
              [wx + 8, wy + 24],
            ],
            { w: 0.7, a: 0.3, passes: 1, op: 0.6 },
          );
        }
      }
    hx = x1 + (rnd() < 0.3 ? 10 : 0);
  }

  // street lamp: a coloured-pencil halo (flickers, see .halo in CSS)
  const halo = group(S, { class: "halo" });
  for (let i = 0; i < 150; i++) {
    const ang = rnd() * Math.PI * 2;
    const r0 = 26 + rnd() * 26;
    const r1 = r0 + 14 + rnd() * 90 * rnd();
    sk(
      halo,
      [
        [1110 + Math.cos(ang) * r0, 382 + Math.sin(ang) * r0],
        [1110 + Math.cos(ang) * r1, 382 + Math.sin(ang) * r1],
      ],
      { c: ink.LAMP, w: 1 + rnd() * 1.2, op: 0.16 + rnd() * 0.36, a: 1.2, passes: 1 },
    );
  }
  hatch(group(S, { class: "flame" }), "M1098 364h24l-5 34h-14Z", [1096, 362, 1124, 400], {
    c: "#ffd98a",
    gap: 1.8,
    op: 1,
    w: 1.5,
    lean: 0.4,
  });
  sk(
    S,
    [
      [1098, 364],
      [1122, 364],
      [1117, 398],
      [1103, 398],
    ],
    { w: 2, a: 0.6, close: true },
  );
  sk(
    S,
    [
      [1094, 364],
      [1126, 364],
      [1114, 350],
      [1106, 350],
    ],
    { w: 2, a: 0.5, close: true, fill: ink.PAPER },
  );
  sk(
    S,
    [
      [1110, 350],
      [1110, 340],
    ],
    { w: 2, a: 0.3 },
  );
  sk(
    S,
    [
      [1100, 400],
      [1120, 400],
    ],
    { w: 2, a: 0.4 },
  );
  sk(
    S,
    [
      [1107.5, 402],
      [1107.5, 588],
    ],
    { w: 1.6, a: 0.6 },
  );
  sk(
    S,
    [
      [1112.5, 402],
      [1112.5, 588],
    ],
    { w: 1.6, a: 0.6 },
  );
  sk(
    S,
    [
      [1100, 600],
      [1104, 588],
      [1116, 588],
      [1120, 600],
    ],
    { w: 1.8, a: 0.5 },
  );
  sk(
    S,
    [
      [1102, 470],
      [1118, 470],
    ],
    { w: 1.4, a: 0.4, passes: 1 },
  );
  // pool of light on the quay
  const pool = group(S, { class: "pool" });
  for (let i = 0; i < 26; i++) {
    const x = 1040 + rnd() * 140;
    const len = 10 + rnd() * 26;
    sk(
      pool,
      [
        [x, 596 - rnd() * 3],
        [x + len, 596 - rnd() * 3],
      ],
      {
        c: ink.LAMP,
        w: 1.2,
        op: 0.3 + rnd() * 0.4,
        a: 0.6,
        passes: 1,
      },
    );
  }
  // annotation arrow
  sk(
    S,
    [
      [1192, 326],
      [1168, 346],
      [1140, 362],
    ],
    { c: ink.LAMP, w: 1.5, a: 0.8, passes: 1 },
  );
  sk(
    S,
    [
      [1152, 350],
      [1140, 362],
      [1156, 364],
    ],
    { c: ink.LAMP, w: 1.5, a: 0.5, passes: 1 },
  );

  drawAxo(S, "translate(1012 600)");

  /* ---------- torn edges ---------- */
  const tear = (base: number, amp: number) => {
    let d = `M0 44V${base}`;
    for (let x = 0; x <= 1600; x += 7 + rnd() * 16)
      d += `L${x.toFixed(0)} ${(base + jit(amp) + Math.sin(x / 130) * 5).toFixed(1)}`;
    return `${d}L1600 ${base}V44Z`;
  };
  const tears: [string, string][] = [];
  for (let i = 0; i < TEAR_COUNT; i++) {
    const fiber = tear(14, 6);
    tears.push([fiber, tear(20, 5)]);
  }

  /* ================= act 2: the street at dusk ================= */
  // the windows inherit the street lamp's light
  setInk("#2b211a", "#f2c25a", ink.PAPER);
  const ST = root();
  const TERRA = "#9a4a2f";
  const GREEN = "#5d7a3a";
  const G = 262;
  const litRect = (x: number, y: number, w: number, h: number, on: boolean) => {
    const box = `M${x} ${y}h${w}v${h}h${-w}Z`;
    if (on) {
      node(ST, "path", { d: box, fill: ink.LAMP, stroke: "none", opacity: 0.9 });
      hatch(ST, box, [x, y, x + w, y + h], { c: "#fff3c4", gap: 3, op: 0.8, w: 1.2, lean: 0.5 });
    }
    sk(
      ST,
      [
        [x, y],
        [x + w, y],
        [x + w, y + h],
        [x, y + h],
      ],
      { w: 1.4, a: 0.5, close: true },
    );
  };
  let sx = 24;
  let axoDone = false;
  for (let n = 0; sx < 1560; n++) {
    const w = 120 + rnd() * 60;
    const h = 112 + rnd() * 86;
    const top = G - h;
    const x1 = sx + w;
    const shop = n % 2 === 0;
    const gable = n % 3 !== 1;
    const wall = n % 3 === 0 ? "#efe3c8" : "#d9bd94";
    const roofD = `M${sx - 6} ${top}L${sx + w / 2} ${top - 40}L${x1 + 6} ${top}Z`;
    node(ST, "path", { d: `M${sx} ${G}V${top}H${x1}V${G}Z`, fill: wall, stroke: "none" });
    if (gable) {
      node(ST, "path", { d: roofD, fill: wall, stroke: "none" });
      hatch(ST, roofD, [sx - 6, top - 40, x1 + 6, top], {
        c: TERRA,
        gap: 4,
        op: 0.9,
        w: 1.5,
        lean: 0.6,
      });
      sk(
        ST,
        [
          [sx - 6, top],
          [sx + w / 2, top - 40],
          [x1 + 6, top],
        ],
        { w: 2, close: true },
      );
    } else {
      sk(
        ST,
        [
          [sx - 4, top],
          [x1 + 4, top],
        ],
        { w: 2.4 },
      );
      sk(
        ST,
        [
          [sx + w * 0.68, top],
          [sx + w * 0.68, top - 26],
          [sx + w * 0.84, top - 26],
          [sx + w * 0.84, top],
        ],
        {
          w: 1.6,
          a: 0.6,
        },
      );
    }
    sk(
      ST,
      [
        [sx, top],
        [sx, G],
      ],
      { w: 2 },
    );
    sk(
      ST,
      [
        [x1, top],
        [x1, G],
      ],
      { w: 2 },
    );
    // upper windows
    const colsN = w > 150 ? 3 : 2;
    const rowsN = Math.floor((h - (shop ? 78 : 60)) / 44);
    for (let r = 0; r < rowsN; r++)
      for (let c = 0; c < colsN; c++) {
        const wx = sx + (w / (colsN + 1)) * (c + 1) - 10;
        const wy = top + 16 + r * 44;
        const on = rnd() < 0.6;
        litRect(wx, wy, 20, 26, on);
        sk(
          ST,
          [
            [wx + 10, wy],
            [wx + 10, wy + 26],
          ],
          { w: 0.9, a: 0.3, passes: 1, op: 0.7 },
        );
        if (rnd() < 0.45) {
          // window box
          for (let f = 0; f < 6; f++)
            sk(
              ST,
              [
                [wx - 2 + f * 5, wy + 30],
                [wx - 3 + f * 5 + jit(3), wy + 22 + jit(2)],
              ],
              {
                c: GREEN,
                w: 1.6,
                a: 0.5,
                passes: 1,
              },
            );
          for (let f = 0; f < 3; f++)
            node(ST, "circle", {
              cx: wx + 2 + f * 8 + jit(2),
              cy: wy + 22 + jit(2),
              r: 2,
              fill: TERRA,
            });
          sk(
            ST,
            [
              [wx - 4, wy + 31],
              [wx + 24, wy + 31],
            ],
            { w: 1.4, a: 0.4, passes: 1 },
          );
        }
      }
    if (shop) {
      const ay = G - 62;
      const awn = `M${sx + 8} ${ay}H${x1 - 8}L${x1 - 1} ${ay + 18}H${sx + 1}Z`;
      litRect(sx + 14, G - 40, w * 0.5, 30, true);
      litRect(x1 - 38, G - 42, 22, 42, false);
      node(ST, "circle", { cx: x1 - 21, cy: G - 20, r: 1.6, fill: ink.INK });
      node(ST, "path", { d: awn, fill: "#f6eedb", stroke: "none" });
      hatch(ST, awn, [sx, ay, x1, ay + 18], { c: TERRA, gap: 9, op: 1, w: 3.2, lean: 0.15 });
      sk(
        ST,
        [
          [sx + 8, ay],
          [x1 - 8, ay],
          [x1 - 1, ay + 18],
          [sx + 1, ay + 18],
        ],
        { w: 1.8, a: 0.6, close: true },
      );
    } else {
      const dx = sx + w / 2 - 12;
      litRect(dx, G - 44, 24, 44, false);
      sk(ST, arc(dx + 12, G - 44, 12, 10, Math.PI, Math.PI * 2, 8), { w: 1.4, a: 0.4 });
      node(ST, "circle", { cx: dx + 19, cy: G - 20, r: 1.6, fill: ink.INK });
    }
    sx = x1;
    if (!axoDone && n >= 3) {
      // the axolotl, stopped in front of a shop window
      ink.PAPER = "#c8a678";
      drawAxo(ST, `translate(${sx + 44} ${G - 16}) scale(.9)`);
      axoDone = true;
      sx += 88;
    } else if (rnd() < 0.3) sx += 14;
  }
  sk(
    ST,
    [
      [0, G],
      [1600, G],
    ],
    { w: 2.4, a: 1 },
  );
  for (let i = 0; i < 110; i++) {
    const x = rnd() * 1600;
    const y = G + 6 + rnd() * 30;
    const len = 8 + rnd() * 30;
    sk(
      ST,
      [
        [x, y],
        [x + len, y + jit(1)],
      ],
      { w: 1.1, op: 0.25 + rnd() * 0.35, a: 0.6, passes: 1 },
    );
  }

  /* ================= act 3: the desk, in graphite ================= */
  setInk("#3a3632", "#e9c46a", "#efe6d2");
  const DK = root();
  // window with a blue wash
  const win = "M40 40h112v112H40Z";
  hatch(DK, win, [40, 40, 152, 152], { c: "#9fbcd0", gap: 5, op: 0.7, w: 2.4, lean: 0.7 });
  sk(
    DK,
    [
      [40, 40],
      [152, 40],
      [152, 152],
      [40, 152],
    ],
    { w: 1.6, close: true },
  );
  sk(
    DK,
    [
      [96, 40],
      [96, 152],
    ],
    { w: 1.1, passes: 1 },
  );
  sk(
    DK,
    [
      [40, 96],
      [152, 96],
    ],
    { w: 1.1, passes: 1 },
  );
  sk(
    DK,
    [
      [32, 156],
      [160, 156],
    ],
    { w: 1.8 },
  );
  // desk
  sk(
    DK,
    [
      [14, 270],
      [506, 270],
    ],
    { w: 2.4 },
  );
  sk(
    DK,
    [
      [20, 280],
      [500, 280],
    ],
    { w: 1.2, op: 0.6, passes: 1 },
  );
  sk(
    DK,
    [
      [58, 282],
      [50, 372],
    ],
    { w: 2 },
  );
  sk(
    DK,
    [
      [462, 282],
      [470, 372],
    ],
    { w: 2 },
  );
  // books
  sk(
    DK,
    [
      [56, 270],
      [56, 252],
      [150, 252],
      [150, 270],
    ],
    { w: 1.6 },
  );
  sk(
    DK,
    [
      [66, 252],
      [66, 236],
      [142, 236],
      [142, 252],
    ],
    { w: 1.6 },
  );
  hatch(DK, "M66 236h76v16H66Z", [66, 236, 142, 252], { gap: 5, op: 0.4, lean: 0.4 });
  // monitor: the screen is this act's light
  const scr = "M196 118h188v116H196Z";
  hatch(DK, scr, [196, 118, 384, 234], { c: ink.LAMP, gap: 3.4, op: 0.85, w: 2, lean: 0.5 });
  sk(
    DK,
    [
      [196, 118],
      [384, 118],
      [384, 234],
      [196, 234],
    ],
    { w: 2.2, close: true },
  );
  for (let i = 0; i < 7; i++) {
    const x0 = 212 + (i % 3) * 12;
    const y = 134 + i * 13;
    sk(
      DK,
      [
        [x0, y],
        [x0 + 40 + rnd() * 90, y],
      ],
      { w: 1.6, a: 0.5, passes: 1, op: 0.75 },
    );
  }
  sk(
    DK,
    [
      [290, 234],
      [290, 260],
    ],
    { w: 2.2 },
  );
  sk(
    DK,
    [
      [258, 264],
      [322, 264],
    ],
    { w: 2.2 },
  );
  // mug
  sk(
    DK,
    [
      [412, 236],
      [415, 268],
      [441, 268],
      [444, 236],
    ],
    { w: 1.8, close: true, fill: ink.PAPER },
  );
  sk(DK, arc(446, 250, 9, 9, -Math.PI / 2, Math.PI / 2, 8), { w: 1.6 });
  sk(
    DK,
    [
      [422, 226],
      [418, 214],
      [426, 204],
      [421, 192],
    ],
    { w: 1.2, op: 0.6, passes: 1 },
  );
  sk(
    DK,
    [
      [434, 226],
      [431, 212],
      [438, 202],
    ],
    { w: 1.2, op: 0.6, passes: 1 },
  );
  // stool and the axolotl, from behind, working
  sk(
    DK,
    [
      [254, 334],
      [326, 334],
    ],
    { w: 2.2 },
  );
  sk(
    DK,
    [
      [264, 336],
      [258, 376],
    ],
    { w: 1.8 },
  );
  sk(
    DK,
    [
      [316, 336],
      [322, 376],
    ],
    { w: 1.8 },
  );
  drawAxo(DK, "translate(290 332) scale(1.45)");

  /* ================= act 4: the volcano ================= */
  setInk("#cfc6b8", "#ec7a32", "#221c1a");
  const VO = root();
  const VG = 384;
  // smoke
  for (const [cx, cy, half] of [
    [980, 70, 150],
    [1250, 54, 170],
    [1110, 22, 120],
    [820, 120, 110],
    [1420, 110, 110],
  ]) {
    for (let i = 0; i < 11; i++) {
      const y = cy + (i - 5) * 7;
      const k = 1 - Math.abs(i - 5) / 7;
      const off = jit(34);
      sk(
        VO,
        [
          [cx - half * k + off, y],
          [cx + half * k + off, y],
        ],
        { w: 1.3, op: 0.3, a: 1.6, passes: 1 },
      );
    }
  }
  // distant hills
  sk(
    VO,
    [
      [0, 350],
      [140, 322],
      [300, 340],
      [470, 310],
      [640, 344],
      [800, 360],
    ],
    { w: 1.4, op: 0.5 },
  );
  sk(
    VO,
    [
      [1380, 360],
      [1480, 330],
      [1600, 346],
    ],
    { w: 1.4, op: 0.5 },
  );
  // embers: this act's light is fire
  for (let i = 0; i < 170; i++) {
    const ang = -Math.PI * (0.12 + rnd() * 0.76);
    const r0 = 8 + rnd() * 30;
    const r1 = r0 + 16 + rnd() * rnd() * 190;
    sk(
      VO,
      [
        [1105 + Math.cos(ang) * r0, 122 + Math.sin(ang) * r0],
        [1105 + Math.cos(ang) * r1, 122 + Math.sin(ang) * r1],
      ],
      {
        c: rnd() < 0.25 ? "#f6c160" : ink.LAMP,
        w: 1 + rnd() * 1.6,
        op: 0.2 + rnd() * 0.55,
        a: 1.4,
        passes: 1,
      },
    );
  }
  for (let i = 0; i < 60; i++) {
    node(VO, "circle", {
      cx: 1105 + jit(260),
      cy: 110 - rnd() * 110 + jit(20),
      r: 1 + rnd() * 1.8,
      fill: rnd() < 0.3 ? "#f6c160" : ink.LAMP,
      opacity: 0.4 + rnd() * 0.6,
    });
  }
  const cone: Pt[] = [
    [800, VG],
    [930, 290],
    [1010, 190],
    [1056, 128],
    [1098, 136],
    [1152, 124],
    [1206, 196],
    [1300, 290],
    [1430, VG],
  ];
  node(VO, "path", { d: wob(cone, 0, true), fill: ink.PAPER, stroke: "none" });
  hatch(VO, "M1110 130L1152 124L1206 196L1300 290L1430 384H1150Z", [1100, 120, 1430, VG], {
    gap: 7,
    op: 0.32,
    lean: -0.7,
  });
  sk(VO, cone, { w: 2.2, a: 1.4 });
  const lava: Pt[][] = [
    [
      [1088, 136],
      [1072, 200],
      [1040, 262],
      [1052, 330],
      [1020, VG],
    ],
    [
      [1120, 132],
      [1150, 210],
      [1196, 292],
      [1184, 352],
    ],
    [
      [1104, 136],
      [1100, 190],
      [1118, 240],
    ],
  ];
  for (const p of lava) sk(VO, p, { c: ink.LAMP, w: 2.8, a: 1.6 });
  sk(
    VO,
    [
      [0, VG],
      [1600, VG],
    ],
    { w: 2, a: 1 },
  );
  for (let i = 0; i < 90; i++) {
    const x = rnd() * 1600;
    const y = VG + 6 + rnd() * 30;
    const len = 8 + rnd() * 34;
    const warm = Math.abs(x - 1100) < 260 && rnd() < 0.5;
    sk(
      VO,
      [
        [x, y],
        [x + len, y + jit(1)],
      ],
      {
        c: warm ? ink.LAMP : ink.INK,
        w: 1.1,
        op: 0.25 + rnd() * 0.4,
        a: 0.6,
        passes: 1,
      },
    );
  }
  // the trail: eight stones up to the crater
  const stones: Pt[] = [
    [300, 374],
    [430, 368],
    [560, 374],
    [690, 366],
    [812, 372],
    [912, 302],
    [996, 206],
    [1066, 138],
  ];
  stones.forEach(([x, y], i) => {
    if (i) {
      const [px, py] = stones[i - 1];
      const n = Math.round(Math.hypot(x - px, y - py) / 22);
      for (let k = 1; k < n; k += 2) {
        sk(
          VO,
          [
            [px + ((x - px) * k) / n, py + ((y - py) * k) / n],
            [px + ((x - px) * (k + 0.7)) / n, py + ((y - py) * (k + 0.7)) / n],
          ],
          { w: 1.3, op: 0.7, a: 0.4, passes: 1 },
        );
      }
    }
    const st = arc(x, y, 13 - i * 0.6, 6 - i * 0.2, 0, Math.PI * 2, 12);
    node(VO, "path", { d: wob(st, 0, true), fill: ink.PAPER, stroke: "none" });
    sk(VO, st, { c: i ? ink.INK : ink.LAMP, w: 1.8, a: 0.6 });
  });
  drawAxo(VO, "translate(236 384)");

  /* ================= act 5: morning ================= */
  setInk("#3b4a3a", "#f2c230", "#fbf8ef");
  const FD = root();
  const FG = 318;
  const pick = <T>(a: T[]) => a[Math.floor(rnd() * a.length)];
  // sky in short brush strokes
  for (let i = 0; i < 230; i++) {
    const x = rnd() * 1600;
    const y = rnd() * 280;
    const len = 18 + rnd() * 44;
    if (Math.hypot(x + len / 2 - 1240, y - 150) < 120) continue;
    sk(
      FD,
      [
        [x, y],
        [x + len / 2, y - 3 + jit(2)],
        [x + len, y + jit(2)],
      ],
      {
        c: pick(["#8fb4d6", "#a9c7e0", "#7ea6cc"]),
        w: 2 + rnd() * 2,
        op: 0.22 + rnd() * 0.4,
        a: 0.8,
        passes: 1,
      },
    );
  }
  // the sun: the same light as the street lamp, now whole
  for (let i = 0; i < 70; i++) {
    const ang = rnd() * Math.PI * 2;
    const r0 = 70 + rnd() * 14;
    const r1 = r0 + 14 + rnd() * 60;
    sk(
      FD,
      [
        [1240 + Math.cos(ang) * r0, 150 + Math.sin(ang) * r0],
        [1240 + Math.cos(ang) * r1, 150 + Math.sin(ang) * r1],
      ],
      { c: ink.LAMP, w: 1.6 + rnd() * 1.6, op: 0.35 + rnd() * 0.5, a: 1, passes: 1 },
    );
  }
  const sun = wob(arc(1240, 150, 58, 58), 0, true);
  node(FD, "path", { d: sun, fill: "#f7d75a", stroke: "none" });
  hatch(FD, sun, [1182, 92, 1298, 208], { c: "#e2a90f", gap: 4, op: 0.8, w: 1.8, lean: 0.6 });
  sk(FD, arc(1240, 150, 58, 58), { c: "#c9960c", w: 2, a: 1 });
  // hills
  const hills: Pt[] = [
    [0, 296],
    [180, 268],
    [380, 290],
    [620, 262],
    [860, 292],
    [1100, 270],
    [1340, 296],
    [1600, 274],
  ];
  hatch(FD, `${wob(hills, 0)}L1600 ${FG}L0 ${FG}Z`, [0, 260, 1600, FG], {
    c: "#7fa58e",
    gap: 5,
    op: 0.6,
    w: 1.8,
    lean: 0.8,
  });
  sk(FD, hills, { w: 1.5, op: 0.7 });
  // the house
  node(FD, "path", { d: `M420 ${FG}V262H560V${FG}Z`, fill: "#f3e7c9", stroke: "none" });
  const roof = "M410 262L440 232H540L570 262Z";
  node(FD, "path", { d: roof, fill: ink.PAPER, stroke: "none" });
  hatch(FD, roof, [410, 232, 570, 262], { c: "#c5553a", gap: 3.4, op: 0.95, w: 1.8, lean: 0.5 });
  sk(
    FD,
    [
      [410, 262],
      [440, 232],
      [540, 232],
      [570, 262],
    ],
    { w: 1.8, close: true },
  );
  sk(
    FD,
    [
      [420, 262],
      [420, FG],
    ],
    { w: 1.8 },
  );
  sk(
    FD,
    [
      [560, 262],
      [560, FG],
    ],
    { w: 1.8 },
  );
  for (const [x, y] of [
    [438, 276],
    [478, 276],
    [522, 276],
  ]) {
    sk(
      FD,
      [
        [x, y],
        [x + 16, y],
        [x + 16, y + 20],
        [x, y + 20],
      ],
      { w: 1.2, a: 0.4, close: true, fill: "#bcd3c0" },
    );
  }
  // tree
  sk(
    FD,
    [
      [1452, FG + 20],
      [1448, 250],
      [1440, 190],
    ],
    { w: 3, a: 1.2, c: "#6b5138" },
  );
  sk(
    FD,
    [
      [1448, 250],
      [1482, 206],
    ],
    { w: 2, a: 1, c: "#6b5138" },
  );
  for (let i = 0; i < 260; i++) {
    const ang = rnd() * Math.PI * 2;
    const r = Math.sqrt(rnd()) * 112;
    const x = 1450 + Math.cos(ang) * r * 1.15;
    const y = 170 + Math.sin(ang) * r * 0.85;
    sk(
      FD,
      [
        [x, y],
        [x + 6 + rnd() * 8, y - 4 + jit(5)],
      ],
      {
        c: pick(["#5d8a3c", "#7fa650", "#3f6f3a", "#a9bf55"]),
        w: 2.2 + rnd() * 2,
        op: 0.55 + rnd() * 0.4,
        a: 0.6,
        passes: 1,
      },
    );
  }
  // the field: short, slanted strokes
  for (let i = 0; i < 1300; i++) {
    const t = rnd() ** 0.8;
    const y = FG + 4 + t * 200;
    const x = rnd() * 1600;
    const len = 8 + t * 24;
    const lean = jit(8) + 4;
    sk(
      FD,
      [
        [x, y],
        [x + lean, y - len],
      ],
      {
        c: pick(["#6f9a45", "#8fb04f", "#4f7f3a", "#b7c95a", "#5f8f58"]),
        w: 1.6 + t * 2.2,
        op: 0.5 + rnd() * 0.45,
        a: 0.6,
        passes: 1,
      },
    );
  }
  for (let i = 0; i < 230; i++) {
    const t = rnd();
    const y = FG + 10 + t * 196;
    const x = rnd() * 1600;
    node(FD, "circle", {
      cx: x,
      cy: y,
      r: 1.6 + t * 3,
      fill: pick([ink.LAMP, ink.LAMP, "#fffdf2", "#f08a3c"]),
      opacity: 0.9,
    });
  }
  // and, at last, it turns around
  for (let i = 0; i < 22; i++)
    node(FD, "circle", {
      cx: 800 + jit(46),
      cy: 470 + jit(8),
      r: 9 + rnd() * 6,
      fill: "#7fa650",
      opacity: 0.5,
    });
  drawAxo(FD, "translate(800 468) scale(1.9)", true);
  for (let i = 0; i < 46; i++) {
    const x = 800 + jit(90);
    sk(
      FD,
      [
        [x, 478 + jit(6)],
        [x + jit(6), 452 + jit(8)],
      ],
      {
        c: pick(["#6f9a45", "#4f7f3a", "#8fb04f"]),
        w: 3,
        op: 0.9,
        a: 0.6,
        passes: 1,
      },
    );
  }

  return {
    defs: inner(defs),
    hero: inner(S),
    tears,
    street: inner(ST),
    desk: inner(DK),
    volcano: inner(VO),
    field: inner(FD),
  };
}

/** The axolotl facing us under the lamp light: favicon and app icon. */
export function iconSvg(size: number, rounded = true) {
  const { setInk, defs, drawAxo } = createPen(7, "i");
  setInk("#efe6cf", "#f0aa3c", "#1c3a3b");
  const g = root();
  drawAxo(g, "translate(0 0)", true);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="-74 -100 148 148"><defs>${inner(
    defs,
  )}</defs><rect x="-74" y="-100" width="148" height="148" rx="${rounded ? 32 : 0}" fill="#1c3a3b"/><g fill="none" stroke-linecap="round" stroke-linejoin="round">${inner(
    g,
  )}</g></svg>`;
}
