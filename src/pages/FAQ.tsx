import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqCategories = [
  {
    title: "Rénovation salle de bain",
    questions: [
      {
        question: "Combien coûte une rénovation de salle de bain à Paris ?",
        answer: "Le coût d'une rénovation de salle de bain à Paris varie selon la surface, les matériaux choisis et l'ampleur des travaux. Pour une rénovation complète clé en main, comptez entre 800€ et 1 500€/m². Nous établissons un devis détaillé gratuit avec photos via Graneet pour une transparence totale – zéro mauvaise surprise."
      },
      {
        question: "Combien de temps dure une rénovation de salle de bain en appartement ?",
        answer: "Une rénovation de salle de bain en appartement dure généralement entre 2 et 4 semaines selon la complexité du projet. Notre maître d'œuvre planifie chaque étape et vous tient informé quotidiennement par WhatsApp et vidéo. Nous respectons scrupuleusement les délais annoncés."
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
    title: "Douche à l'italienne",
    questions: [
      {
        question: "Qu'est-ce qu'une douche à l'italienne ?",
        answer: "Une douche à l'italienne est une douche de plain-pied, sans marche ni receveur surélevé. Elle s'intègre parfaitement au sol de la salle de bain, offrant un accès facile et un design épuré. C'est la solution idéale pour une salle de bain moderne et accessible."
      },
      {
        question: "Peut-on installer une douche à l'italienne dans un appartement ancien ?",
        answer: "Oui, la création d'une douche italienne est possible dans la plupart des appartements, même anciens. Notre maître d'œuvre réalise une étude de faisabilité gratuite pour évaluer les contraintes techniques (hauteur de réservation, évacuations) et vous proposer la meilleure solution."
      },
      {
        question: "Comment garantissez-vous l'étanchéité d'une douche à l'italienne ?",
        answer: "L'étanchéité douche est notre priorité absolue. Nous utilisons des systèmes certifiés Schlüter et Wedi, posés selon les règles de l'art (DTU). Chaque douche bénéficie d'une garantie étanchéité 10 ans et de notre garantie décennale MIC Assurances."
      },
      {
        question: "Pourquoi l'étanchéité Aquastop Weber est-elle obligatoire ?",
        answer: "L'étanchéité Weber Aquastop (la peinture bleue visible sur nos photos de chantier) est un système d'étanchéité liquide (SEL) obligatoire selon le DTU pour les pièces humides. Appliquée sur les murs ET le sol avant la pose du carrelage, elle crée une barrière imperméable qui protège votre appartement et celui de vos voisins contre les infiltrations d'eau. C'est une étape invisible mais essentielle que nous documentons systématiquement en photo pour vous garantir un travail dans les règles de l'art."
      },
      {
        question: "Quel receveur de douche choisir ?",
        answer: "Nous proposons différents types de receveurs de douche : receveur extra-plat en résine, receveur à carreler pour un rendu 100% personnalisé, ou douche maçonnée traditionnelle. Le choix dépend de vos goûts, de votre budget et des contraintes techniques de votre salle de bain."
      }
    ]
  },
  {
    title: "Notre entreprise",
    questions: [
      {
        question: "Pourquoi choisir votre entreprise de salle de bain à Paris ?",
        answer: "RénoveMaSalleDeBain (Qualirenovation by Qualiconcept) est une entreprise spécialisée depuis 2019, avec une maître d'œuvre forte de 20 ans d'expérience sur les chantiers parisiens. Nous sommes certifiés Schlüter et Wedi, assurés chez MIC Assurances, et nous offrons un suivi visuel quotidien par WhatsApp."
      },
      {
        question: "Quelle est votre zone d'intervention ?",
        answer: "Nous intervenons sur Paris et toute l'Île-de-France : Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94), Yvelines (78), Essonne (91), Val-d'Oise (95) et Seine-et-Marne (77). Déplacement gratuit pour l'étude de votre projet."
      },
      {
        question: "Qu'est-ce qu'un maître d'œuvre salle de bain ?",
        answer: "Le maître d'œuvre salle de bain est votre chef de projet dédié. Il coordonne tous les corps de métier (plomberie salle de bain, carrelage, électricité), contrôle la qualité des travaux, veille au respect du budget et des délais. Chez nous, Carina supervise personnellement chaque chantier."
      },
      {
        question: "Quelles garanties proposez-vous ?",
        answer: "Nous offrons une garantie décennale et une responsabilité civile professionnelle MIC Assurances, une garantie étanchéité 10 ans, un devis détaillé avec photos via Graneet, et un suivi visuel quotidien par WhatsApp et vidéo."
      },
      {
        question: "Le devis est-il ferme et définitif dès le départ ?",
        answer: "Non, nous fonctionnons avec un premier devis estimatif. Ensuite, au fil du chantier, nous émettons des situations de chantier qui évoluent selon la validation des produits par vos soins. Cette méthode nous permet de réajuster au plus juste et de vous offrir une transparence totale sur l'avancement des travaux. C'est également indispensable pour les appels de fonds qui rythment le paiement de votre projet."
      },
      {
        question: "Comment gérez-vous les travaux supplémentaires ?",
        answer: "Les travaux supplémentaires peuvent survenir en cours de chantier suite à des découvertes (état des canalisations, murs, etc.) ou à vos nouvelles envies. Dans tous les cas, rien n'est engagé sans votre accord écrit préalable. Nous vous présentons un avenant détaillé avec le coût exact avant toute intervention. Cette transparence vous garantit de ne jamais avoir de mauvaise surprise sur la facture finale."
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
      },
      {
        question: "Travaillez-vous avec quelles marques ?",
        answer: "Toutes les marques ! Nous vérifions systématiquement vos choix avant de valider les commandes pour éviter les produits de mauvaise manufacture. Notre expertise nous permet de vous accompagner dans vos sélections et de vous conseiller sur la qualité des références. L'essentiel est d'échanger ensemble pour trouver les meilleurs produits adaptés à votre projet et votre budget."
      },
      {
        question: "Travaillez-vous avec quels fournisseurs ?",
        answer: "Tous les fournisseurs ! Si nous connaissons déjà le distributeur, c'est plus simple, mais nous n'hésitons pas à contacter et ouvrir un compte client chez un nouveau fournisseur si c'est le produit que vous souhaitez. Avant toute commande, nous échangeons avec vous car nos partenaires peuvent aussi proposer les mêmes références. Consultez notre liste de partenaires dans la section « Pourquoi nous » pour trouver le produit qui emballera votre cœur !"
      }
    ]
  }
];

function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
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
        <p className="pb-5 text-muted-foreground leading-relaxed">{answer}</p>
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
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-stone" />
        <div className="relative container-custom">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/30 text-wood text-sm font-medium mb-6">
              Foire aux questions
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Questions fréquentes sur la rénovation de salle de bain
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
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
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-primary">
                  {category.title}
                </h2>
                <div className="card-elevated rounded-2xl p-6 md:p-8">
                  {category.questions.map((item, questionIndex) => (
                    <FAQItem
                      key={questionIndex}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openItems[`${categoryIndex}-${questionIndex}`] || false}
                      onClick={() => toggleItem(categoryIndex, questionIndex)}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
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
                <Link to="/devis">
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
