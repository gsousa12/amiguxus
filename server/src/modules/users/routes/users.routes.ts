import { FastifyInstance } from "fastify";
import {
  CreateUserBodySchema,
  CreateUserResponseSchema,
  GetUserInformationResponse,
} from "../schemas";
import { createResponseSchema } from "common/utils";
import {
  createUserHandler,
  getUserInformationHandler,
  ValidateUserHandler,
} from "../controller/users.controller";
import { Type } from "@sinclair/typebox";

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: `/create`,
    schema: {
      description: "Cria um novo usuário no sistema.",
      tags: ["Users"],
      body: CreateUserBodySchema,
      response: {
        201: createResponseSchema(CreateUserResponseSchema),
      },
    },
    handler: createUserHandler,
  });

  fastify.route({
    method: "GET",
    url: "/informations",
    schema: {
      description: "Retorna as informações do payload JWT do usuário logado.",
      tags: ["Users"],
      response: {
        200: createResponseSchema(GetUserInformationResponse),
      },
    },
    preHandler: [fastify.authenticate],
    handler: getUserInformationHandler,
  });

  fastify.route({
    method: "POST",
    url: "/validate",
    schema: {
      description: "Valida se o token JWT é válido.",
      tags: ["Users"],
      response: {
        200: Type.Boolean(),
      },
    },
    preHandler: [fastify.authenticate],
    handler: ValidateUserHandler,
  });
};
