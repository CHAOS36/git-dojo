// Page Object de la page des produits (même principe que LoginPage.ts)
import type { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly sortSelect: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Products' });
    // getByTestId : cherche l'attribut data-testid="..." que les développeurs posent exprès pour les tests
    this.productCards = page.getByTestId('product-card');
    this.productNames = page.getByTestId('product-name');
    this.productPrices = page.getByTestId('product-price');
    this.sortSelect = page.getByLabel('Sort by');
    this.cartBadge = page.getByTestId('cart-badge');
    this.cartLink = page.getByRole('link', { name: 'Cart' });
  }

  // La carte d'UN produit : parmi toutes les cartes, celle qui contient ce nom.
  // Cette méthode n'agit pas sur la page : elle RENVOIE une adresse (": Locator").
  productCard(name: string): Locator {
    return this.productCards.filter({ hasText: name });
  }

  async addToCart(name: string) {
    await this.productCard(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFromCart(name: string) {
    await this.productCard(name).getByRole('button', { name: 'Remove' }).click();
  }

  // Choisir un tri par le texte affiché dans la liste, ex. sortBy('Price (low to high)')
  async sortBy(optionText: string) {
    await this.sortSelect.selectOption({ label: optionText });
  }

  async openCart() {
    await this.cartLink.click();
  }
}
