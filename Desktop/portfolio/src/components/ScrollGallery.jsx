import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

export default function ScrollGallery({
  frames = [],
  heightVh = 200,
  stickyTopPx = 0,
  className = "",
  imgClassName = "",
  cover = true,
  alt = "sequence frame",
  recomputeKey = null,          // pass location.key on route change
  scrollEl = null,              // optional: element that scrolls (defaults to window)
  useRafPolling = false,        // set true for Lenis/Locomotive/odd scroll setups
}) {
  const sectionRef = useRef(null);
  const rafRef = useRef(0);

  const [frameIndex, setFrameIndex] = useState(0);
  const total = frames.length;

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  const computeIndex = () => {
    const el = sectionRef.current;
    if (!el || total <= 0) return 0;

    const rect = el.getBoundingClientRect();
    const viewportH = window.innerHeight;

    const scrollable = rect.height - viewportH;
    if (scrollable <= 1) return 0;

    const progress = clamp((-rect.top) / scrollable, 0, 1);

    // Monotonic mapping (less jitter / “stuck” feeling than Math.round)
    const idx = Math.floor(progress * (total - 1) + 1e-6);
    return clamp(idx, 0, total - 1);
  };

  const applyIndex = () => {
    const idx = computeIndex();
    setFrameIndex((prev) => (prev === idx ? prev : idx));
  };

  // Do an immediate measurement before paint where possible
  useLayoutEffect(() => {
    if (!total) return;
    applyIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, recomputeKey]);

  useEffect(() => {
    if (!total) return;

    const target = scrollEl || window;

    const onTick = () => {
      rafRef.current = 0;
      applyIndex();
    };

    const schedule = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(onTick);
    };

    let cleanupFns = [];

    if (useRafPolling) {
      let running = true;
      const loop = () => {
        if (!running) return;
        applyIndex();
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
      cleanupFns.push(() => {
        running = false;
      });
    } else {
      target.addEventListener?.("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      cleanupFns.push(() => target.removeEventListener?.("scroll", schedule));
      cleanupFns.push(() => window.removeEventListener("resize", schedule));

      // initial compute
      schedule();
      requestAnimationFrame(applyIndex);
    }

    return () => {
      cleanupFns.forEach((fn) => fn());
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    };
    // IMPORTANT: don't depend on `frames` array identity; depend on `total`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, recomputeKey, scrollEl, useRafPolling]);

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
    display: "grid",
    placeItems: "center",
  }}
      >
        <img
    src={src}
    alt={`${alt} ${frameIndex + 1}/${total}`}
    className={imgClassName}
    style={{
      width: "70%",          // control size here
      height: "70%",         // or omit and control just width
      objectFit: "contain",  // critical: no crop
      maxWidth: "100%",
      maxHeight: "100%",
    }}
    draggable={false}
        />
      </div>
    </section>
  );
}