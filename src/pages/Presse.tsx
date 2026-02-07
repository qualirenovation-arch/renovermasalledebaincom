import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ExternalLink, Calendar, Newspaper, Star } from "lucide-react";
import { OGTags } from "@/components/seo/OGTags";

// Images
import stMande1 from "@/assets/st-mande-1.jpg";
import charonne1 from "@/assets/charonne-1.jpg";
import carinaNahmani from "@/assets/carina-nahmani-1.jpg";
import presseElleWc from "@/assets/presse-elle-wc-suspendus.jpg";
import presseMarieClaireApres from "@/assets/presse-marie-claire-1.jpg";
import presseMarieClaireAdresses from "@/assets/presse-marie-claire-auteuil.png";
import presseHouzzSoisy from "@/assets/presse-houzz-soisy.png";
import presseHouzzBois from "@/assets/presse-houzz-bois.jpg";
import presse18h39Joints from "@/assets/guide-joint-noir.webp";
import presseElleSoisy from "@/assets/presse-elle-soisy.jpg";
import presseHouzzEau from "@/assets/presse-houzz-laumiere.png";
import presse18h39Wc from "@/assets/presse-18h39-wc.png";
import soisy1 from "@/assets/soisy-1.jpg";
import presseHouzzBuanderie from "@/assets/presse-houzz-buanderie.png";
import terrazzoSoisyEnfants from "@/assets/terrazzo-soisy-enfants.jpg";
import generalLeclerc3 from "@/assets/general-leclerc-3.jpg";
import presseHouzzZerodechet from "@/assets/presse-houzz-zerodechet.jpg";
import houzzLogo from "@/assets/logos/houzz-logo.png";
import presseHouzzBaignoire from "@/assets/presse/baignoire-petite-sdb.png";

// ========================================
// Structure "base de données" : parutions_presse
// Tri automatique par date_publication DESC
// ========================================

interface ParutionPresse {
  id: string;
  date_publication: string; // Format YYYY-MM-DD pour tri automatique
  media: string;
  titre_article: string;
  extrait_seo: string; // 300 caractères max
  url_article: string;
  type: "article" | "interview" | "reportage";
  image?: string;
  journalist?: string;
  location?: string; // Paris 19ème - Avenue Laumière
  pinnedOrder?: number; // Ordre d'épinglage (1 = premier, 2 = second, etc.)
}

