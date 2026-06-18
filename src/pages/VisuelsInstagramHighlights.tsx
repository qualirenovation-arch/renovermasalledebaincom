import salleDeBainData from "@/assets/instagram-highlights/salle-de-bain.png.asset.json";
const salleDeBain = salleDeBainData.url;
import parquetData from "@/assets/instagram-highlights/parquet.png.asset.json";
const parquet = parquetData.url;
import vosAvisData from "@/assets/instagram-highlights/vos-avis.png.asset.json";
const vosAvis = vosAvisData.url;
import presseData from "@/assets/instagram-highlights/presse.png.asset.json";
const presse = presseData.url;
import salleAMangerData from "@/assets/instagram-highlights/salle-a-manger.png.asset.json";
const salleAManger = salleAMangerData.url;
import salonData from "@/assets/instagram-highlights/salon.png.asset.json";
const salon = salonData.url;
import chambreData from "@/assets/instagram-highlights/chambre.png.asset.json";
const chambre = chambreData.url;
import maitreOeuvreData from "@/assets/instagram-highlights/maitre-oeuvre.png.asset.json";
const maitreOeuvre = maitreOeuvreData.url;
import renovationHautDeGammeData from "@/assets/instagram-highlights/renovation-haut-de-gamme.png.asset.json";
const renovationHautDeGamme = renovationHautDeGammeData.url;
import parisIdfData from "@/assets/instagram-highlights/paris-idf.png.asset.json";
const parisIdf = parisIdfData.url;
import devisContactData from "@/assets/instagram-highlights/devis-contact.png.asset.json";
const devisContact = devisContactData.url;
import { Picture } from "@/components/Picture";

const highlights = [
  { name: "Salle de Bain", src: salleDeBain },
  { name: "Parquet", src: parquet },
  { name: "Vos avis", src: vosAvis },
  { name: "Presse", src: presse },
  { name: "Salle à manger", src: salleAManger },
  { name: "Salon", src: salon },
  { name: "Chambre", src: chambre },
];

const bioPictos = [
  { name: "Maître d'œuvre", src: maitreOeuvre },
  { name: "Haut de gamme", src: renovationHautDeGamme },
  { name: "Paris & IDF", src: parisIdf },
  { name: "Devis / Contact", src: devisContact },
];

export default function VisuelsInstagramHighlights() {
  const handleDownload = (src: string, name: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = `highlight-${name.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-stone p-8">
      <h1 className="text-primary text-3xl font-bold text-center mb-4 font-display">
        Icônes Instagram Highlights
      </h1>
      <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
        Cliquez sur une icône pour la télécharger (1080×1080 PNG transparent).
        À utiliser comme couverture de stories à la une sur Instagram.
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
        {highlights.map((h, index) => {
          const bgColors = [
            "bg-primary/10",
            "bg-gold/10", 
            "bg-navy/10",
            "bg-primary/15",
            "bg-gold/15",
            "bg-navy/15",
            "bg-primary/10",
          ];
          return (
            <button
              key={h.name}
              onClick={() => handleDownload(h.src, h.name)}
              className="flex flex-col items-center gap-3 group"
            >
              <div className={`w-28 h-28 rounded-full border-2 border-gold/40 group-hover:border-gold overflow-hidden ${bgColors[index]} p-3 transition-all shadow-lg hover:shadow-gold`}>
                <Picture
                  src={h.src}
                  alt={h.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-foreground text-sm font-medium font-sans">{h.name}</span>
            </button>
          );
        })}
      </div>

      <h2 className="text-primary text-2xl font-bold text-center mt-16 mb-4 font-display">
        Pictogrammes Bio Instagram
      </h2>
      <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">
        Icônes correspondant aux lignes de votre bio Instagram.
      </p>

      <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
        {bioPictos.map((h, index) => {
          const bgColors = [
            "bg-primary/10",
            "bg-gold/10",
            "bg-navy/10",
            "bg-gold/15",
          ];
          return (
            <button
              key={h.name}
              onClick={() => handleDownload(h.src, h.name)}
              className="flex flex-col items-center gap-3 group"
            >
              <div className={`w-28 h-28 rounded-full border-2 border-primary/30 group-hover:border-primary overflow-hidden ${bgColors[index]} p-3 transition-all shadow-lg hover:shadow-navy`}>
                <Picture
                  src={h.src}
                  alt={h.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-foreground text-sm font-medium font-sans">{h.name}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={() => [...highlights, ...bioPictos].forEach((h) => handleDownload(h.src, h.name))}
          className="btn-cta"
        >
          📥 Tout télécharger
        </button>
      </div>
    </div>
  );
}
