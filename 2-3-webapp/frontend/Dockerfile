FROM node:10.8.0

RUN mkdir -p /apps/test-bravi/frontend

RUN apt-get -q update && apt-get -qy install nginx
RUN npm i npm@latest -g

COPY package.json package-lock.json /apps/test-bravi/frontend/

WORKDIR /apps/test-bravi/frontend
RUN npm install && npm cache clean --force
ENV PATH /apps/test-bravi/frontend/node_modules/.bin:$PATH

COPY . /apps/test-bravi/frontend
COPY ./config/nginx/test-bravi-docker.conf /etc/nginx/sites-enabled/test-bravi-docker.conf
RUN rm /etc/nginx/sites-enabled/default

RUN npm run build

CMD ["nginx", "-g", "daemon off;"]