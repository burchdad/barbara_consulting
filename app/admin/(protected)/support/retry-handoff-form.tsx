"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { retrySupportTicketHandoffAction, type RetrySupportTicketState } from "@/lib/actions";

const initialState: RetrySupportTicketState = {
  success: false,
  message: "",
};

function RetryButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md border border-white/15 px-3 py-2 text-xs font-black uppercase tracking-[0.08em] text-zinc-200 transition hover:border-cyan-300/60 hover:bg-cyan-300/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Retrying..." : "Retry Handoff"}
    </button>
  );
}

export function RetryHandoffForm({ ticketId }: { ticketId: string }) {
  const [state, action] = useActionState(retrySupportTicketHandoffAction, initialState);

  return (
    <form action={action} className="mt-4 space-y-2">
      <input type="hidden" name="id" value={ticketId} />
      <RetryButton />
      {state.message ? (
        <p className={`text-xs font-semibold ${state.success ? "text-emerald-200" : "text-red-200"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
