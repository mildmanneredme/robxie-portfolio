import type { Group, Project } from "./types";
import pipschatter from "./projects/pipschatter.ts";
import dreamweavel from "./projects/dreamweavel.ts";
import heardvine from "./projects/heardvine.ts";
import hellosoi from "./projects/hellosoi.ts";
import nimblip from "./projects/nimblip.ts";
import nightingale from "./projects/nightingale.ts";
import lumen from "./projects/lumen.ts";

export const projects: Project[] = [pipschatter, dreamweavel, heardvine, hellosoi, nimblip, nightingale, lumen];

export const groups: { id: Group; title: string; blurb: string }[] = [
  { id: "live", title: "Live products", blurb: "Shipped and in people’s hands." },
  { id: "dev", title: "In development", blurb: "Being built right now." },
  { id: "writing", title: "Writing", blurb: "Long-form fiction, built with the same discipline." },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const site = {
  name: "Robert Xie",
  title: "Robert Xie — AI products, from idea to launch",
  description:
    "A showcase of what Robert Xie is building: AI-powered products, a game and a novel, taken from idea to launch.",
  github: "https://github.com/mildmanneredme",
};
