import React from 'react';
import { AppConfig } from '../types';
import { Youtube, Instagram, Twitter } from 'lucide-react';

interface Props {
  config: AppConfig;
}

const Footer: React.FC<Props> = ({ config }) => {
  return (
    <footer className="bg-black text-white py-12 border-t border-neutral-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <h4 className="text-xl font-bold mb-2">{config.communityName}</h4>
          <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-neutral-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
            <Youtube size={24} />
          </a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-neutral-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
            <Twitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
