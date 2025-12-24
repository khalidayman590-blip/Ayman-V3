
export interface AppConfig {
  communityName: string;
  tagline: string;
  introText: string;
  accentColor: string;
  isDarkMode: boolean;
  sequenceUrl: string; // URL to the folder containing frames
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Project {
  id: string;
  title: string;
  tool: string;
  image: string;
}

export const SEQUENCES = [
  { 
    name: "Cyber Motion (Default)", 
    url: "https://acrimldaoexwwnibqcwu.supabase.co/storage/v1/object/public/Portfolio/webp-frames/" 
  },
  {
    name: "Blue Data Flow",
    // Placeholder for a second sequence if available, pointing to same for demo purposes but conceptually different
    url: "https://acrimldaoexwwnibqcwu.supabase.co/storage/v1/object/public/Portfolio/webp-frames/" 
  }
];

export const DEFAULT_CONFIG: AppConfig = {
  communityName: "Andynocode Community",
  tagline: "Shaping the Future of AI-Powered Creation",
  introText: "A hub where beginners, hobbyists, and professionals learn how to use AI tools to create stunning animated web experiences, internal tools, and full web apps.",
  accentColor: "#F97316", // Tailwind Orange-500
  isDarkMode: true,
  sequenceUrl: SEQUENCES[0].url,
};

export const THEME_COLORS = [
  { name: "Orange", value: "#F97316" }, // orange-500
  { name: "Blue", value: "#3B82F6" },   // blue-500
  { name: "Purple", value: "#A855F7" }, // purple-500
  { name: "Emerald", value: "#10B981" }, // emerald-500
  { name: "Rose", value: "#F43F5E" },   // rose-500
  { name: "Cyan", value: "#06B6D4" },   // cyan-500
];
