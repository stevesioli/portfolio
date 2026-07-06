import { lazy } from 'react';

/**
 * Lazily-loaded federated remotes. Each import specifier (e.g.
 * "mfeHero/HeroSection") is resolved at runtime by the Module
 * Federation Vite plugin against the `remotes` map in vite.config.ts —
 * every one of these is a genuinely separate build artifact.
 */
export const HeroSection = lazy(() => import('mfeHero/HeroSection'));
export const ExperienceSection = lazy(() => import('mfeExperience/ExperienceSection'));
export const SkillsSection = lazy(() => import('mfeSkills/SkillsSection'));
export const EducationSection = lazy(() => import('mfeEducation/EducationSection'));
export const ContactSection = lazy(() => import('mfeContact/ContactSection'));
