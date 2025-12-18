FROM node:20-alpine3.22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Create data directory structure if not exists
RUN mkdir -p data

EXPOSE 3002

CMD [ "npm", "start" ]
