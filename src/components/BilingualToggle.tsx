"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function BilingualToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-1 rounded-md border border-neutral-300 bg-neutral-50 p-0.5 dark:border-neutral-600 dark:bg-neutral-900">
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`min-h-[44px] min-w-[44px] rounded px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:focus:ring-neutral-500 ${
          lang === "en"
            ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
            : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        }`}
        aria-pressed={lang === "en"}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang("te")}
        className={`min-h-[44px] min-w-[44px] rounded px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 dark:focus:ring-neutral-500 ${
          lang === "te"
            ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
            : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        }`}
        aria-pressed={lang === "te"}
        aria-label="Switch to Telugu"
      >
        తెలుగు
      </button>
    </div>
  );
}
