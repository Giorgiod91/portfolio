import { Hero } from "~/components/nvim/hero";
import { Kontakt, Praxis, Projekte, Stack } from "~/components/nvim/sections";
import { Shell } from "~/components/nvim/shell";

export default function HomePage() {
  return (
    <Shell>
      <main className="relative min-h-screen overflow-x-clip pb-8">
        <Hero />
        <Praxis />
        <Projekte />
        <Stack />
        <Kontakt />
      </main>
    </Shell>
  );
}
