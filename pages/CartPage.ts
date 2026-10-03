// Page Object de la page du panier
import type { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly total: Locator;
  readonly emptyMessage: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Your cart' });
    this.items = page.getByTestId('cart-item');
    this.itemNames = page.getByTestId('item-name');
    this.total = page.getByTestId('cart-total');
    this.emptyMessage = page.getByText('Your cart is empty.');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  // Retirer un produit : dans la ligne qui contient ce nom, cliquer sur "Remove"
  async removeItem(name: string) {
    await this.items.filter({ hasText: name }).getByRole('button', { name: 'Remove' }).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
