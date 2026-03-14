import type { DailyEdition } from "@/types/edition";
import { CartoonAnchor } from "@/components/CartoonAnchor";
import { NewsCard } from "@/components/NewsCard";
import { Footer } from "@/components/Footer";
import { getEdition } from "@/lib/edition";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatEditionDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function Home() {
  const { edition } = await getEdition();
  const formattedDate = formatEditionDate(edition.editionDate);

  return (
    <div className="space-y-8">
      <section>
        <CartoonAnchor
          url={edition.cartoon.url}
          altEn={edition.cartoon.alt_en}
          altTe={edition.cartoon.alt_te}
        />
      </section>

      <header className="space-y-1">
        <p className="text-fluid-sm font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
          {formattedDate}
        </p>
        <h2 className="text-fluid-2xl font-semibold text-neutral-900 dark:text-white">
          {edition.theme}
        </h2>
      </header>

      <section className="space-y-0">
        {edition.articles.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </section>

      <Footer edition={edition} />
    </div>
  );
}
