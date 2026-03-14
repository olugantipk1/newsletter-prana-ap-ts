# Prana — Daily Satirical Civic Newsletter (AP/TS)

Bilingual (English / Telugu) civic newsletter for Andhra Pradesh and Telangana. One daily edition, Pancha Bhootalu sections, no infinite scroll.

**Stack:** Next.js 14 (App Router), TypeScript, Tailwind, Lucide, Inter + Noto Sans Telugu.

---

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/prana-ap-ts-newsletter.git
cd prana-ap-ts-newsletter
npm install
```

**Env (optional):**

```bash
cp .env.example .env.local
# Edit .env.local:
# PRANA_USE_RSS=1   # Use live RSS feeds; omit or 0 for mock only
```

**Run:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the **refresh** button (header) to refetch the edition; the page is always server-rendered (no static cache).

---

## Data sources

- **RSS** (when `PRANA_USE_RSS=1`): Great Andhra, Gulte, M9, OneIndia Telugu. Configure in `src/lib/rss/feeds.ts`. Keywords in `ELEMENT_KEYWORDS` assign articles to Prithvi / Jala / Agni / Vayu / Akasha; default is Vayu (governance).
- **Mock:** Default when RSS is off or fetch fails; see `src/data/mockData.json`.
- **Other sources** (AP GO, Telangana GOIR, YouTube) don’t expose RSS; add scrapers or APIs separately.

---

## Repo name

- **Package/repo name:** `prana-ap-ts-newsletter` (in `package.json`).
- **Rename local folder** (optional, so it matches the repo):
  ```bash
  cd ..   # parent of project
  mv news prana-ap-ts-newsletter
  cd prana-ap-ts-newsletter
  ```
- **Rename on GitHub:** If the repo already exists with another name, go to repo → Settings → General → Repository name → set to `prana-ap-ts-newsletter` → Rename.

---

## Pushing to GitHub

1. **Create repo:** GitHub → New repository. Name: `prana-ap-ts-newsletter`. Don’t add README/license if you already have local files.
2. **Rename remote (if needed):**
   ```bash
   git remote rename origin old-origin   # only if you already had origin
   git remote add origin https://github.com/YOUR_USERNAME/prana-ap-ts-newsletter.git
   ```
3. **First push:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Prana AP/TS newsletter"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/prana-ap-ts-newsletter.git
   git push -u origin main
   ```
4. `.env.local` is gitignored; never commit secrets.

---

## Next steps (free / POC-friendly)

| Step | What | Free options |
|------|------|--------------|
| **Cache** | Avoid hitting RSS every request | In-memory TTL in `getEdition()`; or Vercel KV free tier |
| **DB** | Store editions / feedback | SQLite (file), Turso (free), Supabase (free tier) |
| **UI** | Date picker, “Today” badge | Client state + `getEdition({ date })`; no new deps |
| **PWA** | Installable, offline | `manifest.json` + service worker (e.g. next-pwa); static hosting |
| **GO / YouTube** | Official orders, Tiffin Box links | Scrapers or official APIs; no free RSS for AP GO / GOIR |

---

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint

## Key files

| Role | Path |
|------|------|
| Edition data | `src/lib/edition.ts` |
| Edition API | `src/app/api/edition/route.ts` |
| RSS config + keywords | `src/lib/rss/feeds.ts` |
| RSS fetch + normalize | `src/lib/rss/fetchFeeds.ts`, `normalize.ts` |
| Types | `src/types/edition.ts` |
| Mock data | `src/data/mockData.json` |
