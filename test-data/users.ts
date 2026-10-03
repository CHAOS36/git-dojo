// Les comptes de test de la mini-boutique (les mêmes que dans app/data/users.json).
// "export" = on rend cette donnée disponible pour les autres fichiers (qui feront "import").
//
// Dans un vrai projet, un mot de passe n'est jamais écrit en dur dans le code :
// il vient d'une variable d'environnement ou des "secrets" de la CI.
export const users = {
  standard: { username: 'standard_user', password: 'demo-shop-2026' },
  locked: { username: 'locked_user', password: 'demo-shop-2026' },
};
