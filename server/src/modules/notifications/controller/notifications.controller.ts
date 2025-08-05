import { FastifyReply, FastifyRequest } from "fastify";
import { notificationRepository } from "../repository/notification.repository";
import { createSuccessResponse } from "common/utils";

export const getNotificationsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const userId = request.user.id;

  if (!userId) {
    return reply.status(400).send({
      error: "Usuário não encontrado.",
    });
  }

  const notifications = await notificationRepository.findByUserId(userId);

  return createSuccessResponse(reply, notifications, 200);
};
