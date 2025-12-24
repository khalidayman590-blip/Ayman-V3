
import React, { useState } from 'react';
import { Settings, X, Check, Moon, Sun, MonitorPlay } from 'lucide-react';
import { AppConfig, THEME_COLORS, SEQUENCES } from '../types';

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
        className="fixed bottom-6 right-6 z-50 p-4 bg-black/50 backdrop-blur-md border border-white/10 rounded-full shadow-2xl hover:bg-black/70 transition-all text-white group"
        title="Customize Site"
      >
        <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-full max-w-md bg-neutral-950 h-full shadow-2xl p-6 overflow-y-auto border-l border-neutral-800 text-white">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-neutral-800">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Settings size={20} />
                Site Configuration
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-8">
              
              {/* Theme Mode */}
              <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Appearance</label>
                <div className="flex gap-2">
                    <button
                    onClick={() => handleChange('isDarkMode', false)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all ${!config.isDarkMode ? 'bg-white text-black border-white' : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600'}`}
                    >
                    <Sun size={18} />
                    <span>Light</span>
                    </button>
                    <button
                    onClick={() => handleChange('isDarkMode', true)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border transition-all ${config.isDarkMode ? 'bg-white text-black border-white' : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-600'}`}
                    >
                    <Moon size={18} />
                    <span>Dark</span>
                    </button>
                </div>
              </div>

              {/* Accent Color */}
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Brand Accent</label>
                <div className="grid grid-cols-6 gap-2">
                  {THEME_COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleChange('accentColor', color.value)}
                      className="w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 shadow-sm border border-transparent hover:border-white/50"
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {config.accentColor === color.value && <Check size={20} className="text-white drop-shadow-md" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Parallax Sequence */}
              <div>
                 <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">Parallax Sequence</label>
                 <div className="space-y-2">
                    {SEQUENCES.map((seq, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleChange('sequenceUrl', seq.url)}
                            className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center justify-between ${config.sequenceUrl === seq.url ? 'bg-neutral-800 border-white text-white' : 'bg-transparent border-neutral-800 text-neutral-400 hover:border-neutral-600'}`}
                        >
                            <span className="flex items-center gap-2">
                                <MonitorPlay size={16} />
                                {seq.name}
                            </span>
                            {config.sequenceUrl === seq.url && <Check size={14} />}
                        </button>
                    ))}
                    {/* Custom URL Input Fallback */}
                     <div className="mt-2">
                        <input
                            type="text"
                            placeholder="Custom Sequence Folder URL..."
                            value={config.sequenceUrl}
                            onChange={(e) => handleChange('sequenceUrl', e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-400 focus:outline-none focus:border-white/50"
                        />
                     </div>
                 </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Community Name</label>
                  <input
                    type="text"
                    value={config.communityName}
                    onChange={(e) => handleChange('communityName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-900 text-white focus:ring-1 focus:ring-white focus:outline-none focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Hero Tagline</label>
                  <input
                    type="text"
                    value={config.tagline}
                    onChange={(e) => handleChange('tagline', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-900 text-white focus:ring-1 focus:ring-white focus:outline-none focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Introduction</label>
                  <textarea
                    rows={4}
                    value={config.introText}
                    onChange={(e) => handleChange('introText', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-900 text-white focus:ring-1 focus:ring-white focus:outline-none focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
              
              <div className="pt-6 border-t border-neutral-800">
                <p className="text-xs text-neutral-500 text-center">
                  Changes apply immediately.
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
