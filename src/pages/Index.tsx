import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Droplets, Hammer, Shield, Clock, CheckCircle2, Star, ArrowRight, Phone, Ruler, Palette, Award, Users } from "lucide-react";
import heroImage from "@/assets/hero-shower.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
const fadeInUp = {
  initial: {
    opacity: 0,
    y: 30
  },
  animate: {
    opacity: 1,
    y: 0
  },
  transition: {
    duration: 0.6
  }
};
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
const services = [{
  icon: Droplets,
  title: "Création complète",
  description: "Conception et réalisation sur mesure de votre douche à l'italienne"
}, {
  icon: Hammer,
  title: "Rénovation",
  description: "Transformation de votre salle de bain existante"
}, {
  icon: Shield,
  title: "Étanchéité",
  description: "Système d'étanchéité professionnel garanti 10 ans"
}, {
  icon: Palette,
  title: "Carrelage",
  description: "Pose de carrelage grand format et mosaïque"
}, {
  icon: Ruler,
  title: "Receveur",
  description: "Installation de receveurs extra-plats sur mesure"
}, {
  icon: Award,
  title: "Parois vitrées",
  description: "Parois et portes en verre trempé sur mesure"
}];
const process = [{
  step: "01",
  title: "Étude & Conseil",
  description: "Visite technique gratuite et étude de faisabilité"
}, {
  step: "02",
  title: "Conception",
  description: "Création de votre projet sur mesure avec choix des matériaux"
}, {
  step: "03",
  title: "Réalisation",
  description: "Pose professionnelle avec respect des normes"
}, {
  step: "04",
  title: "Finitions",
  description: "Finitions soignées et nettoyage complet du chantier"
}];
const advantages = [{
  icon: Ruler,
  title: "Sur mesure",
  description: "Chaque projet est unique et adapté à votre espace"
}, {
  icon: Shield,
  title: "Étanchéité garantie",
  description: "Système certifié avec garantie décennale"
}, {
  icon: Award,
  title: "Finitions haut de gamme",
  description: "Matériaux premium et pose experte"
}, {
  icon: Clock,
  title: "Respect des délais",
  description: "Planning précis et engagement de livraison"
}];
const testimonials = [{
  name: "Marie Dupont",
  location: "Paris 16ème",
  rating: 5,
  text: "Travail exceptionnel ! Notre salle de bain est transformée. L'équipe a été professionnelle du début à la fin."
}, {
  name: "Jean-Pierre Martin",
  location: "Neuilly-sur-Seine",
  rating: 5,
  text: "Nous avons fait appel à Atelier Douche Design pour une rénovation complète. Résultat impeccable, je recommande vivement."
}, {
  name: "Sophie Bernard",
  location: "Boulogne-Billancourt",
  rating: 5,
  text: "Très satisfaite de ma nouvelle douche à l'italienne. Qualité des finitions remarquable et équipe très à l'écoute."
}];
export default function Index() {
  return <Layout>
      {/* SEO Meta */}
      <title>Création de douches à l'italienne haut de gamme | Atelier Douche Design</title>
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${heroImage})`
      }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        </div>
        
        <div className="relative container-custom section-padding">
          <motion.div className="max-w-2xl text-primary-foreground" initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <motion.span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6" initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.2
          }}>
              Artisan spécialiste depuis plus de 15 ans
            </motion.span>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
              Création de douches à l'italienne
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Transformez votre salle de bain en un espace de bien-être avec une douche à l'italienne 
              sur mesure, alliant élégance, confort et qualité exceptionnelle.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="xl" asChild>
                <Link to="/devis">
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/realisations">Voir nos réalisations</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-stone">
        <div className="container-custom">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" {...fadeInUp} viewport={{
          once: true
        }} whileInView="animate" initial="initial">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Nos prestations
            </h2>
            <p className="text-muted-foreground text-lg">
              Une expertise complète pour créer la douche à l'italienne de vos rêves
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={stagger} initial="initial" whileInView="animate" viewport={{
          once: true
        }}>
            {services.map((service, index) => <motion.div key={index} className="card-elevated card-hover p-8" variants={fadeInUp}>
                <div className="w-14 h-14 rounded-2xl bg-accent/30 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-wood" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>)}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" {...fadeInUp} viewport={{
          once: true
        }} whileInView="animate" initial="initial">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Notre processus
            </h2>
            <p className="text-muted-foreground text-lg">
              De la conception à la réalisation, nous vous accompagnons à chaque étape
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => <motion.div key={index} className="relative text-center" initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }}>
                <div className="text-6xl font-display font-bold text-accent/50 mb-4">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                
                {index < process.length - 1 && <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent/50 to-transparent" />}
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" {...fadeInUp} viewport={{
          once: true
        }} whileInView="animate" initial="initial">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-primary-foreground/80 text-lg">Chez RénoveRMaSalleDeBain.COM

, nous sommes spécialisés dans la rénovation complète de salles de bain à Paris et en Île-de-France.
Nous réalisons des douches à l’italienne, des receveurs de douche, des baignoires, ainsi que l’ensemble des travaux de plomberie, d’étanchéité, de carrelage et de finitions.

Chaque projet est piloté par une maîtrise d’œuvre intégrée, afin de garantir la qualité technique, le respect du budget et la pérennité de votre salle de bain.
Que vous rénoviez un appartement haussmannien, un studio ou une salle de bain familiale, nous concevons des espaces élégants, fonctionnels et parfaitement étanches.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((item, index) => <motion.div key={index} className="text-center" initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }}>
                <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-primary-foreground/70">{item.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" {...fadeInUp} viewport={{
          once: true
        }} whileInView="animate" initial="initial">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Nos réalisations
            </h2>
            <p className="text-muted-foreground text-lg">
              Découvrez quelques-unes de nos créations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[gallery1, gallery2, gallery3].map((img, index) => <motion.div key={index} className="aspect-[4/5] rounded-2xl overflow-hidden" initial={{
            opacity: 0,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} whileHover={{
            scale: 1.02
          }}>
                <img src={img} alt={`Réalisation douche à l'italienne ${index + 1}`} className="w-full h-full object-cover" />
              </motion.div>)}
          </div>

          <div className="text-center">
            <Button variant="default" size="lg" asChild>
              <Link to="/realisations">
                Voir toutes nos réalisations
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-stone">
        <div className="container-custom">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" {...fadeInUp} viewport={{
          once: true
        }} whileInView="animate" initial="initial">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-muted-foreground text-lg">
              La satisfaction de nos clients est notre plus belle récompense
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <motion.div key={index} className="card-elevated p-8" initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-cta text-cta" />)}
                </div>
                <p className="text-foreground mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Zone d'intervention */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="card-elevated p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="font-display text-3xl font-semibold mb-4">
                Zone d'intervention
              </h2>
              <p className="text-muted-foreground text-lg mb-4">
                Nous intervenons sur Paris et toute l'Île-de-France : Paris (75), Hauts-de-Seine (92), 
                Seine-Saint-Denis (93), Val-de-Marne (94), Yvelines (78), Essonne (91), 
                Val-d'Oise (95) et Seine-et-Marne (77).
              </p>
              <p className="text-muted-foreground">
                Déplacement gratuit pour l'étude de votre projet.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="w-16 h-16 text-wood" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-padding bg-stone">
        <div className="container-custom">
          <motion.div className="text-center max-w-3xl mx-auto mb-12" {...fadeInUp} viewport={{
            once: true
          }} whileInView="animate" initial="initial">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Nos partenaires
            </h2>
            <p className="text-muted-foreground text-lg">
              Nous travaillons avec les meilleures marques du secteur
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { name: "Weber", url: "https://www.weber.fr" },
              { name: "Schlüter", url: "https://www.schluter.fr" },
              { name: "La Plateforme du Bâtiment", url: "https://www.laplateforme.com" },
              { name: "Leroy Merlin", url: "https://www.leroymerlin.fr" },
              { name: "MaSalleDeBain.com", url: "https://www.masalledebain.com" },
              { name: "Tots Democratick Design", url: "#" },
              { name: "Houzz", url: "https://www.houzz.fr" },
              { name: "Parquet-Carrelage.com", url: "https://www.parquet-carrelage.com" },
              { name: "Poalgi", url: "https://www.poalgi.com" },
            ].map((partner, index) => (
              <motion.a
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-elevated p-6 flex items-center justify-center h-24 hover:shadow-lg transition-shadow duration-300"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-display text-sm md:text-base font-semibold text-center text-primary/80 hover:text-primary transition-colors">
                  {partner.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary to-wood">
        <div className="container-custom text-center">
          <motion.div className="max-w-3xl mx-auto text-primary-foreground" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Prêt à transformer votre salle de bain ?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Contactez-nous dès maintenant pour une étude gratuite de votre projet. 
              Notre équipe vous accompagne de A à Z.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="xl" asChild>
                <Link to="/devis">
                  Demander un devis gratuit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <a href="tel:+33659764685">
                  <Phone className="w-5 h-5 mr-2" />
                  06 59 76 46 85
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>;
}