import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

import concrete_key from "../assets/concrete_key.webp";
import interior from "../assets/interior.webp";
import marc from "../assets/marc.png";
import shape from "../assets/shape.gif";
import woodworking from "../assets/woodworking.jpg";
import gymnastics from "../assets/gymnastics.jpeg";
import cartography from "../assets/cartography.jpg";
import homevideo from "../assets/homevideo.webp";
import lightandshadow from "../assets/lightandshadow.png";
import noir from "../assets/noir.gif";
import language from "../assets/lla.jpg";
import huguenot from "../assets/huguenot.png";
import penn from "../assets/penn.webp";
import steam from "../assets/steam.jpg";
import patchogue from "../assets/patchogue.png";

/**
 * Token IDs (use these in items[].tokens):
 * - product_visual
 * - artist_3d
 * - motion
 * - architect
 */

const FILTERS = [
  { id: "all", label: "ALL" },
  {
    id: "product_visual",
    label: "ARE YOU LOOKING FOR A PRODUCT DESIGNER?",
  },
  { id: "artist_3d", label: "ARE YOU LOOKING FOR A 3D ARTIST?" },
  { id: "motion", label: "ARE YOU LOOKING FOR A MOTION DESIGNER?" },
  { id: "architect", label: "ARE YOU LOOKING FOR AN ARCHITECT?" },
];

const items = [
  {
    image: concrete_key,
    title: "Concrete Keycaps",
    subtitle: "Architecture Meets Industrial Design",
    keywords:
      "Personal, 3D Modeling, 3D Printing, Digital Fabrication, Industrial Design, Motion Graphics, Brand Design, Advertising",
    tokens: ["product_visual", "artist_3d", "motion"],
    path: "/work/concretekeys",
  },
  {
    image: marc,
    title: "Client Portal & Project Visualization",
    subtitle: "for West Baltimore MARC Station",
    keywords:
      "Professional, Infrastructure, Transit, Architecture, Urban Planning, 3D Visualization, UX/UI Design",
    tokens: ["architect", "product_visual", "artist_3d"],
    path: "/work/marcstation",
  },
  {
    image: interior,
    title: "Interior Renderings",
    subtitle: "Helping Designers & Clients Visualize",
    keywords:
      "Professional, Freelance, Interior Design, Photorealistic Renderings",
    tokens: ["artist_3d"],
    path: "/work/interior",
  },
  {
    image: shape,
    title: "Play (p5.js)",
    subtitle: "Creative Coding Using p5.js",
    keywords: "Academic, Programming, Javascript, p5.js",
    tokens: ["product_visual"],
    path: "/work/p5js",
  },
  {
    image: woodworking,
    title: "Woodworking",
    subtitle: "Fabricating with the Most Versatile Material",
    keywords:
      "Academic, Personal, Architecture, Fabrication, Modeling, Prototyping",
    tokens: ["architect", "artist_3d"],
    path: "/work/woodworking",
  },
  {
    image: gymnastics,
    title: "U.S. Gymnastics Development Center",
    subtitle: "Redesigning the Digital Experience for the Gymnastics Facility",
    keywords: "Professional, UX/UI, Website, Web Design, Concept Design",
    tokens: ["product_visual"],
    path: "/work/gymnastics",
  },
  {
    image: cartography,
    title: "Cartography and GIS",
    subtitle: "Spatial Data and Representation",
    keywords:
      "Academic, Professional, GIS, ArcGIS, QGIS, Architecture, Urban Planning, Infrastructure Design",
    tokens: ["architect"],
    path: "/work/cartography",
  },
  {
    image: homevideo,
    title: "Homepage Video",
    subtitle: "Introducing Myself",
    keywords:
      "Personal, 3D Modeling, Rendering, Motion Graphics, Visual Storytelling, After Effects, Premiere Pro, 3DS MAX",
    tokens: ["motion", "artist_3d", "product_visual"],
    path: "/work/homepagevideo",
  },
  {
    image: lightandshadow,
    title: "Light and Shadow",
    subtitle:
      "Questioning the Limit of Architecture in Virtual Reality Using Unreal Engine",
    keywords:
      "Academic, Unreal Engine, 3D Design, Game Design, Level Design, Virtual Architecture, World Building, Optics, Caustics, Dramatic",
    tokens: ["artist_3d", "architect", "motion"],
    path: "/work/lightandshadow",
  },
  {
    image: noir,
    title: "Noir",
    subtitle: "Render Material Study",
    keywords:
      "3D Modeling, Rendering, Photorealism, Motion Graphics, Brand Design",
    tokens: ["artist_3d", "motion", "product_visual"],
    path: "/work/noir",
  },
  {
    image: language,
    title: "Final Thesis Portfolio",
    subtitle:
      "Exploring Three-way Intersection of Linguistics, Environments and Built Space",
    keywords:
      "Academic, Portfolio, Architecture, Planning, PDF, InDesign, Linguistics, Toponym, Storytelling",
    tokens: ["architect", "product_visual"],
    path: "/work/language",
  },
  {
    image: huguenot,
    title: "Huguenot Station ADA Upgrade",
    subtitle: "Accessibility Upgrade in Huguenot Station, Staten Island",
    keywords:
      "Professional, Infrastructure, Transit, Architecture, Rendering, 3D Modeling, ADA, Design-Build",
    tokens: ["architect", "artist_3d"],
    path: "/work/huguenot",
  },
  {
    image: penn,
    title: "Penn Station Reconstruction",
    subtitle: "Redesigning the Busiest Station in the World",
    keywords:
      "Professional, Transit, Infrastructure, Federal Project, NYC, Three.js, Rhino 3D, Grasshopper, Parametric Design",
    tokens: ["architect", "artist_3d", "product_visual"],
    path: "/work/penn",
  },
  {
    image: steam,
    title: "Hacking the Steam",
    subtitle:
      "Imagining Playful New Possibilities for the Geothermal Infrastructure in Olkaria, Kenya",
    keywords:
      "Academic, Renewable Energy, 3D Modeling, Architecture, Virtual Architecture, Storytelling",
    tokens: ["architect", "artist_3d", "product_visual"],
    path: "/work/olkaria",
  },
  {
    image: patchogue,
    title: "Patchogue Station Renovation",
    subtitle:
      "Breathing New Life into the Town's Beloved Station in Patchogue, Long Island",
    keywords:
      "Professional, Infrastructure, Transit, Architecture, Rendering, 3D Modeling, Urban Planning, ADA, Design-Build",
    tokens: ["architect", "artist_3d"],
    path: "/work/patchogue",
  },
];

