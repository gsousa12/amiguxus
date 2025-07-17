import { useNavigate } from "react-router-dom";
import { registerUserMutation } from "@/common/api/mutations/auth/auth-mutations";
import { useState } from "react";
import { SignUpFormValues } from "../../zod-schemas/sign-up-schemas";

export const useSignUpController = () => {
  const navigate = useNavigate();

  const [successPopUp, setSuccessPopUp] = useState(false);
  const { mutateAsync: registerMutation, error } = registerUserMutation();

  const onSignUp = async (data: SignUpFormValues) => {
    await registerMutation(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        city: data.city,
        state: data.state,
      },
      {
        onSuccess: () => {
          setSuccessPopUp(true);
          setTimeout(() => navigate("/sign-in", { replace: true }), 1500);
        },
      }
    );
  };

  const onGoToSignIn = () => navigate("/sign-in");

  return { onSignUp, onGoToSignIn, error, successPopUp, setSuccessPopUp };
};
