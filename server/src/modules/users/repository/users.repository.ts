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

export const userRepository = {
  findByEmail,
  create,
};
