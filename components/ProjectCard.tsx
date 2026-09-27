import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { LoopVideo } from "./LoopVideo";

export function ProjectCard({ project, size = "md" }: { project: Project; size?: "lg" | "md" }) {
  const p = project;
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group block"
      style={{ "--accent": p.accent, "--on-accent": p.onAccent } as React.CSSProperties}
    >
      <div
        className={`relative overflow-hidden rounded-xl bg-paper-2 ring-1 ring-line transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_-24px_rgb(0_0_0/0.35)] ${
          size === "lg" ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={p.cover.src}
          alt={p.cover.alt}
          fill
          sizes={size === "lg" ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        {p.loop && <LoopVideo loop={p.loop} className="absolute inset-0 h-full w-full object-cover" />}
        <span className="label absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-on-accent">{p.status}</span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{p.name}</h3>
        <span className="label shrink-0 text-ink-2 transition group-hover:text-ink">View →</span>
      </div>
      <p className="mt-1 max-w-xl text-ink-2">{p.pitch}</p>
      <p className="label mt-3 text-ink-2">{p.stack.slice(0, 4).join(" · ")}</p>
    </Link>
  );
}
