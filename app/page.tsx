import { BookCover } from "@/components/BookCover";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { getProject, groups, projects, site } from "@/content";

export default function Home() {
  const live = projects.filter((p) => p.group === "live");
  const dev = projects.filter((p) => p.group === "dev");
  const lumen = getProject("lumen")!;

  return (
    <>
      <section className="wrap pb-20 pt-16 sm:pt-28">
        <p className="label text-ink-2">Portfolio · 2025 – 2026</p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl">
          I build AI products, from idea&nbsp;to&nbsp;launch.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-ink-2">
          Podcasts written for one listener. Picture books starring your child. A newsroom that only listens.
          Here are the things I’ve been making, with a look at how each one works.
        </p>
      </section>

      <section id="work" className="wrap scroll-mt-8">
        <GroupHeader {...groups[0]} count={live.length} />
        <div className="grid gap-x-8 gap-y-16 lg:grid-cols-12">
          {live.map((p, i) => (
            <Reveal key={p.slug} className={i % 3 === 0 ? "lg:col-span-7" : "lg:col-span-5"}>
              <ProjectCard project={p} size={i % 3 === 0 ? "lg" : "md"} />
            </Reveal>
          ))}
        </div>

        <GroupHeader {...groups[1]} count={dev.length} />
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {dev.map((p) => (
            <Reveal key={p.slug}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="writing" className="wrap scroll-mt-8">
        <GroupHeader {...groups[2]} count={1} />
        <Reveal>
          <Link
            href="/projects/lumen"
            className="group grid items-center gap-8 rounded-2xl bg-[#14120e] p-6 text-[#f2eee6] ring-1 ring-line sm:p-10 md:grid-cols-[minmax(0,15rem)_1fr]"
          >
            <div className="mx-auto w-44 transition duration-500 group-hover:-translate-y-1 md:w-full">
              <BookCover project={lumen} sizes="240px" />
            </div>
            <div>
              <p className="label text-[#c9a227]">{lumen.facts.map((f) => f.value).join(" · ")}</p>
              <h3 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">{lumen.name}</h3>
              <p className="mt-4 max-w-2xl font-display text-xl italic text-[#f2eee6]/85">{lumen.pitch}</p>
              <p className="mt-4 max-w-2xl text-[#f2eee6]/70">{lumen.summary}</p>
              <span className="label mt-6 inline-block text-[#f2eee6]/70 group-hover:text-[#f2eee6]">
                How it’s being written →
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      <section id="about" className="wrap scroll-mt-8">
        <div className="mt-32 grid gap-10 border-t border-line pt-12 md:grid-cols-[1fr_2fr]">
          <h2 className="font-display text-3xl tracking-tight">About</h2>
          <div className="space-y-5 text-lg text-ink-2">
            <p>
              I’m Robert. I like taking an idea all the way: the product, the pipeline behind it, the brand, the
              billing, and the unglamorous reliability work after launch.
            </p>
            <p>
              Most of what I build pairs generative AI with a careful pipeline around it, so the output is
              something people can trust and pay for.
            </p>
            <p>
              <a href={site.github} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
                GitHub ↗
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function GroupHeader({ title, blurb, count }: { title: string; blurb: string; count: number }) {
  return (
    <div className="mb-10 mt-28 flex flex-col gap-2 border-t border-line pt-6 sm:flex-row sm:items-baseline sm:justify-between">
      <h2 className="font-display text-3xl tracking-tight">
        {title} <span className="label align-middle text-ink-2">({count})</span>
      </h2>
      <p className="text-ink-2">{blurb}</p>
    </div>
  );
}
