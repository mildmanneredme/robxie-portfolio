import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { site } from "@/content";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", axes: ["opsz", "SOFT"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { title: site.title, description: site.description, type: "website" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#121110" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <header className="wrap flex items-center justify-between py-6">
          <Link href="/" className="font-display text-lg tracking-tight">
            Robert Xie
          </Link>
          <nav className="label flex gap-5 text-ink-2">
            <Link href="/#work" className="hover:text-ink">Work</Link>
            <Link href="/#writing" className="hover:text-ink">Writing</Link>
            <Link href="/#about" className="hover:text-ink">About</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="wrap mt-32 flex flex-col gap-2 border-t border-line py-10 text-sm text-ink-2 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Robert Xie</span>
          <a href={site.github} className="hover:text-ink">GitHub ↗</a>
        </footer>
      </body>
    </html>
  );
}
