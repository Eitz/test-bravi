FROM node:10.8.0

RUN mkdir -p /apps/test-contacts/frontend

RUN apt-get -q update && apt-get -qy install nginx
RUN npm i npm@latest -g

COPY package.json package-lock.json /apps/test-contacts/frontend/

WORKDIR /apps/test-contacts/frontend
RUN npm install && npm cache clean --force
ENV PATH /apps/test-contacts/frontend/node_modules/.bin:$PATH

COPY . /apps/test-contacts/frontend
COPY ./config/nginx/test-contacts-docker.conf /etc/nginx/sites-enabled/test-contacts-docker.conf
RUN rm /etc/nginx/sites-enabled/default

RUN npm run build

CMD ["nginx", "-g", "daemon off;"]