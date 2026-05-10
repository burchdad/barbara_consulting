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
    <form action={action} className="space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" placeholder="Name" className="rounded-md border border-white/15 bg-black px-3 py-2 text-sm" required />
        <input name="email" type="email" placeholder="Email" className="rounded-md border border-white/15 bg-black px-3 py-2 text-sm" required />
      </div>
      <input name="phone" placeholder="Phone" className="w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm" />
      <textarea
        name="message"
        placeholder="How can we help?"
        className="min-h-36 w-full rounded-md border border-white/15 bg-black px-3 py-2 text-sm"
        required
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-70"
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
      {state.message ? (
        <p className={`text-sm ${state.success ? "text-emerald-400" : "text-red-400"}`}>{state.message}</p>
      ) : null}
    </form>
  );
}
