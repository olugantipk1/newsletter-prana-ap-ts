"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function FontWrapper({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  return (
    <div
      className={lang === "te" ? "font-telugu" : "font-sans"}
      lang={lang}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
