import { FastifyRequest, FastifyReply } from "fastify";
import { CreatePetBodySchemaType, GetPetsQuerySchemaType } from "../schemas";
import { petsRepository } from "../repository/pets.repository";
import { PetStatus } from "@prisma/client";
import { createErrorResponse, createSuccessResponse } from "common/utils";
import { userRepository } from "modules/users/repository/users.repository";
import { randomUUID } from "crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { environment } from "common/config/environment";

export const createPetHandler = async (
  request: FastifyRequest<{ Body: CreatePetBodySchemaType }>,
  reply: FastifyReply
) => {
  const {
    name,
    species,
    breed,
    gender,
    age,
    size,
    description,
    vaccinated,
    neutered,
    images_urls,
    city,
    state,
  } = request.body;

  const userId = request.user.id;

  const user = await userRepository.findById(userId);

  if (!user) {
    return createErrorResponse(
      reply,
      "Usuário não encontrado com o id fornecido.",
      404
    );
  }

  const createdPet = await petsRepository.create({
    owner_id: userId,
    name,
    species,
    breed,
    gender,
    age,
    size,
    description,
    vaccinated,
    neutered,
    images_urls,
    city,
    state,
    status: PetStatus.available,
  });

  return createSuccessResponse(reply, createdPet, 201);
};

export const getPetsHandler = async (
  request: FastifyRequest<{ Querystring: GetPetsQuerySchemaType }>,
  reply: FastifyReply
) => {
  const {
    age,
    breed,
    city,
    gender,
    name,
    neutered,
    size,
    species,
    state,
    vaccinated,
    page,
  } = request.query;

  const filters = {
    age,
    breed,
    city,
    gender,
    name,
    neutered,
    size,
    species,
    state,
    vaccinated,
  };

  const pagination = {
    page: page ? Number(page) : 1,
    limit: 20,
  };

  const { data, total } = await petsRepository.findAll(filters, pagination);

  const lastPage = Math.ceil(total / 20);

  const response = {
    meta: {
      total,
      perPage: 20,
      currentPage: page,
      lastPage: lastPage > 0 ? lastPage : 1,
      hasNextPage: (page ?? 20) < lastPage,
      hasPreviousPage: (page ?? 20) > 1,
    },
    data,
  };

  return reply.status(200).send(response);
};

export const uploadPetImageHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const data = await request.file();

  if (!data) {
    return reply.status(400).send({ message: "Nenhum arquivo enviado." });
  }

  // Gera um nome de arquivo único para evitar sobreposições
  const fileExtension = data.filename.substring(data.filename.lastIndexOf("."));
  const uniqueFileName = `${randomUUID()}${fileExtension}`;

  try {
    // --- INÍCIO DA ALTERAÇÃO ---
    // 1. Converte o stream do arquivo para um buffer em memória
    const buffer = await data.toBuffer();
    // --- FIM DA ALTERAÇÃO ---

    // Envia o comando de upload para o MinIO
    await request.server.minio.send(
      new PutObjectCommand({
        Bucket: environment.MINIO_BUCKET_NAME,
        Key: uniqueFileName,
        // --- INÍCIO DA ALTERAÇÃO ---
        // 2. Passa o buffer (com tamanho conhecido) em vez do stream
        Body: buffer,
        // --- FIM DA ALTERAÇÃO ---
        ContentType: data.mimetype,
      })
    );

    // Constrói a URL pública do arquivo
    const fileUrl = `${environment.MINIO_ENDPOINT}:${environment.MINIO_PORT}/${environment.MINIO_BUCKET_NAME}/${uniqueFileName}`;

    return reply.status(200).send({ url: fileUrl });
  } catch (error) {
    request.log.error(error, "Falha ao fazer upload da imagem para o MinIO");
    return reply.status(500).send({ message: "Erro interno do servidor." });
  }
};
