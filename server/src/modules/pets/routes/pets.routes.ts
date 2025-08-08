import { FastifyInstance } from "fastify";
import { createResponseSchema } from "common/utils";
import {
  AdoptionRequestBodySchema,
  AdoptionRequestResponseSchema,
  CreatePetBodySchema,
  CreatePetResponseSchema,
  GetMyPetsQuerySchema,
  GetPetsQuerySchema,
  PetEntitySchema,
  UploadPetImageResponseSchema,
} from "../schemas";
import {
  adoptionRequestHanlder,
  createPetHandler,
  getMyPetsHanlder,
  getPetsHandler,
  uploadPetImageHandler,
} from "../controller/pets.controller";
import { createResponsePaginedSchema } from "common/utils/create-response.schema";
import { Type } from "@sinclair/typebox";

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
      consumes: ["multipart/form-data"],
      response: {
        200: UploadPetImageResponseSchema,
      },
    },
    preHandler: fastify.authenticate,
    handler: uploadPetImageHandler,
  });

  fastify.route({
    method: "GET",
    url: "/get-my-pets",
    schema: {
      description: "Retorna todos os pets cadastrado pelo usuário logado.",
      tags: ["Pets"],
      querystring: GetMyPetsQuerySchema,
      response: {
        200: createResponsePaginedSchema(Type.Any()),
      },
    },
    preHandler: fastify.authenticate,
    handler: getMyPetsHanlder,
  });

  fastify.route({
    method: "POST",
    url: "/adoption-request",
    schema: {
      description: "Cria uma solicitação de adoção para um pet.",
      tags: ["Pets"],
      body: AdoptionRequestBodySchema,
      response: {
        200: Type.Object({
          data: AdoptionRequestResponseSchema,
        }),
      },
    },
    preHandler: fastify.authenticate,
    handler: adoptionRequestHanlder,
  });
};
