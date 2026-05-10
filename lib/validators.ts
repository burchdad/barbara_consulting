import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  message: z.string().min(10).max(4000),
});

export const jobSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  slug: z.string().min(2),
  department: z.string().min(2),
  location: z.string().min(2),
  jobType: z.string().min(2),
  employmentType: z.string().min(2),
  description: z.string().min(10),
  responsibilities: z.array(z.string().min(1)),
  requirements: z.array(z.string().min(1)),
  benefits: z.array(z.string().min(1)),
  applyUrl: z.string().url().optional().or(z.literal("")),
  isPublished: z.boolean().default(false),
});

export const caseStudySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  slug: z.string().min(2),
  summary: z.string().min(10),
  iconUrl: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  highlights: z.array(z.string().min(1)),
  challenge: z.string().min(10),
  solution: z.string().min(10),
  results: z.string().min(10),
  metrics: z.array(z.string().min(1)),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
});

export const contractSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  contractNumber: z.string().min(2),
  agency: z.string().min(2),
  period: z.string().min(2),
  contractType: z.string().min(2),
  availability: z.string().min(2),
  programManager: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  summary: z.string().min(10),
  scope: z.string().min(10),
  isPublished: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
});

export const leadershipSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  title: z.string().min(2),
  photoUrl: z.string().url().optional().or(z.literal("")),
  shortBio: z.string().min(10),
  fullBio: z.string().min(20),
  linkedInUrl: z.string().url().optional().or(z.literal("")),
  displayOrder: z.number().int().default(0),
  isPublished: z.boolean().default(false),
});

export const testimonialSchema = z.object({
  id: z.string().optional(),
  quote: z.string().min(10),
  authorName: z.string().min(2),
  authorTitle: z.string().min(2),
  organization: z.string().min(2),
  displayOrder: z.number().int().default(0),
  isPublished: z.boolean().default(false),
});

export const serviceItemSchema = z.object({
  id: z.string().optional(),
  category: z.string().min(2),
  title: z.string().min(2),
  description: z.string().min(10),
  bulletItems: z.array(z.string().min(1)),
  displayOrder: z.number().int().default(0),
  isPublished: z.boolean().default(false),
});

export const missionPartnerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  logoUrl: z.string().url().optional().or(z.literal("")),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  displayOrder: z.number().int().default(0),
  isPublished: z.boolean().default(false),
});

export const globalSettingSchema = z.object({
  companyName: z.string().min(2),
  tagline: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  address: z.string().min(5),
  linkedInUrl: z.string().url().optional().or(z.literal("")),
  footerStatement: z.string().min(10),
  heroHeadline: z.string().min(10),
  heroSubheadline: z.string().min(10),
});

export function toList(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  return String(value)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function toBool(value: FormDataEntryValue | null): boolean {
  return value === "on" || value === "true";
}

export function toInt(value: FormDataEntryValue | null): number {
  if (!value) return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
