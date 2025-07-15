/* ---------- Sidebar (desktop) ---------- */
export const FiltersPanel: React.FC<FilterProps> = ({
  filters,
  updateFilter,
  className = "",
}) => (
  <aside className={`space-y-6 ${className}`}>
    {/* Espécie */}
    <SelectField
      label="Espécie"
      value={filters.species}
      options={speciesLabels}
      onChange={(v) => updateFilter("species", v)}
    />

    {/* Raça */}
    <TextField
      label="Raça"
      value={filters.breed}
      onChange={(v) => updateFilter("breed", v)}
    />

    {/* Gênero */}
    <SelectField
      label="Gênero"
      value={filters.gender}
      options={genderLabels}
      onChange={(v) => updateFilter("gender", v)}
    />

    {/* Idade */}
    <SelectField
      label="Idade"
      value={filters.age}
      options={ageLabels}
      onChange={(v) => updateFilter("age", v)}
    />

    {/* Porte */}
    <SelectField
      label="Porte"
      value={filters.size}
      options={sizeLabels}
      onChange={(v) => updateFilter("size", v)}
    />

    {/* Checkboxes */}
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

/* ---------- Mobile Button + Sheet ---------- */
import { SlidersHorizontal } from "lucide-react";
import {
  ageLabels,
  FilterProps,
  genderLabels,
  sizeLabels,
  speciesLabels,
} from "../../pages/search-page/search-page-controller";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/common/components/ui/sheet";
import { Button } from "@/common/components/ui/button";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import { Checkbox } from "@/common/components/ui/checkbox";

export const MobileFiltersButton: React.FC<FilterProps> = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="mb-4 md:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4 text-rose-500" />
          Filtros
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-6">
        <FiltersPanel {...props} />
      </SheetContent>
    </Sheet>
  );
};

/* ---------- Auxiliares UI ---------- */
const SelectField = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: any;
  options: Record<string, string>;
  onChange: (v: any) => void;
}) => (
  <div className="space-y-2">
    <p className="text-sm font-medium text-gray-800">{label}</p>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(options).map(([val, lab]) => (
          <SelectItem key={val} value={val}>
            {lab}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const TextField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-2">
    <p className="text-sm font-medium text-gray-800">{label}</p>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border px-3 py-2 text-sm"
      placeholder={`Digite ${label.toLowerCase()}`}
    />
  </div>
);

const CheckboxField = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <label className="flex items-center gap-2 text-gray-800">
    <Checkbox checked={checked} onCheckedChange={(val) => onChange(!!val)} />
    {label}
  </label>
);
