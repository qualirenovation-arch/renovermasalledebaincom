import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { X, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

// Paris 10ème
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";

// Bd Pereire Paris 17ème
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";
import gallery13 from "@/assets/gallery-13.jpg";
import gallery14 from "@/assets/gallery-14.jpg";
import gallery15 from "@/assets/gallery-15.jpg";
import gallery16 from "@/assets/gallery-16.jpg";

// Saint-Maur
import gallery17 from "@/assets/gallery-17.jpg";
import gallery18 from "@/assets/gallery-18.jpg";
import gallery19 from "@/assets/gallery-19.jpg";
import gallery20 from "@/assets/gallery-20.jpg";
import gallery21 from "@/assets/gallery-21.jpg";
import gallery22 from "@/assets/gallery-22.jpg";
import gallery23 from "@/assets/gallery-23.jpg";
import gallery24 from "@/assets/gallery-24.jpg";
import gallery25 from "@/assets/gallery-25.jpg";

// Paris 17ème Suite Parentale
import paris17_1 from "@/assets/paris17-1.jpg";
import paris17_2 from "@/assets/paris17-2.jpg";
import paris17_3 from "@/assets/paris17-3.jpg";
import paris17_4 from "@/assets/paris17-4.jpg";
import paris17_5 from "@/assets/paris17-5.jpg";
import paris17_6 from "@/assets/paris17-6.jpg";
import paris17_7 from "@/assets/paris17-7.jpg";
import paris17_8 from "@/assets/paris17-8.jpg";

// Paris 15ème Convention
import convention1 from "@/assets/courbevoie-1.jpg";
import convention2 from "@/assets/courbevoie-2.jpg";
import convention3 from "@/assets/courbevoie-3.jpg";
import convention4 from "@/assets/courbevoie-4.jpg";
import convention5 from "@/assets/courbevoie-5.jpg";
import convention6 from "@/assets/courbevoie-6.jpg";

// Paris 10ème Jemmapes
import jemmapes1 from "@/assets/jemmapes-1.jpg";
import jemmapes2 from "@/assets/jemmapes-2.jpg";
import jemmapes3 from "@/assets/jemmapes-3.jpg";

// Bois-Colombes
import boisColombes1 from "@/assets/bois-colombes-1.jpg";
import boisColombes2 from "@/assets/bois-colombes-2.jpg";
import boisColombes3 from "@/assets/bois-colombes-3.jpg";
import boisColombes4 from "@/assets/bois-colombes-4.jpg";
import boisColombes5 from "@/assets/bois-colombes-5.jpg";
import boisColombes6 from "@/assets/bois-colombes-6.jpg";
import boisColombes7 from "@/assets/bois-colombes-7.jpg";
import boisColombes8 from "@/assets/bois-colombes-8.jpg";
import boisColombes9 from "@/assets/bois-colombes-9.jpg";
import boisColombes10 from "@/assets/bois-colombes-10.jpg";
import boisColombes11 from "@/assets/bois-colombes-11.jpg";

// Vincennes SDB Monsieur
import vincennesMr1 from "@/assets/vincennes-mr-1.jpg";
import vincennesMr2 from "@/assets/vincennes-mr-2.jpg";
import vincennesMr3 from "@/assets/vincennes-mr-3.jpg";
import vincennesMr4 from "@/assets/vincennes-mr-4.jpg";
import vincennesMr5 from "@/assets/vincennes-mr-5.jpg";
import vincennesMr6 from "@/assets/vincennes-mr-6.jpg";
import vincennesMr7 from "@/assets/vincennes-mr-7.jpg";
import vincennesMr8 from "@/assets/vincennes-mr-8.jpg";
import vincennesMr9 from "@/assets/vincennes-mr-9.jpg";
import vincennesMr10 from "@/assets/vincennes-mr-10.jpg";
import vincennesMr11 from "@/assets/vincennes-mr-11.jpg";
import vincennesMr12 from "@/assets/vincennes-mr-12.jpg";

// Chantiers en cours
import butteschaumont1 from "@/assets/buttes-chaumont-1.jpg";
import butteschaumont2 from "@/assets/buttes-chaumont-2.jpg";
import butteschaumont3 from "@/assets/buttes-chaumont-3.jpg";
import taitbout1 from "@/assets/taitbout-1.jpg";
import taitbout2 from "@/assets/taitbout-2.jpg";
import taitbout3 from "@/assets/taitbout-3.jpg";
import rocroy1 from "@/assets/rocroy-1.jpg";
import rocroy2 from "@/assets/rocroy-2.jpg";

// Soisy-sous-Montmorency WC
import soisy1 from "@/assets/soisy-1.jpg";
import soisy2 from "@/assets/soisy-2.jpg";
import soisy3 from "@/assets/soisy-3.jpg";
import soisyAvant from "@/assets/soisy-avant.jpg";

interface Photo {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface Album {
  id: string;
  title: string;
  location: string;
  description: string;
  coverImage: string;
  photos: Photo[];
  isInProgress?: boolean;
}

const albums: Album[] = [
  {
    id: "vincennes-mr",
    title: "Salle de bain Monsieur",
    location: "Paris 12ème - Cours de Vincennes",
    description: "Salle de bain masculine haut de gamme. Plan Corian blanc, meuble sur-mesure Noyer de Bourgogne, miroir AICA. Paroi verrière Asealia Twenty Noir, robinetterie MaSalleDeBain.com, receveur Le Monde du Bain. Buanderie et emplacement table à repasser dissimulés dans une colonne sur-mesure.",
    coverImage: vincennesMr1,
    photos: [
      { id: 1, image: vincennesMr1, title: "Vue d'ensemble", description: "Double vasque Corian et meuble Noyer de Bourgogne" },
      { id: 2, image: vincennesMr2, title: "Douche à l'italienne", description: "Verrière Twenty Noir et ciel de pluie encastré" },
      { id: 3, image: vincennesMr3, title: "Détail robinetterie", description: "Robinetterie noire mate MaSalleDeBain.com" },
      { id: 4, image: vincennesMr4, title: "Miroir AICA", description: "Miroir LED avec éclairage intégré" },
      { id: 5, image: vincennesMr5, title: "Colonne rangement", description: "Buanderie dissimulée sur-mesure" },
      { id: 6, image: vincennesMr6, title: "Vue latérale", description: "Optimisation de chaque centimètre" },
      { id: 7, image: vincennesMr7, title: "Paroi verrière", description: "Asealia Twenty Noir élégante" },
      { id: 8, image: vincennesMr8, title: "Plan vasque", description: "Corian blanc sans joints apparents" },
      { id: 9, image: vincennesMr9, title: "Finitions", description: "Attention aux détails" },
      { id: 10, image: vincennesMr10, title: "Espace douche", description: "Receveur Le Monde du Bain" },
      { id: 11, image: vincennesMr11, title: "Rangements", description: "Solutions sur-mesure" },
      { id: 12, image: vincennesMr12, title: "Ambiance finale", description: "Harmonie des matériaux" },
    ],
  },
  {
    id: "bois-colombes",
    title: "Rénovation complète Avant/Après",
    location: "Bois-Colombes",
    description: "Transformation spectaculaire d'une salle de bain datée. D'un espace sombre à une pièce lumineuse et moderne. Douche à l'italienne XXL, robinetterie dorée, sol terrazzo et murs vert d'eau.",
    coverImage: boisColombes1,
    photos: [
      { id: 1, image: boisColombes1, title: "Résultat final", description: "Douche à l'italienne moderne" },
      { id: 2, image: boisColombes2, title: "Vue vasque", description: "Meuble suspendu et robinetterie dorée" },
      { id: 3, image: boisColombes3, title: "Paroi vitrée", description: "Verrière noire élégante" },
      { id: 4, image: boisColombes4, title: "Sol terrazzo", description: "Finition haut de gamme" },
      { id: 5, image: boisColombes5, title: "Détails dorés", description: "Robinetterie et accessoires" },
      { id: 6, image: boisColombes6, title: "Espace optimisé", description: "Chaque cm² utilisé" },
      { id: 7, image: boisColombes7, title: "Avant - État initial", description: "Salle de bain datée" },
      { id: 8, image: boisColombes8, title: "Avant - Ancienne douche", description: "Cabine à remplacer" },
      { id: 9, image: boisColombes9, title: "Avant - Vue générale", description: "Espace à transformer" },
      { id: 10, image: boisColombes10, title: "Travaux - Démolition", description: "Phase de dépose" },
      { id: 11, image: boisColombes11, title: "Travaux - Préparation", description: "Mise à nu des murs" },
    ],
  },
  {
    id: "paris17-suite",
    title: "Suite Parentale Les Ternes",
    location: "Paris 17ème",
    description: "Création d'une suite parentale luxueuse avec douche à l'italienne XXL, double vasque et finitions haut de gamme.",
    coverImage: paris17_1,
    photos: [
      { id: 1, image: paris17_1, title: "Douche XXL", description: "Double entrée et ciel de pluie" },
      { id: 2, image: paris17_2, title: "Double vasque", description: "Plan en pierre naturelle" },
      { id: 3, image: paris17_3, title: "Vue d'ensemble", description: "Espace généreux et lumineux" },
      { id: 4, image: paris17_4, title: "Paroi vitrée", description: "Profilés noirs élégants" },
      { id: 5, image: paris17_5, title: "Robinetterie", description: "Finition noire mate" },
      { id: 6, image: paris17_6, title: "Rangements", description: "Niches intégrées" },
      { id: 7, image: paris17_7, title: "Éclairage", description: "LED encastrés" },
      { id: 8, image: paris17_8, title: "Finitions", description: "Joints et détails soignés" },
    ],
  },
  {
    id: "paris15-convention",
    title: "Rénovation Convention",
    location: "Paris 15ème",
    description: "Transformation complète d'une salle de bain en douche à l'italienne avec carrelage grand format et robinetterie noire.",
    coverImage: convention1,
    photos: [
      { id: 1, image: convention1, title: "Résultat final", description: "Douche à l'italienne élégante" },
      { id: 2, image: convention2, title: "Carrelage grand format", description: "Effet marbre contemporain" },
      { id: 3, image: convention3, title: "Paroi fixe", description: "Verre trempé sécurit" },
      { id: 4, image: convention4, title: "Robinetterie", description: "Colonne de douche noire" },
      { id: 5, image: convention5, title: "Vasque", description: "Meuble suspendu moderne" },
      { id: 6, image: convention6, title: "Vue générale", description: "Harmonie des tons" },
    ],
  },
  {
    id: "paris10-jemmapes",
    title: "Salle de bain au masculin",
    location: "Paris 10ème - Canal Saint-Martin",
    description: "Salle de bain au style masculin avec carrelage foncé, robinetterie noire et lignes épurées.",
    coverImage: jemmapes1,
    photos: [
      { id: 1, image: jemmapes1, title: "Vue principale", description: "Ambiance masculine" },
      { id: 2, image: jemmapes2, title: "Douche", description: "Paroi vitrée et carrelage foncé" },
      { id: 3, image: jemmapes3, title: "Détails", description: "Finitions noires" },
    ],
  },
  {
    id: "paris10-dore",
    title: "Élégance dorée",
    location: "Paris 10ème",
    description: "Salle de bain luxueuse avec robinetterie dorée, carrelage effet marbre onyx et finitions haut de gamme.",
    coverImage: gallery7,
    photos: [
      { id: 1, image: gallery7, title: "Vue d'ensemble", description: "Paroi vitrée profilé laiton doré" },
      { id: 2, image: gallery8, title: "Miroir ovale", description: "Encadrement laiton et éclairage LED" },
      { id: 3, image: gallery9, title: "Robinetterie", description: "Laiton brossé doré" },
      { id: 4, image: gallery10, title: "Ciel de pluie", description: "Douche de pluie plafond doré" },
    ],
  },
  {
    id: "paris17-pereire",
    title: "Les Ternes - Chevrons",
    location: "Paris 17ème - Bd Pereire",
    description: "Rénovation complète avec carrelage chevrons blancs, sol terrazzo gris et robinetterie chromée.",
    coverImage: gallery11,
    photos: [
      { id: 1, image: gallery11, title: "Chevrons blancs", description: "Carrelage mural tendance" },
      { id: 2, image: gallery12, title: "Douche d'angle", description: "Paroi vitrée et ciel de pluie" },
      { id: 3, image: gallery13, title: "Agencement", description: "Optimisation de l'espace" },
      { id: 4, image: gallery14, title: "Colonne de douche", description: "Design chromé" },
      { id: 5, image: gallery15, title: "Vasque", description: "Meuble suspendu blanc" },
      { id: 6, image: gallery16, title: "Sol terrazzo", description: "Finition élégante" },
      { id: 7, image: gallery17, title: "Robinetterie", description: "Mitigeur chromé design" },
    ],
  },
  {
    id: "saint-maur",
    title: "Rénovation Avant/Après",
    location: "Saint-Maur-des-Fossés",
    description: "Transformation complète d'une salle de bain datée en espace moderne avec douche à l'italienne.",
    coverImage: gallery18,
    photos: [
      { id: 1, image: gallery18, title: "Carrelage", description: "Grand format contemporain" },
      { id: 2, image: gallery19, title: "Paroi", description: "Verre fixe élégant" },
      { id: 3, image: gallery20, title: "Vasque", description: "Meuble design" },
      { id: 4, image: gallery21, title: "Avant - État initial", description: "Baignoire datée" },
      { id: 5, image: gallery22, title: "Avant - Vue générale", description: "Salle de bain à rénover" },
      { id: 6, image: gallery23, title: "Avant - Détails", description: "Carrelage ancien" },
      { id: 7, image: gallery24, title: "Travaux", description: "Phase de rénovation" },
      { id: 8, image: gallery25, title: "Finitions", description: "Dernières touches" },
    ],
  },
  {
    id: "soisy-wc",
    title: "Rénovation WC Avant/Après",
    location: "Soisy-sous-Montmorency",
    description: "Transformation complète d'un WC vétuste en espace raffiné. Meuble rose terracotta sur-mesure avec niche en chêne, carrelage mural losanges, sol carreaux de ciment graphiques et robinetterie noire mate.",
    coverImage: soisy1,
    photos: [
      { id: 1, image: soisy1, title: "Vue d'ensemble", description: "Meuble rose et niche chêne" },
      { id: 2, image: soisy2, title: "Rangement ouvert", description: "Optimisation du rangement" },
      { id: 3, image: soisy3, title: "Espace complet", description: "WC suspendu et lave-mains" },
      { id: 4, image: soisyAvant, title: "Avant - État initial", description: "WC vétuste à transformer" },
    ],
  },
];

interface ProjectLocation {
  id: string;
  name: string;
  area: string;
  x: number; // percentage from left
  y: number; // percentage from top
}

const inProgressAlbums: Album[] = [
  {
    id: "buttes-chaumont",
    title: "Rénovation en cours",
    location: "Paris 19ème - Buttes-Chaumont",
    description: "Transformation d'une petite salle de bain en douche à l'italienne moderne. Chantier en cours.",
    coverImage: butteschaumont1,
    isInProgress: true,
    photos: [
      { id: 1, image: butteschaumont1, title: "État initial - Lavabo", description: "Avant travaux" },
      { id: 2, image: butteschaumont2, title: "État initial - Douche", description: "Cabine à remplacer" },
      { id: 3, image: butteschaumont3, title: "Vue générale", description: "Espace à transformer" },
    ],
  },
  {
    id: "taitbout",
    title: "Rénovation haussmannienne",
    location: "Paris 9ème - Rue Taitbout",
    description: "Rénovation d'une salle de bain dans un immeuble haussmannien. Chantier en cours.",
    coverImage: taitbout1,
    isInProgress: true,
    photos: [
      { id: 1, image: taitbout1, title: "État initial", description: "Salle de bain avant travaux" },
      { id: 2, image: taitbout2, title: "Baignoire", description: "À transformer en douche" },
      { id: 3, image: taitbout3, title: "Vue d'ensemble", description: "Projet en cours" },
    ],
  },
  {
    id: "rocroy",
    title: "Petite salle de bain",
    location: "Paris 10ème - Rue de Rocroy",
    description: "Optimisation d'une petite salle de bain avec création d'une douche à l'italienne. Chantier en cours.",
    coverImage: rocroy1,
    isInProgress: true,
    photos: [
      { id: 1, image: rocroy1, title: "État initial", description: "Avant démolition" },
      { id: 2, image: rocroy2, title: "Travaux", description: "En cours de rénovation" },
    ],
  },
];

// Positions des chantiers sur la carte de Paris
const projectLocations: ProjectLocation[] = [
  { id: "buttes-chaumont", name: "Buttes-Chaumont", area: "19ème", x: 68, y: 25 },
  { id: "taitbout", name: "Rue Taitbout", area: "9ème", x: 48, y: 38 },
  { id: "rocroy", name: "Rue de Rocroy", area: "10ème", x: 55, y: 32 },
];

export default function Realisations() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"completed" | "inProgress">("completed");

  const currentAlbums = viewMode === "completed" ? albums : inProgressAlbums;

  const handleNextPhoto = () => {
    if (selectedAlbum && selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % selectedAlbum.photos.length);
    }
  };

  const handlePrevPhoto = () => {
    if (selectedAlbum && selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        selectedPhotoIndex === 0 ? selectedAlbum.photos.length - 1 : selectedPhotoIndex - 1
      );
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-stone" />
        <div className="relative container-custom">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/30 text-wood text-sm font-medium mb-6">
              Nos réalisations
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              Découvrez nos chantiers
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Du loft parisien au pavillon de banlieue, chaque projet raconte une métamorphose. 
              Parcourez nos albums pour découvrir nos rénovations de salle de bain, 
              avec notre maître d'œuvre Carina qui supervise chaque étape.
            </p>
            <p className="text-wood font-medium text-xl italic">
              Et vous, team receveur minimaliste ou baignoire cocooning ?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toggle */}
      <section className="py-8 bg-background border-b">
        <div className="container-custom">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setViewMode("completed")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                viewMode === "completed"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Réalisations terminées
            </button>
            <button
              onClick={() => setViewMode("inProgress")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                viewMode === "inProgress"
                  ? "bg-wood text-white"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              🚧 Chantiers en cours
            </button>
          </div>
        </div>
      </section>

      {/* Paris Map for In Progress */}
      {viewMode === "inProgress" && !selectedAlbum && (
        <section className="py-12 bg-stone">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">
                Nos chantiers en cours sur Paris
              </h2>
              <p className="text-muted-foreground">Cliquez sur un point pour voir le projet</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-3xl mx-auto"
            >
              {/* Carte stylisée de Paris */}
              <div className="relative bg-accent/20 rounded-3xl overflow-hidden aspect-[4/3] border border-border">
                {/* Fond avec forme de Paris simplifiée */}
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Forme simplifiée de Paris */}
                  <path
                    d="M80 150 Q60 100 100 60 Q150 30 200 40 Q280 30 330 70 Q370 100 360 150 Q370 200 320 250 Q260 280 200 270 Q140 280 90 240 Q50 200 80 150 Z"
                    fill="hsl(var(--accent))"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                  {/* Seine */}
                  <path
                    d="M40 165 Q120 140 200 160 Q280 180 360 155"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="6"
                    opacity="0.3"
                    strokeLinecap="round"
                  />
                  {/* Arrondissements labels */}
                  <text x="160" y="85" className="fill-muted-foreground text-[10px] font-medium">18e</text>
                  <text x="260" y="70" className="fill-muted-foreground text-[10px] font-medium">19e</text>
                  <text x="310" y="120" className="fill-muted-foreground text-[10px] font-medium">20e</text>
                  <text x="200" y="105" className="fill-muted-foreground text-[10px] font-medium">9e</text>
                  <text x="230" y="100" className="fill-muted-foreground text-[10px] font-medium">10e</text>
                  <text x="200" y="150" className="fill-muted-foreground text-[10px] font-medium">1er</text>
                  <text x="140" y="130" className="fill-muted-foreground text-[10px] font-medium">8e</text>
                  <text x="100" y="170" className="fill-muted-foreground text-[10px] font-medium">16e</text>
                  <text x="150" y="200" className="fill-muted-foreground text-[10px] font-medium">15e</text>
                  <text x="280" y="200" className="fill-muted-foreground text-[10px] font-medium">12e</text>
                </svg>

                {/* Points des chantiers */}
                {projectLocations.map((location, index) => (
                  <motion.button
                    key={location.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${location.x}%`, top: `${location.y}%` }}
                    onClick={() => {
                      const album = inProgressAlbums.find(a => a.id === location.id);
                      if (album) setSelectedAlbum(album);
                    }}
                  >
                    <span className="flex items-center justify-center w-10 h-10 bg-wood text-white rounded-full shadow-lg transition-transform duration-300 group-hover:scale-125">
                      <MapPin className="w-5 h-5" />
                    </span>
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {location.name}
                    </span>
                    {/* Pulse animation */}
                    <span className="absolute inset-0 w-10 h-10 bg-wood rounded-full animate-ping opacity-30" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Albums Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            {!selectedAlbum ? (
              <motion.div
                key="albums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {currentAlbums.map((album, index) => (
                  <motion.div
                    key={album.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => setSelectedAlbum(album)}
                  >
                    <div className="card-elevated overflow-hidden">
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img 
                          src={album.coverImage} 
                          alt={album.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {album.isInProgress && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-wood text-white text-xs font-medium rounded-full">
                            🚧 En cours
                          </div>
                        )}
                        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white text-xs font-medium rounded-full">
                          {album.photos.length} photos
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-wood font-medium mb-2">{album.location}</p>
                        <h3 className="font-display text-xl font-semibold mb-2">
                          {album.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{album.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="album-detail"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Back button */}
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="flex items-center gap-2 text-wood font-medium mb-8 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour aux albums
                </button>

                {/* Album header */}
                <div className="mb-8">
                  <p className="text-sm text-wood font-medium mb-2">{selectedAlbum.location}</p>
                  <h2 className="font-display text-3xl font-semibold mb-4">{selectedAlbum.title}</h2>
                  <p className="text-muted-foreground max-w-3xl">{selectedAlbum.description}</p>
                </div>

                {/* Photos grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedAlbum.photos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedPhotoIndex(index)}
                    >
                      <div className="aspect-square overflow-hidden rounded-xl">
                        <img 
                          src={photo.image} 
                          alt={photo.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <p className="mt-2 text-sm font-medium truncate">{photo.title}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Photo Lightbox */}
      <AnimatePresence>
        {selectedAlbum && selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handlePrevPhoto(); }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleNextPhoto(); }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <motion.div
              key={selectedPhotoIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-5xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedAlbum.photos[selectedPhotoIndex].image} 
                alt={selectedAlbum.photos[selectedPhotoIndex].title}
                className="max-h-[75vh] w-auto object-contain rounded-lg"
              />
              <div className="mt-4 text-center text-white">
                <h3 className="text-xl font-semibold">{selectedAlbum.photos[selectedPhotoIndex].title}</h3>
                <p className="text-white/70">{selectedAlbum.photos[selectedPhotoIndex].description}</p>
                <p className="text-white/50 text-sm mt-2">
                  {selectedPhotoIndex + 1} / {selectedAlbum.photos.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Votre projet nous intéresse
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Envie d'une transformation similaire ? Contactez-nous pour une étude gratuite.
            </p>
            <Button variant="cta" size="xl" asChild>
              <Link to="/devis">
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
