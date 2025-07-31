import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserBodySchemaType } from "../schemas";
import * as bcrypt from "bcrypt";
import { userRepository } from "../repository/users.repository";
import { createErrorResponse, createSuccessResponse } from "common/utils";
export const createUserHandler = async (
  request: FastifyRequest<{ Body: CreateUserBodySchemaType }>,
  reply: FastifyReply
) => {
  const { password, ...userData } = request.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const existingUser = await userRepository.findByEmail(userData.email);

  if (existingUser) {
    return createErrorResponse(
      reply,
      "Já existe um usuário registrado com esse email.",
      409
    );
  }

  const createdUser = await userRepository.create({
    ...userData,
    hashed_password: hashedPassword,
  });

  return createSuccessResponse(reply, createdUser, 201);
};
