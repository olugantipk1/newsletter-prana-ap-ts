/**
 * Telugu / AP–TS news and civic RSS feeds.
 * Add more from https://rss.feedspot.com/telugu_news_rss_feeds/
 * Direct portals (AP GO, Telangana GOIR) don’t expose RSS; use scrapers/APIs separately.
 */
export const RSS_FEEDS = [
  { url: "https://www.greatandhra.com/feed", label: "Great Andhra" },
  { url: "https://www.gulte.com/feed", label: "Gulte" },
  { url: "https://www.m9.news/feed", label: "M9 News" },
  { url: "https://telugu.oneindia.com/rss/feeds/oneindia-telugu-news.xml", label: "OneIndia Telugu" },
] as const;

/**
 * Element assignment order: first match wins. Put governance (Vayu) and civic terms
 * before entertainment (Akasha) so general/policy news doesn’t get tagged as cinema.
 * Akasha uses strict keywords (cinema/film industry/food) only.
 */
export const ELEMENT_KEYWORDS: [string, string[]][] = [
  ["Prithvi", ["road", "flyover", "infrastructure", "real estate", "farming", "land", "building", "highway", "metro", "construction", "వీధి", "రోడ్", "నిర్మాణం", "భవనం", "మెట్రో"]],
  ["Jala", ["water", "irrigation", "health", "hospital", "monsoon", "rain", "dam", "నీరు", "ఆరోగ్య", "ఆసుపత్రి", "ఇరిగేషన్", "వర్షం", "ఆనకట్టం"]],
  ["Agni", ["petrol", "diesel", "price", "economy", "tax", "startup", "energy", "ధర", "పెట్రోల్", "అర్థశాస్త్రం", "పన్ను", "స్టార్టప్", "శక్తి"]],
  ["Vayu", ["policy", "education", "job", "governance", "government", "GO", "order", "minister", "election", "party", "cm", "assembly", "పాలన", "విద్య", "ప్రభుత్వం", "మంత్రి", "ఎన్నికల", "పార్టీ", "విధానసభ", "ఆదేశం", "ఉత్తర్వు"]],
  ["Akasha", ["box office", "film industry", "movie release", "actor", "actress", "recipe", "cinema", "సినిమా", "చలనచిత్ర", "వంట", "నటుడు", "నటి", "బాక్స్ ఆఫీస్"]],
];
export type PanchaBhootaKey = (typeof ELEMENT_KEYWORDS)[number][0];
