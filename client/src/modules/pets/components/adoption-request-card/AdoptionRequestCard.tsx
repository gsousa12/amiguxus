import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/common/components/ui/card";
import { cn } from "@/common/lib/utils";
import { Heart } from "lucide-react";

export const AdoptionRequestCard = ({
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
