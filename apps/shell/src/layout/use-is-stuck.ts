import { useLayoutEffect, type RefObject } from 'react';

/**
 * Gates a `position: sticky; top: <offsetPx>` element's own overflow
 * scrolling to only once it's actually pinned (its top has reached the
 * sticky offset) — not while it's still sliding up into place from
 * below, in normal document flow.
 *
 * While a section is still scrolling *into* view, its content
 * shouldn't capture wheel/touch input via scroll-chaining — that input
 * should keep driving the page scroll that brings it fully into place.
 * Only once it's pinned (and so fully covering whatever came before
 * it) should its own overflow become scrollable.
 *
 * This mutates `element.style.overflowY` directly inside the scroll
 * handler rather than going through React state + a className toggle.
 * A state-driven toggle has to wait for a re-render to actually reach
 * the DOM, and on a fast scroll gesture several more native scroll
 * events can fire in that window — each one gets routed by the
 * browser's scroll-chaining based on whatever overflow value is
 * *currently painted*, so a stale `overflow: hidden` during that gap
 * lets scroll input leak straight through to the page instead of
 * being captured here. Mutating the style synchronously in the same
 * handler that detects the transition closes that gap.
 */
export function useIsStuck<T extends HTMLElement>(ref: RefObject<T | null>, offsetPx: number) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      el.style.overflowY = el.getBoundingClientRect().top <= offsetPx ? 'auto' : 'hidden';
    };

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [ref, offsetPx]);
}
