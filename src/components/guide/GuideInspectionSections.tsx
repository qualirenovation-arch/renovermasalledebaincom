import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";

export function GuideInspectionSections() {
  return (
    <>
      {/* Section 1 - Visite initiale */}
      <section id="visite-technique-appartement-parisien" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={2} title="Visite technique en appartement parisien" tag="h3" />

            <div className="border-l-2 p-3 mb-4" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
                <li>Les évacuations et la VMC conditionnent tout le projet</li>
                <li>L'esthétique vient après les choix techniques</li>
                <li>Chaque détail est vérifié lors de la visite initiale</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Priorités</p>
                <p className="text-xs text-muted-foreground">Dans un appartement parisien, la visite technique est le point de départ de toute rénovation de salle de bain. Deux points sont prioritaires : <strong className="text-foreground">les évacuations</strong> et <strong className="text-foreground">la VMC</strong>.</p>
                <p className="text-xs text-muted-foreground mt-1">Ces deux éléments conditionnent tout le projet, que ce soit pour rénover une salle de bain ancienne ou refaire entièrement la pièce.</p>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Évacuations</p>
                <ul className="space-y-0.5 text-xs text-muted-foreground">
                  <li>Type de colonne (fonte, PVC)</li>
                  <li>Hauteur disponible</li>
                  <li>Emplacement des colonnes</li>
                  <li>Accessibilité maintenance</li>
                </ul>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>VMC</p>
                <ul className="space-y-0.5 text-xs text-muted-foreground">
                  <li>Présence ou absence</li>
                  <li>Fonctionnement</li>
                  <li>Emplacement de la bouche</li>
                  <li>Possibilité d'optimisation</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-foreground font-medium mt-3">L'esthétique vient après, jamais avant.</p>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-8"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>

      {/* Section 2 - Démolition */}
      <section id="demolition-inspection-reseaux" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={3} title="Démolition et inspection des réseaux" tag="h3" />

            <div className="border-l-2 p-3 mb-4" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
                <li>Inspection systématique des colonnes en fonte après démolition</li>
                <li>C'est le seul moment pour voir ce qui se cache derrière les murs</li>
                <li>Les arrivées d'eau en plomb sont remplacées</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Inspection</p>
                <p className="text-xs text-muted-foreground">Après démolition, nous inspectons systématiquement les colonnes d'évacuation en fonte.</p>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Vérifications</p>
                <ul className="space-y-0.5 text-xs text-muted-foreground">
                  <li>Colonnes d'évacuation en fonte</li>
                  <li>État des raccords</li>
                  <li>Arrivées d'eau (souvent en plomb)</li>
                </ul>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Pourquoi maintenant</p>
                <p className="text-xs text-muted-foreground italic">C'est le seul moment où l'on peut vraiment voir ce qui se cache derrière les murs.</p>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="container mx-auto px-4 mt-8"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
      </section>

      {/* Section 3 - Colonnes en fonte & syndic */}
      <section id="colonnes-fonte-copropriete" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={4} title="Colonnes en fonte en copropriété" tag="h3" />

            <div className="border-l-2 p-3 mb-4" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
                <li>En copropriété parisienne, les colonnes en fonte font partie des parties communes</li>
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
