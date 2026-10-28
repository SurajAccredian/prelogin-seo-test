@AGENTS.md

# Accredian Pre-login Site

Public marketing site for Accredian (accredian.com): executive programs from IIMs/IITs, free courses, mentor/career pages. Next.js 16 App Router, React 19, mostly JavaScript (`.jsx`) with a few TypeScript files (`next.config.ts`, `middleware.ts`, `app/sitemap.ts`, `app/robots.ts`). `strict` is off in `tsconfig.json`.

**Next.js 16 is newer than your training data.** Before touching routing, caching, metadata, `middleware`, `revalidateTag`, `params`/`searchParams`, or `next/image`, read the matching guide in `node_modules/next/dist/docs/` (run `npm install` first if `node_modules` is missing). Don't write from memory.

## Commands

- `npm run dev` — dev server on :3000
- `npm run build` / `npm start` — production build and serve. Run `build` before calling a change done; there is no test suite.
- `npm run lint` — ESLint (`eslint-config-next`)
- `node syncPrograms.js && node syncNumbers.js` — regenerate `public/programs.json`, `public/numbers.json`, `public/category-numbers.json` from `app/components/Assets/programs*`. The husky pre-commit hook runs these and stages the output.
- `node syncLlms.js` — regenerate `public/llms.txt` and `public/llms-full.txt` from the program catalogue. The pre-commit hook runs it too.
- `node syncSitemaps.js` — regenerate `public/sitemap.xml` and `public/sitemaps/` from the programs dir.
- `node seo-smoke-test.mjs <base-url> [--sitemap]` — checks what non-JS crawlers (GPTBot, ClaudeBot) receive. Exits 1 on failure.
- `.npmrc` sets `legacy-peer-deps=true`; keep it.

## Layout

- `app/<route>/page.jsx` — thin route files: fetch data, set metadata, render a component from `app/components/`.
- `app/components/<Feature>/` — feature components, one folder per feature. Folder names are not consistent (`Home`, `MentorPage`, `Drawers`, ...); follow the existing folder for the area you edit.
- `app/components/Assets/` — **content as data**: `programs.json`, `programs/<slug>.json` (one per program, ~100), `verticals/`, `free-courses/`, `faq.js` (mentor and refer-and-earn FAQs), `records/`, `constants.js`. Editing content usually means editing JSON here, not JSX.
- `app/services/` — axios API layer (`server.js` is the shared instance with 401 token refresh; `*.service.js` per domain). Add endpoints here, not inline in components.
- `app/store/` — Redux Toolkit (`reducers/`) plus React Query (`QueryProvider`). `ReduxProvider`/`QueryProvider`/`AnalyticsProvider` are mounted in `app/layout.jsx`.
- `app/helpers/` — pure helpers and hooks (UTM, cookies, enrollment, program filtering). Check here before writing a new util.
- `app/api/revalidate/route.js` — on-demand revalidation for tag `program-status-<pid>`.
- `middleware.ts` — 308 redirects from legacy capitalised URLs to lowercase (`/Career` → `/career`, `/Successstories` → `/successstories`, `/Lost-password` → `/lost-password`, `/Reset-password` → `/reset-password`). All routes are now lowercase; URL casing matters.
- `public/` — static files, `llms.txt`, `llms-full.txt`, generated JSON and sitemaps.

## Conventions

- **Server Components by default.** Add `"use client"` only for state, effects, browser APIs, or event handlers, and push it to the smallest leaf component. Don't mark a whole page client-side.
- **SEO/GEO is a core requirement.** Page content must be in the server-rendered HTML (crawlers don't run JS). Don't load page content in client-side Redux/`useEffect` after mount, and don't add `loading.jsx` that hides real content. See `Accredian_Technical_SEO_and_GEO_Remediation_Plan.md`.
- Every indexable page needs `generateMetadata`/`metadata` with a self-referencing canonical, and JSON-LD where relevant (`Course`, `FAQPage`, `BreadcrumbList`). Unknown dynamic slugs must call `notFound()` (real 404, not a 200 soft 404).
- Fetch data on the server (RSC `fetch`, or read the local JSON) and use tags/`revalidate` for caching. Never trust a URL param for `<title>` or content without validating it against known data.
- Use `next/image` for images (remote hosts allowed in `next.config.ts`: `storage.googleapis.com`, `*.accredian.com`) and `next/font` for fonts. Use `next/link` for internal links.
- Env vars: only `NEXT_PUBLIC_*` are used, so they are all exposed to the browser. Never put real secrets in one. Read them via `process.env.NEXT_PUBLIC_X`; never commit `.env*` (gitignored).
- Styling: the codebase mixes Tailwind, MUI, Chakra, styled-components and per-feature `.css`. Use whatever the surrounding component already uses. Do not introduce another UI library or add a dependency without asking.
- Dependencies are pinned to exact versions. Keep them pinned.

## Working rules (Karpathy-style)

1. **Think before coding.** State assumptions. If a request is ambiguous, say so and ask; don't silently pick an interpretation. Read the existing code and the relevant Next.js doc first.
2. **Simplicity first.** Write the minimum code that solves the problem. No speculative abstractions, configurability, or error handling for impossible cases. If 50 lines would do, don't write 200.
3. **Surgical changes.** Touch only what the task requires. Match the surrounding style, even if you'd do it differently. Don't refactor, reformat, or rename adjacent code. Remove only the dead code your own change created, and mention other dead code instead of deleting it (e.g. `transitions copy.json`, `out.css`).
4. **Goal-driven execution.** Turn the task into a verifiable check (build passes, page returns expected HTML via `curl -A GPTBot`, `seo-smoke-test.mjs` passes), then loop until it does. Report what you actually ran and its result.
5. **Don't hand-edit generated files.** `public/programs.json`, `public/numbers.json`, `public/category-numbers.json`, `public/llms.txt`, `public/llms-full.txt`, `public/sitemap.xml` and `public/sitemaps/` are generated. Edit the source in `app/components/Assets/` and run the sync scripts.
