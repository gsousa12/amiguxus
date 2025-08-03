import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserBodySchemaType } from "../schemas";
import * as bcrypt from "bcrypt";
import { userRepository } from "../repository/users.repository";
import { createErrorResponse, createSuccessResponse } from "common/utils";
import { UserPayload } from "plugins/auth";

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

export const getUserInformationHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const jwtPayload: UserPayload = request.user;
  const response = {
    data: jwtPayload,
  };
  return createSuccessResponse(reply, response, 201);
};

export const ValidateUserHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    return reply.status(200).send({ isValid: true });
  } catch (error) {
    return reply.status(200).send({ isValid: false });
  }
};
