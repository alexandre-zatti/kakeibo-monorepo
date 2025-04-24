FROM node:20-alpine

# Install build dependencies for sqlite3
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

WORKDIR /app

# Copy only the necessary package files
COPY package.json package-lock.json ./
COPY api/package.json ./api/
COPY packages/ ./packages/

# Install dependencies
RUN npm install --force

# Copy only the api source code
COPY api/src/ ./api/src/
COPY api/tsconfig.json ./api/
COPY api/nest-cli.json ./api/
COPY api/typeorm.config.ts ./api/

# Build the application
WORKDIR /app/api
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "run", "start:prod"]