"use client";

import { useMemo, useState } from "react";

type Job = {
  id: string;
  title: string;
  location: string;
  jobType: string;
  employmentType: string;
  applyUrl: string | null;
  description: string;
};

type CareersClientProps = {
  jobs: Job[];
};

export function CareersClient({ jobs }: CareersClientProps) {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");

  const jobTypes = Array.from(new Set(jobs.map((job) => job.jobType)));
  const locations = Array.from(new Set(jobs.map((job) => job.location)));

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = `${job.title} ${job.description}`.toLowerCase().includes(search.toLowerCase());
      const matchesType = jobType === "all" || job.jobType === jobType;
      const matchesLocation = location === "all" || job.location === location;
      return matchesSearch && matchesType && matchesLocation;
    });
  }, [jobs, location, jobType, search]);

  return (
    <div className="space-y-8">
      <div className="about-lead-panel grid gap-3 p-4 sm:grid-cols-3">
        <select
          className="border border-white/15 bg-black/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-200/60"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="all">All Job Types</option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          className="border border-white/15 bg-black/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-200/60"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="all">All Locations</option>
          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          className="border border-white/15 bg-black/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-200/60"
          placeholder="Search roles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredJobs.length === 0 ? (
        <p className="about-leader-card p-8 text-center text-zinc-400">
          No jobs match your filters right now.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredJobs.map((job) => (
            <article key={job.id} className="about-leader-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                Open Role
              </p>
              <h3 className="mt-3 text-2xl font-black uppercase leading-tight text-white">
                {job.title}
              </h3>
              <p className="mt-3 text-sm uppercase tracking-[0.14em] text-zinc-400">
                {job.location} / {job.employmentType} / {job.jobType}
              </p>
              <p className="mt-5 text-sm leading-6 text-zinc-300">
                {job.description}
              </p>
              <a
                href={job.applyUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="premium-button mt-6 inline-flex bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-slate-950 transition hover:bg-cyan-200"
              >
                Apply Now
              </a>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
