import { buildScenes } from "./scenes";

/** All page drawings, built once (at prerender and again, identically, in the browser). */
export const scenes = buildScenes();
