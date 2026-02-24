import { motion } from "framer-motion";
import { DoorOpen, Shield, Paintbrush, Eye, Lightbulb } from "lucide-react";
import { GuideSectionHeader } from "./GuideSectionHeader";

export function GuideParoiSection() {
  return (
    <section id="section-paroi" className="py-16 bg-accent/20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <GuideSectionHeader number={14} icon={DoorOpen} title="Paroi de douche : quelle ouverture, quelle couleur et quel verre choisir ?" />

          <div className="text-muted-foreground space-y-4 mb-12">
            <p>
              Choisir une <strong>paroi de douche sur mesure</strong> ne se limite pas à une question esthétique.
              Le type d'ouverture, la finition des profilés et le choix du verre influencent le <strong>confort</strong>, l'<strong>entretien</strong> et la <strong>durabilité</strong> de votre rénovation salle de bain.
            </p>
            <p>Voici les 3 éléments essentiels à considérer avant de faire votre choix.</p>
          </div>

          {/* Type d'ouverture */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-serif text-foreground mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Quel type d'ouverture choisir ?
            </h3>
            <div className="grid gap-4">
              {[
                { title: "Paroi fixe", desc: "Minimaliste et épurée, elle est idéale pour une douche italienne ouverte. Pas de porte, pas de mécanisme : juste du verre. Elle nécessite un bon dimensionnement pour éviter les éclaboussures tout en conservant une circulation fluide." },
                { title: "Porte coulissante", desc: "Le meilleur choix pour les petites surfaces. Elle ne nécessite aucun dégagement et permet un gain de place précieux dans les salles de bain étroites. Idéale en rénovation salle de bain en Île-de-France." },
                { title: "Porte battante ou pivotante", desc: "Elle offre un confort d'accès maximal et une ouverture large. En revanche, elle nécessite un espace de dégagement suffisant devant la douche." },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-background rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-foreground mb-2">{title}</h4>
                  <p className="text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Le choix dépend toujours de la <strong>surface disponible</strong> et de la <strong>circulation dans la pièce</strong>. C'est un point que nous analysons systématiquement lors de la visite technique.
              </p>
            </div>
          </div>

          {/* Couleur du profilé */}
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-serif text-foreground mb-6 flex items-center gap-2">
              <Paintbrush className="w-5 h-5 text-primary" />
              Quelle couleur de profilé choisir ?
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-background rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-foreground mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Noir mat</h4>
                <p className="text-sm text-muted-foreground">
                  Style atelier, contemporain. Très tendance, il structure l'espace et apporte du caractère.
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gold mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Laiton / Doré brossé</h4>
                <p className="text-sm text-muted-foreground">
                  Ambiance chaleureuse et raffinée. Parfait pour les salles de bain à l'esprit boutique-hôtel.
                </p>
              </div>
              <div className="bg-background rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-muted to-background border border-border mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Chromé</h4>
                <p className="text-sm text-muted-foreground">
                  Intemporel et facile à harmoniser. Le choix sûr, qui s'adapte à tous les styles.
                </p>
              </div>
            </div>
            <div className="mt-4 bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Toujours <strong>harmoniser la paroi avec la robinetterie et les accessoires</strong> (porte-serviettes, plaque de chasse, sèche-serviettes) pour un rendu cohérent et soigné.
              </p>
            </div>
          </div>

          {/* Type de verre */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-serif text-foreground mb-6 flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Quel type de verre sélectionner ?
            </h3>
            <div className="grid gap-4">
              {[
                { title: "Verre transparent", desc: "Agrandit visuellement l'espace. C'est le choix le plus courant pour les douches italiennes, car il laisse circuler la lumière et met en valeur le carrelage." },
                { title: "Verre dépoli", desc: "Plus d'intimité, tout en conservant la luminosité. Idéal pour les configurations ouvertes sur la chambre ou les salles de bain partagées." },
                { title: "Verre sérigraphié", desc: "Effet décoratif avec des motifs imprimés. Permet de personnaliser la paroi tout en préservant l'intimité." },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-background rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-foreground mb-2">{title}</h4>
                  <p className="text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Épaisseur recommandée :</strong> 6 à 8 mm minimum pour la solidité et la sécurité.</p>
                <p><strong>Traitement anticalcaire :</strong> vivement conseillé pour faciliter l'entretien au quotidien.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
