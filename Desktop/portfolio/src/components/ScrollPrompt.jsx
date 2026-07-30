import { useEffect, useState } from "react";

export default function ScrollPrompt({
  className = "",
  size = 56,
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
        ${visible ? "opacity-80" : "opacity-0"}
        ${className}
      `}
      style={{ transitionDuration: `${fadeMs}ms` }}
    >
      <div className="animate-scroll-float text-center">
        <p className="text-xs text-black justify-center items-center">
          S C R O L L
        </p>
        <p className="text-xs text-black justify-center items-center">
          or press down
        </p>
        <svg
          width={size}
          height={size}
          viewBox="0 -2 38 20"
          fill="none"
          stroke="black"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex flex-center "
        >
          <path d="M18 7 L27 14 L36 7" />
          <path d="M18 2 L27 9 L36 2" />
        </svg>
      </div>
    </div>
  );
}
