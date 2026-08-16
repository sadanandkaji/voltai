// lib/clean.ts
// Strips a raw HTML page down to readable plain text for feeding into
// the AI extraction step. Deliberately simple (regex-based) — no DOM
// parser dependency needed since we only need rough readable text, not
// structural fidelity.

export function cleanHtml(html: string): string {
  if (!html || typeof html !== "string") return "";

  let text = html;

  // Strip script/style blocks entirely (content + tags) — these are noise
  text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ");
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ");
  text = text.replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, " ");

  // Strip HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, " ");

  // Convert common block-level tags to a space/newline so words don't
  // run together after stripping tags (e.g. "</div><div>" shouldn't glue)
  text = text.replace(/<\/(p|div|br|li|tr|h[1-6])>/gi, "\n");
  text = text.replace(/<br\s*\/?>/gi, "\n");

  // Strip all remaining tags
  text = text.replace(/<[^>]+>/g, " ");

  // Decode common HTML entities
  const entities: Record<string, string> = {
    "&nbsp;": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
    "&mdash;": "—",
    "&ndash;": "–",
    "&rsquo;": "'",
    "&lsquo;": "'",
    "&rdquo;": '"',
    "&ldquo;": '"',
  };
  for (const [entity, char] of Object.entries(entities)) {
    text = text.split(entity).join(char);
  }
  // Numeric entities, e.g. &#8217;
  text = text.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));

  // Collapse whitespace: multiple spaces/tabs -> one space,
  // multiple blank lines -> one newline
  text = text.replace(/[ \t]+/g, " ");
  text = text.replace(/\n\s*\n+/g, "\n");
  text = text.trim();

  return text;
}