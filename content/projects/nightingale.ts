import type { Project } from "../types";

const nightingale: Project = {
  slug: "nightingale",
  name: "Nightingale",
  group: "dev",
  pitch: "Telehealth where AI makes it fast, and a doctor makes it safe.",
  summary:
    "A concept for affordable, on-demand consultations. An AI agent handles the intake conversation and prepares a clinical summary, and a credentialed doctor reviews, amends or rejects it before anything reaches the patient. Aimed at people who wait weeks for a GP, including rural Australia and Southeast Asia.",
  status: "Concept & early build",
  facts: [
    { label: "Status", value: "Concept · early build" },
    { label: "Type", value: "Health service" },
    { label: "Market", value: "Australia first" },
  ],
  links: [],
  accent: "#1F6F66",
  onAccent: "#FFFFFF",
  cover: {
    src: "/projects/nightingale/card.webp",
    alt: "Illustration: a phone showing a voice waveform beside a cup of tea, with a nightingale perched on the cup",
    width: 1536,
    height: 1024,
  },
  features: [
    "An AI voice and video intake, with photo upload where it helps",
    "An auto-generated clinical summary and draft plan for the doctor",
    "A mandatory doctor approval step: nothing is sent without it",
    "A clinician queue designed for two- to five-minute reviews",
  ],
  stack: ["Next.js", "React 19", "TypeScript", "AWS Cognito", "TanStack Query", "Vitest", "Playwright"],
  pipeline: [
    { step: "Consult", detail: "The patient talks to an AI intake agent for five to ten minutes." },
    { step: "Summarise", detail: "A structured clinical summary and draft response are prepared." },
    { step: "Review", detail: "A credentialed doctor approves, amends or rejects." },
    { step: "Respond", detail: "The patient receives doctor-approved advice, typically within hours." },
  ],
  architecture: [
    "Human-in-the-loop by design: the approval gate is an architectural rule, not a setting.",
    "Specified end to end before building: clinical scope, safety rules, compliance and data governance.",
  ],
  next: ["Clinical partners", "Regulatory pathway", "MVP build"],
  gallery: [
    { src: "/projects/nightingale/site-desktop.webp", alt: "Nightingale prototype homepage: Healthcare that feels human", width: 1440, height: 900, caption: "Prototype, desktop" },
    { src: "/projects/nightingale/site-mobile.webp", alt: "Nightingale prototype on a phone", width: 600, height: 1298, caption: "Prototype, mobile" },
  ],
};

export default nightingale;
