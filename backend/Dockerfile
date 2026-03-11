FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build && find /usr/src/app/dist -name "main.js"

EXPOSE 4000

CMD ["node", "dist/main.js"]
