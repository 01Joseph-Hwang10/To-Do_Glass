FROM node:14.15.5-alpine3.10
USER root

RUN mkdir /frontend
WORKDIR /frontend
COPY . /frontend

ARG BACKEND_API
ENV BACKEND_API $BACKEND_API

RUN npm install
RUN npm run-script build