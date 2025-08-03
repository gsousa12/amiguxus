import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number; // <-- Adicione a prop
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  perPage,
}: PaginationProps) => {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4">
      <div className="text-sm text-muted-foreground">
        {/* Use 'perPage' aqui */}
        Mostrando {(currentPage - 1) * perPage + 1} -{" "}
        {totalPages !== 0 ? Math.min(currentPage * perPage, totalItems) : 1} de{" "}
        {totalItems} itens
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={!canGoPrevious}
          className="hidden sm:flex hover:cursor-pointer"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className="hover:cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">
            Página {currentPage} de {totalPages !== 0 ? totalPages : 1}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="hover:cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={!canGoNext}
          className="hidden sm:flex hover:cursor-pointer"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
