import { type Page, type Locator, expect } from '@playwright/test';
import { EPetSize, EPetAge, EPetGender, EPetSpecies } from '../../../client/src/common/types/pets.enums';

export class SearchPage {
  readonly page: Page;
  readonly searchFiltersPanel: Locator;
  readonly speciesFilter: Locator;
  readonly breedFilter: Locator;
  readonly genderFilter: Locator;
  readonly ageFilter: Locator;
  readonly sizeFilter: Locator;
  readonly vaccinatedFilter: Locator;
  readonly neuteredFilter: Locator;
  readonly cityFilter: Locator;
  readonly stateFilter: Locator;
  readonly petsGrid: Locator;
  readonly appliedFiltersBar: Locator;
  readonly pagination: Locator;
  readonly mobileFiltersButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchFiltersPanel = page.locator('aside').first();
    this.speciesFilter = page.locator('div').filter({ hasText: /^EspécieSelecione$/ }).getByRole('combobox');
    this.breedFilter = page.getByPlaceholder('Digite raça');
    this.genderFilter = page.locator('div').filter({ hasText: /^GêneroSelecione$/ }).getByRole('combobox');
    this.ageFilter = page.locator('div').filter({ hasText: /^IdadeSelecione$/ }).getByRole('combobox');
    this.sizeFilter = page.locator('div').filter({ hasText: /^PorteSelecione$/ }).getByRole('combobox');
    this.vaccinatedFilter = page.getByRole('checkbox', { name: 'Vacinado' });
    this.neuteredFilter = page.getByText('Castrado').locator('..').getByRole('checkbox');
    this.petsGrid = page.locator('.grid').filter({ hasText: /.*/ }).first();
    this.appliedFiltersBar = page.locator('[class*="mb-6 flex flex-wrap gap-2"]');
    this.pagination = page.getByRole('navigation');
    this.mobileFiltersButton = page.getByRole('button', { name: 'Filtros' });
  }

  async goto() {
    await this.page.goto('/search');
  }

  async applyFilters({
    species,
    breed,
    gender,
    age,
    size,
    vaccinated,
    neutered
  }: {
    species?: EPetSpecies;
    breed?: string;
    gender?: EPetGender;
    age?: EPetAge;
    size?: EPetSize;
    vaccinated?: boolean;
    neutered?: boolean;
  }) {
    if (species) {
      await this.speciesFilter.click();
      await this.page.getByRole('option', { name: species === EPetSpecies.DOG ? 'Cachorro' : 'Gato' }).click();
    }

    if (breed) {
      await this.breedFilter.fill(breed);
    }

    if (gender) {
      await this.genderFilter.click();
      const genderMap = {
        [EPetGender.MALE]: 'Macho',
        [EPetGender.FEMALE]: 'Fêmea',
        [EPetGender.UNKNOWN]: 'Desconhecido'
      };
      await this.page.getByRole('option', { name: genderMap[gender] }).click();
    }

    if (age) {
      await this.ageFilter.click();
      const ageMap = {
        [EPetAge.PUPPY]: 'Filhote',
        [EPetAge.ADULT]: 'Adulto',
        [EPetAge.SENIOR]: 'Idoso'
      };
      await this.page.getByRole('option', { name: ageMap[age] }).click();
    }

    if (size) {
      await this.sizeFilter.click();
      const sizeMap = {
        [EPetSize.SMALL]: 'Pequeno',
        [EPetSize.MEDIUM]: 'Médio',
        [EPetSize.LARGE]: 'Grande'
      };
      await this.page.getByRole('option', { name: sizeMap[size] }).click();
    }

    if (vaccinated) {
      await this.vaccinatedFilter.click();
    }

    if (neutered) {
      await this.neuteredFilter.click();
    }
  }

  async removeFilter(filterLabel: string) {
    await this.appliedFiltersBar
      .locator('button')
      .filter({ hasText: filterLabel })
      .click();
  }

  async clickPetCard(petName: string) {
    await this.petsGrid.getByText(petName).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToNextPage() {
    await this.pagination.getByRole('button', { name: 'Próxima' }).click();
  }

  async goToPreviousPage() {
    await this.pagination.getByRole('button', { name: 'Anterior' }).click();
  }

  async openMobileFilters() {
    await this.mobileFiltersButton.click();
  }

  async expectPetVisible(petName: string) {
    await expect(this.petsGrid.getByText(petName).first()).toBeVisible();
  }

  async expectNoResults() {
    await expect(this.page.getByText('Nenhum pet encontrado.')).toBeVisible();
  }

  async expectFilterApplied(filterLabel: string) {
    await expect(this.appliedFiltersBar.getByText(filterLabel)).toBeVisible();
  }

  async expectPaginationWorking() {
    const prevButton = this.pagination.getByRole('button', { name: 'Anterior' });
    const nextButton = this.pagination.getByRole('button', { name: 'Próxima' });
    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();
  }
}
