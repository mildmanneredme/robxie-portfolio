import type { Project } from "../types";

const pipschatter: Project = {
  slug: "pipschatter",
  name: "PipsChatter",
  group: "live",
  pitch: "Your portfolio, narrated.",
  summary:
    "Add your holdings, pick a voice and a delivery time. Every trading day PipsChatter researches what moved your stocks and why, writes a script, voices it, and drops a private episode into your podcast app of choice.",
  status: "Live",
  facts: [
    { label: "Status", value: "Live · paid tiers" },
    { label: "Type", value: "Subscription web app" },
    { label: "Built", value: "Oct 2025 – now" },
  ],
  links: [{ label: "Visit pipschatter.com", href: "https://www.pipschatter.com" }],
  accent: "#1E4EFF",
  onAccent: "#FFFFFF",
  cover: {
    src: "/projects/pipschatter/poster.webp",
    alt: "Glowing world map of market data from the PipsChatter hero film",
    width: 1600,
    height: 900,
  },
  loop: { src: "/projects/pipschatter/loop.mp4", poster: "/projects/pipschatter/poster.webp" },
  features: [
    "Daily briefings built only from your holdings and watchlists, scheduled in your timezone",
    "Explains why each position moved: earnings, guidance, sector shifts, filings, insider trades",
    "A private, rotatable RSS feed that plays in Apple Podcasts, Spotify or any podcast app",
    "Choice of voices and TTS providers",
    "Pro Deep Dive episodes and “ask a follow-up” Q&A on any episode",
    "Four tiers from free to Pro, billed through Stripe",
  ],
  stack: [
    "Next.js",
    "TypeScript",
    "BullMQ worker",
    "Postgres · Prisma",
    "Redis",
    "Perplexity Sonar",
    "Claude · GPT · Gemini",
    "ElevenLabs · Gemini TTS",
    "Stripe",
    "Vercel",
  ],
  pipeline: [
    { step: "Research", detail: "Once per exchange per day, news and filings are gathered and scored into one shared dataset, so research is paid for once rather than per user." },
    { step: "Select", detail: "Each listener’s episode filters the shared research down to their holdings." },
    { step: "Write", detail: "A switchable LLM layer drafts a script that explains the why, not just the price." },
    { step: "Voice", detail: "A single TTS router picks the provider, synthesises in chunks and encodes to MP3." },
    { step: "Deliver", detail: "The episode lands in a private RSS feed and, optionally, the inbox." },
  ],
  architecture: [
    "Monorepo with a Next.js web app and a separate queue worker, so long-running generation never blocks the site.",
    "Shared-research design keeps cost per listener low as the user base grows.",
    "The landing page is a scroll-scrubbed story: AI-generated ambient loops for each phase, with frame-sequence transitions between them.",
  ],
  next: ["Reliability and retention work", "More markets and languages"],
  gallery: [
    { src: "/projects/pipschatter/site-desktop.webp", alt: "PipsChatter homepage on desktop", width: 1440, height: 900, caption: "The live landing page" },
    { src: "/projects/pipschatter/hiw-1.webp", alt: "Illustration of research gathered across global markets", width: 1536, height: 1024, caption: "How it works: research" },
    { src: "/projects/pipschatter/hiw-2.webp", alt: "Illustration of the script-writing step", width: 1536, height: 1024, caption: "How it works: script" },
    { src: "/projects/pipschatter/site-mobile.webp", alt: "PipsChatter homepage on a phone", width: 600, height: 1298, caption: "Mobile" },
  ],
  audio: [{ title: "Sample episode (Advanced tier)", src: "/projects/pipschatter/sample-advanced.mp3" }],
};

export default pipschatter;
