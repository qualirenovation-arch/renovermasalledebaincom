import { Layout } from "@/components/layout/Layout";
import micLogo from "@/assets/logos/mic-insurance.jpg";

export default function MentionsLegales() {
  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8">
            Mentions légales
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* Éditeur du site */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Éditeur du site
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Le site <strong>RénoverMaSalleDeBain.com</strong> est édité par :
              </p>
              <ul className="list-none space-y-2 text-muted-foreground mt-4">
                <li><strong>Raison sociale :</strong> QUALICONCEPT</li>
                <li><strong>Forme juridique :</strong> SARL</li>
                <li><strong>Siège social :</strong> 6 rue d'Armaillé, 75017 Paris, France</li>
                <li><strong>Téléphone :</strong> 06 59 76 46 85</li>
                <li><strong>Email :</strong> gestion@qualiconcept.fr</li>
                <li><strong>SIREN :</strong> 852 867 282</li>
              </ul>
            </section>

            {/* Directeur de publication */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Directeur de la publication
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Carina Nahmani, en qualité de gérante de QualiRénovation by QualiConcept.
              </p>
            </section>

            {/* Hébergement */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Hébergement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Le site RénoverMaSalleDeBain.com est hébergé par :
              </p>
              <ul className="list-none space-y-2 text-muted-foreground mt-4">
                <li><strong>Lovable (Lovable Technologies)</strong></li>
                <li>Site web : <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">lovable.dev</a></li>
              </ul>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Propriété intellectuelle
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                L'ensemble des contenus présents sur ce site (textes, images, photographies, logos, graphismes, icônes, vidéos, sons, etc.) sont la propriété exclusive de QualiRénovation by QualiConcept, sauf mention contraire.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit est interdite sans l'autorisation écrite préalable de QualiRénovation by QualiConcept.
              </p>
            </section>

            {/* Responsabilité */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Limitation de responsabilité
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement mis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                QualiRénovation by QualiConcept ne pourra être tenue responsable des dommages directs ou indirects résultant de l'accès ou de l'utilisation de ce site, y compris l'inaccessibilité, les pertes de données, détériorations, destructions ou virus qui pourraient affecter l'équipement informatique de l'utilisateur.
              </p>
            </section>

            {/* Liens hypertextes */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Liens hypertextes
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Le site RénoverMaSalleDeBain.com peut contenir des liens vers d'autres sites internet. QualiRénovation by QualiConcept n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>
            </section>

            {/* Assurances */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Assurances professionnelles
              </h2>
              <div className="flex items-center gap-6">
                <img 
                  src={micLogo} 
                  alt="MIC Insurance" 
                  className="h-16 w-auto object-contain"
                />
                <p className="text-muted-foreground leading-relaxed">
                  Entreprise assurée auprès de MIC Insurance<br />
                  <span className="text-sm">(Responsabilité Civile Professionnelle et Décennale)</span>
                </p>
              </div>
            </section>

            {/* Droit applicable */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Droit applicable
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes mentions légales sont soumises au droit français. En cas de litige, et après tentative de recherche d'une solution amiable, les tribunaux français seront seuls compétents.
              </p>
            </section>

            {/* Date de mise à jour */}
            <section className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Dernière mise à jour : Janvier 2025
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
