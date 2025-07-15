import { useMutation, UseMutationResult } from "@tanstack/react-query";
import {
  LoginRequest,
  RegisterRequest,
} from "../../interfaces/auth-api-interfaces";
import { loginDispatch, registerDispatch } from "../../dispatch/auth-dispatchs";

export const loginMutation = (): UseMutationResult<
  null,
  unknown,
  LoginRequest
> => {
  return useMutation({
    mutationFn: (request: LoginRequest) => loginDispatch(request),
  });
};

export const registerUserMutation = (): UseMutationResult<
  null,
  unknown,
  RegisterRequest
> => {
  return useMutation({
    mutationFn: (request: RegisterRequest) => registerDispatch(request),
  });
};
