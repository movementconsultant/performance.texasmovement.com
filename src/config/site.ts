/**
 * Self-contained site configuration for performance.texasmovement.com.
 *
 * This is intentionally NOT a vendored copy of the shared `@tmi/constants`
 * package used by the full texasmovement.com-family builds. That package
 * carries the full multi-property registry (nav, routing, inbox/social
 * verification, org-wide JSON-LD) meant for sites that actually need
 * cross-property navigation and footer plumbing. This is a minimal,
 * non-interactive preview shell with none of that — one page, one honest
 * status statement, no links to sibling properties. A small local config
 * is enough, and it avoids vendoring anything out of scope for a
 * single-page shell (same reasoning the alexandermathai.com shell used for
 * not vendoring the package).
 *
 * Keep this file small. Anything that isn't plain, already-approved fact
 * does not belong here.
 */

/** Canonical production URL. Never changes based on preview state. */
export const SITE_URL = "https://performance.texasmovement.com";

export const SITE = {
  /** The property's real name — do not shorten or rebrand. */
  name: "Texas Movement Performance",
  title: "Texas Movement Performance",
  /**
   * The one approved blurb sentence. Verbatim — do not paraphrase, expand,
   * or add any claim beyond this sentence anywhere in public copy.
   */
  blurb: "Training, movement, athletic development, and performance systems.",
  description:
    "Texas Movement Performance is being built. Training, movement, athletic development, and performance systems.",
  locale: "en-US",
} as const;

/** Lifecycle badge for this property. See docs/PROJECT_BRIEF.md. */
export const LIFECYCLE_BADGE = "Building" as const;

/**
 * The one approved, contextual mention of Texas Movement International —
 * plain proper noun and a live URL to the hub itself only. Do not extend
 * this object, and do not add a mention of, or link to, any OTHER Texas
 * Movement vertical from this page.
 */
export const TMI = {
  name: "Texas Movement International",
  url: "https://texasmovement.com",
} as const;

/**
 * Preview / noindex convention.
 *
 * Any value other than the literal string "false" for PUBLIC_PREVIEW is
 * treated as preview mode. This defaults to preview mode when the env var
 * is unset, per the launch checklist in docs/LAUNCH_BLOCKERS.md.
 */
export const IS_PREVIEW: boolean = import.meta.env?.PUBLIC_PREVIEW !== "false";

/** Build an absolute canonical URL for a given site-relative path. */
export function canonicalUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE_URL).toString();
}
