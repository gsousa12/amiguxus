import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  EPetAge,
  EPetGender,
  EPetSize,
  EPetSpecies,
  EPetStatus,
} from "@/common/types/pets.enums";
import { Pet } from "@/common/types/pets.entity";
import { useMobileDetect } from "@/common/hooks/use-mobile-detect";

/* ------------- dicionários pt-BR ------------- */
const speciesLabels: Record<EPetSpecies, string> = {
  cat: "Gato",
  dog: "Cachorro",
} as any;
const genderLabels: Record<EPetGender, string> = {
  male: "Macho",
  female: "Fêmea",
  unknown: "Desconhecido",
} as any;
const ageLabels: Record<EPetAge, string> = {
  puppy: "Filhote",
  kitten: "Filhote",
  adult: "Adulto",
  senior: "Idoso",
} as any;
const sizeLabels: Record<EPetSize, string> = {
  small: "Pequeno",
  medium: "Médio",
  large: "Grande",
} as any;

/* ------------- controller ------------- */
export const usePetDetailsPageController = () => {
  const { id } = useParams(); // /pets/:id
  const [pet, setPet] = useState<Pet>(MOCK_PET);
  const [isFavorite, setIsFavorite] = useState(false);

  /* mock fetch */
  useEffect(() => {
    // TODO: trocar por fetch real
    setTimeout(() => setPet(MOCK_PET), 300);
  }, [id]);

  /* helpers */
  const toLabelPetInformations = (key: string, value: any) => {
    switch (key) {
      case "species":
        return speciesLabels[value as EPetSpecies];
      case "gender":
        return genderLabels[value as EPetGender];
      case "age":
        return ageLabels[value as EPetAge];
      case "size":
        return sizeLabels[value as EPetSize];
      default:
        return value;
    }
  };

  const toggleFavorite = () => setIsFavorite((f) => !f);

  const onRequest = () => {
    /* chamar API futuramente */
    console.log("Enviar requisição de adoção");
  };

  return {
    pet,
    isFavorite,
    toggleFavorite,
    onRequest,
    toLabelPetInformations,
    isMobile: useMobileDetect(),
  };
};

/* ------------- mock ------------- */
const MOCK_PET: Pet = {
  id: "f613dcf4-23b0-4c8b-a958-ce6d86c52a5b",
  ownerId: 1,
  name: "Bislacha",
  species: EPetSpecies.CAT,
  breed: "SRD",
  gender: EPetGender.FEMALE,
  age: EPetAge.KITTEN,
  size: EPetSize.SMALL,
  description: "Olhos azuis e muito carinhoso.",
  vaccinated: false,
  neutered: true,
  status: EPetStatus.AVAILABLE,
  imagesUrls: [
    "https://t3.ftcdn.net/jpg/01/04/40/06/360_F_104400672_zCaPIFbYT1dXdzN85jso7NV8M6uwpKtf.jpg",
    "https://i.guim.co.uk/img/media/43352be36da0eb156e8551d775a57fadba8ae6d7/0_0_1440_864/master/1440.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=1829611852af3ffc6460b4068e20bcbc",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXZ3o-hjnlbj2t6cn1juvtlXR8RiEC1Jj0w&s",
  ],
  city: "Quixadá",
  state: "ce",
  createdAt: new Date(),
  updatedAt: new Date(),
};
