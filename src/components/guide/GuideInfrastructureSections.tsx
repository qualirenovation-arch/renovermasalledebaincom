import { motion } from "framer-motion";
import { Wrench, Shield, CheckCircle, Droplets } from "lucide-react";
import { GuideSectionHeader } from "./GuideSectionHeader";
import butteschaumont6 from "@/assets/buttes-chaumont-6.jpg";

export function GuideInfrastructureSections() {
  return (
    <>
      {/* Section 5 - Plomberie */}
      <section id="section-5" className="py-16 bg-accent/20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={5} icon={Wrench} title="Plomberie : refaire entièrement pour éviter les fuites" />
            <div className="bg-accent/30 rounded-2xl p-8">
              <p className="text-lg text-muted-foreground mb-6">
                Lorsqu'on rénove une salle de bain :
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Le plomb est remplacé par du <strong>cuivre</strong> ou du <strong>multicouche</strong></span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Les compteurs sont déplacés pour rester accessibles</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Des <strong>nourrices eau chaude / eau froide</strong> sont posées</span>
                </li>
              </ul>
              <p className="text-muted-foreground mb-4">👉 Cela permet :</p>
              <ul className="space-y-2 mb-6 text-muted-foreground">
                <li>• D'isoler chaque point d'eau</li>
                <li>• D'intervenir rapidement en cas de fuite</li>
                <li>• De sécuriser l'ensemble du logement</li>
              </ul>
              <div className="bg-background rounded-xl p-4 border border-primary/20">
                <p className="text-primary font-medium italic">
                  💬 Refaire à moitié, c'est prendre le risque de refaire deux fois.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
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
            <GuideSectionHeader number={6} icon={Shield} title="Étanchéité salle de bain : la base invisible" />
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-background rounded-2xl p-8 shadow-sm">
                <p className="text-lg text-muted-foreground mb-4">Avant tout carrelage :</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Système d'étanchéité sous carrelage (SPEC)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Bandes d'angles</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Traitement des points singuliers</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Continuité sous douche et baignoire</span>
                  </li>
                </ul>
                <p className="mt-6 text-primary font-medium">
                  👉 Un joint seul ne fait jamais une étanchéité.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={butteschaumont6}
                  alt="Étanchéité Weber Aquastop sous carrelage salle de bain"
                  className="w-full h-64 object-cover"
                />
                <p className="bg-foreground text-background text-sm p-3 text-center">
                  Étanchéité Weber Aquastop — obligatoire sous carrelage
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
