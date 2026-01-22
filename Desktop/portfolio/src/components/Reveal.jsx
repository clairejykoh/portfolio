import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 10 });

    const t = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay,
      clearProps: "transform",
    });

    return () => t.kill();
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}