import type { Metadata } from "next";
import { Barlow_Condensed, Public_Sans } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/public/json-ld";
import { siteConfig } from "@/lib/config/site";

const headingFont = Barlow_Condensed({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyFont = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.meta.title,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.meta.description,
  applicationName: siteConfig.shortName,
  authors: [{ name: siteConfig.companyName, url: siteConfig.url }],
  creator: siteConfig.companyName,
  publisher: siteConfig.companyName,
  keywords: [
    "AI consulting",
    "federal IT modernization",
    "workflow automation",
    "cybersecurity readiness",
    "public sector technology",
    "government contracting",
    "Gray Matters Technology Services",
    "SageTech Solutions",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.companyName,
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    images: [
      {
        url: "/greylogo.png",
        width: 1200,
        height: 630,
        alt: siteConfig.shortName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    images: ["/greylogo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationId = `${siteConfig.url}/#organization`;
  const websiteId = `${siteConfig.url}/#website`;
  const serviceId = `${siteConfig.url}/#professional-service`;
  const aiServiceId = `${siteConfig.url}/#ai-modernization-service`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.companyName,
        alternateName: [
          siteConfig.shortName,
          "SageTech Solutions",
          "Graymatterstech",
        ],
        url: siteConfig.url,
        logo: `${siteConfig.url}/greylogo.png`,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "10011 Nicol Court E",
          addressLocality: "Bowie",
          addressRegion: "MD",
          postalCode: "20721",
          addressCountry: "US",
        },
        sameAs: [siteConfig.social.linkedin],
        description: siteConfig.meta.description,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.url,
        name: siteConfig.companyName,
        publisher: { "@id": organizationId },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: siteConfig.companyName,
        url: siteConfig.url,
        provider: { "@id": organizationId },
        areaServed: [
          {
            "@type": "Country",
            name: "United States",
          },
          {
            "@type": "AdministrativeArea",
            name: "Federal government and public-sector mission teams",
          },
        ],
        serviceType: [
          "AI consulting",
          "Federal IT modernization",
          "Workflow automation",
          "Cybersecurity readiness",
          "Cloud and data modernization",
          "Mission technology delivery",
        ],
      },
      {
        "@type": "Service",
        "@id": aiServiceId,
        name: "AI consulting and federal IT modernization services",
        serviceType: "AI consulting, workflow automation, cybersecurity readiness, and federal IT modernization",
        provider: { "@id": organizationId },
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        audience: [
          {
            "@type": "Audience",
            audienceType: "Federal agencies",
          },
          {
            "@type": "Audience",
            audienceType: "Public-sector partners",
          },
          {
            "@type": "Audience",
            audienceType: "Mission technology teams",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Core modernization capabilities",
          itemListElement: [
            "AI readiness and responsible adoption",
            "Workflow automation",
            "Application modernization",
            "Cybersecurity and ATO readiness",
            "Cloud and data modernization",
            "Program and acquisition support",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name,
            },
          })),
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#050505] text-white">
        <JsonLd data={structuredData} />
        {children}
      </body>
    </html>
  );
}
