FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM base as builder
WORKDIR /app
COPY --from=base /app/tsconfig.json .
ENV NODE_ENV=production
RUN npm run build

FROM base AS dev
WORKDIR /app
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "start:dev"]

FROM node:18-alpine AS prod
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]

