// Page Object de la page de commande (formulaire client)
import type { Page, Locator } from '@playwright/test';
import type { Customer } from '../test-data/customers';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly total: Locator;
  readonly placeOrderButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByLabel('First name');
    this.lastNameInput = page.getByLabel('Last name');
    this.postalCodeInput = page.getByLabel('Postal code');
    this.total = page.getByTestId('checkout-total');
    this.placeOrderButton = page.getByRole('button', { name: 'Place order' });
    this.errorMessage = page.getByRole('alert');
  }

  // "customer: Customer" = cette action attend un client qui a la forme décrite dans test-data/customers.ts
  async fillCustomerInfo(customer: Customer) {
    await this.firstNameInput.fill(customer.firstName);
    await this.lastNameInput.fill(customer.lastName);
    await this.postalCodeInput.fill(customer.postalCode);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}
