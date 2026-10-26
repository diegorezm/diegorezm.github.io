import { useEffect, useRef, useState } from "preact/hooks";
import { confetti, prefersReducedMotion } from "../fx";
import { EMAIL, GITHUB, type Language, LINKEDIN, type Translation } from "../i18n";

type Line = { kind: "in" | "out" | "accent" | "err" | "ascii" | "dim"; text: string };

const LOGO = String.raw`
 ____  ____
|  _ \|  _ \
| | | | |_) |
| |_| |  _ <
|____/|_| \_\ `;

const COMMANDS = [
  "help",
  "whoami",
  "neofetch",
  "ls",
  "xp",
  "stack",
  "contact",
  "sudo hire diego",
  "theme",
  "lang",
  "date",
  "coffee",
  "clear",
];

type Props = {
  language: Language;
  t: Translation;
  onTheme: () => void;
  onLang: () => void;
};

export default function Terminal({ language, t, onTheme, onLang }: Props) {
  const pt = language === "pt";
  const L = (en: string, br: string) => (pt ? br : en);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const neofetch = (): Line[] => [
    { kind: "ascii", text: LOGO },
    { kind: "accent", text: "diego@rezm" },
    { kind: "dim", text: "----------" },
    {
      kind: "out",
      text: `${L("role", "cargo")}:    ${L("dev + linux infra", "dev + infra linux")}`,
    },
    {
      kind: "out",
      text: `${L("os", "so")}:      ${L("human (brazil edition)", "humano (edição brasil)")}`,
    },
    { kind: "out", text: "stack:   ts · next · postgres · docker" },
    { kind: "out", text: `${L("langs", "idiomas")}:   pt (${L("native", "nativo")}) · en (C2)` },
    { kind: "out", text: `status:  ${L("open to work ●", "aberto a vagas ●")}` },
  ];

  const run = (raw: string): Line[] | "clear" => {
    const cmd = raw.trim().toLowerCase().replace(/\s+/g, " ");
    switch (cmd) {
      case "":
        return [];
      case "help":
        return [
          { kind: "accent", text: L("available commands:", "comandos disponíveis:") },
          ...COMMANDS.map((c) => ({ kind: "out" as const, text: `  ${c}` })),
          {
            kind: "dim",
            text: L(
              "tip: tab autocompletes, ↑ ↓ for history",
              "dica: tab completa, ↑ ↓ para histórico",
            ),
          },
        ];
      case "whoami":
        return [{ kind: "out", text: t.hero.lead }];
      case "neofetch":
        return neofetch();
      case "ls":
      case "ls projects":
        return t.works.items.map((p) => ({
          kind: "out" as const,
          text: `${p.id}  ${p.name.padEnd(14)}${p.stack.join(", ")}`,
        }));
      case "xp":
      case "git log":
        return t.career.items.map((x) => ({
          kind: "out" as const,
          text: `${x.period.padEnd(21)}${x.role} @ ${x.org}`,
        }));
      case "stack":
        return t.inventory.groups.map((g) => ({
          kind: "out" as const,
          text: `${g.name.toLowerCase().padEnd(18)}${g.items.join(", ")}`,
        }));
      case "contact":
        return [
          { kind: "out", text: `email     ${EMAIL}` },
          { kind: "out", text: `github    ${GITHUB.replace("https://", "")}` },
          { kind: "out", text: `linkedin  ${LINKEDIN.replace("https://www.", "")}` },
        ];
      case "sudo hire diego":
      case "sudo hire-me":
      case "hire":
        confetti();
        return [
          { kind: "dim", text: "[sudo] password for recruiter: ********" },
          {
            kind: "accent",
            text: L("✔ permission granted. great choice!", "✔ permissão concedida. ótima escolha!"),
          },
          { kind: "out", text: L(`next step: ${EMAIL}`, `próximo passo: ${EMAIL}`) },
        ];
      case "theme":
        onTheme();
        return [{ kind: "accent", text: L("theme toggled ✦", "tema alternado ✦") }];
      case "lang":
        onLang();
        return [{ kind: "accent", text: pt ? "switched to english ✦" : "mudou para português ✦" }];
      case "date":
        return [{ kind: "out", text: new Date().toString() }];
      case "coffee":
        return [
          {
            kind: "out",
            text: L(
              "☕ brewing… done. productivity +20%",
              "☕ passando… pronto. produtividade +20%",
            ),
          },
        ];
      case "clear":
        return "clear";
      case "exit":
        return [
          {
            kind: "out",
            text: L("you can't leave. we have cookies 🍪", "não dá pra sair. temos biscoitos 🍪"),
          },
        ];
      case "rm -rf /":
      case "sudo rm -rf /":
        return [
          {
            kind: "err",
            text: L(
              "nice try. this server has backups.",
              "boa tentativa. esse servidor tem backup.",
            ),
          },
        ];
      case "vim":
        return [
          {
            kind: "out",
            text: L(
              "you're stuck now. just kidding: :q",
              "agora você ficou preso. brincadeira: :q",
            ),
          },
        ];
      default:
        if (cmd.startsWith("echo ")) return [{ kind: "out", text: raw.trim().slice(5) }];
        if (cmd.startsWith("sudo"))
          return [
            {
              kind: "err",
              text: L(
                "nice try 😏 (hint: sudo hire diego)",
                "boa tentativa 😏 (dica: sudo hire diego)",
              ),
            },
          ];
        return [
          {
            kind: "err",
            text: L(
              `command not found: ${cmd}. try "help"`,
              `comando não encontrado: ${cmd}. tente "help"`,
            ),
          },
        ];
    }
  };

  // Boot sequence: type "neofetch" and print it.
  useEffect(() => {
    const instant = prefersReducedMotion();
    const boot: Line[] = [
      { kind: "in", text: "neofetch" },
      ...neofetch(),
      {
        kind: "dim",
        text: L(`type "help" to see what I can do`, `digite "help" para ver o que eu sei fazer`),
      },
    ];
    if (instant) {
      setLines(boot);
      return;
    }
    setLines([]);
    const timers = boot.map((line, i) =>
      window.setTimeout(() => setLines((prev) => [...prev, line]), 350 + i * 90),
    );
    return () => timers.forEach(clearTimeout);
  }, [language]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lines]);

  const submit = (event: Event) => {
    event.preventDefault();
    const out = run(value);
    if (value.trim()) history.current.unshift(value);
    cursor.current = -1;
    if (out === "clear") setLines([]);
    else setLines((prev) => [...prev, { kind: "in", text: value }, ...out]);
    setValue("");
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = cursor.current + (event.key === "ArrowUp" ? 1 : -1);
      if (next < -1 || next >= history.current.length) return;
      cursor.current = next;
      setValue(next === -1 ? "" : history.current[next]);
    } else if (event.key === "Tab") {
      event.preventDefault();
      const match = COMMANDS.find((c) => value && c.startsWith(value.toLowerCase()));
      if (match) setValue(match);
    }
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: clicking anywhere is a mouse shortcut to focus the input, which keyboard users reach directly.
    // biome-ignore lint/a11y/useKeyWithClickEvents: same as above.
    <div class="terminal card" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div class="terminal__bar">
        <span class="dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>{t.terminal.title}</span>
        <span class="terminal__hint">{t.terminal.hint}</span>
      </div>
      <div class="terminal__body" ref={bodyRef} aria-live="polite">
        {lines.map((line, i) =>
          line.kind === "in" ? (
            <div key={i} class="t-line">
              <span class="t-prompt">❯</span> {line.text}
            </div>
          ) : (
            <pre key={i} class={`t-line t-${line.kind}`}>
              {line.text}
            </pre>
          ),
        )}
        <form class="t-input" onSubmit={submit}>
          <label class="t-prompt" for="term-input">
            ❯
          </label>
          <input
            id="term-input"
            ref={inputRef}
            value={value}
            onInput={(e) => setValue((e.target as HTMLInputElement).value)}
            onKeyDown={onKeyDown}
            placeholder={t.terminal.placeholder}
            autocomplete="off"
            autocapitalize="off"
            spellcheck={false}
            aria-label={t.terminal.placeholder}
          />
        </form>
      </div>
    </div>
  );
}
