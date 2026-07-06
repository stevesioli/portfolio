# Steve Sioli — Interactive Résumé

An interactive, animated résumé site built as a true micro-frontend monorepo: five
independently built React applications (one per résumé section), stitched together at
runtime by a host "shell" via Module Federation, and styled by one shared design system.
The final build is a single static bundle deployable to any static host.

## Architecture

```
portfolio/
├── apps/
│   ├── shell/            # Host app: layout, nav, theme, loads every remote at runtime
│   ├── mfe-hero/         # Remote: name, summary, key engineering impact
│   ├── mfe-experience/   # Remote: career history timeline
│   ├── mfe-skills/       # Remote: core expertise / leadership / technologies
│   ├── mfe-education/    # Remote: education + early career
│   └── mfe-contact/      # Remote: contact form + direct links
├── packages/
│   ├── ui/                  # Shared shadcn/ui-based design system + theme + motion
│   ├── config-typescript/   # Shared tsconfig base
│   └── config-eslint/       # Shared ESLint flat config
├── turbo.json
├── pnpm-workspace.yaml
└── netlify.toml
```

**Why micro-frontends, really?** Each `mfe-*` app is a genuinely independent Vite project
with its own `package.json`, its own dependency versions, its own dev server, and its own
build — not just a folder of components. Each exposes a single component via
[Module Federation](https://module-federation.io/) (`@module-federation/vite`), and can be
developed, tested, and deployed in isolation (`pnpm --filter mfe-hero dev`). The shell
loads each one at runtime through a bare-specifier dynamic import (e.g.
`import('mfeHero/HeroSection')`), wrapped in `React.lazy` + a Suspense/error boundary, so
one remote failing to build or load doesn't take down the rest of the page.

**Why does it still deploy as one static folder?** Every remote's `vite.config.ts` builds
its `remoteEntry.js` straight into `apps/shell/public/remotes/<slug>/`. Vite copies
`public/` into `dist/` verbatim, so once Turborepo builds the remotes and then the shell
(in that order — see `turbo.json`), `apps/shell/dist/` is a single, self-contained static
bundle. No separately hosted remotes, no runtime dependency on multiple deployments — you
get real Module Federation architecture with the deployment simplicity of a plain SPA.

**Design system.** `packages/ui` is a custom shadcn/ui implementation: Radix primitives
(button, card, badge, sheet, tooltip, avatar, input, textarea, label, separator), a
Tailwind CSS v4 theme (CSS-first, `oklch` tokens, dark editorial palette with a warm
copper accent + light mode), a light/dark `ThemeProvider`/`ThemeToggle`, and
`Reveal`/`StaggerGroup` motion primitives built on the [`motion`](https://motion.dev)
library. Every app in the monorepo consumes it as a pnpm workspace package.

## Tech stack

React 19 · TypeScript 5.7 · Vite 7 · Module Federation (`@module-federation/vite`) ·
Tailwind CSS v4 · shadcn/ui (hand-built on Radix primitives) · `motion` (Framer Motion's
successor) · Turborepo 2 · pnpm workspaces · ESLint 9 (flat config) · Prettier.

## Getting started

Requires Node.js 22+ and pnpm 11+ (`corepack enable` will install the right pnpm version
automatically via the `packageManager` field).

```bash
pnpm install
pnpm dev      # runs the shell + all five remotes concurrently, with hot reload
```

The shell dev server prints its URL (default `http://localhost:4173`). Each remote also
runs on its own port (5174–5178) so you can open one directly — e.g.
`pnpm --filter mfe-hero dev` — and iterate on a single section without the rest of the app
running.

```bash
pnpm build    # builds all five remotes, then the shell, into apps/shell/dist/
pnpm preview  # serves that build locally to sanity-check the production bundle
pnpm lint
pnpm type-check
pnpm format   # prettier --write across the repo
```

### Environment variables

Copy `apps/shell/.env.example` to `apps/shell/.env` (or set these in your host's
dashboard) to configure:

| Variable | Default | Purpose |
| --- | --- | --- |
| `VITE_BASE_PATH` | `/` | Base path for the deployed site. Only change this for a subpath deploy (see below). |
| `VITE_CONTACT_FORM_ENDPOINT` | _(unset)_ | POST endpoint for the contact form (Formspree, Web3Forms, your own function, etc.). If unset, the form falls back to opening a prefilled `mailto:` link — no backend required. |

## Deploying

The site has no client-side router — it's a single page with anchor-based navigation — so
**no SPA fallback/redirect rules are needed on any host.** Just build and serve
`apps/shell/dist/`.

- **Netlify / Cloudflare Pages / Vercel (dashboard-configured):** build command
  `pnpm install && pnpm build`, publish/output directory `apps/shell/dist`. A
  ready-to-use `netlify.toml` is included at the repo root.
- **Vercel (CLI/dashboard):** set the project root to the repo root, build command
  `pnpm build`, output directory `apps/shell/dist`. Vercel auto-detects the Turborepo
  monorepo structure.
- **GitHub Pages:** see `.github/workflows/deploy-gh-pages.yml` (disabled by default —
  flip on the `push` trigger once you're ready). Project pages
  (`username.github.io/repo-name/`) need `VITE_BASE_PATH=/repo-name/` set before the
  build, since that's baked into both Vite's asset URLs and the remote-entry URLs the
  shell fetches at runtime. User/org pages (`username.github.io`) can leave it at `/`.
- **S3 + CloudFront, or any other static host:** upload the contents of
  `apps/shell/dist/` as-is. Set `VITE_BASE_PATH` before building only if you're serving
  from a non-root path.

## A note on how this was built

This repository was generated end-to-end by Claude in a sandboxed environment **without
package-registry network access** (`npm`/`pnpm`/GitHub were unreachable — org network
policy). Every file was hand-written using current, correct APIs to the best of available
knowledge, but **none of it has been installed, type-checked, or built yet.** Before you
trust it for anything real:

```bash
pnpm install
pnpm build
```

If something doesn't compile, the most likely culprits, in rough order of risk:

1. **Module Federation wiring** (`@module-federation/vite` in each `vite.config.ts`, and
   the ambient module declarations in `apps/shell/src/federation/remote-modules.d.ts`).
   This is the newest, least-stabilized piece of the stack and the one place a minor
   version's API surface may have shifted.
2. **Exact dependency versions** in the various `package.json` files (React 19.x,
   Vite 7.x, Tailwind v4.x, etc.) — version ranges use `^`, so pnpm should resolve to
   current compatible releases, but a peer dependency mismatch is possible.
3. **Tailwind v4 `@source` scanning** (`packages/ui/src/styles/theme.css`) — this is what
   makes utility classes used *inside* the shared `@resume/ui` components actually get
   generated in each app's build, since Tailwind ignores `node_modules` by default and
   workspace packages are symlinked there.

None of this should require large changes if something is off — the architecture and
content are solid; a build failure here would most likely be a small config fix.

## Commit history

Built with atomic, [Conventional Commits](https://www.conventionalcommits.org/)-formatted
commits — run `git log` to see the project assembled step by step, from monorepo scaffold
through the shared design system, the shell, each micro-frontend, and the deploy pipeline.

## Content decisions worth knowing about

- The public page omits the street address and phone number that appear on the source
  résumé PDF — email, LinkedIn, and city/state are shown instead. The downloadable PDF
  (linked from the nav bar) is the original, unmodified résumé file, since that's what
  you'd hand a recruiter directly.
- The headshot photo was extracted directly from the uploaded résumé PDF.
