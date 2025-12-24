
import React, { useEffect, useRef, useState } from 'react';
import { AppConfig } from '../types';
import { ArrowDown } from 'lucide-react';

interface Props {
  config: AppConfig;
}

const TOTAL_FRAMES = 192;

const ParallaxHero: React.FC<Props> = ({ config }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Use a ref to store images so we don't trigger re-renders on every load
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload images logic
  useEffect(() => {
    // Reset state when sequence URL changes
    setImagesLoaded(false);
    imagesRef.current = [];
    
    if (typeof window === 'undefined') return;

    const imgs: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    // Lower threshold to get users to content faster (approx 10% of frames)
    // The rest will load in background while user reads the hero text
    const threshold = 20; 

    // Safety timeout: Ensure we show content even if network is slow
    const safetyTimeout = setTimeout(() => {
        if (!imagesLoaded) {
            console.warn("Image sequence loading timed out or incomplete. Showing content.");
            setImagesLoaded(true);
        }
    }, 2000); // 2 seconds max wait

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      // Construct URL: frame_000_delay-0.04s.png
      const frameNum = i.toString().padStart(3, '0');
      img.src = `${config.sequenceUrl}frame_${frameNum}_delay-0.04s.png`;
      
      img.onload = () => {
        loadedCount++;
        // Only update state once when we hit the threshold
        if (loadedCount === threshold) {
          setImagesLoaded(true);
        }
      };
      
      // Handle errors gracefully
      img.onerror = () => {
          // If essential frames fail, we still want to count towards "attempted" so we don't block forever
          // But practically the timeout handles the "stuck" case.
          console.warn(`Failed to load frame ${frameNum}`);
      };

      imgs.push(img);
    }
    
    imagesRef.current = imgs;

    return () => clearTimeout(safetyTimeout);
  }, [config.sequenceUrl]);

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

      const img = imagesRef.current[frameIndex];

      // Ensure image is valid before drawing
      if (img && img.complete && img.naturalWidth > 0) {
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
    if (imagesLoaded) {
      handleScroll();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [imagesLoaded]); 

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
      <div className="sticky top-0 h-screen w-full overflow-hidden rounded-b-[3rem] shadow-2xl z-10 bg-neutral-900">
        
        {/* Background Canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover bg-neutral-900"
        />

        {/* Overlay Gradient for Text Readability - Darker on left for text */}
        <div className={`absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent pointer-events-none transition-opacity duration-1000 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`} />

        {/* Loading State */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950 z-50 text-white">
            <div className="text-center">
              <div 
                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4"
                style={{ borderColor: config.accentColor }}
              ></div>
              <p className="text-sm tracking-widest uppercase text-neutral-400">Loading Experience...</p>
            </div>
          </div>
        )}

        {/* Content Layer */}
        <div className="absolute inset-0 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full z-20 pointer-events-none">
          
          {/* Top Left Identity Block */}
          <div className="absolute top-[15%] left-6 md:left-12 max-w-xl pointer-events-auto">
             {/* Small Intro Line */}
             <div className="flex items-center gap-3 mb-4">
                <div className="h-[2px] w-12" style={{ backgroundColor: config.accentColor }}></div>
                <p className="uppercase tracking-[0.25em] text-sm font-bold" style={{ color: config.accentColor }}>
                  Hey, welcome to the
                </p>
             </div>

             {/* Huge Title */}
             <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-8 drop-shadow-2xl">
               {config.communityName.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
               ))}
             </h1>
          </div>

          {/* Bottom Left Highlights (Horizontal Mini-Sections) */}
          <div className="absolute bottom-[10%] left-6 md:left-12 right-6 pointer-events-auto">
             <div className="flex flex-col md:flex-row gap-8 md:gap-12 border-t border-white/10 pt-8 max-w-4xl">
                {skills.map((skill) => (
                   <div key={skill.id} className="group">
                      <span className="block text-xs font-black tracking-widest mb-2 opacity-80" style={{ color: config.accentColor }}>
                        #{skill.id}
                      </span>
                      <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wide group-hover:text-neutral-300 transition-colors">
                        {skill.label}
                      </h3>
                   </div>
                ))}
             </div>
          </div>

        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-pulse pointer-events-none">
            <ArrowDown size={32} />
        </div>
      </div>
    </div>
  );
};

export default ParallaxHero;
