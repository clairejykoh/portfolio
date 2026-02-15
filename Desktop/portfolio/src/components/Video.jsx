// WebpScrollSequence.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const messages = [
  [
    { text: "Hi! I'm a ", variant: "base" },
    { text: "REGISTERED ARCHITECT ", variant: "accent" },
    {
      text: "specializing in Urban Planning and Infrastructure Design",
      variant: "base",
    },
  ],
  [
    { text: "and a ", variant: "base" },
    { text: "MULTIMEDIA DESIGNER ", variant: "accent" },
    { text: "proficient in \n", variant: "base" },
    { text: "3D MODELING, RENDERING, ", variant: "accent" },
    { text: "and \n", variant: "base" },
    { text: "MOTION GRAPHICS", variant: "accent" },
  ],
  [
    { text: "I like to combine my knowledge in ", variant: "base" },
    { text: "ARCHITECTURE ", variant: "accent" },
    { text: "and ", variant: "base" },
    { text: "3D MODELING ", variant: "accent" },
    {
      text: "and challenge the limit of physical world through \n",
      variant: "base",
    },
    { text: "VIRTUAL WORLD BUILDING ", variant: "accent" },
  ],
  [
    {
      text: "I experiment with building materials through various methods of ",
      variant: "base",
    },
    { text: "FABRICATION ", variant: "accent" },
    { text: "and \n", variant: "base" },
    { text: "INDUSTRIAL DESIGN.", variant: "accent" },
  ],
  [
    { text: "and with digital information through \n", variant: "base" },
    {
      text: "GRAPHIC DESIGN, INTERACTION DESIGN AND PROGRAMMING,",
      variant: "accent",
    },
  ],
  [
    { text: "and bring the best of both worlds through", variant: "base" },
    { text: " PHYSICAL COMPUTING.", variant: "accent" },
  ],
  [
    {
      text: "And while doing so, consider the intersection of ",
      variant: "base",
    },
    { text: "SPIRITUAL AND DESIGN/TECHNICAL \n", variant: "accent" },
    { text: "in the context of built space", variant: "base" },
  ],
  [
    {
      text: "My skills span across multiple layers of expertise",
      variant: "base",
    },
  ],
  [
    {
      text: "My goal is to design interactions with different types and layers of reality in a 3D space",
      variant: "base",
    },
  ],
  [{ text: "I'm only at the beginning. To be continued!", variant: "base" }],
];

