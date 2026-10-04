# Les règles de l'équipe

1. **Avant de commencer à travailler, récupère le travail des autres** (Pull).
2. **Des petits commits, un seul sujet par commit.** Plus facile à relire, à comprendre et à annuler.
3. **Messages de commit** : `type: description courte, en anglais`

   | Type | Quand |
   |---|---|
   | `feat` | une nouvelle fonctionnalité |
   | `fix` | une correction de bug |
   | `test` | des tests ajoutés ou modifiés |
   | `docs` | de la documentation |
   | `ci` | la pipeline |
   | `chore` | l'entretien (dépendances, configuration) |

   Exemple : `docs: add Badr to the team`
4. **Avant d'envoyer (Push), les tests passent sur ton PC** : `npm test`.
5. **Après l'envoi, vérifie que la pipeline est verte** (onglet Actions sur GitHub).
6. **Jamais de « force push » sur `main`** : il écrase le travail des autres.
7. **Perdu ? Demande avant de forcer quoi que ce soit.**
8. **Une branche par sujet.**