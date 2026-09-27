"use client";

import { useEffect, useRef } from "react";
import type { Loop } from "@/content/types";

/** Muted ambient loop that only plays while on screen and never under reduced motion. */
export function LoopVideo({ loop, className = "" }: { loop: Loop; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={loop.src}
      poster={loop.poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
