
import React from 'react';
import { AppConfig, LearningPath } from '../types';
import { Play, Layers, Code, Zap, Smartphone, LayoutTemplate } from 'lucide-react';

interface Props {
  config: AppConfig;
}

const paths: LearningPath[] = [
  {
    id: 'anim',
    title: 'Animated Websites',
    description: 'Master scroll-driven animations, WebGL, and cinema-quality interactions using GSAP and React.',
    image: 'https://picsum.photos/seed/anim2/400/300'
  },
  {
    id: 'builders',
    title: 'AI Website Builders',
    description: 'Dominate tools like Framer AI, Wix Studio, and Webflow to ship sites 10x faster.',
    image: 'https://picsum.photos/seed/builders2/400/300'
  },
  {
    id: 'internal',
    title: 'Internal AI Tools',
    description: 'Build powerful dashboards and workflow automation for businesses using Retool and n8n.',
    image: 'https://picsum.photos/seed/internal2/400/300'
  },
  {
    id: 'apps',
    title: 'AI App Development',
    description: 'Create full-stack AI wrappers and SaaS products using modern web frameworks.',
    image: 'https://picsum.photos/seed/apps2/400/300'
  },
  {
    id: 'vibe',
    title: 'Vibecoding for Hobbyists',
    description: 'Explore creative coding and generative art simply for the joy of creation.',
    image: 'https://picsum.photos/seed/vibe2/400/300'
  },
];

const LearningPaths: React.FC<Props> = ({ config }) => {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-neutral-50 dark:bg-neutral-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row gap-16 mb-24 items-center">
          
          {/* Left Visual: Outline Portrait / Abstract */}
          <div className="flex-1 w-full max-w-xl relative group cursor-pointer">
             <div className="absolute -inset-4 bg-gradient-to-tr from-transparent to-white/10 dark:to-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
             <div 
                className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800"
             >
                <img 
                  src="https://picsum.photos/seed/ai_abstract_portrait/800/1000" 
                  alt="AI Generated Abstract" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-0 group-hover:saturate-100"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-transform group-hover:scale-110">
                        <Play fill="white" className="w-8 h-8 text-white ml-1" />
                    </div>
                </div>
             </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
             <h2 className="text-4xl md:text-6xl font-black mb-8 text-neutral-900 dark:text-white leading-[0.95] tracking-tight">
               Shaping the <br />
               <span style={{ color: config.accentColor }}>Future</span> of <br />
               AI-Powered Creation
             </h2>

             <div className="w-16 h-1 rounded-full mb-8" style={{ backgroundColor: config.accentColor }} />
             
             <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
               {config.introText}
             </p>

             <ul className="space-y-4 mb-12">
               {[
                 "Learn to build award-winning animated websites",
                 "Master No-Code & Low-Code AI builders",
                 "Develop internal tools that automate real business work",
                 "Join a community of vibecoders and creators"
               ].map((item, idx) => (
                 <li key={idx} className="flex items-center gap-4 group">
                   <div className="w-2 h-2 rounded-full transition-transform group-hover:scale-150" style={{ backgroundColor: config.accentColor }} />
                   <span className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{item}</span>
                 </li>
               ))}
             </ul>
          </div>
        </div>

        {/* Featured Paths Grid */}
        <div>
            <div className="flex items-center gap-4 mb-12">
                <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-800"></div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Featured Learning Paths</h3>
                <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-800"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {paths.map((path) => (
                    <div key={path.id} className="group flex flex-col gap-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-neutral-800 transition-colors duration-300">
                        <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
                            <img 
                                src={path.image} 
                                alt={path.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                            />
                            {/* Icon Badge */}
                            <div className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-lg text-white">
                                {getIconForPath(path.id)}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-neutral-900 dark:text-white mb-2 leading-tight group-hover:text-orange-500 transition-colors">{path.title}</h4>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-3">{path.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

const getIconForPath = (id: string) => {
    const props = { size: 16 };
    switch(id) {
        case 'anim': return <Layers {...props} />;
        case 'builders': return <LayoutTemplate {...props} />;
        case 'internal': return <Code {...props} />;
        case 'apps': return <Smartphone {...props} />;
        case 'vibe': return <Zap {...props} />;
        default: return <Code {...props} />;
    }
}

export default LearningPaths;
