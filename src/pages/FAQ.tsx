import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { ArrowRight, Plus, Minus, Play, Instagram } from "lucide-react";
import { useState } from "react";

const faqCategories = [
  {
    title: "Notre engagement",
    intro: "Cette FAQ répond à vos interrogations. Mais parce que nous sommes avant tout dans une relation humaine, tout est dit dès le départ, avant le premier coup de marteau. Le devis est clair, précis, et chaque étape est expliquée en amont. → Aucune surprise, aucun coût caché, budget maîtrisé.",
    questions: []
  },
  {
    title: "Devis, budget et validation",
    questions: [
      {
        question: "Comment valider le devis ?",
        answer: "Le devis doit être signé et retourné, accompagné du premier acompte, par virement uniquement sur notre compte société. Le RIB, le montant de l'acompte et les CGV sont intégrés directement au devis. Tout est clair, au même endroit."
      },
      {
        question: "Y a-t-il des travaux supplémentaires imprévus ?",
        answer: "Non. Chaque plus-value ou moins-value est expliquée, chiffrée, et validée par vos soins avant exécution. → Vous gardez la maîtrise totale de votre budget."
      }
    ]
  },
  {
    title: "Plans, croquis et 3D",
    questions: [
      {
        question: "Faites-vous des plans ou des 3D ?",
        answer: "Pour les petites surfaces, un croquis et la présentation de projets similaires suffisent généralement. La 3D est possible, si le projet le nécessite et si c'est votre souhait, via un forfait dédié."
      },
      {
        question: "Avec qui réalisez-vous les plans ?",
        answer: "Nous travaillons avec P3D Concept, partenaire de longue date. Vous recevez un devis précis, la prestation est payée directement à P3D Concept, et vous échangez librement avec lui pour bien préparer le projet.",
        instagramLink: "C_aaIoPNMBz"
      }
    ]
  },
  {
    title: "Suivi de chantier",
    questions: [
      {
        question: "Qui gère le chantier ?",
        answer: "Un interlocuteur unique assure : la coordination des artisans, le respect du planning, le contrôle qualité, et les points réguliers avec vous."
      },
      {
        question: "Comment suivre mon chantier si je suis très occupé, en province ou à l'étranger ?",
        answer: "Nous assurons un suivi à distance avec : photos, comptes-rendus, échanges téléphone ou visio si nécessaire."
      }
    ]
  },
  {
    title: "Démolition & vérifications techniques",
    questions: [
      {
        question: "Vérifiez-vous l'existant ?",
        answer: "Oui, systématiquement après la démolition : réseaux, évacuations, colonnes en fonte ou en plomb, accès techniques et compteurs. → C'est le bon moment pour corriger, afin d'éviter de recasser plus tard."
      }
    ]
  },
  {
    title: "Copropriété, syndic et voisins",
    questions: [
      {
        question: "Le syndic est-il informé ?",
        answer: "Oui. Dès le devis signé, vous recevez : un avis de travaux à afficher, un mail type à adresser au syndic. Les voisins sont informés et les parties communes sont protégées. → Nous ne faisons pas de travaux à la sauvage."
      }
    ]
  },
  {
    title: "Assurances",
    questions: [
      {
        question: "Êtes-vous assuré ?",
        answer: "Oui. Les attestations d'assurance (RC pro et décennale) sont fournies avant la signature du devis et transmises au syndic avec les avis de travaux."
      }
    ]
  },
  {
    title: "Réception des travaux",
    questions: [
      {
        question: "Comment se passe la réception du chantier ?",
        answer: "Nous organisons une réunion de pré-réception pour lister les finitions et détails à ajuster. Une fois ces points traités, le procès-verbal de réception de chantier est signé. → La signature du PV marque la fin officielle des travaux et le démarrage des garanties."
      }
    ]
  },
  {
    title: "Inspirations & réalisations",
    questions: [
      {
        question: "Où puis-je voir vos réalisations ?",
        answer: "Nous partageons régulièrement nos réalisations et conseils techniques. → Les photos valent souvent mieux que mille explications !",
        actionLinks: [
          { type: "internal", label: "Voir nos réalisations", link: "/realisations" },
          { type: "instagram", label: "Instagram", link: "https://www.instagram.com/qualirenovation__travaux/" },
          { type: "houzz", label: "Houzz", link: "https://www.houzz.fr/pro/qualirenovation/qualirenovation" }
        ]
      }
    ]
  },
  {
    title: "Rénovation salle de bain",
    questions: [
      {
        question: "Combien coûte une rénovation de salle de bain à Paris ?",
        answer: "Le coût d'une rénovation de salle de bain à Paris varie selon la surface, les matériaux choisis et l'ampleur des travaux. Pour une rénovation complète clé en main, comptez entre 800€ et 1 500€/m². Nous établissons un devis détaillé gratuit avec photos via Graneet pour une transparence totale – zéro mauvaise surprise."
      },
      {
        question: "Combien de temps dure une rénovation de salle de bain en appartement ?",
        answer: "Une rénovation de salle de bain en appartement dure généralement entre 3 semaines et 1 mois. Pourquoi ? Parce qu'un chantier, c'est comme un orchestre : chaque artisan doit jouer sa partition au bon moment. Le plombier pose les fondations, le carreleur donne le rythme, et le peintre sublime l'ensemble en dernier.",
        guideLink: "/guide-travaux#section-planning"
      },
      {
        question: "Proposez-vous une rénovation salle de bain clé en main ?",
        answer: "Oui, nous proposons une rénovation salle de bain clé en main : de la conception à la livraison, nous gérons l'intégralité du projet. Plomberie, étanchéité, carrelage, électricité, peinture et finitions – un seul interlocuteur pour tous les corps de métier."
      },
      {
        question: "Intervenez-vous pour la rénovation de petites salles de bain ?",
        answer: "Absolument ! Nous sommes spécialistes de la rénovation de salle de bain en appartement parisien, souvent avec des contraintes d'espace. Notre expertise nous permet d'optimiser chaque centimètre carré pour créer une salle de bain moderne et fonctionnelle."
      }
    ]
  },
  {
    title: "Notre entreprise",
    questions: [
      {
        question: "Pourquoi choisir votre entreprise de salle de bain à Paris ?",
        answer: "renovermasalledebain.com (Qualirenovation by Qualiconcept) repose sur une promesse simple : Un chantier heureux. Notre maître d'œuvre Carina, forte de 20 ans d'expérience sur les chantiers parisiens, coordonne chaque projet de A à Z. Dès le premier rendez-vous, une visite technique gratuite permet d'analyser la faisabilité et de présenter tous les plans possibles. Nous sommes certifiés Schlüter et Wedi, assurés chez MIC Assurances, et vous bénéficiez d'un suivi visuel quotidien par WhatsApp et vidéo.",
        guideLink: "/guide-travaux"
      },
      {
        question: "Quelle est votre zone d'intervention ?",
        answer: "Nous intervenons sur Paris et toute l'Île-de-France : Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Yvelines (78), Essonne (91), Val-d'Oise (95) et Seine-et-Marne (77). Déplacement gratuit pour l'étude de votre projet."
      },
      {
        question: "Qu'est-ce qu'un maître d'œuvre salle de bain ?",
        answer: "Le maître d'œuvre salle de bain est votre chef de projet dédié. Il coordonne tous les corps de métier (plomberie salle de bain, carrelage, électricité), contrôle la qualité des travaux, veille au respect du budget et des délais. Chez nous, Carina supervise personnellement chaque chantier."
      }
    ]
  },
  {
    title: "Partenaires & Fournisseurs",
    intro: "Comprendre l'écosystème des marques, distributeurs et fournisseurs est essentiel pour bien préparer votre projet. Voici les explications clés.",
    questions: [
      {
        question: "Quelle est la différence entre une marque et un fournisseur ?",
        answer: "Une marque (ou fabricant) conçoit et fabrique les produits : robinetterie, sanitaires, carrelages. Un fournisseur (ou distributeur) est le point de vente qui commercialise ces produits : showrooms, négoces, sites e-commerce. → Exemple : Grohe est une marque, Cedeo est un fournisseur qui vend des produits Grohe."
      },
      {
        question: "Puis-je choisir mes propres marques et fournisseurs ?",
        answer: "Absolument ! Vous êtes libre de sélectionner les marques et fournisseurs de votre choix. Nous vous accompagnons dans vos recherches et vérifions systématiquement la qualité et la disponibilité des produits avant validation. Si nous ne travaillons pas encore avec un fournisseur, nous ouvrons un compte client pour vous."
      },
      {
        question: "Comment accéder aux catalogues des marques partenaires ?",
        answer: "Consultez notre annuaire de marques pour accéder directement aux sites internet des fabricants. Vous y trouverez leurs catalogues, gammes et inspirations. → Pour les distributeurs, notre annuaire fournisseurs liste tous les points de vente avec lesquels nous travaillons régulièrement.",
        actionLinks: [
          { type: "internal", label: "Voir nos marques", link: "/partenaires#marques" },
          { type: "internal", label: "Voir nos fournisseurs", link: "/partenaires#fournisseurs" }
        ]
      },
      {
        question: "Proposez-vous des tarifs négociés chez vos fournisseurs ?",
        answer: "Oui, grâce à nos partenariats récurrents avec les distributeurs, nous bénéficions de conditions tarifaires avantageuses. En toute transparence, nous appliquons une marge de 10% sur le prix HT remisé fournisseur pour couvrir le temps de traitement des commandes (vérification, suivi, livraison). Les frais de livraison du fournisseur sont également reportés sur votre devis une fois la zone de livraison définie. Notre rôle n'est pas de revendre au prix d'achat, mais de vous garantir un service complet et une coordination sans faille."
      },
      {
        question: "Connaissez-vous toutes les marques du marché ?",
        answer: "Avec la multitude de marques dans la rénovation, il est impossible de toutes les connaître ! Mais c'est justement ce qui nous passionne : nous nous faisons toujours un plaisir de découvrir et rencontrer de nouveaux partenaires. Récemment, nous avons découvert Ceramica Fussaro — nous en sommes déjà à notre deuxième projet ensemble — et Maison Bahya, spécialiste des carreaux de ciment, dont nous avons été séduits par la collection présentée par une de nos clientes. Si vous avez un coup de cœur pour une marque, partagez-le avec nous !",
        actionLinks: [
          { type: "internal", label: "Voir nos partenaires actuels", link: "/partenaires" }
        ]
      },
      {
        question: "Comment postuler en tant que sous-traitant ou artisan ?",
        answer: "Nous sommes toujours à la recherche de nouveaux partenaires fiables. Si vous êtes plombier, carreleur, électricien ou autre corps de métier lié à la rénovation de salle de bain, nous vous invitons à nous présenter votre profil et votre expérience. Vous pouvez postuler directement via notre formulaire en quelques minutes.",
        actionLinks: [
          { type: "internal", label: "Devenir partenaire", link: "/partenaires/contact" }
        ]
      }
    ]
  },
  {
    title: "Pose carrelage salle de bain à Paris",
    questions: [
      {
        question: "Quels sont les différents types de pose de carrelage salle de bain ?",
        answer: "En rénovation salle de bain à Paris, les principaux types de pose de carrelage sont : Pose droite (alignée) — idéale pour carrelage grand format 60×60 ou 120×60. Pose décalée (1/3 recommandé) — adaptée aux formats rectangulaires et imitation parquet. Pose chevron / en V — pose technique et haut de gamme. Le choix dépend du format du carreau, de la surface et de la planéité du support.",
        guideLink: "/guide-travaux#section-8"
      },
      {
        question: "Le type de pose influence-t-il le prix de la pose carrelage ?",
        answer: "Oui. Une pose droite salle de bain est plus rapide à exécuter qu'une pose chevron, qui nécessite découpes précises et calepinage millimétré. À Paris : Pose droite — 90 €/m² ; Pose chevron — 120 €/m². Le tarif inclut primaire, colle adaptée et joint."
      },
      {
        question: "Quel type de pose choisir pour un carrelage grand format ?",
        answer: "Pour un carrelage grand format (60×60, 120×60), la pose droite est recommandée pour limiter les défauts visuels. Une pose décalée 50 % est déconseillée car elle accentue les irrégularités du support. Le double encollage et une colle déformable C2S1 ou S2 sont indispensables."
      },
      {
        question: "Le type de pose change-t-il la préparation du support ?",
        answer: "Oui. Une pose chevron ou décalée exige un support parfaitement plan. Un ragréage sol peut être nécessaire avant la pose du carrelage. En douche italienne, l'étanchéité autour du receveur type Wedi est obligatoire, quel que soit le type de pose choisi.",
        guideLink: "/guide-travaux#section-6"
      }
    ]
  },
  {
    title: "Travaux et matériaux",
    questions: [
      {
        question: "Quels travaux de plomberie réalisez-vous ?",
        answer: "Nous réalisons tous les travaux de plomberie salle de bain : dépose et repose des équipements sanitaires, création ou déplacement des arrivées d'eau et évacuations, installation de robinetterie (chrome, noir, laiton, nickel mat), raccordements et mise en conformité."
      },
      {
        question: "Quel carrelage pour une salle de bain moderne ?",
        answer: "Pour une salle de bain moderne, nous recommandons les carrelages grand format (60x120 ou plus) qui agrandissent visuellement l'espace, les imitations pierre naturelle ou béton ciré, et les faïences décoratives pour créer des ambiances uniques. Notre équipe vous conseille sur les tendances et les associations."
      },
      {
        question: "Posez-vous des baignoires ?",
        answer: "Oui, nous installons des baignoires îlots, encastrées ou d'angle selon votre projet. Nous pouvons également transformer une baignoire en douche à l'italienne si vous souhaitez gagner de l'espace et du confort."
      }
    ]
  }
];

