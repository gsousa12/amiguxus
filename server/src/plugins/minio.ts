// src/plugins/minio.ts

import { S3Client } from "@aws-sdk/client-s3";
import { environment } from "common/config/environment";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

// Estendendo a interface do Fastify para incluir nosso cliente S3
declare module "fastify" {
  interface FastifyInstance {
    minio: S3Client;
  }
}

const minioPlugin: FastifyPluginAsync = async (fastify) => {
  const s3Client = new S3Client({
    endpoint: `${environment.MINIO_ENDPOINT}:${environment.MINIO_PORT}`,
    region: "us-east-1", // Região é obrigatória, mas pode ser qualquer valor para MinIO
    credentials: {
      accessKeyId: environment.MINIO_ACCESS_KEY,
      secretAccessKey: environment.MINIO_SECRET_KEY,
    },
    forcePathStyle: true, // Essencial para funcionar com MinIO!
  });

  // Disponibiliza o cliente S3 na instância do Fastify
  fastify.decorate("minio", s3Client);
};

export default fp(minioPlugin);
