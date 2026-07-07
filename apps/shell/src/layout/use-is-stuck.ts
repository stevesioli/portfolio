import { useLayoutEffect, useState, type RefObject } from 'react';

/**
 * Tracks whether a `position: sticky; top: <offsetPx>` element is
 * currently pinned in place (its top has reached the sticky offset)
 * versus still sliding up into place from below, in normal document
 * flow.
 *
 * Used to gate a stacked section's own internal `overflow-y-auto`
 * scrolling: while a section is still scrolling *into* view, its
 * content shouldn't capture wheel/touch input via scroll-chaining —
 * that input should keep driving the page scroll that brings it fully
 * into place. Only once it's pinned (and so fully covering whatever
 * came before it) should its own overflow become scrollable.
 */
export function useIsStuck<T extends HTMLElement>(ref: RefObject<T | null>, offsetPx: number) {
  const [isStuck, setIsStuck] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => setIsStuck(el.getBoundingClientRect().top <= offsetPx);

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [ref, offsetPx]);

  return isStuck;
}
