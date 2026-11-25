export type Lang = "de" | "en";

export const LINKS = {
  email: "giorgio.dettmar@gmx.de",
  github: "https://github.com/Giorgiod91",
  linkedin: "https://www.linkedin.com/in/giorgio-dettmar-4838b7250",
};

export const SECTION_IDS = ["erfahrung", "atlas", "projekte", "stack", "kontakt"] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export type Work = {
  title: string;
  tags: string[];
  text: string;
  points: string[];
  featured?: boolean;
};

export type Project = {
  title: string;
  desc: string;
  tags: string[];
  live?: string;
  github?: string;
  img?: string;
};

type Content = {
  nav: Record<SectionId, string>;
  work: Work[];
  education: { when: string; what: string; note: string }[];
  atlas: {
    github: string;
    desc: string;
    features: string[];
    tags: string[];
    shots: { src: string; label: string }[];
  };
  projects: Project[];
  stack: [string, string[]][];
};

const ATLAS_GITHUB = "https://github.com/Giorgiod91/session-atlas";
const ATLAS_TAGS = ["Electron", "JavaScript", "Node.js", "xterm.js", "CodeMirror 6"];
const SHOT = (name: string) => `/screenshots/session-atlas-${name}.png`;

const PROJECT_LINKS = {
  ap1: {
    live: "https://crack-the-test.vercel.app",
    github: "https://github.com/Giorgiod91/CrackTheTest",
    img: "/screenshots/ap1ready.png",
  },
  praktikum: {
    live: "https://praktikumsfinder.vercel.app/",
    github: "https://github.com/Giorgiod91/PraktikumFinder",
    img: "/screenshots/praktikumsfinder2.png",
  },
  gamer: {
    live: "https://gamer-connect-chi.vercel.app/",
    github: "https://github.com/Giorgiod91/GamerConnect",
    img: "/screenshots/GamersCONN.png",
  },
  edu: {
    live: "https://edu-progress.vercel.app/",
    github: "https://github.com/Giorgiod91/EduProgress",
    img: "/screenshots/eduprogr.png",
  },
  go2spot: {
    live: "https://go2-spot.vercel.app/",
    github: "https://github.com/Giorgiod91/-Go2Spot",
    img: "/screenshots/go2spot2.png",
  },
  pictura: {
    live: "https://picturasearch.vercel.app",
    github: "https://github.com/Giorgiod91/picturaSearch",
    img: "/screenshots/picturasearch.png",
  },
  claudeship: { live: "https://claudeship.vercel.app" },
};

