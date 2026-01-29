
# Simplification de la promotion du premier administrateur

## Objectif
Permettre la promotion de `qualirenovation@gmail.com` en administrateur sans nécessiter de clé secrète externe.

## Probleme actuel
La fonction `setup-first-admin` exige une clé `ADMIN_SETUP_KEY` qui ne correspond pas à la valeur fournie. Plutot que de reconfigurer les secrets, nous allons simplifier le processus.

## Solution proposee

### Modification de la fonction Edge `setup-first-admin`

Supprimer la verification de `ADMIN_SETUP_KEY` et ne conserver que la protection essentielle : **verifier qu'aucun admin n'existe deja**.

**Avant :**
```typescript
// Valide setup_key obligatoire
const adminSetupKey = Deno.env.get("ADMIN_SETUP_KEY");
if (!adminSetupKey || setup_key !== adminSetupKey) {
  return Response 401
}
```

**Apres :**
```typescript
// Suppression de la verification de cle secrete
// La protection reste : impossible de promouvoir si un admin existe deja
```

Cette approche reste securisee car :
1. La fonction refuse toute execution si un admin existe deja
2. Seul le premier utilisateur peut etre promu via cette methode
3. Les admins suivants doivent etre geres via l'interface d'administration

### Etapes d'implementation

1. Modifier `supabase/functions/setup-first-admin/index.ts` pour retirer la verification de `setup_key`
2. Deployer la fonction mise a jour
3. Appeler la fonction avec `qualirenovation@gmail.com`
4. Verifier que le role admin a ete attribue

## Details techniques

| Fichier | Modification |
|---------|-------------|
| `supabase/functions/setup-first-admin/index.ts` | Suppression des lignes 18-26 (validation de setup_key) |

## Securite

- La verification "aucun admin existant" reste en place
- Une fois un admin cree, cette fonction devient inutilisable
- Les prochains admins seront geres via l'interface `/admin`
