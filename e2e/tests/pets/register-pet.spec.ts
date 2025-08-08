import { test, expect } from '@playwright/test';
import { RegisterPetPage } from '../../pages/pets/register-pet.page';
import * as path from 'path';
import { SignInPage } from '../../pages/users/sign-in.page';

test.describe('Cadastro de Pet', () => {
  let signInPage: SignInPage;
  let registerPetPage: RegisterPetPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);
    registerPetPage = new RegisterPetPage(page);

    // Primeiro, faz o login para garantir que o usuário está autenticado
    await signInPage.goto();
    await signInPage.login('nathanaaa@gmail.com', 'Nathan123');

    // Após o login, navega para a página de cadastro de pet
    await signInPage.page.getByText('Cadastrar Pet').click();
    await page.waitForLoadState('networkidle');
  });

  test('deve cadastrar um cachorro com sucesso', async () => {
    const imagePath = path.join(__dirname, '../../test-data/images/dog.jpg');
    
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    const petName = `Rex${randomNumber}`;

    await registerPetPage.fillPetForm({
      name: petName,
      species: 'dog',
      breed: 'Vira-lata',
      gender: 'male',
      age: 'adult',
      size: 'medium',
      description: 'Um cachorro muito dócil e brincalhão',
      vaccinated: true,
      neutered: true,
      city: 'São Paulo',
      state: 'SP',
      imagePaths: [imagePath]
    });

    await registerPetPage.submitForm();
    await registerPetPage.expectSuccessfulRegistration(petName);
  });

  test('deve cadastrar um gato com sucesso', async ( {page} ) => {
    const imagePath = path.join(__dirname, '../../test-data/images/cat.jpg');
    
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    const petName = `Luna${randomNumber}`;

    await registerPetPage.fillPetForm({
      name: petName,
      species: 'cat',
      gender: 'female',
      age: 'puppy',
      size: 'small',
      description: 'Uma gatinha muito carinhosa',
      vaccinated: false,
      neutered: false,
      city: 'Rio de Janeiro',
      state: 'RJ',
      imagePaths: [imagePath]
    });

    await registerPetPage.submitForm();
    await registerPetPage.expectSuccessfulRegistration(petName);
  });

  test('deve validar campos obrigatórios', async ( {page} ) => {
    await registerPetPage.submitForm();

    await expect(page.getByText('A descrição precisa de mais detalhes')).toBeVisible();
    await expect(page.getByText('O nome deve ter no mínimo 3 caracteres.')).toBeVisible();
    await expect(page.getByText('Espécie é obrigatória.')).toBeVisible();
    await expect(page.getByText('Gênero é obrigatório.')).toBeVisible();
    await expect(page.getByText('Idade é obrigatória.', { exact: true })).toBeVisible();
    await expect(page.getByText('Porte é obrigatório.')).toBeVisible();
    await expect(page.getByText('Cidade é obrigatória.')).toBeVisible();
    await expect(page.getByText('Estado deve ter 2 letras (UF).')).toBeVisible();
  });

  test('deve validar upload de imagens', async () => {
    await registerPetPage.fillPetForm({
      name: 'Bob',
      species: 'dog',
      gender: 'male',
      age: 'adult',
      size: 'large',
      description: 'Animal maluco de teste',
      vaccinated: false,
      neutered: false,
      city: 'Curitiba',
      state: 'PR'
    });

    await registerPetPage.submitForm();
    await registerPetPage.expectValidationError('É necessário enviar pelo menos uma foto');
  });

  test('deve permitir múltiplas imagens', async () => {
    const imagePaths = [
      path.join(__dirname, '../../test-data/images/pet1.jpg'),
      path.join(__dirname, '../../test-data/images/pet2.jpg'),
      path.join(__dirname, '../../test-data/images/pet3.jpg')
    ];
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    const petName = `Nina${randomNumber}`;
    await registerPetPage.fillPetForm({
      name: petName,
      species: 'cat',
      gender: 'female',
      age: 'senior',
      size: 'medium',
      description: 'Animal maluco de teste',
      vaccinated: true,
      neutered: true,
      city: 'Salvador',
      state: 'BA',
      imagePaths
    });

    await registerPetPage.submitForm();
    await registerPetPage.expectSuccessfulRegistration(petName);
  });
});
