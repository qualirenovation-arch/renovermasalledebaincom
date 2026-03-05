import { useCallback } from "react";
import houzzAnnouncement from "@/assets/houzz-announcement-final.jpg";
import houzzSquare from "@/assets/houzz-instagram-square.jpg";
import houzzStory from "@/assets/houzz-instagram-story.jpg";
import logoSdbParis10 from "/images/logo-salle-de-bain-paris-10.png";
import paris10Dore from "@/assets/paris10-dore-branded.jpg";
import houzzPiedDePage from "@/assets/houzz-pied-de-page.jpg";

export default function VisuelsHouzz() {
  const handleExportPiedDePage = useCallback(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const textHeight = 60;
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height + textHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw image
      ctx.drawImage(img, 0, 0);

      // Draw text banner
      ctx.fillStyle = "#f5f5f5";
      ctx.fillRect(0, img.height, canvas.width, textHeight);

      ctx.fillStyle = "#124A66";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const fontSize = Math.max(16, Math.round(canvas.width / 55));
      ctx.font = `500 ${fontSize}px sans-serif`;
      ctx.fillText(
        "Découvrez notre nouveau site dédié à la salle de bain : https://renovermasalledebain.fr",
        canvas.width / 2,
        img.height + textHeight / 2
      );

      // Download
      const link = document.createElement("a");
      link.download = "houzz-pied-de-page-complet.jpg";
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();
    };
    img.src = houzzPiedDePage;
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-white text-3xl font-bold text-center mb-8">Visuels Houzz générés</h1>
      
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Format 16:9 */}
        <div>
          <h2 className="text-white text-xl mb-4">Format 16:9 (Houzz)</h2>
          <img 
            src={houzzAnnouncement} 
            alt="Houzz Announcement 16:9" 
            className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"
          />
        </div>

        {/* Format Carré */}
        <div>
          <h2 className="text-white text-xl mb-4">Format Carré 1:1 (Instagram Feed)</h2>
          <img 
            src={houzzSquare} 
            alt="Houzz Instagram Square" 
            className="w-full max-w-lg mx-auto rounded-lg shadow-2xl"
          />
        </div>

        {/* Format Story */}
        <div>
          <h2 className="text-white text-xl mb-4">Format Story 9:16 (Instagram Stories)</h2>
          <img 
            src={houzzStory} 
            alt="Houzz Instagram Story" 
            className="max-h-[80vh] mx-auto rounded-lg shadow-2xl"
          />
        </div>

        {/* Photo Paris 10 Faubourg Saint-Denis Doré */}
        <div>
          <h2 className="text-white text-xl mb-4">Paris 10ème — Faubourg Saint-Denis Doré</h2>
          <img 
            src={paris10Dore} 
            alt="Salle de bain Paris 10 Faubourg Saint-Denis dorée" 
            className="w-full max-w-3xl mx-auto rounded-lg shadow-2xl"
          />
        </div>

        {/* Logo Salle de Bain Paris 10 */}
        <div>
          <h2 className="text-white text-xl mb-4">Logo Salle de Bain Paris 10</h2>
          <img 
            src={logoSdbParis10} 
            alt="Logo Salle de Bain Paris 10" 
            className="w-full max-w-3xl mx-auto rounded-lg shadow-2xl"
          />
        </div>

        {/* Pied de page Houzz */}
        <div>
          <h2 className="text-white text-xl mb-4">Pied de page Houzz</h2>
          <div className="relative max-w-4xl mx-auto">
            <img 
              src={houzzPiedDePage} 
              alt="Pied de page Houzz" 
              className="w-full rounded-t-lg shadow-2xl"
            />
            <div className="bg-[#f5f5f5] rounded-b-lg py-3 px-4 text-center shadow-2xl">
              <p className="text-[#124A66] text-sm md:text-base lg:text-lg font-medium">
                Découvrez notre nouveau site dédié à la salle de bain :{" "}
                <a href="https://renovermasalledebain.fr" target="_blank" rel="noopener noreferrer" className="font-bold underline">
                  https://renovermasalledebain.fr
                </a>
              </p>
            </div>
          </div>
          <button
            onClick={handleExportPiedDePage}
            className="mt-4 mx-auto block bg-[#124A66] text-white px-6 py-2 rounded-lg hover:bg-[#0e3a52] transition-colors font-medium"
          >
            📥 Télécharger l'image complète
          </button>
        </div>
      </div>
    </div>
  );
}
