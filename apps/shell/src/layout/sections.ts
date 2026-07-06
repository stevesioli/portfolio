export interface SiteSection {
  id: string;
  label: string;
}

/** Single source of truth for nav links + scrollspy + section anchors. */
export const SITE_SECTIONS: SiteSection[] = [
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
