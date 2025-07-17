import { SelectField } from "../select-field/SelectField";
import { TextField } from "../text-field/TextField";
import { CheckboxField } from "../checkbox-field/CheckBoxField";
import {
  ageLabels,
  genderLabels,
  sizeLabels,
  speciesLabels,
} from "../../pages/search-page/search-page-controller";

export const FiltersPanel: React.FC<any> = ({
  filters,
  updateFilter,
  className = "",
}) => (
  <aside className={`space-y-6 ${className}`}>
    <SelectField
      label="Espécie"
      value={filters.species}
      options={speciesLabels}
      onChange={(v) => updateFilter("species", v)}
    />

    <TextField
      label="Raça"
      value={filters.breed}
      onChange={(v) => updateFilter("breed", v)}
    />

    <SelectField
      label="Gênero"
      value={filters.gender}
      options={genderLabels}
      onChange={(v) => updateFilter("gender", v)}
    />

    <SelectField
      label="Idade"
      value={filters.age}
      options={ageLabels}
      onChange={(v) => updateFilter("age", v)}
    />

    <SelectField
      label="Porte"
      value={filters.size}
      options={sizeLabels}
      onChange={(v) => updateFilter("size", v)}
    />

    <CheckboxField
      label="Vacinado"
      checked={filters.vaccinated}
      onChange={(v) => updateFilter("vaccinated", v)}
    />
    <CheckboxField
      label="Castrado"
      checked={filters.neutered}
      onChange={(v) => updateFilter("neutered", v)}
    />
  </aside>
);
