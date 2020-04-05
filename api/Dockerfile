FROM node:12.16.1
WORKDIR /api
COPY package.json /api
RUN npm install --silent
COPY . /api
EXPOSE 4000
CMD cd src/ && node server.js
