import { TSchema, Type } from "@sinclair/typebox";

export const createResponseSchema = <T extends TSchema>(schema: T) => {
  return Type.Object({
    data: schema,
  });
};

export const createResponsePaginedSchema = <T extends TSchema>(
  itemsSchema: T
) =>
  Type.Object({
    meta: Type.Object({
      total: Type.Number(),
      perPage: Type.Number(),
      currentPage: Type.Number(),
      lastPage: Type.Number(),
      hasNextPage: Type.Boolean(),
      hasPreviousPage: Type.Boolean(),
    }),
    data: Type.Array(itemsSchema),
  });
