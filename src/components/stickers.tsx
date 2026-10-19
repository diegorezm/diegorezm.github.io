import { useRef, useState } from "preact/hooks";
import { confetti } from "../fx";

type Sticker = {
  id: string;
  label: string;
  className: string;
  top: string;
  left: string;
  rotate: number;
};

/** Stickers scattered over the hero. Desktop users can drag them around; on phones they sit in a row. */
export default function Stickers({ hire }: { hire: string }) {
  const stickers: Sticker[] = [
    { id: "hire", label: hire, className: "sticker--burst", top: "4%", left: "88%", rotate: 12 },
    {
      id: "linux",
      label: "🐧 linux",
      className: "sticker--lime",
      top: "94%",
      left: "2%",
      rotate: -8,
    },
    {
      id: "docker",
      label: "🐳 docker",
      className: "sticker--blue",
      top: "92%",
      left: "62%",
      rotate: 6,
    },
    { id: "ts", label: "TS", className: "sticker--ts", top: "3%", left: "46%", rotate: -10 },
    {
      id: "br",
      label: "🇧🇷 made in brasil",
      className: "sticker--paper",
      top: "95%",
      left: "28%",
      rotate: -5,
    },
    { id: "sudo", label: "$ sudo", className: "sticker--pink", top: "12%", left: "62%", rotate: 9 },
  ];

  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number; z: number }>>({});
  const drag = useRef<{
    id: string;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
    moved: boolean;
  } | null>(null);
  const zTop = useRef(10);

  const onDown = (id: string) => (event: PointerEvent) => {
    const el = event.currentTarget as HTMLElement;
    el.setPointerCapture(event.pointerId);
    const current = offsets[id] ?? { x: 0, y: 0, z: 0 };
    zTop.current += 1;
    drag.current = {
      id,
      startX: event.clientX,
      startY: event.clientY,
      baseX: current.x,
      baseY: current.y,
      moved: false,
    };
    setOffsets((prev) => ({ ...prev, [id]: { ...current, z: zTop.current } }));
  };

  const onMove = (event: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = event.clientX - d.startX;
    const dy = event.clientY - d.startY;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
    setOffsets((prev) => ({
      ...prev,
      [d.id]: { x: d.baseX + dx, y: d.baseY + dy, z: prev[d.id]?.z ?? 0 },
    }));
  };

  const onUp = (event: PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (d && !d.moved && d.id === "hire") confetti(event.clientX, event.clientY, 90);
  };

  return (
    <div class="stickers" aria-hidden="true">
      {stickers.map((s) => {
        const o = offsets[s.id];
        return (
          <span
            key={s.id}
            class={`sticker ${s.className}`}
            style={{
              top: s.top,
              left: s.left,
              zIndex: o?.z ?? undefined,
              "--r": `${s.rotate}deg`,
              "--x": `${o?.x ?? 0}px`,
              "--y": `${o?.y ?? 0}px`,
            }}
            onPointerDown={onDown(s.id)}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            {s.label}
          </span>
        );
      })}
    </div>
  );
}
