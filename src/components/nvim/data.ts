export const SECTIONS = [
  { id: "start", file: "start.md", color: "text-blue" },
  { id: "praxis", file: "praxis.md", color: "text-cyan" },
  { id: "projekte", file: "projekte.ts", color: "text-blue" },
  { id: "stack", file: "stack.lua", color: "text-magenta" },
  { id: "kontakt", file: "kontakt.sh", color: "text-green" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const LINKS = {
  email: "giorgio.dettmar@gmx.de",
  github: "https://github.com/Giorgiod91",
  linkedin: "https://www.linkedin.com/in/giorgio-dettmar-4838b7250",
};

export type Project = {
  title: string;
  desc: string;
  tags: string[];
  live?: string;
  github?: string;
  screenshots?: string[];
  /** Terminal-style preview shown when there is no (current) screenshot */
  preview?: { cmd: string; lines: string[] };
  status: "live" | "verkauf" | "repo";
};

export const PROJECTS: Project[] = [
  {
    title: "AP1 Ready",
    desc: "AP1-Prüfungsvorbereitung für Fachinformatiker (IHK). Über 140 Aufgaben in 9 Themen, 90-Minuten-Prüfungssimulation mit Notenprognose und KI-Übungstests. 15 € einmalig über Stripe, kein Abo.",
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe", "Claude API"],
    live: "https://crack-the-test.vercel.app",
    github: "https://github.com/Giorgiod91/CrackTheTest",
    screenshots: ["/screenshots/ap1ready.png", "/screenshots/ap1ready-dashboard.png"],
    status: "verkauf",
  },
  {
    title: "ClaudeShip",
    desc: "Next.js-Boilerplate für KI-Apps, die verkauft wird. Nach dem Kauf gibt es automatisch Zugriff aufs GitHub-Repo.",
    tags: ["Next.js", "Supabase", "Stripe", "Claude API"],
    live: "https://claudeship.vercel.app",
    preview: {
      cmd: "git clone claudeship",
      lines: [
        "✓ Auth per Magic Link",
        "✓ Stripe Checkout + Webhooks",
        "✓ Claude API integriert",
        "✓ Repo-Zugang nach Kauf",
      ],
    },
    status: "verkauf",
  },
  {
    title: "GamerConnect",
    desc: "Gaming-Plattform mit Echtzeit-Chat, Mitspieler-Matching und Turnieren.",
    tags: ["Next.js", "Supabase Realtime", "TypeScript"],
    live: "https://gamer-connect-chi.vercel.app/",
    github: "https://github.com/Giorgiod91/GamerConnect",
    screenshots: ["/screenshots/GamersCONN.png"],
    status: "live",
  },
  {
    title: "Go2Spot",
    desc: "Findet versteckte Orte in jeder Stadt. Python-ML-Backend, Next.js-Frontend, Karten-API.",
    tags: ["Next.js", "Python", "ML"],
    live: "https://go2-spot.vercel.app/",
    github: "https://github.com/Giorgiod91/-Go2Spot",
    screenshots: ["/screenshots/go2spot2.png"],
    status: "live",
  },
  {
    title: "EduProgress",
    desc: "Lernfortschritt mit Dashboards und Streaks. Supabase mit Row Level Security.",
    tags: ["Next.js", "TypeScript", "Supabase"],
    live: "https://edu-progress.vercel.app/",
    github: "https://github.com/Giorgiod91/EduProgress",
    screenshots: ["/screenshots/eduprogr.png"],
    status: "live",
  },
  {
    title: "PraktikumsFinder",
    desc: "Bringt angehende Entwickler mit IHK-Ausbildungsbetrieben zusammen. Standortfilter, PostgreSQL.",
    tags: ["Next.js", "FastAPI", "PostgreSQL"],
    live: "https://praktikumsfinder.vercel.app/",
    github: "https://github.com/Giorgiod91/PraktikumFinder",
    screenshots: ["/screenshots/praktikumsfinder2.png"],
    status: "live",
  },
  {
    title: "Reactify",
    desc: "UI-Komponente in Worten beschreiben, fertigen TypeScript- und Tailwind-Code bekommen.",
    tags: ["Next.js", "Flask", "OpenAI"],
    live: "https://ai-react-component-designer-fronten.vercel.app/",
    github: "https://github.com/Giorgiod91/AI-React-Component-Designer-Frontend",
    screenshots: ["/screenshots/reactify2.png"],
    status: "live",
  },
  {
    title: "PicturaSearch",
    desc: "Foto hochladen, ein CNN erkennt das Produkt und sucht passende Angebote auf eBay.",
    tags: ["Next.js", "Python", "TensorFlow"],
    live: "https://picturasearch.vercel.app",
    github: "https://github.com/Giorgiod91/picturaSearch",
    screenshots: ["/screenshots/picturasearch.png"],
    status: "live",
  },
  {
    title: "FlowDesk",
    desc: "App zum Verwalten von Teams, Projekten und Aufgaben. Hier geht es vor allem um Backend- und Datenbank-Design.",
    tags: ["Python", "Backend", "Datenbank-Design"],
    github: "https://github.com/Giorgiod91/FlowDesk",
    preview: {
      cmd: "flowdesk --features",
      lines: ["✓ Teams verwalten", "✓ Projekte & Aufgaben", "✓ Datenbank-Design im Fokus"],
    },
    status: "repo",
  },
  {
    title: "AntiCheat AI",
    desc: "Anti-Cheat in Echtzeit: Ein Python-ML-Modell erkennt verdächtiges Spielverhalten, das TypeScript-Frontend zeigt die Treffer live an.",
    tags: ["TypeScript", "Python", "ML"],
    github: "https://github.com/Giorgiod91/AntiCheatAIFrontend",
    preview: {
      cmd: "anticheat --watch",
      lines: ["✓ ML-Modell für Spielverhalten", "✓ Verdacht in Echtzeit markiert", "✓ Live-Ansicht im Frontend"],
    },
    status: "repo",
  },
];

export const STACK: { name: string; group: string }[] = [
  { name: "next.js", group: "full-stack" },
  { name: "react", group: "frontend" },
  { name: "typescript", group: "frontend" },
  { name: "tailwindcss", group: "frontend" },
  { name: "framer-motion", group: "frontend" },
  { name: "shadcn/ui", group: "frontend" },
  { name: "node.js", group: "backend" },
  { name: "postgresql", group: "daten" },
  { name: "supabase", group: "daten" },
  { name: "azure-devops", group: "devops" },
  { name: "docker", group: "devops" },
  { name: "git", group: "devops" },
  { name: "vercel", group: "devops" },
  { name: "claude-code", group: "ki" },
  { name: "mcp", group: "ki" },
  { name: "claude-api", group: "ki" },
  { name: "openai-api", group: "ki" },
  { name: "python", group: "projekte" },
  { name: "fastapi", group: "projekte" },
];

export const HISTORY: { when: string; what: string; note: string; running?: boolean }[] = [
  { when: "07.09.2026 – 19.03.2027", what: "Praktikum bei Digital Cuisine", note: "Kunden-Projekte im Team · Hannover", running: true },
  { when: "2025 – 2027", what: "Fachinformatiker Anwendungsentwicklung (IHK)", note: "Abschluss 2027", running: true },
  { when: "2025 – 2028", what: "B.Sc. Informatik", note: "berufsbegleitend, online", running: true },
  { when: "seit 2022", what: "Selbst gelernt", note: "20+ Projekte gebaut und live gestellt" },
];
