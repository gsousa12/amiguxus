import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import fastifyCors from "@fastify/cors";

/**
 * Este plugin configura o Cross-Origin Resource Sharing (CORS) para a aplicação.
 * É essencial para permitir que o front-end (rodando em uma origem diferente)
 * se comunique com esta API.
 *
 * @see https://github.com/fastify/fastify-cors
 */
const corsPlugin: FastifyPluginAsync = async (fastify) => {
  const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

  fastify.log.info(`CORS configurado para permitir a origem: ${allowedOrigin}`);

  await fastify.register(fastifyCors, {
    origin: allowedOrigin,
    credentials: true,
  });
};

// Exporta o plugin envolvido com fastify-plugin
export default fp(corsPlugin, {
  name: "cors-setup",
  // --- A CORREÇÃO ESTÁ AQUI ---
  fastify: "5.x", // Mude de "4.x" para "5.x"
});
