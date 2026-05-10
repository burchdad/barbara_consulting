"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-full bg-[#050505] text-white">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
            Error
          </p>
          <h1 className="mt-4 text-5xl font-black uppercase">
            Something went wrong
          </h1>
          <p className="mt-4 max-w-md text-zinc-400">
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            className="mt-8 rounded-md border border-red-500/60 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
