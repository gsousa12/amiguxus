import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { userRoutes } from "modules/users/routes/users.routes";

const apiRoutePrefix: string = "/api";

const routerPlugin = async (application: FastifyInstance) => {
  application.register(userRoutes, { prefix: `${apiRoutePrefix}/users` });

  console.log(`📍 Roteamento configurado com prefixo: ${apiRoutePrefix}`);
};

export default fp(routerPlugin);
