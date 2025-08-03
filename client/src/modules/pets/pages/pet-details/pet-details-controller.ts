import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  EPetAge,
  EPetGender,
  EPetSize,
  EPetSpecies,
} from "@/common/types/pets.enums";
import { Pet } from "@/common/types/pets.entity";
import { useMobileDetect } from "@/common/hooks/use-mobile-detect";

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

export const usePetDetailsPageController = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pet: Pet | undefined = location.state?.pet;

  useEffect(() => {
    if (!pet) {
      navigate("/home", { replace: true });
    }
  }, [pet, navigate]);

  const isFavorite = false;
  const toggleFavorite = () => console.log("Toggle favorite");
  const onRequest = () => {};

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

  return {
    pet,
    isFavorite,
    toggleFavorite,
    onRequest,
    toLabelPetInformations,
    isMobile: useMobileDetect(),
  };
};
