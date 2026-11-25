import type { Metadata } from "next";

import { Site } from "~/components/site/site";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { de: "/", en: "/en" } },
};

export default function HomePage() {
  return <Site lang="de" />;
}
