import {
  PetAge,
  PetGender,
  PetSize,
  PetSpecies,
  PetStatus,
} from "@prisma/client";
import { Static, Type } from "@sinclair/typebox";
import { CommonSchemas, TimeStampSchema } from "common/schemas/common.schemas";

export const PetEntitySchema = Type.Intersect([
  Type.Pick(CommonSchemas, ["id", "owner_id"]),

  Type.Object({
    name: Type.String({
      minLength: 3,
      maxLength: 100,
      errorMessage: {
        minLength: "name deve ter pelo menos 3 caracteres.",
        maxLength: "name não pode exceder 100 caracteres.",
      },
    }),
  }),

  Type.Object({
    species: Type.Enum(PetSpecies, {
      errorMessage: "species inválido. Escolha entre: dog ou cat",
    }),
  }),

  Type.Optional(
    Type.Object({
      breed: Type.Union([
        Type.String({
          minLength: 2,
          maxLength: 50,
          errorMessage: {
            minLength: "breed deve ter pelo menos 2 caracteres.",
            maxLength: "breed não pode exceder 50 caracteres.",
          },
        }),
        Type.Null(),
      ]),
    })
  ),

  Type.Object({
    gender: Type.Enum(PetGender, {
      errorMessage: "gender inválido. Escolha entre: male, female ou unknown",
    }),
  }),

  Type.Object({
    age: Type.Enum(PetAge, {
      errorMessage: "age inválido. Escolha entre: puppy, adult ou senior",
    }),
  }),

  Type.Object({
    size: Type.Enum(PetSize, {
      errorMessage: "size inválido. Escolha entre: small, medium ou large",
    }),
  }),

  Type.Optional(
    Type.Object({
      description: Type.Union([
        Type.String({
          minLength: 5,
          maxLength: 300,
          errorMessage: {
            minLength: "description deve ter pelo menos 5 caracteres.",
            maxLength: "description não pode exceder 300 caracteres.",
          },
        }),
        Type.Null(),
      ]),
    })
  ),

  Type.Object({
    vaccinated: Type.Boolean({
      errorMessage: {
        type: "vaccinated deve ser um booleano.",
      },
    }),
  }),

  Type.Object({
    neutered: Type.Boolean({
      errorMessage: {
        type: "vaccinated deve ser um booleano.",
      },
    }),
  }),

  Type.Object({
    status: Type.Enum(PetStatus, {
      errorMessage: "status inválido. Escolha entre: available ou adopted",
    }),
  }),

  Type.Object({
    images_urls: Type.Array(
      Type.String({
        format: "uri",
        errorMessage: {
          format: "Cada URL de imagem deve ser um URI válido.",
        },
      }),
      {
        minItems: 1,
        maxItems: 3,
        errorMessage: {
          minItems: "Deve haver pelo menos uma URL de imagem.",
          maxItems: "Não pode haver mais de 3 URLs de imagem.",
        },
      }
    ),
  }),

  Type.Object({
    city: Type.String({
      minLength: 2,
      maxLength: 100,
      errorMessage: {
        minLength: "city deve ter pelo menos 2 caracteres.",
        maxLength: "city não pode exceder 100 caracteres.",
      },
    }),
  }),
  Type.Object({
    state: Type.String({
      pattern: "^[A-Z]{2}$",
      errorMessage: {
        pattern: "state deve ser representado por duas letras maiúsculas.",
      },
    }),
  }),

  Type.Pick(TimeStampSchema, ["created_at", "updated_at"]),
]);

export type PetEntitySchemaType = Static<typeof PetEntitySchema>;
