import React, { useEffect, useMemo, useRef, useState } from "react";

export default function TypeAnimation({
  text = "",
  as: Tag = "div",
  className = "",
  typeMs = 35,
  startDelayMs = 0,

  threshold = 0.25,
  rootMargin = "0px 0px -10% 0px",

  once = true,
  replayOnReenter = false,

  showCaret = true,
  caret = "|",
  caretBlinkMs = 500,

  respectReducedMotion = true,
}) {
  const elRef = useRef(null);
  const timerRef = useRef(null);
  const blinkRef = useRef(null);

  // NEW: measure + caret positioning
  const measureRef = useRef(null);
  const [caretX, setCaretX] = useState(0);
  const caretWidth = useMemo(() => "1ch", []); // stable reserved caret width

  const [isInView, setIsInView] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [i, setI] = useState(0);
  const [caretOn, setCaretOn] = useState(true);

  const prefersReducedMotion = useMemo(() => {
    if (!respectReducedMotion) return false;
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, [respectReducedMotion]);

  // Observe visibility
  useEffect(() => {
    const node = elRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => setIsInView(entries[0]?.isIntersecting ?? false),
      { threshold, rootMargin }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  // Caret blink
  useEffect(() => {
    if (!showCaret) return;

    blinkRef.current && clearInterval(blinkRef.current);
    blinkRef.current = setInterval(
      () => setCaretOn((v) => !v),
      Math.max(120, caretBlinkMs)
    );

    return () => {
      if (blinkRef.current) clearInterval(blinkRef.current);
      blinkRef.current = null;
    };
  }, [showCaret, caretBlinkMs]);

  // Typing control (delay + start)
  useEffect(() => {
    if (prefersReducedMotion) {
      if (isInView && (!once || !hasPlayed)) {
        setI(text.length);
        setHasPlayed(true);
      } else if (!isInView && replayOnReenter) {
        setI(0);
        setHasPlayed(false);
      }
      return;
    }

    if (once && hasPlayed) {
      if (!isInView && replayOnReenter) {
        setI(0);
        setHasPlayed(false);
      }
      return;
    }

    if (!isInView) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;

      if (replayOnReenter) {
        setI(0);
        setHasPlayed(false);
      }
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setI((prev) => {
        const next = Math.min(text.length, prev + 1);
        if (next >= text.length) setHasPlayed(true);
        return next;
      });
    }, Math.max(0, startDelayMs || 0));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isInView,
    i,
    text,
    typeMs,
    startDelayMs,
    once,
    hasPlayed,
    replayOnReenter,
    prefersReducedMotion,
  ]);

  // Actual typing loop tick
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!isInView) return;
    if ((once && hasPlayed) || i >= text.length) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setI((prev) => {
        const next = Math.min(text.length, prev + 1);
        if (next >= text.length) setHasPlayed(true);
        return next;
      });
    }, Math.max(10, typeMs));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [i, text.length, typeMs, isInView, once, hasPlayed, prefersReducedMotion]);

  const visibleText = text.slice(0, i);

  // NEW: measure visible text width to position caret (no layout shift)
  useEffect(() => {
    if (!showCaret) return;
    const m = measureRef.current;
    if (!m) return;
    const w = m.getBoundingClientRect().width;
    setCaretX(w);
  }, [visibleText, showCaret]);

  return (
    <Tag ref={elRef} className={className} aria-label={text}>
      {/* relative wrapper so caret can be absolutely positioned */}
      <span className="relative inline-block" aria-hidden="true">
        {/* visible text */}
        <span>{visibleText}</span>

        {/* hidden measurer: same font/size, measures visibleText width */}
        <span
          ref={measureRef}
          className="absolute left-0 top-0 opacity-0 pointer-events-none"
        >
          {visibleText}
        </span>

        {/* overlay caret: does not affect layout */}
        {showCaret && (
          <span
            className="absolute top-0"
            style={{
              left: caretX,
              width: caretWidth,
              opacity: caretOn ? 1 : 0,
            }}
          >
            {caret}
          </span>
        )}
      </span>
    </Tag>
  );
}