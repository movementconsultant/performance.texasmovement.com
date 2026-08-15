# Site Architecture

## Stack

- **Astro** (`output: "static"`) + TypeScript. No UI framework — the whole
  site is static markup with zero client-side JavaScript.
- **Cloudflare Pages** as the intended deploy target (`wrangler.toml`), no
  adapter required for a static build. This repo does not connect or
  deploy to Cloudflare itself.

## Routes

| Route | Source | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Homepage — name, blurb, "Building" status, ecosystem mention |
| `/404` | `src/pages/404.astro` | Not-found page |
| `/accessibility` | `src/pages/accessibility.astro` | Honest accessibility statement stub |
| `/privacy` | `src/pages/privacy.astro` | Honest "policy pending" stub, no legal claims |
| `/terms` | `src/pages/terms.astro` | Honest "policy pending" stub, no legal claims |
| `/robots.txt` | `src/pages/robots.txt.ts` | Reflects `PUBLIC_PREVIEW` |
| `/sitemap.xml` | `src/pages/sitemap.xml.ts` | Empty in preview mode |

## Directory layout

```
src/
  components/       Header, Footer, SkipLink — small, presentational
  config/site.ts     Self-contained site config (see below)
  layouts/BaseLayout.astro   <head> metadata, preview banner, no JSON-LD
  pages/             Routes (see table above)
  styles/global.css  The entire visual system, shared TMI design tokens
scripts/
  postbuild-guard.mjs  Content guard, wired as npm `postbuild`
  a11y-scan.mjs        axe-core scan over every built route
tests/               node:test unit tests for the guard and site config
legacy/              Preserved, unedited prior repo content
docs/                This document and its siblings
public/
  favicon.svg        Simple monogram, new asset (not migrated from legacy)
  CNAME              Copy of the repo-root CNAME, so a static build carries
                      the domain file into dist/ (matches the sibling
                      texasmovement.com-family repos' pattern)
```

## Configuration model

`src/config/site.ts` is the single source of truth for:

- `SITE` — name, title, the exact approved blurb sentence, description.
- `LIFECYCLE_BADGE` — `"Building"`.
- `TMI` — the one approved Texas Movement International mention (plain
  name + url only, pointing at the hub).
- `IS_PREVIEW` — derived from `PUBLIC_PREVIEW`, defaults to `true`.
- `canonicalUrl(path)` — absolute URL helper rooted at `SITE_URL`.

This file deliberately replaces what would otherwise be a vendored copy of
the shared `@tmi/constants` package. See `CLAUDE.md` for why that package
is not used here.

## Metadata & structured data

`BaseLayout.astro` owns all `<head>` output:

- Title/description, OG tags, Twitter `summary` card.
- `noindex, nofollow` robots meta when `IS_PREVIEW` is true; otherwise
  `index, follow` plus a canonical link.
- **No schema.org JSON-LD of any kind.** The safety policy for this build
  caps any Organization/Person structured data at the property's own bare
  name; rather than construct a minimal Organization node and have to make
  a judgment call about which fields count as "bare enough" (name only?
  name + url? logo?), this shell omits structured data entirely. Revisit
  once a real decision on entity data has owner approval — see
  `docs/LAUNCH_BLOCKERS.md`.

## Preview convention

`PUBLIC_PREVIEW` (a `PUBLIC_`-prefixed Astro/Vite env var, read via
`import.meta.env`) controls: robots meta, `robots.txt` body, `sitemap.xml`
contents, canonical link emission, and the visible preview banner. It
defaults to preview mode when unset. See `docs/LAUNCH_BLOCKERS.md`.

## Build-time enforcement

`scripts/postbuild-guard.mjs` runs automatically after `astro build` via
the `postbuild` npm script and scans every text file in `dist/` for the
forbidden content listed in `CLAUDE.md`. It exits non-zero (failing CI) on
any violation. Its checks are a superset of the required grep sweep (see
`docs/IMPLEMENTATION_STATUS.md` for the sweep results).
