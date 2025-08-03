import { test, expect } from '@playwright/test';
import { SignInPage } from '../../pages/users/sign-in.page';

test.describe('Login', () => {
  let signInPage: SignInPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    await signInPage.goto();
  });

  test('deve realizar login com sucesso usando credenciais válidas', async () => {
    await signInPage.login('nathanaaa@gmail.com', 'Nathan123');
    await signInPage.expectSuccessfulLogin();
  });

  test('deve exibir erro ao tentar login com senha incorreta', async () => {
    await signInPage.login('usuario.teste@amiguxus.com', 'senhaerrada');
    await signInPage.expectErrorMessage('E-mail ou senha inválidos.');
  });

  test('deve exibir erro ao tentar login com email não cadastrado', async () => {
    await signInPage.login('naoexiste@amiguxus.com', 'senha123');
    await signInPage.expectErrorMessage('E-mail ou senha inválidos.');
  });

  test('deve validar campos obrigatórios vazios', async ({ page }) => {
    await signInPage.signInButton.click();
    
    const emailError = page.getByText('Digite um e-mail válido.');
    const passwordError = page.getByText('Mínimo 6 caracteres.');
    
    await expect(emailError).toBeVisible();
    await expect(passwordError).toBeVisible();
  });

  test('deve alternar visibilidade da senha', async () => {
    await signInPage.passwordInput.fill('senha123');
    
    await signInPage.togglePasswordVisibility();
    await expect(signInPage.passwordInput).toHaveAttribute('type', 'text');
    
    await signInPage.togglePasswordVisibility();
    await expect(signInPage.passwordInput).toHaveAttribute('type', 'password');
  });
});
