FROM node:18.15-alpine3.17

WORKDIR /home/node/app

COPY . .

CMD [ "npm", "run", "dev", "--", "--host" ]
