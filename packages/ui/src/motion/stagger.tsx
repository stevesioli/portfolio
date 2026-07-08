import * as React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

export interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child's entrance. */
  staggerDelay?: number;
  /** IntersectionObserver rootMargin passed to `viewport.margin` — see Reveal. */
  viewportMargin?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: { staggerChildren: staggerDelay },
  }),
};

/** Wraps a list of `StaggerItem`s and reveals them in sequence on scroll. */
export function StaggerGroup({
  children,
  className,
  staggerDelay = 0.08,
  viewportMargin = '0px 0px -40% 0px',
}: StaggerGroupProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: viewportMargin }}
      variants={containerVariants}
      custom={staggerDelay}
    >
      {children}
    </motion.div>
  );
}

const itemVariantsFull: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const itemVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export interface StaggerItemProps
  extends Omit<React.ComponentProps<typeof motion.div>, 'children' | 'variants'> {
  children: React.ReactNode;
}

export function StaggerItem({ children, className, ...rest }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={shouldReduceMotion ? itemVariantsReduced : itemVariantsFull}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
