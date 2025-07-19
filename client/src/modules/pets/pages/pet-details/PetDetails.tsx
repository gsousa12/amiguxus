import { useMobileDetect } from "@/common/hooks/use-mobile-detect";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/common/components/ui/carousel";
import { Button } from "@/common/components/ui/button";
import { useEffect, useState } from "react";
import { usePetDetailsPageController } from "./pet-details-controller";
import { cn } from "@/common/lib/utils";
import { PetInfoSection } from "../../components/pet-info-section/PetInfoSection";
import { AdoptionRequestCard } from "../../components/adoption-request-card/AdoptionRequestCard";

export const PetDetailsPage = () => {
  const { pet, isFavorite, toggleFavorite, toLabelPetInformations, onRequest } =
    usePetDetailsPageController();

  const isMobile = useMobileDetect();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    setTotal(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap());

    const onSelect = () => setCurrent(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  return (
    <div className="container mx-auto space-y-8 px-4 py-6">
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

        <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="right-2 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>

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

      <div
        className={cn(
          "grid gap-8",
          !isMobile && "grid-cols-[minmax(0,7fr)_minmax(0,3fr)]"
        )}
      >
        <PetInfoSection
          pet={pet}
          toLabelPetInformations={toLabelPetInformations}
        />
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
