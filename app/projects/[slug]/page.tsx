import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LoopVideo } from "@/components/LoopVideo";
import { Reveal } from "@/components/Reveal";
import { getProject, projects } from "@/content";
import type { Media } from "@/content/types";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.pitch,
    openGraph: { title: `${p.name} — ${p.pitch}`, description: p.summary, images: [{ url: p.cover.src }] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const nextProject = projects[(i + 1) % projects.length];
  const isBook = p.group === "writing";

  return (
    <article style={{ "--accent": p.accent, "--on-accent": p.onAccent } as React.CSSProperties}>
      {/* Hero */}
      <header className="wrap pt-10 sm:pt-16">
        <Link href="/#work" className="label text-ink-2 hover:text-ink">← All work</Link>
        <div className={`mt-8 grid gap-10 ${isBook ? "md:grid-cols-[1fr_minmax(0,20rem)] md:items-end" : ""}`}>
          <div>
            <span className="label inline-block rounded-full bg-accent px-2.5 py-1 text-on-accent">{p.status}</span>
            <h1 className="mt-5 font-display text-5xl leading-none tracking-tight sm:text-7xl">{p.name}</h1>
            <p className="mt-5 max-w-3xl font-display text-2xl leading-snug text-ink-2 sm:text-3xl">{p.pitch}</p>
            {p.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition hover:opacity-90"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>
          {isBook && (
            <div className="relative mx-auto aspect-[2/3] w-56 overflow-hidden rounded-md shadow-2xl md:w-full">
              <Image src={p.cover.src} alt={p.cover.alt} fill priority sizes="320px" className="object-cover" />
            </div>
          )}
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-6 border-y border-line py-6 sm:grid-cols-3">
          {p.facts.map((f) => (
            <div key={f.label}>
              <dt className="label text-ink-2">{f.label}</dt>
              <dd className="mt-1 text-lg">{f.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {!isBook && (
        <div className="wrap mt-10">
          <div
            className="relative overflow-hidden rounded-2xl bg-paper-2 ring-1 ring-line"
            style={{ aspectRatio: `${p.cover.width} / ${p.cover.height}` }}
          >
            <Image src={p.cover.src} alt={p.cover.alt} fill priority sizes="(min-width: 1216px) 1152px, 100vw" className="object-cover" />
            {p.loop && <LoopVideo loop={p.loop} className="absolute inset-0 h-full w-full object-cover" />}
          </div>
        </div>
      )}

      {/* What it does */}
      <Section title={isBook ? "The story" : "What it does"}>
        <p className="text-xl leading-relaxed">{p.summary}</p>
        {p.audio?.map((a) => (
          <figure key={a.src} className="mt-8 rounded-xl bg-paper-2 p-5 ring-1 ring-line">
            <figcaption className="label mb-3 text-ink-2">▶ {a.title}</figcaption>
            <audio controls preload="none" src={a.src} className="w-full" />
          </figure>
        ))}
        <h3 className="label mt-10 text-ink-2">{isBook ? "Themes" : "Features"}</h3>
        <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {p.features.map((f) => (
            <li key={f} className="flex gap-3">
              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </Section>

      {p.gallery && p.gallery.length > 0 && (
        <div className="wrap mt-16">
          {p.galleryTitle && <h3 className="label mb-6 text-ink-2">{p.galleryTitle}</h3>}
          <Gallery items={p.gallery} />
        </div>
      )}

      {/* How it's built */}
      <Section title={isBook ? "How it’s being written" : "How it’s built"}>
        {p.pipeline && (
          <ol className="relative grid gap-5 sm:grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(8.25rem,1fr))]">
            {p.pipeline.map((s, n) => (
              <li key={s.step} className="relative border-t-2 border-accent pt-4">
                <span className="label text-ink-2">{String(n + 1).padStart(2, "0")}</span>
                <p className="mt-1 font-display text-xl">{s.step}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.detail}</p>
              </li>
            ))}
          </ol>
        )}
        <ul className="mt-10 space-y-3 text-lg">
          {p.architecture.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <h3 className="label mt-10 text-ink-2">{isBook ? "Tools" : "Stack"}</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <li key={s} className="label rounded-full px-3 py-1.5 ring-1 ring-line">{s}</li>
          ))}
        </ul>
      </Section>

      {p.next && (
        <Section title="Where it’s at">
          <p className="text-xl">{p.status}. Next up:</p>
          <ul className="mt-4 space-y-2 text-lg text-ink-2">
            {p.next.map((n) => (
              <li key={n}>→ {n}</li>
            ))}
          </ul>
        </Section>
      )}

      <nav className="wrap mt-28">
        <Link href={`/projects/${nextProject.slug}`} className="group block border-t border-line pt-8">
          <span className="label text-ink-2">Next project</span>
          <span className="mt-2 block font-display text-4xl tracking-tight transition group-hover:translate-x-2 sm:text-5xl">
            {nextProject.name} →
          </span>
        </Link>
      </nav>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="wrap mt-24 grid gap-6 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-12">
      <h2 className="font-display text-3xl tracking-tight">{title}</h2>
      <div className="min-w-0 max-w-3xl">{children}</div>
    </Reveal>
  );
}

function Gallery({ items }: { items: Media[] }) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {items.map((m) => (
        <figure key={m.src} className="mb-6 break-inside-avoid">
          <Image
            src={m.src}
            alt={m.alt}
            width={m.width}
            height={m.height}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="w-full rounded-xl ring-1 ring-line"
          />
          {m.caption && <figcaption className="label mt-2 text-ink-2">{m.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
