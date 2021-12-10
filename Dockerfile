FROM node:16.13.1-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g cross-env
RUN npm install
COPY . ./
EXPOSE 80
CMD ["npm", "start"]