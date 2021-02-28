# Deployment CheckList

## 0. Deployment Turn: Blue

## 1. Port Scheme

### Blue
#### docker-compose.yml
```
services:
  backend:
    command: gunicorn -bind 0.0.0.0:8000
    ports:
      - "8000:8000"
  nginx:
    ports:
      - "8080:8080"
      - "8081:8081"
    depends_on:
      - backend
      - frontend
```

#### variables.js
```
export const URL_PROXY = `${stripPort(window.location.origin)}:8000`;
```

### Green
#### docker-compose.yml
```
services:
  backend:
    command: gunicorn backend.wsgi -bind 0.0.0.0:8000
    ports:
      - "8001:8000"
  nginx:
    ports:
      - "8082:8080"
      - "8083:8081"
    depends_on:
      - backend
      - frontend
```

#### variables.js
```
export const URL_PROXY = `${stripPort(window.location.origin)}:8001`;
```

## 2. React JS Settings
* You need to implement Sentry. It's in index.js. Uncomment Sentry codeline
* You need to change `URL_PROXY` variable for the production build. Uncomment which is not a localhost and comment which is a localhost

## 3. Django Settings
* Change `SECRET_KEY` variable in settings.py to `os.environ.get('DJANGO_SECRET_KEY')`

## 4.Redux Devtools Setting
* TURN IT OFF!!

## 5.EC2 Django permission
* Give all traffic the permission when deploying. You might got a need to change a port scheme for that
