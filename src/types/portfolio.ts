export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
  isResume?: boolean;
}

export interface CraftPillarItem {
  id: string;
  partLabel: string;
  headline: string;
  metric: string;
  description: string;
  iconKey: 'brain' | 'eye' | 'heart' | 'sliders' | 'wrench';
  featured?: boolean;
}

export interface ProjectLinkItem {
  label: string;
  href: string;
  type: 'github' | 'live';
}

export interface ProjectItem {
  id: string;
  number: string;
  year: string;
  category: string;
  title: string;
  description: string;
  techStack: string[];
  imageSrc: string;
  imageAlt: string;
  aspect?: 'portrait' | 'landscape' | 'square';
  artworkVariant?: 'vdcft-cms' | 'makwid-billing';
  highlights?: string[];
  links: ProjectLinkItem[];
}

export interface ExperienceLink {
  label: string;
  href: string;
}

export interface ExperiencePoint {
  id: string;
  text?: string;
  richPrefix?: string;
  links?: ExperienceLink[];
  richSuffix?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  points: ExperiencePoint[];
}

export interface SkillCategory {
  id: string;
  title: string;
  iconKey: 'layout' | 'server' | 'database' | 'cloud' | 'monitor';
  skills: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  track: string;
  imageSrc: string;
  imageAlt: string;
  pdfHref: string;
  downloadName: string;
}

export interface EducationItem {
  id: string;
  degreeShort: string;
  degreeFull: string;
  institution: string;
  period: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  detail: string;
}

export interface SocialLinkItem {
  id: string;
  label: string;
  href: string;
  iconKey: 'github' | 'linkedin' | 'mail';
  isExternal: boolean;
}

export interface LightboxState {
  isOpen: boolean;
  src: string;
  title: string;
}

export interface RibbonPhraseItem {
  id: string;
  text: string;
  italic?: boolean;
}

