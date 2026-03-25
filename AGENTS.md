# AGENTS.md — www.sdg.church

Instructions for AI agents and LLMs working on this codebase.

## Architecture

- **Framework:** Next.js (static export via `output: 'export'`)
- **Hosting:** GitHub Pages (deploy = commit `docs/` to `main`, push)
- **Styling:** SCSS modules (`src/styles/common.module.scss`)
- **Data:** JSON files in `data/` — loaded at build time (SSG)

## Build & Deploy

```bash
make build          # Clean build → outputs to docs/
make deploy         # Build + commit docs/ + push (deploys to GitHub Pages)
make dev            # Dev server on port 3000
make lint           # ESLint
make typecheck      # TypeScript check
```

## ⚠️ Critical Rules

### 1. Think before renaming slugs
- Renaming slugs breaks existing bookmarks and external links.
- Avoid renaming unless there's a strong reason. If you must rename, be aware of the impact.
- When the site has more SEO presence, we'll need a redirect system — for now, keep it simple.

### 2. Always build before deploying
```bash
make build    # Must succeed with 0 errors
```
- Check the route summary at the end of the build output.
- Verify the page count hasn't unexpectedly dropped.
- Spot-check a few URLs from the old site to confirm they still work.

### 3. Video data structure
- **Directory:** `data/videos/`
- **Naming:** `{person-slug}--{short-descriptor}.json` (double-dash separates person from content)
- **Auto-discovered:** The loader reads all `*.json` files (excluding files starting with `_`), sorted alphabetically. No index file to maintain.
- **Adding a video:** Drop a JSON file. Done.
- **Schema:**
  ```json
  {
    "id": "person-slug--descriptor",
    "videoId": "YouTubeVideoId",
    "title": "Display Title",
    "description": "Short description.",
    "tags": ["conversion", "faith"],
    "type": "testimony"
  }
  ```
- The `id` MUST match the filename (without `.json`).

### 4. Biography data structure
- **Directory:** `data/notable-christians/`
- **One file per person:** `{slug}.json`
- **Index:** `_index.json` organizes people into categories/subcategories via `$ref`
- **Videos in bios:** Use `videoId` field to enable YouTube thumbnail embeds and cross-linking to video detail pages.

### 5. Git workflow
- **Never commit directly to `main`** — use branches + PRs
- **Bot pushes:** Use `selah` remote (GitHub App token via `scripts/selah-push.sh`)
- **Deploy commits:** Only via `make deploy` on `main` after PR merge

## Data Conventions

### Person slugs
- Lowercase, hyphenated: `patrick-bet-david`, `rosaria-butterfield`
- Used as directory/filename prefix across `data/notable-christians/` and `data/videos/`

### Video tags
Common tags: `conversion`, `atheism`, `faith`, `deliverance`, `addiction`, `music`, `sports`, `hollywood`, `science`, `apologetics`, `preaching`, `academic`, `entrepreneurship`, `encouragement`

### Video types
- `testimony` — personal faith story or public declaration

## Testing Checklist (before deploy)

- [ ] `make build` succeeds
- [ ] Page count in build output matches expected (currently ~210)
- [ ] Spot-check `/testimonies` page — all video thumbnails load
- [ ] Spot-check at least 2 video detail pages
- [ ] Spot-check at least 2 biography pages with videos
- [ ] If slugs were renamed: verify old URLs redirect properly
- [ ] No broken images (YouTube thumbnail URLs use videoId — verify IDs are correct)
