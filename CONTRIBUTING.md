# Contributing to sdg.church

> **New to content curation?** Start with the [Editorial & Theological Guidelines](EDITORIAL_GUIDELINES.md) — they cover who we feature and why.

## Quick Start

```bash
make install    # Install dependencies
make dev        # Start dev server at http://localhost:3000
```

## Adding a Testimony Video

1. Create `data/videos/{person}--{descriptor}.json`:
   ```json
   {
     "id": "{person}--{descriptor}",
     "videoId": "YouTubeVideoId",
     "title": "Person Name — Video Title",
     "description": "Brief description of the video.",
     "tags": ["conversion", "faith"],
     "type": "testimony"
   }
   ```
2. That's it. The video will appear on `/testimonies` and get its own page at `/videos/{person}--{descriptor}`.

### Finding the YouTube Video ID
- Full URL: `https://www.youtube.com/watch?v=VIDEO_ID` → `VIDEO_ID`
- Short URL: `https://youtu.be/VIDEO_ID` → `VIDEO_ID`
- Shorts: `https://www.youtube.com/shorts/VIDEO_ID` → `VIDEO_ID`

## Adding a Biography

1. Create `data/notable-christians/{slug}.json` with the person's info
2. Add a `$ref` entry in `data/notable-christians/_index.json` under the appropriate category/subcategory
3. To link videos: add `videoId` field to entries in the person's `videos` array

## Building & Deploying

```bash
make build      # Build static site to docs/
make deploy     # Build + commit + push (GitHub Pages)
```

### Pre-deploy checks
- Build must succeed
- Page count should match expected (~210+)
- Spot-check thumbnails on `/testimonies`
- Verify old URLs still work (redirects)

## Branch Workflow

1. Create a branch (or worktree): `git worktree add ~/.worktrees/www.sdg.church/feat/my-feature -b feat/my-feature main`
2. Make changes, commit
3. Push and open a PR against `main`
4. After merge: `make deploy` from `main`

## File Naming Conventions

| Directory | Pattern | Example |
|-----------|---------|---------|
| `data/videos/` | `{person}--{descriptor}.json` | `nabeel-qureshi--seeking-allah-finding-jesus.json` |
| `data/notable-christians/` | `{slug}.json` | `patrick-bet-david.json` |

- Double-dash `--` separates person from content descriptor
- Files starting with `_` are metadata, not content entries

## Editorial Standards

Before adding a biography or testimony, review the [Editorial & Theological Guidelines](EDITORIAL_GUIDELINES.md). Key points:

- **Inclusion requires evidence of saving faith** — not just cultural Christianity
- **Living figures need 2+ years** of sustained public profession
- **Denominational label alone** doesn't include or exclude anyone
- **Borderline cases** should be documented and escalated to the project lead

The editorial guidelines also cover the theological framework, denominational considerations, writing standards, and case studies.
