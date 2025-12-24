export interface AppConfig {
  communityName: string;
  tagline: string;
  introText: string;
  accentColor: string;
  isDarkMode: boolean;
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

export const DEFAULT_CONFIG: AppConfig = {
  communityName: "Andynocode Community",
  tagline: "Shaping the Future of AI-Powered Creation",
  introText: "Join a hub where beginners and pros master AI tools to build animated experiences and full-stack apps.",
  accentColor: "#F97316", // Tailwind Orange-500
  isDarkMode: true,
};

export const THEME_COLORS = [
  { name: "Orange", value: "#F97316" }, // orange-500
  { name: "Blue", value: "#3B82F6" },   // blue-500
  { name: "Purple", value: "#A855F7" }, // purple-500
  { name: "Emerald", value: "#10B981" }, // emerald-500
  { name: "Rose", value: "#F43F5E" },   // rose-500
  { name: "Cyan", value: "#06B6D4" },   // cyan-500
];
