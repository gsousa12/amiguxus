import { Static, Type } from "@sinclair/typebox";
import { PetEntitySchema } from "./entity.schemas";

export const CreatePetBodySchema = Type.Omit(PetEntitySchema, [
  "id",
  "owner_id",
  "status",
  "created_at",
  "updated_at",
  "deleted_at",
]);

export type CreatePetBodySchemaType = Static<typeof CreatePetBodySchema>;
