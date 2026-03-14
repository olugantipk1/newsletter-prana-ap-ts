"use client";

import type { NewsItem } from "@/types/edition";
import { ElementIcon } from "./ElementIcon";
import { useLanguage } from "@/contexts/LanguageContext";

interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  const { lang } = useLanguage();
  const data = item.content[lang];
  const categoryLabel = item.category[lang];

  return (
    <article
      className="border-b border-neutral-100 py-6 last:border-0 dark:border-neutral-800"
      aria-labelledby={`headline-${item.id}`}
    >
      <div className="flex items-center gap-2">
        <ElementIcon
          element={item.element}
          className="h-4 w-4 text-neutral-500 dark:text-neutral-400"
        />
        <span className="text-fluid-sm font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          {categoryLabel}
        </span>
      </div>
      <h2
        id={`headline-${item.id}`}
        className="mt-2 text-fluid-xl font-semibold leading-tight text-neutral-900 dark:text-white"
      >
        {data.headline}
      </h2>
      <ul className="mt-4 space-y-2" role="list">
        {data.tldr.map((point, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-fluid-base text-neutral-600 dark:text-neutral-300"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-500" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      {item.civicStat && (
        <div className="mt-4">
          <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-fluid-sm font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
            {item.civicStat}
          </span>
        </div>
      )}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <a
          href={data.source}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fluid-sm font-medium text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900 dark:text-neutral-400 dark:decoration-neutral-600 dark:hover:decoration-white"
        >
          {lang === "en" ? "Read Original" : "అసలు వార్త చదవండి"}
        </a>
        {item.popCultureRef ? (
          <a
            href={item.popCultureRef}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fluid-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
          >
            {lang === "en" ? "Reaction clip" : "రియాక్షన్ క్లిప్"}
          </a>
        ) : (
          <div className="flex h-16 w-full max-w-[200px] items-center justify-center rounded border border-dashed border-neutral-300 bg-neutral-50 text-fluid-sm text-neutral-400 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-500">
            GIF placeholder
          </div>
        )}
      </div>
    </article>
  );
}