const parutions_presse: ParutionPresse[] = [
  {
    id: "elle-soisy-2025",
    date_publication: "2025-10-17",
    media: "Elle Décoration",
    titre_article: "Les astuces des architectes pour aménager une salle de bains pour deux",
    extrait_seo: "Notre projet de salle de bains parentale à Soisy-sous-Montmorency mis à l'honneur. Les architectes partagent leurs astuces pour une salle de bains fonctionnelle et élégante pour deux. Zellige bleu, robinetterie noire et plan vasque bois.",
    url_article: "https://www.elle.fr/Deco/Pieces/Salle-de-bain/Les-astuces-des-architectes-pour-amenager-une-salle-de-bains-pour-deux",
    type: "article",
    image: presseElleSoisy,
    journalist: "Cyrine Ben Romdhane",
    location: "Soisy-sous-Montmorency (95)",
  },
  {
    id: "houzz-soisy-2025",
    date_publication: "2025-01-15",
    media: "Houzz",
    titre_article: "Avant/Après : À Soisy, une maison de maître 1900 rénovée de A à Z",
    extrait_seo: "Transformation complète d'une maison de maître 1900. Un chantier d'envergure incluant deux salles de bain exceptionnelles : zellige bleu en chevron au 1er étage, terrazzo hexagonal et robinetterie dorée au 2ème.",
    url_article: "https://www.houzz.fr/magazine/avant-apres-a-soisy-une-maison-de-maitre-1900-renovee-de-a-a-z-stsetivw-vs~176073945",
    type: "reportage",
    image: presseHouzzSoisy,
    journalist: "Agnès Carpentier",
    location: "Soisy-sous-Montmorency (95)",
  },
  {
    id: "houzz-economies-gaz-2025",
    date_publication: "2025-01-10",
    media: "Houzz",
    titre_article: "Conseils d'artisans : comment faire des économies de gaz",
    extrait_seo: "Notre expertise mise en avant dans un article Houzz sur les économies d'énergie dans la salle de bain. Conseils pratiques pour optimiser votre consommation.",
    url_article: "https://www.houzz.fr/magazine/conseils-d-artisans-comment-faire-des-economies-de-gaz-stsetivw-vs~164524740",
    type: "article",
    image: stMande1,
    journalist: "Agnès Carpentier",
    location: "Saint-Mandé (94)",
  },
  {
    id: "houzz-powder-rooms-2024",
    date_publication: "2024-12-17",
    media: "Houzz",
    titre_article: "The Top 10 New Powder Rooms of 2024",
    extrait_seo: "Le WC du rez-de-chaussée de notre projet Soisy-sous-Montmorency sélectionné parmi les 10 plus beaux powder rooms de 2024 par Houzz. Une reconnaissance internationale de notre savoir-faire.",
    url_article: "https://www.houzz.fr/magazine/the-top-10-new-powder-rooms-of-2024-stsetivw-vs~178983127",
    type: "article",
    image: soisy1,
    journalist: "Becky Harris",
    location: "Soisy-sous-Montmorency (95)",
  },
  {
    id: "houzz-terrazzo-2024",
    date_publication: "2024-11-08",
    media: "Houzz",
    titre_article: "Comment intégrer du terrazzo dans la salle de bains ?",
    extrait_seo: "Le terrazzo dans tous ses états : inspirations pour une salle de bains moderne et élégante. Notre projet à Soisy-sous-Montmorency illustre l'utilisation du terrazzo hexagonal avec robinetterie dorée dans la salle de bains des enfants.",
    url_article: "https://www.houzz.fr/magazine/comment-integrer-du-terrazzo-dans-la-salle-de-bains-stsetivw-vs~177628691",
    type: "article",
    image: terrazzoSoisyEnfants,
    journalist: "Lucas Beyssier",
    location: "Soisy-sous-Montmorency (95)",
  },
  {
    id: "houzz-eau-2024",
    date_publication: "2024-10-31",
    media: "Houzz",
    titre_article: "9 aménagements pour économiser l'eau au quotidien",
    extrait_seo: "La double plaque de commande des WC mise à l'honneur dans cet article Houzz. Un aménagement simple et efficace pour réduire sa consommation d'eau au quotidien dans la salle de bain.",
    url_article: "https://www.houzz.fr/magazine/9-amenagements-pour-economiser-l-eau-au-quotidien-stsetivw-vs~169904445",
    type: "article",
    image: presseHouzzEau,
    journalist: "Anne-Laure Sizun",
    location: "Paris 19ème - Avenue Laumière",
  },
  {
    id: "houzz-buanderie-2023",
    date_publication: "2023-01-23",
    media: "Houzz",
    titre_article: "Photothèque : 50 coins buanderie mixent lave-linge et sèche-linge",
    extrait_seo: "Notre solution d'intégration buanderie dans un placard de salle de bains mise en avant. Lave-linge et sèche-linge superposés pour optimiser l'espace dans les petits appartements parisiens.",
    url_article: "https://www.houzz.fr/magazine/phototheque-50-coins-buanderie-mixent-lave-linge-et-seche-linge-stsetivw-vs~118282733",
    type: "article",
    image: presseHouzzBuanderie,
    journalist: "Claire Tardy",
    location: "Paris",
  },
  {
    id: "marie-claire-adresses-2024",
    date_publication: "2024-11-01",
    media: "Marie Claire Maison",
    titre_article: "La rénovation d'intérieur avec transparence et expertise",
    extrait_seo: "QualiRénovation sélectionnée parmi les adresses incontournables Marie Claire Maison. Une entreprise spécialisée en Île-de-France, reconnue pour le travail pointilleux de ses artisans et sa grande transparence.",
    url_article: "https://www.marieclaire.fr/maison/adresses-incontournables/dossier/qualirenovation-by-qualiconcept/",
    type: "article",
    image: presseMarieClaireAdresses,
    journalist: "Rédaction Marie Claire",
  },
  {
    id: "houzz-longueur-2023",
    date_publication: "2023-05-25",
    media: "Houzz",
    titre_article: "Comment aménager une salle de bains en longueur",
    extrait_seo: "Les niches murales, un vrai atout gain de place. Elles permettent de ranger les objets du quotidien sans empiéter sur la largeur. Carrelées ou peintes, elles créent du contraste et structurent l'espace.",
    url_article: "https://www.houzz.fr/magazine/comment-amenager-une-salle-de-bains-en-longueur-stsetivw-vs~118616070",
    type: "article",
    image: stMande1,
    journalist: "Anne Ambaud",
    location: "Saint-Mandé (94)",
  },
  {
    id: "houzz-maitre-oeuvre-2022",
    date_publication: "2022-10-01",
    media: "Houzz",
    titre_article: "Pourquoi est-il judicieux de faire appel à un maître d'œuvre ?",
    extrait_seo: "Interview de Carina Nahmani sur le rôle du maître d'œuvre : l'interlocuteur privilégié pour des travaux bien réalisés, sans retard ni tension. Une vision experte de la coordination de chantier.",
    url_article: "https://www.houzz.fr/magazine/pourquoi-est-il-judicieux-de-faire-appel-a-un-maitre-d-oeuvre-stsetivw-vs~87724005",
    type: "interview",
    image: carinaNahmani,
    journalist: "Agnès Carpentier",
    pinnedOrder: 1, // Article épinglé en première position
  },
  {
    id: "elle-wc-suspendus-2022",
    date_publication: "2022-06-01",
    media: "Elle Décoration",
    titre_article: "Toilettes suspendues : transformer ses WC en espace déco",
    extrait_seo: "Notre projet de WC avec carrelage graphique noir et blanc et zellige anthracite mis en avant dans Elle Décoration. Quand les toilettes deviennent un véritable espace de décoration.",
    url_article: "https://www.elle.fr/Deco/Pratique/Amenagement/Toilettes-suspendues-comment-transformer-ses-WC-en-espace-deco",
    type: "article",
    image: presseElleWc,
    journalist: "Cécile Debise",
    location: "Paris",
  },
  {
    id: "houzz-wc-sdb-2021",
    date_publication: "2021-07-05",
    media: "Houzz",
    titre_article: "Pour ou contre les WC dans la salle de bains ?",
    extrait_seo: "Entre gagner de la place ou bien définir les fonctions, le débat fait rage. Découvrez les arguments des deux camps pour savoir si les WC ont leur place dans votre salle de bains.",
    url_article: "https://www.houzz.fr/magazine/pour-ou-contre-les-wc-dans-la-salle-de-bains-stsetivw-vs~137229363",
    type: "article",
    image: presseHouzzEau,
    journalist: "Claire Tardy",
    location: "Paris 19ème - Avenue Laumière",
  },
  {
    id: "houzz-zerodechet-2021",
    date_publication: "2021-03-22",
    media: "Houzz",
    titre_article: "Objectif zéro déchet : une salle de bains vertueuse en 10 étapes",
    extrait_seo: "Économies d'eau et éco-gestes dans la salle de bain. Une douche consomme 20 à 60 litres contre 120 à 250 litres pour un bain. Nos douches à l'italienne illustrent comment allier design et responsabilité environnementale.",
    url_article: "https://www.houzz.fr/magazine/objectif-zero-dechet-une-salle-de-bains-vertueuse-en-10-etapes-stsetivw-vs~116349905",
    type: "article",
    image: presseHouzzZerodechet,
    journalist: "Aurélie Roman",
  },
  {
    id: "houzz-bois-charenton-2021",
    date_publication: "2021-06-15",
    media: "Houzz",
    titre_article: "Duo douche & baignoire : quand chaque mètre carré compte",
    extrait_seo: "À Paris, faire cohabiter une douche et une baignoire n'est pas toujours possible. Ici, on a relevé le défi avec une approche sur-mesure : implantation précise, volumes maîtrisés et matériaux chaleureux. Le bois apporte profondeur et confort visuel, les niches structurent l'espace sans l'alourdir. Projet sélectionné et mis en avant par Houzz — une vraie reconnaissance pour un travail où technique, détail et sens du lieu avancent main dans la main.",
    url_article: "https://www.houzz.fr/magazine/phototheque-50-salles-de-bains-rechauffees-grace-au-bois-stsetivw-vs~121061583",
    type: "article",
    image: generalLeclerc3,
    journalist: "Rédaction Houzz",
    location: "Charenton-le-Pont (94) - Rue du Général Leclerc",
  },
  {
    id: "marie-claire-contemporaine-2021",
    date_publication: "2021-07-01",
    media: "Marie Claire Maison",
    titre_article: "Une salle de bains contemporaine",
    extrait_seo: "Transformation d'une salle de bain datée en espace contemporain. Robinetterie noire, paroi verrière industrielle et carrelage blanc lumineux. Article en partenariat avec Houzz.fr.",
    url_article: "https://www.marieclaire.fr/photo/1357704/3119092/une-salle-de-bains-contemporaine",
    type: "article",
    image: presseMarieClaireApres,
    journalist: "Rédaction Marie Claire",
    location: "Paris",
  },
  {
    id: "houzz-baignoire-petite-sdb-2019",
    date_publication: "2019-09-05",
    media: "Houzz",
    titre_article: "Paroles de pros : Une baignoire pour une petite salle de bains ?",
    extrait_seo: "Faut-il sacrifier la baignoire quand les mètres carrés sont limités ? La rédaction Houzz a interrogé les professionnels. Carina Nahmani partage son expertise terrain sur ce débat qui divise les Houzzers.",
    url_article: "https://www.houzz.fr/magazine/paroles-de-pros-une-baignoire-pour-une-petite-salle-de-bains-stsetivw-vs~126001456",
    type: "interview",
    image: presseHouzzBaignoire,
    journalist: "Claire Tardy",
  },
  {
    id: "houzz-trois-pieces-2019",
    date_publication: "2019-04-01",
    media: "Houzz",
    titre_article: "Un trois-pièces de 54 m² rafraîchi pour 25 000 €",
    extrait_seo: "Cette rénovation complète a fait l'objet de deux articles distincts — le WC chez Elle Décoration et la salle de bain chez Marie Claire Maison. Une transformation remarquée par la presse déco.",
    url_article: "https://www.houzz.fr/magazine/avant-apres-un-trois-pieces-de-54-m%C2%B2-rafraichi-pour-25-000-eur-stsetivw-vs~92733439",
    type: "reportage",
    image: presseMarieClaireApres,
    journalist: "Agnès Carpentier",
    location: "Paris",
  },
  {
    id: "18h39-joints-2018",
    date_publication: "2018-02-06",
    media: "18h39",
    titre_article: "Joints de couleur : comment mettre en valeur votre carrelage",
    extrait_seo: "Interview exclusive de Carina Nahmani pour 18h39. Les joints de carrelage colorés deviennent un levier esthétique : couleur, contraste ou continuité — bien choisis, ils subliment le carrelage.",
    url_article: "https://www.18h39.fr/inspiration-maison/tendances-deco/idee-deco-optez-pour-des-joints-de-couleurs-pour-mettre-en-valeur-votre-carrelage.html",
    type: "interview",
    image: presse18h39Joints,
    journalist: "Pauline Delcourt",
  },
  {
    id: "18h39-wc-suspendus-2017",
    date_publication: "2017-12-27",
    media: "18h39",
    titre_article: "Comment installer des toilettes suspendues : on vous explique tout",
    extrait_seo: "L'expertise terrain en rénovation : plusieurs de nos réalisations mettent en lumière notre savoir-faire. Carina Nahmani analyse le système d'évacuation, une étape clé pour des travaux durables.",
    url_article: "https://www.18h39.fr/travaux-avant-apres/transformer-espace-chez-soi/comment-installer-des-toilettes-suspendues-vous-explique-tout.html",
    type: "article",
    image: presse18h39Wc,
    journalist: "Matthieu M.",
    location: "Paris 11ème - Rue de Charonne",
  },
];

