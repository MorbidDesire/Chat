lint-frontend:
	make -C frontend lint

install:
	npm ci && make -C frontend build

start-frontend:
	make -C frontend start

start-backend:
	npm run start

start:
	make start-backend & make start-frontend

build: 
	make -C frontend build
