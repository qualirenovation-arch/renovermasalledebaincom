import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { X, ArrowRight } from "lucide-react";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";
import gallery12 from "@/assets/gallery-12.jpg";
import gallery13 from "@/assets/gallery-13.jpg";
import gallery14 from "@/assets/gallery-14.jpg";
import gallery15 from "@/assets/gallery-15.jpg";
import gallery16 from "@/assets/gallery-16.jpg";
import gallery17 from "@/assets/gallery-17.jpg";
import gallery18 from "@/assets/gallery-18.jpg";
import gallery19 from "@/assets/gallery-19.jpg";
import gallery20 from "@/assets/gallery-20.jpg";
import gallery21 from "@/assets/gallery-21.jpg";
import gallery22 from "@/assets/gallery-22.jpg";
import gallery23 from "@/assets/gallery-23.jpg";
import gallery24 from "@/assets/gallery-24.jpg";
import gallery25 from "@/assets/gallery-25.jpg";
import gallery26 from "@/assets/gallery-26.jpg";
import gallery27 from "@/assets/gallery-27.jpg";
import gallery28 from "@/assets/gallery-28.jpg";
import gallery29 from "@/assets/gallery-29.jpg";
import paris17_1 from "@/assets/paris17-1.jpg";
import paris17_2 from "@/assets/paris17-2.jpg";
import paris17_3 from "@/assets/paris17-3.jpg";
import paris17_4 from "@/assets/paris17-4.jpg";
import paris17_5 from "@/assets/paris17-5.jpg";
import paris17_6 from "@/assets/paris17-6.jpg";
import paris17_7 from "@/assets/paris17-7.jpg";
import paris17_8 from "@/assets/paris17-8.jpg";
import convention1 from "@/assets/courbevoie-1.jpg";
import convention2 from "@/assets/courbevoie-2.jpg";
import convention3 from "@/assets/courbevoie-3.jpg";
import convention4 from "@/assets/courbevoie-4.jpg";
import convention5 from "@/assets/courbevoie-5.jpg";
import convention6 from "@/assets/courbevoie-6.jpg";
import butteschaumont1 from "@/assets/buttes-chaumont-1.jpg";
import butteschaumont2 from "@/assets/buttes-chaumont-2.jpg";
import butteschaumont3 from "@/assets/buttes-chaumont-3.jpg";
import jemmapes1 from "@/assets/jemmapes-1.jpg";
import jemmapes2 from "@/assets/jemmapes-2.jpg";
import jemmapes3 from "@/assets/jemmapes-3.jpg";
import taitbout1 from "@/assets/taitbout-1.jpg";
import taitbout2 from "@/assets/taitbout-2.jpg";
import taitbout3 from "@/assets/taitbout-3.jpg";
import rocroy1 from "@/assets/rocroy-1.jpg";
import rocroy2 from "@/assets/rocroy-2.jpg";
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
import vincennes1 from "@/assets/vincennes-1.jpg";
import vincennes2 from "@/assets/vincennes-2.jpg";
import vincennes3 from "@/assets/vincennes-3.jpg";
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

type Category = "all" | "petite" | "grande" | "moderne" | "pierre" | "avant-apres" | "paris10" | "bdpereire" | "avnord" | "severac" | "convention" | "jemmapes" | "boiscolombes" | "vincennesmr";

type InProgressCategory = "all-progress" | "butteschaumont" | "taitbout" | "rocroy";

interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  category: (Category | InProgressCategory)[];
  details: string;
  isInProgress?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    image: gallery1,
    title: "Douche moderne minimaliste",
    description: "Petite salle de bain - Paris 16ème",
    category: ["petite", "moderne"],
    details: "Transformation d'une petite salle de bain de 4m² en espace moderne avec douche à l'italienne. Carrelage grand format blanc, robinetterie noire mate, paroi en verre trempé fixe.",
  },
  {
    id: 2,
    image: gallery2,
    title: "Suite parentale luxueuse",
    description: "Grande salle de bain - Neuilly-sur-Seine",
    category: ["grande", "pierre"],
    details: "Création d'une douche double à l'italienne dans une suite parentale de 15m². Revêtement en pierre naturelle, plafond en bois, double colonne de douche.",
  },
  {
    id: 3,
    image: gallery3,
    title: "Chevrons contemporains",
    description: "Salle de bain moderne - Boulogne",
    category: ["moderne", "petite"],
    details: "Rénovation complète avec carrelage chevrons gris. Paroi pivotante, niche intégrée, robinetterie encastrée chromée.",
  },
  {
    id: 4,
    image: gallery4,
    title: "Élégance beige et noir",
    description: "Appartement haussmannien - Paris 8ème",
    category: ["grande", "moderne"],
    details: "Douche à l'italienne avec receveur extra-plat, carrelage grand format beige, robinetterie noire mat. Éclairage encastré au plafond.",
  },
  {
    id: 5,
    image: gallery5,
    title: "Avant / Après spectaculaire",
    description: "Rénovation complète - Versailles",
    category: ["avant-apres"],
    details: "Transformation radicale d'une salle de bain datée. Avant : douche classique avec receveur. Après : douche à l'italienne avec marbre et paroi fixe.",
  },
  {
    id: 6,
    image: gallery6,
    title: "Style terrazzo épuré",
    description: "Loft contemporain - Montreuil",
    category: ["moderne", "petite"],
    details: "Douche à l'italienne ultra-minimaliste avec sol en terrazzo, paroi transparente et murs blancs. Design scandinave et lignes épurées.",
  },
  {
    id: 7,
    image: gallery7,
    title: "Élégance dorée et marbre",
    description: "Rénovation luxueuse - Paris 10ème",
    category: ["moderne", "grande", "paris10"],
    details: "Douche à l'italienne avec paroi vitrée profilé laiton doré, carrelage effet marbre onyx, niche intégrée et robinetterie dorée assortie. Meuble vasque en noyer avec poignées dorées.",
  },
  {
    id: 8,
    image: gallery8,
    title: "Suite dorée contemporaine",
    description: "Appartement parisien - Paris 10ème",
    category: ["moderne", "grande", "paris10"],
    details: "Salle de bain complète avec douche à l'italienne, miroir ovale encadré laiton, robinetterie dorée haut de gamme et éclairage LED intégré. Finitions soignées en ton sur ton beige et or.",
  },
  {
    id: 9,
    image: gallery9,
    title: "Robinetterie laiton sur onyx",
    description: "Détail finitions - Paris 10ème",
    category: ["moderne", "pierre", "paris10"],
    details: "Gros plan sur la robinetterie encastrée en laiton brossé doré avec douchette sur barre. Carrelage effet marbre onyx aux veines rosées. Banc d'angle intégré avec bord arrondi.",
  },
  {
    id: 10,
    image: gallery10,
    title: "Ciel de pluie doré",
    description: "Douche luxe - Paris 10ème",
    category: ["moderne", "grande", "paris10"],
    details: "Grande douche de pluie plafond en laiton doré combinée à une douchette à main. Paroi vitrée avec profilés dorés, niche de rangement intégrée et carrelage grand format effet onyx.",
  },
  {
    id: 11,
    image: gallery11,
    title: "Chevrons blancs et terrazzo",
    description: "Salle de bain complète - Bd Pereire Paris 17ème",
    category: ["moderne", "petite", "bdpereire"],
    details: "Rénovation complète avec carrelage chevrons blancs, sol terrazzo gris, meuble vasque suspendu blanc et sèche-serviettes noir. Robinetterie chromée et éclairage industriel.",
  },
  {
    id: 12,
    image: gallery12,
    title: "Douche d'angle vitrée",
    description: "Vue d'ensemble - Bd Pereire Paris 17ème",
    category: ["moderne", "petite", "bdpereire"],
    details: "Douche à l'italienne avec paroi vitrée d'angle, colonne de douche chromée avec ciel de pluie carré. WC suspendu et rangement encastré optimisant l'espace.",
  },
  {
    id: 13,
    image: gallery13,
    title: "Agencement optimisé",
    description: "Détails aménagement - Bd Pereire Paris 17ème",
    category: ["moderne", "petite", "bdpereire"],
    details: "Vue sur l'agencement compact et fonctionnel : WC suspendu, paroi de douche vitrée et meuble vasque. Carrelage chevrons blancs du sol au plafond.",
  },
  {
    id: 14,
    image: gallery14,
    title: "Colonne de douche design",
    description: "Équipements - Bd Pereire Paris 17ème",
    category: ["moderne", "bdpereire"],
    details: "Colonne de douche avec pommeau ciel de pluie carré et douchette à main. Paroi vitrée pivotante chromée et rangement intégré avec étagères.",
  },
  {
    id: 15,
    image: gallery15,
    title: "Vasque et miroir",
    description: "Espace lavabo - Bd Pereire Paris 17ème",
    category: ["moderne", "petite", "bdpereire"],
    details: "Meuble vasque blanc suspendu avec robinetterie chromée. Miroir rectangulaire encadré noir avec applique industrielle. Carrelage chevrons blancs.",
  },
  {
    id: 16,
    image: gallery16,
    title: "Sol terrazzo élégant",
    description: "Détail sol - Bd Pereire Paris 17ème",
    category: ["moderne", "bdpereire"],
    details: "Sol en carrelage terrazzo gris et blanc avec WC suspendu. Accessoires noirs (dérouleur papier) contrastant avec le blanc immaculé des murs.",
  },
  {
    id: 17,
    image: gallery17,
    title: "Robinetterie chromée premium",
    description: "Détail finitions - Bd Pereire Paris 17ème",
    category: ["moderne", "bdpereire"],
    details: "Gros plan sur la robinetterie chromée haut de gamme et le carrelage chevrons blancs. Accessoires noirs (distributeur de savon) pour un style contemporain.",
  },
  {
    id: 18,
    image: gallery18,
    title: "Tebrick bleu-vert et lavabo rétro",
    description: "Salle de bain élégante - Saint-Maur",
    category: ["moderne", "petite", "avnord"],
    details: "Salle de bain au charme rétro avec carrelage Tebrick bleu-vert posé à la verticale, lavabo sur pied blanc classique, miroir rond et appliques vintage. Sol en pierre naturelle beige.",
  },
  {
    id: 19,
    image: gallery19,
    title: "Vasque sur pied classique",
    description: "Détail lavabo - Saint-Maur",
    category: ["moderne", "avnord"],
    details: "Vue rapprochée sur le lavabo sur pied blanc avec robinetterie nickel mat trois trous. Carrelage Tebrick bleu-vert aux nuances subtiles et miroir rond élégant.",
  },
  {
    id: 20,
    image: gallery20,
    title: "Harmonie Tebrick et pierre",
    description: "Vue d'angle - Saint-Maur",
    category: ["moderne", "pierre", "avnord"],
    details: "Association raffinée entre le Tebrick bleu-vert mural et le sol en pierre naturelle. Applique boule vintage et robinetterie nickel mat trois trous.",
  },
  {
    id: 21,
    image: gallery21,
    title: "Douche nickel mat vintage",
    description: "Espace douche - Saint-Maur",
    category: ["moderne", "pierre", "avnord"],
    details: "Douche à l'italienne avec colonne nickel mat vintage, parois vitrées double porte, fond en pierre naturelle beige et côtés en Tebrick bleu-vert. Niche de rangement intégrée.",
  },
  {
    id: 22,
    image: gallery22,
    title: "Niche et robinetterie nickel mat",
    description: "Détail douche - Saint-Maur",
    category: ["moderne", "pierre", "avnord"],
    details: "Vue détaillée sur la niche de rangement en pierre naturelle, Tebrick bleu-vert vertical et colonne de douche nickel mat vintage avec douchette à main.",
  },
  {
    id: 23,
    image: gallery23,
    title: "Avant travaux - Vue d'ensemble",
    description: "État initial - Saint-Maur",
    category: ["avant-apres", "avnord"],
    details: "Salle de bain avant rénovation : baignoire avec pare-douche opaque, carrelage blanc vieillissant, sol damier vert et blanc, lavabo sur pied et mobilier ancien en marbre.",
  },
  {
    id: 24,
    image: gallery24,
    title: "Avant travaux - Espace baignoire",
    description: "État initial - Saint-Maur",
    category: ["avant-apres", "avnord"],
    details: "Vue sur la baignoire avec robinetterie datée, carrelage blanc petit format, volets intérieurs abîmés et équipements à remplacer.",
  },
  {
    id: 25,
    image: gallery25,
    title: "Avant travaux - Vue large",
    description: "État initial - Saint-Maur",
    category: ["avant-apres", "avnord"],
    details: "Panorama de la salle de bain avant transformation : agencement à repenser, matériaux vétustes, sol damier et meuble ancien en marbre rouge à déposer.",
  },
  {
    id: 26,
    image: gallery26,
    title: "Avant travaux - Ancienne cuisine",
    description: "Transformation cuisine → salle de bain - Paris 10ème",
    category: ["avant-apres", "paris10"],
    details: "État initial : ancienne cuisine en cours de démolition. Ce projet ambitieux a consisté à transformer entièrement cet espace cuisine en une luxueuse salle de bain avec douche à l'italienne, carrelage effet onyx et robinetterie dorée.",
  },
  {
    id: 27,
    image: gallery27,
    title: "Avant travaux - Vue sur balcon",
    description: "Transformation cuisine → salle de bain - Paris 10ème",
    category: ["avant-apres", "paris10"],
    details: "Vue d'ensemble de l'ancienne cuisine avec accès balcon. Travaux de démolition et préparation du sol en cours pour la création de la nouvelle salle de bain haut de gamme.",
  },
  {
    id: 28,
    image: gallery28,
    title: "Avant travaux - Démolition",
    description: "Chantier en cours - Paris 10ème",
    category: ["avant-apres", "paris10"],
    details: "Phase de gros œuvre : dépose de la cuisine existante, ouverture du sol pour passage des nouvelles canalisations d'évacuation et d'alimentation de la future douche à l'italienne.",
  },
  {
    id: 29,
    image: gallery29,
    title: "Avant travaux - Préparation plomberie",
    description: "Chantier en cours - Paris 10ème",
    category: ["avant-apres", "paris10"],
    details: "Travaux de plomberie : création des nouvelles arrivées d'eau et évacuations. La cuisine a été entièrement déposée pour laisser place à une salle de bain moderne avec douche de pluie et finitions dorées.",
  },
  {
    id: 30,
    image: paris17_1,
    title: "Claustra bois et vasque suspendue",
    description: "Salle de bain ouverte - Paris 17ème",
    category: ["moderne", "grande", "severac"],
    details: "Création d'une salle de bain ouverte sur la chambre avec claustra en tasseaux de bois. Meuble vasque suspendu en noyer, miroir rond LED et robinetterie laiton doré. Carrelage effet marbre blanc au sol et murs.",
  },
  {
    id: 31,
    image: paris17_2,
    title: "Douche à l'italienne profilé doré",
    description: "Paroi vitrée haut de gamme - Paris 17ème",
    category: ["moderne", "grande", "severac"],
    details: "Douche à l'italienne spacieuse avec paroi coulissante vitrée profilé laiton doré, colonne haute de rangement et carrelage effet marbre veines grises. Colonne de douche avec ciel de pluie.",
  },
  {
    id: 32,
    image: paris17_3,
    title: "Vue d'ensemble douche et vasque",
    description: "Harmonie bois et laiton - Paris 17ème",
    category: ["moderne", "grande", "severac"],
    details: "Salle de bain complète avec douche à l'italienne, meuble vasque noyer, miroir rond rétroéclairé LED et paroi vitrée laiton. Association raffinée du bois, du marbre et des finitions dorées.",
  },
  {
    id: 33,
    image: paris17_4,
    title: "Claustra vue depuis l'entrée",
    description: "Séparation design - Paris 17ème",
    category: ["moderne", "grande", "severac"],
    details: "Vue à travers le claustra en tasseaux de bois sur l'espace salle de bain. Miroir rond LED, vasque suspendue noyer et robinetterie laiton doré. Transition élégante entre la chambre et la salle d'eau.",
  },
  {
    id: 34,
    image: paris17_5,
    title: "Claustra et sol marbre",
    description: "Intégration parquet/carrelage - Paris 17ème",
    category: ["moderne", "grande", "severac"],
    details: "Jonction parfaite entre le parquet chevrons de la chambre et le carrelage effet marbre de la salle de bain. Claustra bois sur muret carrelé créant une séparation aérienne.",
  },
  {
    id: 35,
    image: paris17_6,
    title: "Vue chambre et claustra",
    description: "Suite parentale ouverte - Paris 17ème",
    category: ["moderne", "grande", "severac"],
    details: "Aménagement suite parentale avec claustra bois créant une séparation visuelle élégante entre l'espace nuit et la salle de bain. Lumière naturelle préservée grâce à l'espacement des tasseaux.",
  },
  {
    id: 36,
    image: paris17_7,
    title: "Ancienne salle de bain - Avant travaux",
    description: "État initial - Paris 17ème",
    category: ["avant-apres", "severac"],
    details: "Salle de bain initiale avec baignoire d'angle habillage bois, carrelage gris ardoise, mur bleu canard et sol galets. Transformation complète vers un style contemporain épuré avec claustra bois et finitions dorées.",
  },
  {
    id: 37,
    image: paris17_8,
    title: "Baignoire d'angle avant travaux",
    description: "État initial - Paris 17ème",
    category: ["avant-apres", "severac"],
    details: "Vue sur la baignoire d'angle avec habillage bois exotique et sol galets noirs avant rénovation. Cette salle de bain a été entièrement repensée pour créer une salle d'eau moderne ouverte sur la chambre.",
  },
  {
    id: 38,
    image: convention1,
    title: "Douche spacieuse carrelage béton",
    description: "Salle de bain moderne - Paris 15ème",
    category: ["moderne", "grande", "convention"],
    details: "Douche à l'italienne avec paroi coulissante vitrée, carrelage grand format effet béton gris, niche de rangement intégrée et meuble vasque chêne massif suspendu. Robinetterie chromée.",
  },
  {
    id: 39,
    image: convention2,
    title: "Douche ciel de pluie",
    description: "Espace douche - Paris 15ème",
    category: ["moderne", "grande", "convention"],
    details: "Grande douche avec colonne de douche chromée incluant ciel de pluie et douchette à main. Paroi vitrée coulissante, receveur extra-plat blanc et niche de rangement dans le carrelage effet béton.",
  },
  {
    id: 40,
    image: convention3,
    title: "Vasque chêne suspendue",
    description: "Espace lavabo - Paris 15ème",
    category: ["moderne", "convention"],
    details: "Meuble vasque suspendu en chêne massif avec tiroirs, vasque intégrée blanche et robinetterie inox brossé. Miroir rectangulaire et crédence carrelage effet béton.",
  },
  {
    id: 41,
    image: convention4,
    title: "Vue d'ensemble salle de bain",
    description: "Harmonie bois et béton - Paris 15ème",
    category: ["moderne", "grande", "convention"],
    details: "Salle de bain complète avec douche à l'italienne, meuble vasque chêne, miroir LED et carrelage effet béton. Association élégante du bois naturel et des teintes grises.",
  },
  {
    id: 42,
    image: convention5,
    title: "WC suspendu design",
    description: "Toilettes contemporaines - Paris 15ème",
    category: ["moderne", "convention"],
    details: "WC suspendu avec bâti-support encastré, carrelage métro blanc brillant, peinture bleu foncé, rangement bois encadré et éclairage d'ambiance. Design contemporain et optimisation de l'espace.",
  },
  {
    id: 43,
    image: convention6,
    title: "WC vue d'entrée",
    description: "Espace toilettes - Paris 15ème",
    category: ["moderne", "convention"],
    details: "Vue depuis l'entrée sur les toilettes design : WC suspendu, carrelage métro blanc, murs bleu profond avec niche bois et rangement supérieur. Cadre décoratif et ampoule vintage.",
  },
  {
    id: 44,
    image: butteschaumont1,
    title: "État initial - Vue lavabo",
    description: "🚧 Chantier en cours - Paris 19ème",
    category: ["petite", "butteschaumont"],
    details: "Petite salle de bain avant rénovation : lavabo avec meuble sous vasque, paroi de douche vitrée décorative, carrelage blanc avec frise bleue. Transformation prévue en douche à l'italienne moderne.",
    isInProgress: true,
  },
  {
    id: 45,
    image: butteschaumont2,
    title: "État initial - Espace douche",
    description: "🚧 Chantier en cours - Paris 19ème",
    category: ["petite", "butteschaumont"],
    details: "Vue sur la douche existante avec cabine vitrée décorée, sol carrelage octogonal blanc et bleu. Projet de rénovation complète en cours.",
    isInProgress: true,
  },
  {
    id: 46,
    image: butteschaumont3,
    title: "État initial - Vue d'entrée",
    description: "🚧 Chantier en cours - Paris 19ème",
    category: ["petite", "butteschaumont"],
    details: "Vue depuis l'entrée de la salle de bain à rénover, passage voûté caractéristique. Travaux de transformation en cours pour créer une douche à l'italienne optimisée.",
    isInProgress: true,
  },
  {
    id: 47,
    image: jemmapes1,
    title: "Douche à l'italienne - Vue latérale",
    description: "Paris 10ème - Quai Jemmapes",
    category: ["petite", "moderne", "jemmapes"],
    details: "Salle de bain masculine élégante : douche à l'italienne avec paroi fixe noire, receveur anthracite, carrelage grand format gris béton. Meuble vasque bois et noir avec vasque à poser blanche, robinetterie noire mat.",
  },
  {
    id: 48,
    image: jemmapes2,
    title: "Vue d'ensemble avec sèche-serviettes",
    description: "Paris 10ème - Quai Jemmapes",
    category: ["petite", "moderne", "jemmapes"],
    details: "Vue complète de la salle de bain : paroi fixe noire avec barre de stabilisation, pomme de douche ronde noire, sèche-serviettes design gris. Style minimaliste gris et noir pour homme.",
  },
  {
    id: 49,
    image: jemmapes3,
    title: "Meuble vasque design",
    description: "Paris 10ème - Quai Jemmapes",
    category: ["petite", "moderne", "jemmapes"],
    details: "Détail du meuble vasque : plan bois chêne, tiroirs noirs sans poignée, vasque ovale blanche, robinetterie noire mat. Miroir arrondi élégant et accessoires noirs coordonnés.",
  },
  {
    id: 50,
    image: taitbout1,
    title: "État initial - Vue fenêtre",
    description: "🚧 Chantier en cours - Paris 9ème",
    category: ["taitbout"],
    details: "Espace avant travaux : fenêtre donnant sur cour intérieure, tringle à rideau existante. Préparation du chantier pour transformation complète en salle de bain sous combles.",
    isInProgress: true,
  },
  {
    id: 51,
    image: taitbout2,
    title: "État initial - Baignoire et WC",
    description: "🚧 Chantier en cours - Paris 9ème",
    category: ["petite", "taitbout"],
    details: "Salle de bain existante sous pente : baignoire avec pare-douche accordéon, WC et meuble vasque blanc. Carrelage gris au sol, contrainte de hauteur sous plafond à optimiser.",
    isInProgress: true,
  },
  {
    id: 52,
    image: taitbout3,
    title: "État initial - Vue d'ensemble",
    description: "🚧 Chantier en cours - Paris 9ème",
    category: ["petite", "taitbout"],
    details: "Vue depuis l'entrée : lavabo sur pied, étagères de rangement, miroir extensible. Accès vers couloir et chambre. Projet de rénovation complète avec douche à l'italienne.",
    isInProgress: true,
  },
  {
    id: 53,
    image: rocroy1,
    title: "Démolition - Vue générale",
    description: "🚧 Chantier en cours - Paris 10ème",
    category: ["rocroy"],
    details: "Phase de démolition dans un appartement haussmannien avec moulures au plafond. Travaux de gros œuvre : ouverture de cloisons, passage des gaines électriques. Projet de réaménagement complet.",
    isInProgress: true,
  },
  {
    id: 54,
    image: rocroy2,
    title: "État initial - Salle de bain existante",
    description: "🚧 Chantier en cours - Paris 10ème",
    category: ["petite", "rocroy", "avant-apres"],
    details: "Salle de bain avant travaux : baignoire d'angle à remplacer, carrelage blanc et frise dorée datée, sol en terre cuite. Transformation prévue en douche à l'italienne moderne.",
    isInProgress: true,
  },
  {
    id: 55,
    image: boisColombes11,
    title: "Douche à l'italienne avec pommeau",
    description: "Rénovation complète - Bois-Colombes",
    category: ["petite", "moderne", "boiscolombes"],
    details: "Grande douche à l'italienne avec paroi coulissante dorée. Pomme de douche ronde effet pluie en laiton brossé. Carrelage chevrons blanc, sol terrazzo. Sèche-serviettes doré sous fenêtre.",
  },
  {
    id: 56,
    image: boisColombes2,
    title: "Vue générale - Sol terrazzo",
    description: "Rénovation complète - Bois-Colombes",
    category: ["petite", "moderne", "boiscolombes"],
    details: "Transformation complète : douche à l'italienne avec paroi dorée, carrelage mural chevrons blanc, sol terrazzo multicolore, murs vert d'eau. Robinetterie dorée élégante.",
  },
  {
    id: 57,
    image: boisColombes3,
    title: "Meuble vasque sur mesure",
    description: "Rénovation complète - Bois-Colombes",
    category: ["petite", "moderne", "boiscolombes"],
    details: "Meuble vasque blanc suspendu avec plan sur mesure, robinetterie dorée. Placard sur mesure vert d'eau avec intégration machine à laver. Plafonnier rond moderne, miroir rectangulaire.",
  },
  {
    id: 58,
    image: boisColombes5,
    title: "Vasque et miroir connecté",
    description: "Rénovation complète - Bois-Colombes",
    category: ["petite", "moderne", "boiscolombes"],
    details: "Vasque rectangulaire blanche avec robinetterie dorée. Miroir LED connecté avec affichage digital. Plantes vertes en décoration sur étagère haute. Carrelage chevrons blanc en crédence.",
  },
  {
    id: 59,
    image: boisColombes4,
    title: "Sèche-serviettes doré",
    description: "Rénovation complète - Bois-Colombes",
    category: ["petite", "moderne", "boiscolombes"],
    details: "Sèche-serviettes électrique doré : finition laiton brossé assortie à la robinetterie et paroi de douche. Murs vert d'eau pour une ambiance douce et moderne.",
  },
  {
    id: 60,
    image: boisColombes6,
    title: "Niche terrazzo",
    description: "Rénovation complète - Bois-Colombes",
    category: ["petite", "moderne", "boiscolombes"],
    details: "Niche de rangement intégrée dans la douche : revêtement terrazzo multicolore assorti au sol. Encadrement carrelage chevrons blanc pour un contraste élégant.",
  },
  {
    id: 61,
    image: boisColombes7,
    title: "Paroi dorée et niche",
    description: "Rénovation complète - Bois-Colombes",
    category: ["petite", "moderne", "boiscolombes"],
    details: "Vue sur la paroi de douche dorée avec poignée laiton brossé. Niche intégrée en terrazzo pour rangement produits. Carrelage chevrons blanc du sol au plafond.",
  },
  {
    id: 62,
    image: boisColombes8,
    title: "Robinetterie dorée",
    description: "Rénovation complète - Bois-Colombes",
    category: ["petite", "moderne", "boiscolombes"],
    details: "Gros plan sur la robinetterie dorée haut de gamme : mitigeur mono-commande en laiton brossé. Miroir connecté avec horloge digitale intégrée visible en reflet.",
  },
  {
    id: 63,
    image: boisColombes1,
    title: "AVANT - Salle de bain sombre",
    description: "Avant / Après - Bois-Colombes",
    category: ["petite", "boiscolombes", "avant-apres"],
    details: "Salle de bain avant rénovation : murs gris foncé, baignoire avec rideau, machine à laver sous plan de travail, sol carrelé noir et blanc. Ambiance sombre à moderniser.",
  },
  {
    id: 64,
    image: boisColombes9,
    title: "AVANT - Zone vasque",
    description: "Avant / Après - Bois-Colombes",
    category: ["petite", "boiscolombes", "avant-apres"],
    details: "Salle de bain avant rénovation : mur gris foncé, baignoire ancienne, meuble vasque blanc daté, carrelage mural blanc basique, radiateur fonte. Espace à moderniser entièrement.",
  },
  {
    id: 65,
    image: boisColombes10,
    title: "AVANT - Vue générale",
    description: "Avant / Après - Bois-Colombes",
    category: ["petite", "boiscolombes", "avant-apres"],
    details: "Vue d'ensemble avant travaux : machine à laver sous plan noir, étagères ouvertes, baignoire avec rideau. Sol carrelé noir et blanc, murs gris. Transformation complète prévue.",
  },
  // Réalisations terminées - Paris 12ème Cours de Vincennes - SDB Monsieur
  {
    id: 69,
    image: vincennesMr1,
    title: "Vue d'ensemble SDB Monsieur",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["grande", "moderne", "pierre", "vincennesmr"],
    details: "Salle de bain masculine haut de gamme : carrelage effet marbre Calacatta or, meuble vasque noyer sur-mesure, paroi de douche verrière noire. Rangement colonne intégré.",
  },
  {
    id: 70,
    image: vincennesMr2,
    title: "Vasque et miroir",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["grande", "moderne", "pierre", "vincennesmr"],
    details: "Plan vasque en solid surface blanc avec meuble noyer sans poignées. Grand miroir rétroéclairé, robinetterie noire mate. Carrelage mural marbre veiné or du sol au plafond.",
  },
  {
    id: 71,
    image: vincennesMr3,
    title: "Douche verrière noire",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["grande", "moderne", "pierre", "vincennesmr"],
    details: "Douche spacieuse avec paroi verrière noire style atelier. Ciel de pluie encastré noir mat, douchette assortie. Niche de rangement intégrée. Receveur extra-plat blanc.",
  },
  {
    id: 72,
    image: vincennesMr4,
    title: "Robinetterie et niche",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["grande", "moderne", "pierre", "vincennesmr"],
    details: "Détail de la douche : robinetterie thermostatique noire encastrée, ciel de pluie XXL, douchette sur flexible. Niche de rangement carrelée marbre pour produits.",
  },
  {
    id: 76,
    image: vincennesMr5,
    title: "Miroir et reflets",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["grande", "moderne", "pierre", "vincennesmr"],
    details: "Grand miroir numérique avec éclairage LED intégré. Reflet de la douche verrière et fenêtre bois. Vasque en solid surface blanc, robinetterie noire mate.",
  },
  {
    id: 77,
    image: vincennesMr6,
    title: "Sèche-serviettes design",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["grande", "moderne", "pierre", "vincennesmr"],
    details: "Sèche-serviettes noir mat électrique avec programmateur. Colonne de rangement noyer toute hauteur. Carrelage marbre Calacatta or du sol au plafond.",
  },
  {
    id: 78,
    image: vincennesMr7,
    title: "Niche et robinetterie douche",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["grande", "moderne", "pierre", "vincennesmr"],
    details: "Détail de la niche de rangement carrelée marbre. Robinetterie thermostatique encastrée noire, douchette ergonomique. Produits haut de gamme en présentation.",
  },
  {
    id: 79,
    image: vincennesMr8,
    title: "Colonne rangement noyer",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["grande", "moderne", "pierre", "vincennesmr"],
    details: "Colonne de rangement sur-mesure en noyer avec boutons noirs. Espace optimisé du sol au plafond, reflet dans le miroir. Harmonie bois et marbre.",
  },
  {
    id: 80,
    image: vincennesMr9,
    title: "Buanderie intégrée",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["grande", "moderne", "pierre", "vincennesmr"],
    details: "Espace buanderie dissimulé dans la colonne noyer : lave-linge et sèche-linge superposés, étagères pour serviettes, rangements produits. Solution gain de place élégante.",
  },
  {
    id: 81,
    image: vincennesMr10,
    title: "Vue depuis la douche",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["grande", "moderne", "pierre", "vincennesmr"],
    details: "Perspective depuis la paroi verrière : vasque noyer, grand miroir, colonne rangement. Fenêtre bois apportant lumière naturelle. Sol et murs marbre Calacatta.",
  },
  {
    id: 82,
    image: vincennesMr11,
    title: "Vue panoramique",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["grande", "moderne", "pierre", "vincennesmr"],
    details: "Vue d'ensemble : douche XXL avec ciel de pluie noir encastré, niche produits, vasque design, colonne rangement. Harmonie parfaite marbre, noyer et noir.",
  },
  {
    id: 83,
    image: vincennesMr12,
    title: "Espace douche complet",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["grande", "moderne", "pierre", "vincennesmr"],
    details: "Douche à l'italienne spacieuse avec ciel de pluie XXL noir, paroi verrière, niche de rangement. Vue sur fenêtre bois et meuble vasque. Luminosité optimale.",
  },
  // Photos AVANT - Paris 12ème Cours de Vincennes
  {
    id: 73,
    image: vincennes1,
    title: "Avant - Douche quart de cercle",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["vincennesmr", "avant-apres"],
    details: "État initial : cabine de douche quart de cercle avec paroi coulissante. Carrelage gris clair, robinetterie chromée. Transformation en douche à l'italienne haut de gamme.",
  },
  {
    id: 74,
    image: vincennes2,
    title: "Avant - Salle de bain à rénover",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["vincennesmr", "avant-apres"],
    details: "Vue depuis l'entrée : espace buanderie et salle de bain combinés. Carrelage grand format beige, meuble sous vasque à transformer.",
  },
  {
    id: 75,
    image: vincennes3,
    title: "Avant - Vue générale",
    description: "Paris 12ème - Cours de Vincennes",
    category: ["vincennesmr", "avant-apres"],
    details: "Vue d'ensemble de la pièce d'eau avant travaux : douche, zone buanderie, accès vers les autres pièces.",
  },
];

