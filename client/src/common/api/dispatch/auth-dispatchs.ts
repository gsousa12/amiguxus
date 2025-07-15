import { api } from "../axios";
import { ApiResponse } from "../get-api-response";
import {
  getUserInformationResponse,
  LoginRequest,
} from "../interfaces/auth-api-interfaces";

export const loginDispatch = async (request: LoginRequest): Promise<null> => {
  try {
    await api.post("/auth/login/", request);
    return null;
  } catch (error) {
    throw error;
  }
};

export const getUserInformationDispatch = async (): Promise<
  ApiResponse<getUserInformationResponse>
> => {
  const response = await api.get("/user/information");
  return response.data;
};

export const validateUserDispatch = async (
  userId: number | null
): Promise<boolean> => {
  try {
    await api.post("/auth/validate", { userId }); // <- shape correto
    return true;
  } catch {
    return false; // apenas false, sem throw
  }
};
