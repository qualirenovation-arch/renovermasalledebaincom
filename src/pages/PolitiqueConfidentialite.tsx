import { Layout } from "@/components/layout/Layout";
import { OGTags } from "@/components/seo/OGTags";
import { Link } from "react-router-dom";

export default function PolitiqueConfidentialite() {
  return (
    <Layout>
      <OGTags
        title="Politique de confidentialité"
        description="Politique de confidentialité de renovermasalledebain.com. Découvrez comment nous collectons, utilisons et protégeons vos données conformément au RGPD."
        path="/politique-confidentialite"
      />
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8">
            Politique de confidentialité
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            {/* Introduction */}
            <section>
              <p className="text-muted-foreground leading-relaxed">
                QUALICONCEPT, exploitant le site <strong>renovermasalledebain.com</strong>, s'engage à protéger la vie privée des utilisateurs de son site internet. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
              </p>
            </section>

            {/* Responsable du traitement */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Responsable du traitement
              </h2>
              <ul className="list-none space-y-2 text-muted-foreground">
                <li><strong>QUALICONCEPT</strong></li>
                <li>6 rue d'Armaillé, 75017 Paris</li>
                <li>Email : gestion@qualiconcept.fr</li>
                <li>Téléphone : 06 59 76 46 85</li>
              </ul>
            </section>

            {/* Données collectées */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Données collectées
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous collectons les données personnelles suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Données d'identification :</strong> nom, prénom, adresse email, numéro de téléphone</li>
                <li><strong>Données relatives à votre projet :</strong> adresse du bien, type de travaux souhaités, budget estimé</li>
                <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées</li>
              </ul>
            </section>

            {/* Finalités */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Finalités du traitement
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Vos données sont collectées pour les finalités suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Répondre à vos demandes de devis et d'information</li>
                <li>Vous recontacter dans le cadre de votre projet de rénovation</li>
                <li>Améliorer nos services et l'expérience utilisateur du site</li>
                <li>Respecter nos obligations légales et réglementaires</li>
              </ul>
            </section>

            {/* Base légale */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Base légale du traitement
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Le traitement de vos données repose sur votre consentement explicite lors de la soumission du formulaire de demande de devis, ainsi que sur notre intérêt légitime à développer notre activité commerciale.
              </p>
            </section>

            {/* Destinataires */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Destinataires des données
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Vos données personnelles sont destinées uniquement aux équipes de QUALICONCEPT. Elles ne sont jamais vendues, louées ou cédées à des tiers à des fins commerciales.
              </p>
            </section>

            {/* Conservation */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Durée de conservation
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Vos données sont conservées pendant une durée de 3 ans à compter de votre dernière interaction avec nous, ou pendant toute la durée de la relation commerciale et des obligations légales qui en découlent.
              </p>
            </section>

            {/* Droits */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Vos droits
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Droit d'accès :</strong> obtenir la confirmation que vos données sont traitées et en obtenir une copie</li>
                <li><strong>Droit de rectification :</strong> demander la correction de données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit à la limitation :</strong> demander la limitation du traitement</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:gestion@qualiconcept.fr" className="text-accent hover:underline">gestion@qualiconcept.fr</a>
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Notre site utilise des cookies techniques nécessaires à son bon fonctionnement. Ces cookies ne collectent pas de données personnelles à des fins publicitaires. Vous pouvez configurer votre navigateur pour refuser les cookies.
              </p>
            </section>

            {/* Sécurité */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Sécurité des données
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
              </p>
            </section>

            {/* Réclamation */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-primary mb-4">
                Réclamation
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Si vous estimez que le traitement de vos données ne respecte pas la réglementation, vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.cnil.fr</a>
              </p>
            </section>

            {/* Lien mentions légales */}
            <section className="pt-8 border-t border-border">
              <p className="text-muted-foreground">
                Consultez également nos <Link to="/mentions-legales" className="text-accent hover:underline">Mentions légales</Link>.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Dernière mise à jour : Janvier 2025
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
