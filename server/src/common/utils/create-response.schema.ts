import { TSchema, Type } from "@sinclair/typebox";

export const createResponseSchema = <T extends TSchema>(schema: T) => {
  return Type.Object({
    data: schema,
  });
};
