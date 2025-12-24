import React, { useState } from 'react';
import { Settings, X, Check, Moon, Sun } from 'lucide-react';
import { AppConfig, THEME_COLORS } from '../types';

interface Props {
  config: AppConfig;
  onUpdate: (newConfig: AppConfig) => void;
}

const ConfigPanel: React.FC<Props> = ({ config, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: keyof AppConfig, value: any) => {
    onUpdate({ ...config, [key]: value });
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all text-white group"
        title="Customize Site"
      >
        <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 h-full shadow-2xl p-6 overflow-y-auto transition-colors border-l border-neutral-200 dark:border-neutral-800">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Site Settings</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors dark:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
              
              {/* Theme Mode */}
              <div>
                <label className="block text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">Theme Mode</label>
                <button
                  onClick={() => handleChange('isDarkMode', !config.isDarkMode)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white w-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
                >
                  {config.isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                  <span>{config.isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
              </div>

              {/* Accent Color */}
              <div>
                <label className="block text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">Accent Color</label>
                <div className="grid grid-cols-6 gap-2">
                  {THEME_COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleChange('accentColor', color.value)}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {config.accentColor === color.value && <Check size={16} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Community Name</label>
                  <input
                    type="text"
                    value={config.communityName}
                    onChange={(e) => handleChange('communityName', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:ring-2 focus:outline-none"
                    style={{ focusRingColor: config.accentColor }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => handleChange('tagline', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:ring-2 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Intro Description</label>
                  <textarea
                    rows={3}
                    value={config.introText}
                    onChange={(e) => handleChange('introText', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:ring-2 focus:outline-none"
                  />
                </div>
              </div>
              
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-xs text-neutral-500 text-center">
                  Changes apply immediately. Close this panel to view the full experience.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfigPanel;
