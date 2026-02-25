import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";

export function GuideParoiSection() {
  return (
    <section id="section-paroi" className="py-16 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <GuideSectionHeader number={14} title="Paroi de douche : quelle ouverture, quelle couleur et quel verre choisir ?" />

          <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
            <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
              <li>3 critères : type d'ouverture, couleur du profilé, type de verre</li>
              <li>Toujours harmoniser avec la robinetterie et les accessoires</li>
              <li>Épaisseur recommandée : 6 à 8 mm minimum</li>
            </ul>
          </div>

          <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
            <p>
              Choisir une <strong className="text-foreground">paroi de douche sur mesure</strong> ne se limite pas à une question esthétique.
              Le type d'ouverture, la finition des profilés et le choix du verre influencent le <strong className="text-foreground">confort</strong>, l'<strong className="text-foreground">entretien</strong> et la <strong className="text-foreground">durabilité</strong> de votre rénovation salle de bain.
            </p>
            <p>Voici les 3 éléments essentiels à considérer avant de faire votre choix.</p>

            {/* Type d'ouverture */}
            <div>
              <h3 className="text-lg font-light mb-4" style={{ color: '#124A66' }}>Quel type d'ouverture choisir ?</h3>
              <div className="space-y-4">
                {[
                  { title: "Paroi fixe", desc: "Minimaliste et épurée, elle est idéale pour une douche italienne ouverte. Pas de porte, pas de mécanisme : juste du verre. Elle nécessite un bon dimensionnement pour éviter les éclaboussures tout en conservant une circulation fluide." },
                  { title: "Porte coulissante", desc: "Le meilleur choix pour les petites surfaces. Elle ne nécessite aucun dégagement et permet un gain de place précieux dans les salles de bain étroites. Idéale en rénovation salle de bain en Île-de-France." },
                  { title: "Porte battante ou pivotante", desc: "Elle offre un confort d'accès maximal et une ouverture large. En revanche, elle nécessite un espace de dégagement suffisant devant la douche." },
                ].map(({ title, desc }) => (
                  <div key={title} className="border-b border-border/20 pb-4">
                    <h4 className="font-medium text-foreground mb-1">{title}</h4>
                    <p className="text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic mt-3">
                Le choix dépend toujours de la surface disponible et de la circulation dans la pièce. C'est un point que nous analysons systématiquement lors de la visite technique.
              </p>
            </div>

            {/* Couleur du profilé */}
            <div>
              <h3 className="text-lg font-light mb-4" style={{ color: '#124A66' }}>Quelle couleur de profilé choisir ?</h3>
              <div className="space-y-3">
                <div className="border-b border-border/20 pb-3">
                  <h4 className="font-medium text-foreground mb-1">Noir mat</h4>
                  <p className="text-muted-foreground">Style atelier, contemporain. Très tendance, il structure l'espace et apporte du caractère.</p>
                </div>
                <div className="border-b border-border/20 pb-3">
                  <h4 className="font-medium text-foreground mb-1">Laiton / Doré brossé</h4>
                  <p className="text-muted-foreground">Ambiance chaleureuse et raffinée. Parfait pour les salles de bain à l'esprit boutique-hôtel.</p>
                </div>
                <div className="border-b border-border/20 pb-3">
                  <h4 className="font-medium text-foreground mb-1">Chromé</h4>
                  <p className="text-muted-foreground">Intemporel et facile à harmoniser. Le choix sûr, qui s'adapte à tous les styles.</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic mt-3">
                Toujours harmoniser la paroi avec la robinetterie et les accessoires (porte-serviettes, plaque de chasse, sèche-serviettes) pour un rendu cohérent et soigné.
              </p>
            </div>

            {/* Type de verre */}
            <div>
              <h3 className="text-lg font-light mb-4" style={{ color: '#124A66' }}>Quel type de verre sélectionner ?</h3>
              <div className="space-y-4">
                {[
                  { title: "Verre transparent", desc: "Agrandit visuellement l'espace. C'est le choix le plus courant pour les douches italiennes, car il laisse circuler la lumière et met en valeur le carrelage." },
                  { title: "Verre dépoli", desc: "Plus d'intimité, tout en conservant la luminosité. Idéal pour les configurations ouvertes sur la chambre ou les salles de bain partagées." },
                  { title: "Verre sérigraphié", desc: "Effet décoratif avec des motifs imprimés. Permet de personnaliser la paroi tout en préservant l'intimité." },
                ].map(({ title, desc }) => (
                  <div key={title} className="border-b border-border/20 pb-4">
                    <h4 className="font-medium text-foreground mb-1">{title}</h4>
                    <p className="text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-muted-foreground space-y-1">
                <p><strong className="text-foreground">Épaisseur recommandée :</strong> 6 à 8 mm minimum pour la solidité et la sécurité.</p>
                <p><strong className="text-foreground">Traitement anticalcaire :</strong> vivement conseillé pour faciliter l'entretien au quotidien.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="container mx-auto px-4 mt-16"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
    </section>
  );
}
