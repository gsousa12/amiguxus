import { Pet } from "@/common/types/pets.entity";
import { Heart } from "lucide-react";

export const PetsGrid = ({
  pets,
  onCardClick,
}: {
  pets: Pet[];
  onCardClick: (pet: Pet) => void;
}) => (
  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {pets.map((pet) => (
      <PetCard key={pet.id} pet={pet} onClick={() => onCardClick(pet)} />
    ))}
  </div>
);

const PetCard = ({ pet, onClick }: { pet: Pet; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="group relative h-72 cursor-pointer overflow-hidden rounded-lg shadow transition hover:-translate-y-1"
  >
    {/* Imagem */}
    <img
      src={pet.imagesUrls[0]}
      alt={pet.name}
      className="h-full w-full object-cover"
    />

    {/* Overlay gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

    {/* Coração */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        /* TODO: favorite */
      }}
      className="absolute right-2 top-2 rounded-full bg-white/80 p-1 text-rose-500 backdrop-blur hover:bg-white"
    >
      <Heart className="h-5 w-5" />
    </button>

    {/* Info */}
    <div className="absolute bottom-0 w-full p-3 text-white">
      <p className="text-lg font-semibold">{pet.name}</p>
      <p className="line-clamp-2 text-xs">{pet.description}</p>
      <p className="mt-1 text-xs opacity-80">
        {pet.city} – {pet.state.toUpperCase()}
      </p>
    </div>
  </div>
);
