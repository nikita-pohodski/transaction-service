FROM node:20.10.0-alpine
WORKDIR /transaction

COPY . .
COPY .env.example .env

RUN npm cache clean --force
RUN npm install -g @nestjs/cli bcrypt ts-node rimraf

RUN yarn install
RUN yarn build

CMD ["yarn", "start:prod"]
