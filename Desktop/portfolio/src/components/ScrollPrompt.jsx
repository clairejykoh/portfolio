import { useEffect, useState } from "react";

export default function ScrollPrompt({
  className = "",
  size = 44,
  fadeMs = 300,
}) {
  const [visible, setVisible] = useState(
    typeof window !== "undefined" ? window.scrollY < 5 : true,
  );

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY === 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden
      className={`
        pointer-events-none
        fixed
        left-1/2
        bottom-14
        -translate-x-1/2
        z-[100]
        transition-opacity
        ${visible ? "opacity-60" : "opacity-0"}
        ${className}
      `}
      style={{ transitionDuration: `${fadeMs}ms` }}
    >
      <div className="animate-scroll-float">
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 8 L12 14 L20 8" />
          <path d="M4 3 L12 9 L20 3" />
        </svg>
      </div>
    </div>
  );
}
