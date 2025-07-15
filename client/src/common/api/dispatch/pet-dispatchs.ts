import { Pet } from "@/common/types/pets.entity";
import { ApiResponse, getApiResponse } from "../get-api-response";
import { GetPetListRequest } from "../interfaces/pets-api-interfaces";
import { api } from "../axios";

export const getPetListDispatch = async (
  request: GetPetListRequest
): Promise<ApiResponse<Pet[]>> => {
  const {
    page,
    name,
    species,
    breed,
    gender,
    age,
    size,
    vaccinated,
    neutered,
    city,
    state,
  } = request;

  const response = await api.get("/pet/", {
    params: {
      page,
      name,
      species,
      breed,
      gender,
      age,
      size,
      vaccinated,
      neutered,
      city,
      state,
    },
  });

  return getApiResponse<Pet[]>(response.data, []);
};
