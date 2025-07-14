import { Injectable } from '@nestjs/common';
import { IPetRepository } from './interfaces/pet-repository.interface';
import { PrismaService } from 'src/common/modules/prisma/service/prisma.service';
import { CreatePetRequestDto } from '../../core/application/dtos/request/create-pet.request.dto';
import { Pet } from '@prisma/client';
import { EPetStatus } from '../../core/domain/enums/pet.enums';
import { PaginationMeta } from 'src/common/utils/api-response';

@Injectable()
export class PetRepository implements IPetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(request: CreatePetRequestDto): Promise<Pet> {
    return await this.prisma.pet.create({
      data: {
        id: crypto.randomUUID(),
        ownerId: request.userId,
        name: request.name,
        species: request.species,
        breed: request.breed,
        gender: request.gender,
        age: request.age,
        size: request.size,
        description: request.description,
        vaccinated: request.vaccinated,
        neutered: request.neutered,
        status: EPetStatus.AVAILABLE,
        imagesUrls: request.imagesUrls,
        city: request.city,
        state: request.state,
      },
    });
  }

  async getPetList(
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
  ): Promise<{ petList: Pet[]; meta: PaginationMeta }> {
    const skip = (page - 1) * limit;
    const whereClause: any = {};

    if (filters.name) {
      whereClause.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }
    if (filters.species) {
      whereClause.species = filters.species;
    }
    if (filters.breed) {
      whereClause.breed = {
        contains: filters.breed,
        mode: 'insensitive',
      };
    }
    if (filters.gender) {
      whereClause.gender = filters.gender;
    }
    if (typeof filters.age === 'number') {
      whereClause.age = filters.age;
    }
    if (filters.size) {
      whereClause.size = filters.size;
    }
    if (typeof filters.vaccinated === 'boolean') {
      whereClause.vaccinated = filters.vaccinated;
    }
    if (typeof filters.neutered === 'boolean') {
      whereClause.neutered = filters.neutered;
    }
    if (filters.city) {
      whereClause.city = {
        contains: filters.city,
        mode: 'insensitive',
      };
    }
    if (filters.state) {
      whereClause.state = {
        contains: filters.state,
        mode: 'insensitive',
      };
    }

    const [petList, totalCount] = await Promise.all([
      this.prisma.pet.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.pet.count({
        where: whereClause,
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      petList,
      meta: {
        totalItems: totalCount,
        itemsPerPage: limit,
        currentPage: page,
        totalPages,
      },
    };
  }

  async findPetById(petId: string): Promise<Pet | null> {
    return await this.prisma.pet.findUnique({
      where: { id: petId },
    });
  }

  async isPetFavoritedByUser(petId: string, userId: number): Promise<boolean> {
    const favorite = await this.prisma.favoritedPet.findFirst({
      where: {
        petId,
        userId,
      },
    });
    return !!favorite;
  }

  async addPetToFavorites(petId: string, userId: number): Promise<void> {
    await this.prisma.favoritedPet.create({
      data: {
        id: crypto.randomUUID(),
        petId,
        userId,
      },
    });
  }
}
