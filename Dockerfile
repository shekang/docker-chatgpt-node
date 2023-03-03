# specify the node base image with your desired version node:<version>
FROM node:18.14.2-alpine3.17
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
# RUN npm ci --only=production
# RUN npm run build
USER node
EXPOSE 3000
CMD ["node", "./dist/server/entry.mjs"]

