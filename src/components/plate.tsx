import type { Plate as PlateKind } from "../i18n";

/** Engraving-style line illustrations used as catalog "plates" for each work. */
export default function Plate({ kind, label }: { kind: PlateKind; label: string }) {
  const w = 320;
  const h = 190;
  const lines: preact.JSX.Element[] = [];

  if (kind === "rings") {
    for (let r = 8; r < 120; r += 7) lines.push(<circle cx={170} cy={95} r={r} />);
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      lines.push(
        <line x1={170} y1={95} x2={170 + Math.cos(a) * 130} y2={95 + Math.sin(a) * 130} />,
      );
    }
  } else if (kind === "grid") {
    for (let x = 20; x < w; x += 20) lines.push(<line x1={x} y1={0} x2={x} y2={h} />);
    for (let y = 15; y < h; y += 20) lines.push(<line x1={0} y1={y} x2={w} y2={y} />);
    const cells = [
      [40, 35],
      [120, 75],
      [200, 35],
      [240, 115],
      [80, 135],
      [160, 155],
    ];
    for (const [x, y] of cells)
      lines.push(<rect x={x} y={y} width={40} height={20} class="fill" />);
  } else if (kind === "waves") {
    for (let row = 0; row < 16; row++) {
      let d = `M0 ${20 + row * 10}`;
      for (let x = 0; x <= w; x += 8) {
        const y = 20 + row * 10 + Math.sin(x / 26 + row * 0.55) * (4 + row * 0.6);
        d += ` L${x} ${y.toFixed(1)}`;
      }
      lines.push(<path d={d} />);
    }
  } else if (kind === "orbit") {
    for (let i = 0; i < 9; i++)
      lines.push(
        <ellipse
          cx={160}
          cy={95}
          rx={20 + i * 15}
          ry={8 + i * 8}
          transform={`rotate(${-18 + i * 4} 160 95)`}
        />,
      );
    lines.push(<circle cx={160} cy={95} r={14} class="fill" />);
  } else if (kind === "blocks") {
    for (let i = 0; i < 14; i++) {
      const bh = 20 + ((i * 37) % 120);
      lines.push(
        <rect
          x={18 + i * 21}
          y={h - 18 - bh}
          width={14}
          height={bh}
          class={i % 4 === 0 ? "fill" : ""}
        />,
      );
    }
    lines.push(<line x1={10} y1={h - 18} x2={w - 10} y2={h - 18} />);
  } else {
    for (let x = -h; x < w; x += 7) lines.push(<line x1={x} y1={h} x2={x + h} y2={0} />);
    lines.push(<rect x={90} y={40} width={140} height={110} class="paper" />);
    for (let y = 58; y < 140; y += 12)
      lines.push(<line x1={104} y1={y} x2={y % 24 ? 200 : 216} y2={y} />);
  }

  return (
    <svg
      class="plate"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
    >
      <g fill="none" stroke="currentColor" stroke-width="0.8">
        {lines}
      </g>
    </svg>
  );
}
