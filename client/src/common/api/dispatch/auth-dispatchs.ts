import { api } from "../axios";
import { ApiResponse } from "../get-api-response";
import {
  getUserInformationResponse,
  LoginRequest,
  RegisterRequest,
} from "../interfaces/auth-api-interfaces";

export const loginDispatch = async (request: LoginRequest): Promise<null> => {
  try {
    await api.post("/auth/login/", request);
    return null;
  } catch (error) {
    throw error;
  }
};

export const registerDispatch = async (
  request: RegisterRequest
): Promise<null> => {
  try {
    await api.post("/users/create/", request);
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
    await api.post("/auth/validate", { userId });
    return true;
  } catch {
    return false;
  }
};

export const logoutDispatch = async (): Promise<null> => {
  try {
    await api.post("/auth/logout");
    return null;
  } catch (error) {
    throw error;
  }
};
