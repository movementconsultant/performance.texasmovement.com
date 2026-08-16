# Migration Inventory — performance.texasmovement.com

Survey taken at the start of this rebuild, before any scaffolding was
touched.

## Branches at time of survey

| Branch | Head SHA | Notes |
|---|---|---|
| `main` | `ac8b4f1f59c13edfc76110b6494bc3d156469258` | Live production content. Static HTML + CNAME, no build tooling. Single commit, "Update contact email for performance inquiries". |
| `claude/private-shell-scaffold` | (this branch, created fresh from `main`) | This rebuild. |

No other branches existed at survey time.

## Every file in the repo at start of work (on `main`)

| Path | Purpose | Moved to |
|---|---|---|
| `CNAME` | GitHub Pages custom-domain file, content: `performance.texasmovement.com` | Preserved at repo root (unchanged) + copied to `public/CNAME` so the static build carries it into `dist/` |
| `README.md` | "OG kit" install notes for `og-image.png`/`og-square.png`/`meta-tags.html` | `legacy/README.md` |
| `index.html` | The live homepage — full multi-section page (hero, "who it's for", systems & methods, courses & coaching, ecosystem connections, FAQ, contact) | `legacy/index.html` |
| `meta-tags.html` | A head-tag snippet reference fragment (OG/Twitter meta) meant to be pasted into `<head>` | `legacy/meta-tags.html` |
| `og-image.png` | 1200×630 PNG, Open Graph / Twitter card image | `legacy/og-image.png` |
| `og-square.png` | 1200×1200 PNG, square variant for feed/profile use | `legacy/og-square.png` |

`git mv` was used for every move so file history is preserved. Nothing was
deleted.

## CNAME content

```
performance.texasmovement.com
```

Exact, verbatim, single line. Confirmed correct — no change needed.

## Content found in the legacy `index.html` — flagged, not carried forward

The legacy `index.html` is a full production marketing page containing
training/performance claims and medical-adjacent language, for example:

- Course/coaching/team-consulting offers ("Elite Secrets" course on Udemy,
  1:1 and small-group coaching, team-level consulting).
- Specific methodology claims ("biomechanics, tensegrity, and
  anatomy-informed progressions", "movement assessment", "recovery
  protocols").
- A direct medical-adjacency disclaimer: *"Is this medical advice? No.
  Training and recovery work here are educational and systems-focused.
  They do not replace medical diagnosis, treatment, or individualized
  medical advice."*
- A live `mailto:Performance@TexasMovement.com` contact link with a request
  not to send confidential medical information.
- `schema.org/Organization` JSON-LD with a `founder` node, a
  `parentOrganization` node, and a `sameAs` list of external social/course
  URLs (LinkedIn, YouTube, Udemy).
- Links to other Texas Movement properties in the footer nav (HERO,
  Consulting, Media, Distribution, Health, FounderLink, Social,
  Reparations) and external social/course URLs.

**None of this was carried into the new shell's copy.** The new
`src/pages/index.astro` uses only the one approved blurb sentence supplied
for this build ("Training, movement, athletic development, and performance
systems.") — a bare description of the vertical's subject area, not a
claim about methodology, outcomes, or medical safety. See the Launch Gate
section of `docs/LAUNCH_BLOCKERS.md`: this legacy copy needs a real
legal/performance-claims review before any of it could ever be reused, on
this property or anywhere else.

## What this rebuild did with the above

- The entire original file set (`index.html`, `meta-tags.html`,
  `README.md`, `og-image.png`, `og-square.png`) was moved, unedited, into
  `legacy/` at the repo root via `git mv` — nothing was deleted or edited.
- `CNAME` was preserved verbatim at the repo root (already correct) and
  also copied to `public/CNAME` so it ships in the static build output.
- No content, copy, imagery, or structured data from the legacy site was
  reused in the new shell beyond the domain name and the property's own
  real name, both of which were already independently supplied for this
  build.

## Rollback plan

`git checkout main` — `main` is untouched by this work. Delete the feature
branch (`claude/private-shell-scaffold`) if desired. Nothing in this
migration touches `main` or any live deploy, so rollback is a no-op unless
and until someone merges the PR.
