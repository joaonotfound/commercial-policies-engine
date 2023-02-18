FROM node:19-alpine

WORKDIR /app

RUN yarn install 

CMD yarn nuxt dev --hostname 0.0.0.0