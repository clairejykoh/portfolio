import React, { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

/**
 * FlexGallery
 *
 * Key changes:
 * - Caption participates in the same flex-wrap grid as images.
 * - The *grid item* that holds the caption is vertically centered within its own row
 *   (i.e., it will center itself relative to adjacent items in that wrapped row),
 *   by using alignSelf: "center".
 * - "shadow-card" is applied ONLY to the caption element, not the full-width grid item.
 */
export default function CaptionGallery({
  title,
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

  const items = useMemo(() => {
    const out = [];

    if (caption) {
      const desired = captionSpan ?? colCount; // default: full width item
      const span = Math.max(1, Math.min(colCount, Number(desired) || 1));
      out.push({ kind: "caption", span });
    }

    if (children) out.push({ kind: "children", span: colCount });

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
      <div className="my-20 w-250 mix-blend-multiply">
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
                  style={{
                    flex: `0 0 ${width}`,
                    maxWidth: width,
                    // This centers the *caption grid item* vertically within its flex line
                    // relative to neighboring items in that wrapped row.
                    alignSelf: "center",
                    display: "flex",
                    justifyContent: "center", // horizontally center the caption element
                  }}
                >
                  {/* Only the caption itself gets shadow-card */}
              
                  <div className="text-justify text-gray-700 py-3 mr-8">
                    <div className="shadow-card text-sm py-3 mr-2">
                      {title}
                    </div>
                    <div className="my-6 text-xs">
                    {caption}
                    </div>

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