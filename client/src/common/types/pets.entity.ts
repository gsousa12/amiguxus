import {
  EPetAge,
  EPetGender,
  EPetSize,
  EPetSpecies,
  EPetStatus,
} from "./pets.enums";

export type Pet = {
  id: string;
  owner_id: number;
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
  images_urls: string[];
  city: string;
  state: string;
  created_at: Date;
  updated_at: Date | null;
};
