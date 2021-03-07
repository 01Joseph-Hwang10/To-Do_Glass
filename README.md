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
    depends_on:
      - backend
      - frontend
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
      - "8081:8080"
    depends_on:
      - backend
      - frontend
```


## 2. Django Settings
* Change `SECRET_KEY` variable in settings.py to `os.environ.get('DJANGO_SECRET_KEY')`

## 3.Redux Devtools Setting
* TURN IT OFF!!

## 4.EC2 Django permission
* Give all traffic the permission when deploying. You might got a need to change a port scheme for that
