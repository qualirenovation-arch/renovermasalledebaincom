import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Eye, AlertTriangle, Shield, Droplets, CheckCircle2, ArrowRight, Sparkles, ClipboardList, HardHat, HelpCircle, ChevronDown, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Images chantiers dégâts des eaux
import jemmapesApres1 from "@/assets/jemmapes-apres-1.jpg";
import jemmapesApres2 from "@/assets/jemmapes-apres-2.jpg";
import bauchartAvant1 from "@/assets/bauchart-avant-1.jpg";
import bauchartAvant2 from "@/assets/bauchart-avant-2.jpg";
import bauchartAvant3 from "@/assets/bauchart-avant-3.jpg";
import bauchartApres1 from "@/assets/bauchart-apres-1.jpg";
import bauchartApres2 from "@/assets/bauchart-apres-2.jpg";

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
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; type: 'avant' | 'apres' } | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // Images Julia (Sergent Bauchart)
  const juliaImages = [
    { src: bauchartAvant1, alt: "Avant — État des lieux après sinistre", type: 'avant' as const },
    { src: bauchartAvant2, alt: "Avant — Traces de moisissures", type: 'avant' as const },
    { src: bauchartAvant3, alt: "Avant — Démolition plomberie", type: 'avant' as const },
    { src: bauchartApres1, alt: "Après — Cuisine rénovée", type: 'apres' as const },
    { src: bauchartApres2, alt: "Après — Vue évier", type: 'apres' as const },
  ];

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
                <span className="text-xl">✨</span> L'exemple de Julia — Paris 12ème
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                C'est exactement ce qui s'est passé pour Julia, une locataire dont le studio a été sinistré.
                Aujourd'hui, elle retrouve un logement plus beau, mieux pensé, avec une nouvelle cuisine 
                et une pièce de vie optimisée.
              </p>
              <p className="text-foreground font-medium mt-3">
                ➡️ Ce qui était une vraie galère est devenu une chance de réinventer son espace de vie.
              </p>

              {/* Vignettes photos cliquables */}
              <div className="mt-4 pt-4 border-t border-blue-100">
                <p className="text-xs text-muted-foreground mb-2">📷 Cliquez pour agrandir</p>
                <div className="flex flex-wrap gap-2">
                  {juliaImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-sm hover:shadow-md hover:scale-105 transition-all cursor-pointer"
                    >
                      <img 
                        src={img.src} 
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                      <span className={`absolute bottom-0 left-0 right-0 h-1.5 ${img.type === 'avant' ? 'bg-amber-500' : 'bg-green-500'}`} />
                    </button>
                  ))}
                </div>
              </div>

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
      <section className="py-8 md:py-12 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* Bloc 1 - Risque majeur */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-border/30">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-3">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Risque majeur</h3>
              <p className="text-muted-foreground text-sm">
                Un dégât des eaux peut rendre un logement inhabitable.
              </p>
            </div>
            
            {/* Bloc 2 - Maîtrise d'œuvre intégrée */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-border/30">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-3">
                <HardHat className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Maîtrise d'œuvre</h3>
              <p className="text-muted-foreground text-sm">
                Pilotage complet de la remise en état par un maître d'œuvre.
              </p>
            </div>
            
            {/* Bloc 3 - Prise en charge globale */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-border/30">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                <ClipboardList className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Prise en charge</h3>
              <p className="text-muted-foreground text-sm">
                Devis, assurance et coordination jusqu'à la remise en état.
              </p>
            </div>
          </div>
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
      <section className="py-8 md:py-12 bg-stone-50">
        <div className="container-custom">
          <h2 className="font-display text-xl md:text-2xl font-bold mb-6 text-center text-foreground">
            🎬 Vidéos conseils
          </h2>

          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {degatsEauxVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-border/50"
              >
                <div className="aspect-[9/16]">
                  <video
                    src={video.videoSrc}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-foreground">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox pour les photos */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-2 bg-black/95 border-none">
          {selectedImage && (
            <div className="relative">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <span className={`absolute top-4 left-4 text-sm font-medium text-white px-3 py-1 rounded ${selectedImage.type === 'avant' ? 'bg-amber-600' : 'bg-green-600'}`}>
                {selectedImage.type === 'avant' ? 'Avant' : 'Après'}
              </span>
              <p className="text-white/80 text-center text-sm mt-3">{selectedImage.alt}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </Layout>
  );
};

export default DegatsEaux;
