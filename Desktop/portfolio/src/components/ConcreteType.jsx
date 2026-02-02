// ConcreteType.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * ConcreteType
 * - Sticky background video pinned for the full section height.
 * - Overlay slides up ONCE progress crosses overlayStartAt (CSS transition),
 *   and reverses when you scroll back above overlayStartAt.
 * - Adds an optional rest gap before overlay via overlayStartAt.
 * - Typing is scroll-scrubbed + strictly sequential (one sentence at a time).
 * - Typing starts after overlay is up by default (typeStartAt derived), and ends at typeEndAt.
 * - postTypeHoldSpan extends the section height to "rest" after typing finishes.
 */

export default function ConcreteType({
  videoSrc = "/videos/hero.mp4",
  poster = "",
  heightVh = 220,
  stickyTop = 0,

  justify = "center",

  headline = "Typing is a Multisensory Experience.",
  lines = ["It's Visual", "It's Auditory", "It's Tactile"],

  // --- Overlay trigger + animation ---
  overlayStartAt = 0.18, // rest on raw video until this progress
  overlaySlideMs = 650, // duration of slide up/down (ms)
  overlayBg = "rgba(0,0,0,0.65)",

  // --- Typing timing (0..1 section progress, after hold-scaling) ---
  // If null, derived as overlayStartAt + typeRestSpan (clamped)
  typeStartAt = null,
  typeRestSpan = 0.1, // rest after overlay triggers before typing starts
  typeEndAt = 0.92, // later = slower typing (more scroll distance), must be > start
  postTypeHoldSpan = 0.08, // extends section height for a hold after typing

  // Layout
  maxWidthClass = "max-w-4xl",
  className = "",

  // Positioning
  headlineOffsetY = -48,
  subBlockOffsetY = 200,
}) {
  const sectionRef = useRef(null);
  const [rawProgress, setRawProgress] = useState(0);

  // Extend effective progress to include post-typing hold
  const progress = useMemo(() => {
    const totalSpan = 1 + Math.max(0, postTypeHoldSpan);
    return clamp01(rawProgress * totalSpan);
  }, [rawProgress, postTypeHoldSpan]);

  // Measure scroll progress 0..1 across section height
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;

        const total = rect.height - vh;
        const traveled = -rect.top;
        const p = total <= 0 ? (rect.top <= 0 ? 1 : 0) : traveled / total;

        setRawProgress(prefersReduced ? 1 : clamp01(p));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Alignment
  const alignClass = useMemo(() => {
    if (justify === "left") return "items-start text-left";
    if (justify === "right") return "items-end text-right";
    return "items-center text-center";
  }, [justify]);

  // Overlay: trigger + reverse (NOT scrubbed)
  const [overlayUp, setOverlayUp] = useState(false);
  useEffect(() => {
    setOverlayUp(progress >= overlayStartAt);
  }, [progress, overlayStartAt]);

  // Derived typing start: default is after overlay triggers + rest span
  const derivedTypeStartAt = useMemo(() => {
    const base = overlayStartAt + typeRestSpan;
    return clamp01(typeStartAt == null ? base : typeStartAt);
  }, [overlayStartAt, typeRestSpan, typeStartAt]);

  // --- Scroll-scrubbed sequential typing (one sentence at a time) ---
  const sentences = useMemo(() => [headline, ...lines], [headline, lines]);
  const lens = useMemo(() => sentences.map((s) => s.length), [sentences]);
  const steps = sentences.length;

  const typingLocal = useMemo(() => {
    const end = Math.max(derivedTypeStartAt + 0.001, clamp01(typeEndAt));
    return normalize(progress, derivedTypeStartAt, end);
  }, [progress, derivedTypeStartAt, typeEndAt]);

  const stepFloat = useMemo(() => typingLocal * steps, [typingLocal, steps]);
  const activeStep = useMemo(
    () => clampInt(Math.floor(stepFloat), 0, steps - 1),
    [stepFloat, steps],
  );
  const activeT = useMemo(
    () => clamp01(stepFloat - activeStep),
    [stepFloat, activeStep],
  );

  const shown = useMemo(() => {
    const out = new Array(steps).fill(0);
    for (let i = 0; i < steps; i++) {
      if (i < activeStep) out[i] = lens[i];
      else if (i === activeStep)
        out[i] = Math.round(lens[i] * easeOutCubic(activeT));
      else out[i] = 0;
    }
    return out;
  }, [steps, activeStep, lens, activeT]);

  const headlineShown = shown[0] ?? 0;
  const linesShown = shown.slice(1);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full ${className}`}
      style={{
        height: `${heightVh * (1 + Math.max(0, postTypeHoldSpan))}vh`,
      }}
    >
      <div
        className="sticky left-0 w-full"
        style={{ top: stickyTop, height: "100vh" }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <video
            className="h-full w-full object-cover"
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />

          {/* Overlay: triggered animation with reverse */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: overlayBg,
              transform: overlayUp ? "translateY(0%)" : "translateY(100%)",
              transition: `transform ${overlaySlideMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
              willChange: "transform",
            }}
          />

          {/* Text */}
          <div className="absolute inset-0 px-6 pb-0">
            <div className="relative h-full w-full">
              {/* Headline */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: `translateY(${headlineOffsetY}px)` }}
              >
                <div className={`flex w-full ${maxWidthClass} ${alignClass}`}>
                  <h2 className="font-inter font-light text-3xl md:text-5xl leading-tight text-white">
                    <TypeReveal text={headline} shown={headlineShown} />
                  </h2>
                </div>
              </div>

              {/* Subheadlines */}
              <div
                className="absolute left-0 right-0 flex justify-center pt-55"
                style={{
                  top: "40%",
                  transform: `translateY(calc(-50% + ${subBlockOffsetY}px))`,
                }}
              >
                <div
                  className={`flex w-full ${maxWidthClass} flex-col ${alignClass}`}
                >
                  <div className="space-y-5 text-white/90">
                    {lines.map((t, i) => (
                      <p
                        key={t + i}
                        className="font-inter font-extralight text-base md:text-2xl tracking-wide"
                      >
                        <TypeReveal text={t} shown={linesShown[i] ?? 0} />
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Optional vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function TypeReveal({ text, shown }) {
  const n = Math.max(0, Math.min(text.length, shown));
  const visible = text.slice(0, n);
  const hidden = text.slice(n);

  return (
    <span aria-label={text} className="inline-block leading-none">
      <span>{visible}</span>
      <span style={{ opacity: 0 }} aria-hidden="true">
        {hidden}
      </span>
    </span>
  );
}

function normalize(x, a, b) {
  if (b === a) return x >= b ? 1 : 0;
  return clamp01((x - a) / (b - a));
}
function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
function clampInt(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}
function easeOutCubic(t) {
  t = clamp01(t);
  return 1 - Math.pow(1 - t, 3);
}
