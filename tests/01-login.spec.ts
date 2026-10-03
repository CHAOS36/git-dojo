// =====================================================================
//  01 - Tests de la page de connexion (version Page Object + fixtures)
// =====================================================================
// Chaque test suit toujours la recette AAA : Préparer (Arrange), Agir (Act), Vérifier (Assert).
// Ce qui a changé par rapport à la première version :
//   - les tests ne cherchent plus eux-mêmes les éléments de la page ;
//   - ils demandent la fixture "loginPage" et utilisent ses actions : goto(), login(...) ;
//   - les locators sont rangés dans pages/LoginPage.ts : UN SEUL endroit à corriger si la page change.

// On importe "test" et "expect" depuis NOS fixtures (fixtures/pages.ts), plus depuis Playwright directement
import { test, expect } from '../fixtures/pages';
import { users } from '../test-data/users';

test.describe('Login page', () => {

  // Avant chaque test : ouvrir la page de connexion.
  // { loginPage } = on demande à Playwright le Page Object de la page de connexion.
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // CAS NOMINAL ("happy path") : tout se passe bien
  test('a standard user can log in', async ({ loginPage, productsPage, page }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/products/);
    await expect(productsPage.heading).toBeVisible();
  });

  // CAS D'ERREUR (tests "négatifs") : l'application doit refuser proprement
  test('a wrong password shows an error message', async ({ loginPage, page }) => {
    await loginPage.login(users.standard.username, 'wrong-password');

    await expect(loginPage.errorMessage).toHaveText('Invalid username or password');
    await expect(page).not.toHaveURL(/products/);
  });

  test('a locked user cannot log in', async ({ loginPage }) => {
    await loginPage.login(users.locked.username, users.locked.password);

    await expect(loginPage.errorMessage).toHaveText('This user is locked out');
  });

  test('an empty form asks for the username', async ({ loginPage }) => {
    // '' = texte vide : on laisse les deux champs vides
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toHaveText('Username is required');
  });

  // Test écrit par Badr (exercice 3), réécrit avec le Page Object
  test('a missing password shows an error message', async ({ loginPage }) => {
    await loginPage.login(users.standard.username, '');

    await expect(loginPage.errorMessage).toHaveText('Password is required');
  });
});
