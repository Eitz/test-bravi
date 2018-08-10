FROM node:10.0.0

COPY package.json package-lock.json /apps/test-bravi/frontend/

WORKDIR /apps/test-bravi/frontend
RUN npm install

COPY . /apps/test-bravi/frontend

RUN npm run build