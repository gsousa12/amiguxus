import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home/home.page';
import { SignInPage } from '../../pages/users/sign-in.page'; 

test.describe('Página inicial', () => {
  let homePage: HomePage;
  let signInPage: SignInPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signInPage = new SignInPage(page);

    await signInPage.goto();
    await signInPage.login('nathanaaa@gmail.com', 'Nathan123');
  });

  test('deve exibir os elementos principais da página', async () => {
    // Badge da cidade
    await expect(homePage.cityBadge).toContainText('Conectando corações em Crateús-CE');
    
    // Título e descrição
    await expect(homePage.title).toHaveText('Amiguxus Crateús');
    await expect(homePage.description).toContainText('Encontre ou doe um amigo peludo');
    
    // Tag acadêmica
    await expect(homePage.academicTag).toContainText('Projeto acadêmico da Universidade Federal do Ceará');
  });

  test('deve exibir os cards de funcionalidades', async () => {
    const expectedFeatures = [
      { text: 'Cadastro de Pets' },
      { text: 'Busca e Filtros' },
      { text: 'Contato Direto' }
    ];

    for (const feature of expectedFeatures) {
      await expect(homePage.featureCard(feature.text)).toBeVisible();
    }
  });
  
  test('deve exibir elementos visuais decorativos', async () => {
    // Patinhas decorativas
    await expect(homePage.pawPrints).toHaveCount(3);
    
    // Animações de pets
    await expect(homePage.petAnimations).toHaveCount(2);
    
    // Ilustração do cachorro
    await expect(homePage.dogIllustration).toBeVisible();
  });

  test('deve ter navegação funcional pelos botões de ação', async () => {
    // Botão de adotar
    await homePage.clickAdoptButton();
    await expect(homePage.page).toHaveURL('/search');
    
    await homePage.goto();
    
    // Botão de cadastrar pet
    await homePage.clickRegisterPetButton();
    await expect(homePage.page).toHaveURL('/register');
    
    await homePage.goto();
    
    // Botão de doar
    await homePage.clickDonateButton();
    await expect(homePage.page).toHaveURL('/donations');
  });
});