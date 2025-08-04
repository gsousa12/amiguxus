# Etapa 1: build da aplicação
FROM node:20-alpine AS builder

# Dependências nativas (se precisar de build de pacotes)
RUN apk add --no-cache python3 make g++ git

# Instalar pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copiar manifestos e instalar deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar todo o código-fonte
COPY . .

# Receber a URL da API via build-arg e expor como ENV para o Vite ler
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Gerar build de produção (o Vite bakeia o VITE_API_URL no bundle)
RUN pnpm run build

# Etapa 2: servir estáticos com Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]