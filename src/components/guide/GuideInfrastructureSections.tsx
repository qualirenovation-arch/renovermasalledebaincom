import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";
import butteschaumont6 from "@/assets/buttes-chaumont-6.jpg";

export function GuideInfrastructureSections() {
  return (
    <>
      {/* Section 5 - Plomberie */}
      <section id="section-5" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={5} title="Plomberie : refaire entièrement pour éviter les fuites" />

            <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                <li>Le plomb est remplacé par du cuivre ou du multicouche</li>
                <li>Des nourrices eau chaude / eau froide sont posées</li>
                <li>Refaire à moitié, c'est prendre le risque de refaire deux fois</li>
              </ul>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>Lorsqu'on rénove une salle de bain :</p>
              <ul className="space-y-2">
                <li>Le plomb est remplacé par du <strong className="text-foreground">cuivre</strong> ou du <strong className="text-foreground">multicouche</strong></li>
                <li>Les compteurs sont déplacés pour rester accessibles</li>
                <li>Des <strong className="text-foreground">nourrices eau chaude / eau froide</strong> sont posées</li>
              </ul>
              <p>Cela permet :</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>D'isoler chaque point d'eau</li>
                <li>D'intervenir rapidement en cas de fuite</li>
                <li>De sécuriser l'ensemble du logement</li>
              </ul>
              <p className="italic mt-4">
                Refaire à moitié, c'est prendre le risque de refaire deux fois.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-16"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>

      {/* Section 6 - Étanchéité */}
      <section id="section-6" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={6} title="Étanchéité salle de bain : la base invisible" />

            <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                <li>Système d'étanchéité sous carrelage obligatoire (SPEC)</li>
                <li>Bandes d'angles et traitement des points singuliers</li>
                <li>Un joint seul ne fait jamais une étanchéité</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>Avant tout carrelage :</p>
                <ul className="space-y-2">
                  <li>Système d'étanchéité sous carrelage (SPEC)</li>
                  <li>Bandes d'angles</li>
                  <li>Traitement des points singuliers</li>
                  <li>Continuité sous douche et baignoire</li>
                </ul>
                <p className="font-medium text-foreground mt-4">
                  Un joint seul ne fait jamais une étanchéité.
                </p>
              </div>
              <div className="overflow-hidden">
                <img
                  src={butteschaumont6}
                  alt="Étanchéité Weber Aquastop sous carrelage salle de bain"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Étanchéité Weber Aquastop — obligatoire sous carrelage
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-16"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>
    </>
  );
}
