import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { Star, ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { albums } from "@/data/albumsData";
import { Helmet } from "react-helmet-async";

// Récupérer tous les albums qui ont un avis
const albumsWithReviews = albums.filter(album => album.review);

export default function Avis() {
  return (
    <Layout>
      <Helmet>
        <title>Avis clients vérifiés | RenoverMaSalleDeBain.com</title>
        <meta name="description" content="Découvrez les avis vérifiés par Houzz de nos clients. Plus de 40 avis 5 étoiles pour nos rénovations de salles de bain à Paris et Île-de-France." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-stone to-background">
        <div className="container-custom">
          <ScrollAnimation className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-wood text-wood" />
              ))}
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Avis <span className="italic font-normal text-gold">clients</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-6">
              Ce que nos clients disent de leur rénovation
            </p>
            
            {/* Badge Houzz vérifiés */}
            <div className="inline-flex items-center gap-2 bg-accent/30 px-4 py-2 rounded-full border border-border">
              <CheckCircle2 className="w-5 h-5 text-wood" />
              <span className="text-sm font-medium">Avis vérifiés par Houzz</span>
              <a 
                href="https://www.houzz.fr/pro/qualirenovation/qualirenovation-by-qualiconcept" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors ml-1"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Section Témoignages Vidéo */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5">
        <div className="container-custom">
          <ScrollAnimation className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">
              Mieux que tous les modérateurs, nos clients parlent de nous en vidéo
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les témoignages authentiques de nos clients qui partagent leur expérience de rénovation.
            </p>
          </ScrollAnimation>

          <div className="flex flex-wrap justify-center gap-4">
            {/* Convention Paris 15 */}
            <motion.a
              href="https://www.instagram.com/p/DMDuJCPswLQ/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <div className="text-left">
                <p className="font-semibold">Paris 15ème - Convention</p>
                <p className="text-sm text-white/80">Témoignage client vidéo</p>
              </div>
              <ExternalLink className="w-5 h-5 ml-2" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Liste des avis */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {albumsWithReviews.map((album, index) => (
              <motion.article
                key={album.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl border border-border/50 p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-gold/30 transition-all duration-300"
              >
                {/* Étoiles et projet */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-wood text-wood" />
                      ))}
                    </div>
                    <h2 className="font-display text-lg font-semibold text-foreground">
                      {album.location}
                    </h2>
                  </div>
                  
                  {/* Badge vérifié */}
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-wood" />
                      Vérifié
                    </span>
                  </div>
                </div>

                {/* Texte de l'avis */}
                <blockquote className="text-foreground/90 italic leading-relaxed mb-4">
                  "{album.review!.text}"
                </blockquote>

                {/* Auteur */}
                <p className="text-sm text-muted-foreground mb-4">
                  — {album.review!.author}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/50">
                  <Link 
                    to={`/realisations/${album.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Découvrir ce projet
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  
                  <a 
                    href={album.review!.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Voir sur Houzz
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Lien vers tous les avis Houzz */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="bg-accent/20 rounded-2xl p-8 md:p-10 border border-border/50 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-wood text-wood" />
                ))}
              </div>
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-3">
                Retrouvez plus de 40 avis sur Houzz
              </h3>
              <p className="text-muted-foreground mb-6">
                Consultez l'ensemble de nos avis clients vérifiés directement sur notre profil Houzz professionnel.
              </p>
              <a
                href="https://www.houzz.fr/pro/qualirenovation/qualirenovation-by-qualiconcept"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#296189] hover:bg-[#1e4a66] text-white font-medium px-6 py-3 rounded-full transition-colors shadow-md hover:shadow-lg"
              >
                Voir tous les avis sur Houzz
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-stone">
        <div className="container-custom">
          <ScrollAnimation className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              Rejoignez nos clients satisfaits
            </h2>
            <p className="text-muted-foreground mb-8">
              Demandez votre devis gratuit et bénéficiez d'un accompagnement personnalisé pour votre projet de rénovation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="cta" size="lg" asChild>
                <Link to="/devis#devis-form">
                  Demander un devis gratuit
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/realisations">
                  Voir toutes nos réalisations
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </Layout>
  );
}
