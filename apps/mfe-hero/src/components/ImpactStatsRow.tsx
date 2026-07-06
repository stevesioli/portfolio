import { CountUp, StaggerGroup, StaggerItem } from '@resume/ui';

import { IMPACT_STATS } from '../content';

/** Alternates the two accent colors across the row so both show up together. */
const ACCENTS = ['primary', 'accent-blue', 'primary', 'accent-blue'] as const;

export function ImpactStatsRow({ className }: { className?: string }) {
  return (
    <StaggerGroup className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className ?? ''}`}>
      {IMPACT_STATS.map((stat, index) => {
        const Icon = stat.icon;
        const accent = ACCENTS[index % ACCENTS.length];
        const isBlue = accent === 'accent-blue';

        return (
          <StaggerItem key={stat.label}>
            <div
              className={`group border-border/60 bg-card relative h-full overflow-hidden rounded-xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                isBlue ? 'hover:border-accent-blue/50' : 'hover:border-primary/50'
              }`}
            >
              {/* Oversized watermark icon for depth */}
              <Icon
                aria-hidden
                className={`absolute -top-6 -right-6 size-36 rotate-6 opacity-[0.07] transition-transform duration-300 group-hover:scale-110 ${
                  isBlue ? 'text-accent-blue' : 'text-primary'
                }`}
              />

              <p
                className={`relative flex items-start font-serif font-semibold tracking-tight ${
                  isBlue ? 'text-accent-blue' : 'text-primary'
                }`}
              >
                {stat.prefix && <span className="text-xl sm:text-2xl">{stat.prefix}</span>}
                <span className="text-6xl leading-none sm:text-7xl">
                  <CountUp value={stat.value} />
                </span>
                {stat.suffix && <span className="text-xl sm:text-2xl">{stat.suffix}</span>}
              </p>
              <p className="relative mt-2 text-sm font-medium">{stat.label}</p>
              <p className="text-muted-foreground relative mt-2 text-xs leading-relaxed">
                {stat.description}
              </p>
            </div>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
