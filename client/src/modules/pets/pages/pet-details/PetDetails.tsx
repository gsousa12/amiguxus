import { useMobileDetect } from "@/common/hooks/use-mobile-detect";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/common/components/ui/carousel";
import {
  Heart,
  Info,
  MapPin,
  PawPrint,
  ScissorsSquare,
  Syringe,
} from "lucide-react";
import { Separator } from "@/common/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/common/components/ui/card";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";
import { useEffect, useState } from "react";
import { usePetDetailsPageController } from "./pet-details-controller";
import { AlertPopUp } from "@/common/components/popups/alert-popup/AlertPopup";

/* util simples de classes */
const cn = (...c: (string | false | undefined)[]) =>
  c.filter(Boolean).join(" ");

export const PetDetailsPage = () => {
  /* -------- controller -------- */
  const { pet, isFavorite, toggleFavorite, toLabel, onRequest } =
    usePetDetailsPageController();

  /* -------- carousel state -------- */
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    /* define total e current iniciais */
    setTotal(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap());

    /* listener */
    const onSelect = () => setCurrent(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);

    /* cleanup */
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  const isMobile = useMobileDetect();

  /* =========================================================== */
  /*  JSX                                                        */
  /* =========================================================== */
  return (
    <div className="container mx-auto space-y-8 px-4 py-6">
      {/* ---------------- Carrossel ---------------- */}
      <Carousel
        setApi={setCarouselApi}
        opts={{ align: "center", loop: true }}
        className="relative w-full overflow-hidden rounded-md shadow"
      >
        <CarouselContent>
          {pet.imagesUrls.map((url: any, idx: any) => (
            <CarouselItem
              key={idx}
              className={cn(
                "flex h-[320px] sm:h-[400px] items-center justify-center transition",
                current === idx ? "" : "scale-90 blur-[2px] opacity-60"
              )}
            >
              <img
                src={url}
                alt={`${pet.name}-${idx}`}
                className="max-h-full max-w-full object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* setas */}
        <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="right-2 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>

      {/* dots */}
      {total > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <Button
              key={i}
              variant="ghost"
              size="icon"
              onClick={() => carouselApi?.scrollTo(i)}
              className={cn(
                "h-2 w-2 rounded-full p-0",
                current === i ? "bg-rose-500" : "bg-gray-300"
              )}
            />
          ))}
        </div>
      )}

      {/* -------------- Grid inferior -------------- */}
      <div
        className={cn(
          "grid gap-8",
          !isMobile && "grid-cols-[minmax(0,7fr)_minmax(0,3fr)]"
        )}
      >
        {/* -------- Informações do Pet (70 %) -------- */}
        <PetInfoSection pet={pet} toLabel={toLabel} />

        {/* -------- Card de Requisição (30 %) -------- */}
        <AdoptionRequestCard
          petName={pet.name}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onRequest={onRequest}
        />
      </div>
    </div>
  );
};

/* =============================================================== */
/*  Seção de Informações do Pet                                    */
/* =============================================================== */
const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof PawPrint;
  label: string;
  value: string | boolean;
}) =>
  value ? (
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-rose-500" />
      <span className="text-sm font-medium text-gray-800">{label}:</span>
      <span className="text-sm text-gray-700">{value}</span>
    </div>
  ) : null;

const PetInfoSection = ({
  pet,
  toLabel,
}: {
  pet: any;
  toLabel: (k: string, v: any) => string;
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
        value={toLabel("species", pet.species)}
      />
      <InfoRow icon={Info} label="Raça" value={pet.breed} />
      <InfoRow
        icon={Info}
        label="Gênero"
        value={toLabel("gender", pet.gender)}
      />
      <InfoRow icon={Info} label="Idade" value={toLabel("age", pet.age)} />
      <InfoRow icon={Info} label="Porte" value={toLabel("size", pet.size)} />
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

/* =============================================================== */
/*  Card de Requisição                                             */
/* =============================================================== */
const AdoptionRequestCard = ({
  petName,
  isFavorite,
  onToggleFavorite,
  onRequest,
}: {
  petName: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onRequest: () => void;
}) => (
  <Card className="relative rounded-md shadow">
    {/* coração */}
    <button
      onClick={onToggleFavorite}
      className="absolute right-4 top-4 rounded-full bg-rose-50 p-2 text-rose-500 hover:bg-rose-100"
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_0_0_rgba(0,0,0,0.1)] hover:cursor-pointer",
          isFavorite ? "fill-rose-500" : "fill-transparent"
        )}
      />
    </button>

    <CardHeader>
      <h3 className="text-lg font-semibold text-gray-800">
        Considerando adotar <span className="text-rose-500">{petName}</span>?
      </h3>
    </CardHeader>

    <CardContent className="space-y-4">
      <Button
        className="w-full bg-amber-400 text-white hover:bg-amber-500 hover:cursor-pointer 
        transition-all duration-150 hover:-translate-y-0.5 
        hover:shadow-[0_4px_0_0_rgba(0,0,0,0.1)]"
        onClick={onRequest}
      >
        Enviar requisição de adoção
      </Button>

      <Button
        variant="outline"
        className="w-full hover:text-rose-500 hover:cursor-pointer
        transition-all duration-150 hover:-translate-y-0.5 
        hover:shadow-[0_4px_0_0_rgba(0,0,0,0.1)]"
        onClick={() => {}}
      >
        FAQs sobre requisição de adoção
      </Button>
    </CardContent>

    <CardFooter>
      <Badge variant="secondary" className="mx-auto">
        Processo 100 % gratuito
      </Badge>
    </CardFooter>
  </Card>
);
