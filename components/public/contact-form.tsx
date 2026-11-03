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
    <form action={action} aria-busy={pending} className="space-y-4 border border-cyan-200/14 bg-black/25 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="contact-name" className="text-sm text-slate-200">Name (required)</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            aria-invalid={Boolean(state.errors?.name?.length)}
            aria-describedby={state.errors?.name?.length ? "contact-name-error" : undefined}
            placeholder="Name"
            className="border border-white/15 bg-black/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/60"
            required
          />
          {state.errors?.name?.length ? (
            <p id="contact-name-error" className="text-sm text-red-300">{state.errors.name.join(" ")}</p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <label htmlFor="contact-email" className="text-sm text-slate-200">Email (required)</label>
          <input
            id="contact-email"
            name="email"
            autoComplete="email"
            aria-invalid={Boolean(state.errors?.email?.length)}
            aria-describedby={state.errors?.email?.length ? "contact-email-error" : undefined}
            type="email"
            placeholder="Email"
            className="border border-white/15 bg-black/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/60"
            required
          />
          {state.errors?.email?.length ? (
            <p id="contact-email-error" className="text-sm text-red-300">{state.errors.email.join(" ")}</p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="contact-phone" className="text-sm text-slate-200">Phone (optional)</label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={30}
          aria-invalid={Boolean(state.errors?.phone?.length)}
          aria-describedby={state.errors?.phone?.length ? "contact-phone-error" : undefined}
          placeholder="Phone"
          className="w-full border border-white/15 bg-black/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/60"
        />
        {state.errors?.phone?.length ? (
          <p id="contact-phone-error" className="text-sm text-red-300">{state.errors.phone.join(" ")}</p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <label htmlFor="contact-message" className="text-sm text-slate-200">How can we help? (required)</label>
        <textarea
          id="contact-message"
          name="message"
          minLength={10}
          maxLength={4000}
          aria-invalid={Boolean(state.errors?.message?.length)}
          aria-describedby={state.errors?.message?.length ? "contact-message-error" : undefined}
          placeholder="How can we help?"
          className="min-h-40 w-full border border-white/15 bg-black/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/60"
          required
        />
        {state.errors?.message?.length ? (
          <p id="contact-message-error" className="text-sm text-red-300">{state.errors.message.join(" ")}</p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="premium-button bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-200 disabled:opacity-70"
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
      {state.message ? (
        <p role="status" aria-live="polite" aria-atomic="true" className={`text-sm ${state.success ? "text-emerald-400" : "text-red-400"}`}>{state.message}</p>
      ) : null}
    </form>
  );
}
