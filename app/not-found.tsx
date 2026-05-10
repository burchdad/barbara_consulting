import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
        404
      </p>
      <h1 className="mt-4 text-5xl font-black uppercase">Page Not Found</h1>
      <p className="mt-4 max-w-md text-zinc-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md border border-red-500/60 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
      >
        Return Home
      </Link>
    </div>
  );
}
