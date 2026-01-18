import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, AlertTriangle, Droplets, Shield, Wrench, Sparkles } from "lucide-react";

// Images
import guideJointNoir from "@/assets/guide-joint-noir.webp";
import guideJointAssorti from "@/assets/guide-joint-assorti.webp";
import guideProfilFinition from "@/assets/guide-profil-finition.webp";
import butteschaumont6 from "@/assets/buttes-chaumont-6.jpg";

const Guide = () => {
  return (
    <Layout>
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
              Guide Spécial Salle de Bain
            </h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-4">
              Bien choisir pour durer
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une salle de bain réussie, ce n'est pas qu'une question de style.<br />
              C'est une somme de bons choix techniques… jusque dans les moindres détails.
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
              Chez QualiRénovation by QualiConcept, on valide chaque produit, parce que le diable se cache dans le détail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 1 - Règle d'or */}
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
                Avant de commencer : la règle d'or
              </h2>
            </div>
            <div className="bg-background rounded-2xl p-8 shadow-sm">
              <p className="text-lg text-muted-foreground mb-4">
                La salle de bain concentre eau, étanchéité, carrelage et équipements.
              </p>
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800 font-medium">
                  Revenir casser après coup coûte toujours cher. La qualité se choisit dès le départ.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 - Douche & receveur */}
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
                Douche & receveur : l'esthétique face à la réalité technique
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-accent/30 rounded-2xl p-6">
                <Droplets className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-3">En appartement</h3>
                <p className="text-muted-foreground mb-4">
                  Le plain-pied est rare (évacuation de l'immeuble). Une marche maîtrisée est souvent la solution la plus fiable.
                </p>
                <p className="text-sm text-primary font-medium">
                  → Receveur à poser : plus sécurisant en appartement
                </p>
              </div>
              <div className="bg-accent/30 rounded-2xl p-6">
                <Wrench className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-3">En maison</h3>
                <p className="text-muted-foreground mb-4">
                  Avec accès technique à la bonde, plus de flexibilité sur le type de receveur.
                </p>
                <p className="text-sm text-primary font-medium">
                  → Receveur à carreler : à privilégier avec accès technique
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Étanchéité */}
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
                Étanchéité : invisible mais fondamentale
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-background rounded-2xl p-8 shadow-sm">
                <Shield className="w-10 h-10 text-primary mb-4" />
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Étanchéité sous carrelage (SEL/SPEC)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Traitement des angles et points d'eau</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Contrôle avant fermeture</span>
                  </li>
                </ul>
                <p className="mt-6 text-primary font-medium">
                  → C'est la base de la durabilité.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={butteschaumont6} 
                  alt="Étanchéité Weber Aquastop" 
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

      {/* Section 4 - Baignoire */}
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
                4
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Baignoire : investir dans la qualité
              </h2>
            </div>
            <div className="bg-accent/30 rounded-2xl p-8">
              <h3 className="font-semibold text-lg mb-4">Nous recommandons :</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Acrylique renforcée avec gel coat</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Fond antidérapant intégré</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Marques reconnues</span>
                </li>
              </ul>
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800">
                  Remplacer une baignoire après pose (carrelage, plomberie, étanchéité) coûte toujours trop cher.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5 - Achats en ligne */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                5
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                ⚠️ Achats en ligne & baignoires asymétriques
              </h2>
            </div>
            <div className="bg-background rounded-2xl p-8 shadow-sm border border-red-200">
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Délais de retour longs</span>
                </li>
                <li className="flex items-center gap-3 text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Réponses parfois lentes en cas de produit cassé</span>
                </li>
                <li className="flex items-center gap-3 text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Chantier bloqué 15 à 20 jours, parfois plus</span>
                </li>
              </ul>
              <div className="bg-red-100 rounded-xl p-4 border border-red-200">
                <p className="text-red-800 font-medium mb-2">💬 Retour d'expérience réel :</p>
                <p className="text-red-700">1 mois perdu à gérer une baignoire livrée cassée.</p>
                <p className="text-red-800 font-semibold mt-2">→ Pas cher est souvent synonyme de retard.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6 - Profils, joints & finitions */}
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
                6
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                🔍 Profils, joints & finitions : le détail qui fait tout
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
                      alt="Joint assorti au carrelage" 
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
                      alt="Joint contrasté foncé" 
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
            <div className="mb-12 bg-accent/30 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                🧼 Le joint silicone <span className="text-muted-foreground font-normal">(angles & zones d'eau)</span>
              </h3>
              <p className="text-muted-foreground mb-4">
                Utilisé dans les angles, autour des receveurs, baignoires, parois et pare-bains.
              </p>
              <p className="text-muted-foreground mb-4">
                → Il est souple, absorbe les mouvements et garantit l'étanchéité.
              </p>
              <div className="bg-background rounded-xl p-4 border border-primary/20">
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
                    alt="Profil de finition Schlüter" 
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

      {/* Section 7 - Notre méthode */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary-foreground rounded-full flex items-center justify-center text-primary font-bold text-xl">
                7
              </div>
              <h2 className="text-2xl md:text-3xl font-serif">
                Notre méthode
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-primary-foreground/10 rounded-2xl p-6">
                <Sparkles className="w-8 h-8 mx-auto mb-3" />
                <p className="font-medium">Aucun joint choisi au hasard</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-2xl p-6">
                <Wrench className="w-8 h-8 mx-auto mb-3" />
                <p className="font-medium">Aucun profil posé par défaut</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-2xl p-6">
                <CheckCircle className="w-8 h-8 mx-auto mb-3" />
                <p className="font-medium">Chaque finition validée pour un visuel cohérent</p>
              </div>
            </div>
            <p className="text-xl italic opacity-90">
              "Une belle salle de bain, ce n'est pas une addition de produits, c'est une composition maîtrisée."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Résumé */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-center mb-8">
              🎯 En résumé
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-background rounded-xl p-5 flex items-center gap-4 shadow-sm">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                <span className="font-medium">Qualité avant le prix</span>
              </div>
              <div className="bg-background rounded-xl p-5 flex items-center gap-4 shadow-sm">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                <span className="font-medium">Produits validés en amont</span>
              </div>
              <div className="bg-background rounded-xl p-5 flex items-center gap-4 shadow-sm">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                <span className="font-medium">Détails soignés</span>
              </div>
              <div className="bg-background rounded-xl p-5 flex items-center gap-4 shadow-sm">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                <span className="font-medium">Zéro reprise inutile</span>
              </div>
            </div>
            <p className="text-center text-lg text-muted-foreground mt-8">
              C'est dans ces détails-là que naît la vraie réussite d'un projet.
            </p>
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
            <Button asChild size="lg" className="group">
              <Link to="/devis">
                Demander un devis gratuit
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Guide;
