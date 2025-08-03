import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import ajvErrors from "ajv-errors";
import fastify, { FastifyServerOptions } from "fastify";
import cookie from "@fastify/cookie";
import { environment } from "common/config/environment";
import multipart from "@fastify/multipart";
import auth from "plugins/auth";
import corsPlugin from "plugins/cors";
import errorHandler from "plugins/errorHandler";
import router from "plugins/router";
import swagger from "plugins/swagger";
import minioPlugin from "plugins/minio";

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

  application.register(multipart);

  application.register(corsPlugin);
  await application.register(cookie, {
    secret: environment.COOKIE_SECRET,
  });
  application.register(errorHandler);
  application.register(auth);
  application.register(minioPlugin); // Registre o plugin do MinIO aqui
  application.register(swagger);
  application.register(router);

  return application;
};
