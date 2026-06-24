import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/contracts",
  "/partnerships",
  "/case-studies",
  "/podcasts-webinars",
  "/careers",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/contact" || route === "/contracts" ? 0.8 : 0.7,
  }));
}
