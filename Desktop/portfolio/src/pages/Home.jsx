import React, { useEffect } from "react";
import Video from "../components/Video";
import ScrollPrompt from "../components/ScrollPrompt";

const Home = () => {
  useEffect(() => {
    document.documentElement.classList.add("hero-page"); // <html>
    document.body.classList.add("hero-page"); // <body>
    return () => {
      document.documentElement.classList.remove("hero-page");
      document.body.classList.remove("hero-page");
    };
  }, []);
  return (
    <>
      <Video
        frameCount={1320} // <-- set this to your actual number of frames
        pxPerFrame={11} // slower/faster scrub
        windowSize={200} // preload range
        friction={0.01} // inertia feel
        startFrame={0}
      />

      <ScrollPrompt className="text-neutral-400" />
    </>
  );
};

export default Home;
