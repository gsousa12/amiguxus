import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/search/search.page';
import { EPetSpecies, EPetAge, EPetGender, EPetSize } from '../../../client/src/common/types/pets.enums';
import { SignInPage } from '../../pages/users/sign-in.page'

test.describe('Página de busca', () => {
  let searchPage: SearchPage;
  let signInPage: SignInPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    signInPage = new SignInPage(page);
    
    await signInPage.goto();
    await signInPage.login('nathanaaa@gmail.com', 'Nathan123');
    await page.getByText('Quero adotar').click();
    await page.waitForLoadState('networkidle');
  });

  test('deve filtrar pets por espécie', async () => {
    await searchPage.applyFilters({ species: EPetSpecies.DOG });
    await searchPage.expectFilterApplied('Cachorro');
  });

  test('deve filtrar pets por múltiplos critérios', async () => {
    await searchPage.applyFilters({
      species: EPetSpecies.CAT,
      gender: EPetGender.FEMALE,
      age: EPetAge.PUPPY,
      size: EPetSize.SMALL,
      vaccinated: true
    });

    await searchPage.expectFilterApplied('Gato');
    await searchPage.expectFilterApplied('Fêmea');
    await searchPage.expectFilterApplied('Filhote');
    await searchPage.expectFilterApplied('Pequeno');
    await searchPage.expectFilterApplied('Vacinado');
  });

  test('deve navegar para os detalhes do pet ao clicar no card', async () => {
    await searchPage.applyFilters({ species: EPetSpecies.DOG });
    // Nota: Substitua 'Nome do Pet' pelo nome real de um pet que você sabe que existe
    await searchPage.clickPetCard('Rex');
    // Verifica se redirecionou para a página de detalhes
    await expect(searchPage.page).toHaveURL('/details');
  });
});
