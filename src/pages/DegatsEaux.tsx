import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Eye, AlertTriangle, Shield, Droplets, CheckCircle2, ArrowRight, Sparkles, ClipboardList, HardHat, HelpCircle, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

// Images chantiers dégâts des eaux
import jemmapesApres1 from "@/assets/jemmapes-apres-1.jpg";
import jemmapesApres2 from "@/assets/jemmapes-apres-2.jpg";
import bauchartAvant1 from "@/assets/bauchart-avant-1.jpg";
import bauchartAvant2 from "@/assets/bauchart-avant-2.jpg";
import bauchartAvant3 from "@/assets/bauchart-avant-3.jpg";

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
              Dégât des eaux ? Et si c'était l'occasion de faire mieux ? ✨
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Galère… ou opportunité de transformer votre espace ?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section Notre approche */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container-custom">
          <motion.div
            className="max-w-md mx-auto md:max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Notre philosophie */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4"
              >
                <Sparkles className="w-4 h-4" />
                Notre philosophie
              </motion.div>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                Chez QualiRénovation by QualiConcept, on ne se contente pas de « remettre en état ».
                On vous aide à <strong className="text-foreground">transformer un sinistre en opportunité</strong> : 
                repenser l'espace, améliorer le confort, s'adapter à vos besoins.
              </p>
            </div>

            {/* Témoignage Julia */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="text-xl">✨</span> L'exemple de Julia
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                C'est exactement ce qui s'est passé pour Julia, une locataire dont le studio a été sinistré.
                Aujourd'hui, elle retrouve un logement plus beau, mieux pensé, avec une nouvelle cuisine 
                et une pièce de vie optimisée.
              </p>
              <p className="text-foreground font-medium mt-3">
                ➡️ Ce qui était une vraie galère est devenu une chance de réinventer son espace de vie.
              </p>
              <div className="mt-4 pt-4 border-t border-blue-100">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>📲</span> Retrouvez le live du chantier sur notre compte Instagram : 
                  <a 
                    href="https://www.instagram.com/qualirenovation__travaux/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    @qualirenovation__travaux
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Avec QualiRénovation */}
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
                  <h3 className="font-semibold text-foreground mb-3">
                    🙋‍♀️ Avec QualiRénovation, vous n'êtes pas seuls
                  </h3>
                  <div className="space-y-2">
                    {[
                      "On vous accompagne dans les démarches avec votre assurance",
                      "On défend vos intérêts lors des expertises",
                      "On chiffre les travaux au plus juste",
                      "On vous propose des solutions durables et parfois… bien meilleures qu'avant !"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section Nos chantiers dégâts des eaux */}
      <section className="py-12 md:py-16 bg-stone-100">
        <div className="container-custom">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
              🔧 Nos chantiers dégâts des eaux
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment nous transformons des sinistres en rénovations d'exception
            </p>
          </motion.div>

          {/* Chantier Quai de Jemmapes */}
          <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-md border border-border/30 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-6 border-b border-border/30">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span>Paris 10ème — Quai de Jemmapes</span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Rénovation après sinistre — Style contemporain
              </h3>
              <p className="text-muted-foreground text-sm mt-2">
                Suite à un dégât des eaux venu de l'étage supérieur, cette salle de bain a été entièrement repensée avec des finitions haut de gamme : vasque en pierre naturelle, meuble bois et noir mat, robinetterie design.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <img 
                  src={jemmapesApres1} 
                  alt="Après — Vue d'ensemble de la salle de bain rénovée Quai de Jemmapes"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">
                  Après
                </span>
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <img 
                  src={jemmapesApres2} 
                  alt="Après — Détail vasque en pierre naturelle et meuble bois"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-medium px-2 py-1 rounded">
                  Après
                </span>
              </div>
            </div>
          </motion.div>

          {/* Chantier Sergent Bauchart */}
          <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-md border border-border/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-6 border-b border-border/30">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="w-4 h-4" />
                <span>Paris 8ème — Rue du Sergent Bauchart</span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Sinistre en cours — Démolition et préparation
              </h3>
              <p className="text-muted-foreground text-sm mt-2">
                Phase de démolition après un dégât des eaux important. Les photos montrent l'état des lieux avant rénovation : traces d'humidité, moisissures au plafond, plomberie à reprendre intégralement.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <img 
                  src={bauchartAvant1} 
                  alt="Avant — État des lieux après sinistre rue du Sergent Bauchart"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded">
                  Avant
                </span>
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <img 
                  src={bauchartAvant2} 
                  alt="Avant — Traces de moisissures et plomberie apparente"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded">
                  Avant
                </span>
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                <img 
                  src={bauchartAvant3} 
                  alt="Avant — Démolition et accès à la plomberie"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-medium px-2 py-1 rounded">
                  Avant
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Conseils pratiques */}
      <section className="py-10 md:py-14 bg-stone-50">
        <div className="container-custom">
          <motion.div
            className="max-w-md mx-auto md:max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                📋 Nos conseils en cas de dégât des eaux
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { num: "1️⃣", text: "Déclarez le sinistre à votre assurance rapidement." },
                { num: "2️⃣", text: "Faites intervenir un professionnel pour identifier et réparer la fuite." },
                { num: "3️⃣", text: "Contactez votre syndic : il faut déterminer si la fuite est privative ou commune." },
                { num: "4️⃣", text: "Organisez la recherche de fuite, surtout si des voisins sont concernés (et parfois... récalcitrants)." },
                { num: "5️⃣", text: "Attendez le passage de l'expert pour valider le périmètre des travaux." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm border border-border/30"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-xl flex-shrink-0">{item.num}</span>
                  <span className="text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-muted-foreground mb-4">
                📞 Une question ? Un sinistre à gérer ?
              </p>
              <Link to="/devis">
                <Button variant="cta" size="lg" className="group">
                  Contactez-nous
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
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
