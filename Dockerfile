FROM node:15 AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn --frozen-lockfile

FROM node:15 AS runner
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

EXPOSE 4000

CMD ["yarn", "start"]
