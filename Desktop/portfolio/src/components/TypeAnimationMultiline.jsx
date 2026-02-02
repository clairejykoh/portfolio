// StickyScrollTypeSentence.jsx
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/**
 * StickyScrollTypeSentence
 * - Wrapper creates scroll distance (heightVh)
 * - Inner panel is sticky (stays on screen) while you scroll through the wrapper
 * - Sentence "types" based on scroll progress through the wrapper
 * - Typing starts the first time the wrapper enters the viewport
 *
 * Props:
 * - text: string
 * - heightVh: scroll length for the sticky section (e.g. 200 => 200vh)
 * - startAt/endAt: map scroll progress -> typing progress
 * - once: if true, typing never reverses on scroll up
 * - className: wrapper classes
 * - panelClassName: sticky panel classes
 * - textClassName: sentence classes
 */
export default function TypeAnimationMultiline({
  text = "Architecture meets interaction design.",
  heightVh = 200,
  startAt = 0.05,
  endAt = 0.9,
  once = false,
  className = "",
  panelClassName = "",
  textClassName = "",
}) {
  const wrapRef = useRef(null);
  const armedRef = useRef(false);
  const maxCountRef = useRef(0);
  const [isArmed, setIsArmed] = useState(false);
  const [count, setCount] = useState(0);

  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const invLerp = (a, b, v) => (v - a) / (b - a);

  // Arm once: first time the wrapper shows on screen
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !armedRef.current) {
          armedRef.current = true;
          setIsArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll-scrub typing while sticky section is in play
  useLayoutEffect(() => {
    if (!isArmed) return;

    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;
    let last = -1;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // For a sticky section:
      // progress = 0 when wrapper top hits viewport top (sticky starts)
      // progress = 1 when wrapper bottom hits viewport top (sticky ends)
      const scrollable = Math.max(1, rect.height - vh);
      const raw = -rect.top / scrollable;
      const progress = clamp01(raw);

      const t = clamp01(invLerp(startAt, endAt, progress));
      const target = Math.round(t * text.length);

      const nextCount = once ? Math.max(maxCountRef.current, target) : target;
      if (once) maxCountRef.current = nextCount;

      if (nextCount !== last) {
        last = nextCount;
        setCount(nextCount);
      }

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [isArmed, text, startAt, endAt, once]);

  const typed = useMemo(() => text.slice(0, count), [text, count]);

  return (
    <section
      ref={wrapRef}
      className={`relative w-full ${className}`}
      style={{ height: `${heightVh}vh` }}
    >
      <div
        className={`sticky top-0 w-full h-screen flex items-center justify-center ${panelClassName}`}
      >
        <div className={`text-center ${textClassName}`}>{typed}</div>
      </div>
    </section>
  );
}
