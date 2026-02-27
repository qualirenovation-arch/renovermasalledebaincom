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
  <div className="container mx-auto px-4 mt-8"><div className="max-w-4xl mx-auto border-b border-border/30" /></div>
);

export function GuideInfrastructureSections() {
  return (
    <>
      {/* Section 5 - Plomberie */}
      <section id="section-5" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={6} title="Plomberie : refaire entièrement pour éviter les fuites" />

            <div className="border-l-2 p-3 mb-4" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
                <li>Le plomb est remplacé par du cuivre ou du multicouche</li>
                <li>Des nourrices eau chaude / eau froide sont posées</li>
                <li>Refaire à moitié, c'est prendre le risque de refaire deux fois</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Remplacement</p>
                <ul className="space-y-0.5 text-xs text-muted-foreground">
                  <li>Plomb → <strong className="text-foreground">cuivre</strong> ou <strong className="text-foreground">multicouche</strong></li>
                  <li>Compteurs déplacés (accessibles)</li>
                  <li><strong className="text-foreground">Nourrices</strong> eau chaude / froide</li>
                </ul>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Avantages</p>
                <ul className="space-y-0.5 text-xs text-muted-foreground">
                  <li>Isoler chaque point d'eau</li>
                  <li>Intervenir rapidement en cas de fuite</li>
                  <li>Sécuriser l'ensemble du logement</li>
                </ul>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Notre principe</p>
                <p className="text-xs text-muted-foreground italic">Refaire à moitié, c'est prendre le risque de refaire deux fois.</p>
              </div>
            </div>
          </motion.div>
        </div>
        <SectionDivider />
      </section>

      {/* Section 6 - Étanchéité */}
      <section id="section-6" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={7} title="Étanchéité salle de bain : la base invisible" />

            <div className="border-l-2 p-3 mb-4" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
                <li>Système d'étanchéité sous carrelage obligatoire (SPEC)</li>
                <li>Bandes d'angles et traitement des points singuliers</li>
                <li>Un joint seul ne fait jamais une étanchéité</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Avant carrelage</p>
                <ul className="space-y-0.5 text-xs text-muted-foreground">
                  <li>Étanchéité sous carrelage (SPEC)</li>
                  <li>Bandes d'angles</li>
                  <li>Points singuliers traités</li>
                  <li>Continuité douche & baignoire</li>
                </ul>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Principe</p>
                <p className="text-xs text-muted-foreground font-medium">Un joint seul ne fait jamais une étanchéité.</p>
                <p className="text-xs text-muted-foreground mt-1">L'étanchéité est un système complet, invisible une fois terminé.</p>
              </div>
              <div className="border border-border/30 rounded p-3 overflow-hidden">
                <img src={butteschaumont6} alt="Étanchéité Weber Aquastop sous carrelage" className="w-full h-32 object-cover mb-1" loading="lazy" />
                <p className="text-xs text-muted-foreground text-center">Weber Aquastop — obligatoire</p>
              </div>
            </div>
          </motion.div>
        </div>
        <SectionDivider />
      </section>

      {/* Section 7 - Receveur de douche */}
      <section id="section-7" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={8} title="Receveur de douche : le bon choix" />

            <div className="border-l-2 p-3 mb-4" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
                <li>Extra-plat, sur pieds ou à carreler selon la configuration</li>
                <li>La hauteur de la culotte détermine les possibilités en copropriété</li>
                <li>Tout ce qui peut fuir doit rester accessible</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Types</p>
                <div className="space-y-0.5 text-xs text-muted-foreground">
                  <p><strong>Extra-plat</strong> — plain-pied</p>
                  <p><strong>Sur pieds</strong> — siphon accessible</p>
                  <p><strong>À carreler</strong> — douche italienne</p>
                </div>
                <img src={receveursDouche} alt="Receveurs de douche" className="w-full h-24 object-cover mt-2" loading="lazy" />
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Matériaux</p>
                <div className="space-y-0.5 text-xs text-muted-foreground">
                  <p><strong>Résine</strong> — durable, le plus courant</p>
                  <p><strong>Acrylique</strong> — léger, antidérapant</p>
                  <p><strong>Grès émaillé</strong> — résistant, lourd</p>
                  <p><strong>Acier émaillé</strong> — sur commande</p>
                </div>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Accessibilité</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><strong className="text-foreground">Copropriété</strong> — culotte détermine plain-pied ou sur pieds</p>
                  <p><strong className="text-foreground">Maison</strong> — liberté totale</p>
                  <p className="font-medium text-foreground mt-2">Tout ce qui peut fuir doit rester accessible.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <SectionDivider />
      </section>

      {/* Section 8 - Choisir sa baignoire */}
      <section id="section-8" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={9} title="Choisir sa baignoire" />

            <div className="border-l-2 p-3 mb-4" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
                <li>Choix selon l'espace, le confort et la structure du sol</li>
                <li>Attention au poids : 300 à 400 kg une fois remplie</li>
                <li>La baignoire peut devenir un vrai meuble de rangement</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Types</p>
                <div className="space-y-0.5 text-xs text-muted-foreground">
                  <p><strong>Droite</strong> — Standard, tous espaces</p>
                  <p><strong>Îlot</strong> — Design, espace dégagé</p>
                  <p><strong>D'angle</strong> — Optimise les coins</p>
                  <p><strong>Bain-douche</strong> — Combo 2-en-1</p>
                </div>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Matériaux</p>
                <div className="space-y-0.5 text-xs text-muted-foreground">
                  <p><strong>Acrylique</strong> — léger, bon rapport qualité-prix</p>
                  <p><strong>Acier émaillé</strong> — résistant, durable</p>
                  <p><strong>Fonte</strong> — haut de gamme, lourd</p>
                  <p><strong>Solid Surface</strong> — design, sur mesure</p>
                </div>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Rangements</p>
                <div className="grid grid-cols-2 gap-1 mb-2">
                  <img src={baignoireRangementNiches} alt="Niches baignoire" className="w-full h-16 object-cover" loading="lazy" />
                  <img src={baignoireRangementTiroirs} alt="Tiroirs baignoire" className="w-full h-16 object-cover" loading="lazy" />
                </div>
                <div className="space-y-0.5 text-xs text-muted-foreground">
                  <p><strong>Tiroirs</strong> — Produits, serviettes</p>
                  <p><strong>Niches</strong> — Accès facile</p>
                  <p><strong>Trappe</strong> — Maintenance + rangement</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-foreground font-medium mt-2">Poids remplie : 300-400 kg. Vérifier structure du sol.</p>
          </motion.div>
        </div>
        <SectionDivider />
      </section>

      {/* Section 9 - Paroi de douche */}
      <section id="section-9" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={10} title="Paroi de douche : quelle ouverture, quelle couleur et quel verre choisir ?" />

            <div className="border-l-2 p-3 mb-4" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
                <li>3 critères : type d'ouverture, couleur du profilé, type de verre</li>
                <li>Toujours harmoniser avec la robinetterie et les accessoires</li>
                <li>Épaisseur recommandée : 6 à 8 mm minimum</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Ouverture</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><strong>Fixe</strong> — Minimaliste, douche italienne</p>
                  <p><strong>Coulissante</strong> — Petites surfaces, gain de place</p>
                  <p><strong>Battante</strong> — Accès maximal, dégagement nécessaire</p>
                </div>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Profilé</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><strong>Noir mat</strong> — Atelier, contemporain</p>
                  <p><strong>Laiton</strong> — Chaleureux, raffiné</p>
                  <p><strong>Chromé</strong> — Intemporel, polyvalent</p>
                </div>
                <p className="text-xs text-muted-foreground italic mt-1">Harmoniser avec robinetterie et accessoires.</p>
              </div>
              <div className="border border-border/30 rounded p-3">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Verre</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><strong>Transparent</strong> — Agrandit l'espace</p>
                  <p><strong>Dépoli</strong> — Intimité + lumière</p>
                  <p><strong>Sérigraphié</strong> — Décoratif</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1"><strong className="text-foreground">6-8 mm</strong> min. · Anticalcaire conseillé</p>
              </div>
            </div>
          </motion.div>
        </div>
        <SectionDivider />
      </section>

      {/* Section 10 - Équipements sanitaires */}
      <section id="section-10" className="py-8 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={11} title="WC, meuble vasque & chauffe-eau" />

            <div className="border-l-2 p-3 mb-4" style={{ borderColor: '#c2a016', backgroundColor: '#eaeaea' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#124A66' }}>À retenir</p>
              <ul className="space-y-0.5 text-sm" style={{ color: '#011115' }}>
                <li>WC suspendu avec bâti-support Geberit : le standard en rénovation</li>
                <li>Le meuble vasque structure l'espace et cache la plomberie</li>
                <li>Le chauffe-eau doit rester accessible et adapté à la consommation</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              {/* WC suspendu */}
              <div id="section-wc" className="border border-border/30 rounded p-3 scroll-mt-20">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>WC suspendu</p>
                <img src={batiSupportGeberit} alt="Bâti-support Geberit" className="w-full h-24 object-contain mb-2" loading="lazy" />
                <div className="space-y-0.5 text-xs text-muted-foreground">
                  <p>Bâti <strong className="text-foreground">Geberit Duofix</strong></p>
                  <p>Standard 12 cm · Faible profondeur 8 cm</p>
                  <p>Hauteur 112 cm · Réduite 80 cm</p>
                  <p><strong>Autoportant</strong> (sol) ou <strong>portant</strong> (mur+sol)</p>
                </div>
                <div className="flex gap-1 mt-2">
                  <img src={plaqueGeberitNoir} alt="Plaque noire" className="w-10 h-auto object-contain" loading="lazy" />
                  <img src={plaqueGeberitLaiton} alt="Plaque laiton" className="w-10 h-auto object-contain" loading="lazy" />
                  <img src={plaqueGeberitChrome} alt="Plaque chromée" className="w-10 h-auto object-contain" loading="lazy" />
                </div>
              </div>

              {/* Meuble vasque */}
              <div id="section-meuble-vasque" className="border border-border/30 rounded p-3 scroll-mt-20">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Meuble vasque</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>L'élément central : structure l'espace, cache la plomberie, offre du rangement.</p>
                  <p><strong>Suspendu</strong> — Aérien, nettoyage facile</p>
                  <p><strong>Sur pieds</strong> — Classique, stable</p>
                  <p><strong>Simple / double vasque</strong> — Selon espace</p>
                  <p className="italic mt-1">Finition, dimensions et type de vasque se décident en amont.</p>
                </div>
              </div>

              {/* Chauffe-eau */}
              <div id="section-chauffe-eau" className="border border-border/30 rounded p-3 scroll-mt-20">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#124A66' }}>Chauffe-eau</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><strong className="text-foreground">Ballons plats</strong> (Velis, Malicio)</p>
                  <p>Pose verticale ou horizontale</p>
                  <p>Intégration en placard</p>
                  <p><strong>Connecté</strong> — pilotage à distance</p>
                  <p className="mt-1">Accessible · Ligne dédiée · Alignement précis avec bâti + carrelage + portes</p>
                  <p className="italic mt-1" style={{ color: '#124A66' }}>On vous épargne le casse-tête.</p>
                </div>
              </div>
            </div>

            {/* Bloc citation unique */}
            <div className="py-8 px-6 mt-4 text-center" style={{ backgroundColor: '#124A66' }}>
              <p className="italic font-light leading-[1.9]" style={{ fontSize: '1.2em', color: '#E6EEF2', fontFamily: "'Nunito Sans', sans-serif" }}>
                "Les détails ne sont pas accessoires.<br />Ils font la différence."
              </p>
              <div className="flex justify-end mt-5">
                <img src={carinaSig} alt="Carina N." className="w-[100px] md:w-[150px] opacity-90" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
            </div>
          </motion.div>
        </div>
        <SectionDivider />
      </section>
    </>
  );
}
