import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Reusable vertical image column with consistent typography/layout.
 *
 * Props:
 * - title: string
 * - subtitle: string (optional)
 * - meta: string or ReactNode (optional)
 * - caption: string or ReactNode (optional)
 * - images: array of { src, alt? } OR array of src strings
 * - className: extra wrapper classes (optional)
 * - imageClassName: extra classes for each img (optional)
 * - children: optional extra JSX inserted under meta, before images
 */
export default function Title({
  title,
  subtitle,
  meta,
  caption,
  images = [],
  className = "",
  imageClassName = "",
  children,
}) {
  const rootRef = useRef(null);

  // Allow either ["img1", "img2"] OR [{src:"...", alt:"..."}]
  const normalized = images.map((img, i) => {
    if (typeof img === "string") {
      return { src: img, alt: `${title ?? "image"}-${i + 1}` };
    }
    return { src: img.src, alt: img.alt ?? `${title ?? "image"}-${i + 1}` };
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const textNodes = gsap.utils.toArray("[data-pg-text]");
      const imageNodes = gsap.utils.toArray("[data-pg-image]");

      // Initial states (prevent flash)
      gsap.set(textNodes, { opacity: 0, y: 12 });
      gsap.set(imageNodes, { opacity: 0, y: 12 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Text first
      tl.to(textNodes, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.08,
      });

      // Images start slightly BEFORE text finishes (overlap)
      tl.to(
        imageNodes,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        "-=0.85"
      );
    }, rootRef);

    return () => ctx.revert();
  }, [normalized.length, title, subtitle, meta, caption, children]);

  return (
    <div ref={rootRef} className={className}>
      <div className="image-column mix-blend-multiply">
        {title && (
          <p data-pg-text className="text-3xl/2 font-italiana mt-20">
            {title}
          </p>
        )}

        {subtitle && (
          <p data-pg-text className="text-2xl font-italiana">
            <br />
            {subtitle}
          </p>
        )}

        {meta && (
          <p data-pg-text className="mb-5 text-base text-gray-700">
            {meta}
          </p>
        )}

        {caption && (
          <p data-pg-text className="text-justify mt-3 mb-5 text-sm text-gray-700">
            {caption}
          </p>
        )}

        {children && <div data-pg-text>{children}</div>}

        {normalized.map(({ src, alt }, i) => (
          <img
            key={`${alt}-${i}`}
            data-pg-image
            src={src}
            alt={alt}
            className={`image-item ${imageClassName}`}
            loading="eager"
            fetchpriority={i === 0 ? "high" : "auto"}
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
}