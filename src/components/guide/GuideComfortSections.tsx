import { motion } from "framer-motion";
import { Ruler, HelpCircle, AlertTriangle, CheckCircle, Lightbulb, Paintbrush, Wind } from "lucide-react";
import { GuideSectionHeader } from "./GuideSectionHeader";
import baignoireRangementNiches from "@/assets/baignoire-rangement-niches.jpg";
import baignoireRangementTiroirs from "@/assets/baignoire-rangement-tiroirs.jpg";

export function GuideComfortSections() {
  return (
    <>
      {/* Section 10 - Choisir sa baignoire */}
      <section id="section-10" className="py-16 bg-accent/20 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GuideSectionHeader number={10} icon={Ruler} title="Choisir sa baignoire" />

            <div className="bg-accent/30 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm text-foreground">C'est quoi une baignoire ?</p>
                  <p className="text-muted-foreground text-xs mt-1">Un équipement de bain permettant l'immersion complète du corps. Choix selon l'espace, le confort souhaité et la structure du sol (poids à supporter).</p>
                </div>
              </div>
            </div>

            {/* Types de baignoires */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Ruler className="w-4 h-4 text-primary" />
                Types de baignoires
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { emoji: "📐", type: "Droite", desc: "Standard, tous espaces" },
                  { emoji: "🔲", type: "Îlot", desc: "Design, espace dégagé" },
                  { emoji: "📐", type: "D'angle", desc: "Optimise les coins" },
                  { emoji: "🚿", type: "Bain-douche", desc: "Combo 2-en-1" },
                ].map(({ emoji, type, desc }) => (
                  <div key={type} className="bg-background border border-border rounded-lg p-3 text-center">
                    <span className="text-lg">{emoji}</span>
                    <p className="font-medium text-xs mt-1">{type}</p>
                    <p className="text-muted-foreground text-[10px]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Matériaux */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3">Matériaux</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {[
                  { name: "Acrylique", desc: "Léger, chaud, bon rapport qualité-prix", pop: "Le plus courant" },
                  { name: "Acier émaillé", desc: "Résistant, durable, plus froid", pop: "Solide" },
                  { name: "Fonte", desc: "Haut de gamme, très lourd (80-120kg)", pop: "Luxe" },
                  { name: "Solid Surface", desc: "Design, doux au toucher, sur mesure", pop: "Premium" },
                ].map(({ name, desc, pop }) => (
                  <div key={name} className="bg-background border border-border rounded-lg p-3">
                    <p className="font-medium">{name}</p>
                    <p className="text-muted-foreground text-[10px] mt-1">{desc}</p>
                    <span className="inline-block mt-1 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{pop}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photos rangement */}
            <div className="mb-6">
              <h3 className="font-semibold text-sm mb-3">Rangements intégrés</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img src={baignoireRangementNiches} alt="Baignoire avec niches de rangement intégrées" className="w-full h-48 object-cover" />
                  <p className="bg-accent/50 text-sm p-2 text-center">Niches intégrées au tablier</p>
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img src={baignoireRangementTiroirs} alt="Baignoire avec tiroirs de rangement" className="w-full h-48 object-cover" />
                  <p className="bg-accent/50 text-sm p-2 text-center">Tiroirs sous baignoire</p>
                </div>
              </div>
              <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "🗄️", label: "Tiroirs intégrés", desc: "Produits, serviettes, jouets enfants" },
                    { icon: "📦", label: "Niches latérales", desc: "Accès facile, esthétique épurée" },
                    { icon: "🚪", label: "Trappe d'accès", desc: "Maintenance siphon + rangement" },
                    { icon: "🧺", label: "Tablier amovible", desc: "Stockage linge, paniers" },
                  ].map(({ icon, label, desc }) => (
                    <div key={label} className="bg-white/80 rounded-lg p-3">
                      <p className="font-medium text-xs text-green-800">{icon} {label}</p>
                      <p className="text-green-600 text-[10px]">{desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-green-700 text-xs mt-3 font-medium">
                  👉 Dans les petites salles de bain, chaque cm² compte. La baignoire devient un vrai meuble de rangement.
                </p>
              </div>
            </div>

            {/* Contrainte poids */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-800 text-sm">⚠️ Attention au poids</p>
                  <p className="text-amber-700 text-xs mt-1">
                    Une baignoire remplie + utilisateur = 300 à 400 kg. Vérifier la structure du sol (plancher bois, dalle béton).
                    La fonte est particulièrement lourde (80-120 kg à vide).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sections 11, 12, 13 - Finitions & Confort */}
      <section id="section-11" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Finitions & Confort
              </span>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground">
                Peinture, VMC & Éclairage
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div id="section-11-content" className="bg-background rounded-2xl p-6 shadow-sm border border-primary/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-primary/20 shadow-sm relative">
                    <Paintbrush className="w-5 h-5 text-primary" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold">11</span>
                  </div>
                  <h3 className="font-semibold text-lg">Peinture</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm">
                    Peinture spéciale pièces humides, résistante à la condensation, lessivable.
                  </p>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <p className="text-primary font-medium text-sm">👉 Unikalo – Aqualine Satin</p>
                  </div>
                </div>
              </div>

              <div id="section-12" className="bg-background rounded-2xl p-6 shadow-sm border border-primary/10 scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-primary/20 shadow-sm relative">
                    <Wind className="w-5 h-5 text-primary" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold">12</span>
                  </div>
                  <h3 className="font-semibold text-lg">VMC</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm">
                    Sans VMC : humidité stagnante, moisissures, dégradation prématurée.
                  </p>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <p className="text-primary font-medium text-sm">👉 Une VMC bien pensée protège toute la salle de bain</p>
                  </div>
                </div>
              </div>

              <div id="section-13" className="bg-background rounded-2xl p-6 shadow-sm border border-primary/10 scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-primary/20 shadow-sm relative">
                    <Lightbulb className="w-5 h-5 text-primary" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-[10px] font-bold">13</span>
                  </div>
                  <h3 className="font-semibold text-lg">Éclairage & chauffage</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full font-medium">Spots trimless</span>
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full font-medium">4000K</span>
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full font-medium">IP44/65</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Sèche-serviette électrique ou mixte. Chauffe-eau accessible.
                  </p>
                  <div className="bg-primary/10 rounded-lg p-3">
                    <p className="text-primary font-medium text-sm">👉 Norme NF C 15-100</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Détails techniques */}
            <div className="mt-8 bg-background rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                Détails techniques
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="font-medium text-sm mb-2">🔆 Spots</p>
                  <p className="text-muted-foreground text-xs">500 lumens, blanc neutre 4000K, encastrés sans collerette</p>
                </div>
                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="font-medium text-sm mb-2">🌡️ Sèche-serviette</p>
                  <p className="text-muted-foreground text-xs">Électrique (500-1000W) ou mixte raccordé au chauffage</p>
                </div>
                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="font-medium text-sm mb-2">🔥 Chauffe-eau</p>
                  <p className="text-muted-foreground text-xs">Cumulus, thermodynamique (70% économie) ou instantané</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
