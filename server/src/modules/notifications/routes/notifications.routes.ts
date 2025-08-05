import { FastifyInstance } from "fastify";
import { getNotificationsHandler } from "../controller/notifications.controller";
import { NotificationEntitySchema } from "../schemas/entity.schemas";
import { Type } from "@sinclair/typebox";

export const notificationsRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "GET",
    url: "/get-notifications",
    schema: {
      description: "Busca todas as notificações de um usuário.",
      tags: ["Notifications"],
      response: {
        200: Type.Object({
          data: Type.Array(NotificationEntitySchema),
        }),
      },
    },
    preHandler: [fastify.authenticate],
    handler: getNotificationsHandler,
  });
};
