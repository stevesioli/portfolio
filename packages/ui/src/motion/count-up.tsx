import * as React from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

export interface CountUpProps {
  /** Target value to count up to. */
  value: number;
  /** Seconds the count-up animation takes. */
  duration?: number;
  /** Number of decimal places to render. */
  decimals?: number;
  className?: string;
}

/**
 * Animates a number counting up from 0 to `value` once it scrolls
 * into view. Renders the final value immediately (no animation) when
 * the visitor prefers reduced motion.
 */
export function CountUp({ value, duration = 1.4, decimals = 0, className }: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = React.useState(shouldReduceMotion ? value : 0);

  React.useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplay(Number(latest.toFixed(decimals)));
      },
    });

    return () => controls.stop();
  }, [isInView, shouldReduceMotion, value, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
    </span>
  );
}
