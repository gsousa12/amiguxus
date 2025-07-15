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
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: PaginationProps) => {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const pageSize = 10;
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4">
      {/* Mostrando itens visíveis */}
      <div className="text-sm text-muted-foreground">
        Mostrando {(currentPage - 1) * pageSize + 1} -{" "}
        {totalPages !== 0 ? Math.min(currentPage * pageSize, totalItems) : 1} de{" "}
        {totalItems} itens
      </div>

      {/* Controles de paginação */}
      <div className="flex items-center gap-2">
        {/* Botão primeira página */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={!canGoPrevious}
          className="hidden sm:flex hover:cursor-pointer"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Botão página anterior */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious}
          className="hover:cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Indicador de página */}
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">
            Página {currentPage} de {totalPages !== 0 ? totalPages : 1}
          </span>
        </div>

        {/* Botão próxima página */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext}
          className="hover:cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Botão última página */}
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
