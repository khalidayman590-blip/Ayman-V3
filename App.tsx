import React, { useState, useEffect } from 'react';
import { AppConfig, DEFAULT_CONFIG } from './types';
import ParallaxHero from './components/ParallaxHero';
import LearningPaths from './components/LearningPaths';
import ProjectsShowcase from './components/ProjectsShowcase';
import Footer from './components/Footer';
import ConfigPanel from './components/ConfigPanel';

const App: React.FC = () => {
  const [config, setConfig] = useState<AppConfig>(DEFAULT_CONFIG);

  // Apply dark mode class to HTML element
  useEffect(() => {
    if (config.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [config.isDarkMode]);

  return (
    <div className={`min-h-screen font-sans antialiased selection:bg-orange-500 selection:text-white ${config.isDarkMode ? 'bg-neutral-950' : 'bg-white'}`}>
      
      {/* 
        The Parallax Hero controls the initial scroll experience.
        It occupies significant vertical space to drive the animation.
      */}
      <ParallaxHero config={config} />

      {/* Main Content flows after the parallax sequence */}
      <main className="relative z-20 -mt-[4rem] rounded-t-[3rem] bg-neutral-50 dark:bg-neutral-900 overflow-hidden shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.5)]">
        <LearningPaths config={config} />
        <ProjectsShowcase config={config} />
      </main>

      <Footer config={config} />
      
      {/* Configuration UI */}
      <ConfigPanel config={config} onUpdate={setConfig} />

    </div>
  );
};

export default App;
