import { type Page, type Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  // Elementos principais
  readonly cityBadge: Locator;
  readonly title: Locator;
  readonly description: Locator;
  readonly academicTag: Locator;

  // Botões de ação
  readonly adoptButton: Locator;
  readonly registerPetButton: Locator;
  readonly donateButton: Locator;

  // Elementos visuais
  readonly pawPrints: Locator;
  readonly petAnimations: Locator;
  readonly dogIllustration: Locator;

  // Cards de funcionalidades
  readonly featuresGrid: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Elementos principais
    this.cityBadge = page.locator('.bg-rose-100').filter({ hasText: 'Conectando corações em Crateús-CE' });
    this.title = page.getByRole('heading', { name: 'Amiguxus Crateús' });
    this.description = page.locator('p').filter({ hasText: 'Encontre ou doe um amigo peludo' });
    this.academicTag = page.locator('p.bg-rose-50').filter({ hasText: 'Projeto acadêmico' });

    // Botões de ação
    this.adoptButton = page.getByRole('button', { name: 'Quero adotar' });
    this.registerPetButton = page.getByRole('button', { name: 'Cadastrar pet' });
    this.donateButton = page.getByRole('button', { name: 'Fazer doação' });

    // Elementos visuais
    this.pawPrints = page.locator('span').filter({ hasText: '🐾' });
    this.petAnimations = page.locator('div.animate-bounce, div.animate-pulse');
    this.dogIllustration = page.locator('div').filter({ has: page.locator('svg') }).first();

    // Grid de funcionalidades
    this.featuresGrid = page.locator('.mt-6.grid.grid-cols-3');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async clickAdoptButton() {
    await this.adoptButton.click();
    await this.page.waitForURL('/search');
  }

  async clickRegisterPetButton() {
    await this.registerPetButton.click();
    await this.page.waitForURL('/register');
  }

  async clickDonateButton() {
    await this.donateButton.click();
    await this.page.waitForURL('/donations');
  }

  featureCard(text: string): Locator {
    return this.featuresGrid.locator('div').filter({ hasText: text });
  }
}
