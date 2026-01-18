import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, AlertTriangle, Droplets, Shield, Wrench, Sparkles, Eye, Users, Home, Phone, Paintbrush, Wind, HardHat, Building, Hammer, Ruler, HelpCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Images
import guideJointNoir from "@/assets/guide-joint-noir.webp";
import guideJointAssorti from "@/assets/guide-joint-assorti.webp";
import guideProfilFinition from "@/assets/guide-profil-finition.webp";
import butteschaumont6 from "@/assets/buttes-chaumont-6.jpg";

const Guide = () => {
  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Faut-il refaire toute la plomberie lors d'une rénovation de salle de bain ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, pour éviter les fuites et sécuriser l'installation. Le plomb est remplacé par du cuivre ou du multicouche, avec des nourrices eau chaude / eau froide pour isoler chaque point d'eau."
        }
      },
      {
        "@type": "Question",
        "name": "La bonde doit-elle rester accessible ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Toujours. Une trappe d'accès est indispensable pour intervenir en cas de problème sans avoir à tout casser."
        }
      },
      {
        "@type": "Question",
        "name": "Maître d'œuvre intégré : chacun son métier",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Avec un maître d'œuvre intégré, tout est pensé avec vous et pour vous. Nous validons et sélectionnons ensemble chaque achat, gérons les commandes et livraisons, et maîtrisons chaque choix du début à la fin. Produits adaptés, compatibilité technique vérifiée, délais coordonnés. Résultat : un chantier fluide, maîtrisé, et un projet qui traverse le temps sans mauvaise surprise."
        }
      },
      {
        "@type": "Question",
        "name": "Qu'est-ce qu'une douche à l'italienne ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Une douche à l'italienne est une douche de plain-pied, sans marche ni receveur surélevé. Elle s'intègre parfaitement au sol de la salle de bain, offrant un accès facile et un design épuré. C'est la solution idéale pour une salle de bain moderne et accessible."
        }
      },
      {
        "@type": "Question",
        "name": "Peut-on installer une douche à l'italienne dans un appartement ancien ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, la création d'une douche italienne est possible dans la plupart des appartements, même anciens. Notre maître d'œuvre réalise une étude de faisabilité gratuite pour évaluer les contraintes techniques (hauteur de réservation, évacuations) et vous proposer la meilleure solution."
        }
      },
      {
        "@type": "Question",
        "name": "Comment garantissez-vous l'étanchéité d'une douche à l'italienne ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'étanchéité est une obligation DTU (DTU 52.2). Nous utilisons des systèmes certifiés Schlüter, Wedi et Weber, posés selon les règles de l'art. Chaque douche bénéficie d'une garantie étanchéité 10 ans et de notre garantie décennale MIC Assurances."
        }
      },
      {
        "@type": "Question",
        "name": "Pourquoi l'étanchéité sous carrelage est-elle obligatoire ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'étanchéité est obligatoire selon le DTU pour les pièces humides. Il existe deux systèmes : le SEL (Système d'Étanchéité Liquide) et le SPEC (Système de Protection à l'Eau sous Carrelage). Nous utilisons les produits Weber Aquastop."
        }
      },
      {
        "@type": "Question",
        "name": "Quel receveur de douche choisir ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous proposons différents types de receveurs : extra-plat en résine, à carreler, en acier recoupable, ou douche maçonnée traditionnelle. Le choix dépend de vos goûts, budget et contraintes techniques."
        }
      }
    ]
  };

  return (
    <Layout>
      <Helmet>
        <title>Réussir sa salle de bain : guide travaux & conseils de pro</title>
        <meta name="description" content="Guide complet pour réussir la rénovation de votre salle de bain : étanchéité, plomberie, VMC, choix techniques et accompagnement maître d'œuvre à Paris." />
        <link rel="canonical" href="https://renovermasalledebain.com/guide-travaux" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-accent/30 to-background overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              Guide Expert
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
              Réussir sa salle de bain : le guide travaux
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-4">
              Le guide complet pour une rénovation durable et sans mauvaises surprises
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une salle de bain réussie ne se résume pas à un beau carrelage ou à une jolie robinetterie.
              Elle repose avant tout sur des choix techniques solides, faits au bon moment, dans le bon ordre.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-lg text-muted-foreground italic border-l-4 border-primary pl-6 text-left">
              Ce guide reprend notre méthode, issue du terrain, pour concevoir et rénover une salle de bain qui fonctionne aujourd'hui… et encore dans 10 ans.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1 - Visite initiale */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                1
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                La visite chantier : la technique avant l'esthétique
              </h2>
            </div>
            <div className="bg-background rounded-2xl p-8 shadow-sm">
              <p className="text-lg text-muted-foreground mb-6">
                Lors de la visite, deux points sont prioritaires :
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-accent/30 rounded-xl p-6">
                  <Droplets className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-3">Les évacuations</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Emplacement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Diamètre</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Pente</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Compatibilité avec le projet</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-accent/30 rounded-xl p-6">
                  <Wind className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-3">La VMC</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Présence ou absence</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Fonctionnement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Emplacement de la bouche</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Possibilité d'optimisation</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl">
                <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-foreground font-medium">
                  Ces deux points conditionnent tout le projet. L'esthétique vient après, jamais avant.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 - Démolition */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                2
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Démolition et inspection des réseaux existants
              </h2>
            </div>
            <div className="bg-accent/30 rounded-2xl p-8">
              <Hammer className="w-10 h-10 text-primary mb-4" />
              <p className="text-lg text-muted-foreground mb-4">
                Après la démolition, nous inspectons systématiquement :
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Les colonnes d'évacuation en fonte</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>L'état des raccords</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Les arrivées d'eau existantes (souvent en plomb dans l'ancien)</span>
                </li>
              </ul>
              <div className="bg-background rounded-xl p-4 border border-primary/20">
                <p className="text-primary font-medium italic">
                  💬 C'est le seul moment où l'on peut vraiment voir ce qui se cache derrière les murs.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Colonnes en fonte & syndic */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                3
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Colonnes en fonte et syndic : anticiper pour éviter les blocages
              </h2>
            </div>
            <div className="bg-background rounded-2xl p-8 shadow-sm">
              <Building className="w-10 h-10 text-primary mb-4" />
              <p className="text-lg text-muted-foreground mb-6">
                Les colonnes en fonte font partie des <strong>parties communes</strong>.
              </p>
              <p className="text-muted-foreground mb-4">Si les fontes sont abîmées :</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">1</span>
                  <span>Nous prévenons le syndic</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">2</span>
                  <span>Un plombier établit un devis</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">3</span>
                  <span>Le syndic valide l'intervention</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm font-bold">4</span>
                  <span>La colonne est réparée ou remplacée</span>
                </li>
              </ul>
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-800 font-medium">⏱️ Délai à prévoir : environ 15 jours</p>
                  <p className="text-amber-700 mt-2">
                    Ce point est identifié dès le départ, car dans certains cas il est possible d'anticiper l'intervention avant le démarrage du chantier.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4 - Rôle du maître d'œuvre */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary-foreground rounded-full flex items-center justify-center text-primary font-bold text-xl">
                4
              </div>
              <h2 className="text-2xl md:text-3xl font-serif">
                Le rôle du maître d'œuvre : vous n'êtes jamais seul
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Users className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold mb-4">En tant que maître d'œuvre :</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>Je vous assiste dans les démarches auprès du syndic</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>J'échange directement avec les interlocuteurs</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>J'assiste aux rendez-vous avec le plombier</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" />
                    <span>Je coordonne les décisions techniques</span>
                  </li>
                </ul>
              </div>
              <div className="bg-primary-foreground/10 rounded-2xl p-6">
                <HardHat className="w-10 h-10 mb-4" />
                <h3 className="text-xl font-semibold mb-4">Chantier en cours ?</h3>
                <p className="text-lg mb-4">
                  👉 Votre présence n'est pas nécessaire.
                </p>
                <p className="opacity-90">
                  Je gère, je coordonne, je vous informe.
                </p>
                <p className="mt-4 italic opacity-80">
                  💬 C'est l'un des grands avantages d'être accompagné par un maître d'œuvre.
                </p>
              </div>
            </div>
            <div className="mt-8 grid sm:grid-cols-5 gap-4 text-center">
              <div className="bg-primary-foreground/10 rounded-xl p-4">
                <p className="text-sm font-medium">✔️ Un interlocuteur unique</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-4">
                <p className="text-sm font-medium">✔️ Gestion sereine des imprévus</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-4">
                <p className="text-sm font-medium">✔️ Coordination artisans</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-4">
                <p className="text-sm font-medium">✔️ Représentation syndic</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-4">
                <p className="text-sm font-medium">✔️ Chantier qui avance</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5 - Maître d'œuvre intégré : chacun son métier */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                5
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Maître d'œuvre intégré : chacun son métier
              </h2>
            </div>
            <motion.div 
              className="bg-accent/50 rounded-xl p-6 border-l-4 border-primary cursor-pointer group hover:bg-accent/70 transition-all duration-300 hover:shadow-lg hover:border-l-8 mb-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="text-foreground font-semibold mb-3 flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <HelpCircle className="w-6 h-6 text-primary group-hover:text-primary/80 transition-colors" />
                </motion.span>
                Est-ce une obligation d'avoir un maître d'œuvre ?
              </p>
              <p className="text-muted-foreground mb-3">
                👉 <span className="font-medium">Non, ce n'est pas une obligation légale.</span>
              </p>
              <p className="text-muted-foreground">
                Mais c'est inclus dans notre prestation car nous ne sommes pas des exécutants : 
                <span className="text-primary font-medium"> nous sommes des experts en rénovation</span>. 
                Notre rôle est de concevoir, coordonner et garantir la réussite de votre projet de A à Z.
              </p>
            </motion.div>
            <div className="bg-accent/30 rounded-2xl p-8">
              <Ruler className="w-10 h-10 text-primary mb-4" />
              <p className="text-lg text-muted-foreground mb-6">
                👉 Avec un maître d'œuvre intégré, tout est pensé avec vous et pour vous.
                Nous validons et sélectionnons ensemble chaque achat, nous gérons les commandes et les livraisons, et nous maîtrisons chaque choix du début à la fin.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 bg-background rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Produits adaptés au projet</span>
                </div>
                <div className="flex items-center gap-3 bg-background rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Compatibilité technique vérifiée</span>
                </div>
                <div className="flex items-center gap-3 bg-background rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Délais et livraisons coordonnés</span>
                </div>
                <div className="flex items-center gap-3 bg-background rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Aucune décision laissée au hasard</span>
                </div>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-6">
                <p className="text-foreground font-semibold mb-2">🧠 Chacun son métier.</p>
                <p className="text-muted-foreground">
                  Même si vous êtes un excellent bricoleur, notre rôle n'est pas l'improvisation.
                  Le maître d'œuvre ne fait pas "à peu près" :
                </p>
                <p className="text-primary font-medium mt-2">
                  👉 C'est l'art de bien faire, dans les règles, avec méthode, anticipation… et sérénité.
                </p>
              </div>
              <div className="bg-background rounded-xl p-4 border border-primary/20">
                <p className="text-primary font-medium italic">
                  💬 Résultat : un chantier fluide, maîtrisé, et un projet qui traverse le temps sans mauvaise surprise 😉
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6 - Plomberie */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                6
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Plomberie : refaire entièrement pour éviter les fuites
              </h2>
            </div>
            <div className="bg-accent/30 rounded-2xl p-8">
              <Wrench className="w-10 h-10 text-primary mb-4" />
              <p className="text-lg text-muted-foreground mb-6">
                Lorsqu'on rénove une salle de bain :
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Le plomb est remplacé par du <strong>cuivre</strong> ou du <strong>multicouche</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Les compteurs sont déplacés pour rester accessibles</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Des <strong>nourrices eau chaude / eau froide</strong> sont posées</span>
                </li>
              </ul>
              <p className="text-muted-foreground mb-4">👉 Cela permet :</p>
              <ul className="space-y-2 mb-6 text-muted-foreground">
                <li>• D'isoler chaque point d'eau</li>
                <li>• D'intervenir rapidement en cas de fuite</li>
                <li>• De sécuriser l'ensemble du logement</li>
              </ul>
              <div className="bg-background rounded-xl p-4 border border-primary/20">
                <p className="text-primary font-medium italic">
                  💬 Refaire à moitié, c'est prendre le risque de refaire deux fois.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 7 - Étanchéité */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                7
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Étanchéité salle de bain : la base invisible
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-background rounded-2xl p-8 shadow-sm">
                <Shield className="w-10 h-10 text-primary mb-4" />
                <p className="text-lg text-muted-foreground mb-4">Avant tout carrelage :</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Système d'étanchéité sous carrelage (SPEC)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Bandes d'angles</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Traitement des points singuliers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Continuité sous douche et baignoire</span>
                  </li>
                </ul>
                <p className="mt-6 text-primary font-medium">
                  👉 Un joint seul ne fait jamais une étanchéité.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={butteschaumont6} 
                  alt="Étanchéité Weber Aquastop sous carrelage salle de bain" 
                  className="w-full h-64 object-cover"
                />
                <p className="bg-foreground text-background text-sm p-3 text-center">
                  Étanchéité Weber Aquastop — obligatoire sous carrelage
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 8 - Receveur & baignoire */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                8
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Receveur et baignoire : pose, accès et maintenance
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-accent/30 rounded-2xl p-6">
                <Droplets className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-3">Sous le receveur</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Très souvent carrelage sous le receveur</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Étanchéité continue</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Bonde toujours accessible</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Trappe carrelée ou grille selon la hauteur</span>
                  </li>
                </ul>
              </div>
              <div className="bg-accent/30 rounded-2xl p-6">
                <Home className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-3">Sous la baignoire</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Trappe d'accès à carreler</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Emplacement aligné avec la bonde</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Attention aux meubles qui bloquent l'accès</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-primary/10 rounded-xl p-4 text-center">
              <p className="text-primary font-medium">
                👉 Tout ce qui peut fuir doit rester accessible.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 9 - Joints & finitions */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                9
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Joints, profils et finitions : le diable se cache dans le détail
              </h2>
            </div>

            {/* Joint mortier */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                🧱 Le joint mortier <span className="text-muted-foreground font-normal">(entre les carreaux)</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                C'est lui qui donne la lecture du carrelage. Deux choix possibles :
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <div className="rounded-2xl overflow-hidden shadow-lg mb-4">
                    <img 
                      src={guideJointAssorti} 
                      alt="Joint assorti au carrelage salle de bain" 
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Joint assorti au carrelage</h4>
                  <p className="text-muted-foreground">
                    → Rendu uniforme, doux et élégant
                  </p>
                </div>
                <div className="group">
                  <div className="rounded-2xl overflow-hidden shadow-lg mb-4">
                    <img 
                      src={guideJointNoir} 
                      alt="Joint contrasté foncé carrelage" 
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Joint plus foncé</h4>
                  <p className="text-muted-foreground">
                    → Fait ressortir la forme du carreau, souligne la pose et le calepinage
                  </p>
                </div>
              </div>
            </div>

            {/* Joint silicone */}
            <div className="mb-12 bg-background rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                🧼 Le joint silicone <span className="text-muted-foreground font-normal">(angles & zones d'eau)</span>
              </h3>
              <p className="text-muted-foreground mb-4">
                Utilisé dans les angles, autour des receveurs, baignoires, parois et pare-bains.
              </p>
              <p className="text-muted-foreground mb-4">
                → Il est souple, absorbe les mouvements et garantit l'étanchéité.
              </p>
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800">
                  Le joint silicone doit rester : propre, continu, sans fissure. À la moindre fissure : on refait immédiatement.
                </p>
              </div>
              <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                <p className="font-medium text-primary">
                  ✨ Bonne pratique : joint silicone assorti au carrelage, à la faïence ou à la paroi de douche → finition discrète et propre.
                </p>
              </div>
            </div>

            {/* Profils de finition */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                🔲 Les profils de finition
              </h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-muted-foreground mb-4">
                    Les profils ne servent pas seulement à protéger : ils participent au design global.
                  </p>
                  <p className="font-medium mb-4">Nous les choisissons :</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Assortis à la robinetterie</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>En cohérence avec la paroi de douche ou le pare-bain</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Carrés ou arrondis selon l'ambiance</span>
                    </li>
                  </ul>
                  <p className="text-primary font-medium">
                    → Le profil doit s'intégrer, pas attirer l'œil.
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={guideProfilFinition} 
                    alt="Profil de finition Schlüter assorti robinetterie" 
                    className="w-full h-80 object-cover"
                  />
                  <p className="bg-foreground text-background text-sm p-3 text-center">
                    Profil Schlüter assorti à la robinetterie
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 10 - Robinetterie encastrée */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                10
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Robinetterie encastrée : anticiper dès la conception
              </h2>
            </div>
            <div className="bg-accent/30 rounded-2xl p-8">
              <Ruler className="w-10 h-10 text-primary mb-4" />
              <p className="text-lg text-muted-foreground mb-4">
                La robinetterie encastrée impose :
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Un doublage mural</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Une anticipation dès la conception</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Une pose irréprochable</span>
                </li>
              </ul>
              <div className="bg-primary/10 rounded-xl p-4">
                <p className="text-primary font-medium">
                  👉 Ce choix se fait avant les cloisons et le carrelage.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 11 - Baignoire & receveur matériaux */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                11
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Choisir sa baignoire et son receveur
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-background rounded-2xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛁</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Acrylique</h3>
                <p className="text-muted-foreground text-sm">Léger, confortable, bon rapport qualité-prix</p>
              </div>
              <div className="bg-background rounded-2xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚫</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Fonte</h3>
                <p className="text-muted-foreground text-sm">Durable, excellente inertie thermique</p>
              </div>
              <div className="bg-background rounded-2xl p-6 shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Composites</h3>
                <p className="text-muted-foreground text-sm">Design, pose exigeante</p>
              </div>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm">
              <p className="text-muted-foreground">Le choix dépend :</p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>De la structure du sol</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>De l'usage réel</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Du confort recherché</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 12 - Peinture */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                12
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Peinture salle de bain : un produit adapté à l'humidité
              </h2>
            </div>
            <div className="bg-accent/30 rounded-2xl p-8">
              <Paintbrush className="w-10 h-10 text-primary mb-4" />
              <p className="text-lg text-muted-foreground mb-4">
                En salle de bain, nous utilisons exclusivement :
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Une peinture <strong>spéciale pièces humides</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Résistante à la condensation</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Lessivable</span>
                </li>
              </ul>
              <div className="bg-primary/10 rounded-xl p-4">
                <p className="text-primary font-medium">
                  👉 Unikalo – Aqualine Satin, pour sa tenue et sa durabilité.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 13 - VMC */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                13
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                VMC et ventilation : protéger la salle de bain dans le temps
              </h2>
            </div>
            <div className="bg-background rounded-2xl p-8 shadow-sm">
              <Wind className="w-10 h-10 text-primary mb-4" />
              <p className="text-lg text-muted-foreground mb-4">
                Sans ventilation :
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Humidité stagnante</span>
                </li>
                <li className="flex items-center gap-3 text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Moisissures</span>
                </li>
                <li className="flex items-center gap-3 text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Dégradation prématurée</span>
                </li>
              </ul>
              <div className="bg-primary/10 rounded-xl p-4">
                <p className="text-primary font-medium">
                  👉 Une VMC bien pensée protège toute la salle de bain.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Résumé */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-serif mb-8">
              🎯 En résumé
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-primary-foreground/10 rounded-xl p-5 flex items-center gap-4">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium text-left">La technique avant l'esthétique</span>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-5 flex items-center gap-4">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium text-left">Inspection, anticipation, accès</span>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-5 flex items-center gap-4">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium text-left">Réseaux sécurisés</span>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-5 flex items-center gap-4">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium text-left">Étanchéité maîtrisée</span>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-5 flex items-center gap-4">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium text-left">Détails soignés</span>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-5 flex items-center gap-4">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span className="font-medium text-left">Accompagnement de A à Z</span>
              </div>
            </div>
            <p className="text-xl italic opacity-90">
              "Réussir sa salle de bain, ce n'est pas faire des choix au hasard.<br />
              C'est faire les bons choix, au bon moment, avec les bonnes personnes."
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Questions fréquentes */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-center mb-8">
              Questions fréquentes
            </h2>
            
            {/* Sous-section Douche à l'italienne */}
            <h3 className="text-xl font-serif text-primary mb-4 flex items-center gap-2">
              🚿 Douche à l'italienne
            </h3>
            <div className="space-y-4 mb-8">
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">
                  ❓ Qu'est-ce qu'une douche à l'italienne ?
                </h4>
                <p className="text-muted-foreground">
                  Une douche à l'italienne est une douche de plain-pied, sans marche ni receveur surélevé. Elle s'intègre parfaitement au sol de la salle de bain, offrant un accès facile et un design épuré. C'est la solution idéale pour une salle de bain moderne et accessible.
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">
                  ❓ Peut-on installer une douche à l'italienne dans un appartement ancien ?
                </h4>
                <p className="text-muted-foreground">
                  Oui, la création d'une douche italienne est possible dans la plupart des appartements, même anciens. Notre maître d'œuvre réalise une étude de faisabilité gratuite pour évaluer les contraintes techniques (hauteur de réservation, évacuations) et vous proposer la meilleure solution.
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">
                  ❓ Comment garantissez-vous l'étanchéité d'une douche à l'italienne ?
                </h4>
                <div className="text-muted-foreground space-y-2">
                  <p>
                    L'étanchéité est une <strong>obligation DTU</strong> (référence DTU 52.2 pour les revêtements céramiques en locaux humides).
                  </p>
                  <p>
                    Nous utilisons des systèmes certifiés Schlüter, Wedi et Weber, posés selon les règles de l'art. Nous vous envoyons systématiquement les <strong>photos de la mise en œuvre</strong> (application SEL/SPEC, bandes d'étanchéité, raccords) pour vous garantir un travail conforme.
                  </p>
                  <p className="font-medium text-foreground">
                    Chaque douche bénéficie d'une garantie étanchéité 10 ans et de notre garantie décennale MIC Assurances.
                  </p>
                </div>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">
                  ❓ Pourquoi l'étanchéité sous carrelage est-elle obligatoire ?
                </h4>
                <div className="text-muted-foreground space-y-2">
                  <p>
                    L'étanchéité (la peinture bleue visible sur nos photos de chantier) est obligatoire selon le DTU pour les pièces humides. Appliquée sur les murs ET le sol avant la pose du carrelage, elle crée une barrière imperméable qui protège votre appartement et celui de vos voisins contre les infiltrations d'eau.
                  </p>
                  <p>
                    Il existe deux systèmes : le <strong>SEL</strong> (Système d'Étanchéité Liquide) appliqué au rouleau ou à la brosse, et le <strong>SPEC</strong> (Système de Protection à l'Eau sous Carrelage) qui comprend des bandes et manchettes à coller aux angles et traversées.
                  </p>
                  <p className="font-medium text-foreground">
                    Nous utilisons les produits Weber Aquastop, marque pionnière et innovante dans notre métier.
                  </p>
                </div>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">
                  ❓ Quel receveur de douche choisir ?
                </h4>
                <div className="text-muted-foreground space-y-2">
                  <p>Nous proposons différents types de receveurs de douche :</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Receveur extra-plat en résine</li>
                    <li>Receveur à carreler pour un rendu 100% personnalisé</li>
                    <li>Receveur en acier recoupable (ajustable aux dimensions exactes)</li>
                    <li>Douche maçonnée traditionnelle</li>
                  </ul>
                  <p className="font-medium text-foreground">
                    Le choix dépend de vos goûts, de votre budget et des contraintes techniques de votre salle de bain.
                  </p>
                </div>
              </div>
            </div>

            {/* Sous-section Questions techniques */}
            <h3 className="text-xl font-serif text-primary mb-4 flex items-center gap-2">
              🔧 Questions techniques
            </h3>
            <div className="space-y-4">
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">
                  ❓ Faut-il refaire toute la plomberie lors d'une rénovation de salle de bain ?
                </h3>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    👉 <strong>Oui, dans la grande majorité des cas.</strong><br />
                    Les DTU imposent que toute installation modifiée soit mise aux normes actuelles : le plomb est interdit, les raccords encastrés non accessibles sont proscrits, et les matériaux autorisés sont le cuivre ou le multicouche.
                  </p>
                  <p>
                    🛡 <strong>Côté assurances</strong>, une plomberie ancienne conservée peut entraîner un refus de prise en charge en cas de fuite.
                  </p>
                  <p className="font-medium text-foreground">
                    Conclusion : refaire la plomberie, c'est sécuriser l'installation, le chantier… et l'assurance.
                  </p>
                </div>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">
                  ❓ La bonde doit-elle rester accessible ?
                </h3>
                <p className="text-muted-foreground">
                  Toujours. Une trappe d'accès est indispensable pour intervenir rapidement en cas de problème.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-serif mb-4">
              Prêt à concrétiser votre projet ?
            </h2>
            <p className="text-muted-foreground mb-8">
              Discutons ensemble de votre future salle de bain
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link to="/devis">
                  Demander un devis gratuit
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group">
                <a href="tel:+33612345678">
                  <Phone className="mr-2 w-4 h-4" />
                  Nous appeler
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Guide;
