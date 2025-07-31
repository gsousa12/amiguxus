import { Static, Type } from "@sinclair/typebox";
import { UserEntitySchema } from "./entity.schemas";

export const CreateUserBodySchema = Type.Intersect([
  Type.Omit(UserEntitySchema, ["id", "created_at", "updated_at"]),
  Type.Object({
    password: Type.String({
      minLength: 6,
      maxLength: 100,
      errorMessage: {
        minLength: "A senha deve ter no mínimo 6 caracteres.",
        maxLength: "A senha deve ter no máximo 100 caracteres.",
      },
    }),
  }),
]);
export type CreateUserBodySchemaType = Static<typeof CreateUserBodySchema>;
