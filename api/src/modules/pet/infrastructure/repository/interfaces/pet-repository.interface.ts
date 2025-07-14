import { Pet } from '@prisma/client';
import { PaginationMeta } from 'src/common/utils/api-response';
import { CreatePetRequestDto } from 'src/modules/pet/core/application/dtos/request/create-pet.request.dto';

export interface IPetRepository {
  create(request: CreatePetRequestDto): Promise<Pet>;

  getPetList(
    page: number,
    limit: number,
    filters: {
      name?: string;
      species?: string;
      breed?: string;
      gender?: string;
      age?: number;
      size?: string;
      vaccinated?: boolean;
      neutered?: boolean;
      city?: string;
      state?: string;
    },
  ): Promise<{ petList: Pet[]; meta: PaginationMeta }>;

  isPetFavoritedByUser(petId: string, userId: number): Promise<boolean>;

  addPetToFavorites(petId: string, userId: number): Promise<void>;
}
