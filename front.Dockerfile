# Stage 0, buildando o frontend
FROM node:alpine3.10 as build-stage
WORKDIR /app
COPY ./front/package*.json /app/
RUN npm install
COPY ./front/ /app/
RUN npm run build
# Stage 1, nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf