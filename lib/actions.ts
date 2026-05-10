"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SubmissionStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { clearAdminSession, loginAdmin, requireAdmin } from "@/lib/auth";
import {
  caseStudySchema,
  contactSchema,
  contractSchema,
  globalSettingSchema,
  jobSchema,
  leadershipSchema,
  loginSchema,
  missionPartnerSchema,
  serviceItemSchema,
  testimonialSchema,
  toBool,
  toInt,
  toList,
} from "@/lib/validators";

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function loginAction(_: unknown, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { success: false, message: "Invalid credentials." };
  }

  const user = await loginAdmin(parsed.data.email, parsed.data.password);
  if (!user) {
    return { success: false, message: "Invalid credentials." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function createContactSubmissionAction(
  _: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please review your fields and try again.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  await prisma.contactSubmission.create({ data: parsed.data });
  revalidatePath("/admin/submissions");

  return {
    success: true,
    message: "Message received. Our team will respond shortly.",
  };
}

export async function upsertJobAction(formData: FormData) {
  await requireAdmin();
  const parsed = jobSchema.safeParse({
    id: String(formData.get("id") || "") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug"),
    department: formData.get("department"),
    location: formData.get("location"),
    jobType: formData.get("jobType"),
    employmentType: formData.get("employmentType"),
    description: formData.get("description"),
    responsibilities: toList(formData.get("responsibilities")),
    requirements: toList(formData.get("requirements")),
    benefits: toList(formData.get("benefits")),
    applyUrl: String(formData.get("applyUrl") || ""),
    isPublished: toBool(formData.get("isPublished")),
  });
  if (!parsed.success) return;

  const { id, ...data } = parsed.data;
  if (id) {
    await prisma.job.update({ where: { id }, data });
  } else {
    await prisma.job.create({ data });
  }
  revalidatePath("/careers");
  revalidatePath("/admin/jobs");
}

export async function deleteJobAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.job.delete({ where: { id } });
  revalidatePath("/careers");
  revalidatePath("/admin/jobs");
}

export async function upsertCaseStudyAction(formData: FormData) {
  await requireAdmin();
  const parsed = caseStudySchema.safeParse({
    id: String(formData.get("id") || "") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug"),
    summary: formData.get("summary"),
    iconUrl: String(formData.get("iconUrl") || ""),
    imageUrl: String(formData.get("imageUrl") || ""),
    highlights: toList(formData.get("highlights")),
    challenge: formData.get("challenge"),
    solution: formData.get("solution"),
    results: formData.get("results"),
    metrics: toList(formData.get("metrics")),
    isFeatured: toBool(formData.get("isFeatured")),
    isPublished: toBool(formData.get("isPublished")),
    displayOrder: toInt(formData.get("displayOrder")),
  });
  if (!parsed.success) return;

  const { id, ...data } = parsed.data;
  if (id) {
    await prisma.caseStudy.update({ where: { id }, data });
  } else {
    await prisma.caseStudy.create({ data });
  }
  revalidatePath("/case-studies");
  revalidatePath("/admin/case-studies");
}

export async function deleteCaseStudyAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.caseStudy.delete({ where: { id } });
  revalidatePath("/case-studies");
  revalidatePath("/admin/case-studies");
}

export async function upsertContractAction(formData: FormData) {
  await requireAdmin();
  const parsed = contractSchema.safeParse({
    id: String(formData.get("id") || "") || undefined,
    name: formData.get("name"),
    contractNumber: formData.get("contractNumber"),
    agency: formData.get("agency"),
    period: formData.get("period"),
    contractType: formData.get("contractType"),
    availability: formData.get("availability"),
    programManager: formData.get("programManager"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    summary: formData.get("summary"),
    scope: formData.get("scope"),
    isPublished: toBool(formData.get("isPublished")),
    displayOrder: toInt(formData.get("displayOrder")),
  });
  if (!parsed.success) return;

  const { id, ...data } = parsed.data;
  if (id) {
    await prisma.contract.update({ where: { id }, data });
  } else {
    await prisma.contract.create({ data });
  }
  revalidatePath("/contracts");
  revalidatePath("/admin/contracts");
}

export async function deleteContractAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.contract.delete({ where: { id } });
  revalidatePath("/contracts");
  revalidatePath("/admin/contracts");
}

