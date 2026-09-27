export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type Loop = {
  src: string;
  poster: string;
};

export type Group = "live" | "dev" | "writing";

export type Project = {
  slug: string;
  name: string;
  group: Group;
  /** One-line pitch shown on cards and page heroes. */
  pitch: string;
  /** Two or three sentences: what the user does, what they get. */
  summary: string;
  /** Short status label, e.g. "Live", "Draft 4". */
  status: string;
  /** Facts shown in the hero strip. */
  facts: { label: string; value: string }[];
  links: { label: string; href: string }[];
  /** Brand accent, used as --accent on the project page and card. */
  accent: string;
  /** Text colour that reads on top of the accent. */
  onAccent: string;
  cover: Media;
  loop?: Loop;
  features: string[];
  stack: string[];
  pipeline?: { step: string; detail: string }[];
  architecture: string[];
  next?: string[];
  gallery?: Media[];
  galleryTitle?: string;
  audio?: { title: string; src: string }[];
};
