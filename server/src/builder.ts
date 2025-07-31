import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import ajvErrors from "ajv-errors";
import fastify, { FastifyServerOptions } from "fastify";
import auth from "plugins/auth";
import errorHandler from "plugins/errorHandler";
import router from "plugins/router";
import swagger from "plugins/swagger";

export const fastifyAppConfiguration: FastifyServerOptions = {
  logger: false,
  ignoreTrailingSlash: true,
  ignoreDuplicateSlashes: true,
};

export const applicationBuilder = () => {
  const application = fastify({
    ...fastifyAppConfiguration,
    ajv: {
      customOptions: {
        allErrors: true, // Reporta todos os erros, não apenas o primeiro
        coerceTypes: true, // Ativa a coerção de tipos (ex: "5" -> 5)
        useDefaults: "empty", // Aplica padrões para propriedades ausentes ou nulas/vazias
      },
      plugins: [ajvErrors],
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  // --- Plugins --- //
  application.register(errorHandler);
  application.register(auth);
  application.register(swagger);
  application.register(router);

  application.get("/hearth", async (request, reply) => {
    return "check\n";
  });

  return application;
};
