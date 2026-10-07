// =====================================================================
//  02 - Parcours d'achat (tests "de bout en bout", en anglais "end-to-end" ou "E2E")
// =====================================================================
// On suit le chemin complet d'un client :
//   connexion -> produits -> panier -> commande -> confirmation.
// Grâce aux Page Objects, chaque test se lit presque comme une phrase.

import { test, expect } from '../fixtures/pages';
import { users } from '../test-data/users';
import { customer } from '../test-data/customers';

test.describe('Purchase', () => {

  // PRÉPARER, commun à tous les tests du groupe : se connecter
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    // On vérifie qu'on est bien arrivé avant de continuer (sinon, inutile d'aller plus loin)
    await expect(productsPage.heading).toBeVisible();
  });

  // CAS NOMINAL : acheter deux produits
  test('a user can buy two products', async ({ productsPage, cartPage, checkoutPage, confirmationPage }) => {
    // 1. Ajouter deux produits : le badge du panier affiche 2
    await productsPage.addToCart('Backpack');
    await productsPage.addToCart('Bike Light');
    await expect(productsPage.cartBadge).toHaveText('2');

    // 2. Le panier contient ces deux produits (liste vérifiée d'un coup, dans l'ordre)
    //    et le total est bon : 24.99 + 7.49 = 32.48
    await productsPage.openCart();
    await expect(cartPage.itemNames).toHaveText(['Backpack', 'Bike Light']);
    await expect(cartPage.total).toHaveText('$32.48');

    // 3. Commander
    await cartPage.checkout();
    await checkoutPage.fillCustomerInfo(customer);
    await expect(checkoutPage.total).toHaveText('$32.48');
    await checkoutPage.placeOrder();

    // 4. La confirmation s'affiche, avec le bon récapitulatif
    await expect(confirmationPage.heading).toBeVisible();
    await expect(confirmationPage.orderSummary).toContainText('2 item(s), total $32.48');
  });

  test('removing products updates the cart', async ({ productsPage, cartPage }) => {
    await productsPage.addToCart('Backpack');
    await productsPage.addToCart('Sunglasses');
    await productsPage.openCart();

    // Retirer un produit : il disparaît et le total baisse
    await cartPage.removeItem('Backpack');
    await expect(cartPage.itemNames).toHaveText(['Sunglasses']);
    await expect(cartPage.total).toHaveText('$19.99');

    // Retirer le dernier : panier vide, et plus de bouton "Checkout"
    await cartPage.removeItem('Sunglasses');
    await expect(cartPage.emptyMessage).toBeVisible();
    await expect(cartPage.checkoutButton).toBeHidden();
  });

  // CAS D'ERREUR : le formulaire de commande refuse un code postal manquant
  test('checkout requires a postal code', async ({ page, productsPage, cartPage, checkoutPage }) => {
    await productsPage.addToCart('Backpack');
    await productsPage.openCart();
    await cartPage.checkout();

    // "...customer" = copie toutes les infos du client, puis on remplace le code postal par un texte vide
    await checkoutPage.fillCustomerInfo({ ...customer, postalCode: '' });
    await checkoutPage.placeOrder();

    await expect(checkoutPage.errorMessage).toHaveText('Postal code is required');
    await expect(page).toHaveURL(/checkout/);
  });
});
