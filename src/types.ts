/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ImpactStat {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  icon: string;
  description: string;
}

export interface Partner {
  name: string;
  type: 'government' | 'ngo' | 'sports' | 'local';
  iconName: string;
  description?: string;
}

export interface StrategyPillar {
  title: string;
  icon: string;
  tagline: string;
  description: string;
  bullets: string[];
}

export interface ValueItem {
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  volunteerType: 'student' | 'professional';
  interests: string[];
  message: string;
  submittedAt: string;
}

export interface InternshipApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  academicBackground: string;
  department: string;
  statement: string;
  submittedAt: string;
}

export interface FundraiserRegistration {
  id: string;
  name: string;
  email: string;
  groupType: 'individual' | 'student' | 'community' | 'organization';
  targetAmount: number;
  pitch: string;
  submittedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}
