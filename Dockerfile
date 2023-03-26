
# PRODUCTION DOCKERFILE
# ---------------------
# This Dockerfile allows to build a Docker image of the NestJS application
# and based on a NodeJS 16 image. The multi-stage mechanism allows to build
# the application in a "builder" stage and then create a lightweight production
# image containing the required dependencies and the JS build files.
#
# Dockerfile best practices
# https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
# Dockerized NodeJS best practices
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
# https://www.bretfisher.com/node-docker-good-defaults/
# http://goldbergyoni.com/checklist-best-practice-of-node-js-in-production/

FROM node:16 as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package.json package-lock.json ./
RUN npm install


COPY --chown=node:node . .
RUN npm run prebuild && npm run build


FROM node:16

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY package.json package-lock.json ./
RUN npm ci

COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

CMD ["node", "dist/server"]
