import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { X, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// Saint-Mandé
import stMande1 from "@/assets/st-mande-1.jpg";
import stMande2 from "@/assets/st-mande-2.jpg";
import stMande3 from "@/assets/st-mande-3.jpg";

// Charonne - WC bleu
import charonne1 from "@/assets/charonne-1.jpg";

// Carina Nahmani - Article Maître d'œuvre
import carinaNahmani from "@/assets/carina-nahmani-1.jpg";

// Elle Magazine
import presseElleWc from "@/assets/presse-elle-wc-suspendus.jpg";

// Marie Claire Maison
import presseMarieClaireApres from "@/assets/presse-marie-claire-1.jpg";
import presseMarieClaireAvant from "@/assets/presse-marie-claire-2.jpg";
import presseMarieClaireAdresses from "@/assets/presse-marie-claire-adresses.png";
import presseHouzzSoisy from "@/assets/presse-houzz-soisy.png";
import presseHouzzBois from "@/assets/presse-houzz-bois.jpg";
import presse18h39Joints from "@/assets/guide-joint-noir.webp";
import presseElleSoisy from "@/assets/presse-elle-soisy.jpg";

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
  instagramLink?: string;
  externalLink?: string;
  source?: string;
  publishDate?: string;
  journalist?: string;
}

