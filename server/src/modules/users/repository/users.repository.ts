import { Prisma, User } from "@prisma/client";
import { prisma } from "database/clients/prisma";

const findByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

const create = async (data: Prisma.UserCreateInput): Promise<User> => {
  const user = await prisma.user.create({
    data,
  });
  return user;
};

const findById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const userRepository = {
  findByEmail,
  create,
  findById,
};
