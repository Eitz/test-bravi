FROM node:10.8.0

RUN mkdir -p /apps/test-contacts/backend

RUN apt-get update -qq -o=Dpkg::Use-Pty=0 && apt-get install -qqy -o=Dpkg::Use-Pty=0 netcat
RUN npm i npm@latest -g

WORKDIR /apps/test-contacts/backend/

COPY package.json package-lock.json* ./
RUN npm install && npm cache clean --force
ENV PATH /apps/test-contacts/backend/node_modules/.bin:$PATH

COPY . /apps/test-contacts/backend/

CMD ["sh", "-c", "nodemon server.js"]