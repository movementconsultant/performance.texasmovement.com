# Mark-2 Vertical Audit — performance.texasmovement.com

Release-readiness audit performed as part of the ecosystem-wide release
sprint, cross-checked against the governance patterns established by the
texasmovement.com and alexandermathai.com hub audits.

## Repository and current branch

`movementconsultant/performance.texasmovement.com`, branch
`claude/private-shell-scaffold` (HEAD `d660035f022677b766bc68a02f60a6bc547b81b`),
open draft PR #1 into `main`. Worktree was clean at audit start and remains
clean (no code defects required a fix).

## Existing public hostname/domain if evidenced

`performance.texasmovement.com` does not currently resolve. A direct fetch
attempt during this audit returned `ENOTFOUND` (DNS resolution failure) —
no live content, deployed or otherwise, is reachable at this hostname
right now. This matches `docs/LAUNCH_BLOCKERS.md`'s own claim ("This repo
has never been deployed... `wrangler.toml` declares the Cloudflare Pages
project shape only"). `main` carries a `CNAME` file and a full legacy
`index.html` (evidence a GitHub Pages deployment existed at some point in
this property's history), but nothing resolves today, and this audit does
not touch `main` or any deploy/DNS surface regardless.

## Current build/deploy stack

Astro 7.2.2 (`output: "static"`) + TypeScript, zero client JS, intended
deploy target Cloudflare Pages via `wrangler.toml` (project-shape only, not
connected). No CI workflow exists in `.github/`.

## CI/build/test result (real command + real output)

All run fresh in this audit, from a clean `node_modules` already present:

- `npm run check` (astro check / typecheck): **0 errors, 0 warnings, 0 hints** (18 files).
- `npm test` (node:test unit tests): **19/19 passed**.
- `npm run build` (preview mode, `PUBLIC_PREVIEW` unset → default preview): 5 pages + `robots.txt` + `sitemap.xml` built; `postbuild` guard: **OK — 9 files scanned, 0 violations (preview=true)**.
- `PUBLIC_PREVIEW=false npm run build` (production-flag mode): same 5 pages built; `postbuild` guard: **OK — 9 files scanned, 0 violations (preview=false)**. Verified by hand: `robots.txt` flips to `Allow: /` + sitemap link, `sitemap.xml` populates with the 4 real routes, `index.html` flips to `<meta name="robots" content="index, follow">` plus a canonical link and `og:url`. Both modes are fully wired and both pass the guard, matching the hub repos' `PUBLIC_PREVIEW` pattern.
- `npm run test:a11y` (axe-core against every built route): **0 violations on all 5 routes** (`/`, `/404`, `/accessibility`, `/privacy`, `/terms`).

No lint script is defined in `package.json`; none was assumed.

## Real content/pages available

`/` (name, one approved blurb sentence, "Building" status badge, plain-text
mention of `texasmovement.com`), `/404`, `/accessibility` (honest stub),
`/privacy` (honest "pending" stub), `/terms` (honest "pending" stub),
`/robots.txt`, `/sitemap.xml`. No course/coaching/team-consulting content
ships — that is explicitly out of scope for this shell per
`docs/PROJECT_BRIEF.md`.

## Public claims and unsupported-content risks

None found. The homepage is capped at exactly the one approved blurb
sentence ("Training, movement, athletic development, and performance
systems.") plus a plain "This is being built. It is not yet open."
statement — verified verbatim in `src/config/site.ts` and covered by a
passing unit test (`blurb matches the exact approved sentence`). No
methodology, outcome, medical, or credential claims appear anywhere in the
built output. The much richer legacy `index.html` (course sales,
biomechanics/tensegrity methodology claims, a medical-adjacency
disclaimer) is preserved unedited in `legacy/` for history only — it is
outside `src/` and `public/`, is never referenced by any Astro page or
component, and does not appear in `dist/` after a real build (confirmed by
inspecting build output directly).

## Social/external links and verification state

Zero social links render anywhere in built output. The only external link
on the site is the plain-text mention of the TMI hub, `texasmovement.com`
(an already-live, already-audited property). `scripts/postbuild-guard.mjs`
enforces this at build time by scanning `dist/` for a hard-coded list of
social domains (twitter/x, facebook, instagram, linkedin, youtube,
tiktok, threads, pinterest, snapchat, reddit, bsky, mastodon) and failing
the build on any match — confirmed 0 matches in both build modes tested.

## Contact/commerce status

No contact route of any kind. No email address, no `mailto:` link, no
form, no `<input>`, no `<iframe>`, no third-party form embed anywhere in
built output — enforced by the same postbuild guard and confirmed by a
direct build run (0 violations). No commerce, pricing, or payment surface
exists.

## SEO/indexing behavior

Correct and verified in both modes. Preview mode (the current default,
`PUBLIC_PREVIEW` unset): `noindex, nofollow` on every HTML page, empty
`sitemap.xml`, `robots.txt` disallows all crawling, no canonical link
emitted. Production-flag mode (`PUBLIC_PREVIEW=false`, tested but not the
shipped default): `index, follow`, populated `sitemap.xml` (4 routes),
`robots.txt` allows crawling and points at the sitemap, canonical link and
`og:url` emitted. The site ships in preview mode by default per
`.env.example` and `docs/LAUNCH_BLOCKERS.md` — flipping the flag is
explicitly reserved as an owner launch decision, not touched here.

## Accessibility status

`npm run test:a11y` (axe-core via Playwright/Chromium) reports 0
violations across all 5 built routes. Skip link, single `<h1>` per page,
semantic headings, visible focus states, and no interactive control
requiring a mouse are all present per `docs/SITE_ARCHITECTURE.md` and
confirmed by the scan. `/accessibility` itself is an honest "statement
pending" stub, not a full conformance statement — flagged, not a defect.

## Ecosystem classification (Live / Route / Building / Reserve / Archive)

**Building.** Real repo and real work exist; nothing is deployed publicly
(hostname does not resolve); the site carries an honest "Building" status
badge, a single approved factual blurb, and no CTA of any kind, no
contact/commerce surface, and no deceptive external link. This matches the
expected classification stated in this audit's brief and is fully
supported by the evidence above — no change from the prior classification.

## Launch recommendation

Do not launch yet. The shell itself is release-safe as a non-indexed
preview and requires no code changes. Actual launch (flipping
`PUBLIC_PREVIEW=false`, connecting Cloudflare Pages/DNS, adding any
CTA/contact/social surface, or reusing any of the legacy training/coaching
copy) requires the full Launch Gate in `docs/LAUNCH_BLOCKERS.md`,
including a dedicated legal/performance-claims review given the legacy
content's medical-adjacent language.

## Required owner verification

- Confirm real owner/identity for this vertical.
- Approve Cloudflare Pages connection and DNS before any deploy.
- Review and approve any public copy beyond the one approved blurb
  sentence (with a dedicated legal/performance-claims pass, per
  `docs/LAUNCH_BLOCKERS.md` item 1).
- Supply and approve a verified contact inbox before any contact route
  ships (legacy `Performance@TexasMovement.com` was never verified for
  this build).
- Supply and approve verified social URLs before any are added (legacy
  LinkedIn/YouTube/Udemy links were never verified for this build).
- Explicit decision to set `PUBLIC_PREVIEW=false`.
- Explicit approval to deploy.

## Exact blockers

1. No verified owner/identity confirmation on record.
2. No Cloudflare Pages connection / DNS approval.
3. No legal/performance-claims review of the legacy training/coaching
   copy (needed before any of it is ever reused, on this property or
   elsewhere).
4. No verified contact inbox.
5. No verified social URLs.
6. `/privacy`, `/terms`, `/accessibility` are honest stubs, not real
   policy text.
7. No deploy has been triggered; site is unreachable at its own hostname.

None of the above are code defects — they are owner/business decisions
explicitly out of scope for this audit and this build.

## Safe next action

None required to keep this repo release-safe — it already passes every
check in both `PUBLIC_PREVIEW` modes with 0 violations, 0 a11y issues, and
0 unapproved claims. The safe next action is to leave this branch/PR as-is
(draft, unmerged, `main` untouched) until the owner clears the items in
"Required owner verification" above. This audit made no code changes.
