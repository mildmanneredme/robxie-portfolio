import type { Project } from "../types";

const lumen: Project = {
  slug: "lumen",
  name: "Lumen",
  group: "writing",
  pitch: "A techno-thriller about the day democracy finally becomes real.",
  summary:
    "Adrian Marsh helped build Silicon Valley, then walked away to teach ethics. When his name surfaces in a conspiracy he knows nothing about, he is pulled into a covert network of specialists (Tallinn, Berlin, Geneva, Reykjavik, Davos, Washington) building a single weapon: total, irreversible transparency. Hunting them are a council of billionaires and a meticulous contract killer.",
  status: "Draft 4",
  facts: [
    { label: "Status", value: "Draft 4" },
    { label: "Genre", value: "Techno-thriller" },
    { label: "Length", value: "~147,000 words" },
  ],
  links: [],
  accent: "#C9A227",
  onAccent: "#14120E",
  cover: {
    src: "/projects/lumen/cover.webp",
    alt: "Lumen cover art",
    width: 1024,
    height: 1536,
  },
  features: [
    "Democracy versus oligarchy",
    "Technology as both oppressor and liberator",
    "The ethics of doing terrible things for noble causes",
    "Betrayal, loyalty, and transparency as a weapon",
  ],
  stack: ["Markdown drafts", "Claude Code", "Custom feedback skill", "Python build script"],
  pipeline: [
    { step: "Plan", detail: "A living novel plan, research, and an author study of the genre." },
    { step: "Voice", detail: "A style guide calibrated from my own earlier essays, with numbered rewrite directives." },
    { step: "Draft", detail: "Four full drafts, each in five parts." },
    { step: "Revise", detail: "Inline feedback markers are sorted by a Claude Code skill I wrote and applied consistently across plan, style guide and draft." },
    { step: "Compile", detail: "A Python script builds the manuscript into a formatted Word file." },
  ],
  architecture: [
    "Writing a novel like software: versioned drafts, a spec (the plan), a style guide, and review passes.",
    "Editorial critiques and consistency checks between drafts catch drift in names, plot and voice.",
  ],
  next: ["Draft 5 revision", "Beta readers"],
};

export default lumen;
