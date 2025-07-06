install:
	npm ci

preinstall:
	npm ci

build: install
	npm run build

start:
	npx start-server -s ./frontend/dist