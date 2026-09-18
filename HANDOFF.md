# itairaveh.com — handoff to Claude Code

Everything below reflects the repo as it actually stands, not the original
plan. If this doc and the code ever disagree later, trust the code, it's
the source of truth, this doc is a snapshot to get oriented fast.

## What this site is
Single-file site. `index.html` holds structure, styling, and all content
(no build step, no framework, no database). `images/` holds artwork,
organized by category then project slug.

## How it's structured

### Data
Near the top of the `<script>` block, one object: `CATS`. Four keys,
`illustration`, `brand`, `science`, `animation`. Each has:
- `items` — the main project grid for that category
- `editorial` — optional second array (illustration only, right now),
  rendered as a labeled second section below the main grid, "Editorial
  and publications"

Each project is one object:
```js
{t:'Title', type:'simple'|'gallery'|'case', c:'#hexcolor', g:'emoji',
 d:'optional one-line description',
 slug:'optional-explicit-slug',        // auto-generated from title if omitted
 images:[...],                          // gallery type only
 caseStudy:{ bg, intro, paragraphs?, media?, testimonial?, series? }}
```
- `simple` — card only, no click-through content yet
- `gallery` — click opens a popup with multiple images + text
- `case` — click opens a full page. Two shapes: a `series` array (the
  City Symbol pattern, one section per sub-collection with its own
  statement + image grid) or plain `paragraphs`/`media`/`testimonial`
  (the Eko/Island/Anthropomass/Sex pattern, simpler long-form page)

### Routing (URL = state, this was the whole point)
- `#/{category}` → grid
- `#/{category}?preview={slug}` → grid + popup preview open (cards link
  here, not straight to the full page)
- `#/{category}/{slug}` → full page (case type) or grid+popup (others)
- `#/{category}/{slug}/{symbol-slug}` → full page + lightbox open on
  one symbol (City Symbol only, since only that project has individually
  named sub-images)

Reloading any of the above lands directly there. Popup has an "Open full
project →" link to the canonical URL when the project is `case` type.

### Images
`images/{category}/{project-slug}/`. One folder per project, 41 exist
already (mostly empty, `.gitkeep` placeholders). City Symbol's folder
(`images/illustration/city-symbol/`) has all 45 real symbol images.

To add artwork to any project: drop files in its folder, then reference
them from that project's entry in `CATS` — `img:'images/{cat}/{slug}/file.webp'`
for a cover, or fill in the `images:` / `caseStudy.media:` arrays the
same way. Delete the `.gitkeep` once real files are in.

## Current content status

**Real, from Itai directly:**
- All 22 Illustration project titles + the 2 with real descriptions
  (Ein Qiniyye, Memento Mori) + Herzl's description
- All 14 Editorial and publications titles
- Eko engineering, Island.io, Anthropomass, Sex education book — real
  titles and real one-line descriptions, rendering as full case pages
- City Symbol — real 45 images, real series statements (Jerusalem
  confirmed from source; Tel Aviv/Haifa statements are Claude's guess in
  matching tone, need Itai's real text)
- Watertowers of israel, the eko streaming explainer — titles only

**Still placeholder, needs real material:**
- Every project's cover image/color is a placeholder swatch + emoji
  except City Symbol
- 40 of City Symbol's 45 individual symbol names are guessed, only
  YMCA, Kikar Hachatolot, Nachalat Shivaa, Keren Hayesod, Moment Café
  are confirmed from a screenshot
- City Symbol's city groupings (which 15 are Jerusalem/Tel Aviv/Haifa)
  are inferred from color (red/blue/green), unconfirmed
- No `caseStudy.paragraphs`/`media`/`testimonial` beyond the one-liner
  for Eko, Island, Anthropomass, Sex — real body text and images needed
- Brands and Science categories are thin (2 and 2 items), Itai
  mentioned each category holds 6–40 projects total, most aren't
  entered yet

## Homepage
Hero sentence, four category links, hover shows a scattered image
collage (two layers, some behind the text, some in front, each
category's own `scatter` array in `CATS`). Helvetica Neue regular,
dotted underline that takes the category's accent color on hover.
Illustration's scatter set was filled in with placeholder colors/emoji
and rotation; Brand/Science/Animation still use the original sparse
placeholder set from early prototyping, not yet redone to match.

## Known rough edges
- `FRAMED` detection (in the routing section) exists only to keep links
  working inside Claude's sandboxed file preview. Harmless on a real
  domain, safe to leave, safe to remove if it ever looks unnecessary.
- No image compression/optimization pipeline, City Symbol's images were
  manually cropped and converted to WebP by hand. Worth automating if
  more scanned-sheet imports happen.

## Suggested next steps, roughly in order
1. Confirm City Symbol's real symbol names and city groupings with Itai
2. Fill Brands and Science with the rest of the real project list
3. Get real cover images flowing in, even low-res placeholders beat
   emoji, then swap for final art
4. Write real `caseStudy` body content for Eko/Island/Anthropomass/Sex
5. Redo Brand/Science/Animation homepage scatter sets once real art exists
