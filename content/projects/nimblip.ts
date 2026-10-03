import type { Project } from "../types";

const nimblip: Project = {
  slug: "nimblip",
  name: "NimBlip",
  group: "dev",
  pitch: "A cozy tycoon game: grow a one-desk AI startup into a courtyard campus.",
  summary:
    "My first Android game. You found an AI lab with $45k and one workstation, shape your model, set prices, and compete with rival labs for a growing market, weighing every hire, office move and investor’s strings against your runway.",
  status: "Closed beta",
  facts: [
    { label: "Status", value: "Closed beta · v0.10" },
    { label: "Platform", value: "Android & desktop" },
    { label: "Engine", value: "Godot 4" },
  ],
  links: [],
  accent: "#FF9A86",
  onAccent: "#172944",
  cover: {
    src: "/projects/nimblip/key-art.webp",
    alt: "NimBlip key art: a smiling computer mascot in front of a cozy isometric AI lab",
    width: 1672,
    height: 941,
  },
  loop: { src: "/projects/nimblip/loop.mp4", poster: "/projects/nimblip/key-art.webp" },
  features: [
    "Research across four model attributes: Capability, Speed, Reliability and Efficiency",
    "Four customer segments, and three rival labs with their own strategy AI",
    "Fundraising from Pre-seed to Series B, with investors who remember how you treat them",
    "Own your racks or rent the cloud, with a payback preview",
    "Four office tiers with touch-friendly furniture placement",
    "Little 3D staff who work at their desks and earn their foosball breaks",
  ],
  stack: ["Godot 4", "GDScript", "Blender", "Meshy", "Replicate", "Python tooling", "Git LFS"],
  pipeline: [
    { step: "Reference", detail: "Visual language, cast and UI are explored as reference art first." },
    { step: "Generate", detail: "3D props and character parts come from Meshy; outfit references from Replicate." },
    { step: "Refine", detail: "Assets are cleaned up in Blender and move through staged review folders." },
    { step: "Ship", detail: "Headless tests cover the simulation and game flow before each Android build." },
  ],
  architecture: [
    "A deterministic, seeded simulation, kept separate from the 3D office and the HUD.",
    "Atomic, validated saves across three slots, with migration from older versions.",
    "Custom shaders for live desk monitors; a reduced-motion setting.",
  ],
  next: ["Sound and music pass", "Device testing on foldables", "Store release"],
  gallery: [
    { src: "/projects/nimblip/offices.webp", alt: "Four office tiers from a tiny lab to a large campus", width: 1536, height: 1024, caption: "Office progression" },
    { src: "/projects/nimblip/cast.webp", alt: "The staff cast: researchers, engineers, sales and finance", width: 1536, height: 1024, caption: "The staff cast" },
    { src: "/projects/nimblip/mobile-ui.webp", alt: "Mobile team panel design", width: 651, height: 1400, caption: "Mobile UI direction" },
    { src: "/projects/nimblip/mascot.webp", alt: "NimBlip mascot, a friendly computer", width: 800, height: 800, caption: "The mascot" },
  ],
};

export default nimblip;
