import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { LoginRequest } from "../../interfaces/auth-api-interfaces";
import { loginDispatch } from "../../dispatch/auth-dispatchs";

export const loginMutation = (): UseMutationResult<
  null,
  unknown,
  LoginRequest
> => {
  return useMutation({
    mutationFn: (request: LoginRequest) => loginDispatch(request),
  });
};
