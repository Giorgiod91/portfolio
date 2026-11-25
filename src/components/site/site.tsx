import { Claude } from "./claude";
import type { Lang } from "./data";
import { Hero } from "./hero";
import { LangProvider } from "./i18n";
import { Atlas, Erfahrung, Kontakt, Projekte, Stack } from "./sections";
import { Shell } from "./shell";

export function Site({ lang }: { lang: Lang }) {
  return (
    <LangProvider lang={lang}>
      <Shell>
        <main lang={lang} className="relative overflow-x-clip">
          <Hero />
          <Erfahrung />
          <Atlas />
          <Projekte />
          <Stack />
          <Kontakt />
        </main>
        <Claude />
      </Shell>
    </LangProvider>
  );
}
