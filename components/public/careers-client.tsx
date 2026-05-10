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
      <div className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-3">
        <select
          className="rounded-md border border-white/15 bg-black px-3 py-2 text-sm"
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
          className="rounded-md border border-white/15 bg-black px-3 py-2 text-sm"
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
          className="rounded-md border border-white/15 bg-black px-3 py-2 text-sm"
          placeholder="Search roles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredJobs.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center text-zinc-400">
          No jobs match your filters right now.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredJobs.map((job) => (
            <article key={job.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <h3 className="text-xl font-bold text-white">{job.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{job.location} • {job.employmentType} • {job.jobType}</p>
              <p className="mt-3 text-sm text-zinc-300">{job.description}</p>
              <a
                href={job.applyUrl || "#"}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-md border border-red-500/50 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/15"
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
