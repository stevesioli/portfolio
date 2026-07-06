import { ArrowDownIcon, LinkedinIcon, MailIcon, MapPinIcon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Reveal,
  StaggerGroup,
  StaggerItem,
  type ImpactStat,
} from '@resume/ui';

import '@resume/ui/styles/theme.css';

const IMPACT_STATS: ImpactStat[] = [
  {
    value: '~40%',
    label: 'less redundant front-end work',
    description: 'Introduced a shared component architecture adopted across multiple digital initiatives.',
  },
  {
    value: '~80%',
    label: 'faster page performance',
    description: 'Re-architected a legacy vehicle locator into a single-page application.',
  },
  {
    value: '15+ yrs',
    label: 'frontend platform experience',
    description: 'Enterprise and high-scale environments, from Amazon to General Motors.',
  },
  {
    value: '275+',
    label: 'global brand sites supported',
    description: 'Contributed to the CMS platform architecture powering GM’s global brand portfolio.',
  },
];

const CORE_TAGS = [
  'Design Systems',
  'Component Platforms',
  'React & TypeScript',
  'Multi-Tenant UI',
  'Monorepo Strategy',
];

export default function HeroSection() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <p className="text-primary font-mono text-xs font-medium tracking-[0.2em] uppercase">
            Staff Frontend Engineer &middot; Platform &amp; UI Architecture
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Steve Sioli
          </h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
            Staff Frontend Platform Engineer with 15+ years architecting and building scalable
            frontend platforms and UI ecosystems across enterprise and high-scale environments.
            Known for designing reusable component systems, improving developer velocity, and
            delivering performant React and TypeScript applications &mdash; and for building
            multi-tenant platforms, unified design systems, and shared component libraries that
            accelerate product development.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {CORE_TAGS.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="text-muted-foreground mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <a
              href="mailto:steve.m@sioli.com"
              className="hover:text-foreground flex items-center gap-2 transition-colors"
            >
              <MailIcon className="size-4" />
              steve.m@sioli.com
            </a>
            <a
              href="https://www.linkedin.com/in/steve-sioli"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground flex items-center gap-2 transition-colors"
            >
              <LinkedinIcon className="size-4" />
              linkedin.com/in/steve-sioli
            </a>
            <span className="flex items-center gap-2">
              <MapPinIcon className="size-4" />
              Dade City, FL &middot; Remote
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#experience">
                View experience
                <ArrowDownIcon className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#contact">Get in touch</a>
            </Button>
          </div>
        </Reveal>

        <Reveal direction="left" delay={0.1} className="flex justify-center lg:justify-end">
          <div className="relative">
            <div
              aria-hidden
              className="from-accent-blue/40 via-primary/25 absolute -inset-4 -z-10 rounded-full bg-gradient-to-br to-transparent blur-2xl"
            />
            <Avatar className="border-accent-blue/30 size-40 border-4 shadow-lg sm:size-52">
              <AvatarImage src="images/steve-sioli.jpg" alt="Steve Sioli" className="object-cover" />
              <AvatarFallback className="font-serif text-4xl">SS</AvatarFallback>
            </Avatar>
          </div>
        </Reveal>
      </div>

      <StaggerGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
    </div>
  );
}
