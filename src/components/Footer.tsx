"use client";

import { useState } from "react";
import type { DailyEdition } from "@/types/edition";
import { useLanguage } from "@/contexts/LanguageContext";

interface FooterProps {
  edition: DailyEdition;
}

const FEEDBACK_LABELS = {
  en: { question: "Was this update useful?", yes: "Yes", no: "No", boring: "Too Boring" },
  te: {
    question: "ఈ అప్‌డేట్ ఉపయోగకరంగా ఉందా?",
    yes: "అవును",
    no: "కాదు",
    boring: "చాలా బోరింగ్",
  },
} as const;

export function Footer({ edition }: FooterProps) {
  const { lang } = useLanguage();
  const [feedback, setFeedback] = useState<"yes" | "no" | "boring" | null>(null);
  const labels = FEEDBACK_LABELS[lang];
  const nostalgia = edition.nostalgia[lang];
  const tiffinLabel = edition.tiffinBox.label[lang];

  return (
    <footer className="mt-16 space-y-10 border-t border-neutral-200 pt-10 dark:border-neutral-800">
      <section>
        <p className="text-fluid-sm font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          {lang === "en" ? "Nostalgia Corner" : "నాస్టాల్జియా కార్నర్"}
        </p>
        <p className="mt-2 text-fluid-base italic text-neutral-600 dark:text-neutral-400">
          {nostalgia}
        </p>
      </section>
      <section>
        <p className="text-fluid-sm font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          {lang === "en" ? "The Tiffin Box" : "ది టిఫిన్ బాక్స్"}
        </p>
        <a
          href={edition.tiffinBox.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-fluid-base font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900 dark:text-neutral-300 dark:decoration-neutral-600 dark:hover:decoration-white"
        >
          {tiffinLabel}
        </a>
      </section>
      <section>
        <p className="text-fluid-sm font-medium text-neutral-700 dark:text-neutral-300">
          {labels.question}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFeedback("yes")}
            className={`min-h-[44px] min-w-[44px] rounded-md border px-4 py-2 text-fluid-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:focus:ring-neutral-500 ${
              feedback === "yes"
                ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            }`}
          >
            {labels.yes}
          </button>
          <button
            type="button"
            onClick={() => setFeedback("no")}
            className={`min-h-[44px] min-w-[44px] rounded-md border px-4 py-2 text-fluid-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:focus:ring-neutral-500 ${
              feedback === "no"
                ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            }`}
          >
            {labels.no}
          </button>
          <button
            type="button"
            onClick={() => setFeedback("boring")}
            className={`min-h-[44px] min-w-[44px] rounded-md border px-4 py-2 text-fluid-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:focus:ring-neutral-500 ${
              feedback === "boring"
                ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900"
                : "border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
            }`}
          >
            {labels.boring}
          </button>
        </div>
      </section>
      <p className="text-fluid-sm text-neutral-500 dark:text-neutral-400">
        {edition.footerNote[lang]}
      </p>
    </footer>
  );
}
