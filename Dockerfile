# build container
FROM node:16.18-alpine

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

ARG db_url
ARG db_user
ARG db_password
ARG api_url

ENV DB_URL=$db_url
ENV DB_USER=$db_user
ENV DB_PASSWORD=$db_password
ENV API_URL=$api_url
ENV NODE_ENV=production
ENV HOST=0.0.0.0

RUN yarn build

#COPY ./server ./.nuxt/server

EXPOSE 3000

CMD ["yarn", "start"]
