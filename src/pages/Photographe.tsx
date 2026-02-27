import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { Camera, Phone, Globe, MapPin, Star, ArrowRight, ExternalLink, Award, Building, Home, Eye } from "lucide-react";
import stephaneVasco from "@/assets/stephane-vasco.png";

const specialties = [
  {
    icon: Home,
    title: "Architecture d'intérieur",
    description: "Mise en valeur des espaces rénovés avec un éclairage professionnel et des angles soignés."
  },
  {
    icon: Building,
    title: "Immobilier",
    description: "Photographie haute définition pour valoriser les biens immobiliers sur le marché."
  },
  {
    icon: Eye,
    title: "Visites virtuelles",
    description: "Technologie Matterport pour des visites immersives à 360° de vos projets."
  },
  {
    icon: Camera,
    title: "Reportages chantier",
    description: "Documentation Avant/Après pour immortaliser chaque transformation."
  }
];

export default function Photographe() {
  return (
    <Layout>
      <OGTags
        title="Stéphane Vasco – Notre photographe partenaire"
        description="Stéphane Vasco, photographe professionnel partenaire de renovermasalledebain.com. Photographie d'architecture, immobilier et visites virtuelles Matterport."
        path="/photographe"
      />
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
            <span className="inline-block px-4 py-2 rounded-full bg-white border border-border text-primary text-sm font-medium mb-6">
              Notre photographe partenaire
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6 text-primary">
              Stéphane Vasco
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Photographe professionnel spécialisé en architecture et décoration d'intérieur depuis 2010. 
              Partenaire exclusif de renovermasalledebain.com pour immortaliser vos transformations.
            </p>
            <div className="flex items-center gap-2 text-accent">
              <Star className="w-5 h-5 fill-accent" />
              <span className="font-medium">+ de 1 000 avis 5 étoiles sur Houzz</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl font-semibold mb-6">
                  L'œil derrière nos albums
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Tous les albums de réalisations que vous découvrez sur notre site sont l'œuvre de 
                  <strong className="text-foreground"> Stéphane Vasco</strong>. Depuis plusieurs années, 
                  il nous accompagne sur chaque chantier pour capturer l'essence de nos transformations.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Son travail minutieux immortalise l'état "Avant" de votre salle de bain, puis revient 
                  à la fin des travaux pour un shooting "Après" professionnel. Ces photos deviennent 
                  votre plus beau souvenir — témoins de l'aventure que nous avons vécue ensemble.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://www.stephanevasco.fr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="cta">
                      <Globe className="w-4 h-4 mr-2" />
                      Visiter son site
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  <a href="tel:0667986450">
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      06 67 98 64 50
                    </Button>
                  </a>
                </div>
              </div>
              
              <motion.div 
                className="bg-primary rounded-2xl p-8 text-primary-foreground"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-white/30 flex items-center justify-center">
                    <Camera className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">Stéphane Vasco</h3>
                    <p className="text-primary-foreground/80">Photographe depuis 2010</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: '#C9B575' }} />
                    <span>Île-de-France (Bessancourt 95 / Colombes 92)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 flex-shrink-0" style={{ color: '#C9B575' }} />
                    <a href="tel:0667986450" className="transition-colors hover:opacity-80">
                      06 67 98 64 50
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 flex-shrink-0" style={{ color: '#C9B575' }} />
                    <a 
                      href="https://www.stephanevasco.fr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="transition-colors hover:opacity-80"
                    >
                      www.stephanevasco.fr
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 flex-shrink-0" style={{ color: '#C9B575' }} />
                    <a 
                      href="https://www.houzz.fr/professionnels/photographe/stephane-vasco-pfvwfr-pf~2115748756" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="transition-colors hover:opacity-80"
                    >
                      Portfolio Houzz (57 projets)
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photos en action */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Stéphane en action
            </h2>
            <p className="text-muted-foreground text-lg">
              Sur nos chantiers, Stéphane déploie tout son savoir-faire pour capturer chaque détail
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div 
              className="overflow-hidden rounded-2xl shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src={stephaneVasco} 
                alt="Stéphane Vasco en plein shooting dans une cuisine rénovée" 
                className="w-full h-80 object-cover object-top"
              />
            </motion.div>
            <motion.div 
              className="overflow-hidden rounded-2xl shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <img 
                src={stephaneVasco} 
                alt="Stéphane Vasco préparant son trépied pour un reportage photo" 
                className="w-full h-80 object-cover object-top"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="section-padding bg-stone">
        <div className="container-custom">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Ses spécialités
            </h2>
            <p className="text-muted-foreground text-lg">
              Un expert polyvalent pour tous vos besoins en photographie professionnelle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => (
              <motion.div 
                key={index}
                className="card-elevated card-hover p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white border border-border flex items-center justify-center mx-auto mb-4">
                  <specialty.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{specialty.title}</h3>
                <p className="text-muted-foreground text-sm">{specialty.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <blockquote className="font-display text-xl md:text-2xl italic mb-8">
              "Chaque rénovation raconte une histoire. Mon rôle est de capturer cette transformation 
              pour en faire un souvenir intemporel. Travailler avec Qualirenovation, c'est immortaliser 
              des projets où le savoir-faire artisanal rencontre l'excellence."
            </blockquote>
            <p className="font-semibold" style={{ color: '#C9B575' }}>— Stéphane Vasco, Photographe</p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-elevated p-8 text-center">
                <h3 className="font-display text-xl font-semibold mb-4">
                  Besoin d'un photographe ?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Contactez directement Stéphane pour vos projets de photographie 
                  d'architecture ou d'immobilier.
                </p>
                <a 
                  href="https://www.stephanevasco.fr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full">
                    Contacter Stéphane Vasco
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
              
              <div className="card-elevated p-8 text-center bg-accent/10">
                <h3 className="font-display text-xl font-semibold mb-4">
                  Envie de voir son travail ?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Découvrez nos albums de réalisations — tous photographiés par 
                  Stéphane Vasco.
                </p>
                <Button variant="cta" className="w-full" asChild>
                  <Link to="/realisations">
                    Voir nos réalisations
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
