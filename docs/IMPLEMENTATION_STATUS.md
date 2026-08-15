# Implementation Status

Status as of the initial private-shell build (branch
`claude/private-shell-scaffold`).

## Done

- Branch created from `main` (`ac8b4f1`); `main` untouched.
- All prior repo content (`index.html`, `meta-tags.html`, `README.md`,
  `og-image.png`, `og-square.png`) preserved unedited in `legacy/` via
  `git mv`; `CNAME` preserved verbatim at the repo root and copied to
  `public/CNAME`. Full inventory in `docs/MIGRATION_INVENTORY.md`.
- Astro + TypeScript scaffold, `output: "static"`, `wrangler.toml` for
  Cloudflare Pages (no adapter).
- Self-contained `src/config/site.ts` — no vendoring of `@tmi/constants`.
- Homepage (`/`) with exactly the required content: property name, the
  approved blurb sentence verbatim, a "Building" lifecycle statement, and
  a plain-text/link mention of the Texas Movement ecosystem pointing only
  at `texasmovement.com`.
- No CTA shipped (see `docs/LAUNCH_BLOCKERS.md` for the reasoning).
- Routes: `/`, `/404`, `/accessibility`, `/privacy`, `/terms`,
  `/robots.txt`, `/sitemap.xml`.
- `PUBLIC_PREVIEW` convention wired through robots meta, `robots.txt`,
  `sitemap.xml`, canonical-link emission, and a visible preview banner.
  Defaults to preview mode.
- OG/Twitter metadata, canonical URL helper. **No JSON-LD of any kind** —
  see `docs/SITE_ARCHITECTURE.md`.
- Skip link, focus-visible states, semantic headings (one `<h1>` per
  page), responsive layout, no primary nav (sidesteps the shared design
  system's known no-mobile-menu gap rather than reproducing it).
- Postbuild content guard (`scripts/postbuild-guard.mjs`), wired as
  `postbuild`, covering the full required forbidden-content list.
- Unit tests for the guard's detection logic and the `site.ts` helpers
  (`tests/*.test.mjs`, run via `node --test`).
- axe-core a11y scan script (`scripts/a11y-scan.mjs`) against every built
  route, using the pre-installed Chromium (no `playwright install` run).
- All docs listed in the common brief.

## Checks run and results

| Check | Command | Result |
|---|---|---|
| Typecheck | `npx astro check` | 0 errors, 0 warnings, 0 hints |
| Build | `npm run build` (includes `postbuild` guard) | Success — 5 pages built (`/`, `/404`, `/accessibility`, `/privacy`, `/terms`) + `robots.txt` + `sitemap.xml`; postbuild guard: 0 violations, 9 files scanned, preview=true |
| Unit tests | `npm test` | 19/19 passed |
| Accessibility | `npm run test:a11y` | `/`, `/404`, `/accessibility`, `/privacy`, `/terms`: 0 axe-core violations each |
| Grep sweep | `grep -ril <term> dist/` for each of: `mailto:`, `@texasmovement.com`, `@alexandermathai.com`, `TBD`, `__TBD__`, `lexmathai` (case-insensitive), `docs.google.com/forms`, `<iframe`, `linkedin.com`, `instagram.com`, `tiktok.com` | 0 matches for every term |

## Not done (by design — see docs/LAUNCH_BLOCKERS.md)

- No CTA of any kind (not even inert — omitted entirely).
- No contact route, no social links.
- Not set to indexable (`PUBLIC_PREVIEW` stays default-on).
- No deploy has been triggered.
- No structured data (JSON-LD) emitted.
- No pages beyond the six routes above — this is a preview shell, not the
  full site.
- Real `/privacy`, `/terms`, `/accessibility` policy text — all three ship
  as honest "pending" stubs.

## Open questions / ambiguity encountered

- **Legacy content contained training/performance and medical-adjacency
  claims.** The prior live `index.html` (now in `legacy/`) makes specific
  methodology claims and includes a "this is not medical advice"
  disclaimer. None of it was carried into this shell's copy — the
  homepage is capped at the one approved blurb sentence. This is flagged,
  not resolved, in the Launch Gate section of `docs/LAUNCH_BLOCKERS.md` as
  needing a dedicated legal/performance-claims review before any future
  build for this property reintroduces that kind of language. This felt
  worth a stop-and-flag rather than a guess, per the common brief's
  instruction not to guess on anything medical/legal-adjacent.
- **Structured data scope.** The safety policy caps Organization/Person
  JSON-LD at the property's "own bare name." Rather than guess which
  specific fields count as "bare enough" (name only? name + url? name +
  url + logo?), this build omits schema.org markup entirely — a
  conservative reading that avoids the judgment call. Documented in
  `docs/SITE_ARCHITECTURE.md`; revisit with owner input if structured data
  is wanted before production launch.
- Everything else (CTA shape, ecosystem-mention scope, legacy folder name,
  package vendoring) is resolved per the explicit rules in the common
  brief and this repo's addendum, and documented in
  `docs/LAUNCH_BLOCKERS.md` and `CLAUDE.md`.
