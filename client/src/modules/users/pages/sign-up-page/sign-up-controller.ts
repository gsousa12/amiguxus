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
        full_name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phoneNumber,
        city: data.city,
        state: data.state,
      },
      {
        onSuccess: () => {
          setSuccessPopUp(true);
        },
      }
    );
  };

  const onGoToSignIn = () => navigate("/sign-in");

  return { onSignUp, onGoToSignIn, error, successPopUp, setSuccessPopUp };
};
