import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { api } from "../../axios";
import { CreatePetAPISchemaType } from "@/modules/pets/schemas/pet-register-schemas";

interface UploadPetImageResponse {
  url: string;
}

const uploadPetImageDispatch = async (
  imageFile: File
): Promise<UploadPetImageResponse> => {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    const { data } = await api.post<UploadPetImageResponse>(
      "/pets/upload-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const useUploadPetImageMutation = (): UseMutationResult<
  UploadPetImageResponse,
  unknown,
  File
> => {
  return useMutation({
    mutationFn: (imageFile: File) => uploadPetImageDispatch(imageFile),
  });
};

const createPetDispatch = async (
  petData: CreatePetAPISchemaType
): Promise<null> => {
  try {
    await api.post("/pets/create", petData);
    return null;
  } catch (error) {
    throw error;
  }
};

export const useCreatePetMutation = (): UseMutationResult<
  null,
  unknown,
  CreatePetAPISchemaType
> => {
  return useMutation({
    mutationFn: (petData: CreatePetAPISchemaType) => createPetDispatch(petData),
  });
};
