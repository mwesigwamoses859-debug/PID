export interface MetricItem {
  id: string;
  value: string;
  numericValue: number;
  label: string;
  description: string;
  iconName: string;
}

export interface CoreValue {
  name: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface PartnerItem {
  name: string;
  category: string;
  description: string;
  logoUrl?: string;
}

export interface PolicyItem {
  title: string;
  code: string;
  description: string;
  scope: string;
  iconName: string;
}

export interface OrgNode {
  title: string;
  subtitle: string;
  description: string;
  level: 'board' | 'secretariat' | 'district';
  children?: OrgNode[];
}

export interface OpportunityDetails {
  title: string;
  description: string;
  highlights: string[];
  contactEmail: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FundraiserFormInput {
  fullName: string;
  email: string;
  phone: string;
  groupType: 'individual' | 'student_group' | 'community' | 'corporate';
  motivation: string;
}

export interface Programme {
  id: string;
  title: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  bgImage: string;
  detailImage: string;
  iconName: string;
  objectives: string[];
  activities: string[];
  outcomes: string[];
  galleryImages?: string[];
}