export async function upsertLeadershipAction(formData: FormData) {
  await requireAdmin();
  const parsed = leadershipSchema.safeParse({
    id: String(formData.get("id") || "") || undefined,
    name: formData.get("name"),
    title: formData.get("title"),
    photoUrl: String(formData.get("photoUrl") || ""),
    shortBio: formData.get("shortBio"),
    fullBio: formData.get("fullBio"),
    linkedInUrl: String(formData.get("linkedInUrl") || ""),
    displayOrder: toInt(formData.get("displayOrder")),
    isPublished: toBool(formData.get("isPublished")),
  });
  if (!parsed.success) return;

  const { id, ...data } = parsed.data;
  if (id) {
    await prisma.leadershipMember.update({ where: { id }, data });
  } else {
    await prisma.leadershipMember.create({ data });
  }
  revalidatePath("/about");
  revalidatePath("/admin/leadership");
}

export async function deleteLeadershipAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.leadershipMember.delete({ where: { id } });
  revalidatePath("/about");
  revalidatePath("/admin/leadership");
}

export async function upsertTestimonialAction(formData: FormData) {
  await requireAdmin();
  const parsed = testimonialSchema.safeParse({
    id: String(formData.get("id") || "") || undefined,
    quote: formData.get("quote"),
    authorName: formData.get("authorName"),
    authorTitle: formData.get("authorTitle"),
    organization: formData.get("organization"),
    displayOrder: toInt(formData.get("displayOrder")),
    isPublished: toBool(formData.get("isPublished")),
  });
  if (!parsed.success) return;

  const { id, ...data } = parsed.data;
  if (id) {
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function upsertServiceAction(formData: FormData) {
  await requireAdmin();
  const parsed = serviceItemSchema.safeParse({
    id: String(formData.get("id") || "") || undefined,
    category: formData.get("category"),
    title: formData.get("title"),
    description: formData.get("description"),
    bulletItems: toList(formData.get("bulletItems")),
    displayOrder: toInt(formData.get("displayOrder")),
    isPublished: toBool(formData.get("isPublished")),
  });
  if (!parsed.success) return;

  const { id, ...data } = parsed.data;
  if (id) {
    await prisma.serviceItem.update({ where: { id }, data });
  } else {
    await prisma.serviceItem.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function deleteServiceAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.serviceItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function upsertPartnerAction(formData: FormData) {
  await requireAdmin();
  const parsed = missionPartnerSchema.safeParse({
    id: String(formData.get("id") || "") || undefined,
    name: formData.get("name"),
    logoUrl: String(formData.get("logoUrl") || ""),
    websiteUrl: String(formData.get("websiteUrl") || ""),
    displayOrder: toInt(formData.get("displayOrder")),
    isPublished: toBool(formData.get("isPublished")),
  });
  if (!parsed.success) return;

  const { id, ...data } = parsed.data;
  if (id) {
    await prisma.missionPartner.update({ where: { id }, data });
  } else {
    await prisma.missionPartner.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/admin/partners");
}

export async function deletePartnerAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.missionPartner.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/partners");
}

export async function setSubmissionStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "unread") as SubmissionStatus;
  if (!id) return;
  await prisma.contactSubmission.update({ where: { id }, data: { status } });
  revalidatePath("/admin/submissions");
}

export async function deleteSubmissionAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/submissions");
}

export async function updateGlobalSettingsAction(formData: FormData) {
  await requireAdmin();
  const parsed = globalSettingSchema.safeParse({
    companyName: formData.get("companyName"),
    tagline: formData.get("tagline"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    linkedInUrl: String(formData.get("linkedInUrl") || ""),
    footerStatement: formData.get("footerStatement"),
    heroHeadline: formData.get("heroHeadline"),
    heroSubheadline: formData.get("heroSubheadline"),
  });
  if (!parsed.success) return;

  const existing = await prisma.globalSetting.findFirst();
  if (existing) {
    await prisma.globalSetting.update({ where: { id: existing.id }, data: parsed.data });
  } else {
    await prisma.globalSetting.create({ data: parsed.data });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
}
