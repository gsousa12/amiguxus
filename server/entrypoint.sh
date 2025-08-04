#!/bin/sh

echo "🚀 Iniciando aplicação..."
echo "📦 Aplicando migrations do Prisma..."

# Aplicar migrations
npx prisma migrate deploy --schema=src/database/prisma/schema.prisma

if [ $? -eq 0 ]; then
    echo "✅ Migrations aplicadas com sucesso!"
else
    echo "❌ Erro ao aplicar migrations"
    exit 1
fi

echo "🏃 Iniciando servidor..."

# Iniciar a aplicação com tsconfig-paths configurado
exec node -r tsconfig-paths/register/transpile-only -r tsconfig-paths/register build/server.js