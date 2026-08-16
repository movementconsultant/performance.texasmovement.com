# CLAUDE.md — performance.texasmovement.com

Scope, safety rules, and working commands for this repository. Read this
before making changes.

## What this repo is

A minimal, **private/preview-only** shell for Texas Movement Performance —
one of the texasmovement.com-family verticals. It is deliberately small:
one homepage, a 404, an accessibility statement, and honest privacy/terms
stubs, plus the metadata/infra scaffolding to be Cloudflare-Pages-ready. It
is **not the full site** and it is **not live**. Nothing in this repo has
been deployed, connected to a domain, or approved for public indexing.

## Hard safety rules — never violate these

1. **No public output may contain an email address or `mailto:` link**, in
   any form, anywhere (visible text, JSON-LD, meta tags, comments).
2. **No forms of any kind.** No `<form>`, no `<input>`, no submit action, no
   external submission embed (Google Forms, Typeform, etc.), no `<iframe>`.
3. **No social links.** This shell carries zero social URLs — none are
   verified, and none should be invented or reused from any other Texas
   Movement property's registry.
4. **No literal `TBD` or `__TBD__`** in shipped copy. State the real status
   in plain language instead (e.g. "This is being built.").
5. **No fabricated legal/entity details, public address, or structured
   data** beyond the property's own bare name. This build ships **no
   schema.org JSON-LD at all** — see `src/layouts/BaseLayout.astro` for why.
6. **No unsafe training/performance/medical claims.** Public copy is capped
   at the one approved blurb sentence in `src/config/site.ts` — do not
   expand it, paraphrase it, or add any additional claim about training,
   biomechanics, recovery, or athletic outcomes anywhere on this site.
7. **No link, button, `tabindex`, or actionable destination pointing at any
   other Texas Movement property**, or anywhere else. The one exception is
   the plain-text/link mention of `texasmovement.com` itself (the hub),
   which the common brief explicitly allows.
8. **No reference to LexMathAI**, anywhere in this repo.
9. **Do not vendor the shared `@tmi/constants` package.** This is a
   single-page shell with no cross-property navigation — a small local
   `src/config/site.ts` is enough. See that file's header comment.

## What needs owner approval before any of this can go public

- Confirming this vertical's real owner/identity.
- Repository/domain/hosting approval — connecting Cloudflare Pages, DNS.
- Any public copy beyond the one approved blurb sentence — a real review
  pass, including a legal/performance-claims review given this vertical's
  subject matter (training, movement, athletic development).
- A verified public CTA destination, if one is ever added.
- A verified inbox/form/payment route, if one is ever added.
- Verified social URLs, if any are ever used.
- Analytics/consent tooling, if any data will ever be collected.
- Setting `PUBLIC_PREVIEW=false` / flipping the site to indexable.
- Any deploy, DNS change, package publish, or secret creation.

See `docs/LAUNCH_BLOCKERS.md` for the full Launch Gate checklist.

## Build & test commands

```bash
npm install
npm run dev          # local dev server
npm run build         # astro build; postbuild guard runs automatically
npm run check         # astro check (typecheck)
npm test              # unit tests (node:test)
npm run test:a11y     # axe-core scan against every built route
```

`npm run build` runs `scripts/postbuild-guard.mjs` automatically via the
`postbuild` npm lifecycle hook. It fails the build if `dist/` contains a
literal `TBD`/`__TBD__`, any `mailto:` link, any `<form>`/`<input>`, any
`<iframe>`, any known social domain, a `docs.google.com/forms` link, a
reference to `lexmathai`, or an HTML page missing the noindex meta tag while
`PUBLIC_PREVIEW` is not explicitly `"false"`.

## Preview / noindex convention

`PUBLIC_PREVIEW` defaults to preview mode (anything other than the literal
string `"false"` is treated as preview). In preview mode the site ships
`<meta name="robots" content="noindex, nofollow">` on every page, an empty
`sitemap.xml`, a `robots.txt` that disallows all crawling, and omits the
canonical link.

## Deploy target

Cloudflare Pages, static build (`output: "static"`, no adapter). See
`wrangler.toml`. This repo does not deploy itself — deployment is a
separate, explicitly-approved action, out of scope for this build.

## Legacy content

The prior static `index.html` (and its companion OG-kit files) that lived
at the repo root before this rebuild are preserved unedited in `legacy/`.
That legacy `index.html` contains training/performance claims and
medical-adjacent language that were **not** carried into this shell's copy
— see `docs/MIGRATION_INVENTORY.md` and the Launch Gate section of
`docs/LAUNCH_BLOCKERS.md` for why, and what review it would need before any
of it could ever be reused.
