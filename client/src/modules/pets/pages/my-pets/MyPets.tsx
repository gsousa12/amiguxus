import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/common/api/axios";
import { PaginatedApiResponse } from "@/common/api/interfaces/pagination.interfaces";
import { Pet } from "@/common/types/pets.entity";
import {
  EPetAge,
  EPetSize,
  EPetSpecies,
  EPetStatus,
} from "@/common/types/pets.enums";

type GetMyPetsRequest = {
  page: number;
};

export const getMyPetsDispatch = async (
  request: GetMyPetsRequest
): Promise<PaginatedApiResponse<Pet[]>> => {
  const { page } = request;

  const response = await api.get("/pets/get-my-pets", {
    params: { page },
    withCredentials: true,
  });

  return response.data;
};

export const getMyPetsQuery = (request: GetMyPetsRequest) => {
  return useQuery<PaginatedApiResponse<Pet[]>>({
    queryKey: ["myPets", request],
    queryFn: () => getMyPetsDispatch(request),
    placeholderData: (prev) => prev,
  });
};

const speciesEmoji: Record<EPetSpecies, string> = {
  dog: "🐶",
  cat: "🐱",
};

const statusBadge: Record<EPetStatus, { label: string; classes: string }> = {
  available: {
    label: "Disponível",
    classes:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  },
  adopted: {
    label: "Adotado",
    classes: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
  },
};

function formatTitle(text?: string | null) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatAge(age: EPetAge) {
  const map: Record<EPetAge, string> = {
    puppy: "Filhote",
    kitten: "Jovem",
    adult: "Adulto",
    senior: "Sênior",
  };
  return map[age];
}

function formatSize(size: EPetSize) {
  const map: Record<EPetSize, string> = {
    small: "Pequeno",
    medium: "Médio",
    large: "Grande",
  };
  return map[size];
}

function DayString(date: string | Date) {
  try {
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR");
  } catch {
    return "";
  }
}
const PetCard: React.FC<{ pet: Pet }> = ({ pet }) => {
  const img = pet.images_urls?.[0];

  return (
    <div className="group overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative">
        {img ? (
          <img
            src={img}
            alt={pet.name}
            className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-rose-50 text-5xl">
            <span>{speciesEmoji[pet.species]}</span>
          </div>
        )}

        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-rose-700 shadow">
          <span>{speciesEmoji[pet.species]}</span>
          <span>{formatTitle(pet.breed) || "Sem raça definida"}</span>
        </div>

        <div
          className={`absolute right-3 top-3 rounded-full px-2 py-1 text-xs font-semibold shadow ${
            statusBadge[pet.status].classes
          }`}
        >
          {statusBadge[pet.status].label}
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
          <span className="text-xs text-gray-500">
            {DayString(pet.created_at)}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-gray-600">
          {pet.description || "Sem descrição adicionada."}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-md bg-rose-50 px-2 py-1 text-rose-800">
            Idade: <span className="font-semibold">{formatAge(pet.age)}</span>
          </div>
          <div className="rounded-md bg-rose-50 px-2 py-1 text-rose-800">
            Porte: <span className="font-semibold">{formatSize(pet.size)}</span>
          </div>
          <div className="rounded-md bg-rose-50 px-2 py-1 text-rose-800">
            Vac.:{" "}
            <span className="font-semibold">
              {pet.vaccinated ? "Sim ✅" : "Não ❌"}
            </span>
          </div>
          <div className="rounded-md bg-rose-50 px-2 py-1 text-rose-800">
            Castr.:{" "}
            <span className="font-semibold">
              {pet.neutered ? "Sim ✅" : "Não ❌"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs text-gray-600">
          <span className="inline-flex items-center gap-1">
            📍 {pet.city}, {pet.state}
          </span>
          <span className="inline-flex items-center gap-1">
            {pet.gender === "male" ? "♂️ Macho" : "♀️ Fêmea"}
          </span>
        </div>
      </div>
    </div>
  );
};
export const MyPetsPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);

  const { data, isLoading, isError, refetch, isFetching } = getMyPetsQuery({
    page,
  });

  const total = data?.meta.total ?? 0;
  const currentPage = data?.meta.currentPage ?? page;
  const lastPage = data?.meta.lastPage ?? 1;
  const hasPrev = data?.meta.hasPreviousPage ?? page > 1;
  const hasNext = data?.meta.hasNextPage ?? page < lastPage;

  return (
    <main className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-b from-rose-50 to-white px-4 py-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="absolute left-6 top-8 text-6xl opacity-10 motion-safe:animate-bounce">
          🐶
        </span>
        <span className="absolute right-10 top-24 text-5xl opacity-10 motion-safe:animate-bounce">
          🐱
        </span>
        <span className="absolute left-10 bottom-16 text-7xl opacity-10 motion-safe:animate-pulse">
          🐾
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-6 flex flex-col items-start justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Meus Pets
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Aqui você encontra todos os pets cadastrados por você.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isFetching ? (
              <div className="rounded-full bg-white/70 px-3 py-1 text-xs text-rose-700 ring-1 ring-rose-200 backdrop-blur">
                Atualizando lista...
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              + Cadastrar novo pet
            </button>
          </div>
        </header>

        {isLoading ? (
          <section className="grid min-h-[40vh] place-items-center"></section>
        ) : isError ? (
          <section className="grid min-h-[40vh] place-items-center">
            <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 text-center shadow-sm">
              <div className="mb-2 text-5xl">😿</div>
              <h2 className="text-lg font-semibold text-gray-900">
                Não foi possível carregar seus pets
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Verifique sua conexão e tente novamente.
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => refetch()}
                  className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
                >
                  Tentar novamente
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="rounded-lg border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  Cadastrar pet
                </button>
              </div>
            </div>
          </section>
        ) : (data?.data?.length ?? 0) === 0 ? (
          <section className="grid min-h-[40vh] place-items-center">
            <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-white p-6 text-center shadow-sm">
              <div className="mb-2 text-6xl">🐾</div>
              <h2 className="text-lg font-semibold text-gray-900">
                Você ainda não cadastrou pets
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Comece agora e ajude um amigo peludo a encontrar um lar.
              </p>
              <button
                onClick={() => navigate("/register")}
                className="mt-4 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                Cadastrar meu primeiro pet
              </button>
            </div>
          </section>
        ) : (
          <>
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data?.data.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </section>
            <nav className="mt-8 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Total:{" "}
                <span className="font-semibold text-rose-700">{total}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!hasPrev}
                  className={`rounded-lg px-3 py-2 text-sm font-medium ring-1 ring-rose-200 transition ${
                    hasPrev
                      ? "bg-white text-rose-700 hover:bg-rose-50"
                      : "cursor-not-allowed bg-gray-50 text-gray-400"
                  }`}
                >
                  ← Anterior
                </button>
                <span className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-800 ring-1 ring-rose-200">
                  Página {currentPage} de {lastPage}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!hasNext}
                  className={`rounded-lg px-3 py-2 text-sm font-medium ring-1 ring-rose-200 transition ${
                    hasNext
                      ? "bg-white text-rose-700 hover:bg-rose-50"
                      : "cursor-not-allowed bg-gray-50 text-gray-400"
                  }`}
                >
                  Próxima →
                </button>
              </div>
            </nav>
          </>
        )}
      </div>
    </main>
  );
};
