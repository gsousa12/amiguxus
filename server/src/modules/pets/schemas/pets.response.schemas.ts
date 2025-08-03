import { Static, Type } from "@sinclair/typebox";
import { PetEntitySchema } from "./entity.schemas";

export const CreatePetResponseSchema = Type.Pick(PetEntitySchema, [
  "name",
  "created_at",
]);

export type CreatePetResponseSchemaType = Static<
  typeof CreatePetResponseSchema
>;

export const UploadPetImageResponseSchema = Type.Object({
  url: Type.String({
    format: "uri",
    description: "URL da imagem que foi salva no bucket.",
  }),
});
