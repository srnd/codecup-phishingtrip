FROM node:alpine

RUN mkdir /www
WORKDIR /www
COPY package.json /www
COPY yarn.lock /www
RUN yarn install

COPY . /www
CMD ["node", "src/app.js"]
