export const LINKS = {
  email: "giorgio.dettmar@gmx.de",
  github: "https://github.com/Giorgiod91",
  linkedin: "https://www.linkedin.com/in/giorgio-dettmar-4838b7250",
};

export const NAV = [
  { id: "erfahrung", label: "erfahrung" },
  { id: "atlas", label: "atlas" },
  { id: "projekte", label: "projekte" },
  { id: "stack", label: "stack" },
  { id: "kontakt", label: "kontakt" },
] as const;

export type SectionId = (typeof NAV)[number]["id"];

// ── Praktikum bei Digital Cuisine ─────────────────────────────────────────

export type Work = {
  title: string;
  tags: string[];
  text: string;
  points: string[];
  featured?: boolean;
};

export const WORK: Work[] = [
  {
    title: "Kunden-Plattform: Migration & PDF-Import",
    tags: ["Frontend", "Backend", "Next.js", "Python"],
    text: "Ein Kundenprojekt, Frontend und Backend: eine alte Anwendung neu aufgebaut mit Next.js, TypeScript, Prisma und PostgreSQL. Dazu ein Python-Service, der Daten aus PDF-Bestellungen liest, Faxe per OCR.",
    points: [
      "Altdaten importiert",
      "große Teile der Fachbereiche umgesetzt",
      "UI an die alte App angeglichen",
      "PDF-Text auslesen, OCR nur für Faxe",
    ],
    featured: true,
  },
  {
    title: "Interne Bestell-App",
    tags: ["Next.js", "SQLite"],
    text: "Interne App, in der Mitarbeitende Sachen kaufen können.",
    points: ["Artikel ansehen und kaufen", "Next.js + SQLite"],
  },
  {
    title: "Moodle im Kunden-Design",
    tags: ["Moodle", "Docker"],
    text: "Theme und Startseite für Mitarbeitende im Corporate Design eines Kunden, lokal lauffähig mit Docker.",
    points: ["eigenes Theme", "Startseite für Mitarbeitende"],
  },
  {
    title: "Team-Workflow",
    tags: ["Azure DevOps", "Docker"],
    text: "Features und Fixes in einer großen Next.js-Codebase, alles über Pull Requests mit Code Review, Tickets und ADRs.",
    points: ["Pull Requests + Review", "Pipelines", "ADRs"],
  },
];

export const EDUCATION: { when: string; what: string; note: string }[] = [
  { when: "2025 – 2027", what: "Fachinformatiker Anwendungsentwicklung (IHK)", note: "läuft" },
  { when: "2025 – 2028", what: "B.Sc. Computer Science", note: "University of the People · läuft" },
  { when: "seit 2022", what: "Selbst gelernt", note: "15+ eigene Projekte live" },
];

// ── Session Atlas ─────────────────────────────────────────────────────────

export const ATLAS = {
  github: "https://github.com/Giorgiod91/session-atlas",
  desc: "Desktop-App, die meine lokalen Claude-Code-Sessions in einen Workspace im Neovim-Stil verwandelt: Projekte, Sessions und jeden Prompt durchgehen, sehen welche Agenten woran arbeiten, und jede Session direkt in der App weiterführen.",
  features: [
    "Neovim-UI mit echten Vim-Bewegungen und Telescope-Suche",
    "Agenten-Graph: wer arbeitet, wer wartet, wer hat einen Fehler",
    "Loops: Claude arbeitet, bis Tests und Typecheck grün sind",
    "Eingebautes Terminal, setzt Sessions direkt fort",
    "Kleiner Begleiter zeigt Limits und meldet grüne Loops",
    "Komplett lokal, nichts verlässt den Rechner",
  ],
  tags: ["Electron", "JavaScript", "Node.js", "xterm.js", "CodeMirror 6"],
  shots: [
    { src: "/screenshots/session-atlas-dashboard.png", label: "Dashboard" },
    { src: "/screenshots/session-atlas-editor.png", label: "Editor" },
    { src: "/screenshots/session-atlas-graph.png", label: "Agenten-Graph" },
    { src: "/screenshots/session-atlas-loops.png", label: "Loops" },
    { src: "/screenshots/session-atlas-limits.png", label: "Begleiter" },
    { src: "/screenshots/session-atlas-terminal.png", label: "Terminal" },
  ],
};

// ── Eigene Projekte ───────────────────────────────────────────────────────

export type Project = {
  title: string;
  desc: string;
  tags: string[];
  live?: string;
  github?: string;
  img?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "AP1 Ready",
    desc: "Vorbereitung auf die AP1-Prüfung für Fachinformatiker: Aufgaben nach Themen, Prüfungssimulation mit Notenprognose, KI-Übungstests.",
    tags: ["Next.js", "Supabase", "Stripe", "Claude API"],
    live: "https://crack-the-test.vercel.app",
    github: "https://github.com/Giorgiod91/CrackTheTest",
    img: "/screenshots/ap1ready.png",
  },
  {
    title: "PraktikumsFinder",
    desc: "Bringt angehende Entwickler mit IHK-Ausbildungsbetrieben zusammen.",
    tags: ["Next.js", "FastAPI", "PostgreSQL"],
    live: "https://praktikumsfinder.vercel.app/",
    github: "https://github.com/Giorgiod91/PraktikumFinder",
    img: "/screenshots/praktikumsfinder2.png",
  },
  {
    title: "GamerConnect",
    desc: "Gaming-Plattform mit Echtzeit-Chat, Mitspieler-Matching und Turnieren.",
    tags: ["Next.js", "Supabase Realtime"],
    live: "https://gamer-connect-chi.vercel.app/",
    github: "https://github.com/Giorgiod91/GamerConnect",
    img: "/screenshots/GamersCONN.png",
  },
  {
    title: "EduProgress",
    desc: "Lernfortschritt mit Dashboards und Streaks, Supabase mit Row Level Security.",
    tags: ["Next.js", "Supabase"],
    live: "https://edu-progress.vercel.app/",
    github: "https://github.com/Giorgiod91/EduProgress",
    img: "/screenshots/eduprogr.png",
  },
  {
    title: "Go2Spot",
    desc: "Findet versteckte Orte in jeder Stadt. Python-ML-Backend, Next.js-Frontend.",
    tags: ["Next.js", "Python", "ML"],
    live: "https://go2-spot.vercel.app/",
    github: "https://github.com/Giorgiod91/-Go2Spot",
    img: "/screenshots/go2spot2.png",
  },
  {
    title: "PicturaSearch",
    desc: "Foto hochladen, ein CNN erkennt das Produkt und sucht Angebote auf eBay.",
    tags: ["Next.js", "Python", "TensorFlow"],
    live: "https://picturasearch.vercel.app",
    github: "https://github.com/Giorgiod91/picturaSearch",
    img: "/screenshots/picturasearch.png",
  },
  {
    title: "ClaudeShip",
    desc: "Next.js-Boilerplate für KI-Apps. Nach dem Kauf automatisch Zugriff aufs GitHub-Repo.",
    tags: ["Next.js", "Supabase", "Stripe"],
    live: "https://claudeship.vercel.app",
  },
];

export const STACK: [string, string[]][] = [
  ["frontend", ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"]],
  ["backend", ["Node.js", "Python", "FastAPI", "PostgreSQL", "SQLite", "Prisma", "Supabase"]],
  ["desktop", ["Electron", "xterm.js", "CodeMirror"]],
  ["tools", ["Azure DevOps", "Docker", "Git", "Vercel", "Claude Code"]],
];
