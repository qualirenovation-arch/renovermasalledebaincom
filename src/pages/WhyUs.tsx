import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { MessageSquare, Palette, Diamond, Hammer, Shield, Headphones, Check, X, ArrowRight, ClipboardCheck, UserCheck, Handshake, Lightbulb, Home } from "lucide-react";
const benefits = [{
  icon: ClipboardCheck,
  title: "Maître d'œuvre dès le 1er RDV",
  description: "Dès notre première rencontre, une technicienne se déplace pour réaliser une analyse de faisabilité complète et vous présenter tous les plans possibles pour votre projet."
}, {
  icon: UserCheck,
  title: "Visite technique gratuite",
  description: "Une technicienne qualifiée vient chez vous pour étudier votre espace, prendre les mesures et vous expliquer toutes les options envisageables."
}, {
  icon: MessageSquare,
  title: "Conseil personnalisé",
  description: "Une étude gratuite de votre projet avec des conseils sur mesure. Nous analysons votre espace, vos besoins et vos envies pour vous proposer la solution idéale."
}, {
  icon: Palette,
  title: "Design sur mesure",
  description: "Chaque projet est unique. Nous concevons votre douche à l'italienne selon vos goûts, votre style de vie et les contraintes de votre espace."
}, {
  icon: Diamond,
  title: "Matériaux premium",
  description: "Nous sélectionnons les meilleurs matériaux auprès de fournisseurs reconnus : carrelages haut de gamme, robinetterie de qualité, verre trempé."
}, {
  icon: Hammer,
  title: "Pose experte",
  description: "Nos artisans qualifiés maîtrisent les techniques les plus avancées. Chaque pose est réalisée dans les règles de l'art pour un résultat impeccable."
}, {
  icon: Shield,
  title: "Étanchéité garantie",
  description: "Notre système d'étanchéité certifié vous protège pendant 10 ans. Aucun compromis sur la qualité de l'imperméabilisation."
}, {
  icon: Headphones,
  title: "Service après-vente",
  description: "Une équipe disponible pour répondre à toutes vos questions après la livraison. Nous restons à vos côtés pour garantir votre satisfaction."
}];
const comparison = [{
  feature: "Étude personnalisée gratuite",
  us: true,
  others: false
}, {
  feature: "Garantie décennale",
  us: true,
  others: true
}, {
  feature: "Garantie étanchéité 10 ans",
  us: true,
  others: false
}, {
  feature: "Matériaux certifiés",
  us: true,
  others: false
}, {
  feature: "Artisans formés en continu",
  us: true,
  others: false
}, {
  feature: "Prix ferme et définitif",
  us: true,
  others: false
}, {
  feature: "Respect strict des délais",
  us: true,
  others: false
}, {
  feature: "Nettoyage complet du chantier",
  us: true,
  others: false
}, {
  feature: "Suivi après livraison",
  us: true,
  others: false
}];
export default function WhyUs() {
  return <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-stone" />
        <div className="relative container-custom">
          <motion.div className="max-w-3xl" initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }}>
            <span className="inline-block px-4 py-2 rounded-full bg-accent/30 text-wood text-sm font-medium mb-6">
              Pourquoi nous choisir
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6">
              La différence avec renovermasalledebain.com  
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">Découvrez pourquoi les  clients nous font confiance pour renover leur salle de bain</p>
          </motion.div>
        </div>
      </section>

      {/* Co-construction Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-8">
              <Handshake className="w-10 h-10 text-accent" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Le projet, on le construit ensemble
            </h2>
            <p className="text-xl leading-relaxed text-primary-foreground/90 mb-8">
              Pour s'adapter à votre mode de vie et vous apporter les solutions techniques 
              qui vont améliorer votre vision du projet et rendre votre espace encore plus confortable.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <motion.div 
                className="bg-primary-foreground/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center mx-auto mb-4">
                  <Home className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">Adapté à votre vie</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Nous étudions vos habitudes quotidiennes pour créer un espace parfaitement adapté à votre rythme de vie.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-primary-foreground/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">Solutions techniques</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Notre expertise nous permet de proposer des solutions innovantes qui subliment votre projet initial.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-primary-foreground/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center mx-auto mb-4">
                  <Diamond className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">Confort optimal</h3>
                <p className="text-primary-foreground/80 text-sm">
                  Chaque détail est pensé pour maximiser votre confort et votre bien-être au quotidien.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Receveur de douche et baignoire
            </h2>
            <p className="text-muted-foreground text-lg">
              Des avantages concrets pour un résultat exceptionnel
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => <motion.div key={index} className="card-elevated card-hover p-8" initial={{
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
                <div className="w-14 h-14 rounded-2xl bg-accent/30 flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-wood" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-stone">
        <div className="container-custom">
          <motion.div className="text-center max-w-3xl mx-auto mb-16" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Nous vs entreprises standards
            </h2>
            <p className="text-muted-foreground text-lg">
              Comparez nos services avec ceux d'une entreprise classique
            </p>
          </motion.div>

          <motion.div className="max-w-4xl mx-auto" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <div className="card-elevated overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 bg-primary text-primary-foreground p-4 font-semibold">
                <div>Caractéristique</div>
                <div className="text-center">Atelier Douche Design</div>
                <div className="text-center">Entreprises standards</div>
              </div>
              
              {/* Rows */}
              {comparison.map((row, index) => <div key={index} className={`grid grid-cols-3 p-4 items-center ${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                  <div className="text-foreground">{row.feature}</div>
                  <div className="flex justify-center">
                    {row.us ? <div className="w-8 h-8 rounded-full bg-cta/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-cta" />
                      </div> : <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                        <X className="w-5 h-5 text-destructive" />
                      </div>}
                  </div>
                  <div className="flex justify-center">
                    {row.others ? <div className="w-8 h-8 rounded-full bg-cta/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-cta" />
                      </div> : <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                        <X className="w-5 h-5 text-destructive" />
                      </div>}
                  </div>
                </div>)}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div className="max-w-4xl mx-auto text-center" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <a 
              href="https://www.houzz.fr/viewReview/2101062/qualirenovation-by-qualiconcept-review" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity"
            >
              <blockquote className="font-display text-xl md:text-2xl italic mb-8">
                "Je recommande fortement Carina pour son professionnalisme et sa bonne humeur qui est un véritable plus pour le client stressé par ses travaux. Sa réactivité a été top. C'est un vrai plaisir de collaborer avec Carina. Le client se sent rassuré, soutenu et compris."
              </blockquote>
              <p className="text-accent font-semibold">— Cecile J. <span className="underline ml-2">Voir sur Houzz →</span></p>
            </a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div className="max-w-2xl mx-auto" initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Convaincu par notre approche ?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Contactez-nous pour une étude gratuite de votre projet. 
              Nous vous répondons sous 24h.
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
    </Layout>;
}