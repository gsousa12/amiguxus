import { Pet } from "@/common/types/pets.entity";
import { GetPetListRequest } from "../interfaces/pets-api-interfaces";
import { api } from "../axios";
import { PaginatedApiResponse } from "../interfaces/pagination.interfaces";

export const getPetListDispatch = async (
  request: GetPetListRequest
): Promise<PaginatedApiResponse<Pet[]>> => {
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

  const response = await api.get("/pets/get-pets", {
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

  return response.data;
};
