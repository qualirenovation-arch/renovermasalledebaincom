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

type Category = "all" | "petite" | "grande" | "moderne" | "pierre" | "avant-apres";

interface Project {
  id: number;
  image: string;
  title: string;
  description: string;
  category: Category[];
  details: string;
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
    category: ["moderne", "grande"],
    details: "Douche à l'italienne avec paroi vitrée profilé laiton doré, carrelage effet marbre onyx, niche intégrée et robinetterie dorée assortie. Meuble vasque en noyer avec poignées dorées.",
  },
  {
    id: 8,
    image: gallery8,
    title: "Suite dorée contemporaine",
    description: "Appartement parisien - Paris 10ème",
    category: ["moderne", "grande"],
    details: "Salle de bain complète avec douche à l'italienne, miroir ovale encadré laiton, robinetterie dorée haut de gamme et éclairage LED intégré. Finitions soignées en ton sur ton beige et or.",
  },
  {
    id: 9,
    image: gallery9,
    title: "Robinetterie laiton sur onyx",
    description: "Détail finitions - Paris 10ème",
    category: ["moderne", "pierre"],
    details: "Gros plan sur la robinetterie encastrée en laiton brossé doré avec douchette sur barre. Carrelage effet marbre onyx aux veines rosées. Banc d'angle intégré avec bord arrondi.",
  },
  {
    id: 10,
    image: gallery10,
    title: "Ciel de pluie doré",
    description: "Douche luxe - Paris 10ème",
    category: ["moderne", "grande"],
    details: "Grande douche de pluie plafond en laiton doré combinée à une douchette à main. Paroi vitrée avec profilés dorés, niche de rangement intégrée et carrelage grand format effet onyx.",
  },
];

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "petite", label: "Petites salles de bain" },
  { id: "grande", label: "Grandes salles de bain" },
  { id: "moderne", label: "Style moderne" },
  { id: "pierre", label: "Pierre naturelle" },
  { id: "avant-apres", label: "Avant / Après" },
];

export default function Realisations() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category.includes(activeCategory));

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
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explorez notre galerie de projets réalisés et laissez-vous inspirer 
              pour votre future douche à l'italienne.
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

          {/* Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                    <div className="aspect-[4/5] overflow-hidden">
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