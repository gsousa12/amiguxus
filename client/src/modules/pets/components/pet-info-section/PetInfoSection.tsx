import { Separator } from "@/common/components/ui/separator";
import { Pet } from "@/common/types/pets.entity";
import { Info, MapPin, PawPrint, ScissorsSquare, Syringe } from "lucide-react";
import { InfoRow } from "../info-row/InfoRow";

export const PetInfoSection = ({
  pet,
  toLabelPetInformations,
}: {
  pet: Pet;
  toLabelPetInformations: (k: string, v: any) => string;
}) => (
  <section className="space-y-4">
    <h2 className="flex items-center gap-2 text-2xl font-semibold text-rose-500">
      <PawPrint className="h-7 w-7" />
      {pet.name}
    </h2>

    <p className="text-gray-700">{pet.description}</p>

    <Separator />

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <InfoRow
        icon={Info}
        label="Espécie"
        value={toLabelPetInformations("species", pet.species)}
      />
      <InfoRow icon={Info} label="Raça" value={pet.breed} />
      <InfoRow
        icon={Info}
        label="Gênero"
        value={toLabelPetInformations("gender", pet.gender)}
      />
      <InfoRow
        icon={Info}
        label="Idade"
        value={toLabelPetInformations("age", pet.age)}
      />
      <InfoRow
        icon={Info}
        label="Porte"
        value={toLabelPetInformations("size", pet.size)}
      />
      <InfoRow
        icon={Syringe}
        label="Vacinado"
        value={pet.vaccinated ? "Sim" : "Não"}
      />
      <InfoRow
        icon={ScissorsSquare}
        label="Castrado"
        value={pet.neutered ? "Sim" : "Não"}
      />
      <InfoRow
        icon={MapPin}
        label="Localização"
        value={`${pet.city} – ${pet.state.toUpperCase()}`}
      />
    </div>
  </section>
);
