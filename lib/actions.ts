"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SubmissionStatus } from "@prisma/client";
import { ensureGlobalSettingCompatibility } from "@/lib/admin-settings";
import { ensurePartnershipContactCompatibility } from "@/lib/partnership-contact-compatibility";
import { prisma } from "@/lib/prisma";
import { clearAdminSession, loginAdmin, requireAdmin } from "@/lib/auth";
import { uploadAdminFile, uploadAdminFiles } from "@/lib/blob-uploads";
import {
  caseStudySchema,
  contactSchema,
  contractSchema,
  globalSettingSchema,
  jobSchema,
  leadershipSchema,
  loginSchema,
  missionPartnerSchema,
  partnershipContactSchema,
  serviceItemSchema,
  supportTicketSchema,
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

export type SupportTicketFormState = {
  success: boolean;
  message: string;
  ticketId?: string;
  errors?: Record<string, string[]>;
};

const ghostMissionControlWebhookUrl =
  process.env.GHOST_MISSION_CONTROL_WEBHOOK_URL ||
  process.env.WEB_HELPER_AGENT_WEBHOOK_URL ||
  "https://ghostmissioncontrol-production.up.railway.app/mission/web-helper-requests";

const ghostMissionControlWebhookSecret =
  process.env.GHOST_WEB_HELPER_WEBHOOK_SECRET ||
  process.env.GHOST_WEBHOOK_SECRET ||
  process.env.GHOST_MISSION_CONTROL_WEBHOOK_SECRET ||
  process.env.WEB_HELPER_AGENT_WEBHOOK_SECRET;

function buildSupportTicketPayload(ticket: {
  id: string;
  clientName: string;
  requesterName: string;
  requesterEmail: string;
  pageUrl: string;
  requestType: string;
  priority: string;
  summary: string;
  details: string;
  attachments: unknown;
}) {
  return {
    client: ticket.clientName,
    site: "www.graymatterstech.com",
    repo: "burchdad/barbara_consulting",
    source: "client_admin_dashboard",
    request_type: ticket.requestType,
    priority: ticket.priority,
    page_url: ticket.pageUrl,
    summary: ticket.summary,
    details: ticket.details,
    requester: {
      name: ticket.requesterName,
      email: ticket.requesterEmail,
    },
    attachments: Array.isArray(ticket.attachments) ? ticket.attachments : [],
    branch_policy: "testing_branch_only",
    approval_required: true,
    ticket_id: ticket.id,
  };
}

async function forwardSupportTicket(ticket: Parameters<typeof buildSupportTicketPayload>[0]) {
  if (!ghostMissionControlWebhookSecret) {
    return {
      status: "needs_webhook_secret",
      message: "Support request saved, but the Ghost Mission Control webhook secret is not configured.",
    };
  }

  try {
    const response = await fetch(ghostMissionControlWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Ghost-Webhook-Secret": ghostMissionControlWebhookSecret,
      },
      body: JSON.stringify(buildSupportTicketPayload(ticket)),
    });

    if (response.ok) {
      return {
        status: "sent",
        message: "Support request sent to Ghost Mission Control.",
      };
    }

    const responseBody = await response.text().catch(() => "");
    console.error("[admin/support] Ghost Mission Control rejected ticket.", {
      status: response.status,
      responseBody,
    });
    return {
      status: "webhook_failed",
      message:
        response.status === 401
          ? "Support request saved, but Mission Control rejected the webhook secret. Confirm the Vercel and Railway secrets match, then retry."
          : "Support request saved, but Mission Control did not accept the handoff. Check Mission Control logs, then retry.",
    };
  } catch (error) {
    console.error("[admin/support] Unable to send ticket to Ghost Mission Control.", error);
    return {
      status: "webhook_failed",
      message: "Support request saved, but Mission Control could not be reached. Check the webhook URL, then retry.",
    };
  }
}

