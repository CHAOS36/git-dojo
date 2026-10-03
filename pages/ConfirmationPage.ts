// Page Object de la page de confirmation de commande
import type { Page, Locator } from '@playwright/test';

export class ConfirmationPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly orderSummary: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Thank you for your order!' });
    this.orderSummary = page.getByTestId('order-summary');
  }
}
