import { PetStatus, Prisma } from "@prisma/client";
import { prisma } from "database/clients/prisma";
import { GetPetsQuerySchemaType } from "../schemas";
import { CommonSchemasType } from "common/schemas/common.schemas";

const create = async (data: Prisma.PetUncheckedCreateInput) => {
  return await prisma.pet.create({
    data,
  });
};

const findAll = async (filters: any, pagination: CommonSchemasType) => {
  // 1. Define a configuração da paginação
  const page_size = 20;
  const { page } = pagination;
  const skip = (page - 1) * page_size;
  const take = page_size;

  // 2. Constrói a cláusula 'where' dinamicamente a partir dos filtros
  const where: Prisma.PetWhereInput = {
    // Por padrão, buscamos apenas pets disponíveis para adoção
    status: PetStatus.available,
  };

  // Adiciona filtros de string (com busca case-insensitive)
  if (filters.name) {
    where.name = { contains: filters.name, mode: "insensitive" };
  }
  if (filters.breed) {
    where.breed = { contains: filters.breed, mode: "insensitive" };
  }
  if (filters.city) {
    where.city = { contains: filters.city, mode: "insensitive" };
  }
  if (filters.state) {
    where.state = { equals: filters.state }; // Estado é um match exato
  }

  // Adiciona filtros de enum (match exato)
  if (filters.species) {
    where.species = filters.species;
  }
  if (filters.gender) {
    where.gender = filters.gender;
  }
  if (filters.age) {
    where.age = filters.age;
  }
  if (filters.size) {
    where.size = filters.size;
  }

  // Adiciona filtros booleanos
  if (filters.vaccinated !== undefined) {
    where.vaccinated = filters.vaccinated;
  }
  if (filters.neutered !== undefined) {
    where.neutered = filters.neutered;
  }

  // 3. Executa as consultas de busca e contagem em paralelo para otimização
  const [pets, total] = await Promise.all([
    prisma.pet.findMany({
      where,
      skip,
      take,
      orderBy: {
        created_at: "desc", // Opcional: ordenar pelos mais recentes
      },
    }),
    prisma.pet.count({
      where,
    }),
  ]);

  // 4. Retorna os dados paginados e o total de registros
  return {
    data: pets,
    total,
  };
};

export const petsRepository = {
  create,
  findAll,
};
