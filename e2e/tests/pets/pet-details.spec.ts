import { test, expect } from '@playwright/test';
import { PetDetailsPage } from '../../pages/pets/pet-details.page';
import { SignInPage } from '../../pages/users/sign-in.page';
import { RegisterPetPage } from '../../pages/pets/register-pet.page';
import * as path from 'path';

test.describe('Detalhes do Pet', () => {
  let signInPage: SignInPage;
  let registerPetPage: RegisterPetPage;
  let petDetailsPage: PetDetailsPage;
  let petId: string;
  let petName: string;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    registerPetPage = new RegisterPetPage(page);
    petDetailsPage = new PetDetailsPage(page);

    // Primeiro, faz o login para garantir que o usuário está autenticado
    await signInPage.goto();
    await signInPage.login('nathanaaa@gmail.com', 'Nathan123');

    // Registra um pet para usar nos testes
    await signInPage.page.getByText('Cadastrar Pet').click();
    await page.waitForLoadState('networkidle');

    const imagePath = path.join(__dirname, '../../test-data/images/dog.jpg');
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    petName = `TestPet${randomNumber}`;

    await registerPetPage.fillPetForm({
      name: petName,
      species: 'dog',
      breed: 'Vira-lata',
      gender: 'male',
      age: 'adult',
      size: 'medium',
      description: 'Um cachorro para testes de detalhes',
      vaccinated: true,
      neutered: true,
      city: 'São Paulo',
      state: 'SP',
      imagePaths: [imagePath]
    });

    await registerPetPage.submitForm();
    await registerPetPage.expectSuccessfulRegistration(petName);
  });

  test('deve exibir informações básicas do pet corretamente', async () => {
    await petDetailsPage.navigateToDetails(petName);
    await petDetailsPage.expectBasicInfoVisible(petName);
  });

  test('não deve solicitar pet do proprio usuario', async () => {
    await petDetailsPage.navigateToDetails(petName);
    await petDetailsPage.requestAdoption('Olá, gostaria de adotar este pet adorável!');
    await petDetailsPage.expectAdoptionRequestSentByOwnUser();
  });

  test('deve solicitar pet de outro usuario', async () => {
    //Relogar com outro usuario
    await signInPage.goto();
    await signInPage.login('existente@amiguxus.com', 'senha123');

    // Navega para tela de Pets
    await signInPage.page.getByRole('button', { name: 'Quero adotar' }).click();

    // Navega para os detalhes do pet cadastrado
    await petDetailsPage.navigateToDetails(petName);
    await petDetailsPage.requestAdoption('Olá, gostaria de adotar este pet adorável!');
    await petDetailsPage.expectAdoptionRequestSent();
  });
});
