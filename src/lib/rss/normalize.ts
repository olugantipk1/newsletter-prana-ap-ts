import type { NewsItem, PanchaBhoota } from "@/types/edition";
import { ELEMENT_KEYWORDS } from "./feeds";
import { fetchAllFeeds } from "./fetchFeeds";

const ELEMENT_ORDER: PanchaBhoota[] = ["Prithvi", "Jala", "Agni", "Vayu", "Akasha"];
const CATEGORY_MAP: Record<PanchaBhoota, { en: string; te: string }> = {
  Prithvi: { en: "Infrastructure", te: "ఇన్ఫ్రాస్ట్రక్చర్" },
  Jala: { en: "Water & Health", te: "నీరు మరియు ఆరోగ్యం" },
  Agni: { en: "Economy", te: "అర్థశాస్త్రం" },
  Vayu: { en: "Governance", te: "పాలన" },
  Akasha: { en: "Culture & Cinema", te: "సంస్కృతి మరియు సినిమా" },
};

function slugify(title: string, index: number): string {
  const base = title
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 30);
  return `rss-${base}-${index}`.toLowerCase() || `rss-${index}`;
}

/** First matching element in ELEMENT_KEYWORDS order wins. Default: Vayu (governance). */
function assignElement(title: string, snippet: string): PanchaBhoota {
  const text = `${title} ${snippet}`.toLowerCase();
  for (const [element, keywords] of ELEMENT_KEYWORDS) {
    if (keywords.some((kw) => text.includes(kw.toLowerCase()))) {
      return element as PanchaBhoota;
    }
  }
  return "Vayu";
}

function rawToNewsItem(
  raw: { title: string; link: string; contentSnippet?: string; feedLabel: string },
  index: number
): NewsItem {
  const snippet = raw.contentSnippet ?? "";
  const element = assignElement(raw.title, snippet);
  const id = slugify(raw.title, index);
  const headline = raw.title;
  const summary = snippet || "—";
  const tldrEn = [
    `From ${raw.feedLabel}: ${headline.slice(0, 80)}${headline.length > 80 ? "…" : ""}`,
    summary.slice(0, 120) + (summary.length > 120 ? "…" : ""),
    "Read the original article for full details and context.",
  ];
  const source = raw.link;
  return {
    id,
    element,
    category: CATEGORY_MAP[element],
    tone: "Witty",
    content: {
      en: { headline, tldr: tldrEn, source },
      te: {
        headline: `${headline} (ఇంగ్లీషులో)`,
        tldr: tldrEn.map((t) => `${t} — అసలు వార్త ఇంగ్లీషులో చదవండి.`),
        source,
      },
    },
  };
}

/**
 * Fetches RSS feeds and normalizes items to NewsItem[].
 * Distributes across Pancha Bhootalu; default element is Vayu.
 */
export async function fetchAndNormalizeRssArticles(): Promise<NewsItem[]> {
  const rawItems = await fetchAllFeeds();
  const byElement: Partial<Record<PanchaBhoota, NewsItem[]>> = {};
  for (const el of ELEMENT_ORDER) byElement[el] = [];

  rawItems.slice(0, 50).forEach((raw, i) => {
    const item = rawToNewsItem(raw, i);
    const list = byElement[item.element];
    if (list) list.push(item);
  });

  const ordered: NewsItem[] = [];
  for (const el of ELEMENT_ORDER) {
    const list = byElement[el] ?? [];
    ordered.push(...list.slice(0, 4));
  }
  if (ordered.length === 0) {
    ordered.push(...rawItems.slice(0, 8).map((raw, i) => rawToNewsItem(raw, i)));
  }
  return ordered.slice(0, 20);
}
