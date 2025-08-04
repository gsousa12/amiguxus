# Não vamos otimizar nada, apenas fazer funcionar!
FROM node:20-alpine

# Instalar dependências do sistema para o Prisma
RUN apk add --no-cache openssl libc6-compat python3 make g++

# Instalar pnpm globalmente
RUN npm install -g pnpm

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./
COPY .npmrc ./

# Instalar TODAS as dependências (dev e prod)
RUN pnpm install --frozen-lockfile

# Copiar todo o código fonte
COPY . .

# Gerar o Prisma Client APÓS copiar o schema
RUN npx prisma generate --schema=src/database/prisma/schema.prisma

# Build da aplicação
RUN pnpm run build

# Criar arquivo de mapeamento de paths para o tsconfig-paths funcionar
RUN echo '{"compilerOptions":{"baseUrl":"./build","paths":{"common/*":["common/*"],"modules/*":["modules/*"],"plugins/*":["plugins/*"],"database/*":["database/*"],"background/*":["background/*"]}}}' > tsconfig.paths.json

# Expor a porta
EXPOSE 3333

CMD ["sh", "-c", "npx prisma migrate deploy --schema=src/database/prisma/schema.prisma && node -r tsconfig-paths/register build/server.js"]