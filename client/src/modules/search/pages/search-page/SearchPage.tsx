import { SearchPageWrapper } from "@/modules/home/components/search-page-wrapper/SearchPageWrapper";
import { useSearchPageController } from "./search-page-controller";
import { AppliedFiltersBar } from "../../components/applied-filters-bar/AppliedFiltersBar";
import { PetsGrid } from "../../components/pets-grid/PetsGrid";
import { Pagination } from "@/common/components/pagination/Pagination";
import { FiltersPanel } from "../../components/filters-panel/FiltersPanel";
import { MobileFiltersButton } from "../../components/mobile-filters-button/MobileFiltersButton";

export const SearchPage = () => {
  const ctrl = useSearchPageController();

  return (
    <SearchPageWrapper>
      <div className="flex gap-8">
        <FiltersPanel
          className="hidden w-1/4 max-w-xs md:block"
          {...ctrl.filterProps}
        />

        <div className="flex-1">
          <MobileFiltersButton {...ctrl.filterProps} />

          <AppliedFiltersBar
            applied={ctrl.appliedFilters}
            onRemove={ctrl.onRemoveFilter}
          />

          {ctrl.isLoading ? (
            <></>
          ) : ctrl.pets.length === 0 ? (
            <p className="py-10 text-center text-gray-500">
              Nenhum pet encontrado.
            </p>
          ) : (
            <PetsGrid pets={ctrl.pets} onCardClick={ctrl.onCardClick} />
          )}

          <Pagination
            currentPage={ctrl.page}
            totalPages={ctrl.pagination ? ctrl.pagination.totalPages : 1}
            totalItems={ctrl.pagination ? ctrl.pagination.totalItems : 0}
            perPage={ctrl.pagination ? ctrl.pagination.perPage : 20}
            onPageChange={ctrl.onPageChange}
          />
        </div>
      </div>
    </SearchPageWrapper>
  );
};
