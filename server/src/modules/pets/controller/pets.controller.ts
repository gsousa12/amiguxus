import { FastifyRequest, FastifyReply } from "fastify";
import { CreatePetBodySchemaType, GetPetsQuerySchemaType } from "../schemas";
import { petsRepository } from "../repository/pets.repository";
import { PetStatus } from "@prisma/client";
import { createErrorResponse, createSuccessResponse } from "common/utils";
import { userRepository } from "modules/users/repository/users.repository";

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
