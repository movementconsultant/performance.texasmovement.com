# Launch Blockers — Texas Movement Performance

Things that must happen — and who needs to approve them — before this
property can move past "private preview shell" toward a real launch.

## Launch Gate

Every item below, as an explicit checklist, current honest status.

- [ ] Owner and identity confirmation for this vertical.
- [ ] Repository/domain/hosting approval (Cloudflare connection, DNS).
- [ ] Public copy approval — everything beyond the one approved blurb
      sentence needs a real review pass before it ships.
- [ ] Legal/privacy review appropriate to this vertical. **This vertical
      needs a heavier review than a generic policy stub**: the legacy
      `index.html` preserved in `legacy/` (see `docs/MIGRATION_INVENTORY.md`)
      contains specific training/performance/biomechanics methodology
      claims and an explicit "this is not medical advice" disclaimer —
      i.e. real performance-and-medical-adjacency claims that would need
      legal/compliance sign-off before any of that language (or anything
      like it) could ever ship again, on this property or reused
      elsewhere. Nothing from that legacy copy was carried into this
      shell's homepage, which is capped at the one approved blurb
      sentence — but the underlying business (training/coaching/course
      sales) clearly intends to make performance and training claims once
      it does launch, and that needs its own dedicated review track, not
      just a standard privacy/terms pass.
- [ ] Verified public destination, if a CTA will ever exist. (None exists
      in this build — no CTA was shipped; see "CTA state" below.)
- [ ] Verified inbox/form/payment route, if applicable. (The legacy site
      used `Performance@TexasMovement.com` as a live `mailto:` — not
      carried forward; not verified for this build.)
- [ ] Verified social URLs, if any will be used. (The legacy site linked
      LinkedIn, YouTube, and Udemy — none carried forward; none verified.)
- [ ] Analytics/consent approval, if any data will be collected. (None is
      collected by this build — no analytics script of any kind ships.)
- [ ] Explicit owner approval for production deployment.

## Additional detail

### 1. No CTA shipped

**Decision:** this build ships no CTA at all — not even an inert
"coming-soon" badge. The brief for this build explicitly allows omitting
the CTA entirely as "always a safe, compliant choice," and given how much
unverified contact/course/coaching infrastructure exists in the legacy
site (see below), the safest choice for a preview shell is to make no
CTA-shaped promise whatsoever. The "Building" lifecycle statement is the
only status-shaped element on the page, and it is a plain status badge
(no `href`, no click target), not a call to action.

### 2. No contact route

No email address or `mailto:` link exists anywhere in this build. The
legacy site's `Performance@TexasMovement.com` inbox was not verified for
this build and was not carried forward. Blocker: a confirmed inbox,
supplied and approved by the owner, before any contact route is added.

### 3. No social links

No confirmed handle exists for this build. The legacy site linked LinkedIn,
YouTube, and a Udemy course — none of those were verified for this build
and none were carried forward. Blocker: confirmed handles/URLs, supplied
and approved by the owner, before any link is added.

### 4. Site is not indexable

`PUBLIC_PREVIEW` defaults to `true`. The site currently ships
`noindex, nofollow`, an empty sitemap, a `robots.txt` that disallows all
crawling, and no canonical link to the production domain. Blocker: an
explicit decision from the owner to set `PUBLIC_PREVIEW=false` — this is a
launch decision, not a technical one.

### 5. No deploy has happened

This repo has never been deployed. `wrangler.toml` declares the Cloudflare
Pages project shape only. Blocker: the owner (or someone they designate)
connects the Cloudflare Pages project and triggers a deploy — out of scope
for this build per the stated hard boundaries.

### 6. Legal/privacy/accessibility pages are honest stubs, not real policy

`/privacy`, `/terms`, and `/accessibility` all render "content pending"
placeholders. No real policy text exists yet for this property. Blocker:
real legal review and drafted policy text before production launch.

### 7. Structured data intentionally omitted

This build ships **no** schema.org JSON-LD at all (see
`docs/SITE_ARCHITECTURE.md`). The legacy site emitted `Organization`,
`WebSite`, and `BreadcrumbList` JSON-LD including a `founder` node, a
`parentOrganization` node, and a `sameAs` list of external URLs — none of
that was carried forward. Blocker: an explicit decision from the owner on
what structured data (if any) this property should emit, once real,
verified facts exist to populate it.

### 8. This is a preview shell, not the full site

Only `/`, `/404`, `/accessibility`, `/privacy`, and `/terms` exist. No
course/coaching/team-consulting pages, no methodology content. Blocker:
scope, copy, and structure for the full site, to be defined in a future
pass once the owner has approved a real content and claims strategy.
