# www.sdg.church

[![Deploy GitHub Pages](https://github.com/aweandreverence/www.sdg.church/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/aweandreverence/www.sdg.church/actions/workflows/deploy-pages.yml)

https://www.sdg.church — *Soli Deo Gloria* — A gospel evangelism site with testimonies, Scripture, and the good news of Jesus Christ.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Bootstrap 5 + SCSS
- **Icons:** FontAwesome 6
- **Deployment:** Static export committed to `docs/`, deployed to GitHub Pages via GitHub Actions

## Installation

All commands are in the `Makefile`:

```bash
make help      # Show available commands
make install   # Install dependencies
make dev       # Run development server
make build     # Build for production (static export)
make lint      # Run ESLint
make typecheck # Run TypeScript type checking
```

## Project Structure

```
├── data/                   # Static JSON content data
│   └── content.json        # Testimonies, Scripture, gospel sections
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   ├── not-found.tsx   # 404 page
│   │   ├── gospel/         # The Gospel page
│   │   ├── testimonies/    # Testimonies listing
│   │   ├── scripture/      # Scripture passages
│   │   └── videos/[slug]/  # Individual video pages
│   ├── components/         # React components (TSX)
│   ├── constants/          # Configuration constants
│   ├── lib/                # Utilities, data loading, SEO
│   ├── styles/             # SCSS modules
│   └── types/              # TypeScript declarations
└── CNAME                   # GitHub Pages custom domain
```

## Content

Content is data-driven via `data/content.json`:
- **Testimonies** — YouTube video testimonies with tags
- **Scripture** — Bible passages organized by theme (sin, grace, gospel, repentance, salvation, new-life)
- **Gospel** — Structured gospel presentation sections

To add content, edit `data/content.json` and rebuild.

## Development

1. Run the dev server: `make dev`
2. Open http://localhost:3000
3. Before committing, verify the build: `make build`

## Deployment

The production site is a committed static export in `docs/`. Merging changes to `main` triggers the `Deploy GitHub Pages` workflow, which uploads `docs/` to GitHub Pages without checking out private submodules.

After this migration PR is merged, update the repository settings once: **Settings → Pages → Build and deployment → Source → GitHub Actions**, then verify the first workflow run succeeds and publishes https://www.sdg.church.

## License

© Awe and Reverence
