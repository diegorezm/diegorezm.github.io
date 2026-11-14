// ─── Quest: the distributed systems learning path ────────────────────────────
// `current` is the index of the stage being worked on now (0 = first).
// When you finish a stage, bump it.

import type { Text } from "./site";

export const current = 0;

export const stages: { name: string; boss: Text }[] = [
  {
    name: "Foundation Village",
    boss: { pt: "serviço HTTP resiliente", en: "resilient HTTP service" },
  },
  { name: "Replica Harbor", boss: { pt: "KV replicado v1", en: "replicated KV v1" } },
  { name: "Raft Citadel", boss: { pt: "Raft mínimo em Java", en: "minimal Raft in Java" } },
  { name: "Vault Keep", boss: { pt: "KV v2 sobre Raft", en: "KV v2 on Raft" } },
  { name: "Shard Isles", boss: { pt: "KV com shards", en: "sharded KV" } },
  { name: "Courier Docks", boss: { pt: "pedidos com DLQ", en: "orders with DLQ" } },
  { name: "Watchtower Peak", boss: { pt: "observabilidade", en: "observability" } },
  { name: "Production Capital", boss: { pt: "projeto final", en: "final project" } },
];
