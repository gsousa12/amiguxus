import { Static, Type } from "@sinclair/typebox";
import { PetEntitySchema } from "./entity.schemas";
import { AdoptionRequestBodySchema } from "./pets.body.schemas";

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

export const AdoptionRequestResponseSchema = Type.Intersect([
  Type.Pick(AdoptionRequestBodySchema, [
    "request_user_id",
    "pet_id",
    "message",
    "created_at",
  ]),
]);
