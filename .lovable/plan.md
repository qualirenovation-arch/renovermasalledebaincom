# Promotion sécurisée du premier administrateur

## Objectif
Permettre la promotion du premier administrateur de manière sécurisée.

## Solution implémentée

### Authentification requise

La fonction `setup-first-admin` exige maintenant que l'utilisateur soit authentifié :

1. L'utilisateur crée un compte via `/admin/login` (inscription)
2. L'utilisateur se connecte
3. L'utilisateur appelle la fonction avec son token JWT
4. La fonction valide le JWT et promeut l'utilisateur connecté en admin

### Sécurité multicouche

1. **Authentification JWT** : Seuls les utilisateurs connectés peuvent appeler la fonction
2. **Protection "premier uniquement"** : Si un admin existe déjà, la fonction refuse toute exécution
3. **Auto-promotion** : L'utilisateur ne peut promouvoir que lui-même (pas d'email arbitraire)

### Utilisation

```typescript
// L'utilisateur doit être connecté
const { data, error } = await supabase.functions.invoke('setup-first-admin');
// Aucun paramètre requis - utilise l'utilisateur authentifié
```

## Étapes pour promouvoir qualirenovation@gmail.com

1. Aller sur `/admin/login`
2. S'inscrire avec `qualirenovation@gmail.com`
3. Se connecter
4. Appeler la fonction (via console ou bouton dédié)
5. Le rôle admin est attribué automatiquement
