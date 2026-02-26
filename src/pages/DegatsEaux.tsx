import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { OGTags } from "@/components/seo/OGTags";
import { AlertTriangle, ClipboardList, HardHat, HelpCircle, ChevronDown, Droplets } from "lucide-react";
import { PageCTA } from "@/components/layout/PageCTA";
import { useState } from "react";
import { LazyVideo } from "@/components/ui/lazy-video";


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
    tip: "→ Les points essentiels à surveiller pour une installation pérenne.",
    videoSrc: "/videos/degats-eaux-2.mp4",
    views: "15.8k",
  },
  {
    id: "degats-eaux-1",
    title: "Prévenir les dégâts des eaux",
    description: "Un dégât des eaux peut ruiner une rénovation et entraîner des frais considérables. La clé : des raccords de qualité, une étanchéité parfaite et des contrôles réguliers.",
    tip: "→ Dans cette vidéo, je vous montre les erreurs à éviter et les bonnes pratiques à adopter.",
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
      <OGTags
        title="Dégâts des eaux – Conseils et prévention"
        description="Conseils d'experts pour prévenir et gérer les dégâts des eaux. Découvrez nos bonnes pratiques et vidéos conseils pour protéger votre salle de bain."
        path="/degats-eaux"
      />
      {/* JSON-LD Schema for FAQ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-background py-10 md:py-12">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Droplets className="w-7 h-7 text-blue-600" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-primary">
              Dégât des eaux ? Et si c'était l'occasion de faire mieux ?
            </h1>
            <p className="text-muted-foreground text-lg">
              On vous aide à transformer un sinistre en opportunité.
            </p>
          </div>
        </div>
      </section>

      {/* Section Vidéos Conseils - EN HAUT */}
      <section className="py-8 md:py-10 bg-background">
        <div className="container-custom">
          <h2 className="font-display text-xl md:text-2xl font-bold mb-6 text-center text-foreground">
            Nos conseils en vidéo
          </h2>
          <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
            {degatsEauxVideos.map((video) => (
              <div key={video.id} className="bg-background rounded-xl overflow-hidden shadow-sm border border-border/50">
                <LazyVideo 
                  src={video.videoSrc}
                  className="aspect-[9/16]"
                  title={video.title}
                />
                <div className="p-3">
                  <h3 className="font-medium text-sm text-foreground">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 blocs SEO */}
      <section className="py-6 md:py-8 bg-stone-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-border/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Risque majeur</h3>
                <p className="text-muted-foreground text-xs">Logement inhabitable</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-border/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <HardHat className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Maîtrise d'œuvre</h3>
                <p className="text-muted-foreground text-xs">Pilotage complet</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-border/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <ClipboardList className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">Prise en charge</h3>
                <p className="text-muted-foreground text-xs">Assurance & travaux</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Conseils pratiques */}
      <section className="py-8 md:py-10 bg-background">
        <div className="container-custom max-w-2xl mx-auto">
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4 text-center">
            Que faire en cas de dégât des eaux ?
          </h2>
          <div className="space-y-2">
            {[
              "1. Déclarez le sinistre à votre assurance rapidement.",
              "2. Faites intervenir un professionnel pour identifier la fuite.",
              "3. Contactez votre syndic si la fuite est commune.",
              "4. Organisez la recherche de fuite avec les voisins concernés.",
              "5. Attendez le passage de l'expert avant de commencer les travaux."
            ].map((text, index) => (
              <div key={index} className="bg-white rounded-lg p-3 shadow-sm border border-border/30 text-sm text-foreground">
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ condensée */}
      <section className="py-8 md:py-10 bg-stone-50">
        <div className="container-custom max-w-2xl mx-auto">
          <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            FAQ – Assurance & dégât des eaux
          </h2>
          <div className="bg-white rounded-xl border border-border/50 shadow-sm divide-y divide-border/50">
            {faqData.map((item, index) => (
              <button
                key={index}
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-sm text-foreground">{item.question}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                </div>
                {openFAQ === index && (
                  <p className="text-sm text-muted-foreground mt-2 pr-6">{item.answer}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="Besoin d'être accompagné après un sinistre ?"
        description="On prend en charge votre dossier, de l'expertise à la remise en état."
        buttonText="Je me fais accompagner"
      />
    </Layout>
  );
};

export default DegatsEaux;
