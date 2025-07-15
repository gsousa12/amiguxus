import { SearchPageWrapper } from "@/modules/home/components/search-page-wrapper/SearchPageWrapper";
import { useSearchPageController } from "./search-page-controller";
import {
  FiltersPanel,
  MobileFiltersButton,
} from "../../components/filters-panel/FiltersPanel";
import { AppliedFiltersBar } from "../../components/applied-filters-bar/AppliedFiltersBar";
import { PetsGrid } from "../../components/pets-grid/PetsGrid";
import { Pagination } from "@/common/components/pagination/Pagination";

export const SearchPage = () => {
  const ctrl = useSearchPageController();

  return (
    <SearchPageWrapper>
      {/* -------- Layout -------- */}
      <div className="flex gap-8">
        {/* Sidebar (desktop) */}
        <FiltersPanel
          className="hidden md:block w-1/4 max-w-xs"
          {...ctrl.filterProps}
        />

        {/* Conteúdo principal */}
        <div className="flex-1">
          {/* Botão de filtros (mobile) */}
          <MobileFiltersButton {...ctrl.filterProps} />

          {/* Badges */}
          <AppliedFiltersBar
            applied={ctrl.appliedFilters}
            onRemove={ctrl.onRemoveFilter}
          />

          {/* Grid de cards */}
          <PetsGrid pets={ctrl.pets} onCardClick={ctrl.onCardClick} />

          {/* Paginação */}
          <Pagination
            currentPage={ctrl.page}
            totalPages={ctrl.pagination?.totalPages ?? 1}
            totalItems={ctrl.pagination?.totalItems ?? 0}
            onPageChange={ctrl.onPageChange}
          />
        </div>
      </div>
    </SearchPageWrapper>
  );
};
