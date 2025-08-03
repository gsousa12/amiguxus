import { Static, Type } from "@sinclair/typebox";
import { CommonSchemas, TimeStampSchema } from "common/schemas/common.schemas";

export const UserEntitySchema = Type.Intersect([
  Type.Pick(CommonSchemas, ["id", "phone", "email", "city", "state"]),
  Type.Object({
    full_name: Type.String({
      minLength: 2,
      maxLength: 100,
      errorMessage: {
        minLength: "O nome completo deve ter pelo menos 2 caracteres.",
        maxLength: "O nome completo não pode exceder 100 caracteres.",
      },
    }),
  }),
  Type.Pick(TimeStampSchema, ["created_at", "updated_at"]),
]);

export type UserEntitySchemaType = Static<typeof UserEntitySchema>;

export const JWTPayloadSchema = Type.Intersect([
  Type.Pick(UserEntitySchema, ["id", "full_name", "email"]),
]);

export type JWTPayloadSchemaType = Static<typeof JWTPayloadSchema>;
