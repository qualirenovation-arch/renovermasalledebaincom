import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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

// Saint-Maur Enfants
import stMaurEnfants1 from "@/assets/st-maur-enfants-1.jpg";
import stMaurEnfants2 from "@/assets/st-maur-enfants-2.jpg";
import stMaurEnfants3 from "@/assets/st-maur-enfants-3.jpg";
import stMaurEnfants4 from "@/assets/st-maur-enfants-4.jpg";
import stMaurEnfantsAvant1 from "@/assets/st-maur-enfants-avant-1.jpg";

// Paris 17ème Suite Parentale - AVANT
import paris17Avant1 from "@/assets/paris17-1.jpg";
import paris17Avant2 from "@/assets/paris17-2.jpg";
import paris17Avant3 from "@/assets/paris17-3.jpg";
import paris17Avant4 from "@/assets/paris17-4.jpg";
import paris17Avant5 from "@/assets/paris17-5.jpg";
import paris17Avant6 from "@/assets/paris17-6.jpg";
import paris17Avant7 from "@/assets/paris17-7.jpg";
import paris17Avant8 from "@/assets/paris17-8.jpg";
// Paris 17ème Suite Parentale - APRÈS
import suiteParentaleCover from "@/assets/suite-parentale-cover.png";
import suiteParentale1 from "@/assets/suite-parentale-1.jpg";
import suiteParentale2 from "@/assets/suite-parentale-2.jpg";
import suiteParentale3 from "@/assets/suite-parentale-3.jpg";
import suiteParentale4 from "@/assets/suite-parentale-4.jpg";
import suiteParentale5 from "@/assets/suite-parentale-5.jpg";

// Paris 15ème Convention
import convention1 from "@/assets/courbevoie-1.jpg";
import convention2 from "@/assets/courbevoie-2.jpg";
import convention3 from "@/assets/courbevoie-3.jpg";
import convention4 from "@/assets/courbevoie-4.jpg";
import convention5 from "@/assets/courbevoie-5.jpg";
import convention6 from "@/assets/courbevoie-6.jpg";

// Paris 11ème Charonne - Bastille
import charonne1 from "@/assets/charonne-1.jpg";
import charonne2 from "@/assets/charonne-2.jpg";
import charonneAvant1 from "@/assets/charonne-avant-1.jpg";
import charonneAvant2 from "@/assets/charonne-avant-2.jpg";
import charonneAvant3 from "@/assets/charonne-avant-3.jpg";
import charonneAvant4 from "@/assets/charonne-avant-4.jpg";
const charonneVideo1 = "/videos/charonne-1.mp4";

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
import vincennesMrAvant1 from "@/assets/vincennes-mr-avant-1.jpg";
import vincennesMrAvant2 from "@/assets/vincennes-mr-avant-2.jpg";
import vincennesMrAvant3 from "@/assets/vincennes-mr-avant-3.jpg";
import vincennesMrAvant4 from "@/assets/vincennes-mr-avant-4.jpg";
import vincennesMrAvant5 from "@/assets/vincennes-mr-avant-5.jpg";
import vincennesMrAvant6 from "@/assets/vincennes-mr-avant-6.jpg";
import vincennesMrAvant7 from "@/assets/vincennes-mr-avant-7.jpg";
import vincennesMrAvant8 from "@/assets/vincennes-mr-avant-8.jpg";
import vincennesMrAvant9 from "@/assets/vincennes-mr-avant-9.jpg";

// WC Cours de Vincennes
import coursVincennesWc1 from "@/assets/cours-vincennes-wc-1.jpg";
import coursVincennesWc2 from "@/assets/cours-vincennes-wc-2.jpg";
import coursVincennesWc3 from "@/assets/cours-vincennes-wc-3.jpg";
import coursVincennesWcAvant1 from "@/assets/cours-vincennes-wc-avant-1.jpg";
const coursVincennesWcVideo1 = "/videos/cours-vincennes-wc-1.mp4";

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
import taitbout5 from "@/assets/taitbout-5.jpg";
import taitbout6 from "@/assets/taitbout-6.jpg";
import taitbout7 from "@/assets/taitbout-7.jpg";
import taitbout8 from "@/assets/taitbout-8.jpg";
import taitbout8_2 from "@/assets/taitbout-8-2.jpg";
import taitbout9 from "@/assets/taitbout-9.jpg";
import taitbout10 from "@/assets/taitbout-10.jpg";
import taitbout11 from "@/assets/taitbout-11.jpg";
import taitbout12 from "@/assets/taitbout-12.jpg";
import rocroy1 from "@/assets/rocroy-1.jpg";
import rocroy2 from "@/assets/rocroy-2.jpg";

// Nicolas Roret Paris 13
import nicolasRoret1 from "@/assets/nicolas-roret-1.jpg";
import nicolasRoret2 from "@/assets/nicolas-roret-2.jpg";
import nicolasRoret3 from "@/assets/nicolas-roret-3.jpg";
import nicolasRoret4 from "@/assets/nicolas-roret-4.jpg";
import nicolasRoret5 from "@/assets/nicolas-roret-5.jpg";
import nicolasRoret6 from "@/assets/nicolas-roret-6.jpg";
import nicolasRoret7 from "@/assets/nicolas-roret-7.jpg";
import nicolasRoret8 from "@/assets/nicolas-roret-8.jpg";
import nicolasRoret9 from "@/assets/nicolas-roret-9.jpg";
import nicolasRoret10 from "@/assets/nicolas-roret-10.jpg";
import nicolasRoret11 from "@/assets/nicolas-roret-11.jpg";
import nicolasRoret12 from "@/assets/nicolas-roret-12.jpg";
import nicolasRoretAvant1 from "@/assets/nicolas-roret-avant-1.jpg";
import nicolasRoretTravaux1 from "@/assets/nicolas-roret-travaux-1.jpg";
import nicolasRoret3d1 from "@/assets/nicolas-roret-3d-1.jpg";
import nicolasRoret3d2 from "@/assets/nicolas-roret-3d-2.jpg";

// Soisy-sous-Montmorency WC
import soisy1 from "@/assets/soisy-1.jpg";
import soisy2 from "@/assets/soisy-2.jpg";
import soisy3 from "@/assets/soisy-3.jpg";
import soisyAvant from "@/assets/soisy-avant.jpg";
// Soisy-sous-Montmorency SDB Parentale 1er étage
import soisySdb1 from "@/assets/soisy-sdb-1.jpg";
import soisySdb2 from "@/assets/soisy-sdb-2.jpg";
import soisySdb3 from "@/assets/soisy-sdb-3.jpg";
import soisySdb4 from "@/assets/soisy-sdb-4.jpg";
import soisySdb5 from "@/assets/soisy-sdb-5.jpg";
import soisySdbAvant from "@/assets/soisy-sdb-avant.jpg";
import soisySdbAvant2 from "@/assets/soisy-sdb-avant-2.jpg";
import soisySdbAvant3 from "@/assets/soisy-sdb-avant-3.jpg";
// Soisy-sous-Montmorency SDB Enfants 2ème étage
import soisyEnfants1 from "@/assets/soisy-enfants-1.jpg";
import soisyEnfants2 from "@/assets/soisy-enfants-2.jpg";
import soisyEnfants3 from "@/assets/soisy-enfants-3.jpg";
import soisyEnfants4 from "@/assets/soisy-enfants-4.jpg";
import soisyEnfants5 from "@/assets/soisy-enfants-5.jpg";
import soisyEnfantsAvant1 from "@/assets/soisy-enfants-avant-1.jpg";
import soisyEnfantsAvant2 from "@/assets/soisy-enfants-avant-2.jpg";

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
import amiralRoussinAvant1 from "@/assets/amiral-roussin-avant-1.jpg";
import amiralRoussinAvant2 from "@/assets/amiral-roussin-avant-2.jpg";
import amiralRoussinAvant3 from "@/assets/amiral-roussin-avant-3.jpg";

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
import boulogne10 from "@/assets/boulogne-10.jpg";
import boulogne11 from "@/assets/boulogne-11.jpg";
import boulogne12 from "@/assets/boulogne-12.jpg";
import boulogne13 from "@/assets/boulogne-13.jpg";
import boulogne14 from "@/assets/boulogne-14.jpg";
import boulogneAvant1 from "@/assets/boulogne-avant-1.jpg";
import boulogneAvant2 from "@/assets/boulogne-avant-2.jpg";
import boulogneAvant3 from "@/assets/boulogne-avant-3.jpg";
import boulogneAvant4 from "@/assets/boulogne-avant-4.jpg";
import boulogneTravaux1 from "@/assets/boulogne-travaux-1.jpg";
import boulogneTravaux2 from "@/assets/boulogne-travaux-2.jpg";

// Auteuil Paris 16ème
import auteuil1 from "@/assets/auteuil-1.jpg";
import auteuil2 from "@/assets/auteuil-2.jpg";
import auteuil3 from "@/assets/auteuil-3.jpg";
import auteuil4 from "@/assets/auteuil-4.jpg";
import auteuil5 from "@/assets/auteuil-5.jpg";
import auteuil6 from "@/assets/auteuil-6.jpg";
import auteuil7 from "@/assets/auteuil-7.jpg";
import auteuilAvant1 from "@/assets/auteuil-avant-1.jpg";

// Courbevoie 92 - Saint-Guillaume (dégât des eaux)
import courbevoieStGuillaumeAvant1 from "@/assets/courbevoie-avant-1.jpg";
import courbevoieStGuillaumeAvant2 from "@/assets/courbevoie-avant-2.jpg";
import courbevoieStGuillaumeAvant3 from "@/assets/courbevoie-avant-3.jpg";
import courbevoieStGuillaume7 from "@/assets/courbevoie-7.jpg";
import courbevoieStGuillaume8 from "@/assets/courbevoie-8.jpg";
import courbevoieStGuillaume9 from "@/assets/courbevoie-9.jpg";
import courbevoieStGuillaume10 from "@/assets/courbevoie-10.jpg";
import courbevoieStGuillaume11 from "@/assets/courbevoie-11.jpg";
import courbevoieStGuillaumeTravaux1 from "@/assets/courbevoie-travaux-1.jpg";
import courbevoieStGuillaumeTravaux2 from "@/assets/courbevoie-travaux-2.jpg";

// Courbevoie 92 - Lalyre
import courbevoieLalyreAvant1 from "@/assets/courbevoie-lalyre-avant-1.jpg";

// Suresnes 92 - Rue du Puits
import rueDesPuits1 from "@/assets/rue-des-puits-1.jpg";
import rueDesPuits2 from "@/assets/rue-des-puits-2.jpg";
import rueDesPuits3 from "@/assets/rue-des-puits-3.jpg";
import rueDesPuits4 from "@/assets/rue-des-puits-4.jpg";
import rueDesPuits5 from "@/assets/rue-des-puits-5.jpg";
import rueDesPuits6 from "@/assets/rue-des-puits-6.jpg";
import rueDesPuits7 from "@/assets/rue-des-puits-7.jpg";
import rueDesPuits8 from "@/assets/rue-des-puits-8.jpg";
import rueDesPuits9 from "@/assets/rue-des-puits-9.jpg";
import rueDesPuits10 from "@/assets/rue-des-puits-10.jpg";
import rueDesPuitsAvant1 from "@/assets/rue-des-puits-avant-1.jpg";
import rueDesPuitsAvant2 from "@/assets/rue-des-puits-avant-2.jpg";
import rueDesPuitsAvant3 from "@/assets/rue-des-puits-avant-3.jpg";
import rueDesPuitsAvant4 from "@/assets/rue-des-puits-avant-4.jpg";

