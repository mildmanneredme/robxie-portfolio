import type { Project } from "../types";

const heardvine: Project = {
  slug: "heardvine",
  name: "Heardvine",
  group: "live",
  pitch: "The news, as heard on podcasts. Every headline is playable evidence.",
  summary:
    "A fully automated news site whose only sources are podcasts. Each day it listens to around fifty finance, tech and AI shows, pulls out what’s newsworthy, and publishes a front page where every headline links to the exact moment it was said.",
  status: "Live",
  facts: [
    { label: "Status", value: "Live · daily" },
    { label: "Type", value: "Automated publication" },
    { label: "Sources", value: "~50 podcasts" },
  ],
  links: [{ label: "Read heardvine", href: "https://heardvine.vercel.app" }],
  accent: "#8B5CF6",
  onAccent: "#FFFFFF",
  cover: {
    src: "/projects/heardvine/site-desktop.webp",
    alt: "Heardvine front page with a lead story and a wire of timestamped headlines",
    width: 1440,
    height: 900,
  },
  features: [
    "A daily front page, fully automated with no human approval step",
    "Punchy but strictly factual headlines, each backed by an attributed quote",
    "Timestamp deep links into the source episode",
    "Sections for Finance, Tech and AI; categories are data, not code",
    "A browsable directory of every show it follows",
  ],
  stack: ["Python", "uv", "ffmpeg", "yt-dlp", "LLM extraction", "Next.js", "Supabase Postgres", "GitHub Actions", "Vercel"],
  pipeline: [
    { step: "Ingest", detail: "Poll a registry of verified podcast RSS feeds for new episodes." },
    { step: "Transcribe", detail: "A transcript ladder tries free sources first and falls back to paid speech-to-text." },
    { step: "Extract", detail: "An LLM pulls newsworthy items, quotes and timestamps from each episode." },
    { step: "Edit", detail: "A second LLM pass acts as front-page editor, ranking and writing headlines." },
    { step: "Publish", detail: "The site and newsletter update from Postgres." },
  ],
  architecture: [
    "Two deployables in one repo: a scheduled Python pipeline and a Next.js reader site.",
    "Each episode commits independently, so one bad transcript never sinks the day’s edition.",
    "Output health is monitored separately from process exit codes.",
  ],
  next: ["Move the scheduled pipeline to Cloud Run Jobs", "More categories"],
  gallery: [
    { src: "/projects/heardvine/site-mobile.webp", alt: "Heardvine front page on a phone", width: 600, height: 1298, caption: "Mobile front page" },
  ],
};

export default heardvine;
