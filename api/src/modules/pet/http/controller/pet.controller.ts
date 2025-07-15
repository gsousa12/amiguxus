import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { PetService } from '../../core/application/services/pet.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePetRequestDto } from '../../core/application/dtos/request/create-pet.request.dto';
import { createApiResponse } from 'src/common/utils/api-response';
import { FavoritePetRequestDto } from '../../core/application/dtos/request/favorite-pet.request.dto';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createPet(@Body() request: CreatePetRequestDto) {
    await this.petService.createPet(request);
    return null;
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getPetList(
    @Query('page') page?: number,
    @Query('name') name?: string,
    @Query('species') species?: string,
    @Query('breed') breed?: string,
    @Query('gender') gender?: string,
    @Query('age') age?: string,
    @Query('size') size?: string,
    @Query('vaccinated') vaccinated?: string,
    @Query('neutered') neutered?: string,
    @Query('city') city?: string,
    @Query('state') state?: string,
  ) {
    const limit = 12;
    const parsedPage = page ? Number(page) : 1;
    const parsedVaccinated = vaccinated !== undefined ? vaccinated === 'true' : undefined;
    const parsedNeutered = neutered !== undefined ? neutered === 'true' : undefined;
    const parsedAge = age !== undefined ? age : undefined;

    const filters = {
      name,
      species,
      breed,
      gender,
      age: parsedAge,
      size,
      vaccinated: parsedVaccinated,
      neutered: parsedNeutered,
      city,
      state,
    };

    const { petList, meta } = await this.petService.getPetList(parsedPage, limit, filters);
    return createApiResponse(petList, meta);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/favorite')
  @HttpCode(HttpStatus.OK)
  async favoritePet(@Body() request: FavoritePetRequestDto) {
    await this.petService.favoritePet(request);
    return null;
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getPetById(@Param('id') id: number) {
    const petId = String(id);

    const pet = await this.petService.getPetById(petId);
    return createApiResponse(pet);
  }
}
