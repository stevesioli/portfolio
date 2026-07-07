import { useRef, type ReactNode } from 'react';
import { Reveal } from '@resume/ui';

import { useIsStuck } from './use-is-stuck';

interface SectionProps {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
  /** Must include an opaque background utility (e.g. `bg-background`) — see stackIndex note below. */
  className?: string;
  /**
   * Stacking order for the "each section scrolls over the previous one"
   * effect. Every section is `position: sticky; top: 16` (pinning just
   * below the fixed navbar), so later sections in the document naturally
   * paint over earlier ones — this just makes that explicit and keeps
   * everything safely under the navbar's z-40. Higher sits on top.
   */
  stackIndex: number;
}

/**
 * Shared chrome around every micro-frontend: consistent max-width,
 * spacing, and a section heading with a subtle scroll-reveal. The
 * federated remote only has to render its own content below the
 * heading — layout consistency lives in the shell, not duplicated five
 * times across independently built apps.
 *
 * Sticky + a fixed viewport-height box is what produces the stacked-
 * cards scroll effect: each section pins just below the navbar and
 * occupies exactly the remaining viewport. If a section's own content
 * (e.g. a long timeline) is taller than that, it scrolls *inside* the
 * section via `overflow-y-auto` — the browser's native scroll-chaining
 * means wheel/touch input scrolls that inner content first, and only
 * once it's fully scrolled does the page continue and the next section
 * slide up to cover this one. Without the fixed height + overflow, a
 * naturally-tall sticky section would just freeze in place with its
 * lower content stuck below the fold, never actually scrolled into view.
 *
 * Each section's own scrollbar is hidden (`scrollbar-width: none` /
 * `::-webkit-scrollbar { display: none }`) so only the page's main
 * scrollbar is ever visible — the inner overflow still scrolls via
 * wheel/touch, it just doesn't render its own scrollbar track.
 *
 * The section's own overflow only becomes scrollable once it's
 * actually pinned (see useIsStuck) — otherwise, while it's still
 * sliding up from below, scroll-chaining would let it capture
 * wheel/touch input meant to keep bringing it into place, which reads
 * as the content jumping around before the section has even fully
 * covered the previous one.
 */
export function Section({ id, kicker, title, children, className, stackIndex }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isStuck = useIsStuck(ref, 64);

  return (
    <section
      ref={ref}
      id={id}
      style={{ zIndex: stackIndex }}
      className={`[scrollbar-width:none] sticky top-16 h-[calc(100dvh-4rem)] scroll-mt-24 py-20 shadow-[0_-24px_48px_-24px_rgba(0,0,0,0.35)] [&::-webkit-scrollbar]:hidden sm:py-28 ${isStuck ? 'overflow-y-auto' : 'overflow-hidden'} ${className ?? ''}`}
    >
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
