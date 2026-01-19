import React, { useMemo } from "react";

/**
 * ImageMarquee
 * Seamless horizontal band of images moving right -> left.
 *
 * Props:
 * - images: array of src strings OR { src, alt }
 * - height: number|string (e.g. 120 or "120px")
 * - speed: number (seconds for one full loop; smaller = faster)
 * - gap: number|string (space between images)
 * - className: wrapper classes
 * - pauseOnHover: boolean
 * - fadeEdges: boolean (adds subtle edge fade mask)
 * - fit: "contain" | "cover"
 */
export default function Marquee({
  images = [],
  height = 400,
  speed = 100,
  gap = 0,
  className = "",
  pauseOnHover = true,
  fadeEdges = false,
  fit = "contain",
}) {
  const normalized = useMemo(
    () =>
      images.map((img, i) =>
        typeof img === "string"
          ? { src: img, alt: `marquee-${i + 1}` }
          : { src: img.src, alt: img.alt ?? `marquee-${i + 1}` }
      ),
    [images]
  );

  // Duplicate once for seamless loop
  const doubled = useMemo(() => [...normalized, ...normalized], [normalized]);

  const toCss = (v) => (typeof v === "number" ? `${v}px` : v);
  const objectFit = fit === "cover" ? "object-cover" : "object-contain";

  if (!normalized.length) return null;

  // Optional edge fade using CSS mask (supported in modern browsers)
  const maskStyle = fadeEdges
    ? {
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }
    : undefined;

  return (
    <div
      className={`w-250 overflow-hidden my-20 mix-blend-multiply ${className}`}
      style={maskStyle}
      aria-label="Scrolling image band"
    >
      <div
        className={`marquee-track ${pauseOnHover ? "marquee-pause-on-hover" : ""}`}
        style={{
          ["--marquee-duration"]: `${speed}s`,
          ["--marquee-gap"]: toCss(gap),
          ["--marquee-height"]: toCss(height),
        }}
      >
        {doubled.map(({ src, alt }, i) => (
          <div className="marquee-item" key={`${alt}-${i}`}>
            <img
              src={src}
              alt={alt}
              className={`h-full w-auto ${objectFit}`}
              draggable={false}
              loading="eager"
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* Component-scoped CSS */}
      <style>{`
        .marquee-track {
          display: flex;
          align-items: center;
          gap: var(--marquee-gap);
          height: var(--marquee-height);
          width: max-content;
          animation: marquee-scroll var(--marquee-duration) linear infinite;
          will-change: transform;
        }

        /* Each item is fixed-height; width is dictated by image aspect ratio */
        .marquee-item {
          height: var(--marquee-height);
          flex: 0 0 auto;
          display: flex;
          align-items: center;
        }

        /* Move left by exactly half the content (since we doubled the list) */
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .marquee-pause-on-hover:hover {
          animation-play-state: paused;
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}