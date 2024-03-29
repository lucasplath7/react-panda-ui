FROM node:16.13.1-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g cross-env
RUN npm install
COPY . ./
# ENV REACT_APP_API_URL https://www.react-panda.com:5001/api
RUN npm run build
# EXPOSE 80
# CMD ["npm", "start"]

# Stage - Production
FROM nginx:1.17-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
# COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]