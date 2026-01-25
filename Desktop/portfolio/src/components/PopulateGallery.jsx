import React, { useEffect, useMemo, useRef, useState } from "react";

function hashStringToUint32(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledIndices(length, seed) {
  const idx = Array.from({ length }, (_, i) => i);
  const rand = mulberry32(seed);
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

export default function PopulateGallery({
  images = [],

  // width control
  width = "100%",
  maxWidth = null,
  align = "left",

  // masonry controls
  columns = 2,
  columnGap = 16,
  itemGap = 16,

  // reveal controls
  pxPerItem = 140,
  startAfterEnterPx = 0, // <-- 0 = start exactly when component top crosses viewport bottom
  initiallyVisible = 0,

  // randomization controls
  randomSeed = "default-seed",

  className = "",
}) {
  const rootRef = useRef(null);
  const rafRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(initiallyVisible);

  const normalized = useMemo(
    () =>
      (images || []).map((img, i) =>
        typeof img === "string" ? { src: img, alt: `image-${i + 1}` } : img
      ),
    [images]
  );

  const revealOrder = useMemo(() => {
    const seed = hashStringToUint32(`${randomSeed}::${normalized.length}`);
    return shuffledIndices(normalized.length, seed);
  }, [normalized.length, randomSeed]);

  const revealRankByIndex = useMemo(() => {
    const rank = new Array(normalized.length).fill(Infinity);
    for (let r = 0; r < revealOrder.length; r++) rank[revealOrder[r]] = r;
    return rank;
  }, [normalized.length, revealOrder]);

  const getScrollParent = (node) => {
    if (!node) return window;
    let el = node.parentElement;
    while (el) {
      const style = window.getComputedStyle(el);
      const oy = style.overflowY;
      const isScrollableY =
        (oy === "auto" || oy === "scroll" || oy === "overlay") &&
        el.scrollHeight > el.clientHeight;
      if (isScrollableY) return el;
      el = el.parentElement;
    }
    return window;
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const total = normalized.length;
    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

    let scrollParent = getScrollParent(el);
    const isWindow = (sp) => sp === window;

    const getScrollTop = (sp) =>
      isWindow(sp) ? window.scrollY || window.pageYOffset || 0 : sp.scrollTop || 0;

    const getViewportHeight = (sp) =>
      isWindow(sp) ? window.innerHeight || 1 : sp.clientHeight || 1;

    const getElementTopInScrollSpace = (sp) => {
      const rect = el.getBoundingClientRect();
      if (isWindow(sp)) {
        return rect.top + getScrollTop(sp);
      }
      const spRect = sp.getBoundingClientRect();
      return rect.top - spRect.top + getScrollTop(sp);
    };

    let startTop = 0;

    const recompute = () => {
      // Start when: component top crosses viewport bottom
      // -> in scroll space, that happens at (componentTop - viewportHeight)
      startTop =
        getElementTopInScrollSpace(scrollParent) -
        getViewportHeight(scrollParent) +
        startAfterEnterPx;
    };

    const update = () => {
      rafRef.current = null;

      const progressedPx = getScrollTop(scrollParent) - startTop;
      const base = progressedPx <= 0 ? 0 : Math.floor(progressedPx / pxPerItem);
      const next = clamp(base + initiallyVisible, 0, total);

      setVisibleCount((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };

    // Keep robust if layout shifts / wrapper changes
    const ro = new ResizeObserver(() => {
      const nextSP = getScrollParent(el);
      if (nextSP !== scrollParent) {
        if (isWindow(scrollParent)) window.removeEventListener("scroll", onScroll);
        else scrollParent.removeEventListener("scroll", onScroll);

        scrollParent = nextSP;

        if (isWindow(scrollParent)) window.addEventListener("scroll", onScroll, { passive: true });
        else scrollParent.addEventListener("scroll", onScroll, { passive: true });
      }

      recompute();
      onScroll();
    });

    recompute();
    update();

    if (isWindow(scrollParent)) window.addEventListener("scroll", onScroll, { passive: true });
    else scrollParent.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      recompute();
      onScroll();
    };
    window.addEventListener("resize", onResize);

    ro.observe(el);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);

      if (isWindow(scrollParent)) window.removeEventListener("scroll", onScroll);
      else scrollParent.removeEventListener("scroll", onScroll);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [normalized.length, pxPerItem, startAfterEnterPx, initiallyVisible]);

  const marginLeft = align === "center" ? "auto" : align === "right" ? "auto" : 0;
  const marginRight = align === "center" ? "auto" : align === "right" ? 0 : "auto";

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        width,
        maxWidth: maxWidth || undefined,
        marginLeft,
        marginRight,
      }}
    >
      <div
        style={{
          columnCount: columns,
          columnGap: `${columnGap}px`,
        }}
      >
        {normalized.map((img, idx) => {
          const shown = revealRankByIndex[idx] < visibleCount;

          return (
            <div
              key={img.src || idx}
              style={{
                breakInside: "avoid",
                marginBottom: `${itemGap}px`,
                opacity: shown ? 1 : 0,
              }}
            >
              <img
                src={img.src}
                alt={img.alt || ""}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}