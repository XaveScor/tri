FROM node:16.15.1-alpine3.16
WORKDIR /app

COPY ./dist/package.json ./package.json
RUN npm install

COPY ./dist/bundle.js ./bundle.js

CMD ["node", "./bundle.js"]
