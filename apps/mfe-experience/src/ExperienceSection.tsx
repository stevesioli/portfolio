import { Badge, Reveal, StaggerGroup, StaggerItem, type ExperienceEntry } from '@resume/ui';

import '@resume/ui/styles/theme.css';

const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'travel-leisure',
    company: 'Travel + Leisure, Co.',
    location: 'Orlando, FL (remote)',
    role: 'Senior Software Consultant',
    start: 'Oct 2023',
    end: 'Present',
    highlights: [
      'Architected and led delivery of a multi-tenant Adobe Experience Manager (AEM) platform enabling multi-brand expansion, including launch of the Sports Illustrated Resorts marketing site.',
      'Designed component-driven front-end architecture enabling non-technical marketing teams to configure digital experiences through reusable AEM authoring components.',
      'Designed and implemented an enterprise web component library aligned with the company design system, adopted across multiple digital initiatives.',
      'Introduced shared component architecture adopted across multiple digital initiatives, reducing redundant front-end development by ~40%.',
      'Established governance and contribution standards for reusable UI components to ensure long-term scalability.',
      'Served as de facto technical lead on a high-visibility initiative, driving architectural decisions and cross-team alignment under ambiguity.',
      'Leveraged AI-assisted development (Cursor, Claude Code) to build automated content migration tooling from a legacy AEM instance to modernized components.',
      'Prototyped Figma MCP integration within the web component library to streamline component creation and updates.',
    ],
  },
  {
    id: 'amazon',
    company: 'Amazon',
    location: 'Tempe, AZ',
    role: 'Front-End Engineer II',
    start: 'Jul 2019',
    end: 'Sept 2023',
    highlights: [
      "Authored architecture for Amazon's next-generation promotions platform, unifying Selling Partner interfaces across Seller and Vendor Central.",
      "Delivered React-based seller tooling used by first- and third-party merchants operating across Amazon's global marketplaces.",
      'Designed pan-region deal management capability enabling sellers to manage cross-country promotions through a unified experience.',
      'Co-founded a front-end engineering committee to improve testing strategy, integration standards, and cross-team knowledge sharing.',
      'Introduced regular front-end office hours to address developer productivity gaps and improve engineering alignment.',
      'Mentored intern and junior engineers through onboarding, architecture discussions, and design/code reviews.',
    ],
  },
  {
    id: 'gm-lead',
    company: 'General Motors',
    location: 'Chandler, AZ',
    role: 'Lead UI Developer / Team & Platform Lead',
    start: 'Feb 2017',
    end: 'Jul 2019',
    highlights: [
      'Led a 7-engineer core UI team for the responsive redesign of Buick.com, coordinating across distributed platform teams.',
      'Oversaw sprint planning, architecture reviews, CI/CD processes, code reviews, and production deployments.',
      'Partnered with QA and product to identify and resolve platform defects and performance issues.',
      'Contributed to ongoing CMS architecture evolution and technical debt reduction initiatives.',
    ],
  },
  {
    id: 'gm-senior',
    company: 'General Motors',
    location: 'Chandler, AZ',
    role: 'Senior / Lead UI Developer',
    start: 'Jun 2014',
    end: 'Jan 2017',
    highlights: [
      'Re-architected a legacy vehicle locator application into a single-page Angular application, improving performance by ~80%.',
      'Led the Opel Germany platform refresh, running team meetings and collaborating closely with business analysts to refine user stories.',
      'Contributed to insourcing and architectural evolution of the CMS platform (Adobe CQ 5.4) powering 275+ global brand sites, reducing annual vendor costs by millions.',
      'Developed an internal open-source contribution model for enterprise web components (pure ES6 custom elements), including Git standards, ESLint rules, and implementation documentation.',
    ],
  },
];

export default function ExperienceSection() {
  return (
    <div>
      <div role="list" className="relative">
        <div
          aria-hidden
          className="bg-border absolute top-2 bottom-2 left-[7px] hidden w-px sm:block"
        />
        <StaggerGroup className="space-y-10 sm:space-y-12">
          {EXPERIENCE.map((entry) => (
            <StaggerItem key={entry.id} role="listitem" className="relative sm:pl-10">
              <span
                aria-hidden
                className="bg-primary absolute top-2 left-0 hidden size-[15px] rounded-full ring-4 ring-background sm:block"
              />

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-serif text-xl font-semibold">{entry.role}</h3>
                <Badge variant="outline" className="w-fit font-mono">
                  {entry.start} &ndash; {entry.end}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1 text-sm font-medium">
                {entry.company} &middot; {entry.location}
              </p>

              <ul className="mt-4 space-y-2.5">
                {entry.highlights.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed">
                    <span className="bg-primary/60 mt-2 size-1 shrink-0 rounded-full" />
                    <span className="text-foreground/90">{point}</span>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <Reveal delay={0.1} className="mt-10">
        <p className="text-muted-foreground text-sm">
          Full career history, including early-career roles, is available on the{' '}
          <a href="#education" className="text-primary underline underline-offset-4">
            Education &amp; Early Career
          </a>{' '}
          section and in the downloadable résumé.
        </p>
      </Reveal>
    </div>
  );
}
