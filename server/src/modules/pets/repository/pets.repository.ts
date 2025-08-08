import { AdoptionRequestStatus, PetStatus, Prisma } from "@prisma/client";
import { prisma } from "database/clients/prisma";

const create = async (data: Prisma.PetUncheckedCreateInput) => {
  return await prisma.pet.create({
    data,
  });
};

const findAll = async (filters: any, pagination: any) => {
  const page_size = 20;
  const { page } = pagination;
  const skip = (page - 1) * page_size;
  const take = page_size;

  const where: Prisma.PetWhereInput = {
    status: PetStatus.available,
  };

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
    where.state = { equals: filters.state };
  }

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

  if (filters.vaccinated !== undefined) {
    where.vaccinated = filters.vaccinated;
  }
  if (filters.neutered !== undefined) {
    where.neutered = filters.neutered;
  }

  const [pets, total] = await Promise.all([
    prisma.pet.findMany({
      where,
      skip,
      take,
      orderBy: {
        created_at: "desc",
      },
    }),
    prisma.pet.count({
      where,
    }),
  ]);

  return {
    data: pets,
    total,
  };
};

const findByOwnerId = async (ownerId: string, pagination: any) => {
  const page_size = 20;
  const { page } = pagination;
  const skip = (page - 1) * page_size;
  const take = page_size;

  const [pets, total] = await Promise.all([
    prisma.pet.findMany({
      where: {
        owner_id: ownerId,
      },
      include: {
        adoptionRequests: {
          include: {
            user: {
              select: {
                id: true,
                full_name: true,
                city: true,
                email: true,
                phone: true,
                state: true,
              },
            },
          },
        },
      },
      skip,
      take,
      orderBy: {
        created_at: "desc",
      },
    }),
    prisma.pet.count({
      where: {
        owner_id: ownerId,
      },
    }),
  ]);

  return {
    data: pets,
    total,
  };
};
const createAdoptionRequest = async (
  request_user_id: string,
  pet_id: string,
  message: string
) => {
  return await prisma.adoptionRequest.create({
    data: {
      request_user_id,
      pet_id,
      message,
      status: AdoptionRequestStatus.pending,
    },
  });
};

const findById = async (id: string) => {
  return await prisma.pet.findUnique({
    where: {
      id,
    },
  });
};

const findAdoptionRequestByUserAndPetId = async (
  userId: string,
  petId: string
) => {
  return await prisma.adoptionRequest.findFirst({
    where: {
      request_user_id: userId,
      pet_id: petId,
    },
  });
};

export const petsRepository = {
  create,
  findAll,
  findByOwnerId,
  createAdoptionRequest,
  findById,
  findAdoptionRequestByUserAndPetId,
};
