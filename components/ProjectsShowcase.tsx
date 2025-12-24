import React from 'react';
import { AppConfig, Project } from '../types';
import { ExternalLink } from 'lucide-react';

interface Props {
  config: AppConfig;
}

const projects: Project[] = [
  { id: '1', title: 'Neo-Finance Dashboard', tool: 'Google AI Studio', image: 'https://picsum.photos/seed/proj1/600/400' },
  { id: '2', title: 'Retro Game Hub', tool: 'Firebase Studio', image: 'https://picsum.photos/seed/proj2/600/400' },
  { id: '3', title: 'Legal Doc Summarizer', tool: 'OpenAI', image: 'https://picsum.photos/seed/proj3/600/400' },
  { id: '4', title: 'E-commerce Generator', tool: 'Replit', image: 'https://picsum.photos/seed/proj4/600/400' },
];

const ProjectsShowcase: React.FC<Props> = ({ config }) => {
  return (
    <section className="py-24 bg-neutral-900 text-white border-t border-neutral-800">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Built by the Community</h2>
            <p className="text-neutral-400 max-w-xl">
              See what's possible when human creativity meets artificial intelligence.
            </p>
          </div>
          <button 
            className="mt-6 md:mt-0 px-8 py-3 rounded-full font-bold text-white transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: config.accentColor }}
          >
            View All Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative rounded-2xl overflow-hidden bg-neutral-800 aspect-video cursor-pointer">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white mb-3 border border-white/10">
                  {project.tool}
                </span>
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <div className="bg-white text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
