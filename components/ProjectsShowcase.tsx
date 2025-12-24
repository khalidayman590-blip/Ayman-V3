
import React from 'react';
import { AppConfig, Project } from '../types';
import { ExternalLink, Sparkles } from 'lucide-react';

interface Props {
  config: AppConfig;
}

const projects: Project[] = [
  { id: '1', title: 'Gemini Knowledge Base', tool: 'Google AI Studio', image: 'https://picsum.photos/seed/googleai/600/400' },
  { id: '2', title: 'Real-time Chat Engine', tool: 'Firebase Studio', image: 'https://picsum.photos/seed/firebase/600/400' },
  { id: '3', title: 'Legal Assistant Bot', tool: 'OpenAI', image: 'https://picsum.photos/seed/openai/600/400' },
  { id: '4', title: 'Instant SaaS Deploy', tool: 'Replit', image: 'https://picsum.photos/seed/replit/600/400' },
];

const ProjectsShowcase: React.FC<Props> = ({ config }) => {
  return (
    <section className="py-32 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-neutral-400 uppercase tracking-widest text-xs font-bold">
               <Sparkles size={14} style={{ color: config.accentColor }} />
               <span>Student Highlights</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Built with AI</h2>
            <p className="text-neutral-400 max-w-xl text-lg">
              Cinematic examples of what our community builds using the latest AI models and studios.
            </p>
          </div>
          <button 
            className="px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-500/25"
            style={{ backgroundColor: config.accentColor }}
          >
            Explore Showcase
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative rounded-2xl overflow-hidden aspect-[16/9] cursor-pointer bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
              
              {/* Image */}
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex justify-between items-end">
                  <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-neutral-300 mb-3 border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                        {project.tool}
                      </span>
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
