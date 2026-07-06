import { CodeIcon, LayersIcon, UsersIcon } from 'lucide-react';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StaggerGroup,
  StaggerItem,
  type SkillCategory,
} from '@resume/ui';

import '@resume/ui/styles/theme.css';

const SKILL_CATEGORIES: (SkillCategory & { icon: typeof LayersIcon })[] = [
  {
    id: 'architecture',
    title: 'Frontend Platform Architecture',
    icon: LayersIcon,
    skills: [
      'Design systems',
      'Component libraries',
      'Multi-tenant UI systems',
      'Scalable SPA architecture',
      'Monorepo strategy',
      'Shared package architecture',
    ],
  },
  {
    id: 'leadership',
    title: 'Leadership & Influence',
    icon: UsersIcon,
    skills: [
      'Technical roadmapping',
      'Cross-team alignment',
      'Mentorship & code review standards',
      'Architectural decision frameworks',
      'Agile delivery leadership',
    ],
  },
  {
    id: 'technologies',
    title: 'Technologies',
    icon: CodeIcon,
    skills: [
      'React',
      'TypeScript',
      'Node.js',
      'REST APIs',
      'Tailwind CSS',
      'Web Components',
      'Adobe Experience Manager (AEM)',
      'Webpack / Vite',
      'Storybook',
      'CI/CD pipelines',
      'GitHub Actions',
      'AWS',
    ],
  },
];

export default function SkillsSection() {
  return (
    <StaggerGroup className="grid gap-6 md:grid-cols-3">
      {SKILL_CATEGORIES.map((category) => {
        const Icon = category.icon;
        return (
          <StaggerItem key={category.id}>
            <Card className="h-full">
              <CardHeader>
                <div className="bg-accent-blue/10 text-accent-blue mb-2 flex size-9 items-center justify-center rounded-lg">
                  <Icon className="size-4.5" />
                </div>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
