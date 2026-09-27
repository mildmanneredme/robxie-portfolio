import type { Project } from "../types";

const concept = (slug: string, name: string, desc: string) => ({
  src: `/projects/hellosoi/concept-${slug}.webp`,
  alt: `${name}: ${desc}`,
  width: 1440,
  height: 900,
  caption: `${name} · illustrative concept`,
});

const hellosoi: Project = {
  slug: "hellosoi",
  name: "HelloSoi",
  group: "live",
  pitch: "Beautiful multilingual websites for Bangkok’s independent restaurants.",
  summary:
    "A small studio offer: distinctive, affordable restaurant websites that greet guests in their own language. The site pairs Bangkok street imagery with a background film and a gallery of fully designed concept restaurants, each with its own layout and personality.",
  status: "Live",
  facts: [
    { label: "Status", value: "Live · pre-launch" },
    { label: "Type", value: "Service business" },
    { label: "Languages", value: "16 demonstrated" },
  ],
  links: [{ label: "Visit hellosoi", href: "https://hellosoi.vercel.app" }],
  accent: "#F4A62A",
  onAccent: "#1B2A22",
  cover: {
    src: "/projects/hellosoi/site-desktop.webp",
    alt: "HelloSoi homepage: Let the world find your table, over a Bangkok night scene",
    width: 1440,
    height: 900,
  },
  features: [
    "Menus and booking flows with English/Thai switching and right-to-left support",
    "Six concept restaurants, each with a different layout: side menus, floating nav, paint-splat boards",
    "Restrained parallax and a silent background film with a pause control",
    "Respects reduced-motion settings; checked down to 320px wide",
  ],
  stack: ["HTML", "CSS", "JavaScript", "Replicate", "Vercel"],
  pipeline: [
    { step: "Direct", detail: "Each concept starts from a written art direction and image prompts." },
    { step: "Generate", detail: "Imagery is generated locally on Replicate under a fixed media budget." },
    { step: "Build", detail: "Hand-written static pages with no build step and no runtime API calls." },
    { step: "Check", detail: "A validation script checks entry points, asset links and syntax before deploy." },
  ],
  architecture: [
    "Zero-dependency static site: fast, cheap to host and easy to hand over.",
    "Generated media stays local; the deployed site never touches an API key.",
  ],
  next: ["Confirm name and domain", "First restaurant clients"],
  galleryTitle: "Concept restaurants",
  gallery: [
    concept("morning-on-soi", "Morning on Soi", "a Japanese-inspired matcha kitchen"),
    concept("swirl-riot", "Swirl Riot", "a loud, playful ice-cream shop"),
    concept("sesame-yard", "Blue Hour Taverna", "Aegean seafood"),
    concept("lantern-lagoon", "Lantern Lagoon", "an island-escape bar"),
  ],
};

export default hellosoi;