// Vitry-sur-Seine 94
import vitryAvant1 from "@/assets/vitry-avant-1.jpg";
import vitryAvant2 from "@/assets/vitry-avant-2.jpg";
import vitryAvant3 from "@/assets/vitry-avant-3.jpg";
import vitryAvant4 from "@/assets/vitry-avant-4.jpg";
import vitryAvant5 from "@/assets/vitry-avant-5.jpg";
import vitryAvant6 from "@/assets/vitry-avant-6.jpg";
import vitryAvant7 from "@/assets/vitry-avant-7.jpg";
import vitryAvant8 from "@/assets/vitry-avant-8.jpg";
import vitryAvant9 from "@/assets/vitry-avant-9.jpg";
import vitryAvant10 from "@/assets/vitry-avant-10.jpg";
import vitryApres1 from "@/assets/vitry-apres-1.jpg";
import vitryApres2 from "@/assets/vitry-apres-2.jpg";
import vitryApres3 from "@/assets/vitry-apres-3.jpg";
import vitryApres4 from "@/assets/vitry-apres-4.jpg";

// Rue du Temple Paris 3ème
import temple1 from "@/assets/temple-1.jpg";
import temple2 from "@/assets/temple-2.jpg";
import temple3 from "@/assets/temple-3.jpg";
import temple4 from "@/assets/temple-4.jpg";
import templeAvant1 from "@/assets/temple-avant-1.jpg";
import templeAvant2 from "@/assets/temple-avant-2.jpg";

// Pierre Guérin Paris 16ème
import pierreGuerin1 from "@/assets/pierre-guerin-1.jpg";
import pierreGuerin2 from "@/assets/pierre-guerin-2.jpg";
import pierreGuerin3 from "@/assets/pierre-guerin-3.jpg";
import pierreGuerin4 from "@/assets/pierre-guerin-4.jpg";
import pierreGuerin5 from "@/assets/pierre-guerin-5.jpg";

// Saint-Ouen (93)
import stOuen1 from "@/assets/st-ouen-1.jpg";
import stOuen2 from "@/assets/st-ouen-2.jpg";
import stOuen3 from "@/assets/st-ouen-3.jpg";
import stOuen4 from "@/assets/st-ouen-4.jpg";
import stOuen5 from "@/assets/st-ouen-5.jpg";
import stOuen6 from "@/assets/st-ouen-6.jpg";
import stOuen7 from "@/assets/st-ouen-7.jpg";
import stOuenAvant1 from "@/assets/st-ouen-avant-1.jpg";
import stOuenAvant2 from "@/assets/st-ouen-avant-2.jpg";

// Saint-Mandé (94)
import stMande1 from "@/assets/st-mande-1.jpg";
import stMande2 from "@/assets/st-mande-2.jpg";
import stMande3 from "@/assets/st-mande-3.jpg";

// Avenue Matignon Paris 8ème
import matignon1 from "@/assets/matignon-1.jpg";
import matignon2 from "@/assets/matignon-2.jpg";
import matignon3 from "@/assets/matignon-3.jpg";
import matignon4 from "@/assets/matignon-4.jpg";
import matignonAvant1 from "@/assets/matignon-avant-1.jpg";
import matignonAvant2 from "@/assets/matignon-avant-2.jpg";
import matignonAvant3 from "@/assets/matignon-avant-3.jpg";
import matignonAvant4 from "@/assets/matignon-avant-4.jpg";

// Bobillot Paris 13ème
import bobillot1 from "@/assets/bobillot-1.jpg";
import bobillot2 from "@/assets/bobillot-2.jpg";
import bobillotAvant1 from "@/assets/bobillot-avant-1.jpg";
import bobillotAvant2 from "@/assets/bobillot-avant-2.jpg";
import bobillotAvant3 from "@/assets/bobillot-avant-3.jpg";

// Cours de Vincennes Paris 12ème - SDB
import coursVincennesSdb1 from "@/assets/cours-vincennes-sdb-1.jpg";
import coursVincennesSdb2 from "@/assets/cours-vincennes-sdb-2.jpg";
import coursVincennesSdb3 from "@/assets/cours-vincennes-sdb-3.jpg";
import coursVincennesSdb4 from "@/assets/cours-vincennes-sdb-4.jpg";
import coursVincennesSdb5 from "@/assets/cours-vincennes-sdb-5.jpg";
import coursVincennesSdbAvant1 from "@/assets/cours-vincennes-sdb-avant-1.jpg";
import coursVincennesSdbAvant2 from "@/assets/cours-vincennes-sdb-avant-2.jpg";
import coursVincennesWcAvant2 from "@/assets/cours-vincennes-wc-avant-2.jpg";

// Cours de Vincennes Paris 12ème - SDB Madame
import coursVincennesMadame1 from "@/assets/cours-vincennes-madame-1.jpg";
import coursVincennesMadame2 from "@/assets/cours-vincennes-madame-2.jpg";
import coursVincennesMadame3 from "@/assets/cours-vincennes-madame-3.jpg";
import coursVincennesMadame4 from "@/assets/cours-vincennes-madame-4.jpg";
import coursVincennesMadame5 from "@/assets/cours-vincennes-madame-5.jpg";
import coursVincennesMadameAvant1 from "@/assets/cours-vincennes-madame-avant-1.jpg";
import coursVincennesMadameAvant2 from "@/assets/cours-vincennes-madame-avant-2.jpg";
import coursVincennesMadameAvant3 from "@/assets/cours-vincennes-madame-avant-3.jpg";

// Charenton-le-Pont (94)
import charenton1 from "@/assets/charenton-1.jpg";
import charenton2 from "@/assets/charenton-2.jpg";
import charenton3 from "@/assets/charenton-3.jpg";
import charenton4 from "@/assets/charenton-4.jpg";
import charenton5 from "@/assets/charenton-5.jpg";
import charenton6 from "@/assets/charenton-6.jpg";
import charenton7 from "@/assets/charenton-7.jpg";
import charenton8 from "@/assets/charenton-8.jpg";
import charenton9 from "@/assets/charenton-9.jpg";
import charenton10 from "@/assets/charenton-10.jpg";
import charenton11 from "@/assets/charenton-11.jpg";
import charenton12 from "@/assets/charenton-12.jpg";
import charenton13 from "@/assets/charenton-13.jpg";
import charenton14 from "@/assets/charenton-14.jpg";
import charenton15 from "@/assets/charenton-15.jpg";
import charenton16 from "@/assets/charenton-16.jpg";
import charenton17 from "@/assets/charenton-17.jpg";
import charenton18 from "@/assets/charenton-18.jpg";
import charenton19 from "@/assets/charenton-19.jpg";
import charentonAvant5 from "@/assets/charenton-avant-5.jpg";
import charentonAvant6 from "@/assets/charenton-avant-6.jpg";
import charentonAvant7 from "@/assets/charenton-avant-7.jpg";
import charentonAvant8 from "@/assets/charenton-avant-8.jpg";

// Charenton-le-Pont - Général Leclerc
import generalLeclerc1 from "@/assets/general-leclerc-1.jpg";
import generalLeclerc2 from "@/assets/general-leclerc-2.jpg";
import generalLeclerc3 from "@/assets/general-leclerc-3.jpg";
import generalLeclerc4 from "@/assets/general-leclerc-4.jpg";
import generalLeclerc5 from "@/assets/general-leclerc-5.jpg";
import generalLeclerc6 from "@/assets/general-leclerc-6.jpg";
import generalLeclerc7 from "@/assets/general-leclerc-7.jpg";
import generalLeclerc8 from "@/assets/general-leclerc-8.jpg";
import generalLeclercSchluter1 from "@/assets/general-leclerc-schluter-1.jpg";
import generalLeclercSchluter2 from "@/assets/general-leclerc-schluter-2.jpg";
import generalLeclercSchluter3 from "@/assets/general-leclerc-schluter-3.jpg";
import generalLeclercWc1 from "@/assets/general-leclerc-wc-1.jpg";
import generalLeclercWc2 from "@/assets/general-leclerc-wc-2.jpg";
import generalLeclercWcTravaux1 from "@/assets/general-leclerc-wc-travaux-1.jpg";

interface Photo {
  id: number;
  image: string;
  title: string;
  description: string;
  isVideo?: boolean;
}

interface Review {
  text: string;
  author: string;
  link: string;
}

interface Album {
  id: string;
  title: string;
  location: string;
  description: string;
  coverImage: string;
  photos: Photo[];
  isInProgress?: boolean;
  review?: Review;
  instagramLink?: string;
  instagramLinks?: string[];
}

