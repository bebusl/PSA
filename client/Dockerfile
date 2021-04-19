FROM node:14.16.0

WORKDIR /client

COPY react-client/package*.json ./

RUN yarn

COPY ./react-client .

EXPOSE 3000

CMD ["yarn", "start"]