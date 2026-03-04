import React, { useEffect, useMemo, useState } from "react";

/**
 * Slideshow (crossfade) + mount slide/fade-in
 * - Crossfades via stacked images + opacity transitions
 * - Wrapper animates on mount: translateY + opacity
 * - Disables transitions on first paint to prevent “blink”
 */
export default function Slideshow({
  images = [],
  width = 600,
  height = 400,
  className = "",
  durationMs = 700,

  // NEW: mount animation
  slideFadeIn = true,
  slideFromPx = 24,
  slideFadeDurationMs = 700,
  slideFadeDelayMs = 0,
  slideFadeEasing = "cubic-bezier(0.22, 1, 0.36, 1)", // easeOut-ish
}) {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false); // for crossfade transitions
  const [entered, setEntered] = useState(false); // for mount slide/fade

  const normalized = useMemo(
    () =>
      images.map((img, i) =>
        typeof img === "string" ? { src: img, alt: `slide-${i + 1}` } : img,
      ),
    [images],
  );

  const toCss = (v) => (typeof v === "number" ? `${v}px` : v);

  useEffect(() => {
    // Enable crossfade transitions after first paint to avoid initial blink/fade
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!slideFadeIn) return;

    // Start mount animation after paint (and optional delay)
    let raf = 0;
    let t = 0;

    raf = requestAnimationFrame(() => {
      if (slideFadeDelayMs > 0) {
        t = window.setTimeout(() => setEntered(true), slideFadeDelayMs);
      } else {
        setEntered(true);
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      if (t) window.clearTimeout(t);
    };
  }, [slideFadeIn, slideFadeDelayMs]);

  const prev = () => {
    if (normalized.length <= 1) return;
    setIndex((i) => (i === 0 ? normalized.length - 1 : i - 1));
  };

  const next = () => {
    if (normalized.length <= 1) return;
    setIndex((i) => (i === normalized.length - 1 ? 0 : i + 1));
  };

  if (!normalized.length) return null;

  const wrapperStyle = slideFadeIn
    ? {
        width: toCss(width),
        height: toCss(height),
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0px)" : `translateY(${slideFromPx}px)`,
        transitionProperty: "opacity, transform",
        transitionDuration: `${slideFadeDurationMs}ms`,
        transitionTimingFunction: slideFadeEasing,
        transitionDelay: `${slideFadeDelayMs}ms`,
        willChange: "opacity, transform",
      }
    : { width: toCss(width), height: toCss(height) };

  return (
    <div
      className={`relative overflow-hidden mb-15 ${className}`}
      style={wrapperStyle}
    >
      {/* Slides (stacked) */}
      <div className="relative h-full w-full mix-blend-multiply">
        {normalized.map(({ src, alt }, i) => (
          <img
            key={i}
            src={src}
            alt={alt}
            draggable={false}
            className={[
              "absolute inset-0 h-full w-full object-contain",
              "select-none pointer-events-none",
              ready ? "transition-opacity ease-out" : "",
              i === index ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={
              ready ? { transitionDuration: `${durationMs}ms` } : undefined
            }
          />
        ))}
      </div>

      {/* Controls */}
      {normalized.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-1 text-lg hover:bg-black hover:text-white border "
          >
            ‹
          </button>

          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-1 text-lg hover:bg-black hover:text-white border "
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
