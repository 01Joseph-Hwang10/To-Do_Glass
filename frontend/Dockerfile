FROM node:14.15.5-alpine3.10
USER root

RUN mkdir /frontend
WORKDIR /frontend
COPY . /front

RUN npm install
RUN npm run-script build