const STACK: [string, string[]][] = [
  ["frontend", ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"]],
  ["backend", ["Node.js", "Python", "FastAPI", "PostgreSQL", "SQLite", "Prisma", "Supabase"]],
  ["ai", ["Claude Code", "MCP", "Claude API", "OpenAI API", "OpenRouter", "OCR"]],
  ["tools", ["Azure DevOps", "Docker", "Git", "Vercel", "Electron"]],
];

export const CONTENT: Record<Lang, Content> = {
  de: {
    nav: { erfahrung: "erfahrung", atlas: "atlas", projekte: "projekte", stack: "stack", kontakt: "kontakt" },
    work: [
      {
        title: "Kunden-Plattform: Migration & PDF-Import",
        tags: ["Frontend", "Backend", "Next.js", "Python"],
        text: "Ein Kundenprojekt, Frontend und Backend: eine alte Anwendung neu aufgebaut mit Next.js, TypeScript, Prisma und PostgreSQL. Dazu ein Python-Service, der Daten aus PDF-Dokumenten liest und OCR nur dort nutzt, wo es nötig ist.",
        points: [
          "Altdaten importiert",
          "große Teile der Fachbereiche umgesetzt",
          "UI an die alte App angeglichen",
          "PDF-Text auslesen, OCR nur wo nötig",
        ],
        featured: true,
      },
      {
        title: "KI-Pipeline für Website-Analysen",
        tags: ["KI", "LLM", "Worker"],
        text: "Analysiert Websites automatisch in mehreren aufeinander aufbauenden LLM-Schritten, ausgeführt in einem Background-Worker.",
        points: ["mehrere LLM-Schritte", "typsichere KI-Ausgaben", "Background-Worker"],
      },
      {
        title: "Interne Bestell-App mit MCP-Server",
        tags: ["Next.js", "SQLite", "MCP"],
        text: "Interne App, in der Mitarbeitende Sachen kaufen können. Mit eigenem MCP-Server, über den KI-Agenten wie Claude direkt mit der App arbeiten.",
        points: ["Artikel ansehen und kaufen", "Artikel anlegen, suchen, Bestand abfragen per KI"],
      },
      {
        title: "Moodle im Kunden-Design",
        tags: ["Moodle", "PHP", "Docker"],
        text: "Theme und Startseite für Mitarbeitende im Corporate Design eines Kunden, mit eigenen PHP-Plugins, lokal lauffähig mit Docker.",
        points: ["eigenes Theme", "Startseite für Mitarbeitende"],
      },
      {
        title: "Team-Workflow",
        tags: ["Azure DevOps", "Docker"],
        text: "Features und Fixes in einer großen Next.js-Codebase, alles über Pull Requests mit Code Review, Tickets und ADRs.",
        points: ["Pull Requests + Review", "Pipelines", "ADRs"],
      },
    ],
    education: [
      { when: "2025 – 2027", what: "Fachinformatiker Anwendungsentwicklung (IHK)", note: "läuft" },
      { when: "2025 – 2028", what: "B.Sc. Computer Science", note: "University of the People · online, neben dem Beruf" },
      { when: "seit 2022", what: "Selbst gelernt", note: "15+ eigene Projekte live" },
    ],
    atlas: {
      github: ATLAS_GITHUB,
      desc: "Desktop-App, die meine lokalen Claude-Code-Sessions in einen Workspace im Neovim-Stil verwandelt: Projekte, Sessions und jeden Prompt durchgehen, sehen welche Agenten woran arbeiten, und jede Session direkt in der App weiterführen.",
      features: [
        "Neovim-UI mit echten Vim-Bewegungen und Telescope-Suche",
        "Agenten-Graph: wer arbeitet, wer wartet, wer hat einen Fehler",
        "Loops: Claude arbeitet, bis Tests und Typecheck grün sind",
        "Eingebautes Terminal, setzt Sessions direkt fort",
        "Kleiner Begleiter zeigt Limits und meldet grüne Loops",
        "Komplett lokal, nichts verlässt den Rechner",
      ],
      tags: ATLAS_TAGS,
      shots: [
        { src: SHOT("dashboard"), label: "Dashboard" },
        { src: SHOT("editor"), label: "Editor" },
        { src: SHOT("graph"), label: "Agenten-Graph" },
        { src: SHOT("session-leiste"), label: "Session-Leiste" },
        { src: SHOT("loops"), label: "Loops" },
        { src: SHOT("limits"), label: "Begleiter" },
        { src: SHOT("terminal"), label: "Terminal" },
      ],
    },
    projects: [
      {
        title: "AP1 Ready",
        desc: "Vorbereitung auf die AP1-Prüfung für Fachinformatiker: Aufgaben nach Themen, Prüfungssimulation mit Notenprognose, KI-Übungstests.",
        tags: ["Next.js", "Supabase", "Stripe", "Claude API"],
        ...PROJECT_LINKS.ap1,
      },
      {
        title: "PraktikumsFinder",
        desc: "Bringt angehende Entwickler mit IHK-Ausbildungsbetrieben zusammen.",
        tags: ["Next.js", "FastAPI", "PostgreSQL"],
        ...PROJECT_LINKS.praktikum,
      },
      {
        title: "GamerConnect",
        desc: "Gaming-Plattform mit Echtzeit-Chat, Mitspieler-Matching und Turnieren.",
        tags: ["Next.js", "Supabase Realtime"],
        ...PROJECT_LINKS.gamer,
      },
      {
        title: "EduProgress",
        desc: "Lernfortschritt mit Dashboards und Streaks, Supabase mit Row Level Security.",
        tags: ["Next.js", "Supabase"],
        ...PROJECT_LINKS.edu,
      },
      {
        title: "Go2Spot",
        desc: "Findet versteckte Orte in jeder Stadt. Python-ML-Backend, Next.js-Frontend.",
        tags: ["Next.js", "Python", "ML"],
        ...PROJECT_LINKS.go2spot,
      },
      {
        title: "PicturaSearch",
        desc: "Foto hochladen, ein CNN erkennt das Produkt und sucht Angebote auf eBay.",
        tags: ["Next.js", "Python", "TensorFlow"],
        ...PROJECT_LINKS.pictura,
      },
      {
        title: "ClaudeShip",
        desc: "Next.js-Boilerplate für KI-Apps. Nach dem Kauf automatisch Zugriff aufs GitHub-Repo.",
        tags: ["Next.js", "Supabase", "Stripe"],
        ...PROJECT_LINKS.claudeship,
      },
    ],
    stack: STACK,
  },

  en: {
    nav: { erfahrung: "experience", atlas: "atlas", projekte: "projects", stack: "stack", kontakt: "contact" },
    work: [
      {
        title: "Client platform: migration & PDF import",
        tags: ["Frontend", "Backend", "Next.js", "Python"],
        text: "A client project, frontend and backend: rebuilt a legacy application with Next.js, TypeScript, Prisma and PostgreSQL. Plus a Python service that extracts data from PDF documents and uses OCR only where needed.",
        points: [
          "migrated the legacy data",
          "built large parts of the business logic",
          "matched the UI to the old app",
          "PDF text extraction, OCR only where needed",
        ],
        featured: true,
      },
      {
        title: "AI pipeline for website analysis",
        tags: ["AI", "LLM", "Worker"],
        text: "Analyzes websites automatically with several chained LLM steps, running in a background worker.",
        points: ["several chained LLM steps", "type-safe AI outputs", "background worker"],
      },
      {
        title: "Internal ordering app with MCP server",
        tags: ["Next.js", "SQLite", "MCP"],
        text: "Internal app where employees can buy items. With its own MCP server, so AI agents like Claude can work with the app directly.",
        points: ["browse and buy items", "AI can create, search items and check stock"],
      },
      {
        title: "Moodle in client branding",
        tags: ["Moodle", "PHP", "Docker"],
        text: "Theme and employee start page in a client's corporate design, with custom PHP plugins, running locally with Docker.",
        points: ["custom theme", "employee start page"],
      },
      {
        title: "Team workflow",
        tags: ["Azure DevOps", "Docker"],
        text: "Features and fixes in a large Next.js codebase, all through pull requests with code review, tickets and ADRs.",
        points: ["pull requests + review", "pipelines", "ADRs"],
      },
    ],
    education: [
      { when: "2025 – 2027", what: "IT Specialist for Application Development (IHK)", note: "ongoing" },
      { when: "2025 – 2028", what: "B.Sc. Computer Science", note: "University of the People · online, alongside work" },
      { when: "since 2022", what: "Self-taught", note: "15+ projects of my own, all live" },
    ],
    atlas: {
      github: ATLAS_GITHUB,
      desc: "Desktop app that turns my local Claude Code sessions into a Neovim-style workspace: browse projects, sessions and every prompt, see which agents are working on what, and resume any session right inside the app.",
      features: [
        "Neovim UI with real Vim motions and Telescope search",
        "Agent graph: who is working, who is waiting, who hit an error",
        "Loops: Claude keeps working until tests and typecheck pass",
        "Built-in terminal that resumes sessions directly",
        "Little companion shows limits and reports green loops",
        "Fully local, nothing leaves your machine",
      ],
      tags: ATLAS_TAGS,
      shots: [
        { src: SHOT("dashboard"), label: "Dashboard" },
        { src: SHOT("editor"), label: "Editor" },
        { src: SHOT("graph"), label: "Agent graph" },
        { src: SHOT("session-leiste"), label: "Session bar" },
        { src: SHOT("loops"), label: "Loops" },
        { src: SHOT("limits"), label: "Companion" },
        { src: SHOT("terminal"), label: "Terminal" },
      ],
    },
    projects: [
      {
        title: "AP1 Ready",
        desc: "Exam prep for German IT specialists: practice tasks by topic, exam simulation with grade forecast, AI-generated practice tests.",
        tags: ["Next.js", "Supabase", "Stripe", "Claude API"],
        ...PROJECT_LINKS.ap1,
      },
      {
        title: "PraktikumsFinder",
        desc: "Connects aspiring developers with certified training companies.",
        tags: ["Next.js", "FastAPI", "PostgreSQL"],
        ...PROJECT_LINKS.praktikum,
      },
      {
        title: "GamerConnect",
        desc: "Gaming platform with real-time chat, teammate matching and tournaments.",
        tags: ["Next.js", "Supabase Realtime"],
        ...PROJECT_LINKS.gamer,
      },
      {
        title: "EduProgress",
        desc: "Learning progress with dashboards and streaks, Supabase with row-level security.",
        tags: ["Next.js", "Supabase"],
        ...PROJECT_LINKS.edu,
      },
      {
        title: "Go2Spot",
        desc: "Finds hidden spots in any city. Python ML backend, Next.js frontend.",
        tags: ["Next.js", "Python", "ML"],
        ...PROJECT_LINKS.go2spot,
      },
      {
        title: "PicturaSearch",
        desc: "Upload a photo, a CNN recognizes the product and searches eBay for offers.",
        tags: ["Next.js", "Python", "TensorFlow"],
        ...PROJECT_LINKS.pictura,
      },
      {
        title: "ClaudeShip",
        desc: "Next.js boilerplate for AI apps. Buyers get access to the GitHub repo automatically after checkout.",
        tags: ["Next.js", "Supabase", "Stripe"],
        ...PROJECT_LINKS.claudeship,
      },
    ],
    stack: STACK,
  },
};
