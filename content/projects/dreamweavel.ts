import type { Project } from "../types";

const styles = ["watercolor", "3d", "clay", "anime", "pixel", "popup", "paper", "crayon", "pencil", "vector", "mixedmedia"];
const styleNames: Record<string, string> = {
  watercolor: "Watercolour",
  "3d": "3D animated",
  clay: "Claymation",
  anime: "Anime",
  pixel: "Pixel art",
  popup: "Pop-up",
  paper: "Paper cut-out",
  crayon: "Crayon",
  pencil: "Pencil",
  vector: "Vector",
  mixedmedia: "Mixed media",
};

const dreamweavel: Project = {
  slug: "dreamweavel",
  name: "Dreamweavel",
  group: "live",
  pitch: "Just dream it: a picture book starring your child, in minutes.",
  summary:
    "Parents enter a child’s name, age and interests, add a custom character if they like, and choose an art style. Dreamweavel writes the story, illustrates every page with consistent characters, and narrates it with read-along highlighting that helps kids learn to read.",
  status: "Temporarily offline",
  facts: [
    { label: "Status", value: "Launched · temporarily offline" },
    { label: "Type", value: "Consumer web app" },
    { label: "Languages", value: "10" },
  ],
  links: [],
  accent: "#7C3AED",
  onAccent: "#FFFFFF",
  cover: {
    src: "/projects/dreamweavel/book-4.webp",
    alt: "Book cover: Elara and the Snow Bear, a girl hugging a polar bear in the snow",
    width: 1200,
    height: 1200,
  },
  features: [
    "Personalised stories with a character creator and photo upload (moderated)",
    "Consistent characters on every page, from cover to back cover",
    "Eleven illustration styles, from watercolour to claymation",
    "AI narration with karaoke-style read-along",
    "A personal library with a page-flip reader",
    "Credit packs and a monthly plan through Stripe; ten interface languages",
  ],
  stack: ["React 19", "TypeScript", "Vite", "Tailwind", "Firebase", "Vercel Functions", "Gemini", "Replicate", "Gemini TTS", "Stripe"],
  pipeline: [
    { step: "Outline", detail: "Gemini writes the story and per-page image prompts to a strict JSON schema." },
    { step: "Illustrate", detail: "Cover, back cover and pages render in parallel on Replicate image models, with character references for consistency." },
    { step: "Narrate", detail: "Narration audio is prepared in the background while pages render." },
    { step: "Charge", detail: "A credit is only deducted once the book completes, so failed runs cost nothing." },
  ],
  architecture: [
    "Every AI call goes through a server-side proxy that enforces entitlements, rate limits and a cost cap.",
    "Image models are swappable; styles were chosen after side-by-side model reviews.",
    "Unit tests with Vitest and end-to-end tests with Playwright.",
  ],
  next: ["Bring the service back online", "Printed books", "Animated book trailers", "A mobile app"],
  galleryTitle: "Sample books and the eleven art styles",
  gallery: [
    ...["book-1", "book-10", "book-7"].map((b, i) => ({
      src: `/projects/dreamweavel/${b}.webp`,
      alt: ["Book cover: Leo’s Big Space Race", "Book cover: Amara’s Pop-Up Palace", "Book cover: Bennie’s Clay Day"][i],
      width: 1200,
      height: 1200,
    })),
    ...styles.map((s) => ({
      src: `/projects/dreamweavel/styles/preview-${s}.webp`,
      alt: `${styleNames[s]} style preview`,
      width: 600,
      height: 600,
      caption: styleNames[s],
    })),
  ],
};

export default dreamweavel;
