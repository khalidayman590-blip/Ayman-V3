import React, { useEffect, useRef, useState, useMemo } from 'react';
import { AppConfig } from '../types';
import { ArrowDown } from 'lucide-react';

interface Props {
  config: AppConfig;
}

const TOTAL_FRAMES = 192;
const BASE_URL = "https://acrimldaoexwwnibqcwu.supabase.co/storage/v1/object/public/Portfolio/webp-frames/";

const ParallaxHero: React.FC<Props> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images logic
  const images = useMemo(() => {
    const imgs: HTMLImageElement[] = [];
    if (typeof window !== 'undefined') {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        // Construct URL: frame_000_delay-0.04s.png
        const frameNum = i.toString().padStart(3, '0');
        img.src = `${BASE_URL}frame_${frameNum}_delay-0.04s.png`;
        imgs.push(img);
        img.onload = () => {
          setLoadingProgress((prev) => prev + 1);
        };
      }
    }
    return imgs;
  }, []);

  useEffect(() => {
    if (loadingProgress >= TOTAL_FRAMES * 0.5) { // Show when 50% loaded for perceived speed
      setImagesLoaded(true);
    }
  }, [loadingProgress]);

  // Scroll and Draw Logic
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !canvasRef.current || !imagesLoaded) return;

      const container = containerRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Calculate scroll progress relative to the container height
      const startY = container.offsetTop;
      const scrollY = window.scrollY;
      const endY = startY + container.scrollHeight - window.innerHeight;
      
      let progress = (scrollY - startY) / (endY - startY);
      progress = Math.max(0, Math.min(1, progress));

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * (TOTAL_FRAMES - 1))
      );

      const img = images[frameIndex];

      if (img && img.complete) {
        // Draw image covering the canvas (object-fit: cover equivalent)
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initial draw
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [images, imagesLoaded]);

  // Handle Canvas Resize
  useEffect(() => {
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Skill Highlights Data
  const skills = [
    { id: '01', label: 'AI Website Building' },
    { id: '02', label: 'Animated Parallax' },
    { id: '03', label: 'AI-Assisted Web Apps' },
    { id: '04', label: 'Internal Tools Automation' },
  ];

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden rounded-b-[3rem] shadow-2xl z-10">
        
        {/* Background Canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover bg-neutral-900"
        />

        {/* Overlay Gradient for Text Readability */}
        <div className={`absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none transition-opacity duration-1000 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`} />

        {/* Loading State */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950 z-50 text-white">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-sm tracking-widest uppercase">Loading Sequence...</p>
            </div>
          </div>
        )}

        {/* Identity Block (Left Aligned) */}
        <div className="absolute inset-0 container mx-auto px-6 flex flex-col justify-center h-full z-20 pointer-events-none">
          <div className="max-w-2xl pointer-events-auto">
            
            {/* Intro Line */}
            <p className="text-sm md:text-base font-medium tracking-[0.2em] mb-4 uppercase flex items-center gap-2" style={{ color: config.accentColor }}>
              <span className="w-8 h-[2px]" style={{ backgroundColor: config.accentColor }}></span>
              Hey, welcome to the
            </p>

            {/* Huge Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight mb-8 drop-shadow-lg">
              {config.communityName.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>

            {/* Tagline / Intro */}
            <p className="text-lg md:text-xl text-neutral-300 max-w-lg leading-relaxed mb-12 border-l-2 pl-6" style={{ borderColor: config.accentColor }}>
              {config.introText}
            </p>

            {/* Skill Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
              {skills.map((skill) => (
                <div key={skill.id} className="group cursor-default">
                  <span className="block text-xs font-bold opacity-50 mb-1" style={{ color: config.accentColor }}>#{skill.id}</span>
                  <span className="text-xs md:text-sm font-semibold text-white group-hover:text-gray-200 transition-colors">
                    {skill.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
            <ArrowDown size={24} />
        </div>
      </div>
    </div>
  );
};

export default ParallaxHero;