// Albums classés par code postal (Paris 3ème → 17ème, puis banlieue 92 → 93 → 94 → 95)
const albums: Album[] = [
  // ========== PARIS 3ÈME (75003) ==========
  {
    id: "temple",
    title: "Style masculin — Bois & Noir",
    location: "Paris 3ème - Rue du Temple",
    description: "AVANT : Salle de bain vétuste avec baignoire, lavabo sur pied et carrelage blanc/bleu dégradé. APRÈS : Transformation complète pour un appartement au masculin. Douche à l'italienne avec receveur extra-plat et paroi fixe noire, meuble vasque en bois clair avec plan blanc, robinetterie noire mate, miroir rond LED. Lave-linge intégré sous le plan vasque. WC suspendu avec chauffe-eau dissimulé dans le placard au-dessus.",
    coverImage: temple1,
    photos: [
      { id: 1, image: temple1, title: "Après — Vue d'ensemble", description: "Douche à l'italienne, paroi fixe noire et meuble bois" },
      { id: 2, image: temple2, title: "Après — Détail vasque", description: "Meuble bois clair, vasque à poser et miroir rond LED" },
      { id: 3, image: temple3, title: "Après — WC suspendu", description: "Chauffe-eau dissimulé dans le placard" },
      { id: 4, image: temple4, title: "Après — Lave-linge intégré", description: "Machine à laver sous le plan vasque" },
      { id: 5, image: templeAvant1, title: "Avant — Salle de bain", description: "Baignoire et lavabo sur pied vétustes" },
      { id: 6, image: templeAvant2, title: "Avant — Vue rangements", description: "Anciens placards et carrelage bleu" },
    ],
  },
  // ========== PARIS 5ÈME (75005) ==========
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
  // ========== PARIS 8ÈME (75008) ==========
  {
    id: "matignon",
    title: "Rafraîchissement entre deux locations",
    location: "Paris 8ème - Avenue Matignon",
    description: "AVANT : Salle de bain dans son jus avec baignoire et vasque roses, carrelage marbre vieillot et papier peint daté. APRÈS : Transformation complète en espace épuré et moderne. Carrelage effet marbre grand format, douche à l'italienne avec robinetterie Grohe encastrée, double vasque contemporaine et WC suspendu.",
    coverImage: matignon1,
    instagramLink: "DEc8OANsV-j",
    photos: [
      { id: 1, image: matignon1, title: "Après — Vue d'ensemble", description: "Douche, WC suspendu et sèche-serviettes" },
      { id: 2, image: matignon2, title: "Après — WC suspendu", description: "Étagères en verre et effet marbre" },
      { id: 3, image: matignon3, title: "Après — Douche Grohe", description: "Robinetterie encastrée et niche de rangement" },
      { id: 4, image: matignon4, title: "Après — Double vasque", description: "Meuble 3D blanc et robinetterie chromée" },
      { id: 5, image: matignonAvant1, title: "Avant — Chambre vers SDB", description: "Vue depuis la chambre sur la salle de bain rose" },
      { id: 6, image: matignonAvant2, title: "Avant — Vue d'ensemble", description: "Salle de bain avec baignoire rose" },
      { id: 7, image: matignonAvant3, title: "Avant — Baignoire rose", description: "Vasque et baignoire roses datées" },
      { id: 8, image: matignonAvant4, title: "Avant — Détail", description: "Carrelage marbre et équipements vétustes" },
    ],
  },
  // ========== PARIS 9ÈME (75009) ==========
  {
    id: "taitbout",
    title: "Rénovation haussmannienne",
    location: "Paris 9ème - Rue Taitbout",
    description: "AVANT : Salle de bain classique dans un immeuble haussmannien avec baignoire et équipements datés. APRÈS : Transformation élégante en douche à l'italienne avec receveur extra-plat, paroi vitrée, carrelage contemporain et robinetterie moderne. Optimisation de l'espace pour un résultat lumineux et fonctionnel.",
    coverImage: taitbout5,
    photos: [
      { id: 1, image: taitbout5, title: "Après — Vue douche", description: "Douche à l'italienne avec paroi vitrée" },
      { id: 2, image: taitbout6, title: "Après — Vue d'ensemble", description: "Salle de bain rénovée" },
      { id: 3, image: taitbout7, title: "Après — Détails", description: "Finitions modernes" },
      { id: 4, image: taitbout8, title: "Après — Carrelage", description: "Carrelage grand format" },
      { id: 5, image: taitbout8_2, title: "Après — Vue vasque", description: "Meuble vasque moderne" },
      { id: 6, image: taitbout9, title: "Après — WC", description: "WC suspendu" },
      { id: 7, image: taitbout10, title: "Après — Robinetterie", description: "Colonne de douche" },
      { id: 8, image: taitbout11, title: "Après — Accessoires", description: "Détails et rangements" },
      { id: 9, image: taitbout12, title: "Après — Ensemble", description: "Vue finale de la pièce" },
      { id: 10, image: taitbout1, title: "Avant — Vue initiale", description: "Salle de bain avant travaux" },
      { id: 11, image: taitbout2, title: "Avant — Baignoire", description: "Baignoire à transformer" },
      { id: 12, image: taitbout3, title: "Avant — Vue d'ensemble", description: "État des lieux initial" },
    ],
  },
  // ========== PARIS 10ÈME (75010) ==========
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
    location: "Paris 10ème - Faubourg Saint-Denis",
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
    id: "faubourg-stdenis",
    title: "Élégance dorée",
    location: "Paris 10ème - Rue du Faubourg Saint-Denis",
    description: "AVANT : Combles inexploités et espace perdu. APRÈS : Création d'une salle de bain élégante sous combles. Carrelage effet marbre blanc, double vasque suspendue avec robinetterie dorée, paroi verrière noire et poutres apparentes. Un mariage réussi entre charme ancien et modernité.",
    coverImage: faubourgStmartin3,
    instagramLink: "https://www.instagram.com/reel/DNQDsKnojLb/",
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
  // ========== PARIS 11ÈME (75011) ==========
  {
    id: "charonne",
    title: "Black & White — Robinetterie Rétro",
    location: "Paris 11ème - Rue de Charonne (Bastille)",
    description: "AVANT : Salle de bain datée avec carrelage blanc, cabine de douche et vasque en bois usée. APRÈS : Transformation spectaculaire pour ce pied-à-terre parisien. Carreaux fleuris inspiration carreaux de ciment (Neocim) au sol, métro noir mat et brillant aux murs avec pose en chevrons dans la douche et à l'anglaise côté vasque, séparation marquée par un profilé laiton. Lavabo colonne rétro et robinetterie dorée vintage. Papier peint nuages pour une atmosphère hôtel boutique. **Projet réalisé à distance** : le client avait préparé tous les rendus souhaités, nous avons respecté le cahier des charges à la lettre.",
    coverImage: charonne1,
    photos: [
      { id: 1, image: charonneVideo1, title: "Vidéo — Visite virtuelle", description: "Découvrez la transformation complète", isVideo: true },
      { id: 2, image: charonne1, title: "Après — Vue chambre", description: "Douche ouverte sur la chambre, style hôtel boutique" },
      { id: 3, image: charonne2, title: "Après — Salle de douche", description: "Métro noir brillant en chevrons, profilé laiton, robinetterie rétro" },
      { id: 4, image: charonneAvant1, title: "Avant — Salle de bain", description: "Cabine de douche et vasque bois à remplacer" },
      { id: 5, image: charonneAvant2, title: "Avant — Chambre", description: "État initial de la chambre" },
      { id: 6, image: charonneAvant3, title: "Avant — WC", description: "WC encombré à rénover" },
      { id: 7, image: charonneAvant4, title: "Avant — WC angle", description: "Carrelage daté" },
    ],
  },
  {
    id: "citeaux",
    title: "Salle d'eau de 3m²",
    location: "Paris 11ème - Rue de Citeaux (Bastille)",
    description: "AVANT : Une salle de bain compacte avec une baignoire occupant tout l'espace, zéro rangement et une sensation d'étouffement. APRÈS : Transformation totale de 3m² seulement ! Douche italienne avec receveur extra-plat Le Monde du Bain, paroi fixe Black Style, meuble vasque suspendu gain de place et robinetterie noire. Carrelage grand format clair pour agrandir visuellement l'espace. La preuve qu'un petit espace peut devenir fonctionnel et élégant.",
    coverImage: citeaux1,
    photos: [
      { id: 1, image: citeaux1, title: "Après — Vue d'ensemble", description: "Douche italienne et paroi Black Style" },
      { id: 2, image: citeaux2, title: "Après — Détail douche", description: "Receveur extra-plat et robinetterie noire" },
      { id: 3, image: citeaux3, title: "Après — Paroi vitrée", description: "Paroi fixe pour agrandir l'espace" },
      { id: 4, image: citeaux4, title: "Après — Vasque", description: "Meuble optimisé avec rangements" },
      { id: 5, image: citeauxAvant1, title: "Avant — Salle de bain", description: "Espace à reconfigurer" },
      { id: 6, image: citeauxAvant2, title: "Avant — Vue complète", description: "Agencement inefficace" },
    ],
  },
  // ========== PARIS 12ÈME (75012) ==========
  {
    id: "vincennes-mr",
    title: "Salle de bain Monsieur",
    location: "Paris 12ème - Cours de Vincennes",
    description: "AVANT : Une buanderie sans rangement dédié à la toilette — un simple receveur posé, des éclaboussures permanentes, aucune ergonomie, aucun design. APRÈS : Salle de bain masculine haut de gamme. Plan Corian blanc, meuble sur-mesure Noyer de Bourgogne, miroir AICA. Paroi verrière Asealia Twenty Noir, robinetterie MaSalleDeBain.com. Buanderie et table à repasser dissimulées dans une colonne sur-mesure.",
    coverImage: vincennesMr1,
    review: {
      text: "Dès notre premier rendez-vous, Carina a su écouter nos besoins et adapter les aménagements. Elle a joué un rôle clé en gérant toutes les commandes et en coordonnant les équipes. Les délais ont été rigoureusement respectés. Son expertise et son professionnalisme ont été exemplaires tout au long du projet.",
      author: "Jean Claude et Claire",
      link: "https://www.houzz.fr/viewReview/2051925/qualirenovation-by-qualiconcept-review"
    },
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
      { id: 13, image: vincennesMrAvant1, title: "Avant — Entrée salle de bain", description: "État initial avec séchoir et encombrement" },
      { id: 14, image: vincennesMrAvant2, title: "Avant — Vue vers couloir", description: "Douche existante et aménagement provisoire" },
      { id: 15, image: vincennesMrAvant3, title: "Avant — Espace vasque", description: "Meuble et fenêtre côté vasque" },
      { id: 16, image: vincennesMrAvant4, title: "Avant — Douche existante", description: "Colonne de douche et paroi vitrée" },
      { id: 17, image: vincennesMrAvant5, title: "Avant — Vue HD douche", description: "Salle de bain à rénover" },
      { id: 18, image: vincennesMrAvant6, title: "Avant — Espace douche complet", description: "Aménagement existant" },
      { id: 19, image: vincennesMrAvant7, title: "Avant — Sèche-linge intégré", description: "Colonne buanderie d'origine" },
      { id: 20, image: vincennesMrAvant8, title: "Avant — Douche et rangements", description: "Configuration initiale" },
      { id: 21, image: vincennesMrAvant9, title: "Avant — Vue d'ensemble", description: "Lave-linge et vasque existants" },
    ],
  },
  {
    id: "cours-vincennes-wc",
    title: "WC — Lave-mains Design & Marbre Onyx",
    location: "Paris 12ème - Cours de Vincennes",
    description: "AVANT : Un WC basique sans lave-mains, obligeant les invités à entrer dans la salle de bain, avec une VMC visible sur le mur au-dessus du placard. APRÈS : Un espace WC autonome et très fonctionnel. Le plus : l'intégration d'un lave-mains design avec rangement sur-mesure à gauche, permettant aux invités de se laver les mains sans passer par la salle de bain. L'astuce technique : la bouche de VMC a été déplacée dans le faux plafond, ce qui a permis de créer un placard plus grand au-dessus du WC sans sacrifier la ventilation. L'ensemble est habillé de marbre onyx du sol au plafond pour une esthétique luxueuse. Résultat : un espace pratique, élégant et totalement indépendant.",
    coverImage: coursVincennesWc1,
    photos: [
      { id: 1, image: coursVincennesWcVideo1, title: "Vidéo — Visite", description: "Découvrez l'aménagement optimisé", isVideo: true },
      { id: 2, image: coursVincennesWc1, title: "Après — Vue d'ensemble", description: "WC suspendu, niche ouverte et placard marbre onyx" },
      { id: 3, image: coursVincennesWc2, title: "Après — Rangement latéral", description: "Lave-mains et rangement à gauche" },
      { id: 4, image: coursVincennesWc3, title: "Après — Placard ouvert", description: "Espace de stockage au-dessus du WC" },
      { id: 5, image: coursVincennesWcAvant1, title: "Avant — État initial", description: "WC à rénover et optimiser" },
      { id: 6, image: coursVincennesWcAvant2, title: "Avant — WC d'origine", description: "Placard existant et WC suspendu avant transformation" },
    ],
  },
  {
    id: "cours-vincennes-sdb",
    title: "SDB — Design Noir & Blanc Style Métro",
    location: "Paris 12ème - Cours de Vincennes",
    description: "AVANT : Une salle de bain vieillissante avec cabine de douche arrondie et mobilier vert d'eau. APRÈS : Une transformation radicale dans un esprit contemporain noir et blanc. Carrelage Équipe style métro noir et blanc, meuble vasque suspendu noir (masalledebain.com) et robinetterie noire. Paroi de douche verrière style atelier et miroir rond rétroéclairé complètent l'ensemble. Résultat : un espace élégant et moderne.",
    coverImage: coursVincennesSdb1,
    photos: [
      { id: 1, image: coursVincennesSdb1, title: "Après — Vue d'ensemble", description: "Douche italienne et meuble vasque noir" },
      { id: 2, image: coursVincennesSdb2, title: "Après — Vasque et douche", description: "Miroir rond rétroéclairé et paroi verrière" },
      { id: 3, image: coursVincennesSdb3, title: "Après — Vue vasque", description: "Robinetterie noire et meuble suspendu" },
      { id: 4, image: coursVincennesSdb4, title: "Après — Détail miroir", description: "Miroir LED avec interrupteur tactile" },
      { id: 5, image: coursVincennesSdb5, title: "Après — Niche douche", description: "Niche encastrée carrelage noir" },
      { id: 6, image: coursVincennesSdbAvant1, title: "Avant — Vue générale", description: "Cabine arrondie et meuble vert d'eau" },
      { id: 7, image: coursVincennesSdbAvant2, title: "Avant — Autre angle", description: "Ancien aménagement à remplacer" },
    ],
  },
  {
    id: "cours-vincennes-madame",
    title: "SDB Madame — Rangements Sur-mesure",
    location: "Paris 12ème - Cours de Vincennes",
    description: "AVANT : Salle de bain grise et datée, cabine de douche arrondie, aucun rangement. APRÈS : Salle de bain repensée dans une harmonie marbre noir/gris. Placard au-dessus des WC avec rangement serviettes et panière à linge coulissante. Douche à l'italienne XXL, meuble vasque noir et carrelage grand format effet pierre. 👉 Gain de place, style et fonctionnalité réunis.",
    coverImage: coursVincennesMadame1,
    photos: [
      { id: 1, image: "/videos/cours-vincennes-madame-1.mp4", title: "Vidéo — Visite", description: "Découvrez la transformation complète", isVideo: true },
      { id: 2, image: coursVincennesMadame1, title: "Après — Douche italienne", description: "Douche XXL et meuble vasque noir" },
      { id: 3, image: coursVincennesMadame2, title: "Après — Placard ouvert", description: "Emplacement idéal pour serviettes et panière coulissante" },
      { id: 4, image: coursVincennesMadame3, title: "Après — Meuble vasque", description: "Meuble noir et sèche-serviettes design" },
      { id: 5, image: coursVincennesMadame4, title: "Après — Niche douche", description: "Niche mosaïque et robinetterie encastrée" },
      { id: 6, image: coursVincennesMadame5, title: "Après — WC et placard", description: "WC suspendu et rangement sur-mesure" },
      { id: 7, image: coursVincennesMadameAvant1, title: "Avant — Cabine douche", description: "Cabine arrondie et carrelage gris" },
      { id: 8, image: coursVincennesMadameAvant2, title: "Avant — Salle de bain", description: "Ancien aménagement sans rangement" },
      { id: 9, image: coursVincennesMadameAvant3, title: "Avant — Espace WC", description: "Espace au-dessus du WC non exploité" },
    ],
  },
  // ========== PARIS 13ÈME (75013) ==========
  {
    id: "bobillot",
    title: "Rénovation entre deux locations",
    location: "Paris 13ème - Rue Bobillot",
    description: "AVANT : Logement dégradé nécessitant une rénovation profonde pour améliorer le DPE et revaloriser le bien. Murs abîmés, tuyauteries apparentes, aucun équipement moderne. APRÈS : Rénovation complète cuisine et salle de bain. Ambiance chaleureuse avec teintes beige, bois et noir. Meuble vasque bois avec plan noir, robinetterie laiton brossé, carrelage zellige beige et chauffe-eau dissimulé au-dessus du WC suspendu pour un gain de place optimal.",
    coverImage: bobillot1,
    instagramLink: "https://www.instagram.com/reel/C-S-wyLtLP-/",
    review: {
      text: "Carina m'a été recommandée par mes amis. Je souhaitais rénover ma salle de bain. Elle a fait du super travail, dans les temps et bien réalisé. Je la recommande.",
      author: "Client Paris 13ème",
      link: "https://www.houzz.fr/viewReview/2059916/qualirenovation-by-qualiconcept-review"
    },
    photos: [
      { id: 1, image: bobillot1, title: "Après — Vue d'ensemble", description: "Meuble bois, plan noir et robinetterie laiton" },
      { id: 2, image: bobillot2, title: "Après — Détail vasque", description: "Zellige beige et applique murale dorée" },
      { id: 3, image: bobillotAvant1, title: "Avant — Vue générale", description: "Murs dégradés et tuyauteries apparentes" },
      { id: 4, image: bobillotAvant2, title: "Avant — Salle de bain", description: "Carrelage dégradé et état initial" },
      { id: 5, image: bobillotAvant3, title: "Avant — Vue d'ensemble", description: "Logement nécessitant rénovation complète" },
    ],
  },
  {
    id: "nicolas-roret",
    title: "Zellige turquoise & Or",
    location: "Paris 13ème - Rue Nicolas Roret",
    description: "AVANT : WC vétuste avec carrelage bleu abîmé, équipements datés et peinture écaillée. APRÈS : Transformation luxueuse avec douche italienne en zellige turquoise posé en chevron, paroi et robinetterie dorées, niches intégrées avec listel or, carrelage grand format effet marbre. WC suspendu assorti avec lave-mains doré, local technique optimisé intégrant chauffe-eau et lave-linge.",
    coverImage: nicolasRoret5,
    review: {
      text: "Carina est une architecte de talent, créative et toujours à l'écoute. Elle a su transformer notre petite salle de bain en un espace fonctionnel et esthétique, avec des matériaux de qualité et des finitions impeccables. Son suivi de chantier est rigoureux et elle sait gérer les imprévus avec professionnalisme.",
      author: "Propriétaire Paris 13ème",
      link: "https://www.houzz.fr/viewReview/2197601/qualirenovation-by-qualiconcept-review"
    },
    photos: [
      { id: 1, image: nicolasRoret5, title: "Après — Douche italienne", description: "Zellige turquoise chevron et paroi dorée" },
      { id: 2, image: nicolasRoret1, title: "Après — Détail niches", description: "Niches encastrées avec listel or" },
      { id: 3, image: nicolasRoret2, title: "Après — Vue d'ensemble", description: "Douche, sèche-serviettes et rangements" },
      { id: 4, image: nicolasRoret12, title: "Après — Vue large fenêtre", description: "Vasque, frise zellige et lumière naturelle" },
      { id: 5, image: nicolasRoret9, title: "Après — Vasque et miroir", description: "Frise zellige turquoise et robinetterie dorée" },
      { id: 6, image: nicolasRoret11, title: "Après — WC suspendu", description: "Zellige chevron et lave-mains doré" },
      { id: 7, image: nicolasRoret10, title: "Après — Local technique", description: "Chauffe-eau et lave-linge intégrés" },
      { id: 8, image: nicolasRoret3, title: "Après — Rangements", description: "Placard technique intégré" },
      { id: 9, image: nicolasRoret4, title: "Après — Lave-linge", description: "Dissimulation technique astucieuse" },
      { id: 10, image: nicolasRoret6, title: "Après — WC vue angle", description: "Zellige turquoise et carrelage marbre" },
      { id: 11, image: nicolasRoret7, title: "Après — Vasque suspendue", description: "Meuble blanc, robinetterie dorée" },
      { id: 12, image: nicolasRoretTravaux1, title: "Travaux — Pose zellige WC", description: "Installation du zellige chevron" },
      { id: 13, image: nicolasRoretAvant1, title: "Avant — WC vétuste", description: "État initial avec carrelage bleu et équipements datés" },
      { id: 14, image: nicolasRoret3d1, title: "Avant — Visualisation 3D", description: "Projet de conception initial" },
      { id: 15, image: nicolasRoret3d2, title: "Avant — Vue 3D vasque", description: "Conception du meuble vasque" },
    ],
  },
  {
    id: "nicolas-roret-wc",
    title: "WC Zellige turquoise & Laiton brossé",
    location: "Paris 13ème - Rue Nicolas Roret",
    description: "AVANT : WC vétuste avec carrelage bleu abîmé, équipements datés et peinture écaillée. APRÈS : WC suspendu luxueux avec zellige turquoise posé en chevron, lave-mains avec robinetterie laiton brossé, local technique optimisé intégrant chauffe-eau et lave-linge.",
    coverImage: nicolasRoret11,
    instagramLink: "https://www.instagram.com/reel/DTiv9H0jb06/",
    photos: [
      { id: 1, image: nicolasRoret11, title: "Après — WC suspendu", description: "Zellige chevron et lave-mains laiton brossé" },
      { id: 2, image: nicolasRoret6, title: "Après — WC vue angle", description: "Zellige turquoise et carrelage marbre" },
      { id: 3, image: nicolasRoretTravaux1, title: "Travaux — Pose zellige WC", description: "Installation du zellige chevron" },
      { id: 4, image: nicolasRoretAvant1, title: "Avant — WC vétuste", description: "État initial avec carrelage bleu et équipements datés" },
    ],
  },
  // ========== PARIS 15ÈME (75015) ==========
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
      { id: 7, image: amiralRoussinAvant1, title: "Avant — Baignoire", description: "Baignoire vétuste et carrelage daté" },
      { id: 8, image: amiralRoussinAvant2, title: "Avant — Vasque", description: "Meuble standard et tomettes au sol" },
      { id: 9, image: amiralRoussinAvant3, title: "Avant — Sol", description: "Carrelage damier terracotta" },
    ],
  },
  {
    id: "paris15-convention",
    title: "Salle de douche & WC séparés",
    location: "Paris 15ème - Rue de la Convention",
    description: "AVANT : Receveur de douche mal positionné et espace non optimisé. APRÈS : Création d'une salle de douche et d'un WC séparé. Receveur XXL de 140 cm avec niche horizontale intégrée. Ambiance graphique avec le bleu Hague Blue de Farrow & Ball sur fond gris béton, réchauffée par des touches de bois pour un rendu contemporain et chaleureux.",
    coverImage: convention1,
    instagramLink: "https://www.instagram.com/reel/DL4wrtXt7Y3/",
    photos: [
      { id: 1, image: convention1, title: "Après — Résultat final", description: "Douche à l'italienne XXL 140 cm" },
      { id: 2, image: convention2, title: "Après — Niche horizontale", description: "Rangement intégré pratique" },
      { id: 3, image: convention3, title: "Après — Paroi fixe", description: "Verre trempé sécurit" },
      { id: 4, image: convention4, title: "Après — Robinetterie", description: "Colonne de douche noire" },
      { id: 5, image: convention5, title: "Après — Vasque", description: "Meuble bois et tons Hague Blue" },
      { id: 6, image: convention6, title: "Après — Vue générale", description: "Harmonie gris béton, bleu et bois" },
    ],
  },
  // ========== PARIS 16ÈME (75016) ==========
  {
    id: "pierre-guerin",
    title: "Style masculin — Pierre & Inox",
    location: "Paris 16ème - Rue Pierre Guérin",
    description: "Rénovation d'une salle de bain pour un appartement au masculin. Douche à l'italienne avec carrelage pierre naturelle, robinetterie encastrée chromée haut de gamme, niches de rangement intégrées et rangements sur-mesure avec buanderie dissimulée.",
    coverImage: pierreGuerin1,
    review: {
      text: "J'ai fait appel à Qualirenovation pour deux chantiers dont une rénovation d'envergure d'un appartement. La qualité d'exécution fut exemplaire. Carina est rapidement devenue non plus un prestataire mais un véritable partenaire. Des années après la fin des travaux, Carina est toujours disponible pour assurer un suivi ou fournir un conseil quel que soit le sujet. Bravo et merci Carina.",
      author: "Julien",
      link: "https://www.houzz.fr/viewReview/1891218/qualirenovation-by-qualiconcept-review"
    },
    photos: [
      { id: 1, image: pierreGuerin1, title: "Après — Vue d'ensemble", description: "Meuble vasque et WC suspendu" },
      { id: 2, image: pierreGuerin2, title: "Après — Rangements sur-mesure", description: "Colonnes avec buanderie intégrée" },
      { id: 3, image: pierreGuerin3, title: "Après — Douche à l'italienne", description: "Robinetterie encastrée chromée" },
      { id: 4, image: pierreGuerin4, title: "Après — Détail niches", description: "Niches de rangement intégrées" },
      { id: 5, image: pierreGuerin5, title: "Après — Buanderie", description: "Placards ouverts avec rangement intégré" },
    ],
  },
  {
    id: "auteuil",
    title: "Style Parisien Chic — SDB & WC",
    location: "Paris 16ème - Rue Boileau, Auteuil",
    description: "AVANT : Salle de bain datée avec carrelage mosaïque noir et escalier en travaux. APRÈS : Duplex entièrement repensé avec salle de bain sous escalier. Vasque rose poudré sur plan noir, robinetterie dorée encastrée, carrelage effet marbre, paroi coulissante noire. WC séparé avec mur bordeaux, affiche fashion et frise hexagonale cuivrée.",
    coverImage: auteuil1,
    photos: [
      { id: 1, image: auteuil1, title: "Après — Vue d'ensemble", description: "Salle de bain sous escalier avec vasque rose" },
      { id: 2, image: auteuil2, title: "Après — Douche à l'italienne", description: "Paroi coulissante noire et robinetterie dorée" },
      { id: 3, image: auteuil3, title: "Après — Détail vasque", description: "Vasque rose et robinet doré encastré" },
      { id: 4, image: auteuil4, title: "Après — Meuble vasque", description: "Plan noir et meuble bois avec étagères" },
      { id: 5, image: auteuil5, title: "Après — Robinetterie", description: "Robinet doré et vasque rose poudré" },
      { id: 6, image: auteuil6, title: "Après — WC vue face", description: "Mur bordeaux et affiche fashion" },
      { id: 7, image: auteuil7, title: "Après — WC vue large", description: "Frise hexagonale cuivrée et marbre" },
      { id: 8, image: auteuilAvant1, title: "Avant — État initial", description: "Ancienne salle de bain mosaïque noire" },
    ],
  },
  // ========== PARIS 17ÈME (75017) ==========
  {
    id: "paris17-suite",
    title: "Suite Parentale Les Ternes",
    location: "Paris 17ème - Les Ternes",
    description: "AVANT : Baignoire balnéo en panne depuis des années avec galets au sol, aucune paroi pour protéger de l'eau — la douche causait des éclaboussures sur le parquet, très peu pratique. APRÈS : Création d'une suite parentale luxueuse avec claustra bois sur mesure, douche à l'italienne en carrelage effet marbre, paroi et robinetterie dorées laiton brossé, niches intégrées et colonnes de rangement.",
    coverImage: suiteParentaleCover,
    instagramLink: "https://www.instagram.com/reel/DAmG5VDtPwK/",
    review: {
      text: "Je recommande avec beaucoup d'enthousiasme les prestations de QualiConcept. Carina a géré mon chantier avec beaucoup de professionnalisme et de rigueur, elle est très à l'écoute de ses clients. Le chantier a été livré dans le délai imparti, avec des finitions soignées et beaucoup de créativité. Le résultat est formidable et dépasse même mes ambitions initiales !",
      author: "Marie C.",
      link: "https://www.houzz.fr/viewReview/2076669/qualirenovation-by-qualiconcept-review"
    },
    photos: [
      { id: 1, image: suiteParentale5, title: "Après — Colonne dorée", description: "Robinetterie laiton brossé et ciel de pluie" },
      { id: 2, image: suiteParentale1, title: "Après — Douche marbre", description: "Paroi dorée et colonnes hautes" },
      { id: 3, image: suiteParentale2, title: "Après — Niches douche", description: "Rangements intégrés pratiques" },
      { id: 4, image: suiteParentale4, title: "Après — Claustra et rangement", description: "Harmonie bois et marbre" },
      { id: 5, image: suiteParentale3, title: "Après — Chambre parentale", description: "Claustra bois et miroir rond" },
      { id: 6, image: paris17Avant1, title: "Avant — Baignoire balnéo", description: "En panne depuis des années" },
      { id: 7, image: paris17Avant2, title: "Avant — Galets au sol", description: "Revêtement à changer" },
      { id: 8, image: paris17Avant3, title: "Avant — Sans paroi", description: "Éclaboussures sur le parquet" },
      { id: 9, image: paris17Avant4, title: "Avant — Vue d'ensemble", description: "Configuration peu pratique" },
      { id: 10, image: paris17Avant5, title: "Avant — Détail", description: "Espace à transformer" },
      { id: 11, image: paris17Avant6, title: "Avant — Rangements", description: "À optimiser" },
      { id: 12, image: paris17Avant7, title: "Avant — Baignoire balnéo en panne", description: "Hors service depuis des années" },
      { id: 13, image: paris17Avant8, title: "Avant — État initial", description: "Avant rénovation complète" },
    ],
  },
  {
    id: "paris17-pereire",
    title: "Rénovation après dégât des eaux",
    location: "Paris 17ème - Bd Pereire",
    description: "AVANT : Dégâts des eaux et malfaçons laissés par une précédente entreprise — infiltrations, moisissures et travaux bâclés. APRÈS : Intervention de Carina pour reprendre le chantier. Rénovation complète avec carrelage chevrons blancs tendance, sol terrazzo gris et robinetterie chromée. On vous explique tout sur ce chantier de rattrapage !",
    coverImage: gallery11,
    instagramLinks: [
      "https://www.instagram.com/reel/DDNI7CHtBKE/",
      "https://www.instagram.com/reel/DDHoGoct5K3/",
      "https://www.instagram.com/reel/DDFsmeBNeur/"
    ],
    review: {
      text: "Carina est fantastique. Elle a géré notre projet avec professionnalisme et créativité. Le résultat est magnifique et nous sommes ravis du travail accompli. Son équipe est réactive et le chantier a été livré dans les temps avec des finitions impeccables.",
      author: "Client Paris 17ème",
      link: "https://www.houzz.fr/viewReview/2101062/qualirenovation-by-qualiconcept-review"
    },
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
  // ========== BOIS-COLOMBES (92270) ==========
  {
    id: "bois-colombes",
    title: "Rénovation complète Avant/Après",
    location: "Bois-Colombes (92)",
    description: "AVANT : Salle de bain sombre et datée avec baignoire, carrelage ancien et buanderie encombrante. APRÈS : Transformation spectaculaire en pièce lumineuse et moderne. Douche à l'italienne XXL, robinetterie dorée, sol terrazzo et murs vert d'eau.",
    coverImage: boisColombes2,
    instagramLink: "https://www.instagram.com/reel/DFvTfUlst9t/",
    review: {
      text: "J'ai sollicité Carina de QUALIRENOVATION pour la rénovation de ma salle de bain. La rénovation a été complète : plomberie, électricité, remplacement de la baignoire par une douche, carrelage, peinture et menuiserie. L'équipe est compétente et a réalisé un travail de très bonne qualité. Je suis très satisfait et je recommande vivement car le résultat dépasse mes attentes initiales.",
      author: "Olivier G.",
      link: "https://www.houzz.fr/viewReview/2089505/qualirenovation-by-qualiconcept-review"
    },
    photos: [
      { id: 1, image: boisColombes1, title: "Après — Vue générale", description: "Douche à l'italienne XXL" },
      { id: 2, image: boisColombes2, title: "Après — Résultat final", description: "Meuble suspendu et robinetterie dorée" },
      { id: 3, image: boisColombes3, title: "Après — Paroi vitrée", description: "Verrière noire élégante" },
      { id: 4, image: boisColombes4, title: "Après — Sol terrazzo", description: "Finition haut de gamme" },
      { id: 5, image: boisColombes5, title: "Après — Détails dorés", description: "Robinetterie et accessoires" },
      { id: 6, image: boisColombes6, title: "Après — Espace optimisé", description: "Chaque cm² utilisé" },
      { id: 7, image: boisColombes7, title: "Après — Douche", description: "Vue de la douche à l'italienne" },
      { id: 8, image: boisColombes8, title: "Après — Vasque", description: "Détail du meuble vasque" },
      { id: 9, image: boisColombes9, title: "Après — Finitions", description: "Détails et accessoires" },
      { id: 10, image: boisColombes10, title: "Travaux — Démolition", description: "Phase de dépose" },
      { id: 11, image: boisColombes11, title: "Travaux — Préparation", description: "Mise à nu des murs" },
      { id: 12, image: boisColombresAvant1, title: "Avant — Vue d'ensemble", description: "Salle de bain avec baignoire datée" },
      { id: 13, image: boisColombresAvant2, title: "Avant — Vasque", description: "Ancien meuble vasque" },
      { id: 14, image: boisColombresAvant3, title: "Avant — Coin buanderie", description: "Espace lave-linge" },
    ],
  },
  // ========== BOULOGNE-BILLANCOURT (92100) ==========
  {
    id: "boulogne",
    title: "Ambiance marine — SDB & WC",
    location: "Boulogne-Billancourt - Av. du Maréchal de Lattre de Tassigny",
    description: "AVANT : Chaudière apparente au milieu de la pièce, WC vétuste avec réservoir apparent — un ensemble daté et mal exploité. APRÈS : Rénovation complète du duo salle de bain + WC pour cette mère célibataire et son enfant. Grand meuble double vasque avec miroirs ronds décorés de méduses, baignoire avec fresque marine, tomettes hexagonales bleues au sol. WC suspendu moderne avec carrelage 3D assorti et rangements au plafond. Robinetterie dorée pour une touche d'élégance.",
    coverImage: boulogne14,
    photos: [
      { id: 1, image: boulogne14, title: "Après — Vue d'ensemble", description: "Baignoire, fresque marine et double vasque" },
      { id: 2, image: boulogne12, title: "Après — Double vasque", description: "Miroirs ronds avec méduses et robinetterie dorée" },
      { id: 3, image: boulogne13, title: "Après — Détail vasque", description: "Tomettes hexagonales et carrelage 3D" },
      { id: 4, image: boulogne1, title: "Après — Baignoire", description: "Baignoire 3D et tomettes bleues" },
      { id: 5, image: boulogne3, title: "Après — Niches douche", description: "Carrelage 3D et niches bleues" },
      { id: 6, image: boulogne4, title: "Après — Détail carrelage", description: "Carrelage 3D blanc effet vague" },
      { id: 7, image: boulogne5, title: "Après — Miroir vasque", description: "Miroir LED et finitions dorées" },
      { id: 8, image: boulogne7, title: "Après — Ambiance complète", description: "Harmonie bleu et blanc" },
      { id: 9, image: boulogne8, title: "Après — Rangements", description: "Optimisation du stockage" },
      { id: 10, image: boulogne9, title: "Après — Finitions", description: "Détails soignés" },
      { id: 11, image: boulogne10, title: "Après — WC suspendu", description: "WC moderne avec carrelage 3D" },
      { id: 12, image: boulogne11, title: "Après — WC vue complète", description: "Rangements intégrés au plafond" },
      { id: 13, image: boulogneAvant1, title: "Avant — Chaudière", description: "Chaudière apparente à dissimuler" },
      { id: 14, image: boulogneAvant2, title: "Avant — Vue générale", description: "Espace vétuste à transformer" },
      { id: 15, image: boulogneAvant3, title: "Avant — État initial", description: "Configuration d'origine" },
      { id: 16, image: boulogneAvant4, title: "Avant — WC ancien", description: "WC avec réservoir apparent" },
      { id: 17, image: boulogneTravaux1, title: "Travaux — Préparation", description: "Démolition et plomberie" },
      { id: 18, image: boulogneTravaux2, title: "Travaux — Installation", description: "Mise en place des équipements" },
    ],
  },
  // ========== COURBEVOIE (92400) ==========
  {
    id: "courbevoie-st-guillaume",
    title: "Suite dégât des eaux — Carrelage mal posé",
    location: "Courbevoie (92)",
    description: "AVANT : Carrelage mal posé et absence totale d'étanchéité — la catastrophe ! Une salle de bain qui a causé des dégâts chez les voisins. APRÈS : Reprise complète dans les règles de l'art. Carrelage terrazzo grand format sol et mur, meuble vasque teck massif, robinetterie chromée, paroi fixe et receveur blanc extra-plat. Miroir LED tactile avec affichage digital. Sèche-serviettes blanc et niches de rangement intégrées pour un espace optimisé et enfin étanche.",
    coverImage: courbevoieStGuillaume11,
    photos: [
      { id: 1, image: "/videos/courbevoie-1.mp4", title: "Après — Visite vidéo", description: "Tour de la salle de bain rénovée", isVideo: true },
      { id: 2, image: courbevoieStGuillaume11, title: "Après — Vue générale", description: "Terrazzo, meuble teck et paroi vitrée" },
      { id: 3, image: courbevoieStGuillaume10, title: "Après — Détail terrazzo", description: "Carrelage terrazzo et robinetterie chromée" },
      { id: 4, image: courbevoieStGuillaume7, title: "Après — Aménagement", description: "Terrazzo, meuble teck et receveur blanc" },
      { id: 5, image: courbevoieStGuillaume8, title: "Après — Douche et vasque", description: "Détail de l'aménagement et robinetterie chromée" },
      { id: 6, image: courbevoieStGuillaume9, title: "Après — Miroir LED", description: "Miroir tactile avec affichage digital" },
      { id: 7, image: courbevoieStGuillaumeTravaux1, title: "Travaux — Niches en cours", description: "Création des niches de rangement" },
      { id: 8, image: courbevoieStGuillaumeTravaux2, title: "Travaux — Pose carrelage", description: "Pose du terrazzo et receveur" },
      { id: 9, image: courbevoieStGuillaumeAvant3, title: "Avant — Salle de bain sombre", description: "Carrelage foncé et meuble teck d'origine" },
      { id: 10, image: courbevoieStGuillaumeAvant1, title: "Avant — Vue vasque", description: "Meuble vasque et carrelage défaillant" },
      { id: 11, image: courbevoieStGuillaumeAvant2, title: "Avant — Vue d'ensemble", description: "Carrelage moucheté et absence d'étanchéité" },
    ],
    instagramLinks: [
      "https://www.instagram.com/reel/CoCd273LJq1/"
    ],
    review: {
      text: "J'ai fait appel à Qualirenovation pour 2 projets de rénovation et les résultats sont excellents à tous points de vue (tant sur le rendu que sur le déroulement) : Carina partage de très bonnes idées, s'adapte aux besoins de ses clients, est ultra-disponible pour le suivi et pour trouver des solutions ! Je suis ravie et j'ai hâte de faire à nouveau appel à elle pour un futur projet « Saretta »!!",
      author: "Sarah C.",
      link: "https://www.houzz.fr/viewReview/1886768/qualirenovation-by-qualiconcept-review"
    },
  },
  // ========== SURESNES (92150) ==========
  {
    id: "rue-des-puits",
    title: "Cette salle de bain voit la vie en bleu",
    location: "Suresnes (92) - Rue du Puits",
    description: "AVANT : Salle de bain fonctionnelle mais datée avec baignoire classique, carrelage beige et vasque simple sur plateau bois. APRÈS : Transformation spectaculaire vers un style marbre bleu saisissant. Meuble chêne IKEA avec double vasque en verre strié, miroir XXL rétroéclairé, niche encastrée ergonomique dans la douche et plan vasque confortable. Dans l'entrée, le lave-linge est astucieusement dissimulé dans le placard pour un nouveau logement optimisé.",
    coverImage: rueDesPuits4,
    photos: [
      { id: 1, image: rueDesPuits4, title: "Après — Vue d'ensemble", description: "Meuble chêne, vasques verre et miroir XXL" },
      { id: 2, image: rueDesPuits2, title: "Après — Double vasque", description: "Vasques en verre strié et miroir rétroéclairé" },
      { id: 3, image: rueDesPuits3, title: "Après — Détail vasques", description: "Verre strié et robinetterie chromée" },
      { id: 4, image: rueDesPuits5, title: "Après — Baignoire marbre bleu", description: "Carrelage effet marbre avec niche intégrée" },
      { id: 5, image: rueDesPuits1, title: "Après — Niche et colonne de douche", description: "Niche encastrée et robinetterie pluie" },
      { id: 6, image: rueDesPuits6, title: "Après — Rangement entrée", description: "Lave-linge dissimulé dans le placard" },
      { id: 7, image: rueDesPuits7, title: "Après — Ambiance finale", description: "Vue complète de la salle de bain" },
      { id: 8, image: rueDesPuits8, title: "Après — Détail déco", description: "Finitions et accessoires" },
      { id: 9, image: rueDesPuits9, title: "Après — Plan vasque", description: "Confort et ergonomie" },
      { id: 10, image: rueDesPuits10, title: "Après — Vue générale", description: "Transformation complète" },
      { id: 11, image: rueDesPuitsAvant1, title: "Avant — Vue baignoire", description: "Baignoire avec pare-bain et carrelage beige" },
      { id: 12, image: rueDesPuitsAvant2, title: "Avant — Vue d'ensemble", description: "Configuration initiale avec lave-linge visible" },
      { id: 13, image: rueDesPuitsAvant3, title: "Avant — Vasque et miroir", description: "Vasque simple sur plateau bois" },
      { id: 14, image: rueDesPuitsAvant4, title: "Avant — Vue angle", description: "Espace avant transformation" },
    ],
  },
  // ========== SAINT-OUEN (93400) ==========
  {
    id: "st-ouen",
    title: "Deuxième chance — On conçoit, on ne pose pas",
    location: "Saint-Ouen (93) - Rue Pablo Picasso",
    description: "AVANT (1ère rénovation ratée) : Plan de 169 cm avec 1 seule vasque, trappe visible, mitigeur mal placé, lave-linge bloqué, pas de faux plafond. Le client fait appel à Qualiconcept car sa SDB n'était pas fonctionnelle. APRÈS : Transformation totale ! Double vasque en pierre naturelle sur plan chêne verni marin, trappe invisible, faux plafond avec spots LED, meuble noir mat avec tiroir linge sale intégré (le clou du projet !), miroirs LED design et murs orange. Une charte graphique audacieuse et surtout FONCTIONNELLE.",
    coverImage: stOuen3,
    instagramLink: "https://www.instagram.com/reel/DKISLTuMLAY/",
    photos: [
      { id: 1, image: stOuen3, title: "Après — Double vasque", description: "Vasques pierre sur plan chêne verni marin et miroirs LED" },
      { id: 2, image: stOuen4, title: "Après — Vue latérale", description: "Harmonie orange, noir et bois — trappe invisible" },
      { id: 3, image: stOuen1, title: "Après — Vue d'ensemble", description: "Meuble noir avec tiroir linge sale intégré" },
      { id: 4, image: stOuen2, title: "Après — Espace optimisé", description: "Double vasque et faux plafond spots" },
      { id: 5, image: stOuen5, title: "Après — Baignoire", description: "Pare-bain verrière et travertin" },
      { id: 6, image: stOuen6, title: "Après — Détail vasque", description: "Vasque pierre et robinet noir" },
      { id: 7, image: stOuen7, title: "Après — Miroir rond LED", description: "Vasque pierre naturelle" },
      { id: 8, image: stOuenAvant1, title: "Avant — Baignoire", description: "Baignoire et verrière existante" },
      { id: 9, image: stOuenAvant2, title: "Avant — 1ère rénovation ratée", description: "Plan 169cm, 1 vasque, lave-linge bloqué, trappe visible" },
    ],
  },
  // ========== CHARENTON-LE-PONT (94220) ==========
  {
    id: "charenton",
    title: "Salle de bain — Marbre et Laiton",
    location: "Charenton-le-Pont (94)",
    description: "AVANT : Baignoire datée et espace peu fonctionnel. APRÈS : Transformation en salle de bain au style Black & White raffiné. Carrelage effet marbre et mosaïque hexagonale (Leroy Merlin), meuble vasque blanc façade 3D (Ikea), miroirs encadrés laiton (Maisons du Monde), robinetterie laiton brossé encastrée (MaSalleDeBain.com). Remplacement de la baignoire par un receveur de douche avec paroi profilé doré.",
    coverImage: charenton4,
    photos: [
      { id: 1, image: charenton4, title: "Après — Vue meuble vasque", description: "Double vasque et miroirs encadrés laiton" },
      { id: 2, image: charenton8, title: "Après — Vue complète vasque", description: "Meuble 3D blanc et miroir laiton" },
      { id: 3, image: charenton7, title: "Après — Vasque détail", description: "Robinetterie murale laiton" },
      { id: 4, image: charenton5, title: "Après — Jonction parquet", description: "Transition parquet et carrelage marbre" },
      { id: 5, image: charenton3, title: "Après — Douche à l'italienne", description: "Receveur, robinetterie laiton et paroi dorée" },
      { id: 6, image: charenton9, title: "Après — Vue douche", description: "Paroi profilé doré et niches intégrées" },
      { id: 7, image: charenton14, title: "Après — Niches douche", description: "Double niche avec mosaïque hexagonale" },
      { id: 8, image: charenton6, title: "Après — Robinetterie encastrée", description: "Laiton brossé sur marbre" },
      { id: 9, image: charenton10, title: "Après — Détail robinetterie", description: "Mitigeur laiton encastré" },
      { id: 10, image: charenton17, title: "Après — Douchette laiton", description: "Robinetterie laiton brossé sur marbre" },
      { id: 11, image: charenton11, title: "Après — Ensemble SDB", description: "Harmonie marbre blanc et laiton" },
      { id: 12, image: charenton13, title: "Après — Vue finale SDB", description: "Style Black & White élégant" },
      { id: 13, image: charentonAvant5, title: "Avant — Salle de bain complète", description: "Baignoire mosaïque beige et carrelage daté" },
      { id: 14, image: charentonAvant6, title: "Avant — Vue baignoire", description: "Mosaïque beige à remplacer" },
      { id: 15, image: charentonAvant7, title: "Avant — Vasque", description: "Meuble blanc et carrelage mosaïque" },
    ],
  },
  {
    id: "charenton-wc",
    title: "WC Mosaïque hexagonale & Laiton",
    location: "Charenton-le-Pont (94)",
    description: "AVANT : WC séparé avec réservoir apparent et équipements datés. APRÈS : WC suspendu moderne avec mur en mosaïque hexagonale effet marbre et carrelage grand format au sol (Leroy Merlin), plaque Geberit, placard suspendu sur-mesure. Robinetterie et accessoires MaSalleDeBain.com.",
    coverImage: charenton19,
    photos: [
      { id: 1, image: charenton19, title: "Après — WC vue complète", description: "Placard suspendu, étagères et mosaïque hexagonale" },
      { id: 2, image: charenton18, title: "Après — Détail mosaïque", description: "Mosaïque hexagonale marbre et plaque Geberit" },
      { id: 3, image: charenton16, title: "Après — Vue d'ensemble", description: "Rangement optimisé et sol marbre" },
      { id: 4, image: charenton1, title: "Après — WC suspendu", description: "Mosaïque hexagonale effet marbre Leroy Merlin" },
      { id: 5, image: charenton15, title: "Après — Plaque Geberit", description: "Détail plaque de chasse double touche" },
      { id: 6, image: charenton2, title: "Après — Niche WC", description: "Niche et accessoires MaSalleDeBain.com" },
      { id: 7, image: charenton12, title: "Après — Finitions", description: "Sèche-serviettes et WC" },
      { id: 8, image: charentonAvant8, title: "Avant — WC ancien", description: "WC avec réservoir apparent" },
    ],
  },
  {
    id: "general-leclerc",
    title: "Duo Douche & Baignoire — Style Bois et Blanc",
    location: "Charenton-le-Pont (94) - Rue du Général Leclerc",
    description: "Rénovation complète pour un jeune couple avec bébé. Le défi : intégrer à la fois une douche à l'italienne ET une baignoire pour le bain du bébé, le tout au centimètre près. Carrelage mix blanc et bois aspect avec niches intégrées, robinetterie chromée encastrée, meuble vasque en bois avec vasque à poser, WC suspendu avec placard technique pour le chauffe-eau et carreaux de ciment au sol.",
    coverImage: generalLeclerc6,
    photos: [
      { id: 1, image: generalLeclerc6, title: "Après — Vue d'ensemble", description: "Vasque, baignoire et douche en harmonie" },
      { id: 2, image: generalLeclerc2, title: "Après — Baignoire & Douche", description: "Duo optimisé au centimètre près" },
      { id: 3, image: generalLeclerc3, title: "Après — Baignoire détail", description: "Carrelage bois et niches intégrées" },
      { id: 4, image: generalLeclerc4, title: "Après — Robinetterie baignoire", description: "Chrome encastré sur carrelage bois" },
      { id: 5, image: generalLeclerc5, title: "Après — Vasque à poser", description: "Plan bois et robinetterie chromée" },
      { id: 6, image: generalLeclerc7, title: "Après — Douche à l'italienne", description: "Robinetterie encastrée et ciel de pluie" },
      { id: 7, image: generalLeclerc8, title: "Après — Niches rangement", description: "Double niche pratique et sèche-serviettes" },
      { id: 8, image: generalLeclerc1, title: "Après — WC suspendu", description: "Placard technique, chauffe-eau dissimulé et carreaux de ciment" },
      { id: 9, image: generalLeclercSchluter1, title: "Travaux — Étanchéité Schluter", description: "Système d'étanchéité sous carrelage conforme DTU" },
      { id: 10, image: generalLeclercSchluter2, title: "Travaux — Bandes d'étanchéité", description: "Jonctions et angles protégés" },
      { id: 11, image: generalLeclercSchluter3, title: "Travaux — Protection complète", description: "Étanchéité finalisée avant pose carrelage" },
    ],
  },
  {
    id: "general-leclerc-wc",
    title: "WC — Astuce Chauffe-eau Dissimulé",
    location: "Charenton-le-Pont (94) - Rue du Général Leclerc",
    description: "Solution gain de place idéale : le chauffe-eau est dissimulé au-dessus du WC suspendu dans un placard technique sur-mesure. Ce placard peut également accueillir les nourrices (collecteur) et le compteur d'eau. Carreaux de ciment au sol, carrelage noir mat en fond et papier peint rayé pour un style graphique.",
    coverImage: generalLeclercWc1,
    photos: [
      { id: 1, image: generalLeclercWc1, title: "Après — WC & placard fermé", description: "Chauffe-eau dissimulé, carreaux de ciment et style graphique" },
      { id: 2, image: generalLeclercWc2, title: "Après — Placard ouvert", description: "Chauffe-eau Thermor accessible, arrivées d'eau et groupe de sécurité" },
      { id: 3, image: generalLeclercWcTravaux1, title: "Travaux — Installation chauffe-eau", description: "Chauffe-eau Thermor suspendu au-dessus du WC, nourrices et arrivées" },
    ],
  },
  // ========== SAINT-MANDÉ (94160) ==========
  {
    id: "st-mande",
    title: "Rénovation Rue de l'Alouette",
    location: "Saint-Mandé (94) - Rue de l'Alouette",
    description: "AVANT : Salle de bain datée nécessitant une rénovation complète. APRÈS : Transformation en espace moderne avec douche à l'italienne, carrelage contemporain et robinetterie design. Un projet qui illustre notre savoir-faire en rénovation.",
    coverImage: stMande1,
    instagramLink: "https://www.instagram.com/p/DE-fqg4sxql/",
    photos: [
      { id: 1, image: stMande1, title: "Après — Vue d'ensemble", description: "Douche à l'italienne moderne" },
      { id: 2, image: stMande2, title: "Après — Détails", description: "Finitions soignées" },
      { id: 3, image: stMande3, title: "Après — Vue complète", description: "Transformation réussie" },
    ],
  },
  // ========== SAINT-MAUR-DES-FOSSÉS (94100) ==========
  {
    id: "saint-maur",
    title: "Rénovation Avant/Après",
    location: "Saint-Maur-des-Fossés (94)",
    description: "AVANT : Salle de bain datée avec baignoire et carrelage ancien, espace mal exploité. APRÈS : Transformation complète en espace moderne avec douche à l'italienne, carrelage grand format contemporain et meuble vasque design.",
    coverImage: gallery18,
    instagramLink: "https://www.instagram.com/reel/DIO91EFs5tM/",
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
    id: "saint-maur-enfants",
    title: "SDB & WC Enfants — Inspiration Coréenne",
    location: "Saint-Maur-des-Fossés (94) - Av. du Nord",
    description: "AVANT : Salle d'eau vétuste avec baignoire usée et carrelage dégradé. APRÈS : Transformation complète pour les enfants. Carrelage mural Tebrick bleu posé verticalement (Parquet Carrelage), meuble vasque effet bois, robinetterie Horus Elsa et Equinox (CMR), placard sur-mesure en sapin vernis chêne doré au-dessus du WC. Sol grès cérame Etna Crema antidérapant. Une élégance douce inspirée du design coréen.",
    coverImage: stMaurEnfants1,
    photos: [
      { id: 1, image: stMaurEnfants1, title: "Après — Vue d'ensemble", description: "Douche, meuble et carrelage bleu Tebrick" },
      { id: 2, image: stMaurEnfants2, title: "Après — Meuble vasque", description: "Effet bois et robinetterie Horus" },
      { id: 3, image: stMaurEnfants3, title: "Après — Détail carrelage", description: "Tebrick bleu pose verticale" },
      { id: 4, image: stMaurEnfants4, title: "Après — WC suspendu", description: "Placard sapin vernis chêne doré" },
      { id: 5, image: stMaurEnfantsAvant1, title: "Avant — Salle de bain", description: "Baignoire et carrelage dégradés" },
    ],
  },
  // ========== SOISY-SOUS-MONTMORENCY (95230) ==========
  {
    id: "soisy",
    title: "Suite parentale maison 1900",
    location: "Soisy-sous-Montmorency (95) - Maison 1900",
    description: "AVANT : Combles inexploités avec sol en béton brut et éclairage industriel provisoire. Espace perdu attendant d'être transformé. APRÈS : Création d'une suite parentale de luxe. Vasque à poser rose poudré, miroir rétroéclairé, robinetterie dorée et teinte terracotta. Sèche-serviettes doré, paroi vitrée fixe et banc en bois naturel dans la douche.",
    coverImage: soisy1,
    instagramLinks: [
      "https://www.instagram.com/reel/DGvfHQ2s8Ve/",
      "https://www.instagram.com/reel/DGtELfZMqWc/"
    ],
    review: {
      text: "Nous avons fait appel à Carina pour la rénovation de notre maison et la création de salles de bain. Tout a été parfait du début à la fin. Carina est une professionnelle de talent, elle a fait preuve de réactivité et de créativité. Le résultat est magnifique et correspond à nos attentes. Nous la recommandons sans réserve.",
      author: "Justin Montheillet",
      link: "https://www.houzz.fr/viewReview/2169416/qualirenovation-by-qualiconcept-review"
    },
    photos: [
      { id: 1, image: soisy1, title: "Après — Vue d'ensemble", description: "Vasque rose poudré et miroir rétroéclairé" },
      { id: 2, image: soisy2, title: "Après — Détails robinetterie", description: "Robinetterie dorée et teinte terracotta" },
      { id: 3, image: soisy3, title: "Après — Douche et banc", description: "Paroi vitrée et banc bois naturel" },
      { id: 4, image: soisyAvant, title: "Avant — Combles bruts", description: "Sol béton et éclairage industriel" },
    ],
  },
  {
    id: "soisy-sdb",
    title: "SDB Principale — Rose & Terracotta",
    location: "Soisy-sous-Montmorency (95) - Maison 1900",
    description: "AVANT : Combles aménageables avec sol béton et éclairage provisoire. APRÈS : Salle de bain luxueuse aux teintes rose et terracotta. Baignoire îlot (Leroy Merlin), robinetterie dorée au sol, vasque à poser rose sur meuble bois, miroir ovale doré et frise carreaux de ciment (Parquet Carrelage). Douche à l'italienne avec banc bois et paroi fixe.",
    coverImage: soisySdb1,
    photos: [
      { id: 1, image: soisySdb1, title: "Après — Baignoire îlot", description: "Robinetterie dorée et effet marbre" },
      { id: 2, image: soisySdb2, title: "Après — Vasque rose", description: "Meuble bois et miroir ovale doré" },
      { id: 3, image: soisySdb3, title: "Après — Vue ensemble", description: "Harmonie rose et terracotta" },
      { id: 4, image: soisySdb4, title: "Après — Douche", description: "Paroi fixe et banc bois" },
      { id: 5, image: soisySdb5, title: "Après — Frise carreaux", description: "Carreaux de ciment en frise" },
      { id: 6, image: soisySdbAvant, title: "Avant — Combles bruts", description: "Espace avant transformation" },
      { id: 7, image: soisySdbAvant2, title: "Avant — Murs bruts", description: "Préparation des surfaces" },
      { id: 8, image: soisySdbAvant3, title: "Avant — Vue générale", description: "Combles à aménager" },
    ],
  },
  {
    id: "soisy-enfants",
    title: "SDB Enfants — Terrazzo & Menthe",
    location: "Soisy-sous-Montmorency (95) - Maison 1900",
    description: "AVANT : Combles inachevés avec placo apparent et absence d'isolation. APRÈS : Salle de bain enfants colorée et joyeuse. Sol et murs en terrazzo vert menthe, meuble double vasque suspendu blanc, robinetterie chromée et paroi vitrée fixe. Niches de rangement intégrées et baignoire d'angle pour les enfants.",
    coverImage: soisyEnfants1,
    photos: [
      { id: 1, image: soisyEnfants1, title: "Après — Terrazzo menthe", description: "Sol et murs terrazzo harmonieux" },
      { id: 2, image: soisyEnfants2, title: "Après — Double vasque", description: "Meuble suspendu blanc pratique" },
      { id: 3, image: soisyEnfants3, title: "Après — Baignoire d'angle", description: "Espace bain pour les enfants" },
      { id: 4, image: soisyEnfants4, title: "Après — Vue ensemble", description: "Ambiance colorée et joyeuse" },
      { id: 5, image: soisyEnfants5, title: "Après — Niches", description: "Rangements intégrés" },
      { id: 6, image: soisyEnfantsAvant1, title: "Avant — Combles bruts", description: "Placo et isolation à faire" },
      { id: 7, image: soisyEnfantsAvant2, title: "Avant — Vue générale", description: "Espace avant aménagement" },
    ],
  },
];

