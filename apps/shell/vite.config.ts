import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { federation } from '@module-federation/vite';

// Every micro-frontend is built independently and its remoteEntry.js is
// copied into public/remotes/<slug> (see each mfe-*'s vite.config.ts
// `build.outDir`). Vite copies public/ into dist/ verbatim, so the
// final `dist/` folder is a single, self-contained static bundle that
// can be deployed to any static host — no separately hosted remotes
// required, even though each section really is an independent build.
const REMOTE_SLUGS = {
  mfeHero: 'hero',
  mfeExperience: 'experience',
  mfeSkills: 'skills',
  mfeEducation: 'education',
  mfeContact: 'contact',
} as const;

const SHARED = {
  react: { singleton: true, requiredVersion: '^19.0.0' },
  'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
} as const;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = env.VITE_BASE_PATH?.trim() || '/';
  const remoteBase = `${basePath}remotes`.replace(/\/{2,}/g, '/');

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'shell',
        remotes: Object.fromEntries(
          Object.entries(REMOTE_SLUGS).map(([name, slug]) => [
            name,
            {
              type: 'module' as const,
              name,
              entry: `${remoteBase}/${slug}/remoteEntry.js`,
            },
          ]),
        ),
        shared: SHARED,
      }),
    ],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      target: 'esnext',
      modulePreload: false,
      cssCodeSplit: false,
    },
    server: {
      port: 4173,
    },
    preview: {
      port: 4173,
    },
  };
});
