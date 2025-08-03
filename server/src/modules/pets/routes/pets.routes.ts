import { FastifyInstance } from "fastify";
import { createResponseSchema } from "common/utils";
import {
  CreatePetBodySchema,
  CreatePetResponseSchema,
  GetPetsQuerySchema,
  PetEntitySchema,
} from "../schemas";
import {
  createPetHandler,
  getPetsHandler,
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
    preHandler: fastify.authenticate,
    handler: getPetsHandler,
  });
};
