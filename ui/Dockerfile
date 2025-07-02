FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
COPY ui/package.json ./ui/
COPY packages/ ./packages/

RUN npm install

FROM base AS builder
ARG NEXT_PUBLIC_BASE_PATH
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH}
WORKDIR /app/ui

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/ui/.next/standalone/. ./

COPY --from=builder /app/ui/public ./public
COPY --from=builder /app/ui/.next/static ./.next/static

EXPOSE 3001
ENV PORT=3001

CMD ["node", "ui/server.js"]