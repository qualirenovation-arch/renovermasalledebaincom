import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";

export function GuideInspectionSections() {
  return (
    <>
      {/* Section 1 - Visite initiale */}
      <section id="section-1" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={2} title="La visite chantier : la technique avant l'esthétique" />

            <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                <li>Les évacuations et la VMC conditionnent tout le projet</li>
                <li>L'esthétique vient après les choix techniques</li>
                <li>Chaque détail est vérifié lors de la visite initiale</li>
              </ul>
            </div>

            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <p>Lors de la visite, deux points sont prioritaires :</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-base font-medium text-foreground mb-3">Les évacuations</h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>Type de colonne (fonte, PVC)</li>
                    <li>Hauteur disponible</li>
                    <li>Emplacement des colonnes</li>
                    <li>Accessibilité pour maintenance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground mb-3">La VMC</h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li>Présence ou absence</li>
                    <li>Fonctionnement</li>
                    <li>Emplacement de la bouche</li>
                    <li>Possibilité d'optimisation</li>
                  </ul>
                </div>
              </div>

              <p className="text-foreground font-medium text-sm mt-4">
                Ces deux points conditionnent tout le projet. L'esthétique vient après, jamais avant.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-8"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>

      {/* Section 2 - Démolition */}
      <section id="section-2" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={3} title="Démolition et inspection des réseaux existants" />

            <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                <li>Inspection systématique des colonnes en fonte après démolition</li>
                <li>C'est le seul moment pour voir ce qui se cache derrière les murs</li>
                <li>Les arrivées d'eau en plomb sont remplacées</li>
              </ul>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>Après la démolition, nous inspectons systématiquement :</p>
              <ul className="space-y-2">
                <li>Les colonnes d'évacuation en fonte</li>
                <li>L'état des raccords</li>
                <li>Les arrivées d'eau existantes (souvent en plomb dans l'ancien)</li>
              </ul>
              <p className="italic mt-4">
                C'est le seul moment où l'on peut vraiment voir ce qui se cache derrière les murs.
              </p>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-8"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>

      {/* Section 3 - Colonnes en fonte & syndic */}
      <section id="section-3" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={4} title="Colonnes en fonte et syndic : anticiper pour éviter les blocages" />

            <div className="border-l-2 p-3 mb-4" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
                <li>Les colonnes en fonte font partie des parties communes</li>
                <li>Délai syndic : environ 15 jours à prévoir</li>
                <li>Anticipation possible avant le démarrage du chantier</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              {/* Col 1 : Constat */}
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Constat</p>
                <p className="text-xs text-muted-foreground">Les colonnes en fonte font partie des <strong className="text-foreground">parties communes</strong>.</p>
                <p className="text-xs text-muted-foreground mt-1">Si elles sont abîmées, une procédure syndic s'enclenche.</p>
              </div>

              {/* Col 2 : Procédure */}
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Procédure</p>
                <ol className="space-y-0.5 text-xs text-muted-foreground list-decimal list-inside">
                  <li>Nous prévenons le syndic</li>
                  <li>Un plombier établit un devis</li>
                  <li>Le syndic valide l'intervention</li>
                  <li>La colonne est réparée ou remplacée</li>
                </ol>
              </div>

              {/* Col 3 : Délai */}
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Délai</p>
                <p className="text-xs text-muted-foreground">Environ <strong className="text-foreground">15 jours</strong> à prévoir.</p>
                <p className="text-xs text-muted-foreground mt-1">Ce point est identifié dès le départ. Dans certains cas, l'intervention peut être anticipée avant le chantier.</p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-8"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>
    </>
  );
}