// Albums des chantiers en cours
const inProgressAlbums: Album[] = [
  {
    id: "buttes-chaumont",
    title: "Rénovation Buttes-Chaumont",
    location: "Paris 19ème - Buttes-Chaumont",
    description: "Rénovation complète d'une salle de bain avec étanchéité Weber Aquastop (bleue) conforme aux normes. Chantier en cours — restez connecté pour découvrir cette transformation !",
    coverImage: butteschaumont1,
    isInProgress: true,
    photos: [
      { id: 1, image: butteschaumont9, title: "Travaux — Étanchéité", description: "Application Weber Aquastop bleue" },
      { id: 2, image: butteschaumont8, title: "Travaux — Préparation", description: "Mise en œuvre de l'étanchéité" },
      { id: 3, image: butteschaumont7, title: "Travaux — Protection", description: "Étanchéité des angles" },
      { id: 4, image: butteschaumont6, title: "Travaux — Douche", description: "Receveur en cours de pose" },
      { id: 5, image: butteschaumont5, title: "Travaux — Vue générale", description: "Avancement du chantier" },
      { id: 6, image: butteschaumont4, title: "Travaux — Détail", description: "Préparation des murs" },
      { id: 7, image: butteschaumont3, title: "Avant — État initial", description: "Salle de bain à rénover" },
      { id: 8, image: butteschaumont2, title: "Avant — Vue générale", description: "Configuration initiale" },
      { id: 9, image: butteschaumont1, title: "Avant — Vue d'ensemble", description: "État des lieux" },
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
    location: "Paris 5ème - Boulevard de Port-Royal",
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
  {
    id: "courbevoie-lalyre",
    title: "Rénovation en cours — Style contemporain",
    location: "Courbevoie (92) - Rue Ernest Lalyre",
    description: "Rénovation d'une salle de bain dans un esprit contemporain. Carrelage grand format, douche à l'italienne avec paroi vitrée fixe, meuble vasque suspendu et finitions soignées. Chantier en cours — restez connecté pour découvrir cette transformation !",
    coverImage: courbevoieLalyreAvant1,
    isInProgress: true,
    photos: [
      { id: 1, image: courbevoieLalyreAvant1, title: "Avant — Vue vasque et ensemble", description: "Salle de bain avant rénovation" },
    ],
  },
];

// Type pour les positions sur la carte
interface ProjectLocation {
  id: string;
  name: string;
  area: string;
  x: number;
  y: number;
}

// Positions des chantiers sur la carte de Paris
const projectLocations: ProjectLocation[] = [
  { id: "buttes-chaumont", name: "Buttes-Chaumont", area: "19ème", x: 68, y: 25 },
  { id: "rocroy", name: "Rue de Rocroy", area: "10ème", x: 55, y: 32 },
  { id: "port-royal", name: "Port-Royal", area: "5ème", x: 48, y: 60 },
  { id: "la-tour", name: "Rue de la Tour", area: "16ème", x: 25, y: 45 },
  { id: "courbevoie-lalyre", name: "Rue Ernest Lalyre", area: "Courbevoie", x: 15, y: 20 },
];

export default function Realisations() {
  const location = useLocation();
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"completed" | "inProgress">("completed");

  // Détecter l'ancre #chantiers-en-cours dans l'URL
  useEffect(() => {
    if (location.hash === "#chantiers-en-cours") {
      setViewMode("inProgress");
      setSelectedAlbum(null);
    }
  }, [location.hash]);

  // Scroll to top when album is selected
  useEffect(() => {
    if (selectedAlbum) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedAlbum]);

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
          <div className="flex justify-center gap-4 flex-wrap">
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

      {/* Albums Grid - Only show for completed albums or when viewing a specific album */}
      {(viewMode === "completed" || selectedAlbum) && (
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
                  {viewMode === "inProgress" ? "Retour à la carte" : "Retour aux albums"}
                </button>

                {/* Album header */}
                <div className="mb-8">
                  <p className="text-sm text-wood font-medium mb-2">{selectedAlbum.location}</p>
                  <h2 className="font-display text-3xl font-semibold mb-4">{selectedAlbum.title}</h2>
                  <p className="text-muted-foreground max-w-3xl">{selectedAlbum.description}</p>
                  
                  {/* Avis client */}
                  {selectedAlbum.review && (
                    <motion.div 
                      className="mt-6 p-6 bg-accent/20 rounded-xl border border-border"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-sm text-wood font-medium mb-3">★★★★★ Avis du client</p>
                      <a 
                        href={selectedAlbum.review.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block hover:opacity-80 transition-opacity"
                      >
                        <blockquote className="font-display text-lg italic mb-3 text-foreground">
                          "{selectedAlbum.review.text}"
                        </blockquote>
                        <p className="text-wood font-semibold text-sm">— {selectedAlbum.review.author} <span className="underline ml-2">Voir sur Houzz →</span></p>
                      </a>
                    </motion.div>
                  )}
                  
                  {/* Liens Instagram */}
                  {(selectedAlbum.instagramLink || selectedAlbum.instagramLinks) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-4 flex flex-wrap gap-2"
                    >
                      {selectedAlbum.instagramLinks ? (
                        selectedAlbum.instagramLinks.map((link, index) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            Reel {index + 1}
                          </a>
                        ))
                      ) : (
                        <a
                          href={selectedAlbum.instagramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                          Voir le Reel Instagram
                        </a>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Photos/Videos grid */}
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
                      <div className="aspect-square overflow-hidden rounded-xl relative">
                        {photo.isVideo ? (
                          <>
                            <video 
                              src={photo.image} 
                              className="w-full h-full object-cover"
                              muted
                              playsInline
                              preload="metadata"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z"/>
                                </svg>
                              </div>
                            </div>
                          </>
                        ) : (
                          <img 
                            src={photo.image} 
                            alt={photo.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        )}
                      </div>
                      <p className="mt-2 text-sm font-medium truncate">{photo.title}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Navigation entre projets */}
                {(() => {
                  const currentIndex = currentAlbums.findIndex(a => a.id === selectedAlbum.id);
                  const prevAlbum = currentIndex > 0 ? currentAlbums[currentIndex - 1] : null;
                  const nextAlbum = currentIndex < currentAlbums.length - 1 ? currentAlbums[currentIndex + 1] : null;
                  
                  return (
                    <motion.div 
                      className="mt-12 pt-8 border-t border-border"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex justify-between items-center gap-4">
                        {prevAlbum ? (
                          <button
                            onClick={() => setSelectedAlbum(prevAlbum)}
                            className="flex items-center gap-3 px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-all group flex-1 max-w-xs"
                          >
                            <ChevronLeft className="w-5 h-5 text-wood group-hover:-translate-x-1 transition-transform" />
                            <div className="text-left">
                              <p className="text-xs text-muted-foreground">Projet précédent</p>
                              <p className="text-sm font-medium truncate">{prevAlbum.title}</p>
                            </div>
                          </button>
                        ) : (
                          <div className="flex-1 max-w-xs" />
                        )}
                        
                        {nextAlbum ? (
                          <button
                            onClick={() => setSelectedAlbum(nextAlbum)}
                            className="flex items-center gap-3 px-5 py-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-all group flex-1 max-w-xs justify-end"
                          >
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">Projet suivant</p>
                              <p className="text-sm font-medium truncate">{nextAlbum.title}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-wood group-hover:translate-x-1 transition-transform" />
                          </button>
                        ) : (
                          <div className="flex-1 max-w-xs" />
                        )}
                      </div>
                    </motion.div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      )}

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
              {selectedAlbum.photos[selectedPhotoIndex].isVideo ? (
                <video 
                  src={selectedAlbum.photos[selectedPhotoIndex].image} 
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <img 
                  src={selectedAlbum.photos[selectedPhotoIndex].image} 
                  alt={selectedAlbum.photos[selectedPhotoIndex].title}
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                />
              )}
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
              <Link to="/devis#devis-form">
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
