import { Type } from "@sinclair/typebox";
import { JWTPayloadSchema, UserEntitySchema } from "./entity.schemas";

export const CreateUserResponseSchema = Type.Pick(UserEntitySchema, [
  "full_name",
  "email",
  "created_at",
]);

export const GetUserInformationResponse = Type.Omit(JWTPayloadSchema, [
  "iat",
  "exp",
]);
