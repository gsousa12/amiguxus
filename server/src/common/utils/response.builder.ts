import { FastifyReply } from "fastify";

/**
 * Formata e envia uma resposta de sucesso padronizada.
 * Envolve os dados em um objeto { data: ... } e define o status HTTP.
 *
 * @param reply O objeto de resposta do Fastify.
 * @param data Os dados a serem enviados na resposta.
 * @param statusCode O código de status HTTP (padrão: 200).
 */
export const createSuccessResponse = (
  reply: FastifyReply,
  data: unknown,
  statusCode: number = 200
) => {
  return reply.status(statusCode).send({
    data: data,
  });
};

/**
 * Formata e envia uma resposta de erro padronizada.
 * Envolve a mensagem de erro em um objeto { error: ... }.
 *
 * @param reply O objeto de resposta do Fastify.
 * @param message A mensagem de erro.
 * @param statusCode O código de status HTTP (padrão: 400).
 */
export const createErrorResponse = (
  reply: FastifyReply,
  message: string,
  statusCode: number = 400
) => {
  return reply.status(statusCode).send({
    error: message,
  });
};
