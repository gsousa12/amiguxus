import { type Page, type Locator, expect } from '@playwright/test';

export class RegisterPetPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly speciesSelect: Locator;
  readonly breedInput: Locator;
  readonly genderSelect: Locator;
  readonly ageSelect: Locator;
  readonly sizeSelect: Locator;
  readonly descriptionTextarea: Locator;
  readonly vaccinatedSwitch: Locator;
  readonly neuteredSwitch: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly submitButton: Locator;
  readonly imageUploader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder('Ex: Fofinho');
    this.speciesSelect = page.getByRole('combobox', { name: 'Espécie' });
    this.breedInput = page.getByPlaceholder('Ex: Vira-lata');
    this.genderSelect = page.getByText('Selecione').first();
    this.ageSelect = page.getByRole('combobox', { name: 'Idade' });
    this.sizeSelect = page.getByRole('combobox', { name: 'Porte' });
    this.descriptionTextarea = page.getByPlaceholder('Conte um pouco sobre o pet...');
    this.vaccinatedSwitch = page.getByText('Vacinado?').locator('..').getByRole('switch');
    this.neuteredSwitch = page.getByText('Castrado?').locator('..').getByRole('switch');
    this.cityInput = page.getByPlaceholder('Ex: São Paulo');
    this.stateInput = page.getByPlaceholder('Ex: SP');
    this.submitButton = page.getByRole('button', { name: 'Cadastrar Pet' }).last();
    this.imageUploader = page.locator('input[type="file"]');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async fillPetForm({
    name,
    species,
    breed,
    gender,
    age,
    size,
    description,
    vaccinated,
    neutered,
    city,
    state,
    imagePaths = []
  }: {
    name: string;
    species: 'dog' | 'cat';
    breed?: string;
    gender: 'male' | 'female' | 'unknown';
    age: 'puppy' | 'adult' | 'senior';
    size: 'small' | 'medium' | 'large';
    description: string;
    vaccinated: boolean;
    neutered: boolean;
    city: string;
    state: string;
    imagePaths?: string[];
  }) {
    if (imagePaths.length > 0) {
      await this.imageUploader.setInputFiles(imagePaths);
    }

    await this.nameInput.fill(name);
    await this.speciesSelect.click();

    if (species === 'dog') {
        await this.page.getByRole('option', { name: 'Cachorro' }).click();
    } else if (species === 'cat') {
        await this.page.getByRole('option', { name: 'Gato'}).click();
    } else {
        throw new Error('Espécie informada é inválida')
    }
    
    if (breed) {
      await this.breedInput.fill(breed);
    }

    await this.genderSelect.click();
    if (gender === 'male') {
        await this.page.getByRole('option', { name: 'Macho' }).click();
    } else if (gender === 'female') {
        await this.page.getByRole('option', { name: 'Fêmea'}).click();
    } else if (gender === 'unknown') {
        await this.page.getByRole('option', { name: 'Não sei'}).click();
    } else {
        throw new Error('Genero informado é inválido')
    }

    await this.ageSelect.click();
    if (age === 'puppy') {
        await this.page.getByRole('option', { name: 'Filhote' }).click();
    } else if (age === 'adult') {
        await this.page.getByRole('option', { name: 'Adulto'}).click();
    } else if (age === 'senior') {
        await this.page.getByRole('option', { name: 'Idoso'}).click();
    } else {
        throw new Error('Idade informada é inválida')
    }

    await this.sizeSelect.click();
    if (size === 'small') {
        await this.page.getByRole('option', { name: 'Pequeno' }).click();
    } else if (size === 'medium') {
        await this.page.getByRole('option', { name: 'Médio'}).click();
    } else if (size === 'large') {
        await this.page.getByRole('option', { name: 'Grande'}).click();
    } else {
        throw new Error('Tamanho informado é inválido')
    }

    if (description) {
      await this.descriptionTextarea.fill(description);
    }

    if (vaccinated) {
      await this.vaccinatedSwitch.click();
    }

    if (neutered) {
      await this.neuteredSwitch.click();
    }

    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
  }

  async submitForm() {
    await this.submitButton.click( {force: true} );
  }

  async expectSuccessfulRegistration(petName: string) {
    await this.page.getByRole('button', { name: 'Gatos' }).click();
    await this.page.getByRole('link', { name: 'Encontrar todos os gatos' }).click();

    await expect(this.page.getByText(petName)).toBeVisible();
  }

  async expectValidationError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
