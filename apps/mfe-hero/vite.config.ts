import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

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
    // Module Federation only loads a remote's JS (remoteEntry.js); it never
    // injects the remote's separately-built CSS file into the host page. With
    // cssCodeSplit: false above, this remote's entire stylesheet is bundled
    // into one file — inline it directly into remoteEntry.js so it's guaranteed
    // to load whenever the shell (or any host) loads this remote.
    cssInjectedByJsPlugin({
      jsAssetsFilterFunction: (chunk) => chunk.fileName === 'remoteEntry.js',
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
    // The shell's dev server (a different origin/port) fetches this
    // remote's remoteEntry.js and exposed chunks directly at dev time.
    cors: true,
  },
  preview: {
    port: 5174,
    cors: true,
  },
});
