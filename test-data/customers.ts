// Données d'un client fictif pour les tests de commande.
//
// "type" = une étiquette TypeScript qui décrit la FORME d'une donnée :
// ici, un client a un prénom, un nom et un code postal, tous des textes (string).
// Si on oublie un champ ou qu'on se trompe de nom, VS Code le souligne en rouge.
export type Customer = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export const customer: Customer = {
  firstName: 'Jane',
  lastName: 'Doe',
  postalCode: '75001',
};
