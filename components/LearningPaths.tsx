import React from 'react';
import { AppConfig, LearningPath } from '../types';
import { Play, Code, Box, Zap, Smartphone, Layers } from 'lucide-react';

interface Props {
  config: AppConfig;
}

const paths: LearningPath[] = [
  {
    id: 'anim',
    title: 'Animated Websites',
    description: 'Master GSAP, Framer Motion, and WebGL for award-winning sites.',
    image: 'https://picsum.photos/seed/anim/400/300'
  },
  {
    id: 'builders',
    title: 'AI Website Builders',
    description: 'Leverage Framer AI, Wix Studio, and Webflow logic.',
    image: 'https://picsum.photos/seed/builders/400/300'
  },
  {
    id: 'internal',
    title: 'Internal AI Tools',
    description: 'Automate workflows with Retool, n8n, and custom dashboards.',
    image: 'https://picsum.photos/seed/internal/400/300'
  },
  {
    id: 'apps',
    title: 'AI App Development',
    description: 'Build full-stack SaaS wrappers and utilities with React.',
    image: 'https://picsum.photos/seed/apps/400/300'
  },
  {
    id: 'vibe',
    title: 'Vibecoding for Hobbyists',
    description: 'Creative coding for pure expression and digital art.',
    image: 'https://picsum.photos/seed/vibe/400/300'
  },
];

const LearningPaths: React.FC<Props> = ({ config }) => {
  return (
    <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-neutral-50 dark:bg-neutral-900 transition-colors">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20 items-start">
          <div className="flex-1">
             <h2 className="text-4xl md:text-5xl font-black mb-6 text-neutral-900 dark:text-white tracking-tight">
               {config.tagline}
             </h2>
             <div className="w-24 h-2 rounded-full mb-8" style={{ backgroundColor: config.accentColor }} />
             
             {/* Abstract Visual / Portrait Placeholder */}
             <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shadow-xl border border-neutral-200 dark:border-neutral-700">
                <img 
                  src="https://picsum.photos/seed/abstract_art/800/450" 
                  alt="Abstract AI Visual" 
                  className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Play fill="white" className="w-16 h-16 text-white drop-shadow-xl opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                </div>
             </div>
          </div>

          <div className="flex-1 lg:pl-12">
            <h3 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-100">What You Will Learn</h3>
            <ul className="space-y-4 mb-12">
              {[
                "Prompt engineering for modern web frameworks",
                "Integrating LLMs directly into React applications",
                "Designing fluid, physics-based UI interactions",
                "Deploying scalable applications without traditional backends"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 p-1 rounded-full text-white" style={{ backgroundColor: config.accentColor }}>
                    <CheckIcon size={12} />
                  </div>
                  <span className="text-lg text-neutral-600 dark:text-neutral-300">{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800/50 shadow-sm">
                <p className="italic text-neutral-500 dark:text-neutral-400">
                    "This community transformed how I approach web development. The AI workflows are simply a game changer."
                </p>
                <div className="mt-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-300 overflow-hidden">
                        <img src="https://picsum.photos/seed/user1/100/100" className="object-cover" alt="User" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-neutral-900 dark:text-white">Alex D.</p>
                        <p className="text-xs text-neutral-500">Frontend Lead</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Featured Paths Grid */}
        <div className="mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-8">Featured Learning Paths</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paths.map((path) => (
                    <div key={path.id} className="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
                        <div className="aspect-[4/3] overflow-hidden">
                            <img 
                                src={path.image} 
                                alt={path.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="mb-2">
                                {getIconForPath(path.id, config.accentColor)}
                            </div>
                            <h4 className="text-xl font-bold text-white mb-1">{path.title}</h4>
                            <p className="text-sm text-neutral-300 line-clamp-2">{path.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

// Helper for icons
const CheckIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const getIconForPath = (id: string, color: string) => {
    const props = { size: 24, style: { color } };
    switch(id) {
        case 'anim': return <Layers {...props} />;
        case 'builders': return <Box {...props} />;
        case 'internal': return <Code {...props} />;
        case 'apps': return <Smartphone {...props} />;
        case 'vibe': return <Zap {...props} />;
        default: return <Box {...props} />;
    }
}

export default LearningPaths;
