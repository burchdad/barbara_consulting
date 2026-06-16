"use client";

import { useActionState } from "react";
import { createSupportTicketAction, type SupportTicketFormState } from "@/lib/actions";

const initialState: SupportTicketFormState = {
  success: false,
  message: "",
};

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="text-xs font-semibold text-red-300">{errors[0]}</p>;
}

export function SupportTicketForm({ clientName, defaultEmail }: { clientName: string; defaultEmail: string }) {
  const [state, formAction, pending] = useActionState(createSupportTicketAction, initialState);

  return (
    <form action={formAction} encType="multipart/form-data" className="grid gap-5">
      <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/5 p-4">
        <p className="text-sm font-semibold text-cyan-100">Website Helper intake</p>
        <p className="mt-2 text-sm leading-6 text-zinc-300">
          I will collect the request and send it to Ghost Mission Control. No changes are published automatically; work stays on a testing branch until approved and merged.
        </p>
      </div>

      {state.message ? (
        <div className={`rounded-lg border p-4 text-sm ${state.success ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100" : "border-red-400/30 bg-red-400/10 text-red-100"}`}>
          {state.message}
          {state.ticketId ? <span className="ml-2 text-zinc-300">Ticket: {state.ticketId}</span> : null}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-zinc-300">
          <span className="text-xs uppercase tracking-[0.08em] text-zinc-400">Client / Site</span>
          <input name="clientName" defaultValue={clientName} required className="rounded-md border border-white/15 bg-black/80 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-red-400/70 focus:ring-2 focus:ring-red-500/15" />
          <FieldError errors={state.errors?.clientName} />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-300">
          <span className="text-xs uppercase tracking-[0.08em] text-zinc-400">Page or Section</span>
          <input name="pageUrl" placeholder="/services or homepage hero" required className="rounded-md border border-white/15 bg-black/80 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-red-400/70 focus:ring-2 focus:ring-red-500/15" />
          <FieldError errors={state.errors?.pageUrl} />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-300">
          <span className="text-xs uppercase tracking-[0.08em] text-zinc-400">Requester Name</span>
          <input name="requesterName" required className="rounded-md border border-white/15 bg-black/80 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-red-400/70 focus:ring-2 focus:ring-red-500/15" />
          <FieldError errors={state.errors?.requesterName} />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-300">
          <span className="text-xs uppercase tracking-[0.08em] text-zinc-400">Requester Email</span>
          <input name="requesterEmail" type="email" defaultValue={defaultEmail} required className="rounded-md border border-white/15 bg-black/80 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-red-400/70 focus:ring-2 focus:ring-red-500/15" />
          <FieldError errors={state.errors?.requesterEmail} />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-300">
          <span className="text-xs uppercase tracking-[0.08em] text-zinc-400">Request Type</span>
          <select name="requestType" defaultValue="text_update" className="rounded-md border border-white/15 bg-black/80 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-red-400/70 focus:ring-2 focus:ring-red-500/15">
            <option value="text_update">Text update</option>
            <option value="image_or_file">Image or file change</option>
            <option value="layout_change">Layout change</option>
            <option value="bug">Bug or broken page</option>
            <option value="new_content">New content or page</option>
            <option value="other">Other</option>
          </select>
          <FieldError errors={state.errors?.requestType} />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-300">
          <span className="text-xs uppercase tracking-[0.08em] text-zinc-400">Priority</span>
          <select name="priority" defaultValue="normal" className="rounded-md border border-white/15 bg-black/80 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-red-400/70 focus:ring-2 focus:ring-red-500/15">
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          <FieldError errors={state.errors?.priority} />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium text-zinc-300">
        <span className="text-xs uppercase tracking-[0.08em] text-zinc-400">Short Summary</span>
        <input name="summary" placeholder="Replace services page hero image" required className="rounded-md border border-white/15 bg-black/80 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-red-400/70 focus:ring-2 focus:ring-red-500/15" />
        <FieldError errors={state.errors?.summary} />
      </label>

      <label className="grid gap-2 text-sm font-medium text-zinc-300">
        <span className="text-xs uppercase tracking-[0.08em] text-zinc-400">Details for the Web Helper</span>
        <textarea name="details" rows={7} placeholder="Describe what should change, where it appears, and any exact copy/assets to use." required className="rounded-md border border-white/15 bg-black/80 px-3 py-2.5 text-sm leading-6 text-zinc-100 outline-none focus:border-red-400/70 focus:ring-2 focus:ring-red-500/15" />
        <FieldError errors={state.errors?.details} />
      </label>

      <label className="grid gap-2 text-sm font-medium text-zinc-300">
        <span className="text-xs uppercase tracking-[0.08em] text-zinc-400">Screenshots or Files</span>
        <input type="file" name="attachments" multiple accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" className="rounded-md border border-dashed border-white/20 bg-black/60 px-3 py-2.5 text-sm text-zinc-300 file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:font-bold file:uppercase file:tracking-[0.08em] file:text-white hover:border-red-400/50" />
        <span className="text-xs text-zinc-500">Optional. Images and PDFs up to 15MB each are uploaded to Blob and included with the ticket.</span>
      </label>

      <label className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-300">
        <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-white/20 bg-black accent-red-600" />
        <span>I understand this creates a support request only. Website changes require review and approval before publishing.</span>
      </label>

      <button type="submit" disabled={pending} className="rounded-md bg-red-600 px-4 py-3 text-sm font-black uppercase tracking-[0.08em] text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? "Submitting Request..." : "Send to Website Helper"}
      </button>
    </form>
  );
}
