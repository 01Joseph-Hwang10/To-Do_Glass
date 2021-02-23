# Green's Turn

- Port Scheme

-> Green

docker-compose.yml
===================
services:
  backend:
    command: gunicorn backend.wsgi -bind 0.0.0.0:8001
    ports:
      - "8001:8000"
  nginx:
    ports:
      - "8082:8080"
      - "8083:8081"
===================

variables.js
===================
export const URL_PROXY = `${window.location.origin}:8001`;
===================

-> Blue

docker-compose.yml
===================
services:
  backend:
    command: gunicorn -bind 0.0.0.0:8000
    ports:
      - "8000:8000"
  nginx:
    ports:
      - "8080:8080"
      - "8081:8081"
===================

variables.js
===================
export const URL_PROXY = `${window.location.origin}:8000`;
===================
