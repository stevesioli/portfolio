import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@resume/ui';
import '@resume/ui/styles/theme.css';

import EducationSection from './EducationSection';

/**
 * Standalone dev harness — lets this micro-frontend be built, tested,
 * and previewed in total isolation (`pnpm --filter mfe-education dev`)
 * without the shell or any other remote running. Not part of the
 * production bundle: the shell renders EducationSection directly via
 * Module Federation instead of this file.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <div className="bg-background text-foreground min-h-dvh px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <EducationSection />
        </div>
      </div>
    </ThemeProvider>
  </StrictMode>,
);
