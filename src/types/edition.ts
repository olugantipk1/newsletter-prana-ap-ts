export type PanchaBhoota = "Prithvi" | "Jala" | "Agni" | "Vayu" | "Akasha";

export interface Translation {
  headline: string;
  tldr: string[];
  source: string;
}

export interface NewsItem {
  id: string;
  element: PanchaBhoota;
  category: { en: string; te: string };
  tone: "Sarcastic" | "Serious" | "Witty";
  content: {
    en: Translation;
    te: Translation;
  };
  popCultureRef?: string;
  civicStat?: string;
}

export interface BilingualLabel {
  en: string;
  te: string;
}

export interface DailyEdition {
  editionDate: string;
  theme: string;
  cartoon: {
    url: string;
    alt_en: string;
    alt_te: string;
  };
  articles: NewsItem[];
  footerNote: BilingualLabel;
  nostalgia: BilingualLabel;
  tiffinBox: {
    label: BilingualLabel;
    url: string;
  };
}
