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
//
// That build-time copy only exists after `vite build`, though. In dev
// (`vite` / `pnpm dev`), nothing writes to public/remotes/* — each
// remote instead runs its own standalone dev server (see each mfe-*'s
// `server.port`) and serves its federated module straight from there.
// So in dev mode we point the host at each remote's live dev server
// instead of the (nonexistent, in dev) copied-into-public path.
const REMOTES = {
  mfeHero: { slug: 'hero', devPort: 5174 },
  mfeExperience: { slug: 'experience', devPort: 5175 },
  mfeSkills: { slug: 'skills', devPort: 5176 },
  mfeEducation: { slug: 'education', devPort: 5177 },
  mfeContact: { slug: 'contact', devPort: 5178 },
} as const;

const SHARED = {
  react: { singleton: true, requiredVersion: '^19.0.0' },
  'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
} as const;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = env.VITE_BASE_PATH?.trim() || '/';
  const remoteBase = `${basePath}remotes`.replace(/\/{2,}/g, '/');
  const isDev = mode === 'development';

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'shell',
        remotes: Object.fromEntries(
          Object.entries(REMOTES).map(([name, { slug, devPort }]) => [
            name,
            {
              type: 'module' as const,
              name,
              entry: isDev
                ? `http://localhost:${devPort}/remoteEntry.js`
                : `${remoteBase}/${slug}/remoteEntry.js`,
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
