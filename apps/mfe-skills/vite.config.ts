import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';

// Independently built & versioned micro-frontend. `pnpm --filter mfe-skills dev`
// runs it standalone on its own port for isolated development; `build`
// produces a remoteEntry.js that the shell loads at runtime.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'mfeSkills',
      filename: 'remoteEntry.js',
      exposes: {
        './SkillsSection': './src/SkillsSection.tsx',
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
    outDir: '../shell/public/remotes/skills',
    emptyOutDir: true,
  },
  server: {
    port: 5176,
    // The shell's dev server (a different origin/port) fetches this
    // remote's remoteEntry.js and exposed chunks directly at dev time.
    cors: true,
  },
  preview: {
    port: 5176,
    cors: true,
  },
});
