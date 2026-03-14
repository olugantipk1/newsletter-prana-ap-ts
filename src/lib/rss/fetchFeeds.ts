import Parser from "rss-parser";
import { RSS_FEEDS } from "./feeds";

const parser = new Parser({
  timeout: 8000,
  headers: { "User-Agent": "Prana-Newsletter/1.0 (AP-TS Civic)" },
});

export interface RawFeedItem {
  title: string;
  link: string;
  pubDate?: string;
  contentSnippet?: string;
  feedLabel: string;
}

export async function fetchAllFeeds(): Promise<RawFeedItem[]> {
  const results: RawFeedItem[] = [];
  const settled = await Promise.allSettled(
    RSS_FEEDS.map(async ({ url, label }) => {
      const feed = await parser.parseURL(url);
      return (feed.items ?? []).map((item) => ({
        title: item.title ?? "",
        link: item.link ?? "",
        pubDate: item.pubDate,
        contentSnippet: item.contentSnippet?.replace(/\s+/g, " ").slice(0, 300) ?? "",
        feedLabel: label,
      }));
    })
  );
  for (const result of settled) {
    if (result.status === "fulfilled") results.push(...result.value);
  }
  return results
    .filter((item) => item.title && item.link)
    .sort((a, b) => (b.pubDate ?? "").localeCompare(a.pubDate ?? ""));
}
