FROM node:20-alpine

RUN apk add --no-cache openssl libc6-compat python3 make g++

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY .npmrc ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN npx prisma generate --schema=src/database/prisma/schema.prisma

RUN pnpm run build

RUN echo '{"compilerOptions":{"baseUrl":"./build","paths":{"common/*":["common/*"],"modules/*":["modules/*"],"plugins/*":["plugins/*"],"database/*":["database/*"],"background/*":["background/*"]}}}' > tsconfig.paths.json

EXPOSE 3333

CMD ["sh", "-c", "npx prisma migrate deploy --schema=src/database/prisma/schema.prisma && node -r tsconfig-paths/register build/server.js"]