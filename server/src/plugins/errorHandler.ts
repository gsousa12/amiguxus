import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

const errorHandlerPlugin = async (app: FastifyInstance) => {
  app.setErrorHandler((error, _, reply) => {
    app.log.error(error);

    // if(error) {
    //   return reply.status(400).send({
    //     error
    //   });
    // }

    if (error.validation) {
      const validationError = error.validation[0];

      if (validationError.keyword === "required") {
        const missingField = validationError.params.missingProperty;
        return reply.status(400).send({
          error: `O '${missingField}' é um campo obrigatório.`,
        });
      }

      const customMessage = validationError.message;
      return reply.status(400).send({
        error: customMessage,
      });
    }

    return reply
      .status(500)
      .send({ error: "Ocorreu um erro interno no servidor." });
  });
};

export default fp(errorHandlerPlugin);
