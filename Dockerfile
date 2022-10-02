FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g pm2

COPY . .

EXPOSE 8080

CMD ["npm","run","dev-start"]