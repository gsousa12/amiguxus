import { Static, Type } from "@sinclair/typebox";
import { UserEntitySchema } from "modules/users/schemas";

export const LoginResponse = Type.Object({
  data: Type.Pick(UserEntitySchema, ["email", "full_name"]),
});
export type LoginResponseType = Static<typeof LoginResponse>;
