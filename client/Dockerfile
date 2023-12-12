FROM node:alpine

WORKDIR /client

COPY package.json package.json

RUN yarn

COPY . .

ENTRYPOINT [ "yarn", "dev" ]