import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  preHandlerHookHandler,
} from "fastify";
import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { environment } from "common/config/environment";

export interface UserPayload {
  id: string;
  full_name: string;
  email: string;
}

declare module "fastify" {
  export interface FastifyInstance {
    authenticate: preHandlerHookHandler;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: UserPayload;
    user: UserPayload;
  }
}

const authPlugin = async (app: FastifyInstance) => {
  app.register(fastifyJwt, {
    secret: environment.JWT_SECRET,
    cookie: {
      cookieName: "token",
      signed: false,
    },
    sign: {
      expiresIn: "8h",
    },
  });

  app.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.status(401).send({
          error: "Você não possui autorização para realizar essa ação.",
        });
      }
    }
  );
};

export default fp(authPlugin, {
  name: "auth-plugin",
  dependencies: ["@fastify/cookie"],
});
