import { FastifyReply } from "fastify";

export const createSuccessResponse = (
  reply: FastifyReply,
  data: unknown,
  statusCode: number = 200
) => {
  return reply.status(statusCode).send({
    data: data,
  });
};

export const createErrorResponse = (
  reply: FastifyReply,
  message: string,
  statusCode: number = 400
) => {
  return reply.status(statusCode).send({
    error: message,
  });
};
