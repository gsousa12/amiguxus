import { EPetAge, EPetGender, EPetSize, EPetSpecies } from '../../../domain/enums/pet.enums';

export class CreatePetRequestDto {
  userId: number;
  name: string;
  species: EPetSpecies;
  breed: string | null;
  gender: EPetGender;
  age: EPetAge;
  size: EPetSize;
  description: string | null;
  vaccinated: boolean;
  neutered: boolean;
  imagesUrls: string[];
  city: string;
  state: string;
}
