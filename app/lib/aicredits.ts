// lib/aicredits.ts
// Single shared client for all AICredits calls (search, extraction, etc.)
// so every route/module uses the same key + base URL config.
//
// Env var needed:
//   AICREDITS_API_KEY=sk-your-64-char-hex-key
//
// Get this from the AICredits Dashboard → API Keys → Create New Key.
// Set a budget (INR) on the key so a bug can't run up unexpected spend.
// The key is shown ONLY ONCE at creation — copy it immediately.

import OpenAI from "openai";

if (!process.env.AICREDITS_API_KEY) {
  console.warn(
    "aicredits.ts: AICREDITS_API_KEY is not set. " +
    "Calls through this client will fail until it's configured."
  );
}

export const aicredits = new OpenAI({
  apiKey: process.env.AICREDITS_API_KEY,
  baseURL: "https://api.aicredits.in/v1",
});

// ── Usage tracking (shared across all callers of this client) ──────────
// Basic in-memory tallies per model, since AICredits bills per token.
// Not persisted across restarts — swap for a DB/Redis counter if you
// need durable usage history.
interface ModelUsage {
  inputTokens: number;
  outputTokens: number;
}

const usageByModel = new Map<string, ModelUsage>();

export function recordUsage(model: string, inputTokens: number, outputTokens: number) {
  const existing = usageByModel.get(model) || { inputTokens: 0, outputTokens: 0 };
  existing.inputTokens += inputTokens;
  existing.outputTokens += outputTokens;
  usageByModel.set(model, existing);
}

export function getUsageByModel() {
  return Object.fromEntries(usageByModel.entries());
}

// Model rates (INR per 1M tokens), pulled from AICredits' /v1/models list.
// Add entries here as you use more models — used only for the rough cost
// estimates in getUsageStats(), not for billing itself (AICredits bills
// you directly regardless of what this tracks).
const MODEL_RATES_INR: Record<string, { input: number; output: number }> = {
  "perplexity/sonar": { input: 100.31, output: 100.31 },
  "openai/gpt-4o-mini": { input: 15.05, output: 60.18 },
};

export function getUsageStats() {
  const stats: Record<string, { inputTokens: number; outputTokens: number; estimatedCostINR: number }> = {};
  let totalCostINR = 0;

  for (const [model, usage] of usageByModel.entries()) {
    const rates = MODEL_RATES_INR[model];
    const cost = rates
      ? (usage.inputTokens / 1_000_000) * rates.input +
        (usage.outputTokens / 1_000_000) * rates.output
      : 0;
    stats[model] = { ...usage, estimatedCostINR: cost };
    totalCostINR += cost;
  }

  return { byModel: stats, totalCostINR };
}