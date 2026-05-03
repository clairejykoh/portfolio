import React, { useEffect, useMemo, useState } from "react";

export default function Slideshow({
  images = [],
  className = "",
  durationMs = 700,

  slideFadeIn = true,
  slideFromPx = 24,
  slideFadeDurationMs = 700,
  slideFadeDelayMs = 0,
  slideFadeEasing = "cubic-bezier(0.22, 1, 0.36, 1)",

  thumbnailHeight = 56,
  thumbnailGap = 0,
  arrowOffset = 100,
}) {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);

  const normalized = useMemo(
    () =>
      images.map((img, i) =>
        typeof img === "string" ? { src: img, alt: `slide-${i + 1}` } : img,
      ),
    [images],
  );

  const toCss = (v) => (typeof v === "number" ? `${v}px` : v);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!slideFadeIn) return;

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
        width: "100%",
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0px)" : `translateY(${slideFromPx}px)`,
        transitionProperty: "opacity, transform",
        transitionDuration: `${slideFadeDurationMs}ms`,
        transitionTimingFunction: slideFadeEasing,
        transitionDelay: `${slideFadeDelayMs}ms`,
      }
    : {
        width: "100%",
      };

  return (
    <div className={`w-full mb-15 ${className}`} style={wrapperStyle}>
      {/* SLIDESHOW CONTAINER */}
      <div className="relative w-full overflow-visible image-column">
        {/* Invisible first image controls slideshow width/height ratio */}
        <img
          src={normalized[0].src}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="block w-full h-auto invisible select-none pointer-events-none"
        />

        {/* Visible stacked slides */}
        <div className="absolute inset-0 w-full h-full mix-blend-multiply overflow-hidden">
          {normalized.map(({ src, alt }, i) => (
            <img
              key={i}
              src={src}
              alt={alt}
              draggable={false}
              className={[
                "absolute inset-0 w-full h-full object-contain",
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

        {/* ARROWS: 20px outside slideshow edges */}
        {normalized.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute top-1/2 -translate-y-1/2 px-4 py-1 text-lg border hover:bg-black hover:text-white"
              style={{ left: `-${toCss(arrowOffset)}` }}
            >
              ‹
            </button>

            <button
              onClick={next}
              aria-label="Next image"
              className="absolute top-1/2 -translate-y-1/2 px-4 py-1 text-lg border hover:bg-black hover:text-white"
              style={{ right: `-${toCss(arrowOffset)}` }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* THUMBNAILS */}
      {normalized.length > 1 && (
        <div
          className="mt-3 flex w-full justify-center overflow-x-auto"
          style={{ gap: toCss(thumbnailGap) }}
        >
          {normalized.map(({ src, alt }, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              className={[
                "shrink-0 overflow-hidden transition-opacity duration-300",
                i === index ? "opacity-100" : "opacity-40 hover:opacity-70",
              ].join(" ")}
              style={{ height: toCss(thumbnailHeight) }}
            >
              <img
                src={src}
                alt={alt}
                draggable={false}
                className="h-full w-auto object-cover select-none pointer-events-none"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
