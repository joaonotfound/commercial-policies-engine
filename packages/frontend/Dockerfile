FROM node:19-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY . /app

RUN yarn

CMD ["yarn", "dev", "--hostname", "0.0.0.0"]