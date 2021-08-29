FROM alpine as base

WORKDIR /usr/app

RUN apk add --update nodejs && apk add --update npm && apk add --update mongodb-tools

RUN npm i -g yarn

FROM base

WORKDIR /usr/app

COPY . .

RUN yarn install

RUN yarn build

CMD ["yarn", "start"]