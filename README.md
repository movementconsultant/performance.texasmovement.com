# performance.texasmovement.com

A minimal, **private/preview-only** shell for Texas Movement Performance.
This is not a public launch — see `CLAUDE.md` for the full safety scope and
`docs/LAUNCH_BLOCKERS.md` for what has to happen before it can go live.

## Local setup

```bash
npm install
npm run dev
```

Visit the URL printed by `astro dev` (default `http://localhost:4321`).

## Structure

```
src/
  components/        Header, Footer, SkipLink — small, presentational
  config/site.ts      Self-contained site config (name, blurb, badge, TMI mention)
  layouts/BaseLayout.astro   <head> metadata, preview banner, no JSON-LD
  pages/               Routes — see docs/SITE_ARCHITECTURE.md
  styles/global.css    Shared Texas Movement design tokens (see docs/BRAND_SYSTEM.md)
scripts/
  postbuild-guard.mjs   Content guard, wired as npm `postbuild`
  a11y-scan.mjs         axe-core scan over every built route
tests/                node:test unit tests for the guard and site config
legacy/               Preserved, unedited prior repo content (see docs/MIGRATION_INVENTORY.md)
docs/                 Project docs — brief, architecture, launch blockers, migration inventory
```

## Build & test

```bash
npm run build     # astro build; postbuild-guard runs automatically after
npm run check      # astro check (typecheck)
npm test           # unit tests
npm run test:a11y  # axe-core accessibility scan against every built route
```

## Deploy assumptions

Static build (`output: "static"`), no adapter, targets Cloudflare Pages
(`wrangler.toml`, `pages_build_output_dir = "dist"`). This repo does not
connect a Cloudflare project, set DNS, or deploy anything itself — that is
a separate, explicitly-approved action.

`PUBLIC_PREVIEW` (build-time env var) defaults to preview mode: every page
ships `noindex, nofollow`, `robots.txt` disallows all crawling, and
`sitemap.xml` ships zero `<url>` entries. Nothing here is indexable until a
human explicitly sets `PUBLIC_PREVIEW=false` as a real launch decision.

## Rollback

`main` is untouched by this work — everything lives on
`claude/private-shell-scaffold` behind a draft PR. To roll back: don't merge
the PR, or close it. Nothing in this branch touches `main`, DNS, or any
live deploy.
