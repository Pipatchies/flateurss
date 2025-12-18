FROM node:20-alpine3.22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Create data directory structure if not exists, though it should be a volume
RUN mkdir -p data

EXPOSE 3001

CMD [ "npm", "start" ]
