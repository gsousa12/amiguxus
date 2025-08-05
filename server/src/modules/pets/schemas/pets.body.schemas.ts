import { Static, Type } from "@sinclair/typebox";
import { PetEntitySchema } from "./entity.schemas";
import { CommonSchemas } from "common/schemas";
import { TimeStampSchema } from "common/schemas/common.schemas";
import { AdoptionRequestStatus } from "@prisma/client";

export const CreatePetBodySchema = Type.Omit(PetEntitySchema, [
  "id",
  "owner_id",
  "status",
  "created_at",
  "updated_at",
  "deleted_at",
]);

export type CreatePetBodySchemaType = Static<typeof CreatePetBodySchema>;

export const AdoptionRequestBodySchema = Type.Intersect([
  Type.Object({
    pet_id: Type.String({
      format: "uuid",
      errorMessage: {
        format: "O ID fornecido deve ser um UUID válido.",
      },
    }),
    message: Type.String({
      minLength: 10,
      maxLength: 500,
      errorMessage: {
        minLength: "A mensagem deve ter pelo menos 10 caracteres.",
        maxLength: "A mensagem não pode exceder 500 caracteres.",
      },
    }),
  }),
]);

export type AdoptionRequestBodySchemaType = Static<
  typeof AdoptionRequestBodySchema
>;
