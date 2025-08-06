import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { api } from "../../axios";

export interface AdoptionRequestBody {
  pet_id: string;
  message: string;
}

export interface AdoptionRequestResponse {
  id: string;
  pet_id: string;
  user_id: string;
  message: string;
  status: string;
  created_at: string;
  updated_at: string | null;
}

export type ApiResponse<T> = { data: T };

export const createAdoptionRequest = async (
  body: AdoptionRequestBody
): Promise<AdoptionRequestResponse> => {
  const res: AxiosResponse<ApiResponse<AdoptionRequestResponse>> =
    await api.post("/pets/adoption-request", body, { withCredentials: true });
  return res.data.data;
};

export type CreateAdoptionRequestOptions = Omit<
  UseMutationOptions<AdoptionRequestResponse, AxiosError, AdoptionRequestBody>,
  "mutationFn"
>;

export const useCreateAdoptionRequest = (
  options?: CreateAdoptionRequestOptions
): UseMutationResult<
  AdoptionRequestResponse,
  AxiosError,
  AdoptionRequestBody
> =>
  useMutation<AdoptionRequestResponse, AxiosError, AdoptionRequestBody>({
    mutationFn: createAdoptionRequest,
    ...options,
  });
