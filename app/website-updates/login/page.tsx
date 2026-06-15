"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction } from "@/lib/actions";

const initialState = { success: false, message: "" };

export default function WebsiteUpdatesLoginPage() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-4">
      <form action={action} className="w-full max-w-md space-y-4 rounded-xl border border-cyan-200/20 bg-black/50 p-6">
        <input type="hidden" name="redirectTo" value="/admin/settings" />
        <h1 className="text-3xl font-black uppercase text-white">Website Updates</h1>
        <p className="text-sm text-zinc-400">Sign in to edit site text, headshots, and the capabilities statement.</p>
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm" />
        <button type="submit" disabled={pending} className="w-full rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500 disabled:opacity-70">
          {pending ? "Opening dashboard..." : "Open Update Dashboard"}
        </button>
        <Link href="/admin/login" className="block text-center text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500 transition hover:text-zinc-200">
          Back to Admin Login
        </Link>
        {state.message ? <p className="text-sm text-red-400">{state.message}</p> : null}
      </form>
    </main>
  );
}
