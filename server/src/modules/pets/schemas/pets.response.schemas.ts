import { Static, Type } from "@sinclair/typebox";
import { PetEntitySchema } from "./entity.schemas";

export const CreatePetResponseSchema = Type.Pick(PetEntitySchema, [
  "name",
  "created_at",
]);

export type CreatePetResponseSchemaType = Static<
  typeof CreatePetResponseSchema
>;
