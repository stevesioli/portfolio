import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';

// Independently built & versioned micro-frontend. `pnpm --filter mfe-hero dev`
// runs it standalone on its own port for isolated development; `build`
// produces a remoteEntry.js that the shell loads at runtime.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'mfeHero',
      filename: 'remoteEntry.js',
      exposes: {
        './HeroSection': './src/HeroSection.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
      },
    }),
  ],
  build: {
    target: 'esnext',
    modulePreload: false,
    cssCodeSplit: false,
    outDir: '../shell/public/remotes/hero',
    emptyOutDir: true,
  },
  server: {
    port: 5174,
  },
  preview: {
    port: 5174,
  },
});
