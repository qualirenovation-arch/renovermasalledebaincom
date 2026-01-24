import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LazyVideo } from "@/components/ui/lazy-video";
import { ArrowRight, CheckCircle, AlertTriangle, Droplets, Shield, Wrench, Sparkles, Eye, Users, Home, Phone, Paintbrush, Wind, HardHat, Building, Hammer, Ruler, HelpCircle, Play, Lightbulb, Thermometer, Flame, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";

// Images
import guideJointNoir from "@/assets/guide-joint-noir.webp";
import guideJointAssorti from "@/assets/guide-joint-assorti.webp";
import guideProfilFinition from "@/assets/guide-profil-finition.webp";
import butteschaumont6 from "@/assets/buttes-chaumont-6.jpg";
import cielDePluiePlafond from "@/assets/chatelet-ciel-pluie-plafond.jpg";
import baignoireRangementNiches from "@/assets/baignoire-rangement-niches.jpg";
import baignoireRangementTiroirs from "@/assets/baignoire-rangement-tiroirs.jpg";
import nicolasRoretDouche from "@/assets/nicolas-roret-douche.jpg";
import receveursDouche from "@/assets/receveurs-douche.jpg";

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
          "text": "Obligation DTU 52.2 : nous utilisons des systèmes certifiés (Schlüter, Wedi, Weber Aquastop) avec SEL/SPEC et bandes d'étanchéité. Garantie 10 ans + décennale MIC Assurances."
        }
      },
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

      {/* Section Vidéos Conseils - Intégrées directement */}
      <section className="py-12 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                <Play className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-2">
                📹 Vidéos Conseils
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nos vidéos explicatives pour faire les bons choix avant vos travaux
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Vidéo 1 - Vasque à poser */}
              <div className="bg-background rounded-xl overflow-hidden shadow-md border border-primary/10">
                <LazyVideo 
                  src="/videos/vasque-a-poser-1.mp4"
                  className="w-full aspect-[9/16]"
                  title="Comment choisir votre vasque à poser"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-foreground line-clamp-2">Comment choisir votre vasque à poser</h3>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> 17.4k vues
                  </p>
                </div>
              </div>
              
              {/* Vidéo 2 - Carrelage meuble vasque */}
              <div className="bg-background rounded-xl overflow-hidden shadow-md border border-primary/10">
                <LazyVideo 
                  src="/videos/vasque-a-poser-2.mp4"
                  className="w-full aspect-[9/16]"
                  title="Faut-il carreler toute hauteur devant le meuble vasque ?"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-foreground">Faut-il carreler toute hauteur devant le meuble vasque ?</h3>
                  <p className="text-xs text-muted-foreground mt-1">Réponse : Pas forcément. S'il y a un miroir toute hauteur, le carrelage derrière n'a aucun intérêt technique, ne se voit pas et augmente inutilement le devis.</p>
                  <p className="text-xs text-primary mt-2">👉 Je vous explique tout dans la vidéo, pour faire les bons choix et garder un budget maîtrisé.</p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> 15.9k vues
                  </p>
                </div>
              </div>
              
              {/* Vidéo 3 - VMC + rangement malin */}
              <div className="bg-background rounded-xl overflow-hidden shadow-md border border-primary/10">
                <LazyVideo 
                  src="/videos/vmc-1.mp4"
                  className="w-full aspect-[9/16]"
                  title="VMC WC + rangement malin : le combo gagnant"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-foreground">VMC WC + rangement malin : le combo gagnant ✨</h3>
                  <p className="text-xs text-muted-foreground mt-1">En conservant la VMC collective et en intégrant l'accès dans la menuiserie, on a pu créer un placard au-dessus des WC, sans compromettre la ventilation.</p>
                  <p className="text-xs text-primary mt-2">👉 Plus de rangements, une solution propre, conforme… et futée.</p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> 59.5k vues
                  </p>
                </div>
              </div>
              
              {/* Vidéo 4 - Accès évacuation */}
              <div className="bg-background rounded-xl overflow-hidden shadow-md border border-primary/10">
                <LazyVideo 
                  src="/videos/acces-evacuation-1.mp4"
                  className="w-full aspect-[9/16]"
                  title="Accès évacuation : indispensable en cas d'engorgement"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-foreground">Accès évacuation : indispensable en cas d'engorgement 🔧</h3>
                  <p className="text-xs text-muted-foreground mt-1">L'accès aux évacuations doit toujours rester accessible. En cas d'engorgement, une trappe permet d'intervenir sans tout casser.</p>
                  <p className="text-xs text-primary mt-2">👉 Un détail essentiel à prévoir dès la conception.</p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> 8.2k vues
                  </p>
                </div>
              </div>
              
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sommaire cliquable */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              📋 Sommaire
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <a href="#section-1" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">1</span>
                <span className="line-clamp-1">Visite chantier</span>
              </a>
              <a href="#section-2" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">2</span>
                <span className="line-clamp-1">Démolition</span>
              </a>
              <a href="#section-3" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">3</span>
                <span className="line-clamp-1">Fonte & syndic</span>
              </a>
              <a href="#section-4" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">4</span>
                <span className="line-clamp-1">Maître d'œuvre</span>
              </a>
              <a href="#section-5" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">5</span>
                <span className="line-clamp-1">Plomberie</span>
              </a>
              <a href="#section-6" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">6</span>
                <span className="line-clamp-1">Étanchéité</span>
              </a>
              <a href="#section-7" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">7</span>
                <span className="line-clamp-1">Receveur & baignoire</span>
              </a>
              <a href="#section-8" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">8</span>
                <span className="line-clamp-1">Joints & finitions</span>
              </a>
              <a href="#section-9" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">9</span>
                <span className="line-clamp-1">Robinetterie</span>
              </a>
              <a href="#section-10" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">10</span>
                <span className="line-clamp-1">Choisir sa baignoire</span>
              </a>
              <a href="#section-11" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">11</span>
                <span className="line-clamp-1">Peinture</span>
              </a>
              <a href="#section-12" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">12</span>
                <span className="line-clamp-1">VMC</span>
              </a>
              <a href="#section-13" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent/50">
                <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">13</span>
                <span className="line-clamp-1">Éclairage & chauffage</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 1 - Visite initiale */}
      <section id="section-1" className="py-16 bg-accent/20 scroll-mt-20">
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
      <section id="section-2" className="py-16 bg-background scroll-mt-20">
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
      <section id="section-3" className="py-16 bg-accent/20 scroll-mt-20">
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

      {/* Section 4 - Maître d'œuvre : votre allié de A à Z */}
      <section id="section-4" className="py-16 bg-primary text-primary-foreground scroll-mt-20">
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
                Maître d'œuvre : votre allié de A à Z
              </h2>
            </div>
            
            {/* Introduction condensée */}
            <div className="bg-primary-foreground/10 rounded-2xl p-6 mb-8">
              <p className="text-lg mb-4">
                👉 <strong>Votre présence n'est pas nécessaire sur le chantier.</strong> Je gère, je coordonne, je vous informe.
              </p>
              <p className="opacity-90">
                Ce n'est pas une obligation légale, mais c'est inclus dans notre prestation car nous ne sommes pas des exécutants : 
                <span className="font-semibold"> nous sommes des experts en rénovation</span>.
              </p>
            </div>

            {/* Grille des avantages */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <Users className="w-8 h-8 mb-3" />
                <h3 className="text-lg font-semibold mb-3">Ce que je fais pour vous :</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Assistance démarches syndic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Coordination artisans & intervenants</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Gestion des décisions techniques</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Sélection & commande des produits</span>
                  </li>
                </ul>
              </div>
              <div>
                <Ruler className="w-8 h-8 mb-3" />
                <h3 className="text-lg font-semibold mb-3">Ce que vous gagnez :</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Un interlocuteur unique</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Compatibilité technique vérifiée</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Délais et livraisons coordonnés</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Aucune décision laissée au hasard</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Résumé en badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              <div className="bg-primary-foreground/10 rounded-xl p-3 text-center">
                <p className="text-xs font-medium">✔️ Gestion imprévus</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-3 text-center">
                <p className="text-xs font-medium">✔️ Représentation syndic</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-3 text-center">
                <p className="text-xs font-medium">✔️ Chantier fluide</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-3 text-center">
                <p className="text-xs font-medium">✔️ Sérénité garantie</p>
              </div>
            </div>

            {/* Citation finale */}
            <div className="bg-primary-foreground/20 rounded-xl p-4 text-center">
              <p className="font-medium italic">
                🧠 Chacun son métier. Le maître d'œuvre ne fait pas "à peu près" : c'est l'art de bien faire, avec méthode et anticipation.
              </p>
            </div>
            
            {/* Lien vers l'article Houzz */}
            <div className="mt-6 text-center">
              <a 
                href="https://www.houzz.fr/magazine/pourquoi-est-il-judicieux-de-faire-appel-a-un-maitre-d-oeuvre-stsetivw-vs~87724005"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground underline underline-offset-4 transition-colors text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Lire l'interview Houzz : "Pourquoi faire appel à un maître d'œuvre ?"</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5 - Plomberie */}
      <section id="section-5" className="py-16 bg-accent/20 scroll-mt-20">
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

      {/* Section 6 - Étanchéité */}
      <section id="section-6" className="py-16 bg-background scroll-mt-20">
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

      {/* Section 7 - Receveur & baignoire */}
      <section id="section-7" className="py-16 bg-accent/20 scroll-mt-20">
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
                Receveur de douche : le bon choix
              </h2>
            </div>

            {/* Définition + rôle condensés */}
            <div className="bg-background rounded-2xl p-6 shadow-sm border border-primary/10 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <HelpCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">
                    Le <strong>receveur</strong> (bac à douche) collecte l'eau et la dirige vers l'évacuation. Il assure <strong>étanchéité</strong>, <strong>sécurité antidérapante</strong> et <strong>confort</strong>.
                  </p>
                </div>
              </div>
              
              {/* Types d'installation + Matériaux en grille compacte */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm">🔧 Installation</h4>
                  <div className="space-y-1 text-xs">
                    <p><strong>Surélevé</strong> : simple, siphon horizontal, marche &gt;5cm</p>
                    <p><strong>À poser</strong> : rapide, évacuation verticale, marche &lt;5cm</p>
                    <p><strong>À encastrer</strong> : plain-pied, idéal rénovation complète</p>
                    <p><strong>À carreler</strong> : douche italienne, pentes intégrées</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2 text-sm">📦 Matériaux</h4>
                  <div className="space-y-1 text-xs">
                    <p><strong>Résine</strong> : extra-plat, durable, le plus courant</p>
                    <p><strong>Acrylique</strong> : léger, antidérapant, sensible rayures</p>
                    <p><strong>Grès émaillé</strong> : résistant, lourd, glissant</p>
                    <p><strong>Acier émaillé</strong> : dimensions exactes sur commande</p>
                  </div>
                </div>
              </div>

              {/* Dimensions compactes */}
              <div className="flex flex-wrap gap-2 mb-4 text-xs">
                <span className="bg-accent/50 px-3 py-1 rounded-full">◻️ Carré : 70×70 à 120×120</span>
                <span className="bg-accent/50 px-3 py-1 rounded-full">▭ Rectangulaire : 70×90 à 180×90</span>
                <span className="bg-accent/50 px-3 py-1 rounded-full">◔ Quart de cercle : 80 à 110</span>
              </div>

              {/* Évacuation condensée */}
              <div className="bg-accent/30 rounded-lg p-3 text-xs">
                <strong>💧 Évacuation :</strong> Siphon vertical ou horizontal selon espace • Bonde extra-plate (Ø90mm min.) • Pieds réglables 90-125mm
              </div>
            </div>

            {/* Contrainte copropriété vs maison - IMPORTANT */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="mb-2">
                    <strong className="text-foreground">🏢 Copropriété :</strong> la <strong>hauteur de la culotte</strong> (raccord colonne immeuble) détermine si plain-pied ou sur pied possible. Contrainte incompressible.
                  </p>
                  <p>
                    <strong className="text-foreground">🏠 Maison :</strong> liberté totale, évacuation adaptable.
                  </p>
                </div>
              </div>
            </div>

            {/* Maintenance */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-accent/30 rounded-xl p-4">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-primary" /> Sous le receveur
                </h3>
                <p className="text-xs text-muted-foreground">Carrelage dessous • Étanchéité continue • Bonde accessible • Trappe carrelée</p>
              </div>
              <div className="bg-accent/30 rounded-xl p-4">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4 text-primary" /> Sous la baignoire
                </h3>
                <p className="text-xs text-muted-foreground">Trappe d'accès carrelée • Alignée avec la bonde • Attention meubles bloquants</p>
              </div>
            </div>
            
            <div className="mt-4 bg-primary/10 rounded-lg p-3 text-center">
              <p className="text-primary font-medium text-sm">
                👉 Tout ce qui peut fuir doit rester accessible.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 7bis - Les niches */}
      <section id="section-niches" className="py-16 bg-accent/20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Une niche, c'est quoi ?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img 
                  src={baignoireRangementNiches} 
                  alt="Niche encastrée dans une douche - Rangement intégré" 
                  className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm font-medium">Niche encastrée — Projet réel</p>
                </div>
              </div>

              {/* Explication */}
              <div className="space-y-4">
                <div className="bg-background rounded-xl p-6 shadow-sm border border-primary/10">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Définition
                  </h3>
                  <p className="text-muted-foreground">
                    Une <strong>niche</strong> est un renfoncement créé dans le mur de la douche ou de la baignoire. 
                    Elle permet de ranger shampoings, savons et produits sans encombrer l'espace.
                  </p>
                </div>

                <div className="bg-background rounded-xl p-6 shadow-sm border border-primary/10">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    À quoi ça sert ?
                  </h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Gain de place</strong> : pas de panier suspendu ni d'étagère au sol</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Design épuré</strong> : rangement invisible intégré au carrelage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Entretien facile</strong> : pas d'accessoire à nettoyer autour</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <span><strong>Durabilité</strong> : intégrée au mur, elle ne bouge pas et ne rouille pas</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-primary font-medium text-sm">
                    💡 Une niche bien positionnée (à hauteur d'épaule) change le confort au quotidien.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 8 - Joints & finitions */}
      <section id="section-8" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                8
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Joints, profils et finitions : le diable se cache dans le détail
              </h2>
            </div>

            {/* Joint mortier */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4">🧱 Joint mortier</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <div className="rounded-2xl overflow-hidden shadow-lg mb-3">
                    <img 
                      src={guideJointAssorti} 
                      alt="Joint assorti au carrelage" 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-muted-foreground text-sm"><strong>Joint assorti</strong> → Rendu uniforme et élégant</p>
                </div>
                <div className="group">
                  <div className="rounded-2xl overflow-hidden shadow-lg mb-3">
                    <img 
                      src={guideJointNoir} 
                      alt="Joint contrasté foncé" 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-muted-foreground text-sm"><strong>Joint foncé</strong> → Souligne la pose et le calepinage</p>
                </div>
              </div>
            </div>

            {/* Joint silicone */}
            <div className="mb-10 bg-background rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">🧼 Joint silicone (angles & zones d'eau)</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Souple, absorbe les mouvements, garantit l'étanchéité. À refaire dès la moindre fissure.
              </p>
              <p className="text-primary font-medium text-sm">
                ✨ Conseil : silicone assorti au carrelage pour une finition discrète.
              </p>
            </div>

            {/* Profils de finition */}
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-lg font-semibold mb-3">🔲 Profils de finition</h3>
                <p className="text-muted-foreground text-sm mb-3">Choisis assortis à la robinetterie et paroi de douche.</p>
                <p className="text-primary font-medium text-sm">→ Le profil doit s'intégrer, pas attirer l'œil.</p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={guideProfilFinition} 
                  alt="Profil Schlüter assorti robinetterie" 
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 9 - Robinetterie encastrée */}
      <section id="section-9" className="py-16 bg-accent/20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                9
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Robinetterie encastrée : anticiper dès la conception
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-accent/30 rounded-xl p-6">
                <p className="text-muted-foreground mb-3">Impose : doublage mural, anticipation dès conception, pose irréprochable.</p>
                <ul className="space-y-2 text-muted-foreground text-sm mt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Mitigeur encastré thermostatique</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Ciel de pluie encastré plafond</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Douchette à main complémentaire</span>
                  </li>
                </ul>
                <p className="text-primary font-medium text-sm mt-4">👉 Ce choix se fait avant les cloisons et le carrelage.</p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={cielDePluiePlafond} 
                  alt="Ciel de pluie encastré au plafond avec robinetterie noire" 
                  className="w-full h-72 object-cover"
                />
                <p className="bg-foreground text-background text-sm p-3 text-center">
                  Ciel de pluie encastré plafond — finition noire mate
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 10 - Choisir sa baignoire */}
      <section id="section-10" className="py-16 bg-background scroll-mt-20">
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
                Choisir sa baignoire
              </h2>
            </div>

            {/* Définition rapide */}
            <div className="bg-accent/30 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-foreground">C'est quoi une baignoire ?</p>
                  <p className="text-muted-foreground text-xs mt-1">Un équipement de bain permettant l'immersion complète du corps. Choix selon l'espace, le confort souhaité et la structure du sol (poids à supporter).</p>
                </div>
              </div>
            </div>

            {/* Types de baignoires - Grille compacte */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-primary" />
                Types de baignoires
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-background border border-border rounded-lg p-3 text-center">
                  <span className="text-lg">📐</span>
                  <p className="font-medium text-xs mt-1">Droite</p>
                  <p className="text-muted-foreground text-[10px]">Standard, tous espaces</p>
                </div>
                <div className="bg-background border border-border rounded-lg p-3 text-center">
                  <span className="text-lg">🔲</span>
                  <p className="font-medium text-xs mt-1">Îlot</p>
                  <p className="text-muted-foreground text-[10px]">Design, espace dégagé</p>
                </div>
                <div className="bg-background border border-border rounded-lg p-3 text-center">
                  <span className="text-lg">📐</span>
                  <p className="font-medium text-xs mt-1">D'angle</p>
                  <p className="text-muted-foreground text-[10px]">Optimise les coins</p>
                </div>
                <div className="bg-background border border-border rounded-lg p-3 text-center">
                  <span className="text-lg">🚿</span>
                  <p className="font-medium text-xs mt-1">Bain-douche</p>
                  <p className="text-muted-foreground text-[10px]">Combo 2-en-1</p>
                </div>
              </div>
            </div>

            {/* Matériaux - Badges compacts */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-primary" />
                Matériaux
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  🛁 Acrylique — Léger, bon rapport qualité-prix
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  ⚫ Fonte — Durable, inertie thermique, lourd
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  ✨ Solid Surface — Design haut de gamme
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  🔩 Acier émaillé — Robuste, économique
                </span>
              </div>
            </div>

            {/* Rangements sous baignoire - Nouveau bloc */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Home className="w-5 h-5 text-green-700" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-green-800 mb-2">💡 Gain de place : rangements sous baignoire</h4>
                  <p className="text-green-700 text-sm mb-3">
                    L'espace sous la baignoire est souvent perdu. Avec une conception adaptée, on peut créer :
                  </p>
                  
                  {/* Images illustratives */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="relative rounded-lg overflow-hidden">
                      <img 
                        src={baignoireRangementNiches} 
                        alt="Baignoire avec niches de rangement intégrées" 
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white text-xs font-medium">Niches ouvertes - Design épuré</p>
                      </div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden">
                      <img 
                        src={baignoireRangementTiroirs} 
                        alt="Baignoire avec tiroirs de rangement intégrés" 
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-white text-xs font-medium">Tiroirs intégrés - Accès pratique</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="font-medium text-xs text-green-800">🗄️ Tiroirs intégrés</p>
                      <p className="text-green-600 text-[10px]">Produits, serviettes, jouets enfants</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="font-medium text-xs text-green-800">📦 Niches latérales</p>
                      <p className="text-green-600 text-[10px]">Accès facile, esthétique épurée</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="font-medium text-xs text-green-800">🚪 Trappe d'accès</p>
                      <p className="text-green-600 text-[10px]">Maintenance siphon + rangement</p>
                    </div>
                    <div className="bg-white/80 rounded-lg p-3">
                      <p className="font-medium text-xs text-green-800">🧺 Tablier amovible</p>
                      <p className="text-green-600 text-[10px]">Stockage linge, paniers</p>
                    </div>
                  </div>
                  <p className="text-green-700 text-xs mt-3 font-medium">
                    👉 Dans les petites salles de bain, chaque cm² compte. La baignoire devient un vrai meuble de rangement.
                  </p>
                </div>
              </div>
            </div>

            {/* Contrainte poids - Alerte */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800 text-sm">⚠️ Attention au poids</p>
                  <p className="text-amber-700 text-xs mt-1">
                    Une baignoire remplie + utilisateur = 300 à 400 kg. Vérifier la structure du sol (plancher bois, dalle béton). 
                    La fonte est particulièrement lourde (80-120 kg à vide).
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Section 11 - Peinture */}
      <section id="section-11" className="py-16 bg-accent/20 scroll-mt-20">
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
                Peinture salle de bain : un produit adapté à l'humidité
              </h2>
            </div>
            <div className="bg-accent/30 rounded-xl p-6">
              <p className="text-muted-foreground text-sm mb-3">
                Peinture spéciale pièces humides, résistante à la condensation, lessivable.
              </p>
              <p className="text-primary font-medium text-sm">👉 Unikalo – Aqualine Satin.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 12 - VMC */}
      <section id="section-12" className="py-16 bg-background scroll-mt-20">
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
                VMC et ventilation : protéger la salle de bain dans le temps
              </h2>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm">
              <p className="text-muted-foreground text-sm mb-2">
                Sans VMC : humidité stagnante, moisissures, dégradation prématurée.
              </p>
              <p className="text-primary font-medium text-sm">👉 Une VMC bien pensée protège toute la salle de bain.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 13 - Éclairage */}
      <section id="section-13" className="py-16 bg-accent/30 scroll-mt-20">
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
                Éclairage, chauffage & confort
              </h2>
            </div>
            <div className="bg-background rounded-2xl p-8 shadow-sm">
              <div className="space-y-8">
                {/* Spots */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Lightbulb className="w-8 h-8 text-primary" />
                    <h3 className="font-semibold text-lg text-foreground">Spots sans collerette (trimless)</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Nous privilégions les spots encastrés sans collerette pour un rendu épuré. Le spot disparaît dans le plafond, ne laissant visible que la lumière.
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">4000K blanc neutre</span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">500 lumens</span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">IP44/IP65 selon zone</span>
                    <span className="bg-mint/20 text-mint px-3 py-1 rounded-full font-medium">Norme NF C 15-100</span>
                  </div>
                </div>

                {/* Sèche-serviette */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Thermometer className="w-8 h-8 text-primary" />
                    <h3 className="font-semibold text-lg text-foreground">Sèche-serviette</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Indispensable pour le confort thermique de la salle de bain. Il chauffe la pièce et sèche vos serviettes, réduisant l'humidité ambiante.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-accent/50 rounded-xl p-4">
                      <p className="font-medium text-foreground mb-2">Électrique :</p>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Installation simple, idéal en rénovation</li>
                        <li>• Programmation et minuterie possibles</li>
                        <li>• Puissance : 500W à 1000W selon surface</li>
                      </ul>
                    </div>
                    <div className="bg-accent/50 rounded-xl p-4">
                      <p className="font-medium text-foreground mb-2">Mixte (eau + électrique) :</p>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>• Raccordé au chauffage central</li>
                        <li>• Résistance pour l'intersaison</li>
                        <li>• Plus économique à l'usage</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-primary font-medium mt-3 text-sm">
                    💡 Prévoir une ligne électrique dédiée (norme NF C 15-100).
                  </p>
                </div>

                {/* Chauffe-eau */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Flame className="w-8 h-8 text-primary" />
                    <h3 className="font-semibold text-lg text-foreground">Chauffe-eau</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Si votre chauffe-eau est dans la salle de bain, la rénovation est l'occasion idéale de le remplacer ou de l'optimiser.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="bg-accent/50 rounded-xl p-4 text-center">
                      <p className="font-medium text-foreground mb-1">Cumulus électrique</p>
                      <p className="text-muted-foreground text-sm">100L à 200L, économique à l'achat</p>
                    </div>
                    <div className="bg-accent/50 rounded-xl p-4 text-center">
                      <p className="font-medium text-foreground mb-1">Thermodynamique</p>
                      <p className="text-muted-foreground text-sm">70% d'économie, éligible aides</p>
                    </div>
                    <div className="bg-accent/50 rounded-xl p-4 text-center">
                      <p className="font-medium text-foreground mb-1">Instantané</p>
                      <p className="text-muted-foreground text-sm">Compact, eau chaude à la demande</p>
                    </div>
                  </div>
                  <p className="text-primary font-medium mt-3 text-sm">
                    💡 Ligne électrique dédiée obligatoire. Prévoir un accès pour la maintenance.
                  </p>
                </div>
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
                  ❓ Comment garantissez-vous l'étanchéité ?
                </h4>
                <div className="text-muted-foreground space-y-2">
                  <p>
                    Obligation DTU 52.2 : nous appliquons un système <strong>SEL/SPEC</strong> (Weber Aquastop) sur murs et sol avant carrelage. Photos de mise en œuvre envoyées systématiquement.
                  </p>
                  <p className="font-medium text-foreground">
                    Garantie étanchéité 10 ans + décennale MIC Assurances.
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
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">
                  ❓ L'électricité est-elle toujours conforme lors d'une rénovation de salle de bain ?
                </h3>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Lors d'une rénovation de salle de bain, l'installation électrique est systématiquement vérifiée et remise aux normes en vigueur. Cela inclut le respect des volumes de sécurité (zones où certains équipements sont interdits), la mise à la terre de tous les éléments conducteurs, les protections au tableau électrique (disjoncteur différentiel 30mA) et la conformité globale de l'installation selon la norme NF C 15-100.
                  </p>
                  <p>
                    Certains équipements comme le chauffe-eau, le sèche-serviette ou le plancher chauffant nécessitent un raccordement direct au tableau avec une ligne dédiée et un disjoncteur adapté, ce qui peut entraîner des travaux électriques supplémentaires hors périmètre initial. Ces points sont identifiés en amont lors de notre visite technique.
                  </p>
                  <p className="font-medium text-foreground">
                    Le beau est important, mais la conformité et la sécurité sont des obligations légales non négociables.
                  </p>
                </div>
              </div>
              <div className="bg-background rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">
                  ❓ Pourquoi les finitions et profilés sont-ils si importants ?
                </h3>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Les profilés de finition (angles, chants, jonctions carrelage-paroi, nez de marche) jouent un rôle clé dans le rendu final d'une salle de bain. Ils assurent à la fois la protection des matériaux contre les chocs et l'humidité, et la cohérence esthétique de l'ensemble.
                  </p>
                  <p>
                    Les profilés sont idéalement assortis aux robinetteries, accessoires et finitions générales de la pièce : noir mat, chrome brillant, inox brossé, laiton vieilli ou doré selon l'ambiance recherchée. Cette harmonie des détails crée une unité visuelle qui renforce l'impression de qualité.
                  </p>
                  <p className="font-medium text-foreground">
                    Ce sont souvent ces détails discrets qui font la différence entre une salle de bain correcte et une salle de bain réellement aboutie.
                  </p>
                </div>
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
                <Link to="/devis#devis-form">
                  Demander un devis gratuit
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group">
                <a href="tel:+33659764685">
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
