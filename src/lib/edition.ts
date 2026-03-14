import type { DailyEdition } from "@/types/edition";
import mockData from "@/data/mockData.json";

const MOCK_EDITION = mockData as DailyEdition;

export type EditionSource = "mock" | "rss" | "cache";

export interface GetEditionOptions {
  date?: string; // YYYY-MM-DD
  source?: EditionSource;
}

/**
 * Returns the daily edition for the given date.
 * Uses mock data by default; set PRANA_USE_RSS=1 to try RSS first with mock fallback.
 */
export async function getEdition(
  options: GetEditionOptions = {}
): Promise<{ edition: DailyEdition; source: EditionSource }> {
  const { date, source } = options;
  const useRss = process.env.PRANA_USE_RSS === "1" || source === "rss";

  if (useRss) {
    try {
      const { fetchAndNormalizeRssArticles } = await import("@/lib/rss/normalize");
      const rssArticles = await fetchAndNormalizeRssArticles();
      if (rssArticles.length > 0) {
        const editionDate = date ?? new Date().toISOString().slice(0, 10);
        const edition: DailyEdition = {
          ...MOCK_EDITION,
          editionDate,
          articles: rssArticles,
        };
        return { edition, source: "rss" };
      }
    } catch (e) {
      console.warn("[prana] RSS fetch failed, using mock:", e);
    }
  }

  const editionDate = date ?? MOCK_EDITION.editionDate;
  const edition: DailyEdition = {
    ...MOCK_EDITION,
    editionDate,
  };
  return { edition, source: "mock" };
}
