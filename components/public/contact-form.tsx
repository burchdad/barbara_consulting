"use client";

import { useActionState } from "react";
import { createContactSubmissionAction, type ContactFormState } from "@/lib/actions";

const initialState: ContactFormState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, action, pending] = useActionState(createContactSubmissionAction, initialState);

  return (
    <form action={action} className="space-y-4 border border-cyan-200/14 bg-black/25 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="name"
          placeholder="Name"
          className="border border-white/15 bg-black/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/60"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border border-white/15 bg-black/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/60"
          required
        />
      </div>
      <input
        name="phone"
        placeholder="Phone"
        className="w-full border border-white/15 bg-black/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/60"
      />
      <textarea
        name="message"
        placeholder="How can we help?"
        className="min-h-40 w-full border border-white/15 bg-black/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/60"
        required
      />
      <button
        type="submit"
        disabled={pending}
        className="premium-button bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-200 disabled:opacity-70"
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
      {state.message ? (
        <p className={`text-sm ${state.success ? "text-emerald-400" : "text-red-400"}`}>{state.message}</p>
      ) : null}
    </form>
  );
}
