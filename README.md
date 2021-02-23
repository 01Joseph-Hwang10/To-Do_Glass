# Deployment CheckList

## 1. Port Scheme*(Blue's Turn)*

### Green
#### docker-compose.yml
```
services:
  backend-green:
    command: gunicorn backend.wsgi -bind 0.0.0.0:8001
    ports:
      - "8001:8000"
  frontend-green:
  nginx-green:
    ports:
      - "8082:8080"
      - "8083:8081"
    depends_on:
      - backend-green
      - frontend-green
```

#### variables.js
```
export const URL_PROXY = `${stripPort(window.location.origin)}:8001`;
```

### Blue
#### docker-compose.yml
```
services:
  backend-blue:
    command: gunicorn -bind 0.0.0.0:8000
    ports:
      - "8000:8000"
  frontend-blue:
  nginx-blue:
    ports:
      - "8080:8080"
      - "8081:8081"
    depends_on:
      - backend-blue
      - frontend-blue
```

#### variables.js
```
export const URL_PROXY = `${stripPort(window.location.origin)}:8000`;
```

## 2. React JS Settings
* You need to implement Sentry. It's in index.js. Uncomment Sentry codeline
* You need to change `URL_PROXY` variable for the production build. Uncomment which is not a localhost and comment which is a localhost

## 3. Django Settings
* Change `SECRET_KEY` variable in settings.py to `os.environ.get('DJANGO_SECRET_KEY')`

