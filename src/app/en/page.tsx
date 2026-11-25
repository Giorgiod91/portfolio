import type { Metadata } from "next";

import { Site } from "~/components/site/site";

export const metadata: Metadata = {
  title: "Giorgio Dettmar · Software Engineer",
  description:
    "Software engineer from Hannover, Germany. Next.js, TypeScript and Python, AI integrations and MCP servers. Open to small projects and freelance work.",
  alternates: { canonical: "/en", languages: { de: "/", en: "/en" } },
};

export default function HomePageEn() {
  return <Site lang="en" />;
}