const presseAlbums: Album[] = [
  // Octobre 2025 - Elle salle de bains pour deux
  {
    id: "presse-elle-soisy",
    title: "Les astuces des architectes pour aménager une salle de bains pour deux",
    location: "Soisy-sous-Montmorency (95)",
    description: "Notre projet de salle de bains parentale à Soisy-sous-Montmorency est à nouveau mis à l'honneur dans Elle Déco. Les architectes partagent leurs astuces pour aménager une salle de bains fonctionnelle et élégante pour deux personnes. Zellige bleu en chevron, robinetterie noire et plan vasque en bois : un agencement pensé pour le quotidien.",
    coverImage: presseElleSoisy,
    externalLink: "https://www.elle.fr/Deco/Pieces/Salle-de-bain/Les-astuces-des-architectes-pour-amenager-une-salle-de-bains-pour-deux",
    source: "Elle Décoration",
    publishDate: "17 octobre 2025",
    journalist: "Cyrine Ben Romdhane",
    photos: [
      { id: 1, image: presseElleSoisy, title: "SDB parentale Soisy", description: "Zellige bleu, robinetterie noire et plan bois" },
    ],
  },
  // Février 2018 - Interview 18h39
  {
    id: "presse-18h39-joints",
    title: "Joints de couleur : comment mettre en valeur votre carrelage",
    location: "Interview 18h39",
    description: "Depuis longtemps, Carina Nahmani est une référence dans le monde de la rénovation. Découvrez son interview exclusive pour 18h39, média de référence en tendances déco. Un sujet passionnant sur les joints de carrelage colorés : longtemps considérés comme purement techniques, ils deviennent un véritable levier esthétique. Couleur, contraste ou continuité — bien choisis, ils subliment le carrelage et structurent l'espace.",
    coverImage: presse18h39Joints,
    externalLink: "https://www.18h39.fr/inspiration-maison/tendances-deco/idee-deco-optez-pour-des-joints-de-couleurs-pour-mettre-en-valeur-votre-carrelage.html",
    source: "18h39",
    publishDate: "6 février 2018",
    journalist: "Pauline Delcourt",
    photos: [
      { id: 1, image: presse18h39Joints, title: "Joints colorés", description: "L'art du détail qui fait toute la différence" },
    ],
  },
  // Décembre 2017 - Toilettes suspendues 18h39
  {
    id: "presse-18h39-wc-suspendus",
    title: "Comment installer des toilettes suspendues : on vous explique tout",
    location: "Chantiers Darcet & Rue Bièvre",
    description: "Toilettes suspendues : l'expertise terrain en rénovation. Dans cet article de 18h39, plusieurs de nos réalisations mettent en lumière notre savoir-faire en rénovation, avec l'expertise de Carina Nahmani, maître d'œuvre, notamment sur l'analyse du système d'évacuation — une étape clé pour des travaux durables et maîtrisés. Les chantiers Darcet et Rue Bièvre sont mis à l'honneur.",
    coverImage: charonne1,
    externalLink: "https://www.18h39.fr/travaux-avant-apres/transformer-espace-chez-soi/comment-installer-des-toilettes-suspendues-vous-explique-tout.html",
    source: "18h39",
    publishDate: "27 décembre 2017",
    journalist: "Matthieu M.",
    photos: [
      { id: 1, image: charonne1, title: "Toilettes suspendues", description: "Chantiers Darcet & Rue Bièvre mis à l'honneur" },
    ],
  },
  // Janvier 2025
  {
    id: "presse-houzz-soisy",
    title: "Avant/Après : À Soisy, une maison de maître 1900 rénovée de A à Z",
    location: "Soisy-sous-Montmorency (95)",
    description: "Découvrez la transformation complète d'une maison de maître datant de 1900 à Soisy-sous-Montmorency. Un chantier d'envergure incluant deux salles de bain exceptionnelles mises en avant dans cet article : celle du 1er étage avec zellige bleu en chevron, et celle du 2ème étage pour les enfants avec terrazzo hexagonal et robinetterie dorée.",
    coverImage: presseHouzzSoisy,
    externalLink: "https://www.houzz.fr/magazine/avant-apres-a-soisy-une-maison-de-maitre-1900-renovee-de-a-a-z-stsetivw-vs~176073945",
    source: "Houzz",
    publishDate: "Janvier 2025",
    journalist: "Agnès Carpentier",
    photos: [
      { id: 1, image: presseHouzzSoisy, title: "SDB 2ème étage — Enfants", description: "Terrazzo hexagonal et robinetterie dorée" },
    ],
  },
  // Janvier 2025
  {
    id: "presse-st-mande",
    title: "Conseils d'artisans : comment faire des économies de gaz",
    location: "Saint-Mandé (94)",
    description: "Notre expertise mise en avant dans un article Houzz sur les économies d'énergie.",
    coverImage: stMande1,
    externalLink: "https://www.houzz.fr/magazine/conseils-d-artisans-comment-faire-des-economies-de-gaz-stsetivw-vs~164524740",
    source: "Houzz",
    publishDate: "Janvier 2025",
    journalist: "Agnès Carpentier",
    photos: [
      { id: 1, image: stMande1, title: "Projet vedette", description: "Rénovation Saint-Mandé" },
      { id: 2, image: stMande2, title: "Détails", description: "Finitions soignées" },
      { id: 3, image: stMande3, title: "Vue complète", description: "Transformation réussie" },
    ],
  },
  // Novembre 2024
  {
    id: "presse-marie-claire-adresses",
    title: "La rénovation d'intérieur avec transparence et expertise",
    location: "Marie Claire Maison",
    description: "Société spécialisée dans la rénovation d'intérieur en Île-de-France, QualiRénovation by QualiConcept compte sur le travail pointilleux de ses artisans et fait preuve d'une grande transparence auprès de ses clients pour mener à bien ses projets.",
    coverImage: presseMarieClaireAdresses,
    externalLink: "http://adresses-incontournables-maison.marieclaire.fr/dossier/qualirenovation-by-qualiconcept/",
    source: "Marie Claire Maison × Médias France",
    publishDate: "Novembre 2024",
    journalist: "Rédaction Marie Claire",
    photos: [
      { id: 1, image: presseMarieClaireAdresses, title: "QualiRénovation", description: "Adresse incontournable Marie Claire Maison" },
    ],
  },
  // Octobre 2022
  {
    id: "presse-maitre-oeuvre",
    title: "Pourquoi est-il judicieux de faire appel à un maître d'œuvre ?",
    location: "Interview Houzz",
    description: "Découvrez le rôle du maître d'œuvre, l'interlocuteur privilégié pour des travaux bien réalisés, sans retard ni tension. Interview de Carina Nahmani, maître d'œuvre chez QualiRénovation.",
    coverImage: carinaNahmani,
    externalLink: "https://www.houzz.fr/magazine/pourquoi-est-il-judicieux-de-faire-appel-a-un-maitre-d-oeuvre-stsetivw-vs~87724005",
    source: "Houzz",
    publishDate: "Octobre 2022",
    journalist: "Agnès Carpentier",
    photos: [
      { id: 1, image: carinaNahmani, title: "Carina Nahmani", description: "Maître d'œuvre chez QualiRénovation" },
    ],
  },
  // Juin 2022
  {
    id: "presse-elle-wc",
    title: "Toilettes suspendues : transformer ses WC en espace déco",
    location: "Elle Déco",
    description: "Notre projet de WC avec carrelage graphique noir et blanc et zellige anthracite mis en avant dans le magazine Elle Décoration.",
    coverImage: presseElleWc,
    externalLink: "https://www.elle.fr/Deco/Pratique/Amenagement/Toilettes-suspendues-comment-transformer-ses-WC-en-espace-deco",
    source: "Elle Décoration × Houzz",
    publishDate: "Juin 2022",
    journalist: "Cécile Debise",
    photos: [
      { id: 1, image: presseElleWc, title: "WC suspendus design", description: "Zellige anthracite et carreaux de ciment graphiques" },
    ],
  },
  // Juillet 2021
  {
    id: "presse-marie-claire",
    title: "Une salle de bains contemporaine",
    location: "Paris",
    description: "Transformation d'une salle de bain datée en espace contemporain avec robinetterie noire, paroi verrière industrielle et carrelage blanc lumineux. Article réalisé en partenariat avec Houzz.fr.",
    coverImage: presseMarieClaireApres,
    externalLink: "https://www.marieclaire.fr/photo/1357704/3119092/une-salle-de-bains-contemporaine",
    source: "Marie Claire Maison × Houzz",
    publishDate: "Juillet 2021",
    journalist: "Rédaction Marie Claire",
    photos: [
      { id: 1, image: presseMarieClaireApres, title: "Après — Salle de bain contemporaine", description: "Robinetterie noire, paroi verrière et zellige blanc" },
      { id: 2, image: presseMarieClaireAvant, title: "Avant — État initial", description: "Salle de bain à rénover" },
    ],
  },
  // 2021
  {
    id: "presse-houzz-bois",
    title: "Photothèque : 50 salles de bains réchauffées grâce au bois",
    location: "Houzz France",
    description: "La salle de bains fait partie des pièces les plus rénovées par les Français avec la chambre et la cuisine, selon les résultats d'une étude Houzz. Nombreux sont ceux qui souhaitent transformer les lieux en un havre de paix dédié à la détente, inspiré des spas et hôtels. Le bois se place ainsi en matériau de référence pour apporter de la chaleur, une touche de nature ou donner un esprit zen à la salle de bains.",
    coverImage: presseHouzzBois,
    externalLink: "https://www.houzz.fr/magazine/phototheque-50-salles-de-bains-rechauffees-grace-au-bois-stsetivw-vs~121061583",
    source: "Houzz",
    publishDate: "2021",
    journalist: "Rédaction Houzz",
    photos: [
      { id: 1, image: presseHouzzBois, title: "Salle de bain bois", description: "Carrelage effet bois et ambiance zen" },
    ],
  },
  // Avril 2019
  {
    id: "presse-houzz-trois-pieces",
    title: "Un trois-pièces de 54 m² rafraîchi pour 25 000 €",
    location: "Paris",
    description: "Focus salle de bain : cette rénovation complète a fait l'objet de deux articles distincts — le WC chez Elle Décoration et la salle de bain chez Marie Claire Maison. Une transformation remarquée par la presse déco.",
    coverImage: presseMarieClaireApres,
    externalLink: "https://www.houzz.fr/magazine/avant-apres-un-trois-pieces-de-54-m%C2%B2-rafraichi-pour-25-000-eur-stsetivw-vs~92733439",
    source: "Houzz",
    publishDate: "Avril 2019",
    journalist: "Agnès Carpentier",
    photos: [
      { id: 1, image: presseMarieClaireApres, title: "Après — Salle de bain contemporaine", description: "Robinetterie noire, paroi verrière et zellige blanc" },
      { id: 2, image: presseMarieClaireAvant, title: "Avant — État initial", description: "Salle de bain à rénover" },
      { id: 3, image: presseElleWc, title: "Après — WC design", description: "Zellige anthracite et carreaux de ciment graphiques" },
    ],
  },
];

