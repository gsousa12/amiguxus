import { loginMutation } from "@/common/api/mutations/auth/auth-mutations";
import { SignInFormValues } from "../../zod-schemas/sign-in-schema";
import { useNavigate } from "react-router-dom";
import { getUserInformationDispatch } from "@/common/api/dispatch/auth-dispatchs";
import { useAuthStore } from "@/common/stores/auth/auth-store";

export const useSignInPageController = () => {
  const navigate = useNavigate();
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const setUser = useAuthStore((s) => s.setUser);

  const { mutateAsync: signIn, error } = loginMutation();
  const onSignIn = async (data: SignInFormValues) => {
    await signIn(
      { email: data.email, password: data.password },
      {
        onSuccess: async () => {
          const { data: user } = await getUserInformationDispatch();
          // sessionStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setAuthenticated(true);
          navigate("/home", { replace: true });
        },
        onError: () => setAuthenticated(false),
      }
    );
  };

  const onCreateAccountDesire = () => {};

  const onForgotPassword = () => {};

  return {
    onSignIn,
    onCreateAccountDesire,
    onForgotPassword,
    error,
  };
};
