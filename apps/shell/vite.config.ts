import path from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
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

/**
 * @module-federation/vite doesn't propagate a remote's HMR updates into
 * the host app in dev mode (see module-federation/vite#183 upstream) —
 * editing a remote's source produces a hot-update request from that
 * remote's own dev server, but the change never applies inside the
 * composed shell, only on a manual full browser refresh.
 *
 * As a workaround, watch each remote's `src/` directly from the shell's
 * dev server and force a full reload of the shell tab whenever any of
 * those files change. Not true granular HMR (component state resets),
 * but it restores "save and see it update" instead of requiring a
 * manual refresh after every edit.
 */
function remoteHmrSync(remoteRoots: string[]): Plugin {
  return {
    name: 'remote-hmr-sync',
    apply: 'serve',
    configureServer(server) {
      for (const root of remoteRoots) {
        server.watcher.add(root);
      }
      server.watcher.on('change', (file) => {
        if (remoteRoots.some((root) => file.startsWith(root))) {
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const basePath = env.VITE_BASE_PATH?.trim() || '/';
  const remoteBase = `${basePath}remotes`.replace(/\/{2,}/g, '/');
  const isDev = mode === 'development';

  const remoteRoots = Object.values(REMOTES).map(({ slug }) =>
    path.resolve(import.meta.dirname, '..', `mfe-${slug}`, 'src'),
  );

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      ...(isDev ? [remoteHmrSync(remoteRoots)] : []),
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
