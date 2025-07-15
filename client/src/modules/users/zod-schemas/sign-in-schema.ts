import z from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Digite um e-mail válido." }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres." }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
