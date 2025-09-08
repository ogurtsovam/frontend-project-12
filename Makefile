lint-frontend:
	make -C frontend lint

install:
	cd frontend && npm ci

start-frontend:
	cd frontend && npm run start

start-backend:
	npx start-server -s ./frontend/dist

deploy:
	git push heroku main

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	cd frontend && npm ci && npm run build