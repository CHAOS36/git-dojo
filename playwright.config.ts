// Réglages de Playwright : ce fichier est lu à chaque "npx playwright test".
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Dossier où Playwright cherche les fichiers de test (ceux qui finissent par .spec.ts)
  testDir: './tests',

  fullyParallel: true,

  // Un seul navigateur à la fois sur le PC (mémoire limitée), réglage automatique dans la pipeline
  workers: process.env.CI ? undefined : 1,

  // Dans la pipeline (CI) : refuser un "test.only" oublié, et relancer 2 fois un test échoué
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  // Rapports : une liste dans le terminal + un rapport HTML (npm run report pour l'ouvrir)
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  // Un seul navigateur pour l'équipe : Chromium (le moteur de Chrome et Edge)
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],

  // Playwright démarre la mini-boutique avant les tests et l'arrête après
  webServer: {
    command: 'node app/server.js',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
