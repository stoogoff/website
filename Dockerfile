# build container
FROM node:16.18-alpine

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

ARG db_inbox=https://db.stoogoff.com/inbox
ARG db_website=https://db.stoogoff.com/stoogoff
ARG db_user
ARG db_password
ARG api_url=https://www.stoogoff.com
ARG cloudinary_cloudname

ENV DB_INBOX=$db_inbox
ENV DB_WEBSITE=$db_website
ENV DB_USER=$db_user
ENV DB_PASSWORD=$db_password
ENV API_URL=$api_url
ENV CLOUDINARY_CLOUDNAME=$cloudinary_cloudname
ENV NODE_ENV=production
ENV HOST=0.0.0.0

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
