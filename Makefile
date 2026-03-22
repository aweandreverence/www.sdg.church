.PHONY: help install dev build clean lint typecheck

help:
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make dev        - Run development server"
	@echo "  make build      - Build for production (static export)"
	@echo "  make clean      - Remove build artifacts"
	@echo "  make lint       - Run ESLint"
	@echo "  make typecheck  - Run TypeScript type checking"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

clean:
	rm -rf .next out node_modules

lint:
	npm run lint

typecheck:
	npm run typecheck
