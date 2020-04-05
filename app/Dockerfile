FROM node:12.16.1
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . /app
EXPOSE 3000
CMD npm run start
