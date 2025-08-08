import { type Page, type Locator, expect } from '@playwright/test';

export class PetDetailsPage {
  readonly page: Page;
  readonly title: Locator;
  readonly description: Locator;
  readonly carouselPrevButton: Locator;
  readonly carouselNextButton: Locator;
  readonly speciesInfo: Locator;
  readonly breedInfo: Locator;
  readonly genderInfo: Locator;
  readonly ageInfo: Locator;
  readonly sizeInfo: Locator;
  readonly locationInfo: Locator;
  readonly vaccinatedInfo: Locator;
  readonly neuteredInfo: Locator;
  readonly requestAdoptionButton: Locator;
  readonly favoriteButton: Locator;
  readonly adoptionRequestModal: Locator;
  readonly adoptionRequestMessageInput: Locator;
  readonly submitAdoptionRequestButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h2').filter({ hasText: /.*/ }).first();
    this.description = page.locator('p').filter({ hasText: /.*/ }).first();
    this.carouselPrevButton = page.getByRole('button', { name: 'Previous slide' });
    this.carouselNextButton = page.getByRole('button', { name: 'Next slide' });
    this.speciesInfo = page.getByText('Espécie').first();
    this.breedInfo = page.getByText('Raça').first();
    this.genderInfo = page.getByText('Gênero').first();
    this.ageInfo = page.getByText('Idade').first();
    this.sizeInfo = page.getByText('Porte').first();
    this.locationInfo = page.getByText('Localização').first();
    this.vaccinatedInfo = page.getByText('Vacinado').first();
    this.neuteredInfo = page.getByText('Castrado').first();
    this.requestAdoptionButton = page.getByText('Enviar requisição de adoção');
    this.favoriteButton = page.getByRole('button').filter({ hasText: /^$/ });
    this.adoptionRequestModal = page.getByRole('dialog', { name: 'Solicitação de Adoção' });
    this.adoptionRequestMessageInput = page.getByPlaceholder('Escreva sua mensagem...');
    this.submitAdoptionRequestButton = page.getByText('Enviar').last();
  }

  async navigateToDetails(petId: string) {
    await this.page.getByText(`${petId}`).click();
  }

  async navigateCarousel() {
    await this.carouselNextButton.click();
    await this.page.waitForTimeout(500);
    await this.carouselPrevButton.click();
  }

  async requestAdoption(message: string) {
    await this.requestAdoptionButton.click();
    await this.adoptionRequestModal.waitFor({ state: 'visible' });
    await this.adoptionRequestMessageInput.fill(message);
    await this.submitAdoptionRequestButton.click();
  }

  async toggleFavorite() {
    await this.favoriteButton.click();
  }

  async expectBasicInfoVisible(petName) {
    await expect(this.title).toHaveText(petName);
    await expect(this.description).toBeVisible();
    await expect(this.speciesInfo).toBeVisible();
    await expect(this.breedInfo).toBeVisible();
    await expect(this.genderInfo).toBeVisible();
    await expect(this.ageInfo).toBeVisible();
    await expect(this.sizeInfo).toBeVisible();
    await expect(this.locationInfo).toBeVisible();
    await expect(this.vaccinatedInfo).toBeVisible();
    await expect(this.neuteredInfo).toBeVisible();
  }

  async expectCarouselWorking() {
    await expect(this.carouselNextButton).toBeVisible();
    await expect(this.carouselPrevButton).toBeVisible();
  }

  async expectAdoptionRequestSent() {
    await expect(this.adoptionRequestModal).toBeHidden();
  }

  async expectAdoptionRequestSentByOwnUser() {
    await expect(this.page.getByText('Você não pode solicitar a adoção do seu próprio pet.')).toBeVisible();
  }
}
