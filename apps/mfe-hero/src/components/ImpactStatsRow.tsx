import { StaggerGroup, StaggerItem } from '@resume/ui';

import { IMPACT_STATS } from '../content';

export function ImpactStatsRow({ className }: { className?: string }) {
  return (
    <StaggerGroup className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className ?? ''}`}>
      {IMPACT_STATS.map((stat) => (
        <StaggerItem key={stat.label}>
          <div className="border-border/60 bg-card h-full rounded-xl border p-5">
            <p className="text-primary font-serif text-3xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-sm font-medium">{stat.label}</p>
            <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
              {stat.description}
            </p>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
