# Brand System

This shell reuses the shared Texas Movement design-system tokens (colors,
type, component language) documented in the ecosystem `DESIGN_SYSTEM.md`
brief, for visual consistency with the rest of the family — it does not
invent a new per-lane accent, and it does not vendor the full
`@tmi/constants` package (see `CLAUDE.md` for why).

## Tokens

Defined as CSS custom properties in `src/styles/global.css`, transcribed
verbatim from the shared token system:

| Token | Value | Use |
|---|---|---|
| `--paper` | `#e7e8e2` | Page background |
| `--panel` | `#ddded7` | Panel/section background |
| `--ink` | `#15181e` | Primary text, header background (dark elements) |
| `--ink-soft` | `#454a54` | Secondary text |
| `--line` / `--line-strong` | `#c4c6bd` / `#a6a99f` | Hairlines, borders |
| `--graphite` | `#111217` | Footer background |
| `--white` | `#f4f5f0` | Text on dark surfaces |
| `--compression` | `#274a78` | Blue accent — links/focus |
| `--tension` | `#bd3b22` | Rust accent — eyebrow ticks, status-badge dot |

`theme-color` meta = `#15181E` (== `--ink`), matching the ecosystem
convention.

## Type

- Body: `"IBM Plex Sans"`, 16.5px base, line-height 1.7.
- Headings: `"Space Grotesk"`, weight 600, letter-spacing -0.02em.
- Labels/eyebrows/badges: `"IBM Plex Mono"`, uppercase, tracked out.

This shell does not load the Google Fonts import used by the full
production sites — it falls back to system fonts (`sans-serif` /
`monospace` stacks named alongside the webfont names) so the build has no
external network dependency. Wiring the actual webfont `<link>` is a small,
safe addition once this shell is not preview-only.

## Components reused

- `.eyebrow` — uppercase mono label with a rust-colored tick.
- `.status-badge` — inert, dashed/bordered pill with a colored dot, used for
  the "Building" lifecycle statement. No `href`, no `<form>`, no click
  target — purely a status indicator, not a CTA.
- `a:focus-visible` — `outline: 2px solid var(--compression)`, kept exactly
  as documented as the one visible focus treatment in the current brand.

## Deliberate departures from the full production sites

- **No primary navigation.** The shared design system's known accessibility
  gap is `nav { display: none }` under 900px with no mobile replacement.
  Rather than build a mobile disclosure pattern for a single-page shell
  with nothing to navigate to, this build omits nav links entirely — the
  header shows only the property name. This sidesteps the gap rather than
  reproducing or patching it.
- **No hero imagery, cards, or multi-section layout.** This is a single,
  short status page, not a marketing site.
- **No JSON-LD.** See `CLAUDE.md` / `src/layouts/BaseLayout.astro`.
