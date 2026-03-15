# Prana — Daily Satirical Civic Newsletter (AP/TS)

Bilingual (English / Telugu) civic newsletter for Andhra Pradesh and Telangana. One daily edition, Pancha Bhootalu sections, no infinite scroll.

**Stack:** Next.js 14 (App Router), TypeScript, Tailwind, Lucide, Inter + Noto Sans Telugu.

---

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/newsletter-prana-ap-ts.git
cd newsletter-prana-ap-ts
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

- **RSS** (when `PRANA_USE_RSS=1`): Great Andhra, Gulte, OneIndia Telugu. Configure in `src/lib/rss/feeds.ts`. Keywords in `ELEMENT_KEYWORDS` assign articles to Prithvi / Jala / Agni / Vayu / Akasha; default is Vayu (governance).
- **Mock:** Default when RSS is off or fetch fails; see `src/data/mockData.json`.
- **Other sources** (AP GO, Telangana GOIR, YouTube) don’t expose RSS; add scrapers or APIs separately.

---

## Pushing to GitHub

1. **Create repo:** GitHub → New repository. Name: `newsletter-prana-ap-ts`. Don’t add README/license if you already have local files.
2. **Rename remote (if needed):**
   ```bash
   git remote rename origin old-origin   # only if you already had origin
   git remote add origin https://github.com/YOUR_USERNAME/newsletter-prana-ap-ts.git
   ```
3. **First push:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Prana AP/TS newsletter"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/newsletter-prana-ap-ts.git
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

## AI integration — next steps & research

**Possible use cases:** summarization, headline rewriting, section intros, Telugu↔English, moderation/flags, topic tagging.

### Free options to test (POC)

| Option | What | Limits / notes |
|--------|------|----------------|
| **OpenAI** | GPT-4o-mini / GPT-4o via API | Free tier: limited credits; pay-per-token after. |
| **Anthropic** | Claude via API | Free tier / trial; then usage-based. |
| **Google AI (Gemini)** | `generativelanguage.googleapis.com` | Free tier: Gemini 1.5 Flash / Pro; rate limits. |
| **Groq** | Llama / Mixtral via API | Free tier, very fast inference; rate limits. |
| **Ollama (local)** | Llama, Mistral, etc. on your machine | Fully free; no cloud; needs RAM/GPU. |
| **Hugging Face Inference API** | Many OSS models | Free tier; rate limits; good for experimentation. |
| **Vercel AI SDK** | `ai`, `@ai-sdk/openai`, `@ai-sdk/anthropic`, etc. | Free (SDK only); use with any of the above providers. |

**Suggested first POC:** Vercel AI SDK + one provider (e.g. OpenAI free tier or Groq) to add a single feature (e.g. "summarize this section" or "rewrite headline") in an API route; no UI change required to validate.

### What to research (for use in other AI/LLMs outside Cursor)

1. **Prompt design for Telugu + English** — Few-shot examples, language tags, and handling mixed script in prompts; benchmark quality across OpenAI, Claude, Gemini, Groq.
2. **Structured output** — Using JSON mode / tool use / function calling so the model returns section labels, summaries, or tags in a fixed schema for `edition.ts`.
3. **Cost vs. quality** — Compare GPT-4o-mini, Claude Haiku, Gemini Flash, Groq Llama for "summarize N articles" per edition; track tokens and latency.
4. **Caching and idempotency** — Cache LLM responses keyed by article URL + prompt version so the same article isn't re-summarized on every request.
5. **Moderation and safety** — Using free moderation APIs (e.g. OpenAI Moderation) or model-based checks before publishing AI-generated intros/headlines.
6. **Local vs. cloud** — When Ollama (or similar) is enough for tagging/summarization vs. when to use hosted APIs for better Telugu or safety.
7. **RAG over past editions** — Storing embeddings (e.g. Supabase pgvector free tier, or local with Ollama embeddings) to ask "what did we say about X?" or to avoid repeating angles.

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
