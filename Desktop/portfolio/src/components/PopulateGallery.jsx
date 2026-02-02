import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * StickyFixedGridPopulate
 * - 3 columns
 * - rows = ceil(images.length / columns)
 * - sticky viewport is ALWAYS 100vh (prevents jump when sticky engages)
 * - NO fade: images "appear" by switching visibility (layout stays fixed, no shifting)
 * - pinned image is always visible (even before enter) but does NOT change array order
 * - overlay appears after all images are visible + overlayDelayPx
 * - images are fit (object-fit: contain), not cropped
 */
export default function PopulateGallery({
  images = [],

  width = "100%",
  maxWidth = null,
  align = "left",

  columns = 3,
  gap = 16,

  pxPerItem = 140,
  startAfterEnterPx = 140,
  initiallyVisible = 0,

  // pinned image
  pinnedIndex = 1, // <-- add back pinned image (always visible)

  // preload
  preload = true,

  // final overlay
  finalOverlaySrc = null,
  finalOverlayAlt = "final overlay",
  overlayDelayPx = 380,

  // cell bg behind contain letterboxing
  cellBg = "transparent",

  className = "",
}) {
  const rootRef = useRef(null);
  const rafRef = useRef(null);

  const [entered, setEntered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(initiallyVisible);
  const [overlayShown, setOverlayShown] = useState(false);

  const normalized = useMemo(
    () =>
      (images || []).map((img, i) =>
        typeof img === "string" ? { src: img, alt: `image-${i + 1}` } : img,
      ),
    [images],
  );

  const total = normalized.length;
  const pinnedIsValid = pinnedIndex >= 0 && pinnedIndex < total;

  const rows = Math.max(1, Math.ceil(total / columns));

  const revealScrollLen = Math.max(1, total * pxPerItem);
  const spacerLen = revealScrollLen + (finalOverlaySrc ? overlayDelayPx : 0);

  const marginLeft =
    align === "center" ? "auto" : align === "right" ? "auto" : 0;
  const marginRight =
    align === "center" ? "auto" : align === "right" ? 0 : "auto";

  // Optional preload
  useEffect(() => {
    if (!preload) return;
    const srcs = normalized.map((i) => i?.src).filter(Boolean);
    if (!srcs.length) return;

    let cancelled = false;
    Promise.all(
      srcs.map(
        (src) =>
          new Promise((res) => {
            const im = new Image();
            im.onload = () => res(true);
            im.onerror = () => res(false);
            im.src = src;
          }),
      ),
    ).then(() => {
      if (cancelled) return;
    });

    return () => {
      cancelled = true;
    };
  }, [normalized, preload]);

  // Scroll -> reveal (array order)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
    const getScrollY = () => window.scrollY || window.pageYOffset || 0;
    const getVH = () => window.innerHeight || 1;

    let startTop = 0;

    const recomputeStart = () => {
      const rect = root.getBoundingClientRect();
      startTop = rect.top + getScrollY() - getVH() + startAfterEnterPx;
    };

    const update = () => {
      rafRef.current = null;

      const y = getScrollY();
      const progressedPx = y - startTop;

      const hasEntered = progressedPx > 0;
      setEntered((prev) => (prev === hasEntered ? prev : hasEntered));

      const base = progressedPx <= 0 ? 0 : Math.floor(progressedPx / pxPerItem);
      const nextVisible = clamp(base + initiallyVisible, 0, total);
      setVisibleCount((prev) => (prev === nextVisible ? prev : nextVisible));

      if (finalOverlaySrc) {
        const shouldShow = progressedPx >= revealScrollLen + overlayDelayPx;
        setOverlayShown((prev) => (prev === shouldShow ? prev : shouldShow));
      } else {
        setOverlayShown(false);
      }
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };

    recomputeStart();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", recomputeStart);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", recomputeStart);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [
    total,
    pxPerItem,
    startAfterEnterPx,
    initiallyVisible,
    revealScrollLen,
    finalOverlaySrc,
    overlayDelayPx,
  ]);

  // Visibility rule:
  // - pinned is always visible (even before entered)
  // - after entering, items [0..visibleCount-1] are visible (array order)
  const isVisible = (idx) => {
    if (pinnedIsValid && idx === pinnedIndex) return true;
    if (!entered) return false;
    return idx < visibleCount;
  };

  return (
    <section
      ref={rootRef}
      className={className}
      style={{
        width,
        maxWidth: maxWidth || undefined,
        marginLeft,
        marginRight,
        position: "relative",
      }}
    >
      {/* Sticky viewport is ALWAYS 100vh (prevents jump) */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden", // crop anything beyond 100vh
        }}
      >
        <div
          style={{
            position: "relative",
            height: "100%",
            boxSizing: "border-box",
            padding: gap,

            display: "grid",
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            gap: `${gap}px`,
          }}
        >
          {/* Render ALL cells so layout never shifts; toggle visibility for instant "appear" */}
          {normalized.map((img, idx) => {
            if (!img?.src) return null;

            const vis = isVisible(idx);

            return (
              <div
                key={`${img.src}-${idx}`}
                style={{
                  width: "100%",
                  height: "100%",
                  background: cellBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",

                  visibility: vis ? "visible" : "hidden",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt || ""}
                  loading="eager"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "contain", // fit, no crop
                    objectPosition: "center",
                  }}
                />
              </div>
            );
          })}

          {/* Overlay (delayed) */}
          {finalOverlaySrc && overlayShown ? (
            <div
              style={{
                pointerEvents: "none",
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "50%",
                height: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 50,
              }}
            >
              <img
                src={finalOverlaySrc}
                alt={finalOverlayAlt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* Spacer drives the reveal timeline while sticky stays pinned */}
      <div aria-hidden style={{ height: `${spacerLen}px` }} />
    </section>
  );
}
