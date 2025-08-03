import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import ajvErrors from "ajv-errors";
import fastify, { FastifyServerOptions } from "fastify";

// --- Importe seus plugins ---
import auth from "plugins/auth";
import errorHandler from "plugins/errorHandler";
import router from "plugins/router";
import swagger from "plugins/swagger";
import corsPlugin from "plugins/cors"; // <-- 1. IMPORTE O NOVO PLUGIN

export const fastifyAppConfiguration: FastifyServerOptions = {
  logger: true,
  ignoreTrailingSlash: true,
  ignoreDuplicateSlashes: true,
};

export const applicationBuilder = async () => {
  const application = fastify({
    ...fastifyAppConfiguration,
    ajv: {
      customOptions: {
        allErrors: true,
        coerceTypes: true,
        useDefaults: "empty",
      },
      plugins: [ajvErrors],
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  // --- Plugins --- //
  // É uma boa prática registrar o CORS primeiro.
  application.register(corsPlugin); // <-- 2. REGISTRE O PLUGIN AQUI

  // Remova a configuração antiga daqui.
  // await application.register(cors, { ... }); // <-- 3. REMOVA ESTE BLOCO

  application.register(errorHandler);
  application.register(auth);
  application.register(swagger);
  application.register(router);

  application.get("/hearth", async (request, reply) => {
    return "check\n";
  });

  return application;
};
