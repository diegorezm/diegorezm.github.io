import type { ComponentChildren } from "preact";
import { scenes } from "../drawing";

type SketchProps = {
  /** Pre-drawn SVG markup from src/drawing/scenes.ts. */
  markup: string;
  class: string;
  viewBox: string;
  preserveAspectRatio?: string;
  children?: ComponentChildren;
};

/** An SVG drawing whose strokes come from the seeded pen. */
export function Sketch({ markup, children, ...svg }: SketchProps) {
  return (
    <svg aria-hidden="true" {...svg}>
      <g
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
      {children}
    </svg>
  );
}

/** Torn paper edge at the bottom of a section, revealing the next one. */
export function Tear({ index, fiber, paper }: { index: number; fiber: string; paper: string }) {
  const [fiberD, paperD] = scenes.tears[index];
  return (
    <svg class="tear" viewBox="0 0 1600 44" preserveAspectRatio="none" aria-hidden="true">
      <path d={fiberD} fill={fiber} />
      <path d={paperD} fill={paper} />
    </svg>
  );
}

export const Grain = () => <div class="grain" aria-hidden="true" />;
