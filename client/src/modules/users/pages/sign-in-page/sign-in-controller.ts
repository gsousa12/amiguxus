import { SignInFormValues } from "../../zod-schemas/sign-in-schema";

export const useSignInPageController = () => {
  /* -------- chamadas vazias para implementar depois -------- */
  const onSignIn = async (data: SignInFormValues) => {
    console.log("signin", data);
  };

  const onCreateAccountDesire = () => {
    console.log("criar conta");
  };

  const onForgotPassword = () => {
    console.log("esqueci senha");
  };

  return {
    onSignIn,
    onCreateAccountDesire,
    onForgotPassword,
  };
};
