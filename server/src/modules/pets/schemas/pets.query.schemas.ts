import { Static, Type } from "@sinclair/typebox";
import { PetEntitySchema } from "./entity.schemas";
import { CommonSchemas, PaginationSchema } from "common/schemas/common.schemas";

export const GetPetsQuerySchema = Type.Intersect([
  Type.Pick(PaginationSchema, ["page"]),
  Type.Partial(
    Type.Pick(PetEntitySchema, [
      "name",
      "species",
      "breed",
      "gender",
      "age",
      "size",
      "vaccinated",
      "neutered",
      "city",
      "state",
    ])
  ),
]);

export type GetPetsQuerySchemaType = Static<typeof GetPetsQuerySchema>;
