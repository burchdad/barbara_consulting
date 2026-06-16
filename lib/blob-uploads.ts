import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

type UploadKind = "image" | "pdf";

const uploadRules: Record<UploadKind, { maxSize: number; contentTypes: string[] }> = {
  image: {
    maxSize: 5 * 1024 * 1024,
    contentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  },
  pdf: {
    maxSize: 15 * 1024 * 1024,
    contentTypes: ["application/pdf"],
  },
};

function slugifyFilename(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function getExtension(file: File) {
  const fromName = file.name.split(".").pop();
  if (fromName && fromName !== file.name) return fromName.toLowerCase();
  if (file.type === "application/pdf") return "pdf";
  if (file.type === "image/png") return "png";
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/gif") return "gif";
  return "jpg";
}

export async function uploadAdminFile(formData: FormData, fieldName: string, folder: string, kind: UploadKind) {
  const file = formData.get(fieldName);
  if (!(file instanceof File) || file.size === 0) return null;

  const rules = uploadRules[kind];
  if (!rules.contentTypes.includes(file.type)) {
    throw new Error(`Unsupported ${kind} upload type: ${file.type || "unknown"}`);
  }

  if (file.size > rules.maxSize) {
    throw new Error(`${kind} upload is too large.`);
  }

  const baseName = slugifyFilename(file.name.replace(/\.[^.]+$/, "")) || "upload";
  const pathname = `${folder}/${Date.now()}-${randomUUID()}-${baseName}.${getExtension(file)}`;
  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return blob.url;
}
