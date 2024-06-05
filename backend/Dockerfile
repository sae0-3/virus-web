FROM node:22-alpine AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install -g pnpm
RUN pnpm install


FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .

EXPOSE 8080 8000 4000
CMD [ "npm", "run", "dev" ]
