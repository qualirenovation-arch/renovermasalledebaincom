// Actualités Presse - Données réelles depuis Presse.tsx
export const presseNews = [
  {
    id: "presse-houzz-soisy",
    title: "Maison de maître 1900 rénovée de A à Z",
    source: "Houzz",
    date: "Janvier 2025",
    journalist: "Agnès Carpentier",
    link: "/presse",
    externalLink: "https://www.houzz.fr/magazine/avant-apres-a-soisy-une-maison-de-maitre-1900-renovee-de-a-a-z-stsetivw-vs~176073945",
  },
  {
    id: "presse-marie-claire-adresses",
    title: "Rénovation avec transparence et expertise",
    source: "Marie Claire Maison",
    date: "Novembre 2024",
    journalist: "Rédaction Marie Claire",
    link: "/presse",
    externalLink: "http://adresses-incontournables-maison.marieclaire.fr/dossier/qualirenovation-by-qualiconcept/",
  },
  {
    id: "presse-st-mande",
    title: "Économies de gaz grâce à la rénovation",
    source: "Houzz",
    date: "Janvier 2025",
    journalist: "Agnès Carpentier",
    link: "/presse",
    externalLink: "https://www.houzz.fr/magazine/avant-apres-apres-une-renovation-complete-ce-couple-economise-de-lenergie-stsetivw-vs~176074108",
  },
  {
    id: "presse-maitre-oeuvre",
    title: "Pourquoi faire appel à un maître d'œuvre ?",
    source: "Houzz",
    date: "Octobre 2022",
    journalist: "Agnès Carpentier",
    link: "/presse",
    externalLink: "https://www.houzz.fr/magazine/pourquoi-est-il-judicieux-de-faire-appel-a-un-maitre-d-oeuvre-stsetivw-vs~87724005",
  },
];

// Conseils Guide Travaux - Données réelles depuis Guide.tsx
export const guideConseils = [
  {
    id: "guide-etancheite",
    title: "Étanchéité obligatoire DTU",
    description: "SEL et SPEC : les systèmes d'étanchéité sous carrelage",
    section: "Étanchéité",
    link: "/guide-travaux#etancheite",
  },
  {
    id: "guide-douche-baignoire",
    title: "Douche ou baignoire : laquelle choisir ?",
    description: "La vraie question : comment vivez-vous votre salle de bain ?",
    section: "Conseils",
    link: "/guide-travaux#douche-italienne",
  },
  {
    id: "guide-plomberie",
    title: "Faut-il refaire toute la plomberie ?",
    description: "Sécuriser l'installation avec cuivre ou multicouche",
    section: "Plomberie",
    link: "/guide-travaux#plomberie",
  },
  {
    id: "guide-maitre-oeuvre",
    title: "Maître d'œuvre intégré",
    description: "Coordination, achats, délais : tout est géré",
    section: "Accompagnement",
    link: "/guide-travaux#maitre-oeuvre",
  },
  {
    id: "guide-robinetterie",
    title: "Choisir sa robinetterie",
    description: "Finitions, styles et compatibilité technique",
    section: "Robinetterie",
    link: "/guide-travaux#robinetterie",
  },
  {
    id: "guide-receveur",
    title: "Quel receveur de douche choisir ?",
    description: "Extra-plat, à carreler, acier ou maçonné",
    section: "Receveurs",
    link: "/guide-travaux#receveurs",
  },
];

// Fonction pour obtenir les actualités mixtes (presse + conseils)
export function getMixedNews(count: number = 4) {
  const mixed = [];
  const presseCount = Math.ceil(count / 2);
  const guideCount = Math.floor(count / 2);
  
  // Ajouter les articles presse les plus récents
  for (let i = 0; i < Math.min(presseCount, presseNews.length); i++) {
    mixed.push({
      ...presseNews[i],
      type: "presse" as const,
    });
  }
  
  // Ajouter les conseils du guide (rotation aléatoire)
  const shuffledGuide = [...guideConseils].sort(() => Math.random() - 0.5);
  for (let i = 0; i < Math.min(guideCount, shuffledGuide.length); i++) {
    mixed.push({
      id: shuffledGuide[i].id,
      title: shuffledGuide[i].title,
      source: shuffledGuide[i].section,
      date: "Guide travaux",
      link: shuffledGuide[i].link,
      type: "conseil" as const,
    });
  }
  
  return mixed;
}
