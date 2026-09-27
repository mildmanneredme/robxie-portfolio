import Image from "next/image";
import type { Project } from "@/content/types";
import { LoopVideo } from "./LoopVideo";

/** Lumen's cover: text-free art (or its loop) with the title set in live type, so motion never warps the lettering. */
export function BookCover({ project, sizes, priority = false }: { project: Project; sizes: string; priority?: boolean }) {
  const art = project.loop?.poster ?? project.cover.src;
  return (
    <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-[#0b0a08] shadow-2xl">
      <Image src={art} alt={project.cover.alt} fill priority={priority} sizes={sizes} className="object-cover" />
      {project.loop && <LoopVideo loop={project.loop} className="absolute inset-0 h-full w-full object-cover" />}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/75 to-transparent" />
      <div aria-hidden className="absolute inset-0 flex flex-col items-center text-[#f2eee6]" style={{ containerType: "inline-size" }}>
        <span className="mt-[13cqw] pl-[3cqw] font-display text-[17cqw] font-light leading-none tracking-[0.18em]">
          {project.name.toUpperCase()}
        </span>
        <span className="mt-[4cqw] font-display text-[4cqw] italic text-[#d8b44a]">a novel</span>
        <span className="mt-auto mb-[7cqw] font-display text-[3.2cqw] tracking-[0.3em] opacity-80">ROBERT XIE</span>
      </div>
    </div>
  );
}
