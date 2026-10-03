# Demo Shop

Une mini-boutique en ligne et ses tests automatisés Playwright.
C'est le projet d'équipe du **Git Dojo** : Badr et Claude y travaillent ensemble pour s'entraîner au travail en équipe avec Git.

## L'équipe

- Claude

## Lancer le projet

```bash
npm install                     # installe les bibliothèques
npx playwright install chromium # installe le navigateur des tests
npm test                        # lance les tests
npm run app                     # lance la boutique sur http://localhost:3000
```

## La pipeline

À chaque envoi sur `main` et à chaque Pull Request, GitHub Actions lance les tests sur une machine Linux.
Le résultat est dans l'onglet **Actions** du dépôt : ✅ vert si tout passe, ❌ rouge sinon.

## Les règles de l'équipe

Voir [CONTRIBUTING.md](CONTRIBUTING.md).
