import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/common/components/ui/card";
import { Separator } from "@/common/components/ui/separator";
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
} from "../../zod-schemas/sign-up-schemas";
import { formatPhone, getStateName, STATE_SIGLAS } from "@/common/lib/utils";
import { SignUpField } from "../../components/signup-field/SignUpField";
import { PasswordInput } from "../../components/password-input/PasswordInput";
import { useNavigate } from "react-router-dom";

export const SignUpPage = () => {
  const { onSignUp, onGoToSignIn, error, successPopUp } = useSignUpController();

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

  const [showPwd, setShowPwd] = useState(false);
  const [showPwdC, setShowPwdC] = useState(false);
  const navigate = useNavigate();

  const [openAlertPopup, setOpenAlertPopup] = useState(false);
  const requestError = !!error;
  const errorMessage = getErrorMessage(error);

  const navigateToLoginPage = () => {
    setOpenAlertPopup(false);
    navigate("/sign-in", { replace: true });
  };

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
            <img
              src="https://d339b5nop2tkmp.cloudfront.net/assets/signup/login-1-c3bff807287c3a781a9000d9cd77b8c60dd5bd4b7be86b8b524c637fbd48cee1.png"
              alt="Mascote Amiguxus"
              className="hidden w-1/2 max-w-xs md:block"
            />
            <form
              onSubmit={handleSubmit(onSignUp)}
              className="flex w-full flex-col gap-6 md:w-1/2"
              noValidate
            >
              <SignUpField label="Nome" error={errors.name?.message}>
                <Input
                  type="text"
                  placeholder="Seu nome"
                  {...register("name")}
                  className={errors.name && "border-rose-500"}
                />
              </SignUpField>
              <SignUpField label="E-mail" error={errors.email?.message}>
                <Input
                  type="email"
                  placeholder="exemplo@email.com"
                  {...register("email")}
                  className={errors.email && "border-rose-500"}
                />
              </SignUpField>
              <SignUpField label="Telefone" error={errors.phoneNumber?.message}>
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
              </SignUpField>
              <div className="flex flex-col gap-6 sm:flex-row">
                <SignUpField
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
                </SignUpField>

                <SignUpField
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
                          {getStateName(uf)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </SignUpField>
              </div>
              <SignUpField label="Senha" error={errors.password?.message}>
                <PasswordInput
                  show={showPwd}
                  toggle={() => setShowPwd((v) => !v)}
                  register={register("password")}
                  error={!!errors.password}
                />
              </SignUpField>
              <SignUpField
                label="Confirmar senha"
                error={errors.confirmPassword?.message}
              >
                <PasswordInput
                  show={showPwdC}
                  toggle={() => setShowPwdC((v) => !v)}
                  register={register("confirmPassword")}
                  error={!!errors.confirmPassword}
                />
              </SignUpField>
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
          onClose={navigateToLoginPage}
          title="Sucesso!"
          description="Cadastro concluído com sucesso."
        />
      )}
    </main>
  );
};
