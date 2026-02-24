import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { GuideSectionHeader } from "./GuideSectionHeader";
import batiSupportGeberit from "@/assets/images/bati-support-geberit.png";
import plaqueGeberitNoir from "@/assets/images/plaque-geberit-noir.png";
import plaqueGeberitLaiton from "@/assets/images/plaque-geberit-laiton.png";
import plaqueGeberitChrome from "@/assets/images/plaque-geberit-chrome.png";

export function GuideFAQ() {
  return (
    <section id="questions-frequentes" className="py-16 bg-accent/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <GuideSectionHeader icon={HelpCircle} title="Questions fréquentes" />

          {/* Sous-section Douche à l'italienne */}
          <h3 className="text-xl font-serif text-primary mb-4 flex items-center gap-2">
            🚿 Douche à l'italienne
          </h3>
          <div className="space-y-4 mb-8">
            <FAQCard
              question="Qu'est-ce qu'une douche à l'italienne ?"
              answer="Une douche à l'italienne est une douche de plain-pied, sans marche ni receveur surélevé. Elle s'intègre parfaitement au sol de la salle de bain, offrant un accès facile et un design épuré. C'est la solution idéale pour une salle de bain moderne et accessible."
            />
            <FAQCard
              question="Peut-on installer une douche à l'italienne dans un appartement ancien ?"
              answer="Oui, la création d'une douche italienne est possible dans la plupart des appartements, même anciens. Notre maître d'œuvre réalise une étude de faisabilité gratuite pour évaluer les contraintes techniques (hauteur de réservation, évacuations) et vous proposer la meilleure solution."
            />
            <FAQCard question="Comment garantissez-vous l'étanchéité ?">
              <div className="text-muted-foreground space-y-2">
                <p>
                  Obligation DTU 52.2 : nous appliquons un système <strong>SEL/SPEC</strong> (Weber Aquastop) sur murs et sol avant carrelage. Photos de mise en œuvre envoyées systématiquement.
                </p>
                <p className="font-medium text-foreground">
                  Garantie étanchéité 10 ans + décennale MIC Assurances.
                </p>
              </div>
            </FAQCard>
          </div>

          {/* Sous-section Questions techniques */}
          <h3 className="text-xl font-serif text-primary mb-4 flex items-center gap-2">
            🔧 Questions techniques
          </h3>
          <div className="space-y-4">
            <FAQCard question="Faut-il refaire toute la plomberie lors d'une rénovation de salle de bain ?">
              <div className="text-muted-foreground space-y-3">
                <p>
                  👉 <strong>Oui, dans la grande majorité des cas.</strong><br />
                  Les DTU imposent que toute installation modifiée soit mise aux normes actuelles : le plomb est interdit, les raccords encastrés non accessibles sont proscrits, et les matériaux autorisés sont le cuivre ou le multicouche.
                </p>
                <p>
                  🛡 <strong>Côté assurances</strong>, une plomberie ancienne conservée peut entraîner un refus de prise en charge en cas de fuite.
                </p>
                <p className="font-medium text-foreground">
                  Conclusion : refaire la plomberie, c'est sécuriser l'installation, le chantier… et l'assurance.
                </p>
              </div>
            </FAQCard>
            <FAQCard
              question="La bonde doit-elle rester accessible ?"
              answer="Toujours. Une trappe d'accès est indispensable pour intervenir rapidement en cas de problème."
            />
            <FAQCard question="L'électricité est-elle toujours conforme lors d'une rénovation de salle de bain ?">
              <div className="text-muted-foreground space-y-3">
                <p>
                  Lors d'une rénovation de salle de bain, l'installation électrique est systématiquement vérifiée et remise aux normes en vigueur. Cela inclut le respect des volumes de sécurité, la mise à la terre, les protections au tableau électrique (disjoncteur différentiel 30mA) et la conformité selon la norme NF C 15-100.
                </p>
                <p>
                  Certains équipements comme le chauffe-eau, le sèche-serviette ou le plancher chauffant nécessitent un raccordement direct au tableau avec une ligne dédiée.
                </p>
                <p className="font-medium text-foreground">
                  Le beau est important, mais la conformité et la sécurité sont des obligations légales non négociables.
                </p>
              </div>
            </FAQCard>
            <FAQCard question="Pourquoi les finitions et profilés sont-ils si importants ?">
              <div className="text-muted-foreground space-y-3">
                <p>
                  Les profilés de finition jouent un rôle clé dans le rendu final d'une salle de bain. Ils assurent la protection des matériaux contre les chocs et l'humidité, et la cohérence esthétique de l'ensemble.
                </p>
                <p>
                  Les profilés sont assortis aux robinetteries et finitions : noir mat, chrome brillant, inox brossé, laiton vieilli ou doré.
                </p>
                <p className="font-medium text-foreground">
                  Ce sont souvent ces détails discrets qui font la différence entre une salle de bain correcte et une salle de bain réellement aboutie.
                </p>
              </div>
            </FAQCard>
            <FAQCard question="Qu'est-ce qu'un bâti-support ?">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-muted-foreground space-y-3 flex-1">
                  <p>
                    Un bâti-support est une structure métallique encastrée dans le mur qui permet d'installer un <strong>WC suspendu</strong>. Il supporte la cuvette, intègre le réservoir de chasse et reçoit la plaque de déclenchement.
                  </p>
                  <p>
                    Il est toujours recouvert de BA13, qui peut être carrelé ou peint — nous recommandons le carrelage pour sa durabilité.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src={batiSupportGeberit}
                    alt="Bâti-support Geberit Sigma pour WC suspendu"
                    className="w-40 md:w-48 h-auto object-contain rounded-lg"
                  />
                </div>
              </div>
            </FAQCard>
            <FAQCard question="Qu'est-ce qu'une plaque de déclenchement ?">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-muted-foreground space-y-3 flex-1">
                  <p>
                    La plaque de déclenchement est le <strong>bouton de chasse d'eau visible</strong> sur un WC suspendu.
                  </p>
                  <p>
                    Elle permet d'actionner la chasse (simple ou double débit) et donne accès au mécanisme pour la maintenance.
                  </p>
                  <p className="text-sm italic">
                    👉 Elle se choisit en fonction du bâti-support installé : la compatibilité est à valider avec votre entrepreneur.
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <img src={plaqueGeberitNoir} alt="Plaque Geberit noire" className="w-16 md:w-20 h-auto object-contain rounded-lg" />
                  <img src={plaqueGeberitLaiton} alt="Plaque Geberit laiton" className="w-16 md:w-20 h-auto object-contain rounded-lg" />
                  <img src={plaqueGeberitChrome} alt="Plaque Geberit chromée" className="w-16 md:w-20 h-auto object-contain rounded-lg" />
                </div>
              </div>
            </FAQCard>
            <div className="bg-background rounded-xl p-6 shadow-sm border-l-4 border-amber-500">
              <h3 className="font-semibold text-lg mb-2">
                ⚠️ La plaque de déclenchement est-elle livrée en plusieurs couleurs ?
              </h3>
              <div className="text-muted-foreground space-y-3">
                <p>
                  <strong>Attention :</strong> en règle générale, la plaque de déclenchement est livrée <strong>en blanc</strong> avec le bâti-support.
                </p>
                <p>
                  👉 Pour un changement de couleur ou de finition, la plaque doit être <strong>rachetée séparément</strong>.
                </p>
                <p className="text-sm italic bg-accent/30 p-3 rounded-lg">
                  💡 Info importante à valider en amont avec votre entrepreneur pour éviter les surprises.
                </p>
              </div>
            </div>
            <FAQCard question="Qu'est-ce qu'une cuvette avec ou sans bride ?">
              <div className="text-muted-foreground space-y-3">
                <p><strong>Avec bride :</strong> cuvette classique avec un rebord intérieur, plus économique mais moins hygiénique.</p>
                <p><strong>Sans bride :</strong> cuvette sans rebord, plus hygiénique, plus facile à nettoyer et aujourd'hui largement recommandée.</p>
                <p className="text-sm italic bg-accent/30 p-3 rounded-lg">
                  💡 Nous recommandons systématiquement les cuvettes sans bride pour leur facilité d'entretien.
                </p>
              </div>
            </FAQCard>
            <FAQCard question="Existe-t-il des cuvettes de couleurs différentes ?">
              <div className="text-muted-foreground space-y-3">
                <p>
                  <strong>Oui.</strong> En plus du blanc, il existe des cuvettes en <strong>noir, gris, beige, sable</strong> ou autres finitions, selon les marques et les gammes.
                </p>
                <p className="text-sm italic bg-accent/30 p-3 rounded-lg">
                  👉 Attention : les couleurs sont souvent en option et peuvent impacter le budget.
                </p>
              </div>
            </FAQCard>
          </div>
        </motion.div>
      </div>
    </section>
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
    <div className="bg-background rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-2">❓ {question}</h3>
      {answer ? <p className="text-muted-foreground">{answer}</p> : children}
    </div>
  );
}
