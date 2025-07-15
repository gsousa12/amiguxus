import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../get-api-response";
import { Pet } from "@/common/types/pets.entity";
import { GetPetListRequest } from "../../interfaces/pets-api-interfaces";
import { getPetListDispatch } from "../../dispatch/pet-dispatchs";

export const getPetListQuery = (request: GetPetListRequest) => {
  return useQuery<ApiResponse<Pet[]>>({
    queryKey: ["expenseList", request],
    queryFn: () => getPetListDispatch(request),
  });
};
