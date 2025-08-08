import { type Page, type Locator, expect } from '@playwright/test';

export class SignInPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly showPasswordButton: Locator;
  readonly signInButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly createAccountLink: Locator;
  readonly errorMessageInvalidEmailOrPassword: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('seu@email.com');
    this.passwordInput = page.getByPlaceholder('●●●●●●');
    this.showPasswordButton = page.getByRole('button', { name: /mostrar senha|ocultar senha/i });
    this.signInButton = page.locator('form').getByRole('button', { name: 'Entrar' });
    this.forgotPasswordLink = page.getByRole('button', { name: 'Esqueci minha senha' });
    this.createAccountLink = page.getByRole('button', { name: 'Clique aqui para criar uma!' });
    this.errorMessageInvalidEmailOrPassword = page.getByText('E-mail ou senha inválidos.');
  }

  async goto() {
    await this.page.goto('/sign-in');
    await this.page.waitForLoadState('networkidle');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async togglePasswordVisibility() {
    await this.showPasswordButton.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async clickCreateAccount() {
    await this.createAccountLink.click();
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessageInvalidEmailOrPassword).toBeVisible();
  }

  async expectSuccessfulLogin() {
    await expect(this.page).toHaveURL('/home');
  }
}
