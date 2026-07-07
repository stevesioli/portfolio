import { QuoteIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, Badge, Reveal } from '@resume/ui';

import { CtaButtons } from '../components/CtaButtons';
import { ContactBar } from '../components/ContactBar';
import { ImpactStatsRow } from '../components/ImpactStatsRow';
import { CORE_TAGS, KICKER, NAME, PULL_QUOTE, SUMMARY } from '../content';

/**
 * Variant D — chips' text-only left column paired with inline's pull-quote
 * right column, with the avatar moved into the quote card itself.
 */
export default function HeroHybrid() {
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

        <Reveal direction="left" delay={0.1}>
          <div className="border-accent-blue/30 from-accent-blue/5 relative rounded-2xl border-l-4 bg-gradient-to-br to-transparent p-8">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                {/* Soft copper+blue glow behind the avatar, echoing the photo treatment */}
                <div
                  aria-hidden
                  className="from-accent-blue/40 to-primary/30 absolute -inset-2 rounded-full bg-gradient-to-br blur-xl"
                />
                <Avatar className="border-background relative size-16 border-4 shadow-lg sm:size-20">
                  <AvatarImage
                    src="images/steve-sioli.jpg"
                    alt="Steve Sioli"
                    className="object-cover"
                  />
                  <AvatarFallback className="font-serif text-2xl">SS</AvatarFallback>
                </Avatar>
              </div>
              <QuoteIcon className="text-accent-blue/40 size-8" />
            </div>

            <p className="mt-6 font-serif text-2xl leading-snug font-medium tracking-tight sm:text-3xl">
              {PULL_QUOTE}
            </p>
            <Badge variant="blue" className="mt-6">
              Open to new opportunities
            </Badge>
          </div>
        </Reveal>
      </div>

      <ImpactStatsRow className="mt-16" />
    </div>
  );
}
