import * as z from "zod";

/* lista de siglas dos 27 estados */
export const STATE_SIGLAS = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Informe seu nome."),
    email: z.string().email("Digite um e-mail válido."),
    password: z.string().min(6, "Mínimo 6 caracteres.").max(20),
    confirmPassword: z.string(),
    phoneNumber: z
      .string()
      .regex(/^\(\d{2}\)\s\d{5}-\d{4}$/, "Telefone inválido."),
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
