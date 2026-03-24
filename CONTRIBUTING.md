# Contributing to www.sdg.church

Thank you for your interest in contributing to SDG Church — *Soli Deo Gloria*.

## Getting Started

```bash
make install   # Install dependencies
make dev       # Start dev server at http://localhost:3000
```

## Development Workflow

1. **Never commit directly to `main`** — use worktrees and feature branches
2. Create a worktree: `gwt-mk feat/my-feature` or `gwt-mk fix/my-bug`
3. Make your changes and verify the build passes: `make build`
4. Open a PR against `main`

## Build

**Always use `make build`** — never run `next build` or copy files manually.

`make build` handles:
- Cleaning previous output
- Installing dependencies
- Running the Next.js static export
- Moving output to `docs/`
- Preserving `CNAME` and `.nojekyll` for GitHub Pages

```bash
make build     # Build for production
make dev       # Development server
make lint      # Lint code
make typecheck # Type checking
make format    # Format with Prettier
```

## Adding Content

### Biographies

Edit `data/notable-christians.json`. Each person needs:
- `name`, `years`, `title`, `bio`, `faith` — biographical content
- `slug` — URL-safe identifier (must be unique)
- `tagline` — one-line summary for the card grid
- `image` — Wikimedia Commons URL (historical) or empty string (living/copyright)
- `videos` — array of `{title, url, platform, note?}`
- `sources` — array of `{type, title, url?, note?}`

The legend component and index page auto-generate from this data.

### Other Content

Edit `data/content.json` for testimonies, scripture passages, and gospel sections.

## Project Structure

```
├── data/                   # Static JSON content data
│   ├── content.json        # Testimonies, scripture, gospel sections
│   └── notable-christians.json  # Biographies data
├── public/                 # Static assets (CNAME, .nojekyll)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── biographies/    # Card grid index + [slug] detail pages
│   │   ├── gospel/         # Gospel presentation
│   │   ├── repentance/     # Call to repentance
│   │   ├── scripture/      # Scripture passages
│   │   ├── testimonies/    # Video testimonies
│   │   └── videos/         # Individual video pages
│   ├── components/         # React components
│   ├── constants/          # Nav links, config
│   ├── lib/                # Data loading, SEO utils
│   └── styles/             # SCSS modules
├── docs/                   # Built static output (GitHub Pages)
├── Makefile                # All build/dev/deploy commands
└── CNAME                   # Custom domain
```

## Style Guide

- **TypeScript** — strict mode, no `any`
- **SCSS Modules** — component-scoped styles in `src/styles/`
- **Semantic HTML** — accessible, meaningful markup
- **Design system** — dark theme with gold (`#c9a84c`) accents, Cormorant Garamond headings

## Theology

This is a Reformed Christian evangelism site. Content should be:
- Theologically grounded and biblically faithful
- Accessible but not shallow
- Reverent but not stuffy

See the [Catholic inclusion policy](https://github.com/aweandreverence/www.sdg.church/wiki) for biography curation guidelines.

## License

© Awe and Reverence
