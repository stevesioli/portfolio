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
  /** Numeric value to animate (count up from 0 on scroll into view). */
  value: number;
  /** Text rendered before the animated number, e.g. "~". */
  prefix?: string;
  /** Text rendered after the animated number, e.g. "%" or "+ yrs". */
  suffix?: string;
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