function matchesFilter(item, filterId) {
  if (filterId === "all") return true;
  return Array.isArray(item.tokens) && item.tokens.includes(filterId);
}

export default function GridCopy() {
  const wrapRef = useRef(null);

  // Keep stable refs for ALL cards (we never change the array)
  const cardRefs = useRef([]);
  const loadedCountRef = useRef(0);

  const [allLoaded, setAllLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // prevent React state from racing the animation
  const isAnimatingRef = useRef(false);

  const handleImgLoad = useCallback(() => {
    loadedCountRef.current += 1;
    if (loadedCountRef.current >= items.length) setAllLoaded(true);
  }, []);

  const getVisualSorted = useCallback((els) => {
    return els
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { el, top: r.top, left: r.left };
      })
      .sort((a, b) => a.top - b.top || a.left - b.left)
      .map((x) => x.el);
  }, []);

  // Initial reveal (exactly like your original)
  useLayoutEffect(() => {
    if (!allLoaded) return;

    const els = cardRefs.current.filter(Boolean);
    els.forEach((el) => (el.style.display = "block"));

    const sorted = getVisualSorted(els);

    const ctx = gsap.context(() => {
      gsap.killTweensOf(sorted);
      gsap.set(sorted, { y: 40, autoAlpha: 0 });
      gsap.to(sorted, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true,
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [allLoaded, getVisualSorted]);

  // Click-driven transition (no useEffect toggling display mid-fade)
  const onFilterClick = useCallback(
    (nextId) => {
      if (!allLoaded) return;
      if (isAnimatingRef.current) return;
      if (nextId === activeFilter) return;

      isAnimatingRef.current = true;

      const entries = cardRefs.current
        .map((el, i) => ({ el, i }))
        .filter((x) => x.el);

      const currentVisible = entries
        //.filter(({ el }) => el.style.display !== "none")
        .map(({ el }) => el);

      const nextShow = items.map((it) => matchesFilter(it, nextId));
      const nextVisible = entries
        .filter(({ i }) => nextShow[i])
        .map(({ el }) => el);

      const outSorted = getVisualSorted(currentVisible);
      const inSorted = getVisualSorted(nextVisible);

      // timings (tune here)
      const FADE_OUT_DUR = 0.28;
      const FADE_IN_DUR = 0.85;

      // cap fade-out total so it doesn't feel like dead time
      const OUT_TOTAL = 0.55;
      const OUT_STAGGER =
        outSorted.length > 1
          ? Math.min(0.04, OUT_TOTAL / (outSorted.length - 1))
          : 0;

      const IN_STAGGER = inSorted.length > 1 ? 0.08 : 0;

      const ctx = gsap.context(() => {
        gsap.killTweensOf(cardRefs.current.filter(Boolean));

        // ensure visible ones are actually visible before fading
        gsap.set(outSorted, { autoAlpha: 1 });

        const tl = gsap.timeline({
          defaults: { overwrite: true },
          onComplete: () => {
            setActiveFilter(nextId);
            isAnimatingRef.current = false;
          },
        });

        // 1) Fade out ALL currently visible
        tl.to(outSorted, {
          autoAlpha: 0,
          duration: FADE_OUT_DUR,
          ease: "power2.out",
          stagger: OUT_STAGGER,
        });

        // 2) Toggle display AFTER fade-out completes
        tl.call(() => {
          entries.forEach(({ el, i }) => {
            const want = !!nextShow[i];
            el.style.display = want ? "block" : "none";

            // no sliding during filter transitions
            gsap.set(el, { clearProps: "transform" });

            if (want) gsap.set(el, { autoAlpha: 0 });
          });
        });

        // 3) Fade in visible set one-by-one
        tl.to(inSorted, {
          autoAlpha: 1,
          duration: FADE_IN_DUR,
          ease: "power3.out",
          stagger: IN_STAGGER,
        });
      }, wrapRef);

      return () => ctx.revert();
    },
    [allLoaded, activeFilter, getVisualSorted],
  );

  return (
    <div ref={wrapRef}>
      {/* Filter Section (your structure + equal gaps) */}
      <div className="mx-40 px-2 mt-14 mb-14">
        {/* Top divider */}
        <div className="w-full h-px bg-gray-400 mb-5 px-4" />

        {/* Buttons */}
        <div className="top-0 z-[1000] justify-baseline w-full items-baseline">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.id;

            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onFilterClick(f.id)}
                className={[
                  "flex-1 text-sm transition-colors duration-200 px-8 ",
                  // equal gap comes from justify-between + gap + flex-1
                  isActive ? "text-black" : "text-gray-500 hover:text-black",
                ].join(" ")}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Bottom divider */}
        <div className="w-full h-px bg-gray-400 mt-5" />
      </div>

      {/* Masonry grid */}
      <div className="mix-blend-multiply mt-10 mb-20 mx-40 columns-1 md:columns-2 lg:columns-3 gap-14 space-y-14 px-4">
        {items.map((item, index) => (
          <div
            key={item.path}
            className="break-inside-avoid"
            ref={(el) => (cardRefs.current[index] = el)}
            // baseline hidden until initial reveal runs
            style={{ opacity: 0, transform: "translateY(40px)" }}
          >
            {item.title && (
              <div className="font-italiana text-3xl mt-1 text-gray-700 px-1">
                {item.title}
              </div>
            )}

            <div className="relative group overflow-hidden shadow-md">
              <Link to={item.path} className="block">
                <img
                  src={item.image}
                  alt={item.keywords || item.title || `Image ${index + 1}`}
                  className="w-full h-auto object-cover"
                  onLoad={handleImgLoad}
                  onError={handleImgLoad}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Subtitle + keywords */}
                {(item.subtitle || item.keywords) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                    {item.subtitle && (
                      <p className="font-italiana text-gray-200 text-2xl mt-1 drop-shadow-sm">
                        {item.subtitle}
                      </p>
                    )}
                    {item.keywords && (
                      <p className="text-gray-200 text-[15px] mt-1 drop-shadow-sm">
                        {item.keywords}
                      </p>
                    )}
                  </div>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
