# Demo Shop

![Tests Playwright](https://github.com/CHAOS36/git-dojo/actions/workflows/ci.yml/badge.svg)

Une mini-boutique en ligne et ses tests automatisés Playwright.
C'est le projet d'équipe du **Git Dojo** : Badr et Claude y travaillent ensemble pour s'entraîner au travail en équipe avec Git.

## L'équipe

- Badr
- Claude

## Lancer le projet

```bash
npm install                     # installe les bibliothèques
npx playwright install chromium # installe le navigateur des tests
npm test                        # lance les tests
npx playwright test tests/01-login.spec.ts  # lance un seul fichier de tests
npm run app                     # lance la boutique sur http://localhost:3000
```

## La pipeline

À chaque envoi sur `main` et à chaque Pull Request, GitHub Actions lance les tests sur une machine Linux.
Le résultat est dans l'onglet **Actions** du dépôt : ✅ vert si tout passe, ❌ rouge sinon.

## Les règles de l'équipe

Voir [CONTRIBUTING.md](CONTRIBUTING.md).
