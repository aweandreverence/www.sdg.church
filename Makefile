BUILD_DIR := docs

## help - Display help about make targets for this Makefile
help:
	@cat Makefile | grep '^## ' --color=never | cut -c4- | sed -e "`printf 's/ - /\t- /;'`" | column -s "`printf '\t'`" -t

## install - install dependency packages
install:
	npm install

## dev - starts the Next.js development server on port 3000
dev: install
	npm run dev

## run - alias for dev
run: dev

## clean - clean previous builds
clean:
	rm -rf $(BUILD_DIR)/ .next/

## build - build the app for release
build: clean install
	npm run build
	rm -rf $(BUILD_DIR)
	mv out $(BUILD_DIR)
	cp CNAME $(BUILD_DIR)/ || true
	touch $(BUILD_DIR)/.nojekyll

## deploy - build and deploy the app
deploy: build
	git add $(BUILD_DIR)
	git commit -m "Deploy `git rev-parse --short HEAD`" --no-verify
	git push origin HEAD

## lint - lint code
lint:
	npm run lint

## typecheck - run TypeScript type checking
typecheck:
	npm run typecheck

## format - format code with prettier
format:
	npx prettier --write .

## format-check - check code formatting
format-check:
	npx prettier --check .
