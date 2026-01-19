import React, { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

/**
 * FlexGallery
 *
 * Props:
 * - caption: string or ReactNode (optional)
 * - captionSpan: number (optional; how many columns the caption occupies; default = columns)
 * - images:
 *    array of { src, alt?, span?, className? } OR array of src strings
 * - className: extra wrapper classes (optional)
 * - imageClassName: extra classes for each img (optional)
 * - children: optional extra JSX inserted as grid items (optional)
 *
 * Layout props:
 * - columns: number
 * - gap: number (px)
 * - rowGap: number (px; defaults to gap)
 * - defaultSpan: number
 *
 * Notes:
 * - Caption is rendered as a flex item in the same flex-wrap grid as images.
 * - Caption text is centered within its box.
 * - Use your custom Tailwind class "shadow-card" on the caption box.
 */
export default function FlexGallery({
  caption,
  captionSpan,
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

  const colCount = Math.max(1, Number(columns) || 1);
  const g = Number(gap) || 0;
  const rg = rowGap == null ? g : Number(rowGap) || 0;

  const normalizedImages = useMemo(() => {
    return images
      .map((img, i) => {
        if (typeof img === "string") {
          return {
            kind: "image",
            src: img,
            alt: `image-${i + 1}`,
            span: defaultSpan,
            className: "",
          };
        }

        return {
          kind: "image",
          src: img.src,
          alt: img.alt ?? `image-${i + 1}`,
          span: img.span ?? defaultSpan,
          className: img.className ?? "",
        };
      })
      .map((item) => {
        const span = Math.max(1, Math.min(colCount, Number(item.span) || 1));
        return { ...item, span };
      });
  }, [images, colCount, defaultSpan]);

  // Build one flat list of "grid items" so caption participates in the same flex-wrap grid
  const items = useMemo(() => {
    const out = [];

    if (caption) {
      const desired = captionSpan ?? colCount; // default: full width
      const span = Math.max(1, Math.min(colCount, Number(desired) || 1));
      out.push({ kind: "caption", span });
    }

    if (children) {
      // Children behaves like a full-width grid item by default
      out.push({ kind: "children", span: colCount });
    }

    out.push(...normalizedImages);
    return out;
  }, [caption, captionSpan, children, normalizedImages, colCount]);

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
        "-=0.85"
      );
    }, rootRef);

    return () => ctx.revert();
  }, [items.length, caption, captionSpan, children]);

  const spanToWidth = (span) =>
    `calc(${(100 / colCount) * span}% - ${g * (1 - span / colCount)}px)`;

  return (
    <div ref={rootRef} className={className}>
      <div className="image-column mix-blend-multiply">
        {/* Flexbox grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: `${rg}px ${g}px`,
            alignItems: "flex-start",
          }}
        >
          {items.map((item, idx) => {
            const width = spanToWidth(item.span);

            if (item.kind === "caption") {
              return (
                <div
                  key={`caption-${idx}`}
                  data-pg-text
                  style={{ flex: `0 0 ${width}`, maxWidth: width }}
                >
                  <div
                    className="shadow-card text-sm text-gray-700"
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "14px 16px",
                    }}
                  >
                    {caption}
                  </div>
                </div>
              );
            }

            if (item.kind === "children") {
              return (
                <div
                  key={`children-${idx}`}
                  data-pg-text
                  style={{ flex: `0 0 ${width}`, maxWidth: width }}
                >
                  {children}
                </div>
              );
            }

            // image
            return (
              <div
                key={`${item.alt}-${idx}`}
                data-pg-image
                style={{ flex: `0 0 ${width}`, maxWidth: width }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className={`image-item-flex ${imageClassName} ${item.className}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                  loading="eager"
                  fetchpriority={idx === 0 ? "high" : "auto"}
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