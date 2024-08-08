FROM node:22-alpine3.19

WORKDIR /app

COPY . .

EXPOSE 4321

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]