import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Album } from "@/data/albumsData";

interface CTAContent {
  title: string;
  description: string;
  buttonText: string;
}

const categoryCTAMap: Record<string, CTAContent> = {
  "transformation-baignoire": {
    title: "Vous envisagez de remplacer votre baignoire ?",
    description: "Nous étudions la faisabilité technique, l'étanchéité et l'optimisation de l'espace pour une transformation durable et confortable.",
    buttonText: "Je remplace ma baignoire par une douche",
  },
  "douche-italienne": {
    title: "Envie d'une douche élégante et parfaitement intégrée ?",
    description: "Receveur extra-plat, pentes maîtrisées, finitions soignées : concevons une douche adaptée à votre espace.",
    buttonText: "Je crée ma douche italienne",
  },
  "optimisation": {
    title: "Chaque centimètre compte.",
    description: "Nous optimisons l'agencement et les rangements pour transformer les petites surfaces en espaces confortables et fonctionnels.",
    buttonText: "J'optimise ma petite salle de bain",
  },
  "marbre-luxe": {
    title: "Vous souhaitez une salle de bain d'exception ?",
    description: "Matériaux nobles, conception sur-mesure et finitions haut de gamme.",
    buttonText: "Je démarre un projet sur-mesure",
  },
  "dore-laiton": {
    title: "Vous souhaitez une salle de bain d'exception ?",
    description: "Matériaux nobles, conception sur-mesure et finitions haut de gamme.",
    buttonText: "Je démarre un projet sur-mesure",
  },
  "degat-eaux": {
    title: "Besoin d'être accompagné après un sinistre ?",
    description: "On prend en charge votre dossier, de l'expertise à la remise en état.",
    buttonText: "Je me fais accompagner",
  },
  "maison-banlieue": {
    title: "Et si votre salle de bain devenait une vraie pièce à vivre ?",
    description: "Conception globale, coordination des corps d'état, choix des matériaux : nous pensons votre projet dans sa totalité.",
    buttonText: "Je transforme ma salle de bain",
  },
};

const defaultCTA: CTAContent = {
  title: "Vous imaginez cette transformation chez vous ?",
  description: "Chaque projet est étudié selon vos contraintes techniques, votre budget et vos envies.",
  buttonText: "Je veux la même transformation chez moi",
};

function getCTAForAlbum(album: Album): CTAContent {
  if (album.category && categoryCTAMap[album.category]) {
    return categoryCTAMap[album.category];
  }
  return defaultCTA;
}

interface AlbumCTAProps {
  album: Album;
}

export function AlbumCTA({ album }: AlbumCTAProps) {
  const cta = getCTAForAlbum(album);

  return (
    <motion.div
      className="flex justify-center mt-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Button variant="gold" size="xl" asChild className="rounded-2xl text-center whitespace-normal max-w-full h-auto py-4 px-8">
        <Link to="/devis#devis-form" className="flex items-center justify-center gap-2 text-center">
          <span>{cta.buttonText}</span>
          <ArrowRight className="w-5 h-5 flex-shrink-0" />
        </Link>
      </Button>
    </motion.div>
  );
}
