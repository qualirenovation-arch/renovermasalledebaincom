import { motion } from "framer-motion";
import { GuideSectionHeader } from "./GuideSectionHeader";
import butteschaumont6 from "@/assets/buttes-chaumont-6.jpg";
import receveursDouche from "@/assets/receveurs-douche.jpg";
import baignoireRangementNiches from "@/assets/baignoire-rangement-niches.jpg";
import baignoireRangementTiroirs from "@/assets/baignoire-rangement-tiroirs.jpg";
import batiSupportGeberit from "@/assets/images/bati-support-geberit.png";
import plaqueGeberitNoir from "@/assets/images/plaque-geberit-noir.png";
import plaqueGeberitLaiton from "@/assets/images/plaque-geberit-laiton.png";
import plaqueGeberitChrome from "@/assets/images/plaque-geberit-chrome.png";
import carinaSig from "@/assets/carina-signature.svg";

const SectionDivider = () => (
  <div className="container mx-auto px-4 mt-16"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
);

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
        <SectionDivider />
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
        <SectionDivider />
      </section>

      {/* Section 7 - Receveur de douche */}
      <section id="section-7" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={7} title="Receveur de douche : le bon choix" />

            <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                <li>Extra-plat, sur pieds ou à carreler selon la configuration</li>
                <li>La hauteur de la culotte détermine les possibilités en copropriété</li>
                <li>Tout ce qui peut fuir doit rester accessible</li>
              </ul>
            </div>

            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="overflow-hidden">
                  <img src={receveursDouche} alt="Différents types de receveurs de douche" className="w-full h-48 object-cover" loading="lazy" />
                </div>
                <div className="text-sm space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Types</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><strong>Extra-plat</strong> : encastré au sol, accès plain-pied</p>
                      <p><strong>Sur pieds</strong> : surélevé, accès siphon facile</p>
                      <p><strong>À carreler</strong> : douche italienne, pentes intégrées</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Matériaux</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><strong>Résine</strong> : extra-plat, durable, le plus courant</p>
                      <p><strong>Acrylique</strong> : léger, antidérapant, sensible rayures</p>
                      <p><strong>Grès émaillé</strong> : résistant, lourd, glissant</p>
                      <p><strong>Acier émaillé</strong> : dimensions exactes sur commande</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Copropriété :</strong> la hauteur de la culotte (raccord colonne immeuble) détermine si plain-pied ou sur pied possible. Contrainte incompressible.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Maison :</strong> liberté totale, évacuation adaptable.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Sous le receveur</h4>
                  <p className="text-sm text-muted-foreground">Carrelage dessous — Étanchéité continue — Bonde accessible — Trappe carrelée</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm mb-2">Sous la baignoire</h4>
                  <p className="text-sm text-muted-foreground">Trappe d'accès carrelée — Alignée avec la bonde — Attention meubles bloquants</p>
                </div>
              </div>

              <p className="font-medium text-foreground mt-4">
                Tout ce qui peut fuir doit rester accessible.
              </p>
            </div>
          </motion.div>
        </div>
        <SectionDivider />
      </section>

      {/* Section 8 - Choisir sa baignoire */}
      <section id="section-8" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={8} title="Choisir sa baignoire" />

            <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                <li>Choix selon l'espace, le confort et la structure du sol</li>
                <li>Attention au poids : 300 à 400 kg une fois remplie</li>
                <li>La baignoire peut devenir un vrai meuble de rangement</li>
              </ul>
            </div>

            <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
              <p>Un équipement de bain permettant l'immersion complète du corps. Choix selon l'espace, le confort souhaité et la structure du sol (poids à supporter).</p>

              <div>
                <h3 className="text-base font-medium text-foreground mb-3">Types de baignoires</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Droite</strong> — Standard, tous espaces</p>
                  <p><strong>Îlot</strong> — Design, espace dégagé</p>
                  <p><strong>D'angle</strong> — Optimise les coins</p>
                  <p><strong>Bain-douche</strong> — Combo 2-en-1</p>
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium text-foreground mb-3">Matériaux</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Acrylique</strong> — Léger, chaud, bon rapport qualité-prix (le plus courant)</p>
                  <p><strong>Acier émaillé</strong> — Résistant, durable, plus froid</p>
                  <p><strong>Fonte</strong> — Haut de gamme, très lourd (80-120kg)</p>
                  <p><strong>Solid Surface</strong> — Design, doux au toucher, sur mesure</p>
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium text-foreground mb-3">Rangements intégrés</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <img src={baignoireRangementNiches} alt="Baignoire avec niches de rangement intégrées" className="w-full h-48 object-cover" loading="lazy" />
                    <p className="text-xs text-muted-foreground mt-1 text-center">Niches intégrées au tablier</p>
                  </div>
                  <div>
                    <img src={baignoireRangementTiroirs} alt="Baignoire avec tiroirs de rangement" className="w-full h-48 object-cover" loading="lazy" />
                    <p className="text-xs text-muted-foreground mt-1 text-center">Tiroirs sous baignoire</p>
                  </div>
                </div>
                <div className="mt-4 space-y-1 text-sm">
                  <p><strong>Tiroirs intégrés</strong> — Produits, serviettes, jouets enfants</p>
                  <p><strong>Niches latérales</strong> — Accès facile, esthétique épurée</p>
                  <p><strong>Trappe d'accès</strong> — Maintenance siphon + rangement</p>
                  <p><strong>Tablier amovible</strong> — Stockage linge, paniers</p>
                </div>
                <p className="italic mt-3">
                  Dans les petites salles de bain, chaque cm² compte. La baignoire devient un vrai meuble de rangement.
                </p>
              </div>

              <p className="font-medium text-foreground">
                Attention au poids : une baignoire remplie + utilisateur = 300 à 400 kg. Vérifier la structure du sol (plancher bois, dalle béton). La fonte est particulièrement lourde (80-120 kg à vide).
              </p>
            </div>
          </motion.div>
        </div>
        <SectionDivider />
      </section>

      {/* Section 9 - Paroi de douche */}
      <section id="section-9" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={9} title="Paroi de douche : quelle ouverture, quelle couleur et quel verre choisir ?" />

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

              <div>
                <h3 className="text-lg font-light mb-4">Quel type d'ouverture choisir ?</h3>
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

              <div>
                <h3 className="text-lg font-light mb-4">Quelle couleur de profilé choisir ?</h3>
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

              <div>
                <h3 className="text-lg font-light mb-4">Quel type de verre sélectionner ?</h3>
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
        <SectionDivider />
      </section>

      {/* Section 10 - Équipements sanitaires */}
      <section id="section-10" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={10} title="WC, meuble vasque & chauffe-eau" />

            <div className="border-l-2 p-5 mb-8" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                <li>WC suspendu avec bâti-support Geberit : le standard en rénovation</li>
                <li>Le meuble vasque structure l'espace et cache la plomberie</li>
                <li>Le chauffe-eau doit rester accessible et adapté à la consommation</li>
              </ul>
            </div>

            <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
              {/* WC */}
              <div id="section-wc" className="scroll-mt-20">
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#124A66' }}>
                  WC suspendu : le choix du bâti-support fait toute la différence
                </h3>

                <div className="space-y-3 mb-6">
                  <p>Le WC suspendu est aujourd'hui le standard en rénovation.</p>
                  <p>Mais derrière la cuvette se cache un élément déterminant : <strong className="text-foreground">le bâti-support</strong>.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="flex-1">
                    <h4 className="text-base font-semibold mb-3" style={{ color: '#124A66' }}>Profondeur & hauteur</h4>
                    <p className="mb-2">Tous les bâtis ne sont pas identiques. Exemple reconnu : <strong className="text-foreground">Geberit Duofix</strong>.</p>
                    <ul className="space-y-1.5 list-disc list-inside">
                      <li>Version standard : environ 12 cm d'épaisseur</li>
                      <li>Version faible profondeur : à partir de 8 cm</li>
                      <li>Hauteur standard : 112 cm</li>
                      <li>Version hauteur réduite : environ 80 cm (idéal sous fenêtre)</li>
                    </ul>
                    <p className="mt-3">Le choix dépend de la profondeur disponible, de la hauteur sous allège et de la configuration des évacuations.</p>
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src={batiSupportGeberit}
                      alt="Bâti-support Geberit Duofix pour WC suspendu"
                      className="w-40 md:w-48 h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                <h4 className="text-base font-semibold mb-3" style={{ color: '#124A66' }}>Portant ou autoportant ?</h4>
                <div className="space-y-2 mb-6">
                  <p><strong className="text-foreground">Bâti autoportant</strong> — Fixation principale au sol. Idéal sur cloison légère.</p>
                  <p><strong className="text-foreground">Bâti portant</strong> — Fixation mur + sol. Adapté aux murs porteurs.</p>
                  <p>Le système doit toujours être adapté au support existant.</p>
                </div>

                <div className="border-l-2 p-5 mb-6" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>Astuce de pro</p>
                  <div className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                    <p>Si le WC est posé sur une cloison en BA13 :</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Intégrer un panneau OSB en renfort</li>
                      <li>Utiliser une plaque haute résistance type Habito</li>
                      <li>Renforcer la structure métallique si nécessaire</li>
                    </ul>
                    <p className="mt-2">Un WC suspendu peut supporter plus de 400 kg, à condition que la structure soit correctement dimensionnée.</p>
                  </div>
                </div>

                <h4 className="text-base font-semibold mb-3" style={{ color: '#124A66' }}>Alignement & détail</h4>
                <div className="space-y-2 mb-4">
                  <p>Lorsque le WC est intégré dans un placard (ex : chauffe-eau au-dessus), le calcul des hauteurs est essentiel.</p>
                  <p>Bâti + habillage + carrelage doivent s'aligner parfaitement avec les portes.</p>
                  <p className="italic">Quelques millimètres d'écart suffisent à casser l'harmonie.</p>
                </div>

                <div className="flex gap-3 mb-4">
                  <img src={plaqueGeberitNoir} alt="Plaque Geberit noire" className="w-16 md:w-20 h-auto object-contain" loading="lazy" />
                  <img src={plaqueGeberitLaiton} alt="Plaque Geberit laiton" className="w-16 md:w-20 h-auto object-contain" loading="lazy" />
                  <img src={plaqueGeberitChrome} alt="Plaque Geberit chromée" className="w-16 md:w-20 h-auto object-contain" loading="lazy" />
                </div>
                <p className="text-xs text-muted-foreground italic mb-6">
                  Plaques Geberit Sigma — noir, laiton, chromé. Compatibilité à valider selon le bâti installé.
                </p>

                {/* Bloc citation WC */}
                <div className="py-8 px-6 mt-8 text-center" style={{ backgroundColor: '#124A66' }}>
                  <p
                    className="italic font-light leading-[1.9]"
                    style={{ fontSize: '1.2em', color: '#E6EEF2', fontFamily: "'Nunito Sans', sans-serif" }}
                  >
                    "Les détails ne sont pas accessoires.<br />
                    Ils font la différence."
                  </p>
                  <div className="flex justify-end mt-5">
                    <img
                      src={carinaSig}
                      alt="Carina N."
                      className="w-[70px] md:w-[100px] opacity-90"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Meuble vasque */}
              <div id="section-meuble-vasque" className="scroll-mt-20">
                <h3 className="text-lg font-light mb-4">Meuble vasque</h3>
                <div className="space-y-3">
                  <p>
                    Le meuble vasque est l'élément central de la salle de bain. Il structure l'espace, dissimule la plomberie et offre du rangement. Le choix se fait selon :
                  </p>
                  <div className="space-y-2">
                    <p><strong className="text-foreground">Suspendu</strong> — Facilite le nettoyage au sol, rendu aérien et moderne. Le plus courant en rénovation.</p>
                    <p><strong className="text-foreground">Sur pieds</strong> — Plus classique, stable, adapté aux configurations où le mur ne permet pas une fixation lourde.</p>
                    <p><strong className="text-foreground">Simple ou double vasque</strong> — Selon l'espace et le nombre d'utilisateurs. La double vasque nécessite un meuble de 120 cm minimum.</p>
                  </div>
                  <p className="italic mt-3">
                    Dimensions, finition (laqué, bois, stratifié) et type de vasque (posée, encastrée, intégrée) — tout se décide en amont avec le maître d'œuvre.
                  </p>
                </div>
              </div>

              {/* Chauffe-eau */}
              <div id="section-chauffe-eau" className="scroll-mt-20">
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#124A66' }}>
                  Chauffe-eau : optimiser l'espace sans compromettre le confort
                </h3>

                <div className="space-y-3 mb-6">
                  <p>Dans une salle de bain rénovée, chaque centimètre compte.</p>
                  <p>Aujourd'hui, les <strong className="text-foreground">ballons plats</strong> permettent :</p>
                  <ul className="list-disc list-inside space-y-1.5">
                    <li>Un gain de place important</li>
                    <li>Une pose verticale ou horizontale</li>
                    <li>Une meilleure intégration en placard</li>
                    <li>Une consommation optimisée</li>
                  </ul>
                  <p>Nous recommandons des modèles performants comme : <strong className="text-foreground">Velis</strong> ou <strong className="text-foreground">Malicio</strong>.</p>
                </div>

                <h4 className="text-base font-semibold mb-3" style={{ color: '#124A66' }}>Chauffe-eau connecté</h4>
                <div className="space-y-2 mb-6">
                  <p>Certains modèles peuvent être pilotés à distance. Ils permettent :</p>
                  <ul className="list-disc list-inside space-y-1.5">
                    <li>D'éteindre le ballon en cas d'absence prolongée</li>
                    <li>De le relancer avant votre retour</li>
                    <li>De programmer les plages de chauffe</li>
                    <li>De suivre la consommation</li>
                  </ul>
                  <p className="italic">Idéal pour les personnes souvent en déplacement ou pour une résidence secondaire.</p>
                </div>

                <div className="border-l-2 p-5 mb-6" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#124A66' }}>Anticipation</p>
                  <ul className="space-y-1.5 text-sm" style={{ color: '#011115' }}>
                    <li>Le chauffe-eau doit rester accessible pour la maintenance</li>
                    <li>Disposer d'une ligne électrique dédiée</li>
                    <li>Être positionné en cohérence avec les hauteurs finies</li>
                  </ul>
                </div>

                {/* Bloc citation Chauffe-eau */}
                <div className="py-8 px-6 mt-8 text-center" style={{ backgroundColor: '#124A66' }}>
                  <p
                    className="italic font-light leading-[1.9]"
                    style={{ fontSize: '1.2em', color: '#E6EEF2', fontFamily: "'Nunito Sans', sans-serif" }}
                  >
                    "Un équipement bien choisi ne se voit pas.<br />
                    Il s'adapte à votre quotidien."
                  </p>
                  <div className="flex justify-end mt-5">
                    <img
                      src={carinaSig}
                      alt="Carina N."
                      className="w-[70px] md:w-[100px] opacity-90"
                      style={{ filter: 'brightness(0) invert(1)' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <SectionDivider />
      </section>
    </>
  );
}