// ========================================
// Tri automatique : épinglés d'abord (par ordre de priorité), puis par date_publication DESC
// ========================================
const sortedParutions = [...parutions_presse].sort((a, b) => {
  const aPinned = a.pinnedOrder !== undefined;
  const bPinned = b.pinnedOrder !== undefined;
  
  // Les articles épinglés passent en premier
  if (aPinned && !bPinned) return -1;
  if (!aPinned && bPinned) return 1;
  
  // Si les deux sont épinglés, trier par ordre de priorité (1 avant 2, etc.)
  if (aPinned && bPinned) {
    return (a.pinnedOrder ?? 999) - (b.pinnedOrder ?? 999);
  }
  
  // Puis tri par date décroissante pour les non-épinglés
  return new Date(b.date_publication).getTime() - new Date(a.date_publication).getTime();
});

// Formatage de la date pour affichage
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", { 
    day: "numeric", 
    month: "long", 
    year: "numeric" 
  });
};

// Logo et style par média
const getMediaLogo = (media: string): React.ReactNode => {
  switch (media) {
    case "Elle Décoration":
      return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 dark:bg-rose-900/20 rounded-full">
          <span className="font-serif font-bold text-rose-700 dark:text-rose-300 text-sm tracking-wide uppercase">ELLE</span>
          <span className="text-rose-500 dark:text-rose-400 text-[10px] font-medium">Décoration</span>
        </div>
      );
    case "Marie Claire Maison":
      return (
        <div className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 rounded-full">
          <span className="font-serif font-bold text-purple-700 dark:text-purple-300 text-sm tracking-tight">marie claire</span>
          <span className="text-purple-500 dark:text-purple-400 text-[10px] font-medium">maison</span>
        </div>
      );
    case "Houzz":
      return (
        <a 
          href="https://www.houzz.fr/pro/qualirenovation/qualirenovation-by-qualiconcept" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors"
        >
          <img src={houzzLogo} alt="Houzz" className="w-4 h-4" />
          <span className="font-bold text-emerald-700 dark:text-emerald-300 text-sm tracking-tight">houzz</span>
        </a>
      );
    case "18h39":
      return (
        <div className="flex items-center px-3 py-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-full">
          <span className="font-bold text-amber-700 dark:text-amber-300 text-sm">18h39</span>
        </div>
      );
    default:
      return (
        <div className="px-3 py-1.5 bg-muted rounded-full">
          <span className="text-muted-foreground text-sm">{media}</span>
        </div>
      );
  }
};

