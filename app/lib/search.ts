// lib/search.ts
// Web search via Perplexity Sonar, routed through AICredits.
// Uses the shared client from lib/aicredits.ts.
//
// NOTE: openai/gpt-4o-mini-search-preview is LISTED in AICredits' catalog
// but returns 404 "no endpoints found" when called — it's catalogued for
// pricing display but has no live upstream route. Perplexity Sonar is
// used instead because web search is core to how the model itself
// generates answers (not a bolt-on tool-call), so it's actually routable.

import { aicredits, recordUsage } from "./aicredits";
import { pLimit, retryWithBackoff } from "./limit";

export interface SearchResult {
  url: string;
  title: string;
  snippet: string;
}

const SEARCH_MODEL = "perplexity/sonar";

// Every caller of webSearch (across all localities, all tiers) funnels
// through this single limiter. Without it, a route with several localities
// searched in parallel — each firing off up to ~8 queries for its own
// tiers — easily hits dozens of simultaneous Perplexity calls and trips
// AICredits' "429 Concurrency Limit Exceeded".
const searchLimit = pLimit(4);

export async function webSearch(query: string): Promise<SearchResult[]> {
  if (!process.env.AICREDITS_API_KEY) {
    console.error("webSearch: missing AICREDITS_API_KEY env var.");
    return [];
  }

  return searchLimit(async () => {
    try {
      const response = await retryWithBackoff(
        () =>
          aicredits.chat.completions.create({
            model: SEARCH_MODEL,
            messages: [
              {
                role: "system",
                content:
                  "You are a search assistant. Search the web for the user's " +
                  "query and respond ONLY with a JSON array (no markdown, no " +
                  "preamble) of up to 20 objects, each with keys: url, title, " +
                  "snippet. snippet should be 1-2 sentences. Include as many " +
                  "distinct real charging-station listings, directories, or " +
                  "provider pages as you can find — do not stop at the first " +
                  "few. If you find nothing relevant, return an empty array [].",
              },
              { role: "user", content: query },
            ],
          }),
        { retries: 3, baseDelayMs: 1500 }
      );

      const usage = response.usage;
      if (usage) {
        recordUsage(SEARCH_MODEL, usage.prompt_tokens || 0, usage.completion_tokens || 0);
      }

      const raw = response.choices[0]?.message?.content || "[]";
      const cleaned = raw.replace(/```json|```/g, "").trim();

      let results: SearchResult[];
      try {
        results = JSON.parse(cleaned);
      } catch (parseErr) {
        console.error(
          `webSearch: failed to parse model output for "${query}". Raw: ${raw.slice(0, 300)}`
        );
        return [];
      }

      console.log(`webSearch: ${results.length} results for "${query}"`);
      return results;
    } catch (err: any) {
      console.error("webSearch (Perplexity Sonar via AICredits) error:", err.message);
      return [];
    }
  });
}

// ── One-off health check ────────────────────────────────────────────────
export async function searchHealthCheck(): Promise<void> {
  try {
    const results = await webSearch("test query");
    console.log("=== SEARCH HEALTH CHECK ===");
    console.log("Result count:", results.length);
    console.log("Sample:", results[0] || "none");
    console.log("===========================");
  } catch (err: any) {
    console.error("Search health check failed:", err.message);
  }
}