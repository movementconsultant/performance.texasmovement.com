import { test } from "node:test";
import assert from "node:assert/strict";
import { canonicalUrl, SITE_URL, SITE, TMI, LIFECYCLE_BADGE } from "../src/config/site.ts";

test("canonicalUrl builds an absolute URL rooted at SITE_URL", () => {
  assert.equal(canonicalUrl("/"), `${SITE_URL}/`);
  assert.equal(canonicalUrl("/privacy"), `${SITE_URL}/privacy`);
});

test("canonicalUrl normalizes a path missing its leading slash", () => {
  assert.equal(canonicalUrl("privacy"), `${SITE_URL}/privacy`);
});

test("TMI mention is a plain name + url pair only", () => {
  assert.deepEqual(Object.keys(TMI).sort(), ["name", "url"]);
  assert.equal(TMI.name, "Texas Movement International");
  assert.equal(TMI.url, "https://texasmovement.com");
});

test("blurb matches the exact approved sentence", () => {
  assert.equal(
    SITE.blurb,
    "Training, movement, athletic development, and performance systems.",
  );
});

test("lifecycle badge is Building", () => {
  assert.equal(LIFECYCLE_BADGE, "Building");
});

test("site name is the property's real name", () => {
  assert.equal(SITE.name, "Texas Movement Performance");
});
