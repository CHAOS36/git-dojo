// =====================================================================
//  Fixtures : ce que Playwright prépare pour chaque test
// =====================================================================
// Tu connais déjà la fixture "page" : un onglet neuf que Playwright donne à chaque test.
// Ici, on ajoute nos propres fixtures : un Page Object pour chaque page de la boutique.
// Un test pourra alors écrire :   async ({ loginPage, productsPage }) => { ... }
// au lieu de fabriquer lui-même chaque objet avec "new LoginPage(page)".
// Playwright ne fabrique que les fixtures que le test demande.

import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ConfirmationPage } from '../pages/ConfirmationPage';

// La liste de nos nouvelles fixtures, avec leur type
type ShopPages = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  confirmationPage: ConfirmationPage;
};

// Notre "test" = le test de Playwright (renommé "base") + nos fixtures.
// Pour chaque fixture : on prend l'onglet "page", on fabrique le Page Object,
// puis use(...) le donne au test ("voici l'objet, le test peut commencer").
export const test = base.extend<ShopPages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  confirmationPage: async ({ page }, use) => {
    await use(new ConfirmationPage(page));
  },
});

// On ré-exporte "expect" pour que les tests importent tout depuis ce seul fichier
export { expect } from '@playwright/test';
