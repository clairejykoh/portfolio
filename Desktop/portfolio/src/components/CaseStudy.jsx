import React from "react";

/**
 * Reusable vertical image column with consistent typography/layout.
 *
 * Props:
 * - title: string
 * - subtitle: string (optional)
 * - meta: string or ReactNode (optional)  // e.g., your “Academic, 3DS MAX...” line
 * - images: array of { src, alt? } OR array of src strings
 * - className: extra wrapper classes (optional)
 * - imageClassName: extra classes for each img (optional)
 * - children: optional extra JSX inserted under meta, before images
 */
export default function CaseStudy({
  title,
  subtitle,
  meta,
  caption,
  images = [],
  className = "",
  imageClassName = "",
  children,
}) {
  // Allow either ["img1", "img2"] OR [{src:"...", alt:"..."}]
  const normalized = images.map((img, i) => {
    if (typeof img === "string") return { src: img, alt: `${title ?? "image"}-${i + 1}` };
    return { src: img.src, alt: img.alt ?? `${title ?? "image"}-${i + 1}` };
  });

  return (
    <div className={` ${className}`}>
      <div className="image-column mix-blend-multiply">
        {title && <p className="text-3xl/2 font-italiana mt-20">{title}</p>}

        {subtitle && (
          <p className="text-2xl font-italiana">
            <br />
            {subtitle}
          </p>
        )}
        {meta && <p className="text-base text-gray-700">{meta}</p>}
        {caption && <p className="mb-5 text-sm text-gray-700">{caption}</p>}

        {children}

        {normalized.map(({ src, alt }, i) => (
          <img
            key={`${alt}-${i}`}
            src={src}
            alt={alt}
            className={`image-item-continuous  ${imageClassName}`}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}