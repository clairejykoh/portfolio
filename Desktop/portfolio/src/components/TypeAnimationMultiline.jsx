import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * TypeAnimationMultiline (auto-type + scroll boost)
 * - Starts typing immediately on mount (no IntersectionObserver).
 * - Scroll increases typing speed temporarily (based on scroll velocity).
 * - Types line-by-line (next line starts after previous completes).
 * - Optional caret for the active line only (no layout shift).
 *
 * Usage:
 * <TypeAnimationMultiline
 *   lines={[
 *     "Typing is a Multisensory Experience.",
 *     "It's Visual",
 *     "It's Auditory",
 *     "And It's Tactile",
 *   ]}
 *   className="font-italiana text-3xl w-full"
 *   justify="center"
 *   typeMs={28}
 *   scrollBoostMax={6}
 * />
 */
export default function TypeAnimationMultiline({
  // Back-compat single line:
  text = "",
  // Multi-line:
  lines = null,

  as: Tag = "div",
  className = "",

  // Base typing speed
  typeMs = 25,
  startDelayMs = 0,

  // Behavior
  once = true,

  // Caret
  showCaret = true,
  caret = "|",
  caretBlinkMs = 500,

  // Alignment
  justify = "left", // "left" | "center" | "right"

  // Accessibility
  respectReducedMotion = true,

  // Spacing between lines (Tailwind)
  lineWrapperClassName = "space-y-3",

  // Scroll boost tuning
  // speedFactor ranges from 1..scrollBoostMax, where effective delay = typeMs / speedFactor
  scrollBoostMax = 6,
  // how quickly boost decays back to 1 after scroll stops (ms)
  scrollDecayMs = 220,
  // sensitivity of boost vs scroll velocity (bigger = boosts easier)
  scrollBoostSensitivity = 0.012,
  // optionally pass a scrolling element; defaults to window
  scrollEl = null,
}) {
  const timerRef = useRef(null);
  const blinkRef = useRef(null);

  const caretWidth = useMemo(() => "1ch", []);

  // per-line typed counts
  const [counts, setCounts] = useState([]);
  const [hasPlayed, setHasPlayed] = useState(false);

  // caret blink
  const [caretOn, setCaretOn] = useState(true);

  // scroll speed factor state
  const [speedFactor, setSpeedFactor] = useState(1);
  const speedFactorRef = useRef(1);
  useEffect(() => {
    speedFactorRef.current = speedFactor;
  }, [speedFactor]);

  const prefersReducedMotion = useMemo(() => {
    if (!respectReducedMotion) return false;
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
    );
  }, [respectReducedMotion]);

  const contentLines = useMemo(() => {
    if (Array.isArray(lines) && lines.length)
      return lines.map((s) => String(s ?? ""));
    return [String(text ?? "")];
  }, [lines, text]);

  // init/reset counts when lines change
  useEffect(() => {
    setCounts(contentLines.map(() => 0));
    setHasPlayed(false);
  }, [contentLines]);

  const justifyClass =
    justify === "center"
      ? "text-center"
      : justify === "right"
        ? "text-right"
        : "text-left";

  const wrapperJustify =
    justify === "center"
      ? "justify-center"
      : justify === "right"
        ? "justify-end"
        : "justify-start";

  // Caret blink
  useEffect(() => {
    if (!showCaret) return;

    blinkRef.current && clearInterval(blinkRef.current);
    blinkRef.current = setInterval(
      () => setCaretOn((v) => !v),
      Math.max(120, caretBlinkMs),
    );

    return () => {
      if (blinkRef.current) clearInterval(blinkRef.current);
      blinkRef.current = null;
    };
  }, [showCaret, caretBlinkMs]);

  // Helpers
  const allDone = useMemo(() => {
    if (!contentLines.length) return true;
    for (let idx = 0; idx < contentLines.length; idx++) {
      if ((counts[idx] ?? 0) < contentLines[idx].length) return false;
    }
    return true;
  }, [counts, contentLines]);

  const activeLineIndex = useMemo(() => {
    for (let idx = 0; idx < contentLines.length; idx++) {
      if ((counts[idx] ?? 0) < contentLines[idx].length) return idx;
    }
    return contentLines.length - 1;
  }, [counts, contentLines]);

  // Scroll -> temporary speed boost (with decay)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const targetEl = scrollEl ?? window;

    let lastY = getScrollY(targetEl);
    let lastT = performance.now();

    let decayRaf = 0;
    let lastScrollEventT = 0;

    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

    const scheduleDecay = () => {
      cancelAnimationFrame(decayRaf);
      const tick = () => {
        const now = performance.now();
        const dt = now - lastScrollEventT;

        // decay back to 1 over scrollDecayMs
        const k = clamp(dt / Math.max(1, scrollDecayMs), 0, 1);
        const next = lerp(speedFactorRef.current, 1, k);

        // avoid micro-updates near 1
        if (Math.abs(next - 1) < 0.01) {
          setSpeedFactor(1);
          speedFactorRef.current = 1;
          return;
        }

        setSpeedFactor(next);
        speedFactorRef.current = next;
        decayRaf = requestAnimationFrame(tick);
      };

      decayRaf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const now = performance.now();
      const y = getScrollY(targetEl);

      const dy = Math.abs(y - lastY);
      const dt = Math.max(1, now - lastT); // ms

      // px per ms
      const v = dy / dt;

      // map velocity -> boost
      // boost = 1 + (v / sensitivity), clamped to [1, scrollBoostMax]
      const boost = clamp(
        1 + v / Math.max(1e-6, scrollBoostSensitivity),
        1,
        scrollBoostMax,
      );

      // smooth a bit so it doesn’t jitter
      const smoothed = lerp(speedFactorRef.current, boost, 0.35);

      setSpeedFactor(smoothed);
      speedFactorRef.current = smoothed;

      lastY = y;
      lastT = now;
      lastScrollEventT = now;

      scheduleDecay();
    };

    targetEl.addEventListener?.("scroll", onScroll, { passive: true });

    return () => {
      targetEl.removeEventListener?.("scroll", onScroll);
      cancelAnimationFrame(decayRaf);
    };
  }, [scrollEl, scrollBoostMax, scrollDecayMs, scrollBoostSensitivity]);

  // Typing loop (single scheduler). Auto-starts; scroll affects speedFactor.
  useEffect(() => {
    if (prefersReducedMotion) {
      // If reduced motion, just show everything.
      setCounts(contentLines.map((l) => l.length));
      setHasPlayed(true);
      return;
    }

    // stop if done
    if (allDone) {
      if (!hasPlayed) setHasPlayed(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
      return;
    }

    // respect "once"
    if (once && hasPlayed) return;

    const baseDelay = Math.max(10, typeMs);
    const sf = Math.max(1, speedFactorRef.current);
    const delay = Math.max(8, Math.round(baseDelay / sf));

    // schedule next tick
    if (timerRef.current) clearTimeout(timerRef.current);

    const isFirstCharEver = counts.every((c) => (c ?? 0) === 0);
    const initialDelay = isFirstCharEver ? Math.max(0, startDelayMs || 0) : 0;

    timerRef.current = setTimeout(() => {
      setCounts((prev) => {
        const next = [...prev];
        const idx = activeLineIndexFromCounts(prev, contentLines);
        if (idx < 0) return next;

        next[idx] = Math.min(contentLines[idx].length, (next[idx] ?? 0) + 1);

        // if we just finished everything
        const doneNow = next.every(
          (c, i) => (c ?? 0) >= contentLines[i].length,
        );
        if (doneNow) setHasPlayed(true);

        return next;
      });
    }, initialDelay || delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
    };
    // Note: include counts to keep loop running; speedFactor affects delay via ref
  }, [
    counts,
    contentLines,
    typeMs,
    startDelayMs,
    prefersReducedMotion,
    allDone,
    once,
    hasPlayed,
  ]);

  // Caret measurement (active line only)
  const measureRefs = useRef([]);
  const [caretXs, setCaretXs] = useState([]);

  useEffect(() => {
    setCaretXs(contentLines.map(() => 0));
  }, [contentLines]);

  useEffect(() => {
    if (!showCaret) return;

    const raf = requestAnimationFrame(() => {
      const xs = contentLines.map((_, idx) => {
        const m = measureRefs.current[idx];
        if (!m) return 0;
        return m.getBoundingClientRect().width;
      });
      setCaretXs(xs);
    });

    return () => cancelAnimationFrame(raf);
  }, [counts, contentLines, showCaret]);

  return (
    <Tag
      className={`${className} ${justifyClass}`}
      aria-label={contentLines.join(" ")}
    >
      <div className={`flex ${wrapperJustify}`}>
        <div className={`relative ${lineWrapperClassName}`}>
          {contentLines.map((line, idx) => {
            const visible = line.slice(0, counts[idx] ?? 0);
            const isActive = !allDone && idx === activeLineIndex;

            return (
              <div key={idx} className="relative">
                <span className="relative inline-block" aria-hidden="true">
                  <span>{visible}</span>

                  <span
                    ref={(node) => {
                      measureRefs.current[idx] = node;
                    }}
                    className="absolute left-0 top-0 opacity-0 pointer-events-none whitespace-pre"
                    aria-hidden="true"
                  >
                    {visible}
                  </span>

                  {showCaret && isActive && (
                    <span
                      className="absolute top-0"
                      style={{
                        left: caretXs[idx] ?? 0,
                        width: caretWidth,
                        opacity: caretOn ? 1 : 0,
                      }}
                      aria-hidden="true"
                    >
                      {caret}
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Tag>
  );
}

function activeLineIndexFromCounts(counts, lines) {
  for (let i = 0; i < lines.length; i++) {
    if ((counts[i] ?? 0) < lines[i].length) return i;
  }
  return -1;
}

function getScrollY(el) {
  if (!el || el === window) return window.scrollY || window.pageYOffset || 0;
  return el.scrollTop || 0;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}
