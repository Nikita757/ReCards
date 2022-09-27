FROM node:18-alpine3.16

WORKDIR /usr/app
COPY package*.json ./
RUN npm install && npm install typescript -g
COPY . .
RUN tsc
CMD npm run start