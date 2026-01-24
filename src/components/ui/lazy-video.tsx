import { useState, useRef, useEffect } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
  poster?: string;
  title?: string;
  controls?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
}

export function LazyVideo({ 
  src, 
  className = "", 
  poster,
  title,
  controls = true,
  muted = false,
  autoPlay = false,
  playsInline = true
}: LazyVideoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: "100px",
        threshold: 0.1 
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Extract first frame from video as thumbnail
  useEffect(() => {
    if (!isVisible || poster || thumbnailUrl) return;

    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.preload = 'metadata';
    
    video.onloadeddata = () => {
      video.currentTime = 0.1; // Seek to 0.1s to get a frame
    };
    
    video.onseeked = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setThumbnailUrl(dataUrl);
        }
      } catch (e) {
        console.log('Could not generate thumbnail');
      }
    };

    video.src = src;
    video.load();

    return () => {
      video.src = '';
    };
  }, [isVisible, src, poster, thumbnailUrl]);

  const handlePlay = () => {
    setShowVideo(true);
  };

  // Default placeholder while loading thumbnail
  const defaultPoster = `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="270" height="480" viewBox="0 0 270 480">
      <rect fill="#1a1a1a" width="270" height="480"/>
      <polygon fill="#ffffff" opacity="0.8" points="120,200 120,280 180,240" />
    </svg>
  `)}`;

  const displayPoster = poster || thumbnailUrl || defaultPoster;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {!isVisible ? (
        // Placeholder before intersection
        <div className="w-full h-full bg-muted/30 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 animate-pulse" />
        </div>
      ) : !showVideo ? (
        // Show poster with play button until user clicks
        <button
          onClick={handlePlay}
          className="w-full h-full relative group cursor-pointer bg-black"
          aria-label={`Lire la vidéo${title ? `: ${title}` : ''}`}
        >
          <img 
            src={displayPoster} 
            alt={title || "Aperçu vidéo"}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <span className="text-white text-xs font-medium">Cliquez pour lire</span>
          </div>
        </button>
      ) : (
        // Actual video element
        <video 
          src={src}
          className="w-full h-full object-cover"
          controls={controls}
          muted={muted}
          autoPlay={true}
          playsInline={playsInline}
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
        >
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
      )}
      
      {/* Loading indicator when video is loading */}
      {showVideo && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
