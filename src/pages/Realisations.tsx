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
import boisColombresAvant1 from "@/assets/bois-colombes-avant-1.jpg";
import boisColombresAvant2 from "@/assets/bois-colombes-avant-2.jpg";
import boisColombresAvant3 from "@/assets/bois-colombes-avant-3.jpg";

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
import butteschaumont4 from "@/assets/buttes-chaumont-4.jpg";
import butteschaumont5 from "@/assets/buttes-chaumont-5.jpg";
import butteschaumont6 from "@/assets/buttes-chaumont-6.jpg";
import butteschaumont7 from "@/assets/buttes-chaumont-7.jpg";
import butteschaumont8 from "@/assets/buttes-chaumont-8.jpg";
import butteschaumont9 from "@/assets/buttes-chaumont-9.jpg";
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

// Boulevard Saint-Germain
import stgermain1 from "@/assets/stgermain-1.jpg";
import stgermain2 from "@/assets/stgermain-2.jpg";
import stgermain3 from "@/assets/stgermain-3.jpg";
import stgermain4 from "@/assets/stgermain-4.jpg";
import stgermainAvant from "@/assets/stgermain-avant.jpg";
import stgermainAvant2 from "@/assets/stgermain-avant-2.jpg";
import stgermainAvant3 from "@/assets/stgermain-avant-3.jpg";
import stgermainAvant4 from "@/assets/stgermain-avant-4.jpg";

// Faubourg Saint-Martin Paris 10ème
import faubourgStmartin1 from "@/assets/faubourg-stmartin-1.jpg";
import faubourgStmartin2 from "@/assets/faubourg-stmartin-2.jpg";
import faubourgStmartin3 from "@/assets/faubourg-stmartin-3.jpg";
import faubourgStmartin4 from "@/assets/faubourg-stmartin-4.jpg";
import faubourgStmartin5 from "@/assets/faubourg-stmartin-5.jpg";
import faubourgStmartin6 from "@/assets/faubourg-stmartin-6.jpg";
import faubourgStmartin7 from "@/assets/faubourg-stmartin-7.jpg";

// Port Royal Paris 5ème - Chantier en cours
import portRoyal1 from "@/assets/port-royal-1.jpg";
import portRoyalAvant1 from "@/assets/port-royal-avant-1.jpg";
import portRoyalAvant2 from "@/assets/port-royal-avant-2.jpg";

// La Tour Paris 16ème - Chantier en cours
import laTourAvant1 from "@/assets/la-tour-avant-1.jpg";
import laTourAvant2 from "@/assets/la-tour-avant-2.jpg";
import laTourAvant3 from "@/assets/la-tour-avant-3.jpg";
import laTourAvant4 from "@/assets/la-tour-avant-4.jpg";
import laTourAvant5 from "@/assets/la-tour-avant-5.jpg";

// Amiral Roussin Paris 15ème
import amiralRoussin1 from "@/assets/amiral-roussin-1.jpg";
import amiralRoussin2 from "@/assets/amiral-roussin-2.jpg";
import amiralRoussin3 from "@/assets/amiral-roussin-3.jpg";
import amiralRoussin4 from "@/assets/amiral-roussin-4.jpg";
import amiralRoussin5 from "@/assets/amiral-roussin-5.jpg";
import amiralRoussin6 from "@/assets/amiral-roussin-6.jpg";

// Buffon Paris 5ème
import buffon1 from "@/assets/buffon-1.jpg";
import buffon2 from "@/assets/buffon-2.jpg";
import buffon3 from "@/assets/buffon-3.jpg";
import buffon4 from "@/assets/buffon-4.jpg";
import buffon5 from "@/assets/buffon-5.jpg";
import buffon6 from "@/assets/buffon-6.jpg";
import buffon7 from "@/assets/buffon-7.jpg";
import buffonAvant1 from "@/assets/buffon-avant-1.jpg";
import buffonAvant2 from "@/assets/buffon-avant-2.jpg";

