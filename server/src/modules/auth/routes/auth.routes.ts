import { FastifyInstance } from "fastify";
import { loginHandler, logoutHandler } from "../controller/auth.controller";
import { LoginResponse, LoginSchema } from "../schemas";

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: `/login`,
    schema: {
      description: "Logar usuário no sistema.",
      tags: ["Auth"],
      body: LoginSchema,
      response: {
        200: LoginResponse,
      },
    },
    handler: loginHandler,
  });

  fastify.route({
    method: "POST",
    url: `/logout`,
    schema: {
      description: "Deslogar usuário do sistema.",
      tags: ["Auth"],
      body: {},
      response: {
        200: {},
      },
    },
    preHandler: [fastify.authenticate],
    handler: logoutHandler,
  });
};
