import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GuideSectionHeader } from "./GuideSectionHeader";

export function GuideFAQ() {
  return (
    <section id="questions-frequentes" className="py-16 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <GuideSectionHeader title="Questions fréquentes" />

          {/* Sous-section Douche à l'italienne */}
          <h3 className="text-lg font-light mb-4">
            Douche à l'italienne
          </h3>
          <div className="space-y-6 mb-10">
            <FAQCard
              question="Qu'est-ce qu'une douche à l'italienne ?"
              answer="Une douche à l'italienne est une douche de plain-pied, sans marche ni receveur surélevé. Elle s'intègre parfaitement au sol de la salle de bain, offrant un accès facile et un design épuré. C'est la solution idéale pour une salle de bain moderne et accessible."
            />
            <FAQCard
              question="Peut-on installer une douche à l'italienne dans un appartement ancien ?"
              answer="Oui, la création d'une douche italienne est possible dans la plupart des appartements, même anciens. Notre maître d'oeuvre réalise une étude de faisabilité gratuite pour évaluer les contraintes techniques (hauteur de réservation, évacuations) et vous proposer la meilleure solution."
            />
            <FAQCard question="Comment garantissez-vous l'étanchéité ?">
              <div className="text-muted-foreground space-y-2 text-sm">
                <p>
                  Obligation DTU 52.2 : nous appliquons un système <strong className="text-foreground">SEL/SPEC</strong> (Weber Aquastop) sur murs et sol avant carrelage. Photos de mise en oeuvre envoyées systématiquement.
                </p>
                <p className="font-medium text-foreground">
                  Garantie étanchéité 10 ans + décennale MIC Assurances.
                </p>
                <GuideLink to="/guide-travaux#section-6" label="Voir la section Étanchéité du Guide" />
              </div>
            </FAQCard>
          </div>

          {/* Sous-section Équipements - résumé avec lien vers le Guide */}
          <h3 className="text-lg font-light mb-4">
            Équipements WC
          </h3>
          <div className="space-y-6 mb-10">
            <FAQCard question="WC suspendu, bâti-support et plaques : l'essentiel">
              <div className="text-muted-foreground space-y-2 text-sm">
                <p>
                  Le WC suspendu repose sur un <strong className="text-foreground">bâti-support Geberit</strong> encastré. La plaque de déclenchement est livrée en blanc par défaut (surcoût pour noir, laiton ou chromé). Nous recommandons les <strong className="text-foreground">cuvettes sans bride</strong> pour l'hygiène.
                </p>
                <GuideLink to="/guide-travaux#section-10" label="Voir le détail complet dans le Guide" />
              </div>
            </FAQCard>
            <FAQCard question="Le WC doit-il rester fonctionnel s'il est séparé dans une autre pièce ?">
              <div className="text-muted-foreground space-y-3 text-sm">
                <p>
                  <strong className="text-foreground">Oui, impérativement.</strong> Lorsque le WC est situé dans une pièce indépendante de la salle de bain, il doit rester <strong className="text-foreground">accessible et utilisable pendant toute la durée des travaux</strong>.
                </p>
                <p>
                  En revanche, si le WC est intégré à la salle de bain en cours de rénovation, son utilisation sera temporairement interrompue.
                </p>
              </div>
            </FAQCard>
          </div>

          {/* Lien vers la FAQ complète */}
          <div className="mt-10 pt-8 border-t border-border/30 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Retrouvez toutes nos réponses sur le budget, le suivi de chantier, les matériaux et plus encore.
            </p>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors"
              style={{ backgroundColor: '#124A66', color: '#F4F6F8' }}
            >
              <ArrowRight className="w-4 h-4" />
              Consulter la FAQ complète
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GuideLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium transition-colors hover:underline"
      style={{ color: '#124A66' }}
    >
      <ArrowRight className="w-3.5 h-3.5" />
      {label}
    </Link>
  );
}

function FAQCard({
  question,
  answer,
  children,
}: {
  question: string;
  answer?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-border/20 pb-5">
      <h4 className="font-medium text-foreground text-base mb-2">{question}</h4>
      {answer ? <p className="text-muted-foreground text-sm">{answer}</p> : children}
    </div>
  );
}
