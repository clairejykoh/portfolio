import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import dreaming from "../assets/dreaming.gif";
import daydreaming from "../assets/daydreaming.gif";

const AboutMe = () => {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [isNight, setIsNight] = useState(false);

  useLayoutEffect(() => {
    // time logic
    const hour = new Date().getHours();
    setIsNight(hour >= 0 && hour < 8);

    // GSAP timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      imageRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8 },
    ).fromTo(
      textRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.65", // starts ~0.25s after image begins
    );

    return () => tl.kill();
  }, []);

  const imageSrc = isNight ? dreaming : daydreaming;
  const message = isNight
    ? "I'm probably dreaming right now..."
    : "I'm probably daydreaming right now...";

  return (
    <div className="flex items-center justify-center mt-25 ">
      <div className="flex flex-col lg:flex-row  items-center mix-blend-multiply max-w-[1400px]">
        <img
          ref={imageRef}
          src={imageSrc}
          className="w-1/2 pl-50"
          alt={isNight ? "Dreaming" : "Daydreaming"}
        />
        <p
          ref={textRef}
          className="flex items-center text-base font-italiana w-1/2 pt-5 lg:pt-0 lg:pl-0 pr-0"
        >
          {message}
          <br />
          Please leave me a message at clairejuyeon@gmail.com :)
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
