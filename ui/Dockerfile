FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
COPY ui/package.json ./ui/
COPY packages/ ./packages/

RUN npm install

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build --workspace=ui

FROM base AS runner
WORKDIR /app

COPY --from=builder --chown=nextjs:nodejs /app/ui/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/ui/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/ui/.next/static ./.next/static

EXPOSE 3001

ENV PORT=3001

CMD ["node", "server.js"]