import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Eye, AlertTriangle, Shield, Droplets } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Vidéos conseils sur les dégâts des eaux
const degatsEauxVideos = [
  {
    id: "degats-eaux-1",
    title: "Prévenir les dégâts des eaux",
    description: "Un dégât des eaux peut ruiner une rénovation et entraîner des frais considérables. La clé : des raccords de qualité, une étanchéité parfaite et des contrôles réguliers.",
    tip: "👉 Dans cette vidéo, je vous montre les erreurs à éviter et les bonnes pratiques à adopter.",
    videoSrc: "/videos/degats-eaux-1.mp4",
    views: "3.7k",
  },
  {
    id: "degats-eaux-2",
    title: "Conseils dégâts des eaux",
    description: "Découvrez nos conseils d'experts pour éviter les sinistres et protéger votre rénovation.",
    tip: "👉 Les points essentiels à surveiller pour une installation pérenne.",
    videoSrc: "/videos/degats-eaux-2.mp4",
    views: "",
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

      {/* Alertes importantes */}
      <section className="py-12 bg-amber-50/50 border-y border-amber-200/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Risque majeur</h3>
                <p className="text-sm text-muted-foreground">Un dégât des eaux peut coûter plusieurs milliers d'euros et affecter les voisins.</p>
              </div>
            </motion.div>
            
            <motion.div
              className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Shield className="w-8 h-8 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Prévention</h3>
                <p className="text-sm text-muted-foreground">Des raccords de qualité et une étanchéité parfaite sont essentiels.</p>
              </div>
            </motion.div>
            
            <motion.div
              className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Droplets className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Contrôles réguliers</h3>
                <p className="text-sm text-muted-foreground">Vérifiez régulièrement vos installations pour anticiper les problèmes.</p>
              </div>
            </motion.div>
          </div>
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
