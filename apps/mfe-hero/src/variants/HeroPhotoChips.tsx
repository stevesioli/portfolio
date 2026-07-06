import { motion, useReducedMotion } from 'motion/react';
import { SparklesIcon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Reveal,
} from '@resume/ui';

import { CtaButtons } from '../components/CtaButtons';
import { ContactBar } from '../components/ContactBar';
import { ImpactStatsRow } from '../components/ImpactStatsRow';
import { CORE_TAGS, KICKER, NAME, SUMMARY } from '../content';

/** Variant A — bigger photo, layered copper+blue glow, floating detail chips. */
export default function HeroPhotoChips() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <Reveal>
          <p className="text-primary font-mono text-xs font-medium tracking-[0.2em] uppercase">
            {KICKER}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {NAME}
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
            {SUMMARY}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {CORE_TAGS.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <ContactBar className="mt-8" />
          <CtaButtons className="mt-8" />
        </Reveal>

        <Reveal direction="left" delay={0.1} className="flex justify-center lg:justify-end">
          <div className="relative size-64 sm:size-80 lg:size-[22rem]">
            {/* Layered copper + blue glow, offset for an organic (not perfectly concentric) look */}
            <div
              aria-hidden
              className="from-accent-blue/45 absolute -top-6 -left-6 size-full rounded-full bg-gradient-to-br to-transparent blur-3xl"
            />
            <div
              aria-hidden
              className="from-primary/35 absolute -right-4 -bottom-4 size-full rounded-full bg-gradient-to-tl to-transparent blur-3xl"
            />

            {/* Slow-rotating dashed ring for a touch of ambient motion */}
            <motion.div
              aria-hidden
              className="border-accent-blue/25 absolute inset-0 rounded-full border-2 border-dashed"
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />

            <Avatar className="border-background size-full border-4 shadow-xl">
              <AvatarImage
                src="images/steve-sioli.jpg"
                alt="Steve Sioli"
                className="object-cover"
              />
              <AvatarFallback className="font-serif text-6xl">SS</AvatarFallback>
            </Avatar>

            {/* Floating detail chips */}
            <motion.div
              className="bg-card border-border/60 absolute -bottom-4 -left-6 flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-lg"
              animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="bg-primary size-2 rounded-full" />
              15+ yrs experience
            </motion.div>

            <motion.div
              className="bg-card border-accent-blue/30 text-accent-blue absolute -top-2 -right-2 flex size-12 items-center justify-center rounded-full border shadow-lg"
              animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <SparklesIcon className="size-5" />
            </motion.div>
          </div>
        </Reveal>
      </div>

      <ImpactStatsRow className="mt-16" />
    </div>
  );
}
