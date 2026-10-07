import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // يفتح على 0.0.0.0 ليعمل المعاينة
    port: 5173,
    strictPort: false,
    allowedHosts: true,
    hmr: {
      protocol: 'wss',
      clientPort: 443,
    },
  },
  preview: {
    host: true,
    allowedHosts: true,
  },
});
