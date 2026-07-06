import type { ReactNode } from 'react';
import { Reveal } from '@resume/ui';

interface SectionProps {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Shared chrome around every micro-frontend: consistent max-width,
 * spacing, and a section heading with a subtle scroll-reveal. The
 * federated remote only has to render its own content below the
 * heading — layout consistency lives in the shell, not duplicated five
 * times across independently built apps.
 */
export function Section({ id, kicker, title, children, className }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className ?? ''}`}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-10 sm:mb-14">
          <p className="text-primary font-mono text-xs font-medium tracking-[0.2em] uppercase">
            {kicker}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
