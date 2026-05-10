"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions";

const initialState = { success: false, message: "" };

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-4">
      <form action={action} className="w-full max-w-md space-y-4 rounded-xl border border-white/10 bg-black/50 p-6">
        <h1 className="text-3xl font-black uppercase text-white">Admin Login</h1>
        <p className="text-sm text-zinc-400">Authorized personnel only.</p>
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm" />
        <button type="submit" disabled={pending} className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-70">
          {pending ? "Signing in..." : "Sign In"}
        </button>
        {state.message ? <p className="text-sm text-red-400">{state.message}</p> : null}
      </form>
    </main>
  );
}
