# itairaveh.com

Portfolio site. Plain HTML/CSS/JS, no build step.

## Structure
- `index.html` — entire site: homepage, category grids, project popups,
  case-study pages, all driven by the `CATS` data object near the top
  of the `<script>` block.
- `images/` — project artwork, one folder per project slug.

## Editing content
Every project is one entry in `CATS[category].items`. Add a project by
adding an entry, no layout work needed. See comments in the data block.

## Local preview
Open `index.html` directly in a browser, no server required.

## Deploy
Push to `main`, GitHub Pages serves it automatically (see repo Settings
→ Pages). `CNAME` file points it at itairaveh.com.
