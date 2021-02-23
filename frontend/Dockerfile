FROM node:14.15.5-alpine3.10
USER root

RUN mkdir /frontend
WORKDIR /frontend
COPY . /frontend

RUN npm install --only=prod
RUN GENERATE_SOURCEMAP=false npm run-script build
