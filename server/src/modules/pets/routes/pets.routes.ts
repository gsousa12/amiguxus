import { FastifyInstance } from "fastify";
import { createResponseSchema } from "common/utils";
import {
  CreatePetBodySchema,
  CreatePetResponseSchema,
  GetPetsQuerySchema,
  PetEntitySchema,
  UploadPetImageResponseSchema,
} from "../schemas";
import {
  createPetHandler,
  getPetsHandler,
  uploadPetImageHandler,
} from "../controller/pets.controller";
import { createResponsePaginedSchema } from "common/utils/create-response.schema";

export const petRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: `/create`,
    schema: {
      description: "Cria um novo pet no sistema.",
      tags: ["Pets"],
      body: CreatePetBodySchema,
      response: {
        201: createResponseSchema(CreatePetResponseSchema),
      },
    },
    preHandler: fastify.authenticate,
    handler: createPetHandler,
  });

  fastify.route({
    method: "GET",
    url: "/get-pets",
    schema: {
      description: "Retorna todos os pets do sistema de forma paginada.",
      tags: ["Pets"],
      querystring: GetPetsQuerySchema,
      response: {
        200: createResponsePaginedSchema(PetEntitySchema),
      },
    },
    handler: getPetsHandler,
  });

  fastify.route({
    method: "POST",
    url: "/upload-image",
    schema: {
      description: "Faz o upload de uma imagem de pet para o bucket.",
      tags: ["Pets"],
      consumes: ["multipart/form-data"], // Informa que a rota espera um multipart
      response: {
        200: UploadPetImageResponseSchema,
      },
    },
    preHandler: fastify.authenticate, // Mantém a rota protegida
    handler: uploadPetImageHandler, // 3. Aponta para o handler correto
  });
};
