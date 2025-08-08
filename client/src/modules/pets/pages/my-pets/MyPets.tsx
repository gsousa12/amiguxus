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
import {
  Info,
  X,
  Check,
  Mail,
  Phone,
  MapPin,
  MessageSquareHeart,
  User2,
} from "lucide-react";

type AdoptionRequestUser = {
  id: string;
  full_name: string;
  city: string;
  email: string;
  phone: string;
  state: string;
};

type AdoptionRequest = {
  id: string;
  pet_id: string;
  request_user_id: string;
  status: "pending" | "approved" | "rejected";
  message: string | null;
  created_at: string;
  updated_at: string;
  user: AdoptionRequestUser;
};

type PetWithRequests = Pet & {
  adoptionRequests?: AdoptionRequest[];
};

type GetMyPetsRequest = {
  page: number;
};

export const getMyPetsDispatch = async (
  request: GetMyPetsRequest
): Promise<PaginatedApiResponse<PetWithRequests[]>> => {
  const { page } = request;

  const response = await api.get("/pets/get-my-pets", {
    params: { page },
    withCredentials: true,
  });

  return response.data;
};

export const getMyPetsQuery = (request: GetMyPetsRequest) => {
  return useQuery<PaginatedApiResponse<PetWithRequests[]>>({
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
  switch (age) {
    case "puppy":
      return "Filhote";
    case "adult":
      return "Adulto";
    case "senior":
      return "Sênior";
    default:
      return formatTitle(String(age));
  }
}

function formatSize(size: EPetSize) {
  switch (size) {
    case "small":
      return "Pequeno";
    case "medium":
      return "Médio";
    case "large":
      return "Grande";
    default:
      return formatTitle(String(size));
  }
}

function DayString(date: string | Date) {
  try {
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR");
  } catch {
    return "";
  }
}

const RequestStatusChip: React.FC<{ status: AdoptionRequest["status"] }> = ({
  status,
}) => {
  const map: Record<
    AdoptionRequest["status"],
    { label: string; classes: string }
  > = {
    pending: {
      label: "Pendente",
      classes: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
    },
    approved: {
      label: "Aprovada",
      classes:
        "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    },
    rejected: {
      label: "Recusada",
      classes: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
    },
  };
  const v = map[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${v.classes}`}
    >
      {v.label}
    </span>
  );
};

const AdoptionRequestsModal: React.FC<{
  pet: PetWithRequests;
  onClose: () => void;
}> = ({ pet, onClose }) => {
  const requests = pet.adoptionRequests ?? [];

  const handleAccept = (reqId: string) => {
    console.log(`Aceitar solicitação ${reqId}`);
  };

  const handleReject = (reqId: string) => {
    console.log(`Rejeitar solicitação ${reqId}`);
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="requests-title"
    >
      <div className="relative w-full max-w-2xl rounded-3xl border border-rose-100 bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 rounded-full p-2 text-rose-700 hover:bg-rose-50"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2
              id="requests-title"
              className="text-lg font-semibold text-gray-900"
            >
              Solicitações de adoção — {pet.name}
            </h2>
            <p className="mt-0.5 text-sm text-gray-600">
              Confira as mensagens e os dados de contato dos interessados.
            </p>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-sm font-semibold text-rose-700 ring-1 ring-rose-200 whitespace-nowrap">
            <span>{requests.length}</span>
            <span>
              {requests.length === 1 ? "solicitação" : "solicitações"}
            </span>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="grid min-h-[180px] place-items-center rounded-2xl border border-rose-100 bg-rose-50/40 p-6 text-center">
            <div className="text-5xl">🐾</div>
            <p className="mt-2 text-sm text-gray-700">
              Ainda não há solicitações para este pet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2">
                    <MessageSquareHeart className="h-5 w-5 text-rose-700" />
                    <span className="text-sm font-medium text-gray-900">
                      Solicitação
                    </span>
                  </div>
                  <RequestStatusChip status={req.status} />
                </div>

                {req.message ? (
                  <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-900/90">
                    “{req.message}”
                  </p>
                ) : (
                  <p className="rounded-md bg-rose-50 p-3 text-sm text-rose-900/70 italic">
                    Sem mensagem.
                  </p>
                )}

                <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
                  <div className="inline-flex items-center gap-2">
                    <User2 className="h-4 w-4 text-rose-600" />
                    <span className="font-medium">{req.user.full_name}</span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-rose-600" />
                    <span>
                      {req.user.city} - {req.user.state}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4 text-rose-600" />
                    <a
                      href={`mailto:${req.user.email}`}
                      className="text-rose-700 underline decoration-rose-200 underline-offset-4 hover:text-rose-800"
                    >
                      {req.user.email}
                    </a>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4 text-rose-600" />
                    <a
                      href={`tel:${req.user.phone}`}
                      className="text-rose-700 underline decoration-rose-200 underline-offset-4 hover:text-rose-800"
                    >
                      {req.user.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleReject(req.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-rose-300 bg-white px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300"
                  >
                    <X className="h-4 w-4" />
                    Recusar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAccept(req.id)}
                    className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  >
                    <Check className="h-4 w-4" />
                    Aceitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PetCard: React.FC<{
  pet: PetWithRequests;
  onOpenDetails: (pet: PetWithRequests) => void;
}> = ({ pet, onOpenDetails }) => {
  const img = pet.images_urls?.[0];
  const requestCount = pet.adoptionRequests?.length ?? 0;

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

        {requestCount > 0 ? (
          <div className="absolute left-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-rose-600/90 px-2 py-1 text-xs font-semibold text-white shadow">
            <MessageSquareHeart className="h-3.5 w-3.5" />
            {requestCount} {requestCount === 1 ? "solicitação" : "solicitações"}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => onOpenDetails(pet)}
          title="Ver detalhes de solicitações"
          aria-label="Ver detalhes de solicitações"
          className="absolute right-3 bottom-3 inline-flex items-center 
          justify-center rounded-full bg-white/90 p-2 text-rose-700 shadow transition 
          hover:bg-rose-50 hover:cursor-pointer"
        >
          <Info className="h-5 w-5" />
        </button>
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
  const [selectedPet, setSelectedPet] = React.useState<PetWithRequests | null>(
    null
  );

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
      {/* Decorações fofas ao fundo */}
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
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700">
              <span className="text-rose-500">❤️</span>
              Seus Pets cadastrados
            </div>
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
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold
               text-white shadow-sm transition hover:bg-rose-700 focus:outline-none 
               focus:ring-2 focus:ring-rose-400 hover:cursor-pointer "
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
                Você ainda não cadastrou nenhum amiguxo.
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
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onOpenDetails={(p) => setSelectedPet(p)}
                />
              ))}
            </section>

            {/* Paginação */}
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

        {/* Modal */}
        {selectedPet ? (
          <AdoptionRequestsModal
            pet={selectedPet}
            onClose={() => setSelectedPet(null)}
          />
        ) : null}
      </div>
    </main>
  );
};