// Type badge
const getTypeBadge = (type: string): string => {
  switch (type) {
    case "interview":
      return "🎙️ Interview";
    case "reportage":
      return "📸 Reportage";
    default:
      return "📰 Article";
  }
};

export default function Presse() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <OGTags
        title="Presse & Médias"
        description="Découvrez les articles de presse mettant en avant nos réalisations. Elle Décoration, Marie Claire Maison, Houzz, 18h39 : référence en rénovation salle de bain Paris."
        path="/presse"
        image={{ type: "page", title: "Presse & Médias", subtitle: "Nos projets dans les médias" }}
      />

      {/* Hero Section */}
      <section className="relative py-10 md:py-14 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
              <Newspaper className="w-4 h-4 inline mr-2" />
              Presse & Médias
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-balance">
              Nos projets dans les médias
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              Depuis 2017, nos réalisations sont régulièrement mises en avant dans la presse déco.
            </p>
            <div className="text-left max-w-2xl mx-auto space-y-2 mb-5 text-muted-foreground text-sm leading-snug">
              <p>
                À travers cette rubrique presse, vous découvrirez bien plus que des articles : des idées concrètes, des choix techniques expliqués et des inspirations utiles pour bien préparer votre projet de rénovation, notamment de salle de bains.
              </p>
              <p>
                C'est aussi l'occasion de voir comment nous travaillons : avec exigence, méthode et une vraie attention portée à chaque détail, du premier choix esthétique jusqu'à la mise en œuvre.
              </p>
              <p>
                En parcourant ces parutions, vous avez l'assurance de faire appel à une entreprise qui prend votre projet à cœur, avec toute la maîtrise nécessaire pour transformer vos idées en un espace durable et bien pensé.
              </p>
              <div className="mt-3 p-3 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border-l-4 border-accent rounded-r-xl">
                <p className="text-foreground italic text-base leading-snug">
                  ✨ Et puis, soyons honnêtes : feuilleter de beaux projets, c'est aussi une excellente façon de se projeter… et de commencer à rêver un peu avant les travaux.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="inline-flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl font-bold text-primary">{sortedParutions.length}</span>
                <span className="text-xs text-muted-foreground">articles publiés</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-background border border-border px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl font-bold text-primary">
                  {new Set(parutions_presse.map(p => p.media)).size}
                </span>
                <span className="text-xs text-muted-foreground">médias différents</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instagram Carousel - Compilations vidéo des parutions */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <h2 className="font-display text-xl md:text-2xl font-semibold mb-2">
              📱 Nos parutions en vidéo
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Découvrez nos meilleures parutions presse dans ce carrousel Instagram.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <a
              href="https://www.instagram.com/reel/DQZoXskjPv-/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border-2 border-transparent hover:border-pink-400/50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="relative w-full max-w-sm aspect-[9/16] bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 md:w-8 md:h-8 text-pink-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
                  <div className="mb-4 opacity-90">
                    <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                    </svg>
                  </div>
                  <h3 className="font-display text-lg md:text-xl font-bold mb-2">
                    Carrousel Parutions
                  </h3>
                  <p className="text-sm opacity-80">
                    Houzz • Elle • Marie Claire
                  </p>
                </div>
                
                {/* Instagram badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
                  </svg>
                  <span className="text-xs font-medium">Reel</span>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid - Tri automatique par date DESC */}
      <section className="section-padding">
        <div className="container-custom">
          <div id="parutions" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 scroll-mt-28">
            {sortedParutions.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                {article.image && (
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={article.image} 
                      alt={article.titre_article}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Badge "À la une" pour articles épinglés */}
                    {article.pinnedOrder !== undefined && (
                      <div className="absolute top-3 left-3 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        À la une{article.pinnedOrder > 1 ? ` #${article.pinnedOrder}` : ''}
                      </div>
                    )}
                    {/* Type badge overlay */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-background/90 backdrop-blur-sm text-xs font-medium rounded-full">
                      {getTypeBadge(article.type)}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-5 md:p-6 space-y-4">
                  {/* Date + Média (discret) */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    {getMediaLogo(article.media)}
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(article.date_publication)}
                    </span>
                  </div>

                  {/* Titre en gras */}
                  <h2 className="font-display text-lg md:text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {article.titre_article}
                  </h2>

                  {/* Extrait court */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.extrait_seo}
                  </p>

                  {/* Journaliste + Location (optionnel) */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground/70">
                    {article.journalist && (
                      <span className="italic">Par {article.journalist}</span>
                    )}
                    {article.location && (
                      <span className="font-medium text-primary/70">📍 {article.location}</span>
                    )}
                  </div>

                  {/* CTA : Lire l'article */}
                  <a
                    href={article.url_article}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors pt-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Lire l'article
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Signal : Timeline texte */}
      <section className="py-12 bg-muted/30">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            {(() => {
              // Calcul des vraies dates min/max (indépendamment du tri par épinglage)
              const allDates = parutions_presse.map(p => new Date(p.date_publication).getTime());
              const oldestDate = new Date(Math.min(...allDates));
              const newestDate = new Date(Math.max(...allDates));
              const formatDateSimple = (date: Date) => date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
              return (
                <p className="text-sm text-muted-foreground">
                  Première publication presse : <strong>{formatDateSimple(oldestDate)}</strong> — Dernière publication : <strong>{formatDateSimple(newestDate)}</strong>
                </p>
              );
            })()}
            <p className="text-xs text-muted-foreground/60 mt-2">
              Une présence médiatique continue qui témoigne de notre expertise reconnue en rénovation de salle de bain.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Vous êtes journaliste ?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Pour toute demande de reproduction de photos ou interview, contactez-nous par email.
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              asChild 
              className="bg-white text-primary hover:bg-white/90"
            >
              <a href="mailto:gestion@qualiconcept.fr">
                Contactez-nous
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
