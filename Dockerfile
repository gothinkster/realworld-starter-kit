FROM node:16.14.2-alpine3.14

ENV APP_HOME /app
WORKDIR $APP_HOME

COPY package.json .
RUN yarn install

COPY . ./

RUN chmod -R 777 entrypoint.sh
RUN chmod -R 777 entrypoint-prod.sh

RUN yarn clean
ENV PORT 3000
EXPOSE $PORT
