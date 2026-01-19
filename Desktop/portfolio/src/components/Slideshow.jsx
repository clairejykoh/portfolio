import React, { useEffect, useMemo, useState } from "react";

/**
 * Slideshow (crossfade)
 * - Uses stacked images + opacity transitions
 * - Uses inline transitionDuration (no Tailwind dynamic class issues)
 * - Disables transitions on first paint to prevent “blink”
 */
export default function Slideshow({
  images = [],
  width = 600,
  height = 400,
  className = "",
  durationMs = 700,
}) {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  const normalized = useMemo(
    () =>
      images.map((img, i) =>
        typeof img === "string" ? { src: img, alt: `slide-${i + 1}` } : img
      ),
    [images]
  );

  const toCss = (v) => (typeof v === "number" ? `${v}px` : v);

  useEffect(() => {
    // Enable transitions after first paint to avoid initial blink/fade
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const prev = () => {
    if (normalized.length <= 1) return;
    setIndex((i) => (i === 0 ? normalized.length - 1 : i - 1));
  };

  const next = () => {
    if (normalized.length <= 1) return;
    setIndex((i) => (i === normalized.length - 1 ? 0 : i + 1));
  };

  if (!normalized.length) return null;

  return (
    <div
      className={`relative overflow-hidden my-10 ${className}`}
      style={{ width: toCss(width), height: toCss(height) }}
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
            style={ready ? { transitionDuration: `${durationMs}ms` } : undefined}
          />
        ))}
      </div>

      {/* Controls */}
      {normalized.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-1 text-lg hover:bg-black hover:text-white border"
          >
            ‹
          </button>

          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-1 text-lg hover:bg-black hover:text-white border"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}