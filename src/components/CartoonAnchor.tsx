"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

interface CartoonAnchorProps {
  url: string;
  altEn: string;
  altTe: string;
}

export function CartoonAnchor({ url, altEn, altTe }: CartoonAnchorProps) {
  const { lang } = useLanguage();
  const alt = lang === "te" ? altTe : altEn;
  return (
    <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
      <Image
        src={url}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="(max-width: 720px) 100vw, 720px"
        priority
      />
    </figure>
  );
}