const categories: { id: Category; label: string; description?: string }[] = [
  { id: "all", label: "Tous" },
  { 
    id: "vincennesmr", 
    label: "Paris 12ème - Cours de Vincennes",
    description: "Salle de bain masculine haut de gamme au Cours de Vincennes.\nCarrelage effet marbre Calacatta or, meuble vasque noyer sur-mesure.\nDouche verrière noire, robinetterie mate, ciel de pluie XXL."
  },
  { 
    id: "boiscolombes", 
    label: "Bois-Colombes - Avant/Après",
    description: "Transformation complète d'une salle de bain à Bois-Colombes.\nD'un espace sombre et daté à une pièce lumineuse et moderne.\nDouche à l'italienne, robinetterie dorée, sol terrazzo et murs vert d'eau."
  },
  { id: "jemmapes", label: "Paris 10ème - Salle de bain au masculin" },
  { id: "convention", label: "Paris 15ème - Convention" },
  { id: "severac", label: "Paris 17ème - Suite Parentale Ternes" },
  { id: "paris10", label: "Paris 10ème" },
  { id: "bdpereire", label: "Paris 17ème - Les Ternes" },
  { id: "avnord", label: "Saint-Maur" },
  { id: "petite", label: "Petites salles de bain" },
  { id: "grande", label: "Grandes salles de bain" },
  { id: "moderne", label: "Style moderne" },
  { id: "pierre", label: "Pierre naturelle" },
  { id: "avant-apres", label: "Avant / Après" },
];

