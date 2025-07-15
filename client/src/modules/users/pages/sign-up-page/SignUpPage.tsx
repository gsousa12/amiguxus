import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/common/components/ui/card";
import { Separator } from "@/common/components/ui/separator";
import { Label } from "@/common/components/ui/label";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/common/components/ui/select";
import { AlertPopUp } from "@/common/components/popups/alert-popup/AlertPopup";
import { getErrorMessage } from "@/common/api/get-api-error-message";

import { useSignUpController } from "./sign-up-controller";
import {
  SignUpFormValues,
  signUpSchema,
  STATE_SIGLAS,
} from "../../zod-schemas/sign-up-schemas";

/* mascara de telefone simples */
const formatPhone = (v: string) =>
  v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");

export const SignUpPage = () => {
  const { onSignUp, onGoToSignIn, error, successPopUp, setSuccessPopUp } =
    useSignUpController();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      city: "",
      state: "CE",
    },
  });

  /* visibilidade das senhas */
  const [showPwd, setShowPwd] = useState(false);
  const [showPwdC, setShowPwdC] = useState(false);

  /* popup de erro API */
  const [openAlertPopup, setOpenAlertPopup] = useState(false);
  const requestError = !!error;
  const errorMessage = getErrorMessage(error);

  useEffect(() => {
    setOpenAlertPopup(requestError);
  }, [requestError]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-4xl border-none shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <h1 className="text-2xl font-semibold leading-tight text-gray-800">
            Olá, humano! Crie sua conta para
            <br />
            aproveitar todas as funcionalidades do{" "}
            <span className="text-rose-500">Amiguxus.</span>
          </h1>

          <p className="text-sm text-gray-600">
            Já tem uma conta?{" "}
            <button
              onClick={onGoToSignIn}
              className="font-medium text-rose-500 hover:underline hover:cursor-pointer"
            >
              Clique aqui para entrar!
            </button>
          </p>
        </CardHeader>

        <Separator />

        <CardContent>
          <div className="flex flex-col items-center gap-8 md:flex-row">
            {/* imagem desktop */}
            <img
              src="https://d339b5nop2tkmp.cloudfront.net/assets/signup/login-1-c3bff807287c3a781a9000d9cd77b8c60dd5bd4b7be86b8b524c637fbd48cee1.png"
              alt="Mascote Amiguxus"
              className="hidden w-1/2 max-w-xs md:block"
            />

            {/* formulário */}
            <form
              onSubmit={handleSubmit(onSignUp)}
              className="flex w-full flex-col gap-6 md:w-1/2"
              noValidate
            >
              {/* Nome */}
              <Field label="Nome" error={errors.name?.message}>
                <Input
                  type="text"
                  placeholder="Seu nome"
                  {...register("name")}
                  className={errors.name && "border-rose-500"}
                />
              </Field>

              {/* E-mail */}
              <Field label="E-mail" error={errors.email?.message}>
                <Input
                  type="email"
                  placeholder="exemplo@email.com"
                  {...register("email")}
                  className={errors.email && "border-rose-500"}
                />
              </Field>

              {/* Telefone */}
              <Field label="Telefone" error={errors.phoneNumber?.message}>
                <Input
                  type="text"
                  placeholder="(99) 99999-9999"
                  {...register("phoneNumber")}
                  onChange={(e) => {
                    const v = formatPhone(e.target.value);
                    setValue("phoneNumber", v, { shouldValidate: true });
                  }}
                  className={errors.phoneNumber && "border-rose-500"}
                />
              </Field>

              {/* Cidade e Estado ------------------------------------------------ */}
              <div className="flex flex-col gap-6 sm:flex-row">
                <Field
                  label="Cidade"
                  error={errors.city?.message}
                  className="w-full"
                >
                  <Input
                    type="text"
                    placeholder="Sua cidade"
                    {...register("city")}
                    className={errors.city && "border-rose-500"}
                  />
                </Field>

                <Field
                  label="Estado"
                  error={errors.state?.message}
                  className="w-full"
                >
                  <Select
                    onValueChange={(v) =>
                      setValue("state", v as any, { shouldValidate: true })
                    }
                    defaultValue="CE"
                  >
                    <SelectTrigger
                      className={`${
                        errors.state && "border-rose-500"
                      } justify-between`}
                    >
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATE_SIGLAS.map((uf) => (
                        <SelectItem key={uf} value={uf}>
                          {estadoNomeCompleto(uf)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              {/* Senha ---------------------------------------------------------- */}
              <Field label="Senha" error={errors.password?.message}>
                <PasswordInput
                  show={showPwd}
                  toggle={() => setShowPwd((v) => !v)}
                  register={register("password")}
                  error={!!errors.password}
                />
              </Field>

              {/* Confirmar senha ------------------------------------------------ */}
              <Field
                label="Confirmar senha"
                error={errors.confirmPassword?.message}
              >
                <PasswordInput
                  show={showPwdC}
                  toggle={() => setShowPwdC((v) => !v)}
                  register={register("confirmPassword")}
                  error={!!errors.confirmPassword}
                />
              </Field>

              {/* Botão ---------------------------------------------------------- */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-rose-500 text-white hover:bg-rose-600 hover:cursor-pointer"
              >
                Cadastrar
              </Button>
            </form>
          </div>
        </CardContent>
        <CardFooter />
      </Card>

      {/* popups */}
      {requestError && (
        <AlertPopUp
          open={openAlertPopup}
          onClose={() => setOpenAlertPopup(false)}
          title="Oops!"
          description={errorMessage}
        />
      )}

      {successPopUp && (
        <AlertPopUp
          open={successPopUp}
          onClose={() => setSuccessPopUp(false)}
          title="Sucesso!"
          description="Cadastro concluído com sucesso."
        />
      )}
    </main>
  );
};

/* ------------------------------------------------------------------ */
/* helpers / sub-componentes                                          */
/* ------------------------------------------------------------------ */
const Field = ({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`relative ${className}`}>
    <Label>{label}</Label>
    {children}
    {error && (
      <p className="absolute -bottom-5 text-xs text-rose-500">{error}</p>
    )}
  </div>
);

const PasswordInput = ({
  show,
  toggle,
  register,
  error,
}: {
  show: boolean;
  toggle: () => void;
  register: UseFormRegisterReturn; //  ←  tipo correto
  error: boolean;
}) => (
  <div className="relative">
    <Input
      type={show ? "text" : "password"}
      placeholder="●●●●●●"
      {...register}
      className={`${error && "border-rose-500 pr-10"}`}
    />
    <button
      type="button"
      onClick={toggle}
      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
    >
      {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    </button>
  </div>
);
/* mapa UF → nome completo */
const ESTADOS: Record<(typeof STATE_SIGLAS)[number], string> = {
  AC: "Acre",
  AL: "Alagoas",
  AP: "Amapá",
  AM: "Amazonas",
  BA: "Bahia",
  CE: "Ceará",
  DF: "Distrito Federal",
  ES: "Espírito Santo",
  GO: "Goiás",
  MA: "Maranhão",
  MT: "Mato Grosso",
  MS: "Mato Grosso do Sul",
  MG: "Minas Gerais",
  PA: "Pará",
  PB: "Paraíba",
  PR: "Paraná",
  PE: "Pernambuco",
  PI: "Piauí",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RS: "Rio Grande do Sul",
  RO: "Rondônia",
  RR: "Roraima",
  SC: "Santa Catarina",
  SP: "São Paulo",
  SE: "Sergipe",
  TO: "Tocantins",
};

const estadoNomeCompleto = (uf: (typeof STATE_SIGLAS)[number]) => ESTADOS[uf];
