import React, { useEffect, useMemo, useRef, useState } from "react";

export default function ScrollGallery({
  frames = [],
  heightVh = 200,
  stickyTopPx = 0,
  className = "",
  imgClassName = "",
  cover = true,
  alt = "sequence frame",
  recomputeKey = null, // pass location.key
}) {
  const sectionRef = useRef(null);
  const rafRef = useRef(null);

  const [frameIndex, setFrameIndex] = useState(0);
  const total = frames.length;

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  useEffect(() => {
    if (!total) return;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;

      const scrollable = rect.height - viewportH;
      if (scrollable <= 0) {
        setFrameIndex(0);
        return;
      }

      const progress = clamp((-rect.top) / scrollable, 0, 1);
      const idx = Math.round(progress * (total - 1));
      setFrameIndex(idx);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Initial compute + route re-entry compute
    onScroll();
    requestAnimationFrame(update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [total, frames, recomputeKey]);

  const src = useMemo(() => frames[frameIndex] || "", [frames, frameIndex]);
  if (!total) return null;

  return (
    <section
      ref={sectionRef}
      className={className}
      style={{ height: `${heightVh}vh`, position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: `${stickyTopPx}px`,
          height: `calc(100vh - ${stickyTopPx}px)`,
          overflow: "hidden",
        }}
      >
        <img
          src={src}
          alt={`${alt} ${frameIndex + 1}/${total}`}
          className={imgClassName}
          style={{
            width: "100%",
            height: "100%",
            objectFit: cover ? "cover" : "contain",
          }}
          draggable={false}
        />
      </div>
    </section>
  );
}