import { Static, Type } from "@sinclair/typebox";

export const CommonSchemas = Type.Object({
  id: Type.String({
    format: "uuid",
    errorMessage: {
      format: "O ID fornecido deve ser um UUID válido.",
    },
  }),
  owner_id: Type.String({
    format: "uuid",
    errorMessage: {
      format: "O ID fornecido deve ser um UUID válido.",
    },
  }),
  password: Type.String({
    minLength: 6,
    maxLength: 100,
    errorMessage: {
      minLength: "A senha deve ter no mínimo 6 caracteres.",
      maxLength: "A senha deve ter no máximo 100 caracteres.",
    },
  }),

  phone: Type.String({
    minLength: 11,
    maxLength: 15,
    errorMessage: {
      minLength: "O telefone deve ter pelo menos 11 caracteres.",
      maxLength: "O telefone não pode exceder 15 caracteres.",
    },
  }),

  email: Type.String({
    format: "email",
    errorMessage: {
      format: "O e-mail fornecido não é um endereço de e-mail válido.",
    },
  }),

  city: Type.String({
    minLength: 2,
    maxLength: 100,
    errorMessage: {
      minLength: "A cidade deve ter pelo menos 2 caracteres.",
      maxLength: "A cidade não pode exceder 100 caracteres.",
    },
  }),

  state: Type.String({
    pattern: "^[A-Z]{2}$",
    errorMessage: {
      pattern: "O estado deve ser representado por duas letras maiúsculas.",
    },
  }),
});

export const PaginationSchema = Type.Object({
  page: Type.Integer({
    minimum: 1,
    default: 1,
    description: "O número da página para a qual navegar.",
    errorMessage: {
      minimum: "O número da página deve ser pelo menos 1.",
    },
  }),
});

export type CommonSchemasType = Static<typeof PaginationSchema>;

export const TimeStampSchema = Type.Object({
  created_at: Type.String({
    format: "date-time",
    errorMessage: {
      format: "A data de criação deve estar no formato ISO 8601 (date-time).",
    },
  }),

  updated_at: Type.Optional(
    Type.Union([Type.String({ format: "date-time" }), Type.Null()])
  ),

  deleted_at: Type.Optional(
    Type.Union([Type.String({ format: "date-time" }), Type.Null()])
  ),
});
