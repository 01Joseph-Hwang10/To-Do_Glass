# Deployment CheckList

## 0. Deployment Turn: Blue

## 1. Port Scheme

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

### Green
#### docker-compose.yml
```
services:
  backend-green:
    command: gunicorn backend.wsgi -bind 0.0.0.0:8000
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

## 2. Django Settings
* Change `SECRET_KEY` variable in settings.py to `os.environ.get('DJANGO_SECRET_KEY')`

## 3. Nginx Settings

### Blue
#### webserver/nginx-proxy.conf
```
upstream api {
    server backend-blue:8000;
}
```

### Green
#### webserver/nginx-proxy.conf
```
upstream api {
    server backend-green:8000;
}
```

## 4.Redux Devtools Setting
* TURN IT OFF!!

## 5.EC2 Django permission
* Give all traffic the permission when deploying. You might got a need to change a port scheme for that
