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
        <p className="text-xs text-black">S C R O L L</p>
        <svg
          width={size}
          height={size}
          viewBox="-4 -2 37 20"
          fill="none"
          stroke="black"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex flex-center justify-centeritems-center"
        >
          <path d="M14 7 L23 14 L32 7" />
          <path d="M14 2 L23 9 L32 2" />
        </svg>
      </div>
    </div>
  );
}
