import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';

// Independently built & versioned micro-frontend. `pnpm --filter mfe-contact dev`
// runs it standalone on its own port for isolated development; `build`
// produces a remoteEntry.js that the shell loads at runtime.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'mfeContact',
      filename: 'remoteEntry.js',
      exposes: {
        './ContactSection': './src/ContactSection.tsx',
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
    outDir: '../shell/public/remotes/contact',
    emptyOutDir: true,
  },
  server: {
    port: 5178,
  },
  preview: {
    port: 5178,
  },
});
