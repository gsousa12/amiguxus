import { useQuery } from "@tanstack/react-query";
import { Pet } from "@/common/types/pets.entity";
import { GetPetListRequest } from "../../interfaces/pets-api-interfaces";
import { getPetListDispatch } from "../../dispatch/pet-dispatchs";
import { PaginatedApiResponse } from "../../interfaces/pagination.interfaces";

export const getPetListQuery = (request: GetPetListRequest) => {
  // 3. TIPO GENÉRICO CORRIGIDO
  return useQuery<PaginatedApiResponse<Pet[]>>({
    queryKey: ["petList", request], // É uma boa prática usar 'petList' aqui
    queryFn: () => getPetListDispatch(request),
  });
};
