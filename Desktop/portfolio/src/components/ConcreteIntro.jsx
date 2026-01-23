import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * FullBleedScrollReveal
 *
 * Requirements implemented:
 * - Full-bleed: no margins/padding, edge-to-edge
 * - Initial state: each image visible at ~10% width (via clip-path)
 * - Top reveals from left, bottom reveals from right
 * - Center text fades/slides in with font-italiana text-3xl
 */
export default function FullBleedScrollReveal({
  imgTopSrc,
  imgBottomSrc,
  title = "Architecture Meets Industrial Design",
}) {
  const sectionRef = useRef(null);
  const topWrapRef = useRef(null);
  const bottomWrapRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial: reveal ~10% width without distorting image
      // Top: show left 10% => right inset 90%
      // Bottom: show right 10% => left inset 90%
      gsap.set(topWrapRef.current, {
        clipPath: "inset(0% 90% 0% 0%)",
        willChange: "clip-path",
      });

      gsap.set(bottomWrapRef.current, {
        clipPath: "inset(0% 0% 0% 90%)",
        willChange: "clip-path",
      });

      gsap.set(textRef.current, {
        autoAlpha: 0,
        x: 64,
        willChange: "transform, opacity",
      });

      // Reveal top image to full width
      gsap.to(topWrapRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top-=10%  top",
          end: "top+=60% top",
          scrub: true,
        },
      });

      // Reveal bottom image to full width (slightly delayed)
      gsap.to(bottomWrapRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top-=10% top",
          end: "top+=60% top",
          scrub: true,
        },
      });

      // Text reveal when section is around mid-viewport (proxy for “images occupy ~half page”)
      gsap.to(textRef.current, {
        autoAlpha: 1,
        x: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top -40%",
          end: "top -80%",
          scrub: true,
        },
      });

      // If anything changes layout after mount (fonts/images/route transitions), refresh triggers
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-screen">
      {/* Scroll space */}
      <div className="relative min-h-[200vh]">
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen w-screen overflow-hidden">
          <div className="relative h-full w-full">
            {/* Top image (full-bleed) */}
            <div ref={topWrapRef} className="h-1/2 w-full overflow-hidden">
              <img
                src={imgTopSrc}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>

            {/* Bottom image (full-bleed) */}
            <div ref={bottomWrapRef} className="h-1/2 w-full overflow-hidden">
              <img
                src={imgBottomSrc}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>

            {/* Center text overlay */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center pb-6">
              <div ref={textRef} className="font-italiana text-4xl text-black">
                {title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}