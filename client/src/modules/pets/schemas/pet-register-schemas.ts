import { z } from "zod";

const petSpecies = ["dog", "cat"] as const;
const petGender = ["male", "female", "unknown"] as const;
const petAge = ["puppy", "adult", "senior"] as const;
const petSize = ["small", "medium", "large"] as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const petRegisterFormSchema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres.").max(100),
  species: z.enum(petSpecies, { required_error: "Espécie é obrigatória." }),
  breed: z.string().max(50).optional().nullable(),
  gender: z.enum(petGender, { required_error: "Gênero é obrigatório." }),
  age: z.enum(petAge, { required_error: "Idade é obrigatória." }),
  size: z.enum(petSize, { required_error: "Porte é obrigatório." }),
  description: z
    .string()
    .min(5, "A descrição precisa de mais detalhes.")
    .max(300, "A descrição não pode ter mais de 300 caracteres.")
    .optional()
    .nullable(),
  vaccinated: z.boolean(),
  neutered: z.boolean(),
  city: z.string().min(2, "Cidade é obrigatória."),
  state: z.string().length(2, "Estado deve ter 2 letras (UF).").toUpperCase(),
  images: z
    .array(z.instanceof(File))
    .min(1, "É necessário enviar pelo menos uma foto.")
    .max(3, "Você pode enviar no máximo 3 fotos.")
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      `Tamanho máximo de 5MB por foto.`
    )
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Apenas formatos .jpg, .jpeg, .png e .webp."
    ),
});

export type PetRegisterFormSchemaType = z.infer<typeof petRegisterFormSchema>;

export const createPetAPISchema = petRegisterFormSchema
  .extend({
    images_urls: z.array(z.string().url()).min(1).max(3),
  })
  .omit({ images: true });

export type CreatePetAPISchemaType = z.infer<typeof createPetAPISchema>;
