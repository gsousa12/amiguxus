import { Pet } from '@prisma/client';
import { PaginationMeta } from 'src/common/utils/api-response';

export interface IPetService {
  getPetList(
    page: number,
    limit: number,
    filters: {
      name?: string;
      species?: string;
      breed?: string;
      gender?: string;
      age?: string;
      size?: string;
      vaccinated?: boolean;
      neutered?: boolean;
      city?: string;
      state?: string;
    },
  ): Promise<{ petList: Pet[]; meta: PaginationMeta }>;
}