// 0-based frame windows
const BOX_KEYFRAMES_0BASED = [
  { enter: 0, exit: 160 }, // Architecture
  { enter: 172, exit: 335 }, // Multimedia Design
  { enter: 347, exit: 440 }, // Architecture + 3D Modeling + Virtual World Building
  { enter: 452, exit: 540 }, // Fabrication + Industrial Design
  { enter: 552, exit: 630 }, // Graphic Design, Interaction Design and Programming
  { enter: 642, exit: 790 }, // Physical Computing
  { enter: 802, exit: 970 }, // Spiritual and Design/Technical
  { enter: 982, exit: 1080 }, // Multiple Layers of Expertise
  { enter: 1092, exit: 1210 }, // Different Types and Layers of Reality in a 3D Space
  { enter: 1222, exit: 1315 }, // To be continued
];

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const clamp01 = (v) => clamp(v, 0, 1);
const smoothstep = (a, b, x) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export default function Video({
  frameCount = 1321,
  fileStart = 0,
  imagesBase = "/portfolio/images",

  pxPerFrame = 6,
  windowSize = 140,

  // float
  floatAmp = 10,
  floatHz = 0.9,

  // letterboxes
  fadeFrames = 18,

  // NEW: slide-out tuning (independent of scroll)
  slideOutFrames = 18, // how long (in frames) the upward slide lasts near exit
  slideOutPx = 90, // how far (px) the box slides upward by exit

  // intro
  introInSec = 0.75,
  introHoldSec = 0.35,

  // inertia
  stiffness = 180,
  damping = 28,
  maxVel = 4.0,
}) {
  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const barRef = useRef(null);

  const boxesRef = useRef([]);
  const ctaRef = useRef(null);

  const rafRef = useRef(0);
  const maxScrollRef = useRef(1);

  const cacheRef = useRef(new Map());
  const inflightRef = useRef(new Set());

  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState("");

  const introDoneRef = useRef(false);

  // Inertial state in normalized progress space [0..1]
  const targetPRef = useRef(0);
  const pRef = useRef(0);
  const vRef = useRef(0);

  const scrollPromptRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const urlForFrame = useMemo(() => {
    return (frameIdx) => `${imagesBase}/${fileStart + frameIdx}.webp`;
  }, [imagesBase, fileStart]);

  const getFontClass = (variant) =>
    variant === "accent" ? "font-inter" : "font-italiana";

  useEffect(() => {
    const track = trackRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    const bar = barRef.current;

    if (!track || !canvas || !stage || !bar) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      maxScrollRef.current = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
    };

    const setTrackHeight = () => {
      const scrollLen = frameCount * pxPerFrame;
      track.style.height = `${scrollLen + window.innerHeight}px`;
      resize();
    };

    const drawCover = (asset) => {
      if (!asset) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      const iw = asset.width || asset.naturalWidth || 1920;
      const ih = asset.height || asset.naturalHeight || 1080;

      const scale = Math.max(w / iw, h / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2;

      ctx.fillStyle = "#fff"; // or your intended background
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(asset, dx, dy, dw, dh);
    };

    const loadFrame = async (frameIdx) => {
      if (frameIdx < 0 || frameIdx >= frameCount) return null;
      if (cacheRef.current.has(frameIdx)) return cacheRef.current.get(frameIdx);
      if (inflightRef.current.has(frameIdx)) return null;

      inflightRef.current.add(frameIdx);
      const url = urlForFrame(frameIdx);

      try {
        const img = new Image();
        img.decoding = "async";
        img.src = url;

        await (img.decode
          ? img.decode()
          : new Promise((res, rej) => {
              img.onload = res;
              img.onerror = rej;
            }));

        let asset = img;
        if ("createImageBitmap" in window) {
          try {
            asset = await createImageBitmap(img);
          } catch {
            asset = img;
          }
        }

        cacheRef.current.set(frameIdx, asset);
        inflightRef.current.delete(frameIdx);
        return asset;
      } catch {
        inflightRef.current.delete(frameIdx);
        return null;
      }
    };

    const primeWindow = (centerIdx) => {
      const start = Math.max(0, centerIdx - windowSize);
      const end = Math.min(frameCount - 1, centerIdx + windowSize);

      for (let i = start; i <= end; i++) {
        if (!cacheRef.current.has(i) && !inflightRef.current.has(i))
          loadFrame(i);
      }

      const trimBand = windowSize * 2;
      for (const k of cacheRef.current.keys()) {
        if (k < centerIdx - trimBand || k > centerIdx + trimBand) {
          const asset = cacheRef.current.get(k);
          if (asset && typeof asset.close === "function") asset.close();
          cacheRef.current.delete(k);
        }
      }
    };

    // Alpha: fade-in ends at enter, fade-out ends at exit
    const boxAlphaForFrame = (frameIdx, enter, exit) => {
      if (frameIdx < enter || frameIdx > exit) return 0;
      const aIn = smoothstep(enter - fadeFrames, enter, frameIdx);
      const aOut = 1 - smoothstep(exit - fadeFrames, exit, frameIdx);
      return aIn * aOut;
    };

    // NEW: slide-up amount near exit (0 -> slideOutPx)
    const slideUpForExit = (frameIdx, exit) => {
      // starts sliding at (exit - slideOutFrames), ends at exit
      const t = smoothstep(exit - slideOutFrames, exit, frameIdx);
      return t * slideOutPx;
    };

    // Letterboxes: Y NOT tied to scroll.
    // They sit centered; near exit they slide up, while alpha fades out.
    const applyLetterboxes = (frameIdx) => {
      if (!introDoneRef.current) return;

      for (let i = 0; i < messages.length; i++) {
        const el = boxesRef.current[i];
        if (!el) continue;

        const k = BOX_KEYFRAMES_0BASED[i];
        const alpha = k ? boxAlphaForFrame(frameIdx, k.enter, k.exit) : 0;

        if (alpha <= 0.001) {
          gsap.set(el, { autoAlpha: 0 });
          continue;
        }

        const centerY = window.innerHeight / 2 - el.offsetHeight / 2;
        const slideUp = k ? slideUpForExit(frameIdx, k.exit) : 0;

        gsap.set(el, {
          autoAlpha: alpha,
          y: centerY - slideUp,
        });
      }

      if (ctaRef.current) {
        const show = frameIdx >= frameCount - 1;
        const centerY = window.innerHeight / 2;
        gsap.set(ctaRef.current, {
          autoAlpha: show ? 1 : 0,
          y: centerY,
        });
      }
    };

    const renderFrameIdx = (frameIdx) => {
      const asset = cacheRef.current.get(frameIdx);
      if (asset) {
        drawCover(asset);
        if (!ready) setReady(true);
      } else {
        loadFrame(frameIdx).then((a) => {
          if (a) {
            drawCover(a);
            if (!ready) setReady(true);
          }
        });
      }
      primeWindow(frameIdx);
    };

    const setProgressBarByP = (p) => {
      bar.style.transform = `scaleX(${clamp01(p)})`;
    };

    // intro: slide up first box (intro animation still exists, but after intro we control via applyLetterboxes)
    const runIntro = () => {
      const box0 = boxesRef.current[0];
      if (!box0) return;

      boxesRef.current.forEach(
        (b, i) => b && gsap.set(b, { autoAlpha: i === 0 ? 1 : 0 }),
      );
      if (ctaRef.current) gsap.set(ctaRef.current, { autoAlpha: 0 });

      const centerY = window.innerHeight / 2 - box0.offsetHeight / 2;
      gsap.killTweensOf(box0);
      gsap.fromTo(
        box0,
        { y: window.innerHeight + 220, autoAlpha: 1 },
        { y: centerY, duration: introInSec, ease: "power2.out" },
      );

      gsap.delayedCall(introInSec + introHoldSec, () => {
        introDoneRef.current = true;

        pRef.current = 0;
        targetPRef.current = 0;
        vRef.current = 0;

        renderFrameIdx(0);
        setProgressBarByP(0);
        applyLetterboxes(0);
      });
    };

    const onScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop || 0;
      const p = clamp01(st / maxScrollRef.current);
      targetPRef.current = p;
    };

    // float on stage
    const floatTl = gsap.to(stage, {
      y: floatAmp,
      duration: 1 / Math.max(0.001, floatHz),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // init
    setTrackHeight();

    loadFrame(0).then((a) => {
      if (!a) {
        setLoadError(
          `Could not load ${urlForFrame(0)}. Confirm frames exist at ${imagesBase}/${fileStart}.webp`,
        );
        return;
      }
      setLoadError("");
      drawCover(a);
      setReady(true);
      primeWindow(0);

      requestAnimationFrame(runIntro);
    });

    // RAF: inertia + render
    let lastT = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.min(0.05, Math.max(0.001, (now - lastT) / 1000));
      lastT = now;

      if (introDoneRef.current) {
        const p = pRef.current;
        const v = vRef.current;
        const target = targetPRef.current;

        const a = stiffness * (target - p) - damping * v;

        let v2 = v + a * dt;
        v2 = clamp(v2, -maxVel, maxVel);

        let p2 = p + v2 * dt;

        if (p2 < 0) {
          p2 = 0;
          v2 = 0;
        } else if (p2 > 1) {
          p2 = 1;
          v2 = 0;
        }

        pRef.current = p2;
        vRef.current = v2;

        const frameIdx = clamp(
          Math.round(p2 * (frameCount - 1)),
          0,
          frameCount - 1,
        );

        renderFrameIdx(frameIdx);
        setProgressBarByP(p2);
        applyLetterboxes(frameIdx);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", setTrackHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", setTrackHeight);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      floatTl.kill();
      gsap.killTweensOf(boxesRef.current[0]);

      for (const asset of cacheRef.current.values()) {
        if (asset && typeof asset.close === "function") asset.close();
      }
      cacheRef.current.clear();
      inflightRef.current.clear();
    };
  }, [
    frameCount,
    fileStart,
    imagesBase,
    pxPerFrame,
    windowSize,
    floatAmp,
    floatHz,
    fadeFrames,
    slideOutFrames,
    slideOutPx,
    ready,
    urlForFrame,
    introInSec,
    introHoldSec,
    stiffness,
    damping,
    maxVel,
  ]);

  return (
    <>
      <div ref={trackRef} style={{ height: "300vh" }} />

      <div className="fixed inset-0 overflow-hidden bg-transparent mix-blend-multiply">
        <div ref={stageRef} className="absolute inset-0 will-change-transform">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full bg-white"
          />
        </div>

        {loadError ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/85 text-black p-6">
            <pre className="text-left text-sm whitespace-pre-wrap max-w-[900px]">
              {loadError}
            </pre>
          </div>
        ) : null}

        {/* Letterboxes */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {messages.map((chunks, i) => (
            <div
              key={i}
              ref={(el) => (boxesRef.current[i] = el)}
              style={{ opacity: 0 }}
              className="text-right shadow-card backdrop-blur-3xl absolute w-[630px] left-[320px] px-5 py-3 text-[27px]"
            >
              <p className="leading-snug">
                {chunks.map((chunk, idx) => (
                  <span
                    key={idx}
                    className={`${getFontClass(chunk.variant)} whitespace-pre-line`}
                  >
                    {chunk.text}
                  </span>
                ))}
              </p>
            </div>
          ))}

          {/* CTA at end */}
          <div
            ref={ctaRef}
            className="pointer-events-auto text-center absolute w-[610px] left-[180px] px-5 py-3 text-[27px]"
            style={{ opacity: 0 }}
          >
            <p className="leading-snug font-italiana">
              <Link
                to="/Work"
                className="pointer-events-auto cursor-pointer underline-offset-4 hover:underline transition-all"
              >
                Explore Work{" "}
                <span className="inline-block ml-2">------&gt;</span>
              </Link>
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute left-0 bottom-0 w-full h-[4px] z-50 pointer-events-none">
          <div
            ref={barRef}
            className="h-full w-full bg-black"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
        </div>
      </div>
    </>
  );
}