export async function loginAction(_: unknown, formData: FormData) {
  const redirectTo = String(formData.get("redirectTo") || "/admin");
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

  redirect(redirectTo.startsWith("/") ? redirectTo : "/admin");
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
  try {
    if (id) {
      await prisma.job.update({ where: { id }, data });
    } else {
      await prisma.job.create({ data });
    }
  } catch (error) {
    console.error("[admin/jobs] Unable to save job.", error);
    return;
  }
  revalidatePath("/careers");
  revalidatePath("/admin/jobs");
}

export async function deleteJobAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  try {
    await prisma.job.delete({ where: { id } });
  } catch (error) {
    console.error("[admin/jobs] Unable to delete job.", error);
    return;
  }
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
  try {
    if (id) {
      await prisma.caseStudy.update({ where: { id }, data });
    } else {
      await prisma.caseStudy.create({ data });
    }
  } catch (error) {
    console.error("[admin/case-studies] Unable to save case study.", error);
    return;
  }
  revalidatePath("/case-studies");
  revalidatePath("/admin/case-studies");
}

export async function deleteCaseStudyAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  try {
    await prisma.caseStudy.delete({ where: { id } });
  } catch (error) {
    console.error("[admin/case-studies] Unable to delete case study.", error);
    return;
  }
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
  try {
    if (id) {
      await prisma.contract.update({ where: { id }, data });
    } else {
      await prisma.contract.create({ data });
    }
  } catch (error) {
    console.error("[admin/contracts] Unable to save contract.", error);
    return;
  }
  revalidatePath("/contracts");
  revalidatePath("/admin/contracts");
}

export async function deleteContractAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  try {
    await prisma.contract.delete({ where: { id } });
  } catch (error) {
    console.error("[admin/contracts] Unable to delete contract.", error);
    return;
  }
  revalidatePath("/contracts");
  revalidatePath("/admin/contracts");
}

export async function upsertLeadershipAction(formData: FormData) {
  await requireAdmin();
  const uploadedPhotoUrl = await uploadAdminFile(formData, "photoFile", "admin/leadership", "image").catch((error) => {
    console.error("[admin/leadership] Unable to upload leader photo.", error);
    return null;
  });

  const parsed = leadershipSchema.safeParse({
    id: String(formData.get("id") || "") || undefined,
    name: formData.get("name"),
    title: formData.get("title"),
    photoUrl: uploadedPhotoUrl || String(formData.get("photoUrl") || ""),
    shortBio: formData.get("shortBio"),
    fullBio: formData.get("fullBio"),
    linkedInUrl: String(formData.get("linkedInUrl") || ""),
    displayOrder: toInt(formData.get("displayOrder")),
    isPublished: toBool(formData.get("isPublished")),
  });
  if (!parsed.success) return;

  const { id, ...data } = parsed.data;
  try {
    if (id) {
      await prisma.leadershipMember.update({ where: { id }, data });
    } else {
      await prisma.leadershipMember.create({ data });
    }
  } catch (error) {
    console.error("[admin/leadership] Unable to save leader.", error);
    return;
  }
  revalidatePath("/about");
  revalidatePath("/admin/leadership");
}

