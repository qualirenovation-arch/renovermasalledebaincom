import houzzAnnouncement from "@/assets/houzz-announcement-final.jpg";
import houzzSquare from "@/assets/houzz-instagram-square.jpg";
import houzzStory from "@/assets/houzz-instagram-story.jpg";

export default function VisuelsHouzz() {
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
      </div>
    </div>
  );
}
