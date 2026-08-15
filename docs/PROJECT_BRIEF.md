# Project Brief

## What this is

A minimal, non-interactive, **preview-only** shell for **Texas Movement
Performance** (`performance.texasmovement.com`), one vertical in the
texasmovement.com family. It exists to establish the domain honestly — a
real page that says what this property is, states plainly that it is being
built, and makes zero claims beyond one approved sentence — while the real
site is developed separately and reviewed before it ever goes public.

This is **not** a launch. Nothing here is deployed, connected to a domain,
or indexable by default.

## Property

- **Name:** Texas Movement Performance
- **Domain:** `performance.texasmovement.com`
- **Lifecycle badge:** Building
- **Approved blurb (verbatim):** "Training, movement, athletic development,
  and performance systems."

## Objective

Give this vertical a real, honest placeholder — not a "coming soon" apology
page, and not a page that quietly repeats the training/performance claims
from the prior live site — while making zero claims that haven't been
explicitly approved.

## What's in scope for this build

- A single homepage: property name, the one approved blurb sentence, a
  "Building" lifecycle statement, and a plain factual mention of the wider
  Texas Movement ecosystem (linking only to the hub, `texasmovement.com`).
- A 404 page.
- An accessibility statement (honest stub, matching the family pattern).
- Honest `/privacy` and `/terms` stubs — no legal claims, no contact info.
- Preview/noindex convention (`PUBLIC_PREVIEW`), defaulted on.
- Cloudflare-Pages-ready static build.
- Baseline accessibility (skip link, focus-visible states, semantic
  headings, alt text) and a postbuild content guard.
- Preservation of all prior repo content (`legacy/`), documented in
  `docs/MIGRATION_INVENTORY.md`.

## What's explicitly out of scope for this build

- Any CTA, form, or submission behavior of any kind.
- Any social media links or icons.
- Any email address or `mailto:` link.
- Any training/performance/medical claim beyond the one approved sentence.
- Any Organization/Person structured data beyond the property's bare name
  (this build ships no JSON-LD at all).
- Additional pages beyond the routes above — those belong to the full site.
- Deployment, DNS, or making the site publicly indexable.

## Owner

Not yet confirmed for this build — see the Launch Gate checklist in
`docs/LAUNCH_BLOCKERS.md`. All brand-sensitive decisions (public copy
beyond the approved blurb, any CTA destination, social links, launch/index
state) require explicit owner approval before they can ship.
