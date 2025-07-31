import { Static, Type } from "@sinclair/typebox";
import { CommonSchemas } from "common/schemas/common.schemas";
import { UserEntitySchema } from "modules/users/schemas";

export const LoginSchema = Type.Intersect([
  Type.Pick(UserEntitySchema, ["email"]),
  Type.Pick(CommonSchemas, ["password"]),
]);
export type LoginSchemaType = Static<typeof LoginSchema>;
