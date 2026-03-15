import salleDeBain from "@/assets/instagram-highlights/salle-de-bain.png";
import parquet from "@/assets/instagram-highlights/parquet.png";
import vosAvis from "@/assets/instagram-highlights/vos-avis.png";
import presse from "@/assets/instagram-highlights/presse.png";
import salleAManger from "@/assets/instagram-highlights/salle-a-manger.png";
import salon from "@/assets/instagram-highlights/salon.png";
import chambre from "@/assets/instagram-highlights/chambre.png";
import maitreOeuvre from "@/assets/instagram-highlights/maitre-oeuvre.png";
import renovationHautDeGamme from "@/assets/instagram-highlights/renovation-haut-de-gamme.png";
import parisIdf from "@/assets/instagram-highlights/paris-idf.png";
import devisContact from "@/assets/instagram-highlights/devis-contact.png";

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
    <div className="min-h-screen bg-[#eaeaea] p-8">
      <h1 className="text-[#011115] text-3xl font-bold text-center mb-4 font-display">
        Icônes Instagram Highlights
      </h1>
      <p className="text-[#011115]/70 text-center mb-12 max-w-xl mx-auto">
        Cliquez sur une icône pour la télécharger (1080×1080 PNG transparent).
        À utiliser comme couverture de stories à la une sur Instagram.
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
        {highlights.map((h) => (
          <button
            key={h.name}
            onClick={() => handleDownload(h.src, h.name)}
            className="flex flex-col items-center gap-3 group"
          >
            {/* Circle preview like Instagram */}
            <div className="w-28 h-28 rounded-full border-2 border-[#124A66]/30 group-hover:border-[#124A66] overflow-hidden bg-white p-3 transition-colors shadow-lg">
              <img
                src={h.src}
                alt={h.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[#011115] text-sm font-medium font-sans">{h.name}</span>
          </button>
        ))}
      </div>

      <h2 className="text-[#011115] text-2xl font-bold text-center mt-16 mb-4 font-display">
        Pictogrammes Bio Instagram
      </h2>
      <p className="text-[#011115]/70 text-center mb-8 max-w-xl mx-auto">
        Icônes correspondant aux lignes de votre bio Instagram.
      </p>

      <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
        {bioPictos.map((h) => (
          <button
            key={h.name}
            onClick={() => handleDownload(h.src, h.name)}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-28 h-28 rounded-full border-2 border-[#124A66]/30 group-hover:border-[#124A66] overflow-hidden bg-white p-3 transition-colors shadow-lg">
              <img
                src={h.src}
                alt={h.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[#011115] text-sm font-medium font-sans">{h.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button
          onClick={() => [...highlights, ...bioPictos].forEach((h) => handleDownload(h.src, h.name))}
          className="bg-[#124A66] text-white px-8 py-3 rounded-lg hover:bg-[#0e3a52] transition-colors font-medium shadow-lg"
        >
          📥 Tout télécharger
        </button>
      </div>
    </div>
  );
}
