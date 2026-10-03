// =====================================================================
//  Page Object de la page de connexion
// =====================================================================
// Un Page Object = le "mode d'emploi" d'UNE page de l'application. Il contient :
//   1. OÙ sont les éléments de la page (les locators) ;
//   2. CE QU'ON PEUT Y FAIRE (les actions : ouvrir la page, se connecter...).
// Les tests s'en servent au lieu de chercher eux-mêmes les éléments.
// Si la page change (ex. le bouton "Log in" devient "Sign in"), on corrige ICI, une seule fois,
// au lieu de corriger chaque test.
//
// Règle : le Page Object sait OÙ et COMMENT ; c'est le test qui décide QUOI vérifier (les expect).

// "import type" : on importe seulement des étiquettes de type de Playwright :
//   Page    = un onglet de navigateur
//   Locator = l'adresse d'un élément dans la page
import type { Page, Locator } from '@playwright/test';

// "class" = un moule. Avec ce moule, on fabrique un objet : new LoginPage(page).
// "export" = on rend ce moule disponible pour les autres fichiers.
export class LoginPage {
  // Ce que contient l'objet (ses "propriétés"), avec leur type après les deux-points.
  // "readonly" = ne changera plus une fois l'objet fabriqué.
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  // Le "constructor" s'exécute au moment de la fabrication : new LoginPage(page).
  // "this" = "moi-même" : l'objet en train d'être fabriqué.
  constructor(page: Page) {
    this.page = page;
    // Un locator est une ADRESSE, pas l'élément lui-même : Playwright ne cherche l'élément
    // qu'au moment où on s'en sert (fill, click, expect...). On peut donc tout déclarer ici,
    // avant même que la page soit ouverte.
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.errorMessage = page.getByRole('alert');
  }

  // Une action = une "méthode". Elle est "async" car elle prend du temps :
  // le test devra donc l'appeler avec "await".
  async goto() {
    await this.page.goto('/');
  }

  // "username: string" = cette action attend un texte (string) pour le nom d'utilisateur
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
