import {
  EPetAge,
  EPetGender,
  EPetSize,
  EPetSpecies,
  EPetStatus,
} from "./pets.enums";

export type Pet = {
  id: string;
  ownerId: number;
  name: string;
  species: EPetSpecies;
  breed: string | null;
  gender: EPetGender;
  age: EPetAge;
  size: EPetSize;
  description: string | null;
  vaccinated: boolean;
  neutered: boolean;
  status: EPetStatus;
  imagesUrls: string[];
  city: string;
  state: string;
  createdAt: Date;
  updatedAt: Date | null;
};
