import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";
import { userRoutes } from "modules/users/routes/users.routes";
import { authRoutes } from "modules/auth/routes/auth.routes";
import { petRoutes } from "modules/pets/routes/pets.routes";

const apiRoutePrefix: string = "/api";

const routerPlugin = async (application: FastifyInstance) => {
  application.register(userRoutes, { prefix: `${apiRoutePrefix}/users` });
  application.register(authRoutes, { prefix: `${apiRoutePrefix}/auth` });
  application.register(petRoutes, { prefix: `${apiRoutePrefix}/pets` });
};

export default fp(routerPlugin);
