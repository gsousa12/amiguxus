import { useMemo, useState } from "react";
import {
  EPetAge,
  EPetGender,
  EPetSize,
  EPetSpecies,
} from "@/common/types/pets.enums";
import { Pet } from "@/common/types/pets.entity";
import { getPetListQuery } from "@/common/api/queries/search/pets-queries";

export interface FiltersState {
  species?: EPetSpecies;
  breed: string;
  gender?: EPetGender;
  age?: EPetAge;
  size?: EPetSize;
  vaccinated: boolean;
  neutered: boolean;
}
interface PaginationInfo {
  totalPages: number;
  totalItems: number;
}

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

const INITIAL_FILTERS: FiltersState = {
  species: undefined,
  breed: "",
  gender: undefined,
  age: undefined,
  size: undefined,
  vaccinated: false,
  neutered: false,
};

export const mapFiltersToQuery = (f: FiltersState) => ({
  species: f.species,
  breed: f.breed || undefined,
  gender: f.gender,
  age: f.age,
  size: f.size,
  vaccinated: f.vaccinated ? "true" : undefined,
  neutered: f.neutered ? "true" : undefined,
});

export const useSearchPageController = () => {
  const [filters, setFilters] = useState<FiltersState>(INITIAL_FILTERS);
  const [page, setPage] = useState(1);

  const {
    data: petListData,
    isPending,
    isFetching,
  } = getPetListQuery({
    page,
    ...mapFiltersToQuery(filters),
  });

  const pets: Pet[] = petListData?.data ?? [];

  const pagination: PaginationInfo | undefined = petListData?.pagination;

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

  return {
    pets,
    pagination,
    page,
    isLoading: isPending || isFetching,
    filterProps: { filters, updateFilter },
    appliedFilters,
    onRemoveFilter,
    onPageChange: setPage,
    onCardClick: (pet: Pet) => console.log("click card", pet.id),
  };
};
