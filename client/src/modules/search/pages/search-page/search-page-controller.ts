import { useEffect, useMemo, useState } from "react";
import {
  EPetAge,
  EPetGender,
  EPetSize,
  EPetSpecies,
  EPetStatus,
} from "@/common/types/pets.enums";
import { Pet } from "@/common/types/pets.entity";

export interface FilterProps {
  filters: FiltersState;
  /** atualiza QUALQUER campo de filtro */
  updateFilter: <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K]
  ) => void;
  className?: string;
}

/* --------------------------------------------------------------- *
 *  1.1  Tipos centrais
 * --------------------------------------------------------------- */
export type FiltersState = {
  species?: EPetSpecies;
  breed: string;
  gender?: EPetGender;
  age?: EPetAge;
  size?: EPetSize;
  vaccinated: boolean;
  neutered: boolean;
};

interface PaginationInfo {
  totalPages: number;
  totalItems: number;
}

/* --------------------------------------------------------------- *
 *  1.2  Labels pt-BR  (usam **valor** do enum)
 * --------------------------------------------------------------- */
export const speciesLabels: Record<EPetSpecies, string> = {
  [EPetSpecies.DOG]: "Cachorro",
  [EPetSpecies.CAT]: "Gato",
};

export const genderLabels: Record<EPetGender, string> = {
  [EPetGender.MALE]: "Macho",
  [EPetGender.FEMALE]: "Fêmea",
  [EPetGender.UNKNOWN]: "Desconhecido",
};

export const ageLabels: Record<EPetAge, string> = {
  [EPetAge.PUPPY]: "Filhote",
  [EPetAge.KITTEN]: "Jovem",
  [EPetAge.ADULT]: "Adulto",
  [EPetAge.SENIOR]: "Idoso",
};

export const sizeLabels: Record<EPetSize, string> = {
  [EPetSize.SMALL]: "Pequeno",
  [EPetSize.MEDIUM]: "Médio",
  [EPetSize.LARGE]: "Grande",
};

/* --------------------------------------------------------------- *
 *  1.3  Defaults
 * --------------------------------------------------------------- */
const INITIAL_FILTERS: FiltersState = {
  species: undefined,
  breed: "",
  gender: undefined,
  age: undefined,
  size: undefined,
  vaccinated: false,
  neutered: false,
};

/* --------------------------------------------------------------- *
 *  1.4  Controller
 * --------------------------------------------------------------- */
export const useSearchPageController = () => {
  const [filters, setFilters] = useState<FiltersState>(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [pets, setPets] = useState<Pet[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>();

  /* -------- Mock fetch -------- */
  useEffect(() => {
    const t = setTimeout(() => {
      setPets(MOCK_PETS);
      setPagination({ totalPages: 5, totalItems: 100 });
    }, 400);
    return () => clearTimeout(t);
  }, [filters, page]);

  /* -------- Helpers -------- */
  const appliedFilters = useMemo(() => {
    const map: Record<string, string | undefined> = {
      species: filters.species && speciesLabels[filters.species],
      gender: filters.gender && genderLabels[filters.gender],
      age: filters.age && ageLabels[filters.age],
      size: filters.size && sizeLabels[filters.size],
      vaccinated: filters.vaccinated ? "Vacinado" : undefined,
      neutered: filters.neutered ? "Castrado" : undefined,
      breed: filters.breed || undefined,
    };

    return Object.entries(map)
      .filter(([, v]) => v)
      .map(([key, label]) => ({ key, label: label! }));
  }, [filters]);

  const updateFilter = <K extends keyof FiltersState>(
    key: K,
    value: FiltersState[K]
  ) => {
    setPage(1);
    setFilters((f) => ({ ...f, [key]: value }));
  };

  const onRemoveFilter = (key: string) => {
    if (key in INITIAL_FILTERS) {
      const typedKey = key as keyof FiltersState;
      updateFilter(typedKey, INITIAL_FILTERS[typedKey]);
    }
  };

  /* -------- Exposed -------- */
  return {
    /* data */
    pets,
    pagination,
    page,

    /* filters */
    filterProps: { filters, updateFilter },
    appliedFilters,
    onRemoveFilter,

    /* list behaviour */
    onPageChange: setPage,
    onCardClick: (pet: Pet) => console.log("click card", pet.id),
  };
};

/* --------------------------------------------------------------- *
 *  1.5  Mock data
 * --------------------------------------------------------------- */
const MOCK_PETS: Pet[] = Array.from({ length: 30 }).map((_, i) => ({
  ownerId: 1,
  id: `pet-${i + 1}`,
  name: `Pet ${i + 1}`,
  species: EPetSpecies.CAT,
  breed: "SRD",
  gender: EPetGender.UNKNOWN,
  age: EPetAge.KITTEN,
  size: EPetSize.MEDIUM,
  vaccinated: true,
  neutered: false,
  status: EPetStatus.AVAILABLE,
  createdAt: new Date(),
  updatedAt: new Date(),
  imagesUrls: [
    "https://t3.ftcdn.net/jpg/01/04/40/06/360_F_104400672_zCaPIFbYT1dXdzN85jso7NV8M6uwpKtf.jpg",
  ],
  city: "Quixadá",
  state: "CE",
  description: "Descrição fofinha do pet.",
}));
