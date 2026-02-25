import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { LazyVideo } from "@/components/ui/lazy-video";

export function GuideVideos() {
  return (
    <section className="py-12 bg-background border-b border-border/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-light mb-2" style={{ color: '#124A66' }}>
              Vidéos Conseils
            </h2>
            <div className="w-10 h-[2px] mx-auto mb-4" style={{ backgroundColor: '#c2a016' }} />
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              Nos vidéos explicatives pour faire les bons choix avant vos travaux
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <VideoCard
              src="/videos/vasque-a-poser-1.mp4"
              title="Comment choisir votre vasque à poser"
              views="17.4k"
            />
            <VideoCard
              src="/videos/vasque-a-poser-2.mp4"
              title="Faut-il carreler toute hauteur devant le meuble vasque ?"
              description="Réponse : Pas forcément. S'il y a un miroir toute hauteur, le carrelage derrière n'a aucun intérêt technique."
              tip="Je vous explique tout dans la vidéo, pour faire les bons choix et garder un budget maîtrisé."
              views="15.9k"
            />
            <VideoCard
              src="/videos/vmc-1.mp4"
              title="VMC WC + rangement malin : le combo gagnant"
              description="En conservant la VMC collective et en intégrant l'accès dans la menuiserie, on a pu créer un placard au-dessus des WC."
              tip="Plus de rangements, une solution propre, conforme… et futée."
              views="63.5k"
            />
            <VideoCard
              src="/videos/acces-evacuation-1.mp4"
              title="Accès évacuation : indispensable en cas d'engorgement"
              description="L'accès aux évacuations doit toujours rester accessible. En cas d'engorgement, une trappe permet d'intervenir sans tout casser."
              tip="Un détail essentiel à prévoir dès la conception."
              views="8.2k"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function VideoCard({
  src,
  title,
  description,
  tip,
  views,
}: {
  src: string;
  title: string;
  description?: string;
  tip?: string;
  views: string;
}) {
  return (
    <div className="border border-border/40 overflow-hidden">
      <LazyVideo src={src} className="w-full aspect-[9/16]" title={title} />
      <div className="p-3">
        <h3 className="font-medium text-sm text-foreground line-clamp-2">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {tip && (
          <p className="text-xs mt-2 italic" style={{ color: '#124A66' }}>{tip}</p>
        )}
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <Eye className="w-3 h-3" /> {views} vues
        </p>
      </div>
    </div>
  );
}
