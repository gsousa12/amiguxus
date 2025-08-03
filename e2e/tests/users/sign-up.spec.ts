import { test, expect } from '@playwright/test';
import { SignUpPage } from '../../pages/users/sign-up.page';

test.describe('Cadastro', () => {
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await signUpPage.goto();
  });

  test('deve realizar cadastro com sucesso usando dados válidos', async () => {
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    await signUpPage.fillForm({
      name: 'Usuário Teste',
      email: `usuarioteste${randomNumber}@amixugos.com`,
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
    await expect(signUpPage.errorMessageEmailAlreadyExists).toBeVisible();
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

  test('deve alternar visibilidade das senhas', async () => {
    await signUpPage.passwordInput.fill('senha123');
    await signUpPage.confirmPasswordInput.fill('senha123');

    await signUpPage.togglePasswordVisibility();
    await expect(signUpPage.passwordInput).toHaveAttribute('type', 'text');

    await signUpPage.toggleConfirmPasswordVisibility();
    await expect(signUpPage.confirmPasswordInput).toHaveAttribute('type', 'text');
  });
});
