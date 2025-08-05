import { Type } from "@sinclair/typebox";
import { CommonSchemas } from "common/schemas";
import { TimeStampSchema } from "common/schemas/common.schemas";

export const NotificationEntitySchema = Type.Intersect([
  Type.Pick(CommonSchemas, ["id"]),
  Type.Object({
    title: Type.String(),
    message: Type.String(),
    is_read: Type.Boolean(),
    related_user_id: Type.String(),
  }),
  Type.Pick(TimeStampSchema, ["created_at", "updated_at"]),
]);