export async function deleteLeadershipAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  try {
    await prisma.leadershipMember.delete({ where: { id } });
  } catch (error) {
    console.error("[admin/leadership] Unable to delete leader.", error);
    return;
  }
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
  try {
    if (id) {
      await prisma.testimonial.update({ where: { id }, data });
    } else {
      await prisma.testimonial.create({ data });
    }
  } catch (error) {
    console.error("[admin/testimonials] Unable to save testimonial.", error);
    return;
  }
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  try {
    await prisma.testimonial.delete({ where: { id } });
  } catch (error) {
    console.error("[admin/testimonials] Unable to delete testimonial.", error);
    return;
  }
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
  try {
    if (id) {
      await prisma.serviceItem.update({ where: { id }, data });
    } else {
      await prisma.serviceItem.create({ data });
    }
  } catch (error) {
    console.error("[admin/services] Unable to save service.", error);
    return;
  }
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function deleteServiceAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  try {
    await prisma.serviceItem.delete({ where: { id } });
  } catch (error) {
    console.error("[admin/services] Unable to delete service.", error);
    return;
  }
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function updateDashboardOverviewAction(formData: FormData) {
  await requireAdmin();
  await ensureGlobalSettingCompatibility();

  const existing = await prisma.globalSetting.findFirst();
  if (!existing) return;
  const uploadedCapabilityUrl = await uploadAdminFile(formData, "capabilityStatementFile", "admin/capabilities", "pdf").catch((error) => {
    console.error("[admin/dashboard] Unable to upload capabilities statement.", error);
    return null;
  });

  const parsed = globalSettingSchema.safeParse({
    companyName: String(formData.get("companyName") || existing.companyName),
    tagline: String(formData.get("tagline") || existing.tagline),
    email: existing.email,
    phone: existing.phone,
    address: existing.address,
    linkedInUrl: existing.linkedInUrl ?? "",
    footerStatement: String(formData.get("footerStatement") || existing.footerStatement),
    heroEyebrow: String(formData.get("heroEyebrow") || existing.heroEyebrow),
    heroHeadline: String(formData.get("heroHeadline") || existing.heroHeadline),
    heroTrustBadge: existing.heroTrustBadge,
    heroSubheadline: String(formData.get("heroSubheadline") || existing.heroSubheadline),
    aboutHeroImageUrl: existing.aboutHeroImageUrl ?? "",
    caseStudiesHeroImageUrl: existing.caseStudiesHeroImageUrl ?? "",
    caseStudyDetailFallbackImageUrl: existing.caseStudyDetailFallbackImageUrl ?? "",
    careersHeroImageUrl: existing.careersHeroImageUrl ?? "",
    contactHeroImageUrl: existing.contactHeroImageUrl ?? "",
    contractsHeroImageUrl: existing.contractsHeroImageUrl ?? "",
    privacyHeroImageUrl: existing.privacyHeroImageUrl ?? "",
    capabilityStatementUrl: uploadedCapabilityUrl || String(formData.get("capabilityStatementUrl") || existing.capabilityStatementUrl),
    homepageSceneType: existing.homepageSceneType,
    homepageSceneGlow: existing.homepageSceneGlow,
    homepageSceneParticles: existing.homepageSceneParticles,
    homepageSceneParallax: existing.homepageSceneParallax,
  });
  if (!parsed.success) return;

  try {
    await prisma.globalSetting.update({
      where: { id: existing.id },
      data: {
        companyName: parsed.data.companyName,
        tagline: parsed.data.tagline,
        heroEyebrow: parsed.data.heroEyebrow,
        heroHeadline: parsed.data.heroHeadline,
        heroSubheadline: parsed.data.heroSubheadline,
        footerStatement: parsed.data.footerStatement,
        capabilityStatementUrl: parsed.data.capabilityStatementUrl,
      },
    });
  } catch (error) {
    console.error("[admin/dashboard] Unable to save dashboard overview content.", error);
    return;
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/settings");
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
  try {
    if (id) {
      await prisma.missionPartner.update({ where: { id }, data });
    } else {
      await prisma.missionPartner.create({ data });
    }
  } catch (error) {
    console.error("[admin/partners] Unable to save mission partner.", error);
    return;
  }
  revalidatePath("/");
  revalidatePath("/partnerships");
  revalidatePath("/admin/partners");
}

export async function upsertPartnershipContactAction(formData: FormData) {
  await requireAdmin();
  await ensurePartnershipContactCompatibility();
  const parsed = partnershipContactSchema.safeParse({
    id: String(formData.get("id") || "") || undefined,
    name: formData.get("name"),
    organization: formData.get("organization"),
    category: formData.get("category"),
    displayOrder: toInt(formData.get("displayOrder")),
    isPublished: toBool(formData.get("isPublished")),
  });
  if (!parsed.success) return;

  const { id, ...data } = parsed.data;
  try {
    if (id) {
      await prisma.partnershipContact.update({ where: { id }, data });
    } else {
      await prisma.partnershipContact.create({ data });
    }
  } catch (error) {
    console.error("[admin/partners] Unable to save partnership contact.", error);
    return;
  }
  revalidatePath("/partnerships");
  revalidatePath("/admin/partners");
}

export async function deletePartnershipContactAction(formData: FormData) {
  await requireAdmin();
  await ensurePartnershipContactCompatibility();
  const id = String(formData.get("id") || "");
  if (!id) return;
  try {
    await prisma.partnershipContact.delete({ where: { id } });
  } catch (error) {
    console.error("[admin/partners] Unable to delete partnership contact.", error);
    return;
  }
  revalidatePath("/partnerships");
  revalidatePath("/admin/partners");
}

export async function deletePartnerAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  try {
    await prisma.missionPartner.delete({ where: { id } });
  } catch (error) {
    console.error("[admin/partners] Unable to delete mission partner.", error);
    return;
  }
  revalidatePath("/");
  revalidatePath("/partnerships");
  revalidatePath("/admin/partners");
}

