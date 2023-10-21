lint-frontend:
	make -C frontend lint

install:
	npm ci & make -C frontend install & make -C frontend build

start-frontend:
	make -C frontend start

start-backend:
	npm run start

# deploy:
# 	git push heroku main

start:
	make start-backend

build: 
	make -C frontend build
