// Redirections 301 des anciennes URLs vers les nouvelles URLs SEO-friendly
// Format: ancienSlug -> nouveauSlug

export const redirectMap: Record<string, string> = {
  // ========== PARIS 3ÈME ==========
  "projet-paris-3-temple-bois-noir": "salle-de-bain-paris-3-style-masculin-bois-noir",
  
  // ========== PARIS 5ÈME ==========
  "projet-paris-5-buffon-neo-art-deco": "salle-de-bain-paris-5-neo-art-deco",
  
  // ========== SURESNES 92 ==========
  "projet-suresnes-rue-des-puits-terrazzo": "salle-de-bain-suresnes-92-vie-en-bleu",
  
  // ========== PARIS 10ÈME ==========
  "projet-paris-10-canal-saint-martin-masculin": "salle-de-bain-paris-10-canal-saint-martin-style-masculin",
  "projet-paris-10-faubourg-saint-denis-noir-marbre": "salle-de-bain-paris-10-faubourg-saint-martin-noir-marbre",
  "projet-paris-10-jemmapes-lumiere": "salle-de-bain-paris-10-jemmapes-lumiere-naturelle",
  
  // ========== PARIS 11ÈME ==========
  "projet-paris-11-charonne-bastille-terrazzo": "salle-de-bain-paris-11-charonne-bastille-terrazzo",
  "projet-paris-11-leon-frot-zen": "salle-de-bain-paris-11-leon-frot-zen-japonais",
  "projet-paris-11-popincourt-naturelle": "salle-de-bain-paris-11-popincourt-naturelle",
  "projet-paris-11-charonne-italienne": "salle-de-bain-paris-11-charonne-douche-italienne",
  
  // ========== PARIS 12ÈME ==========
  "projet-paris-12-nation-lumineuse": "salle-de-bain-paris-12-nation-luminosite",
  "projet-paris-12-nation-elegante": "salle-de-bain-paris-12-nation-elegance",
  "projet-paris-12-sergent-beauchart-degat-eaux": "salle-de-bain-paris-12-sergent-beauchart-degat-eaux",
  "projet-paris-12-daumesnil-bleu-mineral": "salle-de-bain-paris-12-place-daumesnil-bleu-mineral-beton",
  "projet-paris-12-cours-vincennes-garcon": "salle-de-bain-paris-12-vincennes-garcon-subway",
  "projet-paris-12-cours-vincennes-madame": "salle-de-bain-paris-12-vincennes-madame-marbre",
  
  // ========== PARIS 14ÈME ==========
  "projet-paris-14-alesia-elegance": "salle-de-bain-paris-14-alesia-elegance-parisienne",
  
  // ========== PARIS 15ÈME ==========
  "projet-paris-15-convention-naturelle": "salle-de-bain-paris-15-convention-naturelle",
  "projet-paris-15-vaugirard-optimisee": "salle-de-bain-paris-15-vaugirard-espace-optimise",
  
  // ========== PARIS 16ÈME ==========
  "projet-paris-16-jasmin-suite-parentale": "salle-de-bain-paris-16-jasmin-suite-parentale",
  
  // ========== PARIS 17ÈME ==========
  "projet-paris-17-pereire-terrazzo": "salle-de-bain-paris-17-pereire-terrazzo-contemporain",
  "projet-paris-17-pereire-suite-parentale": "salle-de-bain-paris-17-pereire-suite-parentale",
  "projet-paris-17-wagram-chic": "salle-de-bain-paris-17-wagram-chic-parisien",
  "projet-paris-17-etoile-lumineuse": "salle-de-bain-paris-17-etoile-luminosite",
  
  // ========== PARIS 18ÈME ==========
  "projet-paris-18-clignancourt-moderne": "salle-de-bain-paris-18-clignancourt-moderne",
  "projet-paris-18-montmartre-naturelle": "salle-de-bain-paris-18-montmartre-naturelle",
  
  // ========== PARIS 20ÈME ==========
  "projet-paris-20-gambetta-italienne": "salle-de-bain-paris-20-gambetta-douche-italienne",
  
  // ========== BANLIEUE 92 ==========
  "projet-bois-colombes-92-naturelle": "salle-de-bain-bois-colombes-92-naturelle",
  "projet-courbevoie-92-contemporaine": "salle-de-bain-courbevoie-92-contemporaine",
  "projet-asnieres-92-elegante": "salle-de-bain-asnieres-92-elegante",
  "projet-levallois-92-epuree": "salle-de-bain-levallois-92-epuree",
  "projet-neuilly-92-luxe": "salle-de-bain-neuilly-92-luxe-parisien",
  
  // ========== BANLIEUE 93 ==========
  "projet-pantin-93-industrielle": "salle-de-bain-pantin-93-style-industriel",
  "projet-montreuil-93-naturelle": "salle-de-bain-montreuil-93-naturelle",
  
  // ========== BANLIEUE 94 ==========
  "projet-saint-maur-94-suite-parentale": "salle-de-bain-saint-maur-94-suite-parentale",
  "projet-saint-maur-94-enfants-ludique": "salle-de-bain-saint-maur-94-enfants-ludique",
  "projet-charenton-94-general-leclerc-duo": "salle-de-bain-charenton-94-duo-douche-baignoire",
  "projet-charenton-94-liberté-moderne": "salle-de-bain-charenton-94-liberte-moderne",
  "projet-vincennes-94-renovation": "salle-de-bain-vincennes-94-renovation-complete",
  
  // ========== BANLIEUE 95 ==========
  "projet-argenteuil-95-familiale": "salle-de-bain-argenteuil-95-familiale",
  "projet-enghien-95-spa": "salle-de-bain-enghien-95-esprit-spa",
  
  // ========== CHANTIERS EN COURS ==========
  "chantier-paris-19-buttes-chaumont": "salle-de-bain-paris-19-buttes-chaumont",
  "chantier-paris-12-bercy": "salle-de-bain-paris-12-bercy",
  "chantier-boulogne-92-renovation": "salle-de-bain-boulogne-92-renovation",
};

export const getRedirectSlug = (oldSlug: string): string | null => {
  return redirectMap[oldSlug] || null;
};
