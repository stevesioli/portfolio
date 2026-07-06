import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';

// Independently built & versioned micro-frontend. `pnpm --filter mfe-education dev`
// runs it standalone on its own port for isolated development; `build`
// produces a remoteEntry.js that the shell loads at runtime.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'mfeEducation',
      filename: 'remoteEntry.js',
      exposes: {
        './EducationSection': './src/EducationSection.tsx',
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
    outDir: '../shell/public/remotes/education',
    emptyOutDir: true,
  },
  server: {
    port: 5177,
    // The shell's dev server (a different origin/port) fetches this
    // remote's remoteEntry.js and exposed chunks directly at dev time.
    cors: true,
  },
  preview: {
    port: 5177,
    cors: true,
  },
});
