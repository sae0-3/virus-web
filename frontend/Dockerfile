FROM node:22-alpine AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install -g pnpm
RUN pnpm install


FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
# RUN yarn build

EXPOSE 3000
CMD [ "npm", "run", "dev" ]



# FROM nginx:1.25.5 AS prod
# EXPOSE 80 443
# RUN mkdir -p /etc/nginx/ssl
# COPY nginx/keys/nginx.crt /etc/nginx/ssl/nginx.crt
# COPY nginx/keys/nginx.key /etc/nginx/ssl/nginx.key

# COPY --from=builder /app/dist /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d

# CMD [ "nginx", "-g", "daemon off;" ]