export async function setSubmissionStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "unread") as SubmissionStatus;
  if (!id) return;
  try {
    await prisma.contactSubmission.update({ where: { id }, data: { status } });
  } catch (error) {
    console.error("[admin/submissions] Unable to update submission status.", error);
    return;
  }
  revalidatePath("/admin/submissions");
}

export async function deleteSubmissionAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  try {
    await prisma.contactSubmission.delete({ where: { id } });
  } catch (error) {
    console.error("[admin/submissions] Unable to delete submission.", error);
    return;
  }
  revalidatePath("/admin/submissions");
}

export async function createSupportTicketAction(
  _: SupportTicketFormState,
  formData: FormData,
): Promise<SupportTicketFormState> {
  await requireAdmin();
  await ensurePartnershipContactCompatibility();

  const parsed = supportTicketSchema.safeParse({
    clientName: formData.get("clientName"),
    requesterName: formData.get("requesterName"),
    requesterEmail: formData.get("requesterEmail"),
    pageUrl: formData.get("pageUrl"),
    requestType: formData.get("requestType"),
    priority: formData.get("priority"),
    summary: formData.get("summary"),
    details: formData.get("details"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please complete the required ticket details.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  let attachments: Awaited<ReturnType<typeof uploadAdminFiles>> = [];
  try {
    attachments = await uploadAdminFiles(formData, "attachments", "admin/support-tickets", "support");
  } catch (error) {
    console.error("[admin/support] Unable to upload support attachments.", error);
    return {
      success: false,
      message: "One of the attachments could not be uploaded. Please try again with images or PDFs under 15MB.",
    };
  }

  let status = ghostMissionControlWebhookSecret ? "pending" : "needs_webhook_secret";

  const ticket = await prisma.supportTicket.create({
    data: {
      ...parsed.data,
      attachments,
      status,
    },
  });

  const handoff = await forwardSupportTicket(ticket);
  status = handoff.status;
  await prisma.supportTicket.update({ where: { id: ticket.id }, data: { status } });

  revalidatePath("/admin/support");

  return {
    success: status === "sent",
    ticketId: ticket.id,
    message: handoff.message,
  };
}

export async function retrySupportTicketHandoffAction(formData: FormData) {
  await requireAdmin();
  await ensurePartnershipContactCompatibility();

  const id = String(formData.get("id") || "");
  if (!id) return;

  const ticket = await prisma.supportTicket.findUnique({ where: { id } });
  if (!ticket || ticket.status === "sent") return;

  await prisma.supportTicket.update({ where: { id }, data: { status: "pending" } });
  const handoff = await forwardSupportTicket(ticket);
  await prisma.supportTicket.update({ where: { id }, data: { status: handoff.status } });

  revalidatePath("/admin/support");
}

export async function updateGlobalSettingsAction(formData: FormData) {
  await requireAdmin();
  const [
    aboutHeroImageUrl,
    caseStudiesHeroImageUrl,
    caseStudyDetailFallbackImageUrl,
    careersHeroImageUrl,
    contactHeroImageUrl,
    contractsHeroImageUrl,
    privacyHeroImageUrl,
    capabilityStatementUrl,
  ] = await Promise.all([
    uploadAdminFile(formData, "aboutHeroImageFile", "admin/page-images", "image"),
    uploadAdminFile(formData, "caseStudiesHeroImageFile", "admin/page-images", "image"),
    uploadAdminFile(formData, "caseStudyDetailFallbackImageFile", "admin/page-images", "image"),
    uploadAdminFile(formData, "careersHeroImageFile", "admin/page-images", "image"),
    uploadAdminFile(formData, "contactHeroImageFile", "admin/page-images", "image"),
    uploadAdminFile(formData, "contractsHeroImageFile", "admin/page-images", "image"),
    uploadAdminFile(formData, "privacyHeroImageFile", "admin/page-images", "image"),
    uploadAdminFile(formData, "capabilityStatementFile", "admin/capabilities", "pdf"),
  ]).catch((error) => {
    console.error("[admin/settings] Unable to upload one or more files.", error);
    return [null, null, null, null, null, null, null, null];
  });

  const parsed = globalSettingSchema.safeParse({
    companyName: formData.get("companyName"),
    tagline: formData.get("tagline"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    linkedInUrl: String(formData.get("linkedInUrl") || ""),
    footerStatement: formData.get("footerStatement"),
    heroEyebrow: formData.get("heroEyebrow"),
    heroHeadline: formData.get("heroHeadline"),
    heroTrustBadge: formData.get("heroTrustBadge"),
    heroSubheadline: formData.get("heroSubheadline"),
    aboutHeroImageUrl: aboutHeroImageUrl || String(formData.get("aboutHeroImageUrl") || ""),
    caseStudiesHeroImageUrl: caseStudiesHeroImageUrl || String(formData.get("caseStudiesHeroImageUrl") || ""),
    caseStudyDetailFallbackImageUrl: caseStudyDetailFallbackImageUrl || String(formData.get("caseStudyDetailFallbackImageUrl") || ""),
    careersHeroImageUrl: careersHeroImageUrl || String(formData.get("careersHeroImageUrl") || ""),
    contactHeroImageUrl: contactHeroImageUrl || String(formData.get("contactHeroImageUrl") || ""),
    contractsHeroImageUrl: contractsHeroImageUrl || String(formData.get("contractsHeroImageUrl") || ""),
    privacyHeroImageUrl: privacyHeroImageUrl || String(formData.get("privacyHeroImageUrl") || ""),
    capabilityStatementUrl: capabilityStatementUrl || String(formData.get("capabilityStatementUrl") || ""),
    homepageSceneType: String(formData.get("homepageSceneType") || "grid"),
    homepageSceneGlow: String(formData.get("homepageSceneGlow") || "blue"),
    homepageSceneParticles: toBool(formData.get("homepageSceneParticles")),
    homepageSceneParallax: toBool(formData.get("homepageSceneParallax")),
  });
  if (!parsed.success) return;

  const data = {
    ...parsed.data,
    phone: parsed.data.phone ?? "",
  };

  try {
    await ensureGlobalSettingCompatibility();
    const existing = await prisma.globalSetting.findFirst();
    if (existing) {
      await prisma.globalSetting.update({ where: { id: existing.id }, data });
    } else {
      await prisma.globalSetting.create({ data });
    }
  } catch (error) {
    console.error("[admin/settings] Unable to save global settings.", error);
    return;
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/case-studies");
  revalidatePath("/careers");
  revalidatePath("/contact");
  revalidatePath("/contracts");
  revalidatePath("/admin/settings");
}
