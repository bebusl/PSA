FROM node:14

WORKDIR /server

COPY package*.json ./

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]