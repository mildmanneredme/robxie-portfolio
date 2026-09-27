import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap py-32">
      <h1 className="font-display text-5xl tracking-tight">Nothing here.</h1>
      <Link href="/" className="label mt-6 inline-block text-ink-2 hover:text-ink">← Back to the work</Link>
    </section>
  );
}
