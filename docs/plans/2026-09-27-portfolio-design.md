# Rob Xie Portfolio — Design

**Date:** 2026-09-27
**Status:** Approved in brainstorming

## Purpose

A showcase of what Robert has been building: AI products taken from idea to launch, plus a novel in progress. Balanced audience: product-first for everyone, with a "How it's built" section on each project for technical readers.

## Projects

| Slug | Name | Group | Live link |
|---|---|---|---|
| `pipschatter` | PipsChatter | Live | https://www.pipschatter.com |
| `dreamweavel` | Dreamweavel | Live | https://dreamweavel.me |
| `heardvine` | Heardvine | Live | https://heardvine.vercel.app |
| `hellosoi` | HelloSoi | Live | https://hellosoi.vercel.app |
| `nimblip` | NimBlip | In development (closed beta) | — |
| `nightingale` | Nightingale | In development | — |
| `lumen` | Lumen | Writing | — |

Project source repos are private, so there are no "view source" links; technical depth lives in each page's "How it's built" section.

### Content rules

- Public-safe summaries only: no secrets, internal docs, incident details or unreleased business plans.
- Lumen: premise, themes, process and status. No manuscript text, no spoilers.
- Pre-release projects are labelled as such, with no store or clinical claims.
- Illustrative concept work is labelled as illustrative.

## Site structure (Next.js App Router, static)

- `/`: intro → Live products (4 cards) → In development (2 cards) → Writing (Lumen) → About / contact.
- `/projects/[slug]`: Hero (key art or loop, "Try it" link, fact strip) → What it does (copy, features, project-specific media) → How it's built (stack chips, pipeline diagram, architecture notes) → Where it's at (status, next steps).
- Project-specific media blocks: Dreamweavel style grid; PipsChatter sample-episode audio player and hero loop; NimBlip key art and mascot; HelloSoi, Heardvine and Nightingale live-site screenshots.
- No blog.

## Visual system: studio / gallery

- Neutral frame: paper `#FAF8F4`, ink `#16140F`; dark mode (ink `#121110` bg, paper text).
- Type: Fraunces (display serif), Inter (body), JetBrains Mono (labels, e.g. `LIVE · Next.js · Replicate`).
- Each project page sets a CSS `--accent` from its brand: PipsChatter `#1E4EFF`, Dreamweavel `#0EA5E9`/gold `#F59E0B`, NimBlip coral `#FF9A86` on navy `#172944`, others taken from their live sites.
- Motion: fade/rise reveals on scroll, card hover lift, looping card videos (muted, `playsinline`, pause off-screen). All disabled under `prefers-reduced-motion`.
- Responsive to 320px, with no horizontal scroll.

## Content model

`content/projects/<slug>.ts` exports a typed `Project`:

```ts
type Project = {
  slug: string; name: string; group: "live" | "dev" | "writing";
  pitch: string; summary: string; status: string;
  links: { label: string; href: string }[];
  accent: string; cover: Media; loop?: Media;
  features: string[];
  stack: string[];
  pipeline?: { step: string; detail: string }[];
  architecture: string[];
  next?: string[];
  gallery?: Media[]; audio?: { title: string; src: string }[];
};
```

A build-time check fails if a required field is missing or a referenced media file doesn't exist.

## Media

- Real assets are copied into `public/projects/<slug>/` and compressed (WebP/AVIF, max ~2400px).
- Screenshots of the live sites (HelloSoi, Heardvine, Nightingale) are captured with the browser tool.
- Generated media come from `scripts/generate/*.mjs`, which reads `REPLICATE_API_TOKEN` and the model IDs from `.env` via `process.env`. Scripts run locally only; the deployed site never calls Replicate.
  - Stills (`IMAGE_MODEL`, openai/gpt-image-2): Lumen cover, Nightingale concept art, OG/share image.
  - Card loops (`CHEAP_VIDEO_MODEL`, seedance-1-pro-fast): 3–5s silent loops for home cards, image-to-video from each project's key art. Encoded to H.264 MP4 + WebM, each under 1.5 MB, with a poster frame.
  - Before generating, report the estimated cost and confirm the shot list with Rob.

## Build and deploy

- Next.js (App Router), TypeScript, Tailwind CSS, `next/image`; fully static generation.
- Deployed to Vercel; no runtime env vars needed.
- Tests: `tsc --noEmit`, content validation script, Playwright smoke test (every route renders, no console errors, no broken images).

## Open items

- Intro copy (draft: "Robert Xie — I build AI products from idea to launch.") for Rob to edit.
- Contact method (email / LinkedIn / GitHub) to confirm.
- Custom domain (optional).
