import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ExternalLink, Calendar, Newspaper } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Images
import stMande1 from "@/assets/st-mande-1.jpg";
import charonne1 from "@/assets/charonne-1.jpg";
import carinaNahmani from "@/assets/carina-nahmani-1.jpg";
import presseElleWc from "@/assets/presse-elle-wc-suspendus.jpg";
import presseMarieClaireApres from "@/assets/presse-marie-claire-1.jpg";
import presseMarieClaireAdresses from "@/assets/presse-marie-claire-adresses.png";
import presseHouzzSoisy from "@/assets/presse-houzz-soisy.png";
import presseHouzzBois from "@/assets/presse-houzz-bois.jpg";
import presse18h39Joints from "@/assets/guide-joint-noir.webp";
import presseElleSoisy from "@/assets/presse-elle-soisy.jpg";
import presseHouzzEau from "@/assets/presse-houzz-laumiere.png";
import presse18h39Wc from "@/assets/presse-18h39-wc.png";
import soisy1 from "@/assets/soisy-1.jpg";
import presseHouzzBuanderie from "@/assets/presse-houzz-buanderie.png";

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
  },
  {
    id: "marie-claire-adresses-2024",
    date_publication: "2024-11-01",
    media: "Marie Claire Maison",
    titre_article: "La rénovation d'intérieur avec transparence et expertise",
    extrait_seo: "QualiRénovation sélectionnée parmi les adresses incontournables Marie Claire Maison. Une entreprise spécialisée en Île-de-France, reconnue pour le travail pointilleux de ses artisans et sa grande transparence.",
    url_article: "http://adresses-incontournables-maison.marieclaire.fr/dossier/qualirenovation-by-qualiconcept/",
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
  },
  {
    id: "houzz-wc-sdb-2021",
    date_publication: "2021-07-05",
    media: "Houzz",
    titre_article: "Pour ou contre les WC dans la salle de bains ?",
    extrait_seo: "Entre gagner de la place ou bien définir les fonctions, le débat fait rage. Découvrez les arguments des deux camps pour savoir si les WC ont leur place dans votre salle de bains.",
    url_article: "https://www.houzz.fr/magazine/pour-ou-contre-les-wc-dans-la-salle-de-bains-stsetivw-vs~137229363",
    type: "article",
    image: stMande1,
    journalist: "Claire Tardy",
  },
  {
    id: "houzz-bois-2021",
    date_publication: "2021-06-15",
    media: "Houzz",
    titre_article: "Photothèque : 50 salles de bains réchauffées grâce au bois",
    extrait_seo: "Le bois comme matériau de référence pour créer une atmosphère zen et spa. Qu'il soit brut ou imitation, il apporte chaleur et nature à la salle de bains, transformant la pièce en havre de paix.",
    url_article: "https://www.houzz.fr/magazine/phototheque-50-salles-de-bains-rechauffees-grace-au-bois-stsetivw-vs~121061583",
    type: "article",
    image: presseHouzzBois,
    journalist: "Rédaction Houzz",
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
  },
];

// ========================================
// Tri automatique par date_publication DESC
// ========================================
const sortedParutions = [...parutions_presse].sort((a, b) => 
  new Date(b.date_publication).getTime() - new Date(a.date_publication).getTime()
);

// Formatage de la date pour affichage
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", { 
    day: "numeric", 
    month: "long", 
    year: "numeric" 
  });
};

// Badge couleur par média
const getMediaColor = (media: string): string => {
  switch (media) {
    case "Elle Décoration":
      return "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300";
    case "Marie Claire Maison":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    case "Houzz":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
    case "18h39":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    default:
      return "bg-muted text-muted-foreground";
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
  return (
    <Layout>
      <Helmet>
        <title>Presse & Médias | QualiRénovation - Nos projets dans Elle, Houzz, Marie Claire</title>
        <meta 
          name="description" 
          content="Découvrez les articles de presse mettant en avant nos réalisations. Elle Décoration, Marie Claire Maison, Houzz, 18h39 : QualiRénovation, référence en rénovation salle de bain Paris."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Newspaper className="w-4 h-4 inline mr-2" />
              Presse & Médias
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Nos projets dans les médias
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Depuis 2017, nos réalisations sont régulièrement mises en avant dans la presse déco.
            </p>
            <div className="text-left max-w-3xl mx-auto space-y-4 mb-8 text-muted-foreground">
              <p>
                À travers cette rubrique presse, vous découvrirez bien plus que des articles : des idées concrètes, des choix techniques expliqués et des inspirations utiles pour bien préparer votre projet de rénovation, notamment de salle de bains.
              </p>
              <p>
                C'est aussi l'occasion de voir comment nous travaillons : avec exigence, méthode et une vraie attention portée à chaque détail, du premier choix esthétique jusqu'à la mise en œuvre.
              </p>
              <p>
                En parcourant ces parutions, vous avez l'assurance de faire appel à une entreprise qui prend votre projet à cœur, avec toute la maîtrise nécessaire pour transformer vos idées en un espace durable et bien pensé.
              </p>
              <p className="text-primary/80 italic">
                ✨ Et puis, soyons honnêtes : feuilleter de beaux projets, c'est aussi une excellente façon de se projeter… et de commencer à rêver un peu avant les travaux.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="inline-flex items-center gap-2 bg-background border border-border px-6 py-3 rounded-full shadow-sm">
                <span className="text-2xl font-bold text-primary">{sortedParutions.length}</span>
                <span className="text-sm text-muted-foreground">articles publiés</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-background border border-border px-6 py-3 rounded-full shadow-sm">
                <span className="text-2xl font-bold text-primary">
                  {new Set(parutions_presse.map(p => p.media)).size}
                </span>
                <span className="text-sm text-muted-foreground">médias différents</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid - Tri automatique par date DESC */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getMediaColor(article.media)}`}>
                      {article.media}
                    </span>
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
            <p className="text-sm text-muted-foreground">
              Première publication presse : <strong>décembre 2017</strong> — Dernière publication : <strong>{formatDate(sortedParutions[0].date_publication)}</strong>
            </p>
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
