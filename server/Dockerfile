FROM node:14

WORKDIR /server

COPY package*.json ./

RUN npm i

COPY . .

ENV DOCKERIZE_VERSION v0.6.1
RUN apt-get update && apt-get -y install wget \
    && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 5000