const inProgressCategories: { id: InProgressCategory; label: string }[] = [
  { id: "all-progress", label: "Tous les chantiers" },
  { id: "rocroy", label: "Paris 10ème - Rue de Rocroy" },
  { id: "taitbout", label: "Paris 9ème - Rue Taitbout" },
  { id: "butteschaumont", label: "Paris 19ème - Buttes-Chaumont" },
];

export default function Realisations() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [activeInProgressCategory, setActiveInProgressCategory] = useState<InProgressCategory>("all-progress");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Projets terminés (sans isInProgress)
  const completedProjects = projects.filter(p => !p.isInProgress);
  const filteredProjects = activeCategory === "all" 
    ? completedProjects 
    : completedProjects.filter(p => p.category.includes(activeCategory));

  // Projets en cours
  const inProgressProjects = projects.filter(p => p.isInProgress);
  const filteredInProgressProjects = activeInProgressCategory === "all-progress"
    ? inProgressProjects
    : inProgressProjects.filter(p => p.category.includes(activeInProgressCategory));

  const activeDescription = categories.find(c => c.id === activeCategory)?.description;

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
              Découvrez nos créations
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Du loft parisien au pavillon de banlieue, chaque projet raconte une métamorphose. 
              Douche à l'italienne au seuil optimisé selon les règles DTU, trappe de visite 
              invisible intégrée au carrelage, transformation baignoire en espace bien-être, 
              receveur extra-plat ou réaménagement complet avec WC suspendu — nos équipes 
              avec notre maître d'œuvre Carina, dédiée à votre projet, supervisent chaque 
              étape pour sublimer vos mètres carrés les plus intimes.
            </p>
            <p className="text-wood font-medium text-xl italic">
              Et vous, team receveur minimaliste ou baignoire cocooning ?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Description du chantier */}
          {activeDescription && (
            <motion.div 
              className="bg-accent/20 rounded-2xl p-6 mb-12 text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeDescription.split('\n').map((line, index) => (
                <p key={index} className="text-foreground/80 leading-relaxed">
                  {line}
                </p>
              ))}
            </motion.div>
          )}

          {/* Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="card-elevated overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Section Projets en cours */}
      <section id="chantiers-en-cours" className="section-padding bg-stone/50">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-wood/20 text-wood text-sm font-medium mb-4">
              🚧 Travaux en cours
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Projets en cours
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos chantiers actuels et suivez leur avancement
            </p>
          </motion.div>

          {/* Filtres projets en cours */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {inProgressCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveInProgressCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeInProgressCategory === cat.id
                    ? "bg-wood text-white"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid projets en cours */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredInProgressProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="card-elevated overflow-hidden border-2 border-wood/30">
                    <div className="aspect-square overflow-hidden relative">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 left-2 bg-wood text-white text-xs px-2 py-1 rounded-full">
                        En cours
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            
            {/* Content */}
            <motion.div
              className="relative bg-background rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square md:aspect-auto">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{selectedProject.description}</p>
                  <p className="text-foreground leading-relaxed mb-8">
                    {selectedProject.details}
                  </p>
                  <Button variant="cta" size="lg" asChild>
                    <Link to="/devis">
                      Un projet similaire ?
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
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
              Inspiré par nos réalisations ?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Partagez-nous votre vision et créons ensemble la douche à l'italienne de vos rêves.
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