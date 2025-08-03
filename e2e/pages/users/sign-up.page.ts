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
  readonly signInLink: Locator;
  readonly successMessage: Locator;
  readonly errorMessageDifferentPasswords: Locator;
  readonly errorMessageInvalidPhoneNumber: Locator;
  readonly errorMessageEmailAlreadyExists: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder('Seu nome');
    this.emailInput = page.getByPlaceholder('exemplo@email.com');
    this.phoneInput = page.getByPlaceholder('(99) 99999-9999');
    this.cityInput = page.getByPlaceholder('Sua cidade');
    this.stateSelect = page.locator('select[aria-hidden="true"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.confirmPasswordInput = page.locator('input[name="confirmPassword"]');
    this.showPasswordButton = page.locator('div').filter({ hasText: /^Senha$/ }).getByRole('button');
    this.showConfirmPasswordButton = page.locator('div').filter({ hasText: /^Confirmar senha$/ }).getByRole('button');
    this.signUpButton = page.locator('form').getByRole('button', { name: 'Cadastrar' })
    this.signInLink = page.getByRole('button', { name: 'Clique aqui para entrar!' });
    this.errorMessageInvalidPhoneNumber = page.getByText('Telefone inválido.');
    this.errorMessageDifferentPasswords = page.getByText('Senhas diferentes.');
    this.successMessage = page.getByText('Cadastro concluído com sucesso.');
    this.errorMessageEmailAlreadyExists = page.getByText('Já existe um usuário registrado com esse email.');
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
    await this.page.waitForLoadState('networkidle');
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
