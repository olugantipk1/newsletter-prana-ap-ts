"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[prana] page error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-[720px] space-y-4 px-4 py-12 text-center">
      <h2 className="text-fluid-xl font-semibold text-neutral-900 dark:text-white">
        Something went wrong
      </h2>
      <p className="text-fluid-base text-neutral-600 dark:text-neutral-400">
        We couldn’t load today’s edition. Try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
      >
        Try again
      </button>
    </div>
  );
}
