import { BriefcaseIcon, GraduationCapIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Reveal,
  Separator,
  StaggerGroup,
  StaggerItem,
  type EarlyCareerEntry,
  type EducationEntry,
} from '@resume/ui';

import '@resume/ui/styles/theme.css';

const EDUCATION: EducationEntry[] = [
  {
    id: 'art-institute',
    institution: 'The Art Institute of Philadelphia',
    credential: 'Associate Degree in Specialized Technology, Animation/Media Arts',
    date: 'December 1996',
  },
];

const EARLY_CAREER: EarlyCareerEntry[] = [
  {
    id: 'trellist',
    role: 'Senior Associate / Web Development Leadership',
    company: 'Trellist, Inc.',
    years: '2010 – 2014',
  },
  {
    id: 'cnbc-nfl',
    role: 'Flash Developer',
    company: 'CNBC, NFL Films',
    years: '2000 – 2009',
  },
];

export default function EducationSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Reveal>
        <Card className="h-full">
          <CardHeader>
            <div className="bg-primary/10 text-primary mb-2 flex size-9 items-center justify-center rounded-lg">
              <GraduationCapIcon className="size-4.5" />
            </div>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            {EDUCATION.map((entry) => (
              <div key={entry.id}>
                <p className="font-medium">{entry.credential}</p>
                <p className="text-muted-foreground mt-1 text-sm">{entry.institution}</p>
                <p className="text-muted-foreground font-mono text-xs">{entry.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </Reveal>

      <Reveal delay={0.1}>
        <Card className="h-full">
          <CardHeader>
            <div className="bg-primary/10 text-primary mb-2 flex size-9 items-center justify-center rounded-lg">
              <BriefcaseIcon className="size-4.5" />
            </div>
            <CardTitle>Early Career</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              Early career focused on interactive media, dynamic web applications, front-end
              performance, and client collaboration across enterprise brands.
            </p>
            <StaggerGroup className="space-y-4">
              {EARLY_CAREER.map((entry, index) => (
                <StaggerItem key={entry.id}>
                  {index > 0 && <Separator className="mb-4" />}
                  <div className="flex items-baseline justify-between gap-3">
                    <div>
                      <p className="font-medium">{entry.role}</p>
                      <p className="text-muted-foreground text-sm">{entry.company}</p>
                    </div>
                    <span className="text-muted-foreground shrink-0 font-mono text-xs">
                      {entry.years}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
