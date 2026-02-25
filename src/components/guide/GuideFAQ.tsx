import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";
import batiSupportGeberit from "@/assets/images/bati-support-geberit.png";
import plaqueGeberitNoir from "@/assets/images/plaque-geberit-noir.png";
import plaqueGeberitLaiton from "@/assets/images/plaque-geberit-laiton.png";
import plaqueGeberitChrome from "@/assets/images/plaque-geberit-chrome.png";

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
              </div>
            </FAQCard>
          </div>

          {/* Sous-section Questions techniques */}
          <h3 className="text-lg font-light mb-4">
            Questions techniques
          </h3>
          <div className="space-y-6">
            <FAQCard question="Faut-il refaire toute la plomberie lors d'une rénovation de salle de bain ?">
              <div className="text-muted-foreground space-y-3 text-sm">
                <p>
                  <strong className="text-foreground">Oui, dans la grande majorité des cas.</strong><br />
                  Les DTU imposent que toute installation modifiée soit mise aux normes actuelles : le plomb est interdit, les raccords encastrés non accessibles sont proscrits, et les matériaux autorisés sont le cuivre ou le multicouche.
                </p>
                <p>
                  Côté assurances, une plomberie ancienne conservée peut entraîner un refus de prise en charge en cas de fuite.
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
              <div className="text-muted-foreground space-y-3 text-sm">
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
              <div className="text-muted-foreground space-y-3 text-sm">
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
                <div className="text-muted-foreground space-y-3 flex-1 text-sm">
                  <p>
                    Un bâti-support est une structure métallique encastrée dans le mur qui permet d'installer un <strong className="text-foreground">WC suspendu</strong>. Il supporte la cuvette, intègre le réservoir de chasse et reçoit la plaque de déclenchement.
                  </p>
                  <p>
                    Il est toujours recouvert de BA13, qui peut être carrelé ou peint — nous recommandons le carrelage pour sa durabilité.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src={batiSupportGeberit}
                    alt="Bâti-support Geberit Sigma pour WC suspendu"
                    className="w-40 md:w-48 h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </FAQCard>
            <FAQCard question="Qu'est-ce qu'une plaque de déclenchement ?">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-muted-foreground space-y-3 flex-1 text-sm">
                  <p>
                    La plaque de déclenchement est le <strong className="text-foreground">bouton de chasse d'eau visible</strong> sur un WC suspendu.
                  </p>
                  <p>
                    Elle permet d'actionner la chasse (simple ou double débit) et donne accès au mécanisme pour la maintenance.
                  </p>
                  <p className="italic">
                    Elle se choisit en fonction du bâti-support installé : la compatibilité est à valider avec vous.
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <img src={plaqueGeberitNoir} alt="Plaque Geberit noire" className="w-16 md:w-20 h-auto object-contain" loading="lazy" />
                  <img src={plaqueGeberitLaiton} alt="Plaque Geberit laiton" className="w-16 md:w-20 h-auto object-contain" loading="lazy" />
                  <img src={plaqueGeberitChrome} alt="Plaque Geberit chromée" className="w-16 md:w-20 h-auto object-contain" loading="lazy" />
                </div>
              </div>
            </FAQCard>
            <div className="border-l-2 py-4 pl-5" style={{ borderColor: '#c2a016' }}>
              <h3 className="font-medium text-foreground text-base mb-2">
                La plaque de déclenchement est-elle livrée en plusieurs couleurs ?
              </h3>
              <div className="text-muted-foreground space-y-3 text-sm">
                <p>
                  <strong className="text-foreground">Attention :</strong> en règle générale, la plaque de déclenchement est livrée <strong className="text-foreground">en blanc</strong> avec le bâti-support.
                </p>
                <p>
                  Pour un changement de couleur ou de finition, la plaque doit être <strong className="text-foreground">rachetée séparément</strong>.
                </p>
                <p className="italic">
                  Info importante à valider en amont avec vous pour éviter les surprises.
                </p>
              </div>
            </div>
            <FAQCard question="Qu'est-ce qu'une cuvette avec ou sans bride ?">
              <div className="text-muted-foreground space-y-3 text-sm">
                <p><strong className="text-foreground">Avec bride :</strong> cuvette classique avec un rebord intérieur, plus économique mais moins hygiénique.</p>
                <p><strong className="text-foreground">Sans bride :</strong> cuvette sans rebord, plus hygiénique, plus facile à nettoyer et aujourd'hui largement recommandée.</p>
                <p className="italic">
                  Nous recommandons systématiquement les cuvettes sans bride pour leur facilité d'entretien.
                </p>
              </div>
            </FAQCard>
            <FAQCard question="Existe-t-il des cuvettes de couleurs différentes ?">
              <div className="text-muted-foreground space-y-3 text-sm">
                <p>
                  <strong className="text-foreground">Oui.</strong> En plus du blanc, il existe des cuvettes en <strong className="text-foreground">noir, gris, beige, sable</strong> ou autres finitions, selon les marques et les gammes.
                </p>
                <p className="italic">
                  Attention : les couleurs sont souvent en option et peuvent impacter le budget.
                </p>
              </div>
            </FAQCard>
            <FAQCard question="Le WC doit-il rester fonctionnel s'il est séparé dans une autre pièce ?">
              <div className="text-muted-foreground space-y-3 text-sm">
                <p>
                  <strong className="text-foreground">Oui, impérativement.</strong> Lorsque le WC est situé dans une pièce indépendante de la salle de bain, il doit rester <strong className="text-foreground">accessible et utilisable pendant toute la durée des travaux</strong>.
                </p>
                <p>
                  En revanche, si le WC est intégré à la salle de bain en cours de rénovation, son utilisation sera temporairement interrompue. Dans ce cas, il est conseillé de prévoir une solution alternative (WC d'un autre étage, voisin, etc.).
                </p>
                <p className="font-medium text-foreground">
                  Point important : le maintien du WC en fonctionnement est à valider en amont avec vous, notamment pour organiser les phases de chantier.
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
    <div className="border-b border-border/20 pb-5">
      <h4 className="font-medium text-foreground text-base mb-2">{question}</h4>
      {answer ? <p className="text-muted-foreground text-sm">{answer}</p> : children}
    </div>
  );
}
