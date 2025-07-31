import { Type } from "@sinclair/typebox";
import { UserEntitySchema } from "./entity.schemas";

export const CreateUserResponseSchema = Type.Pick(UserEntitySchema, [
  "full_name",
  "email",
  "created_at",
]);
