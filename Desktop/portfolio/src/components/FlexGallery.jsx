import React, { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

/**
 * Gallery (grid/flexbox)
 *
 * Props:
 * - title: string
 * - subtitle: string (optional)
 * - meta: string or ReactNode (optional)
 * - caption: string or ReactNode (optional)
 * - images:
 *    array of { src, alt?, span?, className? } OR array of src strings
 * - className: extra wrapper classes (optional)
 * - imageClassName: extra classes for each img (optional)
 * - children: optional extra JSX inserted under meta, before images
 *
 * Layout props:
 * - columns: number (how many columns in the row)
 * - gap: number (px gap)
 * - rowGap: number (px row gap; defaults to gap)
 * - defaultSpan: number (default columns each image takes if not provided)
 *
 * Notes:
 * - Uses a flexbox "wrapped columns" layout.
 * - Images are width-controlled; height is auto by default.
 */
export default function FlexGallery({
  title,
  subtitle,
  meta,
  caption,
  images = [],
  className = "",
  imageClassName = "",
  children,

  columns = 3,
  gap = 16,
  rowGap,
  defaultSpan = 1,
}) {
  const rootRef = useRef(null);

  const normalized = useMemo(() => {
    const colCount = Math.max(1, Number(columns) || 1);

    return images
      .map((img, i) => {
        if (typeof img === "string") {
          return {
            src: img,
            alt: `${title ?? "image"}-${i + 1}`,
            span: defaultSpan,
            className: "",
          };
        }

        return {
          src: img.src,
          alt: img.alt ?? `${title ?? "image"}-${i + 1}`,
          span: img.span ?? defaultSpan, // per-image column span
          className: img.className ?? "",
        };
      })
      .map((item) => {
        // Clamp span to [1, columns]
        const span = Math.max(1, Math.min(colCount, Number(item.span) || 1));
        return { ...item, span };
      });
  }, [images, title, columns, defaultSpan]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const textNodes = gsap.utils.toArray("[data-pg-text]");
      const imageNodes = gsap.utils.toArray("[data-pg-image]");

      gsap.set(textNodes, { opacity: 0, y: 12 });
      gsap.set(imageNodes, { opacity: 0, y: 12 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(textNodes, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.08,
      });

      tl.to(
        imageNodes,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        "-=0.85",
      );
    }, rootRef);

    return () => ctx.revert();
  }, [normalized.length, title, subtitle, meta, caption, children]);

  const colCount = Math.max(1, Number(columns) || 1);
  const colWidthPct = 100 / colCount;
  const g = Number(gap) || 0;
  const rg = rowGap == null ? g : Number(rowGap) || 0;

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
          <p data-pg-text className="mt-3 mb-5 text-sm text-gray-700">
            {caption}
          </p>
        )}

        {children && <div data-pg-text>{children}</div>}

        {/* Flexbox grid */}
        <div
          data-pg-text
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: `${rg}px ${g}px`, // row-gap then column-gap
            alignItems: "flex-start",
          }}
        >
          {normalized.map(({ src, alt, span, className: perItemClass }, i) => {
            // width = (span columns) minus a proportional share of column gaps.
            // We subtract gaps inside the row so items don't wrap unexpectedly.
            const width = `calc(${colWidthPct * span}% - ${
              g * (1 - span / colCount)
            }px)`;

            return (
              <div
                key={`${alt}-${i}`}
                data-pg-image
                style={{
                  flex: `0 0 ${width}`,
                  maxWidth: width,
                }}
              >
                <img
                  src={src}
                  alt={alt}
                  className={`image-item-flex ${imageClassName} ${perItemClass}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                  loading="eager"
                  fetchpriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
