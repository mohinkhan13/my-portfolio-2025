import { LucideIcon } from 'lucide-react';

export interface SocialLink {
  name: string;
  url: string;
  icon: string; // Changed from LucideIcon to string to support storage serialization
}

export interface Skill {
  name: string;
  level: string; // e.g., "Intermediate", "Advanced"
  category: 'Frontend' | 'Backend' | 'Database' | 'Languages';
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  description?: string;
}

export interface ProjectItem {
  title: string;
  techStack: string[];
  description: string[];
  type: string; // e.g., "E-commerce", "Blog"
  liveUrl?: string;
  repoUrl?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  year: string;
}

export interface ContactInfo {
  phone: string;
  email: string[];
  address: string;
}