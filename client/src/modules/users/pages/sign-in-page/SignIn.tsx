import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useSignInPageController } from "./sign-in-controller";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/common/components/ui/card";
import { Separator } from "@/common/components/ui/separator";
import { Label } from "@/common/components/ui/label";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import {
  SignInFormValues,
  signInSchema,
} from "../../zod-schemas/sign-in-schema";
import { AlertPopUp } from "@/common/components/popups/alert-popup/AlertPopup";
import { getErrorMessage } from "@/common/api/get-api-error-message";

export const SignInPage = () => {
  const { onSignIn, onCreateAccountDesire, onForgotPassword, error } =
    useSignInPageController();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const [showPwd, setShowPwd] = useState(false);
  const [openAlertPopup, setOpenAlertPopup] = useState<boolean>(false);
  const requestError = !!error;
  const errorMessage = getErrorMessage(error);

  useEffect(() => {
    requestError ? setOpenAlertPopup(true) : setOpenAlertPopup(false);
  }, [requestError]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-4xl border-none shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <h1 className="text-2xl font-semibold leading-tight text-gray-800">
            Olá, humano! Entre na sua conta para
            <br />
            aproveitar todas as funcionalidades do{" "}
            <span className="text-rose-500">Amiguxus.</span>
          </h1>

          <p className="text-sm text-gray-600">
            Ainda não tem uma conta?{" "}
            <button
              onClick={onCreateAccountDesire}
              className="font-medium text-rose-500 
              hover:underline hover:cursor-pointer"
            >
              Clique aqui para criar uma!
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
              onSubmit={handleSubmit(onSignIn)}
              className="flex w-full flex-col gap-6 md:w-1/2"
              noValidate
            >
              <div className="relative">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  className={errors.email && "border-rose-500"}
                />
                {errors.email && (
                  <p className="absolute -bottom-5 text-xs text-rose-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPwd ? "text" : "password"}
                    placeholder="●●●●●●"
                    {...register("password")}
                    className={errors.password && "border-rose-500 pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
                    aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPwd ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="absolute -bottom-5 text-xs text-rose-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onForgotPassword}
                className="-mt-4 self-end text-sm font-medium text-rose-500 
                hover:underline hover:cursor-pointer"
              >
                Esqueci minha senha
              </button>

              <Button
                type="submit"
                className="bg-rose-500 text-white 
                hover:bg-rose-600 hover:cursor-pointer"
                disabled={isSubmitting}
              >
                Entrar
              </Button>
            </form>
          </div>
        </CardContent>

        <CardFooter />
      </Card>

      {requestError && (
        <AlertPopUp
          description={errorMessage}
          open={openAlertPopup}
          onClose={() => setOpenAlertPopup(!openAlertPopup)}
          title="Oops!"
        />
      )}
    </main>
  );
};
