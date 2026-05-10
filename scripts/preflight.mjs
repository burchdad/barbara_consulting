#!/usr/bin/env node

const requiredVars = [
  "DATABASE_URL",
  "ADMIN_SESSION_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
];

const missing = requiredVars.filter((key) => !process.env[key]);

console.log("Deployment preflight\n");

if (missing.length) {
  console.error("Missing required environment variables:");
  for (const key of missing) {
    console.error(`- ${key}`);
  }
  process.exitCode = 1;
} else {
  console.log("All required environment variables are present.");
}

if (process.env.ADMIN_SESSION_SECRET === "dev-secret-change-me") {
  console.error("ADMIN_SESSION_SECRET must not use a development default in production.");
  process.exitCode = 1;
}

const targetDomain = process.env.RAILWAY_PUBLIC_DOMAIN || process.env.RAILWAY_STATIC_URL;
if (targetDomain) {
  const healthUrl = targetDomain.startsWith("http")
    ? `${targetDomain.replace(/\/$/, "")}/api/health`
    : `https://${targetDomain.replace(/\/$/, "")}/api/health`;
  console.log(`Expected health URL: ${healthUrl}`);
} else {
  console.log("No Railway public domain env var found (optional). Set RAILWAY_PUBLIC_DOMAIN for health URL output.");
}

if (process.exitCode && process.exitCode !== 0) {
  console.error("\nPreflight failed.");
} else {
  console.log("\nPreflight passed.");
}
