import { STATE_SIGLAS } from "@/common/lib/utils";
import * as z from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Informe seu nome."),
    email: z.string().email("Digite um e-mail válido."),
    password: z.string().min(6, "Mínimo 6 caracteres.").max(20),
    confirmPassword: z.string(),
    phoneNumber: z.string().regex(/^\d{11,15}$/, "Telefone inválido."),
    city: z.string().min(2, "Informe a cidade."),
    state: z.enum(STATE_SIGLAS, {
      errorMap: () => ({ message: "Selecione UF" }),
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Senhas diferentes.",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
