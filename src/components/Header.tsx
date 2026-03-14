"use client";

import { useRouter } from "next/navigation";
import { RotateCw } from "lucide-react";
import { BilingualToggle } from "./BilingualToggle";

export function Header() {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/95 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex max-w-[720px] items-center justify-between gap-3 px-4 py-3">
        <h1 className="text-fluid-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Prana
        </h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.refresh()}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-neutral-300 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-600 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            title="Refresh edition"
            aria-label="Refresh edition"
          >
            <RotateCw className="h-4 w-4" />
          </button>
          <BilingualToggle />
        </div>
      </div>
    </header>
  );
}
