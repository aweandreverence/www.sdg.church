# AGENTS.md — AI Agent Instructions for www.sdg.church

## Build

**Always use `make build`** — never run `next build`, `cp`, or `mv` manually.

```bash
make build     # Production build (cleans, builds, copies CNAME/.nojekyll)
make dev       # Development server
make lint      # Lint
make typecheck # Type check
```

`make build` is the single source of truth for producing `docs/`. It handles cleaning, building, and preserving GitHub Pages files (`CNAME`, `.nojekyll`).

## Git Workflow

- **Never commit directly to `main`** — always use feature branches
- **Use worktrees:** `gwt-mk feat/my-feature`, not `git checkout -b`
- **Bot pushes:** Use `selah` remote via `scripts/selah-push.sh`
- **After merge:** Clean up worktrees with `gwt-rm`

## Key Files

| File | Purpose |
|------|---------|
| `data/notable-christians.json` | All biography data (121+ people) |
| `data/content.json` | Testimonies, scripture, gospel sections |
| `src/lib/data.ts` | Data loading and type definitions |
| `src/app/biographies/page.tsx` | Biography index with legend + card grid |
| `src/app/biographies/[slug]/page.tsx` | Individual biography pages |
| `src/components/BiographyLegend.tsx` | Fields & Disciplines legend component |
| `src/styles/common.module.scss` | Main stylesheet (dark theme + gold) |
| `Makefile` | All build/dev/deploy commands |
| `docs/` | Built output — **never edit directly** |

## Content Changes

- **Biographies:** Edit `data/notable-christians.json` — index page and legend auto-generate
- **Other content:** Edit `data/content.json`
- After data changes: `make build`, commit both data file and `docs/`

## Deploy Pipeline

1. Make changes on feature branch
2. `make build` to verify
3. PR → review → merge to `main`
4. GitHub Pages auto-deploys from `docs/` on `main`

## Important

- `docs/` is the deploy target — always regenerate with `make build`, never hand-edit
- `public/CNAME` and `public/.nojekyll` ensure GitHub Pages works after builds
- The site is a static export (`output: 'export'`) — no server-side features
- Biographies legend component is data-driven — no hardcoded discipline lists
