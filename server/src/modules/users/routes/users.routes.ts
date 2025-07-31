import { FastifyInstance } from "fastify";
import { CreateUserBodySchema } from "../schemas";
import { CreateUserResponseSchema } from "../schemas/response.schemas";
import { createUserHandler } from "../controller/users.controller";
import { createResponseSchema } from "common/utils";

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
    // preHandler: [fastify.authenticate],
    handler: createUserHandler,
  });
};