export default function Presse() {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const handleNextPhoto = () => {
    if (selectedAlbum) {
      setSelectedPhotoIndex((prev) => 
        prev < selectedAlbum.photos.length - 1 ? prev + 1 : 0
      );
    }
  };

  const handlePrevPhoto = () => {
    if (selectedAlbum) {
      setSelectedPhotoIndex((prev) => 
        prev > 0 ? prev - 1 : selectedAlbum.photos.length - 1
      );
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              📰 Presse & Médias
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-balance">
              Nos projets dans les médias
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos réalisations mises en avant sur les réseaux sociaux et dans la presse spécialisée.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full">
              <span className="text-2xl font-bold">{presseAlbums.length}</span>
              <span className="text-sm font-medium">articles de presse</span>
            </div>
          </motion.div>
        </div>
      </section>

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
                {presseAlbums.map((album, index) => (
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
                        <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          {album.source || "📰 Presse"}
                        </div>
                        {album.publishDate && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-foreground text-xs font-medium rounded-full">
                            {album.publishDate}
                          </div>
                        )}
                        <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white text-xs font-medium rounded-full">
                          {album.photos.length} photo{album.photos.length > 1 ? "s" : ""}
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-sm text-primary font-medium mb-2">{album.location}</p>
                        <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {album.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {album.description}
                        </p>
                        {album.journalist && (
                          <p className="text-xs text-muted-foreground mt-2 italic">
                            Par {album.journalist}
                          </p>
                        )}
                        {album.instagramLink && (
                          <a 
                            href={album.instagramLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Voir sur Instagram
                          </a>
                        )}
                        {album.externalLink && (
                          <a 
                            href={album.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 mt-3 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Lire l'article
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="photos"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Back button */}
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-8"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Retour aux albums
                </button>

                {/* Album header */}
                <div className="mb-8">
                  <p className="text-sm text-primary font-medium mb-2">{selectedAlbum.location}</p>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
                    {selectedAlbum.title}
                  </h2>
                  <p className="text-muted-foreground max-w-3xl">
                    {selectedAlbum.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {selectedAlbum.externalLink && (
                      <a 
                        href={selectedAlbum.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Lire l'article
                      </a>
                    )}
                    {selectedAlbum.instagramLink && (
                      <a 
                        href={selectedAlbum.instagramLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-sm font-medium hover:from-pink-600 hover:to-purple-700 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Voir sur Instagram
                      </a>
                    )}
                  </div>
                </div>

                {/* Photos grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedAlbum.photos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedPhotoIndex(index)}
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-xl">
                        <img 
                          src={photo.image} 
                          alt={photo.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="mt-3">
                        <h4 className="font-medium">{photo.title}</h4>
                        <p className="text-sm text-muted-foreground">{photo.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedAlbum && selectedPhotoIndex >= 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedPhotoIndex(-1)}
          >
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-50"
              onClick={() => setSelectedPhotoIndex(-1)}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-50 p-2"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevPhoto();
              }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-50 p-2"
              onClick={(e) => {
                e.stopPropagation();
                handleNextPhoto();
              }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="max-w-5xl max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedAlbum.photos[selectedPhotoIndex >= 0 ? selectedPhotoIndex : 0]?.image}
                alt={selectedAlbum.photos[selectedPhotoIndex >= 0 ? selectedPhotoIndex : 0]?.title}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white font-semibold text-lg">
                  {selectedAlbum.photos[selectedPhotoIndex >= 0 ? selectedPhotoIndex : 0]?.title}
                </h3>
                <p className="text-white/80 text-sm">
                  {selectedAlbum.photos[selectedPhotoIndex >= 0 ? selectedPhotoIndex : 0]?.description}
                </p>
                <p className="text-white/60 text-xs mt-2">
                  {selectedPhotoIndex + 1} / {selectedAlbum.photos.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Vous êtes journaliste ?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Pour toute demande de reproduction de photos ou interview, contactez-nous par email.
            </p>
            <Button 
              variant="secondary" 
              size="lg" 
              asChild 
              className="bg-white text-primary hover:bg-white/90"
            >
              <a href="mailto:gestion@qualiconcept.fr">
                Contactez-nous
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
