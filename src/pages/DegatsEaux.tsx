import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Eye, AlertTriangle, Shield, Droplets, CheckCircle2, ArrowRight, Sparkles, ClipboardList, HardHat, HelpCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

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

// FAQ Data
const faqData = [
  {
    question: "Que faire en priorité si mon appartement est inondé ?",
    answer: "La première étape est de déclarer le sinistre à votre assurance. Il est ensuite indispensable d'identifier l'origine de la fuite en contactant le voisin concerné et le syndic afin d'organiser une recherche de fuite. Tant que la cause n'est pas réparée par le responsable, l'assurance ne peut pas valider la remise en état définitive."
  },
  {
    question: "Pourquoi la recherche de fuite est-elle indispensable ?",
    answer: "Parce que l'assurance exige que la cause du dégât des eaux soit clairement identifiée et réparée avant toute indemnisation des travaux de remise en état."
  },
  {
    question: "Qui doit réparer l'origine du dégât des eaux ?",
    answer: "Le responsable du sinistre : le voisin si la fuite provient de son logement, ou le syndic si les parties communes sont concernées."
  },
  {
    question: "Assistez-vous aux réunions d'expertise ?",
    answer: "Oui. Nous assistons aux réunions d'expertise afin de défendre techniquement votre dossier et de faire reconnaître l'ensemble des dommages."
  },
  {
    question: "Quel est le rôle d'un expert d'assuré ?",
    answer: "L'expert d'assuré intervient uniquement dans votre intérêt. Il chiffre précisément les dégâts, négocie avec l'assurance et vise une indemnisation juste et complète."
  },
  {
    question: "Mon assurance peut-elle sous-estimer les travaux ?",
    answer: "Oui. Certains postes peuvent être oubliés ou minorés. C'est pourquoi nous établissons des devis complets et cohérents avec la réalité du chantier."
  },
  {
    question: "Puis-je être relogé pendant les travaux ?",
    answer: "Oui, si votre logement est inhabitable et si votre contrat le prévoit. Nous vous accompagnons pour faire valoir ce droit."
  },
  {
    question: "Pourquoi faire appel à un maître d'œuvre après un dégât des eaux ?",
    answer: "Parce qu'un maître d'œuvre ne se contente pas d'exécuter : il conçoit, coordonne, anticipe et défend vos intérêts jusqu'à la remise en état finale."
  }
];

// FAQ Item Component
const FAQItem = ({ question, answer, isOpen, onToggle, index }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => (
  <motion.div
    className="border-b border-border/50 last:border-b-0"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-4 text-left hover:bg-muted/30 transition-colors px-2 rounded-lg"
    >
      <span className="font-medium text-foreground pr-4">{question}</span>
      <ChevronDown 
        className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <p className="pb-4 px-2 text-muted-foreground leading-relaxed">
        {answer}
      </p>
    </motion.div>
  </motion.div>
);

const DegatsEaux = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Generate JSON-LD for FAQ
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <Layout>
      <Helmet>
        <title>Dégâts des eaux - Conseils et prévention | QualiRénovation</title>
        <meta name="description" content="Conseils d'experts pour prévenir et gérer les dégâts des eaux. Découvrez nos bonnes pratiques et vidéos conseils pour protéger votre salle de bain." />
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
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

      {/* Section explicative - mobile optimisée */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container-custom">
          <motion.div
            className="max-w-md mx-auto md:max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Accroche percutante */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
              >
                <Sparkles className="w-4 h-4" />
                Appartement inondé ?
              </motion.div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Ne restez pas seul face au sinistre
              </h2>
              <p className="text-muted-foreground">
                Nous défendons vos intérêts face aux assurances et aux syndics
              </p>
            </div>

            {/* Liste d'avantages avec icônes */}
            <div className="space-y-4 mb-8">
              {[
                "Accompagnement dès la déclaration du sinistre",
                "Assistance aux réunions d'expertise",
                "Devis complets et conformes pour l'assurance",
                "Coordination avec le syndic et les voisins",
                "Remise en état complète de votre salle de bain"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm border border-border/30"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground text-sm md:text-base">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Mise en avant valeur ajoutée */}
            <motion.div
              className="bg-gradient-to-br from-stone-100 to-stone-50 rounded-xl p-6 border border-stone-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-stone-800 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Plus qu'un simple exécutant
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    En tant que maître d'œuvre, nous ne nous contentons pas de réaliser les travaux. 
                    Nous pilotons l'ensemble du projet : coordination des intervenants, suivi administratif 
                    avec l'assurance, et défense de vos intérêts jusqu'à la remise en état finale.
                  </p>
                </div>
              </div>
            </motion.div>
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
                Devis complets, accompagnement assurance et coordination des travaux jusqu'à la remise en état finale.
              </p>
            </motion.div>
          </div>
          
          {/* Texte SEO sous les blocs */}
          <motion.p
            className="text-center text-muted-foreground mt-8 max-w-3xl mx-auto text-sm md:text-base leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Après un dégât des eaux, faire appel à une structure avec maître d'œuvre intégré permet d'assurer une remise en état conforme, une meilleure prise en charge par l'assurance et une coordination complète des travaux, notamment lorsque le logement est inhabitable.
          </motion.p>
          
          {/* CTA */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/devis">
              <Button variant="cta" size="lg" className="group">
                Être accompagné après un dégât des eaux
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section FAQ - Dégât des eaux & assurance */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Header FAQ */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  FAQ – Dégât des eaux & assurance
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Réponses aux questions les plus fréquentes
                </p>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="bg-white rounded-xl border border-border/50 shadow-sm p-4 md:p-6">
              {faqData.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFAQ === index}
                  onToggle={() => toggleFAQ(index)}
                  index={index}
                />
              ))}
            </div>

            {/* CTA sous la FAQ */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/devis">
                <Button variant="cta" size="lg" className="group">
                  Être accompagné après un dégât des eaux
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Vidéos Conseils */}
      <section className="py-12 md:py-16 bg-stone-50">
        <div className="container-custom">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Vidéos conseils
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nos experts partagent leurs conseils pour prévenir les dégâts des eaux
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {degatsEauxVideos.map((video, index) => (
              <motion.div
                key={video.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="aspect-[9/16] bg-stone-100">
                  <video
                    src={video.videoSrc}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Eye className="w-3 h-3" />
                    <span>{video.views} vues</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Bonnes Pratiques */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-custom">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center text-foreground">
              Bonnes pratiques pour éviter les dégâts des eaux
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  title: "Raccords de qualité",
                  description: "Utilisez des raccords multicouches sertis, jamais de raccords à compression dans les zones encastrées."
                },
                {
                  title: "Étanchéité parfaite",
                  description: "Appliquez un SPEC (Système de Protection à l'Eau sous Carrelage) dans toutes les zones humides."
                },
                {
                  title: "Contrôles réguliers",
                  description: "Vérifiez l'état des joints, des raccords et des équipements sanitaires tous les ans."
                },
                {
                  title: "Vannes d'arrêt accessibles",
                  description: "Installez des vannes d'arrêt individuelles pour pouvoir couper l'eau rapidement en cas de fuite."
                },
                {
                  title: "Détecteurs de fuite",
                  description: "Équipez les zones à risque de détecteurs de fuite connectés pour une alerte immédiate."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-5 shadow-sm border border-border/30"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
};

export default DegatsEaux;
