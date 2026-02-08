import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ConcreteIntro({
  imgTopSrc,
  imgBottomSrc,
  title = "Architecture Meets Industrial Design",

  // How long the pin lasts (increase if you want slower reveal)
  pinDistance = 1200, // px of scroll while pinned

  // Cursor
  showCaret = true,
  caret = "|",
  caretBlinkMs = 500,
}) {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const topWrapRef = useRef(null);
  const bottomWrapRef = useRef(null);

  const textMeasureRef = useRef(null);

  const [charCount, setCharCount] = useState(0);
  const [caretOn, setCaretOn] = useState(true);
  const [caretX, setCaretX] = useState(0);

  const totalChars = title.length;

  const caretWidth = useMemo(() => "1ch", []);

  useLayoutEffect(() => {
    const TYPE_START_PROGRESS = 0.45; // 0–1, higher = later start

    const ctx = gsap.context(() => {
      // Initial masks:
      // Upper reveals FROM RIGHT (right 10% visible)
      gsap.set(topWrapRef.current, {
        clipPath: "inset(0% 0% 0% 90%)",
        willChange: "clip-path",
      });

      // Lower reveals FROM LEFT (left 10% visible)
      gsap.set(bottomWrapRef.current, {
        clipPath: "inset(0% 90% 0% 0%)",
        willChange: "clip-path",
      });

      // One pinned, scrubbed timeline controls everything.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${pinDistance}`, // pin releases when timeline ends
          scrub: true,
          pin: pinRef.current, // keeps the viewport sticky
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Images expand to full width across the pinned scroll.
      // If you want bottom to finish later, stagger its start slightly.
      tl.to(
        topWrapRef.current,
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
        0,
      );

      tl.to(
        bottomWrapRef.current,
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
        0, // slight delay so it feels sequential; set to 0 for perfectly in-sync
      );

      // Scrubbed typing tied to timeline progress (no separate ScrollTrigger).
      // Map timeline progress (0..1) to char count.
      tl.eventCallback("onUpdate", () => {
        const st = tl.scrollTrigger;
        if (!st) return;

        const p = st.progress;

        if (p <= TYPE_START_PROGRESS) {
          setCharCount(0);
          return;
        }

        const localProgress =
          (p - TYPE_START_PROGRESS) / (1 - TYPE_START_PROGRESS);

        const n = Math.round(localProgress * totalChars);
        setCharCount((prev) => (prev === n ? prev : n));
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [pinDistance, totalChars]);

  // caret blink (visual only)
  useLayoutEffect(() => {
    if (!showCaret) return;
    const id = window.setInterval(
      () => setCaretOn((v) => !v),
      Math.max(120, caretBlinkMs),
    );
    return () => window.clearInterval(id);
  }, [showCaret, caretBlinkMs]);

  // caret positioning by measuring revealed substring width
  useLayoutEffect(() => {
    const measurer = textMeasureRef.current;
    if (!measurer) return;
    const w = measurer.getBoundingClientRect().width;
    setCaretX(w);
  }, [charCount, title]);

  const visibleText = title.slice(0, charCount);

  return (
    <section ref={sectionRef} className="relative w-screen">
      {/* This element gets pinned */}
      <div ref={pinRef} className="h-screen w-screen overflow-hidden">
        <div className="relative h-full w-full">
          <div ref={topWrapRef} className="h-1/2 w-full overflow-hidden">
            <img
              src={imgTopSrc}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>

          <div ref={bottomWrapRef} className="h-1/2 w-full overflow-hidden">
            <img
              src={imgBottomSrc}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center pb-8">
            <div
              className="relative inline-block font-inter text-5xl font-medium leading-none text-black"
              aria-label={title}
            >
              <span>{visibleText}</span>

              <span
                ref={textMeasureRef}
                className="absolute left-0 top-0 opacity-0 pointer-events-none whitespace-pre"
                aria-hidden="true"
              >
                {visibleText}
              </span>

              {showCaret && (
                <span
                  aria-hidden="true"
                  className="absolute"
                  style={{
                    left: caretX,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: caretWidth,
                    opacity:
                      caretOn && (charCount > 0 || visibleText.length === 0)
                        ? 1
                        : 0,
                  }}
                >
                  {caret}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Extra scroll after unpin (optional). Remove if you want it to end immediately. */}
    </section>
  );
}
