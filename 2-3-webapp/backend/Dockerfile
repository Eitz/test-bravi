FROM node:10.0.0

COPY package.json package-lock.json /apps/test-bravi/backend/

WORKDIR /apps/test-bravi/backend
RUN npm install

COPY . /apps/test-bravi/backend

CMD ["npm", "start"]