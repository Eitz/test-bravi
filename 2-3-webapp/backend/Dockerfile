FROM node:10.8.0

RUN mkdir -p /apps/test-bravi/backend

RUN apt-get -q update && apt-get -qy install netcat
RUN npm i npm@latest -g

WORKDIR /apps/test-bravi/backend/

COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force
ENV PATH /apps/test-bravi/backend/node_modules/.bin:$PATH

COPY . /apps/test-bravi/backend/

RUN chmod +x ./config/wait-for-it.sh

CMD ["sh", "-c", "./config/wait-for-it.sh mysql:3306 -- nodemon server.js"]