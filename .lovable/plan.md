
## Pourquoi découper

Génération séquentielle des 533 JPG → ~3200 variantes AVIF+WebP. Même parallélisé (concurrence 6), ça reste ~25-40 min de calcul ininterrompu, mal adapté au format conversationnel (les commandes longues meurent, l'avancement n'est pas visible côté toi, et tu ne peux rien valider entre temps).

Mieux : on traite par lots thématiques, tu valides visuellement chaque lot, et si un rendu ne te plaît pas (qualité AVIF trop agressive par ex.) on ajuste **avant** d'avoir gaspillé 30 min sur 500 images.

## Étape 1 — Câblage `<Picture>` partout (sans regénérer d'images)

Aujourd'hui seul `ProjetDetail.tsx` utilise `<Picture>`. Les autres pages affichent encore les `<img src={importedJpg}>` classiques → même avec les variantes générées, elles servent le JPG lourd.

À faire : remplacer les `<img>` par `<Picture>` dans les 15 fichiers qui importent des assets :
- `Index.tsx`, `About.tsx`, `Avis.tsx`, `Devis.tsx`, `Partenaires.tsx`, `Presse.tsx`, `Photographe.tsx`, `MentionsLegales.tsx`
- `VisuelsHouzz.tsx`, `VisuelsInstagramHighlights.tsx`
- `Footer.tsx`, `Recompenses.tsx`, `QRSlideshow.tsx`
- `GuideInfrastructureSections.tsx`, `GuideDetailsSections.tsx`

Durée : ~15 min. Gain : aucun avant qu'on génère les variantes, mais une fois fait c'est branché.

## Étape 2 — Lot 1 : pages hot (homepage, guides, about)

Optimiser uniquement les images de ces pages (~80-120 images). Tu valides visuellement la homepage et 1-2 guides après. Si OK, on continue.

Durée calcul : ~6 min. Gain mesurable immédiatement sur le LCP de la home.

## Étape 3 — Lot 2 : albums portfolio (le gros morceau)

~400 images réparties sur ~30 albums. On lance le batch parallélisé en arrière-plan et on revient checker quelques albums au hasard.

Durée calcul : ~20-25 min en tâche de fond pendant qu'on fait autre chose.

## Étape 4 — Lot 3 : reliquat (presse, partenaires, divers)

~50-80 images. Court, ~5 min. Cleanup final.

## Question annexe à trancher après l'étape 1

Le repo reste à **727 MB de JPG sources**. Deux options pour la suite :

- **A. Garder les JPG en local** (fallback navigateurs très anciens, simple)
- **B. Migrer les 533 JPG vers le CDN Lovable Assets** après l'étape 4 (repo → ~5 MB, déploiements 100× plus rapides)

Recommandation : **B**, mais on en reparle quand tout sera converti et validé visuellement.

## Détails techniques

- Script existant `scripts/optimize-images.mjs` déjà parallélisé (concurrence 6)
- Idempotent : skip si la variante existe déjà → relancer ne refait rien
- Composant `<Picture>` déjà prêt avec srcset 400/800/1200/1600 et fallback JPG automatique
- Qualité actuelle : AVIF q60, WebP q75 — à ajuster si tu trouves le rendu trop dégradé

## Prochaine action si tu valides

Je démarre l'**étape 1** (câblage `<Picture>` partout). Aucune image à régénérer, donc rapide et tu vois la mécanique se mettre en place. Les variantes déjà générées (Boulogne + quelques galleries) deviendront actives immédiatement sur les pages concernées.
