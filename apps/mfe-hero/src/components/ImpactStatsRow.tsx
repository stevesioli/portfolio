import { ClockIcon, GaugeIcon, GlobeIcon, TrendingDownIcon, type LucideIcon } from 'lucide-react';
import { CountUp, StaggerGroup, StaggerItem } from '@resume/ui';

import { IMPACT_STATS } from '../content';

const ICONS: LucideIcon[] = [TrendingDownIcon, GaugeIcon, ClockIcon, GlobeIcon];

/** Alternates the two accent colors across the row so both show up together. */
const ACCENTS = ['primary', 'accent-blue', 'primary', 'accent-blue'] as const;

export function ImpactStatsRow({ className }: { className?: string }) {
  return (
    <StaggerGroup className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className ?? ''}`}>
      {IMPACT_STATS.map((stat, index) => {
        const Icon = ICONS[index % ICONS.length];
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
                className={`absolute -top-3 -right-3 size-20 rotate-6 opacity-[0.07] transition-transform duration-300 group-hover:scale-110 ${
                  isBlue ? 'text-accent-blue' : 'text-primary'
                }`}
              />

              <div
                className={`relative mb-3 flex size-9 items-center justify-center rounded-lg ${
                  isBlue ? 'bg-accent-blue/10 text-accent-blue' : 'bg-primary/10 text-primary'
                }`}
              >
                <Icon className="size-4.5" />
              </div>

              <p
                className={`relative font-serif text-4xl font-semibold tracking-tight sm:text-5xl ${
                  isBlue ? 'text-accent-blue' : 'text-primary'
                }`}
              >
                {stat.prefix}
                <CountUp value={stat.value} />
                {stat.suffix}
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
