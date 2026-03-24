# CLAUDE.md — Claude Code / Codex Instructions

Read AGENTS.md first — it has the full project context.

## Quick Reference

```bash
make build     # THE build command — always use this
make dev       # Dev server
make lint      # Lint
make typecheck # Type check
```

## Rules

1. **`make build`** — never `npx next build` or manual file copying
2. **Feature branches** — never commit to `main` directly
3. **`docs/`** — generated output, never edit by hand
4. **Data-driven** — biographies come from `data/notable-christians.json`, not hardcoded JSX
5. **SCSS Modules** — styles go in `src/styles/`, not inline
6. **Dark theme** — background `#1a1a2e`, gold accents `#c9a84c`, Cormorant Garamond headings

## Common Tasks

### Add a biography
Edit `data/notable-christians.json` → add person to appropriate category/subcategory → `make build`

### Add a new page
Create `src/app/<route>/page.tsx` → add to `src/constants/nav_links.ts` → `make build`

### Fix styles
Edit `src/styles/common.module.scss` → `make dev` to preview → `make build`
