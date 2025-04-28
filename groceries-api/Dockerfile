FROM node:20-alpine

# Install build dependencies for sqlite3 and healthcheck
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    wget

WORKDIR /app

# Copy only the necessary package files
COPY package.json package-lock.json ./
COPY groceries-api/package.json ./groceries-api/
COPY packages/ ./packages/

# Install dependencies
RUN npm install --force

# Copy only the groceries-groceries-api source code
COPY groceries-api/src/ ./groceries-api/src/
COPY groceries-api/db/ ./groceries-api/db/
COPY groceries-api/tsconfig.json ./groceries-api/
COPY groceries-api/nest-cli.json ./groceries-api/
COPY groceries-api/typeorm.config.ts ./groceries-api/

# Build the application
WORKDIR /app/groceries-api
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]
