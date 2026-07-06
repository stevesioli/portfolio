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

/** Variant B — photo inside a designed gradient panel that fills the whole column. */
export default function HeroPhotoPanel() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
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
          <div className="border-border/60 from-primary/10 via-card to-accent-blue/10 relative overflow-hidden rounded-3xl border bg-gradient-to-br p-8 shadow-lg">
            {/* Subtle dot-grid texture */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
            />

            <div className="relative flex flex-col items-center text-center">
              <Avatar className="border-background size-40 border-4 shadow-xl sm:size-48">
                <AvatarImage
                  src="images/steve-sioli.jpg"
                  alt="Steve Sioli"
                  className="object-cover"
                />
                <AvatarFallback className="font-serif text-4xl">SS</AvatarFallback>
              </Avatar>

              <Badge variant="blue" className="mt-5">
                Open to new opportunities
              </Badge>

              <p className="text-muted-foreground mt-4 max-w-[24ch] font-serif text-lg italic leading-snug">
                Building the platforms other engineers build on top of.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <ImpactStatsRow className="mt-16" />
    </div>
  );
}
