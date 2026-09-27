// Fails the build if a project is missing required fields or references media that isn't in /public.
import { existsSync } from "node:fs";
import { join } from "node:path";
import { projects } from "../content/index.ts";

const errors: string[] = [];
const need = (cond: unknown, msg: string) => {
  if (!cond) errors.push(msg);
};
const file = (slug: string, src: string | undefined) => {
  if (src && !existsSync(join("public", src))) errors.push(`${slug}: missing file public${src}`);
};

const slugs = new Set<string>();
for (const p of projects) {
  need(!slugs.has(p.slug), `${p.slug}: duplicate slug`);
  slugs.add(p.slug);
  for (const key of ["name", "pitch", "summary", "status", "accent", "onAccent"] as const) {
    need(p[key]?.trim(), `${p.slug}: empty ${key}`);
  }
  need(p.features.length > 0, `${p.slug}: no features`);
  need(p.stack.length > 0, `${p.slug}: no stack`);
  need(p.cover.alt.trim(), `${p.slug}: cover has no alt text`);
  file(p.slug, p.cover.src);
  file(p.slug, p.loop?.src);
  file(p.slug, p.loop?.poster);
  p.gallery?.forEach((m) => {
    file(p.slug, m.src);
    need(m.alt.trim(), `${p.slug}: gallery image ${m.src} has no alt text`);
  });
  p.audio?.forEach((a) => file(p.slug, a.src));
  p.links.forEach((l) => need(/^https:\/\//.test(l.href), `${p.slug}: link ${l.href} is not https`));
}

if (errors.length) {
  console.error(`Content validation failed:\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
console.log(`Content OK: ${projects.length} projects`);
