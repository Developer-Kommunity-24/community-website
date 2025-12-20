import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const baseMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "DK24",
    "tech community",
    "Mangalore",
    "college tech",
    "student community",
    "open source",
    "hackathons",
    "tech events",
    "collaborative learning",
    "project-based learning",
  ],
  authors: [{ name: "DK24 Community" }],
  creator: "DK24 Community",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "DK24 Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/logo.png"],
    creator: "@dk24community",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export function generatePageMetadata({
  title,
  description,
  image = "/logo.png",
  path = "",
}: {
  title: string;
  description: string;
  image?: string;
  path?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@dk24community",
    },
    alternates: {
      canonical: url,
    },
  };
}
