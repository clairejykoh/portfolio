import React, { useState } from "react";

/**
 * ImageSlideshow
 *
 * Props:
 * - images: array of image src strings OR { src, alt }
 * - width: number|string (px or %)
 * - height: number|string
 * - className: wrapper classes
 */
export default function Slideshow({
  images = [],
  width = 600,
  height = 400,
  className = "",
}) {
  const [index, setIndex] = useState(0);

  const normalized = images.map((img, i) =>
    typeof img === "string"
      ? { src: img, alt: `slide-${i + 1}` }
      : img
  );

  const prev = () =>
    setIndex((i) => (i === 0 ? normalized.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === normalized.length - 1 ? 0 : i + 1));

  const toCss = (v) => (typeof v === "number" ? `${v}px` : v);

  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center ${className}`}
      style={{ width: toCss(width), height: toCss(height) }}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-out mix-blend-multiply"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {normalized.map(({ src, alt }, i) => (
          <img
            key={i}
            src={src}
            alt={alt}
            className="h-full w-full object-contain flex-shrink-0"
            draggable={false}
          />
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full px-4 py-1 text-lg hover:bg-black hover:text-white border-1"
      >
        ‹
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full justify-center items-center px-4 py-1 text-lg hover:bg-black hover:text-white border-1"
      >
        ›
      </button>
    </div>
  );
}