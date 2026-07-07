import * as React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the reveal animation starts. */
  delay?: number;
  /** Direction the content travels in from. */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  as?: 'div' | 'section' | 'article' | 'li';
  /**
   * IntersectionObserver rootMargin passed to `viewport.margin`. Shrinks
   * the bottom of the trigger zone by default so content fires once
   * it's well up into the viewport (closer to the top) rather than the
   * moment it peeks over the bottom edge. Override per call site if a
   * different trigger point is needed.
   */
  viewportMargin?: string;
}

const offset: Record<NonNullable<RevealProps['direction']>, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

/**
 * Scroll-triggered fade + slide reveal, used across every micro-frontend
 * for consistent, subtle entrance motion. Respects `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  as = 'div',
  viewportMargin = '0px 0px -40% 0px',
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, ...offset[direction] },
        visible: { opacity: 1, x: 0, y: 0 },
      };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
