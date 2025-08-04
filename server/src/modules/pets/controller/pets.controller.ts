import { FastifyRequest, FastifyReply } from "fastify";
import {
  CreatePetBodySchemaType,
  GetMyPetsQuerySchemaType,
  GetPetsQuerySchemaType,
} from "../schemas";
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

  const fileExtension = data.filename.substring(data.filename.lastIndexOf("."));
  const uniqueFileName = `${randomUUID()}${fileExtension}`;

  try {
    const buffer = await data.toBuffer();

    await request.server.minio.send(
      new PutObjectCommand({
        Bucket: environment.MINIO_BUCKET_NAME,
        Key: uniqueFileName,
        Body: buffer,
        ContentType: data.mimetype,
      })
    );

    const fileUrl = `${environment.MINIO_PUBLIC_URL}/${environment.MINIO_BUCKET_NAME}/${uniqueFileName}`;

    return reply.status(200).send({ url: fileUrl });
  } catch (error) {
    request.log.error(error, "Falha ao fazer upload da imagem para o MinIO");
    return reply.status(500).send({ message: "Erro interno do servidor." });
  }
};

export const getMyPetsHanlder = async (
  request: FastifyRequest<{ Querystring: GetMyPetsQuerySchemaType }>,
  reply: FastifyReply
) => {
  const userId = request.user.id;
  const { page } = request.query;
  const pagination = {
    page: page ? Number(page) : 1,
    limit: 20,
  };
  const { data, total } = await petsRepository.findByOwnerId(
    userId,
    pagination
  );

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
