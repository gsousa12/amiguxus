import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify";

async function swaggerPlugin(app: FastifyInstance) {
  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Amiguxus Api",
        description:
          "Amiguxos é uma plataforma intuitiva para adoção de cães e gatos.",
        version: "1.0.0",
      },
      tags: [
        { name: "Users", description: "Endpoints de usuários" },
        { name: "Auth", description: "Endpoints de autenticação" },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: true,
    },
  });

  app.log.info("Plugin Swagger e SwaggerUI carregados!");
}

export default fp(swaggerPlugin);
