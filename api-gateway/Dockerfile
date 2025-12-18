FROM node:20-alpine3.22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8600

CMD [ "npm", "start" ]
