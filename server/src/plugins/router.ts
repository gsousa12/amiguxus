import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { userRoutes } from "modules/users/routes/users.routes";
import { authRoutes } from "modules/auth/routes/auth.routes";

const apiRoutePrefix: string = "/api";

const routerPlugin = async (application: FastifyInstance) => {
  application.register(userRoutes, { prefix: `${apiRoutePrefix}/users` });
  application.register(authRoutes, { prefix: `${apiRoutePrefix}/auth` });
  console.log(`📍 Roteamento configurado com prefixo: ${apiRoutePrefix}`);
};

export default fp(routerPlugin);
