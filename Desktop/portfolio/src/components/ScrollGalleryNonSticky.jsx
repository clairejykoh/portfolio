import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

/**
 * ScrollGalleryInCell
 * - For embedding in a grid/flex cell (NO vh-based tall section)
 * - Parent controls height via style/className (e.g. h-[500px], aspect-[4/3], h-full)
 *
 * How it works:
 * - Uses IntersectionObserver to map visibility (0..1) to frame index.
 * - No sticky, no forced 100vh.
 */
export default function ScrollGalleryNonSticky({
  frames = [],
  className = "",
  imgClassName = "",
  alt = "sequence frame",
  recomputeKey = null,

  // Sizing behavior
  fit = "contain", // "contain" | "cover"
  width = "100%",
  height = "100%", // assumes parent gives a real height
}) {
  const hostRef = useRef(null);
  const rafRef = useRef(0);

  const [frameIndex, setFrameIndex] = useState(0);
  const total = frames.length;

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  const computeIndex = () => {
    const el = hostRef.current;
    if (!el || total <= 0) return 0;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    // Measure how much of the element is inside the viewport
    const visibleTop = clamp(rect.top, 0, vh);
    const visibleBottom = clamp(rect.bottom, 0, vh);
    const visibleH = clamp(visibleBottom - visibleTop, 0, vh);

    // Normalize by element height (avoid divide-by-zero)
    const elH = Math.max(1, rect.height);
    const visibility = clamp(visibleH / elH, 0, 1);

    // Map visibility to frames (simple; stable in a cell)
    const idx = Math.floor(visibility * (total - 1) + 1e-6);
    return clamp(idx, 0, total - 1);
  };

  const applyIndex = () => {
    const idx = computeIndex();
    setFrameIndex((prev) => (prev === idx ? prev : idx));
  };

  useLayoutEffect(() => {
    if (!total) return;
    applyIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, recomputeKey]);

  useEffect(() => {
    if (!total) return;

    const onTick = () => {
      rafRef.current = 0;
      applyIndex();
    };

    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(onTick);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    schedule();
    requestAnimationFrame(applyIndex);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, recomputeKey]);

  const src = useMemo(() => frames[frameIndex] || "", [frames, frameIndex]);
  if (!total) return null;

  return (
    <div
      ref={hostRef}
      className={className}
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
      }}
    >
      <img
        src={src}
        alt={`${alt} ${frameIndex + 1}/${total}`}
        className={imgClassName}
        style={{
          width: "100%",
          height: "100%",
          objectFit: fit,
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        draggable={false}
      />
    </div>
  );
}