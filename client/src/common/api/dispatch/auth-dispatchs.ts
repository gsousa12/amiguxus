import { api } from "../axios";
import {
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

export const getUserInformationDispatch = async (): Promise<any> => {
  const response: any = await api.get("/users/informations");
  let payload = response.data;
  while (payload && typeof payload === "object" && "data" in payload) {
    payload = payload.data;
  }
  return payload;
};

export const validateUserDispatch = async (): Promise<boolean> => {
  try {
    await api.post("/users/validate");
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
