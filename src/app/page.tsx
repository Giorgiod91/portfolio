import { Claude } from "~/components/site/claude";
import { Hero } from "~/components/site/hero";
import { Atlas, Erfahrung, Kontakt, Projekte, Stack } from "~/components/site/sections";
import { Shell } from "~/components/site/shell";

export default function HomePage() {
  return (
    <Shell>
      <main className="relative overflow-x-clip">
        <Hero />
        <Erfahrung />
        <Atlas />
        <Projekte />
        <Stack />
        <Kontakt />
      </main>
      <Claude />
    </Shell>
  );
}
