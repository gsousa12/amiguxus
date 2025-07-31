import { Static, Type } from "@sinclair/typebox";
import { UserEntitySchema } from "./entity.schemas";
import { CommonSchemas } from "common/schemas/common.schemas";

export const CreateUserBodySchema = Type.Intersect([
  Type.Omit(UserEntitySchema, ["id", "created_at", "updated_at"]),
  Type.Pick(CommonSchemas, ["password"]),
]);
export type CreateUserBodySchemaType = Static<typeof CreateUserBodySchema>;
