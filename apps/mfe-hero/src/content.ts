import {
  ClockIcon,
  GaugeIcon,
  TrendingDownIcon,
  UsersIcon,
  type LucideIcon,
} from 'lucide-react';
import type { ImpactStat } from '@resume/ui';

export type ImpactStatWithIcon = ImpactStat & { icon: LucideIcon };

export const NAME = 'Steve Sioli';
export const TITLE = 'Staff Engineer, Front-End';
export const KICKER = 'Staff Engineer, Front-End — Platform & UI Architecture';

export const SUMMARY =
  'Staff Frontend Platform Engineer with 15+ years of experience architecting and building ' +
  'scalable frontend platforms and UI ecosystems across enterprise and high-scale ' +
  'environments. Known for designing reusable component systems, improving developer ' +
  'velocity, and delivering performant React and TypeScript applications. Proven leader in ' +
  'building multi-tenant platforms, unified design systems, and shared component libraries ' +
  'that accelerate product development and improve quality.';

/**
 * Short editorial statement shown in the hero's pull-quote panel.
 * Original copy written to match resume tone — worth a quick
 * read-through before shipping it as a standing personal tagline.
 */
export const PULL_QUOTE =
  'I build the platforms other engineers build with — component systems, ' +
  'design systems, and shared architecture — that make everyone else faster.';

export const IMPACT_STATS: ImpactStatWithIcon[] = [
  {
    value: 15,
    suffix: '+ yrs',
    icon: ClockIcon,
    label: 'frontend platform experience',
    description: 'Enterprise and high-scale environments, from Amazon to General Motors.',
  },
  {
    value: 40,
    suffix: '%',
    icon: TrendingDownIcon,
    label: 'less redundant front-end work',
    description:
      'Introduced a shared component architecture adopted across multiple digital initiatives.',
  },
  {
    value: 80,
    suffix: '%',
    icon: GaugeIcon,
    label: 'faster page performance',
    description: 'Re-architected a legacy vehicle locator into a single-page application.',
  },
  {
    value: 2,
    suffix: '.5M+',
    icon: UsersIcon,
    label: 'active sellers worldwide',
    description: 'Unified Seller and Vendor Central experiences on Amazon’s next-gen promotions platform.',
  },
];

export const CORE_TAGS = [
  'React & TypeScript',
  'Component Platforms',
  'Multi-Tenant UI',
  'Design Systems',
];
