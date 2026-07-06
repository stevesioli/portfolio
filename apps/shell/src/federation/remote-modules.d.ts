/**
 * Ambient declarations for federated remotes. Each is a real,
 * independently built application (see /apps/mfe-*); these modules only
 * exist once Module Federation stitches them in at runtime, so
 * TypeScript can't resolve them by reading the filesystem — we tell it
 * what shape to expect instead.
 */

declare module 'mfeHero/HeroSection' {
  import type { ComponentType } from 'react';
  const HeroSection: ComponentType;
  export default HeroSection;
}

declare module 'mfeExperience/ExperienceSection' {
  import type { ComponentType } from 'react';
  const ExperienceSection: ComponentType;
  export default ExperienceSection;
}

declare module 'mfeSkills/SkillsSection' {
  import type { ComponentType } from 'react';
  const SkillsSection: ComponentType;
  export default SkillsSection;
}

declare module 'mfeEducation/EducationSection' {
  import type { ComponentType } from 'react';
  const EducationSection: ComponentType;
  export default EducationSection;
}

declare module 'mfeContact/ContactSection' {
  import type { ComponentType } from 'react';
  const ContactSection: ComponentType;
  export default ContactSection;
}