type ActionLink = {
  type: "internal" | "instagram" | "houzz";
  label: string;
  link: string;
};

function FAQItem({ question, answer, isOpen, onClick, instagramLink, instagramProfileLink, guideLink, actionLinks }: { question: string; answer: string; isOpen: boolean; onClick: () => void; instagramLink?: string; instagramProfileLink?: string; guideLink?: string; actionLinks?: ActionLink[] }) {
  return (
    <motion.div 
      className="border-b border-border last:border-b-0"
      initial={false}
    >
      <button
        className="w-full py-5 flex items-center justify-between text-left gap-4"
        onClick={onClick}
      >
        <span className="font-display text-lg font-medium text-foreground">{question}</span>
        <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0">
          {isOpen ? (
            <Minus className="w-4 h-4 text-wood" />
          ) : (
            <Plus className="w-4 h-4 text-wood" />
          )}
        </div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-3 text-muted-foreground leading-relaxed">{answer}</p>
        
        {/* Action Links (multiple buttons) */}
        {actionLinks && actionLinks.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {actionLinks.map((action, index) => {
              if (action.type === "internal") {
                return (
                  <Link
                    key={index}
                    to={action.link}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4" />
                    {action.label}
                  </Link>
                );
              }
              if (action.type === "instagram") {
                return (
                  <a
                    key={index}
                    href={action.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Instagram className="w-4 h-4" />
                    {action.label}
                  </a>
                );
              }
              if (action.type === "houzz") {
                return (
                  <a
                    key={index}
                    href={action.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 2v20h8v-8h4v8h8V2H2zm6 8H4V4h4v6zm6 0h-4V4h4v6zm6 0h-4V4h4v6z"/>
                    </svg>
                    {action.label}
                  </a>
                );
              }
              return null;
            })}
          </div>
        )}

        {guideLink && (
          <Link
            to={guideLink}
            className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            Plus de détails dans le Guide Travaux
          </Link>
        )}
        {instagramLink && (
          <a
            href={`https://www.instagram.com/reel/${instagramLink}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Play className="w-4 h-4" />
            Découvrir en vidéo
          </a>
        )}
        {instagramProfileLink && (
          <a
            href={instagramProfileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-4 h-4" />
            Voir sur Instagram
          </a>
        )}
        {!instagramLink && !instagramProfileLink && !guideLink && !actionLinks && <div className="pb-2" />}
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // JSON-LD Schema for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap(category => 
      category.questions.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    )
  };

  return (
    <Layout>
      <OGTags
        title="Questions fréquentes – FAQ"
        description="Réponses à vos questions sur la rénovation de salle de bain : durée des travaux, budget, matériaux, garanties. Tout ce qu'il faut savoir avant de rénover."
        path="/faq"
      />
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-stone" />
        <div className="relative container-custom px-4">
          <motion.div 
            className="max-w-3xl mx-auto md:mx-0 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/30 text-wood text-sm font-medium mb-6">
              Foire aux questions
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-primary">
              Questions fréquentes sur la rénovation de salle de bain
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Retrouvez les réponses à vos questions sur la création de douche à l'italienne, 
              la rénovation de salle de bain à Paris et nos services clé en main.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                className="scroll-mt-24"
                key={categoryIndex}
                id={category.title === "Rénovation salle de bain" ? "renovation-salle-de-bain" : category.title === "Pose carrelage salle de bain à Paris" ? "pose-carrelage" : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.05 }}
              >
                <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4 text-primary">
                  {category.title}
                </h2>
                {'intro' in category && category.intro && (
                  <p className="text-muted-foreground mb-6 leading-relaxed bg-accent/20 p-4 rounded-xl border-l-4 border-primary">
                    {(category as any).intro}
                  </p>
                )}
                {category.questions.length > 0 && (
                  <div className="card-elevated rounded-2xl p-6 md:p-8">
                    {category.questions.map((item, questionIndex) => (
                      <FAQItem
                        key={questionIndex}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openItems[`${categoryIndex}-${questionIndex}`] || false}
                        onClick={() => toggleItem(categoryIndex, questionIndex)}
                        instagramLink={'instagramLink' in item ? (item as any).instagramLink : undefined}
                        instagramProfileLink={'instagramProfileLink' in item ? (item as any).instagramProfileLink : undefined}
                        guideLink={'guideLink' in item ? (item as any).guideLink : undefined}
                        actionLinks={'actionLinks' in item ? (item as any).actionLinks : undefined}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Résumé */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary/10 to-accent/20 rounded-2xl p-8 border border-primary/20"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-primary">
                🤝 En résumé
              </h2>
              <ul className="space-y-3 text-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Devis clair et contractuel</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Budget maîtrisé</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Suivi de chantier rigoureux</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Ajustements validés avant exécution</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Respect de la copropriété</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span>Réception préparée et encadrée</span>
                </li>
              </ul>
              <p className="mt-6 text-muted-foreground italic">
                Chez Qualiconcept, on ne fait pas que rénover un lieu : 
                <span className="text-primary font-medium"> on vous accompagne, sereinement, du début à la fin.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Vous avez d'autres questions ?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Notre équipe est à votre disposition pour répondre à toutes vos questions 
              sur votre projet de rénovation de salle de bain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="xl" asChild>
                <Link to="/devis#devis-form">
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <a href="tel:+33659764685">
                  Nous appeler
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
