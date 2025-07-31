import { FastifyReply, FastifyRequest } from "fastify";
import * as bcrypt from "bcrypt";
import { LoginSchemaType } from "../schemas";
import { userRepository } from "modules/users/repository/users.repository";
import { createErrorResponse, createSuccessResponse } from "common/utils";
import { UserPayload } from "plugins/auth";
import { environment } from "common/config/environment";

export const loginHandler = async (
  request: FastifyRequest<{ Body: LoginSchemaType }>,
  reply: FastifyReply
) => {
  const { email, password } = request.body;

  const user = await userRepository.findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
    return createErrorResponse(reply, "E-mail ou senha inválidos.", 401);
  }

  if (!user.is_active) {
    return createErrorResponse(reply, "Usuário inativo.", 403);
  }

  const payload: UserPayload = {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
  };

  const token = await reply.jwtSign(payload);
  reply.setCookie("token", token, {
    path: "/",
    httpOnly: environment.NODE_ENV !== "development",
    secure: environment.NODE_ENV === "production",
    sameSite: "lax",
  });
  const response = {
    id: user.id,
    full_name: user.full_name,
    email: user.email,
  };
  return createSuccessResponse(reply, response, 200);
};

export const logoutHandler = async (_: FastifyRequest, reply: FastifyReply) => {
  reply.clearCookie("token", { path: "/" });
  return reply.status(200).send({ data: {} });
};
