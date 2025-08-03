import { test, expect } from '@playwright/test';
import { SignUpPage } from '../../pages/users/sign-up.page';

test.describe('Cadastro', () => {
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.goto();
  });

  test('deve realizar cadastro com sucesso usando dados válidos', async () => {
    await signUpPage.fillForm({
      name: 'Usuário Teste',
      email: 'usuario.teste@amiguxus.com',
      phone: '(85) 99999-9999',
      city: 'Fortaleza',
      state: 'Ceará',
      password: 'senha123',
      confirmPassword: 'senha123'
    });

    await signUpPage.submit();
    await signUpPage.expectSuccessMessage();
    await signUpPage.expectRedirectToSignIn();
  });

  test('deve exibir erro ao tentar cadastro com email existente', async () => {
    await signUpPage.fillForm({
      name: 'Usuário Teste',
      email: 'existente@amiguxus.com',
      phone: '(85) 99999-9999',
      city: 'Fortaleza',
      state: 'CE',
      password: 'senha123',
      confirmPassword: 'senha123'
    });

    await signUpPage.submit();
    await signUpPage.expectErrorMessage('Já existe um usuário registrado com esse email.');
  });

  test('deve validar senhas diferentes', async () => {
    await signUpPage.fillForm({
      name: 'Usuário Teste',
      email: 'usuario.teste@amiguxus.com',
      phone: '(85) 99999-9999',
      city: 'Fortaleza',
      state: 'CE',
      password: 'senha123',
      confirmPassword: 'senha456'
    });

    await signUpPage.submit();
    await expect(signUpPage.errorMessageDifferentPasswords).toBeVisible();
  });

  test('deve validar formato do telefone menor que 11 dígitos', async () => {
    await signUpPage.phoneInput.fill('8591234567');
    await expect(signUpPage.errorMessageInvalidPhoneNumber).toBeVisible();
  });

  test('deve validar campos obrigatórios', async () => {
    await signUpPage.submit();
    
    await expect(signUpPage.nameInput).toHaveAttribute('aria-invalid', 'true');
    await expect(signUpPage.emailInput).toHaveAttribute('aria-invalid', 'true');
    await expect(signUpPage.phoneInput).toHaveAttribute('aria-invalid', 'true');
    await expect(signUpPage.cityInput).toHaveAttribute('aria-invalid', 'true');
    await expect(signUpPage.stateSelect).toHaveAttribute('aria-invalid', 'true');
    await expect(signUpPage.passwordInput).toHaveAttribute('aria-invalid', 'true');
    await expect(signUpPage.confirmPasswordInput).toHaveAttribute('aria-invalid', 'true');
  });

  test('deve alternar visibilidade das senhas', async () => {
    await signUpPage.passwordInput.fill('senha123');
    await signUpPage.confirmPasswordInput.fill('senha123');

    await signUpPage.togglePasswordVisibility();
    await expect(signUpPage.passwordInput).toHaveAttribute('type', 'text');

    await signUpPage.toggleConfirmPasswordVisibility();
    await expect(signUpPage.confirmPasswordInput).toHaveAttribute('type', 'text');
  });

  test('deve navegar para página de login', async ({ page }) => {
    await signUpPage.clickSignIn();
    await expect(page).toHaveURL('/sign-in');
  });
});
