import { hydrate, prerender as ssr } from "preact-iso";
import { App } from "./app";
import "./styles/global.css";

if (typeof window !== "undefined") {
  const root = document.getElementById("app");
  if (root) hydrate(<App />, root);
}

export async function prerender(data: { url?: string }) {
  return await ssr(<App url={data.url} />);
}
