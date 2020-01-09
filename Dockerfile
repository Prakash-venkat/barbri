FROM node:10.16-alpine as build

RUN apk add --no-cache git

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
#RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app
RUN npm run prod
RUN ls -l 

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]