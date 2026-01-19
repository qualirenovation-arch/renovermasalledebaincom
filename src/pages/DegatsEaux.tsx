import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Eye, AlertTriangle, Shield, Droplets, CheckCircle2, ArrowRight, Sparkles, ClipboardList, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Vidéos conseils sur les dégâts des eaux
const degatsEauxVideos = [
  {
    id: "degats-eaux-2",
    title: "Dégât des eaux : les bons réflexes",
    description: "Découvrez nos conseils d'experts pour éviter les sinistres et protéger votre rénovation.",
    tip: "👉 Les points essentiels à surveiller pour une installation pérenne.",
    videoSrc: "/videos/degats-eaux-2.mp4",
    views: "15.8k",
  },
  {
    id: "degats-eaux-1",
    title: "Prévenir les dégâts des eaux",
    description: "Un dégât des eaux peut ruiner une rénovation et entraîner des frais considérables. La clé : des raccords de qualité, une étanchéité parfaite et des contrôles réguliers.",
    tip: "👉 Dans cette vidéo, je vous montre les erreurs à éviter et les bonnes pratiques à adopter.",
    videoSrc: "/videos/degats-eaux-1.mp4",
    views: "3.7k",
  },
];

export default function DegatsEaux() {
  return (
    <Layout>
      <Helmet>
        <title>Dégâts des eaux : prévention et conseils | renovermasalledebain.com</title>
        <meta name="description" content="Découvrez nos conseils d'experts pour prévenir les dégâts des eaux lors de la rénovation de votre salle de bain. Vidéos explicatives et bonnes pratiques." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-background py-12 md:py-16">
        <div className="container-custom">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            {...fadeInUp}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Dégâts des eaux
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Prévention, bonnes pratiques et conseils d'experts pour éviter les sinistres
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section explicative mobile-optimisée */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container-custom">
          <motion.div
            className="max-w-md mx-auto px-4 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Accroche percutante */}
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-display font-bold text-foreground leading-tight">
                😱 Appartement inondé ?
              </p>
              <p className="text-lg md:text-xl text-primary font-medium mt-1">
                Voilà ce que personne ne vous dit…
              </p>
            </div>

            {/* Texte simplifié */}
            <div className="space-y-3 text-center">
              <p className="text-muted-foreground text-base">
                Après un dégât des eaux, beaucoup appellent une entreprise de rénovation.
              </p>
              <p className="text-red-600 font-medium flex items-center justify-center gap-2">
                <span>❌</span> Mauvaise idée : elle se contente souvent d'exécuter des travaux.
              </p>
            </div>

            {/* Notre différence */}
            <div className="bg-primary/5 rounded-xl p-4 md:p-6 border border-primary/10">
              <p className="text-foreground font-semibold text-center mb-1">
                👉 Chez QualiRénovation, nous allons plus loin.
              </p>
              <p className="text-primary font-medium text-center">
                Nous avons un maître d'œuvre intégré.
              </p>
            </div>

            {/* Liste des avantages */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-border/50">
              <h3 className="font-semibold text-foreground mb-4 text-center text-sm uppercase tracking-wide">
                Ce que ça change pour vous
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm md:text-base">Des devis complets (pas de réparations partielles)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm md:text-base">Un accompagnement avec l'assurance et le syndic</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm md:text-base">Une prise en charge globale si le logement est inhabitable</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm md:text-base">Une coordination complète jusqu'à la remise en état finale</span>
                </li>
              </ul>
            </div>

            {/* Phrase résultat */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl p-4 md:p-6 border border-amber-200/50">
              <p className="text-center text-foreground font-medium flex items-center justify-center gap-2 flex-wrap">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Vous êtes indemnisé, accompagné et votre logement est remis en état correctement.</span>
              </p>
            </div>

            {/* Différenciation finale */}
            <div className="text-center space-y-2 pt-2">
              <p className="text-muted-foreground flex items-center justify-center gap-2">
                <ArrowRight className="w-4 h-4" />
                <span>Une entreprise répare.</span>
              </p>
              <p className="text-primary font-semibold">
                Nous défendons vos intérêts et pilotons votre projet de A à Z.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section SEO - 3 blocs horizontaux */}
      <section className="py-12 md:py-16 bg-stone-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bloc 1 - Risque majeur */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm border border-border/30 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Risque majeur</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Un dégât des eaux peut rendre un logement inhabitable et entraîner des coûts importants s'il est mal géré.
              </p>
            </motion.div>
            
            {/* Bloc 2 - Maîtrise d'œuvre intégrée */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm border border-border/30 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <HardHat className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Maîtrise d'œuvre intégrée</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Nous pilotons la remise en état complète avec un maître d'œuvre intégré, au-delà d'une simple exécution de travaux.
              </p>
            </motion.div>
            
            {/* Bloc 3 - Prise en charge globale */}
            <motion.div
              className="bg-white rounded-xl p-6 shadow-sm border border-border/30 flex flex-col h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <ClipboardList className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Prise en charge globale</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Devis complets, accompagnement assurance habitation et coordination des travaux jusqu'à la remise en état finale.
              </p>
            </motion.div>
          </div>

          {/* Texte SEO sous les blocs */}
          <motion.div
            className="mt-10 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
              Après un dégât des eaux, faire appel à une structure avec maître d'œuvre intégré permet d'assurer une remise en état conforme, une meilleure prise en charge par l'assurance et une coordination complète des travaux, notamment lorsque le logement est inhabitable.
            </p>
            
            <Button asChild variant="default" size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/devis" className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                Être accompagné après un dégât des eaux
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Section Vidéos Conseils */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              Vidéos Conseils
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nos conseils d'experts en vidéo pour prévenir les dégâts des eaux et protéger votre rénovation.
            </p>
          </motion.div>

          {/* Grille de vidéos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {degatsEauxVideos.map((video, index) => (
              <motion.div
                key={video.id}
                className="bg-stone rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="aspect-[9/16] bg-muted relative">
                  <video
                    src={video.videoSrc}
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground line-clamp-2 mb-2">{video.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{video.description}</p>
                  <p className="text-xs text-primary mb-3">{video.tip}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {video.views} vues
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {degatsEauxVideos.length === 1 && (
            <motion.p
              className="text-center text-muted-foreground mt-8 italic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              D'autres vidéos conseils arrivent bientôt...
            </motion.p>
          )}
        </div>
      </section>

      {/* Section conseils texte */}
      <section className="section-padding bg-stone">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8 text-center">
              Les bonnes pratiques
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">1</span>
                  Utilisez des raccords de qualité
                </h3>
                <p className="text-muted-foreground text-sm pl-10">
                  Privilégiez les raccords à sertir ou à compression de marques reconnues. Évitez les raccords à visser bas de gamme qui peuvent céder avec le temps.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">2</span>
                  Assurez une étanchéité parfaite
                </h3>
                <p className="text-muted-foreground text-sm pl-10">
                  Sous le carrelage de douche, appliquez un système d'étanchéité liquide (SEL) ou une membrane (SPEC) conforme au DTU 52.2.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">3</span>
                  Faites des tests de pression
                </h3>
                <p className="text-muted-foreground text-sm pl-10">
                  Avant de refermer les murs, testez la pression de vos canalisations pendant 24h minimum pour détecter toute fuite.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">4</span>
                  Conservez l'accès aux vannes
                </h3>
                <p className="text-muted-foreground text-sm pl-10">
                  Gardez toujours un accès facile aux vannes d'arrêt et aux raccords pour pouvoir intervenir rapidement en cas de problème.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
