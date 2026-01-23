import { useEffect, useRef } from "react";

export default function ScrollAutoplayVideo({
  src,
  poster,
  muted = true,
  loop = false,
  className = "",
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { 
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        root: null,       // viewport
        threshold: 0,     // any pixel visible
        rootMargin: "0px" // DO NOT CHANGE
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted={muted}
      loop={loop}
      playsInline
      preload="metadata"
      className={className}
    />
  );
}