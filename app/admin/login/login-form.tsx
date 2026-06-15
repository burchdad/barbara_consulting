"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/lib/actions";

const initialState = { success: false, message: "" };

type AdminLoginFormProps = {
  isWebsiteUpdates: boolean;
};

export function AdminLoginForm({ isWebsiteUpdates }: AdminLoginFormProps) {
  const [state, action, pending] = useActionState(loginAction, initialState);
  const title = isWebsiteUpdates ? "Website Updates" : "Admin Login";
  const helpText = isWebsiteUpdates
    ? "Sign in to edit site text, headshots, and the capabilities statement."
    : "Authorized personnel only.";
  const buttonLabel = isWebsiteUpdates ? "Open Update Dashboard" : "Sign In";
  const pendingLabel = isWebsiteUpdates ? "Opening dashboard..." : "Signing in...";
  const dashboardLinkHref = isWebsiteUpdates ? "/admin/login" : "/admin/login?mode=updates";
  const dashboardLinkLabel = isWebsiteUpdates ? "Back to Admin Login" : "Website Update Dashboard";
  const buttonClassName = isWebsiteUpdates
    ? "w-full rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500 disabled:opacity-70"
    : "w-full rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-70";
  const linkClassName = isWebsiteUpdates
    ? "block text-center text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500 transition hover:text-zinc-200"
    : "block w-full rounded-md border border-cyan-200/35 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-200/10 hover:text-white";
  const cardClassName = isWebsiteUpdates
    ? "w-full max-w-md space-y-4 rounded-xl border border-cyan-200/20 bg-black/50 p-6"
    : "w-full max-w-md space-y-4 rounded-xl border border-white/10 bg-black/50 p-6";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-4">
      <form action={action} className={cardClassName}>
        {isWebsiteUpdates ? <input type="hidden" name="redirectTo" value="/admin/settings" /> : null}
        <h1 className="text-3xl font-black uppercase text-white">{title}</h1>
        <p className="text-sm text-zinc-400">{helpText}</p>
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm" />
        <button type="submit" disabled={pending} className={buttonClassName}>
          {pending ? pendingLabel : buttonLabel}
        </button>
        <Link href={dashboardLinkHref} className={linkClassName}>
          {dashboardLinkLabel}
        </Link>
        {state.message ? <p className="text-sm text-red-400">{state.message}</p> : null}
      </form>
    </main>
  );
}
