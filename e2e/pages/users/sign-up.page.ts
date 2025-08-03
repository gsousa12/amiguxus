import { type Page, type Locator, expect } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly cityInput: Locator;
  readonly stateSelect: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly showPasswordButton: Locator;
  readonly showConfirmPasswordButton: Locator;
  readonly signUpButton: Locator;
  readonly errorMessageInvalidPhoneNumber: Locator;
  readonly signInLink: Locator;
  readonly errorMessageDifferentPasswords: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder('Seu nome');
    this.emailInput = page.getByPlaceholder('exemplo@email.com');
    this.phoneInput = page.getByPlaceholder('(99) 99999-9999');
    this.cityInput = page.getByPlaceholder('Sua cidade');
    this.stateSelect = page.locator('select[aria-hidden="true"]');
    this.passwordInput = page.getByPlaceholder('●●●●●●').first();
    this.confirmPasswordInput = page.getByPlaceholder('●●●●●●').last();
    this.showPasswordButton = page.getByRole('button', { name: /mostrar senha/i }).first();
    this.showConfirmPasswordButton = page.getByRole('button', { name: /mostrar senha/i }).last();
    this.signUpButton = page.locator('form').getByRole('button', { name: 'Cadastrar' })
    this.signInLink = page.getByRole('button', { name: 'Clique aqui para entrar!' });
    this.errorMessageInvalidPhoneNumber = page.getByText('Telefone inválido.');
    this.errorMessageDifferentPasswords = page.getByText('Senhas diferentes.');
    this.successMessage = page.getByText('Cadastro concluído com sucesso.');
  }

  async goto() {
    await this.page.goto('/sign-up');
  }

  async fillForm({
    name,
    email,
    phone,
    city,
    state,
    password,
    confirmPassword
  }: {
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    password: string;
    confirmPassword: string;
  }) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
    await this.cityInput.fill(city);
    await this.stateSelect.selectOption(state);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async submit() {
    await this.signUpButton.click();
  }

  async togglePasswordVisibility() {
    await this.showPasswordButton.click();
  }

  async toggleConfirmPasswordVisibility() {
    await this.showConfirmPasswordButton.click();
  }

  async clickSignIn() {
    await this.signInLink.click();
  }

  async expectSuccessMessage() {
    await expect(this.successMessage).toBeVisible();
  }

  async expectRedirectToSignIn() {
    await expect(this.page).toHaveURL('/sign-in');
  }
}
