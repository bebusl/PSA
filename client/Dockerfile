FROM node:14

WORKDIR /client

COPY package*.json ./

RUN npm i

COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]