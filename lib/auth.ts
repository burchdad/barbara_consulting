import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "bf_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;
const PREVIEW_ADMIN_ID = "preview-admin";

function isPreviewDeployment() {
  return process.env.VERCEL_ENV === "preview";
}

function getPreviewCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || "admin@company.com",
    password: process.env.ADMIN_PASSWORD || "ChangeMe123!",
  };
}

function isPreviewAdminLogin(email: string, password: string) {
  const previewCredentials = getPreviewCredentials();
  return (
    isPreviewDeployment() &&
    email === previewCredentials.email &&
    password === previewCredentials.password
  );
}

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.NEXTAUTH_SECRET || "dev-secret-change-me";
  if (process.env.NODE_ENV === "production" && secret === "dev-secret-change-me") {
    if (process.env.VERCEL_ENV === "preview") {
      return "preview-only-admin-session-secret";
    }
    throw new Error("Missing ADMIN_SESSION_SECRET (or NEXTAUTH_SECRET fallback) in production.");
  }
  return secret;
}

function sign(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function encodeSession(userId: string) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = `${userId}.${exp}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

function decodeSession(token: string): { userId: string; exp: number } | null {
  const [userId, expRaw, signature] = token.split(".");
  if (!userId || !expRaw || !signature) return null;
  const payload = `${userId}.${expRaw}`;
  const expectedSig = sign(payload);
  if (expectedSig !== signature) return null;
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null;
  return { userId, exp };
}

export async function setAdminSession(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, encodeSession(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const parsed = decodeSession(token);
  if (!parsed) return null;

  if (parsed.userId === PREVIEW_ADMIN_ID && isPreviewDeployment()) {
    return {
      id: PREVIEW_ADMIN_ID,
      email: getPreviewCredentials().email,
      name: "Preview Admin",
    };
  }

  return prisma.user.findUnique({
    where: { id: parsed.userId },
    select: { id: true, email: true, name: true },
  });
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) {
    redirect("/admin/login");
  }
  return user;
}

export async function loginAdmin(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      if (isPreviewAdminLogin(email, password)) {
        await setAdminSession(PREVIEW_ADMIN_ID);
        return {
          id: PREVIEW_ADMIN_ID,
          email,
          name: "Preview Admin",
        };
      }
      return null;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return null;

    await setAdminSession(user.id);
    return user;
  } catch (error) {
    console.error("[auth] Admin login failed.", error);
    if (isPreviewAdminLogin(email, password)) {
      await setAdminSession(PREVIEW_ADMIN_ID);
      return {
        id: PREVIEW_ADMIN_ID,
        email,
        name: "Preview Admin",
      };
    }
    return null;
  }
}
