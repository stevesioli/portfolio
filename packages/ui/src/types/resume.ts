/**
 * Shared data contracts for the resume site. Each micro-frontend owns
 * and exports its own content, but types live here so the shell (and
 * any future remote) can render/consume them consistently.
 */

export interface ContactLink {
  label: string;
  href: string;
  icon: 'mail' | 'linkedin' | 'phone' | 'map-pin' | 'file-down';
}

export interface ImpactStat {
  value: string;
  label: string;
  description: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  location: string;
  role: string;
  start: string;
  end: string;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  credential: string;
  date: string;
}

export interface EarlyCareerEntry {
  id: string;
  role: string;
  company: string;
  years: string;
}