// Lauriston Paris 16ème
import lauriston1 from "@/assets/lauriston-1.jpg";
import lauriston2 from "@/assets/lauriston-2.jpg";
import lauriston3 from "@/assets/lauriston-3.jpg";
import lauriston4 from "@/assets/lauriston-4.jpg";
import lauriston5 from "@/assets/lauriston-5.jpg";
import lauristonAvant1 from "@/assets/lauriston-avant-1.jpg";
import lauristonAvant2 from "@/assets/lauriston-avant-2.jpg";

// Cîteaux Paris 12ème
import citeaux1 from "@/assets/citeaux-1.jpg";
import citeaux2 from "@/assets/citeaux-2.jpg";
import citeaux3 from "@/assets/citeaux-3.jpg";
import citeaux4 from "@/assets/citeaux-4.jpg";
import citeauxAvant1 from "@/assets/citeaux-avant-1.jpg";
import citeauxAvant2 from "@/assets/citeaux-avant-2.jpg";

// Boulogne-Billancourt
import boulogne1 from "@/assets/boulogne-1.jpg";
import boulogne2 from "@/assets/boulogne-2.jpg";
import boulogne3 from "@/assets/boulogne-3.jpg";
import boulogne4 from "@/assets/boulogne-4.jpg";
import boulogne5 from "@/assets/boulogne-5.jpg";
import boulogne6 from "@/assets/boulogne-6.jpg";
import boulogne7 from "@/assets/boulogne-7.jpg";
import boulogne8 from "@/assets/boulogne-8.jpg";
import boulogne9 from "@/assets/boulogne-9.jpg";
import boulogneAvant1 from "@/assets/boulogne-avant-1.jpg";
import boulogneAvant2 from "@/assets/boulogne-avant-2.jpg";
import boulogneAvant3 from "@/assets/boulogne-avant-3.jpg";
import boulogneTravaux1 from "@/assets/boulogne-travaux-1.jpg";
import boulogneTravaux2 from "@/assets/boulogne-travaux-2.jpg";

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
    description: "AVANT : Salle de bain standard sans caractère. APRÈS : Salle de bain masculine haut de gamme. Plan Corian blanc, meuble sur-mesure Noyer de Bourgogne, miroir AICA. Paroi verrière Asealia Twenty Noir, robinetterie MaSalleDeBain.com. Buanderie et table à repasser dissimulées dans une colonne sur-mesure.",
    coverImage: vincennesMr1,
    photos: [
      { id: 1, image: vincennesMr1, title: "Après — Vue d'ensemble", description: "Double vasque Corian et meuble Noyer de Bourgogne" },
      { id: 2, image: vincennesMr2, title: "Après — Douche à l'italienne", description: "Verrière Twenty Noir et ciel de pluie encastré" },
      { id: 3, image: vincennesMr3, title: "Après — Détail robinetterie", description: "Robinetterie noire mate MaSalleDeBain.com" },
      { id: 4, image: vincennesMr4, title: "Après — Miroir AICA", description: "Miroir LED avec éclairage intégré" },
      { id: 5, image: vincennesMr5, title: "Après — Colonne rangement", description: "Buanderie dissimulée sur-mesure" },
      { id: 6, image: vincennesMr6, title: "Après — Vue latérale", description: "Optimisation de chaque centimètre" },
      { id: 7, image: vincennesMr7, title: "Après — Paroi verrière", description: "Asealia Twenty Noir élégante" },
      { id: 8, image: vincennesMr8, title: "Après — Plan vasque", description: "Corian blanc sans joints apparents" },
      { id: 9, image: vincennesMr9, title: "Après — Finitions", description: "Attention aux détails" },
      { id: 10, image: vincennesMr10, title: "Après — Espace douche", description: "Receveur Le Monde du Bain" },
      { id: 11, image: vincennesMr11, title: "Après — Rangements", description: "Solutions sur-mesure" },
      { id: 12, image: vincennesMr12, title: "Après — Ambiance finale", description: "Harmonie des matériaux" },
    ],
  },
  {
    id: "bois-colombes",
    title: "Rénovation complète Avant/Après",
    location: "Bois-Colombes",
    description: "AVANT : Salle de bain sombre et datée avec baignoire, carrelage ancien et buanderie encombrante. APRÈS : Transformation spectaculaire en pièce lumineuse et moderne. Douche à l'italienne XXL, robinetterie dorée, sol terrazzo et murs vert d'eau.",
    coverImage: boisColombes2,
    photos: [
      { id: 1, image: boisColombes2, title: "Après — Résultat final", description: "Meuble suspendu et robinetterie dorée" },
      { id: 2, image: boisColombes3, title: "Après — Paroi vitrée", description: "Verrière noire élégante" },
      { id: 3, image: boisColombes4, title: "Après — Sol terrazzo", description: "Finition haut de gamme" },
      { id: 4, image: boisColombes5, title: "Après — Détails dorés", description: "Robinetterie et accessoires" },
      { id: 5, image: boisColombes6, title: "Après — Espace optimisé", description: "Chaque cm² utilisé" },
      { id: 6, image: boisColombes10, title: "Travaux — Démolition", description: "Phase de dépose" },
      { id: 7, image: boisColombes11, title: "Travaux — Préparation", description: "Mise à nu des murs" },
      { id: 8, image: boisColombresAvant1, title: "Avant — Vue d'ensemble", description: "Salle de bain avec baignoire datée" },
      { id: 9, image: boisColombresAvant2, title: "Avant — Vasque", description: "Ancien meuble vasque" },
      { id: 10, image: boisColombresAvant3, title: "Avant — Coin buanderie", description: "Espace lave-linge" },
    ],
  },
  {
    id: "paris17-suite",
    title: "Suite Parentale Les Ternes",
    location: "Paris 17ème",
    description: "AVANT : Chambre parentale sans salle de bain attenante. APRÈS : Création d'une suite parentale luxueuse avec douche à l'italienne XXL double entrée, double vasque en pierre naturelle et finitions haut de gamme. Robinetterie noire mate et niches intégrées.",
    coverImage: paris17_1,
    photos: [
      { id: 1, image: paris17_1, title: "Après — Douche XXL", description: "Double entrée et ciel de pluie" },
      { id: 2, image: paris17_2, title: "Après — Double vasque", description: "Plan en pierre naturelle" },
      { id: 3, image: paris17_3, title: "Après — Vue d'ensemble", description: "Espace généreux et lumineux" },
      { id: 4, image: paris17_4, title: "Après — Paroi vitrée", description: "Profilés noirs élégants" },
      { id: 5, image: paris17_5, title: "Après — Robinetterie", description: "Finition noire mate" },
      { id: 6, image: paris17_6, title: "Après — Rangements", description: "Niches intégrées" },
      { id: 7, image: paris17_7, title: "Après — Éclairage", description: "LED encastrés" },
      { id: 8, image: paris17_8, title: "Après — Finitions", description: "Joints et détails soignés" },
    ],
  },
  {
    id: "paris15-convention",
    title: "Rénovation Convention",
    location: "Paris 15ème",
    description: "AVANT : Salle de bain avec baignoire et carrelage démodé. APRÈS : Transformation complète en douche à l'italienne avec carrelage grand format effet marbre et robinetterie noire. Meuble suspendu moderne et paroi fixe en verre trempé.",
    coverImage: convention1,
    photos: [
      { id: 1, image: convention1, title: "Après — Résultat final", description: "Douche à l'italienne élégante" },
      { id: 2, image: convention2, title: "Après — Carrelage grand format", description: "Effet marbre contemporain" },
      { id: 3, image: convention3, title: "Après — Paroi fixe", description: "Verre trempé sécurit" },
      { id: 4, image: convention4, title: "Après — Robinetterie", description: "Colonne de douche noire" },
      { id: 5, image: convention5, title: "Après — Vasque", description: "Meuble suspendu moderne" },
      { id: 6, image: convention6, title: "Après — Vue générale", description: "Harmonie des tons" },
    ],
  },
  {
    id: "paris10-jemmapes",
    title: "Salle de bain au masculin",
    location: "Paris 10ème - Canal Saint-Martin",
    description: "AVANT : Salle de bain classique et impersonnelle. APRÈS : Salle de bain au style résolument masculin avec carrelage foncé, robinetterie noire mate et lignes épurées. Paroi vitrée minimaliste pour un effet loft.",
    coverImage: jemmapes1,
    photos: [
      { id: 1, image: jemmapes1, title: "Après — Vue principale", description: "Ambiance masculine et moderne" },
      { id: 2, image: jemmapes2, title: "Après — Douche", description: "Paroi vitrée et carrelage foncé" },
      { id: 3, image: jemmapes3, title: "Après — Détails", description: "Finitions noires élégantes" },
    ],
  },
  {
    id: "paris10-dore",
    title: "Élégance dorée",
    location: "Paris 10ème",
    description: "AVANT : Salle de bain banale avec équipements standards. APRÈS : Salle de bain luxueuse avec robinetterie dorée laiton brossé, carrelage effet marbre onyx et finitions haut de gamme. Paroi vitrée à profilé doré et ciel de pluie encastré.",
    coverImage: gallery7,
    photos: [
      { id: 1, image: gallery7, title: "Après — Vue d'ensemble", description: "Paroi vitrée profilé laiton doré" },
      { id: 2, image: gallery8, title: "Après — Miroir ovale", description: "Encadrement laiton et éclairage LED" },
      { id: 3, image: gallery9, title: "Après — Robinetterie", description: "Laiton brossé doré" },
      { id: 4, image: gallery10, title: "Après — Ciel de pluie", description: "Douche de pluie plafond doré" },
    ],
  },
  {
    id: "paris17-pereire",
    title: "Les Ternes - Chevrons",
    location: "Paris 17ème - Bd Pereire",
    description: "AVANT : Salle de bain des années 80 avec carrelage dépassé. APRÈS : Rénovation complète avec carrelage chevrons blancs tendance, sol terrazzo gris et robinetterie chromée. Douche d'angle avec paroi vitrée et ciel de pluie.",
    coverImage: gallery11,
    photos: [
      { id: 1, image: gallery11, title: "Après — Chevrons blancs", description: "Carrelage mural tendance" },
      { id: 2, image: gallery12, title: "Après — Douche d'angle", description: "Paroi vitrée et ciel de pluie" },
      { id: 3, image: gallery13, title: "Après — Agencement", description: "Optimisation de l'espace" },
      { id: 4, image: gallery14, title: "Après — Colonne de douche", description: "Design chromé" },
      { id: 5, image: gallery15, title: "Après — Vasque", description: "Meuble suspendu blanc" },
      { id: 6, image: gallery16, title: "Après — Sol terrazzo", description: "Finition élégante" },
      { id: 7, image: gallery17, title: "Après — Robinetterie", description: "Mitigeur chromé design" },
    ],
  },
  {
    id: "saint-maur",
    title: "Rénovation Avant/Après",
    location: "Saint-Maur-des-Fossés",
    description: "AVANT : Salle de bain datée avec baignoire et carrelage ancien, espace mal exploité. APRÈS : Transformation complète en espace moderne avec douche à l'italienne, carrelage grand format contemporain et meuble vasque design.",
    coverImage: gallery18,
    photos: [
      { id: 1, image: gallery18, title: "Après — Carrelage", description: "Grand format contemporain" },
      { id: 2, image: gallery19, title: "Après — Paroi", description: "Verre fixe élégant" },
      { id: 3, image: gallery20, title: "Après — Vasque", description: "Meuble design" },
      { id: 4, image: gallery21, title: "Avant — État initial", description: "Baignoire datée" },
      { id: 5, image: gallery22, title: "Avant — Vue générale", description: "Salle de bain à rénover" },
      { id: 6, image: gallery23, title: "Avant — Détails", description: "Carrelage ancien" },
      { id: 7, image: gallery24, title: "Travaux — Rénovation", description: "Phase de transformation" },
      { id: 8, image: gallery25, title: "Après — Finitions", description: "Dernières touches" },
    ],
  },
  {
    id: "soisy-wc",
    title: "Rénovation WC Avant/Après",
    location: "Soisy-sous-Montmorency",
    description: "AVANT : WC vétuste et sans charme, espace négligé. APRÈS : Transformation en espace raffiné avec meuble rose terracotta sur-mesure, niche en chêne, carrelage mural losanges et sol carreaux de ciment graphiques. Robinetterie noire mate pour une touche contemporaine.",
    coverImage: soisy1,
    photos: [
      { id: 1, image: soisy1, title: "Après — Vue d'ensemble", description: "Meuble rose terracotta et niche chêne" },
      { id: 2, image: soisy2, title: "Après — Rangement ouvert", description: "Optimisation du rangement" },
      { id: 3, image: soisy3, title: "Après — Espace complet", description: "WC suspendu et lave-mains" },
      { id: 4, image: soisyAvant, title: "Avant — État initial", description: "WC vétuste à transformer" },
    ],
  },
  {
    id: "stgermain",
    title: "Relooking Salle de bain",
    location: "Paris 5ème - Boulevard Saint-Germain",
    description: "AVANT : Salle de bain haussmannienne défraîchie avec baignoire abîmée, carrelage daté et meuble vasque à moderniser. APRÈS : Relooking complet sans modification de disposition. Nouvelle baignoire, faïence zellige ton sur ton, carreaux de ciment au sol, meuble laqué bleu canard. Un vrai coup de frais !",
    coverImage: stgermain1,
    photos: [
      { id: 1, image: stgermain1, title: "Après — Double vasque", description: "Meuble laqué bleu canard et miroir" },
      { id: 2, image: stgermain2, title: "Après — Vue frontale", description: "Faïence zellige et carreaux de ciment" },
      { id: 3, image: stgermain3, title: "Après — Vue d'ensemble", description: "Nouvelle baignoire et sèche-serviettes" },
      { id: 4, image: stgermain4, title: "Après — Espace baignoire", description: "Faïence zellige ton sur ton" },
      { id: 5, image: stgermainAvant, title: "Avant — Baignoire", description: "Ancienne baignoire à remplacer" },
      { id: 6, image: stgermainAvant2, title: "Avant — Vue vasque", description: "Meuble existant à moderniser" },
      { id: 7, image: stgermainAvant3, title: "Avant — Vue générale", description: "État initial défraîchi" },
      { id: 8, image: stgermainAvant4, title: "Avant — Baignoire détail", description: "Tablier abîmé à refaire" },
    ],
  },
  {
    id: "faubourg-stdenis",
    title: "Élégance dorée",
    location: "Paris 10ème - Rue du Faubourg Saint-Denis",
    description: "AVANT : Combles inexploités et espace perdu. APRÈS : Création d'une salle de bain élégante sous combles. Carrelage effet marbre blanc, double vasque suspendue avec robinetterie dorée, paroi verrière noire et poutres apparentes. Un mariage réussi entre charme ancien et modernité.",
    coverImage: faubourgStmartin3,
    photos: [
      { id: 1, image: faubourgStmartin3, title: "Après — Double vasque", description: "Meuble suspendu et robinetterie dorée" },
      { id: 2, image: faubourgStmartin4, title: "Après — Détail robinetterie", description: "Double robinetterie dorée élégante" },
      { id: 3, image: faubourgStmartin1, title: "Après — Vue d'ensemble", description: "Douche et vasque sous combles" },
      { id: 4, image: faubourgStmartin6, title: "Après — Colonne de douche", description: "Robinetterie dorée effet marbre" },
      { id: 5, image: faubourgStmartin5, title: "Après — WC suspendu", description: "Poutres apparentes et effet marbre" },
      { id: 6, image: faubourgStmartin2, title: "Après — Vue globale", description: "Optimisation sous pente" },
      { id: 7, image: faubourgStmartin7, title: "Après — Détail douche", description: "Paroi noire et ciel de pluie doré" },
    ],
  },
  {
    id: "amiral-roussin",
    title: "Style scandinave",
    location: "Paris 15ème - Amiral Roussin",
    description: "AVANT : Salle de bain standard sans personnalité. APRÈS : Rénovation pour un jeune couple. Style scandinave épuré avec meuble vasque en chêne massif, robinetterie noire mate et receveur extra-plat. Buanderie intégrée dans le placard pour optimiser l'espace.",
    coverImage: amiralRoussin1,
    photos: [
      { id: 1, image: amiralRoussin1, title: "Après — Vue d'ensemble", description: "Douche et meuble chêne scandinave" },
      { id: 2, image: amiralRoussin3, title: "Après — Douche et vasque", description: "Robinetterie noire et paroi vitrée" },
      { id: 3, image: amiralRoussin5, title: "Après — Meuble vasque", description: "Chêne massif avec vasque bol" },
      { id: 4, image: amiralRoussin2, title: "Après — Détail vasque", description: "Robinet noir et plan bois" },
      { id: 5, image: amiralRoussin6, title: "Après — Vue générale", description: "Harmonie bois et blanc" },
      { id: 6, image: amiralRoussin4, title: "Après — Placard buanderie", description: "Buanderie intégrée" },
    ],
  },
  {
    id: "buffon",
    title: "Optimisation maximale",
    location: "Paris 5ème - Rue Buffon",
    description: "AVANT : Salle de bain vétuste et mal agencée, espace perdu et rangements insuffisants. APRÈS : Pied-à-terre parisien familial hyper optimisé. Receveur extra-plat avec deux niches encastrées, porte coulissante gain de place, lave-linge dissimulé derrière une porte. Astuce : le chauffe-eau est positionné dans la gaine technique au-dessus du WC suspendu — invisible et accessible.",
    coverImage: buffon1,
    photos: [
      { id: 1, image: buffon1, title: "Après — Vue d'ensemble", description: "Douche avec receveur extra-plat et deux niches" },
      { id: 2, image: buffon2, title: "Après — Vue générale", description: "WC suspendu et gaine technique" },
      { id: 3, image: buffon3, title: "Après — Gaine technique", description: "Chauffe-eau dissimulé au-dessus du WC" },
      { id: 4, image: buffon4, title: "Après — Meuble vasque", description: "Plan chêne et vasque bol épurée" },
      { id: 5, image: buffon5, title: "Après — Détail vasque", description: "Robinetterie chromée élégante" },
      { id: 6, image: buffon6, title: "Après — Niches encastrées", description: "Double niche dans la douche" },
      { id: 7, image: buffon7, title: "Après — Lave-linge", description: "Dissimulé derrière porte coulissante" },
      { id: 8, image: buffonAvant1, title: "Avant — Ancienne SDB", description: "Salle de bain vétuste à rénover" },
      { id: 9, image: buffonAvant2, title: "Avant — Vue d'ensemble", description: "Espace mal exploité" },
    ],
  },
  {
    id: "lauriston",
    title: "Matériaux belges & LED",
    location: "Paris 16ème - Rue Lauriston",
    description: "AVANT : Salle de bain avec baignoire, couleurs datées et manque de luminosité. APRÈS : Rénovation complète de salle de douche. Ambiance blanc et gris clair avec matériaux sélectionnés et livrés de Belgique. Double vasque à poser, faïence ondulée, frise galets naturels et niche LED intégrée dans la douche pour une atmosphère spa.",
    coverImage: lauriston1,
    photos: [
      { id: 1, image: lauriston1, title: "Après — Vue d'ensemble", description: "Double vasque et meuble suspendu blanc" },
      { id: 2, image: lauriston2, title: "Après — Perspective complète", description: "Douche, WC et fenêtre parisienne" },
      { id: 3, image: lauriston3, title: "Après — Douche LED", description: "Paroi vitrée et niche LED intégrée" },
      { id: 4, image: lauriston4, title: "Après — Double vasque", description: "Vasques à poser et frise galets naturels" },
      { id: 5, image: lauriston5, title: "Après — Niche LED", description: "Détail de la niche rétroéclairée" },
      { id: 6, image: lauristonAvant1, title: "Avant — Baignoire", description: "Ancienne salle de bain avec baignoire" },
      { id: 7, image: lauristonAvant2, title: "Avant — Vue d'ensemble", description: "Espace daté à transformer" },
    ],
  },
  {
    id: "citeaux",
    title: "Jaune & Gris",
    location: "Paris 12ème - Rue de Cîteaux",
    description: "AVANT : Salle de bain trop grande empiétant sur la cuisine, agencement inefficace. APRÈS : Partage intelligent de l'espace entre salle de bain et cuisine pour agrandir cette dernière. Ambiance jaune et gris pétillante, lave-linge sous plan, chauffe-eau intégré. Petit espace, grande optimisation.",
    coverImage: citeaux1,
    photos: [
      { id: 1, image: citeaux1, title: "Après — Vue d'ensemble", description: "Ambiance jaune et gris dynamique" },
      { id: 2, image: citeaux2, title: "Après — Douche", description: "Paroi vitrée et carrelage moderne" },
      { id: 3, image: citeaux3, title: "Après — Détails", description: "Finitions soignées et accessoires jaunes" },
      { id: 4, image: citeaux4, title: "Après — Vasque", description: "Meuble optimisé avec rangements" },
      { id: 5, image: citeauxAvant1, title: "Avant — Salle de bain", description: "Espace à reconfigurer" },
      { id: 6, image: citeauxAvant2, title: "Avant — Vue complète", description: "Agencement inefficace" },
    ],
  },
  {
    id: "boulogne",
    title: "Ambiance marine",
    location: "Boulogne-Billancourt",
    description: "AVANT : Chaudière apparente au milieu de la pièce, espace mal exploité et vétuste. APRÈS : Transformation complète pour cette mère célibataire et son enfant. Création d'un placard technique pour dissimuler la chaudière, grand meuble vasque avec double vasque, carrelage 3D blanc, tomettes hexagonales bleues au sol et fresque murale marine. Robinetterie dorée pour une touche d'élégance.",
    coverImage: boulogne1,
    photos: [
      { id: 1, image: boulogne1, title: "Après — Vue d'ensemble", description: "Baignoire 3D et tomettes bleues" },
      { id: 2, image: boulogne2, title: "Après — Double vasque", description: "Grand meuble avec robinetterie dorée" },
      { id: 3, image: boulogne3, title: "Après — Niches douche", description: "Carrelage 3D et niches bleues" },
      { id: 4, image: boulogne4, title: "Après — Détail carrelage", description: "Carrelage 3D blanc effet vague" },
      { id: 5, image: boulogne5, title: "Après — Miroir vasque", description: "Miroir LED et finitions dorées" },
      { id: 6, image: boulogne6, title: "Après — Vue baignoire", description: "Espace baignoire avec fresque marine" },
      { id: 7, image: boulogne7, title: "Après — Ambiance complète", description: "Harmonie bleu et blanc" },
      { id: 8, image: boulogne8, title: "Après — Rangements", description: "Optimisation du stockage" },
      { id: 9, image: boulogne9, title: "Après — Finitions", description: "Détails soignés" },
      { id: 10, image: boulogneAvant1, title: "Avant — Chaudière", description: "Chaudière apparente à dissimuler" },
      { id: 11, image: boulogneAvant2, title: "Avant — Vue générale", description: "Espace vétuste à transformer" },
      { id: 12, image: boulogneAvant3, title: "Avant — État initial", description: "Configuration d'origine" },
      { id: 13, image: boulogneTravaux1, title: "Travaux — Préparation", description: "Démolition et plomberie" },
      { id: 14, image: boulogneTravaux2, title: "Travaux — Installation", description: "Mise en place des équipements" },
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
    description: "Transformation d'une petite salle de bain en douche à l'italienne moderne. Chantier en cours — restez connecté pour découvrir cette transformation !",
    coverImage: butteschaumont1,
    isInProgress: true,
    photos: [
      { id: 1, image: butteschaumont8, title: "Douche terrazzo", description: "Carrelage terrazzo et robinetterie dorée" },
      { id: 2, image: butteschaumont9, title: "Vue d'ensemble", description: "Meuble vasque et paroi vitrée" },
      { id: 3, image: butteschaumont7, title: "Miroir LED", description: "Miroir rétroéclairé et faïence" },
      { id: 4, image: butteschaumont5, title: "Pose carrelage", description: "Terrazzo en cours de pose" },
      { id: 5, image: butteschaumont6, title: "Étanchéité Aquastop", description: "Weber Aquastop mur et sol (obligatoire)" },
      { id: 6, image: butteschaumont4, title: "Placo hydro + Aquastop", description: "Étanchéité Weber avant carrelage" },
      { id: 7, image: butteschaumont1, title: "État initial - Lavabo", description: "Avant travaux" },
      { id: 8, image: butteschaumont2, title: "État initial - Douche", description: "Cabine à remplacer" },
      { id: 9, image: butteschaumont3, title: "Vue générale", description: "Espace à transformer" },
    ],
  },
  {
    id: "taitbout",
    title: "Rénovation haussmannienne",
    location: "Paris 9ème - Rue Taitbout",
    description: "Rénovation d'une salle de bain dans un immeuble haussmannien. Chantier en cours — restez connecté pour découvrir cette transformation !",
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
    description: "Optimisation d'une petite salle de bain avec création d'une douche à l'italienne. Chantier en cours — restez connecté pour découvrir cette transformation !",
    coverImage: rocroy1,
    isInProgress: true,
    photos: [
      { id: 1, image: rocroy1, title: "État initial", description: "Avant démolition" },
      { id: 2, image: rocroy2, title: "Travaux", description: "En cours de rénovation" },
    ],
  },
  {
    id: "port-royal",
    title: "Rénovation complète",
    location: "Paris - Bld de Port-Royal",
    description: "Transformation d'une salle de bain années 70 avec mosaïque bleue. Création d'une douche à l'italienne et rénovation des WC. Chantier en cours — restez connecté pour découvrir cette transformation !",
    coverImage: portRoyal1,
    isInProgress: true,
    photos: [
      { id: 1, image: portRoyal1, title: "Pose du carrelage", description: "Faïence format métro en cours" },
      { id: 2, image: portRoyalAvant1, title: "Avant - Salle de bain", description: "Mosaïque bleue d'origine" },
      { id: 3, image: portRoyalAvant2, title: "Avant - WC", description: "WC à rénover" },
    ],
  },
  {
    id: "la-tour",
    title: "Restructuration complète",
    location: "Paris 16ème - Rue de la Tour",
    description: "Projet ambitieux de restructuration : démolition de la salle de bain existante pour agrandir la cuisine. Création d'une nouvelle salle de douche et WC au fond de l'appartement, en exploitant la colonne d'évacuation. Chantier en cours — restez connecté pour découvrir cette transformation !",
    coverImage: laTourAvant4,
    isInProgress: true,
    photos: [
      { id: 1, image: laTourAvant4, title: "Avant - Vue douche", description: "Colonne de douche existante" },
      { id: 2, image: laTourAvant3, title: "Avant - Vue générale", description: "Rangements et vasque" },
      { id: 3, image: laTourAvant1, title: "Avant - Vasque", description: "Vasque marbre et sèche-serviettes" },
      { id: 4, image: laTourAvant2, title: "Avant - Détail", description: "Aménagement existant" },
      { id: 5, image: laTourAvant5, title: "Avant - WC", description: "WC suspendu à rénover" },
    ],
  },
];

// Positions des chantiers sur la carte de Paris
const projectLocations: ProjectLocation[] = [
  { id: "buttes-chaumont", name: "Buttes-Chaumont", area: "19ème", x: 68, y: 25 },
  { id: "taitbout", name: "Rue Taitbout", area: "9ème", x: 48, y: 38 },
  { id: "rocroy", name: "Rue de Rocroy", area: "10ème", x: 55, y: 32 },
  { id: "port-royal", name: "Port-Royal", area: "5ème", x: 48, y: 60 },
  { id: "la-tour", name: "Rue de la Tour", area: "16ème", x: 25, y: 45 },
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
