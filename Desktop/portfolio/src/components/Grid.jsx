import React, { useRef, useState, useLayoutEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

import workstation from '../assets/workstation.jpg'
import concrete_key from '../assets/concrete_key.jpg'
import east_liberty from '../assets/east_liberty.jpg'
import final_bench from '../assets/final_bench.png'
import huguenot from '../assets/huguenot.png'
import interior from '../assets/interior.png'
import museum from '../assets/museum.jpg'
import penn from '../assets/penn.png'
import homevideo from '../assets/homevideo.png'
import woodworking from '../assets/woodworking.jpg'
import steam from '../assets/steam.jpg'
import cartography from '../assets/cartography.jpg'
import shape from '../assets/shape.gif'
import language from '../assets/lla.jpg'

const items = [
  { image: workstation, 
    title: "Workstation", 
    subtitle: "My First 3D Animation", 
    keywords: "Academic, 3DS MAX, AutoCAD, 3D Modeling, 3D Animation, Motion Graphics",
    path: "/work/workstation"
  },
  { image: concrete_key, 
    title: "Concrete Keycaps", 
    subtitle: "Architecture Meets Industrial Design", 
    keywords: "3D Modeling, 3D Printing, Digital Fabrication, Industrial Design" 
  },
  { image: shape, 
    title: "Play (p5.js)", 
    subtitle: "Creative Coding using p5.js", 
    keywords: "Academic, Programming, Javascript, p5.js" 
  },
  { image: east_liberty, 
    title: "Porous City", 
    subtitle: "Building Design Based on Pedestrian Traffic and User Flow", 
    keywords: "Academic, Urban Planning, Architecture, Rhino 3D, Enscape, Digital Collage, Three.js" 
  },
  { image: final_bench, 
    title: "Dusk", 
    subtitle: "A Relaxing Animiation You Can Rest At", 
    keywords: "Personal, Rhinoceros 3D, 3DS MAX, Blender, Rendering" 
  },
  { image: huguenot, 
    title: "Huguenot Station ADA Upgrade", 
    subtitle: "Accessibility Upgrade in Huguenot Station, Staten Island", 
    keywords: "Professional, Infrastructure, Transit, Architecture, ADA, Design-Build" 
  },
  { image: steam, 
    title: "Hacking the Steam", 
    subtitle: "Imagining Playful New Possibilities for the Geothermal Infrastructure in Olkaria, Kenya", 
    keywords: "Academic, Renewable Energy, 3D Modeling, Architecture, Virtual Architecture, Storytelling" 
  },
  { image: homevideo, 
    title: "Homepage Video", 
    subtitle: "Introducing Myself", 
    keywords: "Personal, 3D Modeling, Rendering, Motion Graphics, After Effects, Premiere Pro, 3DS MAX" 
  },
  { image: museum, 
    title: "Memorials of Forgotten Names", 
    subtitle: "Anthropocene Museum 5.0: What is a Museum Anyways?", 
    keywords: "Academic, Geography, Architecture, Landscape Design, Urban Planning, Anthropocene, Settler Colonialism, Museum" 
  },
  { image: language, 
    title: "Final Thesis Prtfolio", 
    subtitle: "Exploring Three-way Intersetion of Linguistis, Environments and Built Space", 
    keywords: "Academic, Portfolio, Architecture, Planning, PDF, InDesign, Linguistics, Toponym, Storytelling",
    path: "/work/language"
  },
  { image: 
    penn, title: "Penn Station Reconstruction", 
    subtitle: "For the Busiest Station in the World", 
    keywords: "Professional, Transit, Infrastructure, Federal Project, NYC, Three.js" 
  },
  { image: woodworking, 
    title: "Woodworking", 
    subtitle: "Woodworking", 
    keywords: "Academic, Personal, Architecture, Fabrication, Modeling, Prototyping" 
  },
  { image: interior, 
    title: "Interior Renderings", 
    subtitle: "Helping Designers & Clients Visualize Their Homes", 
    keywords: "Professional, Freelance, Interior Design, Photorealistic Renderings" 
  },
  { image: cartography, 
    title: "Cartography and GIS", 
    subtitle: "Spatial Data and Representation", 
    keywords: "Academic, Professional, GIS, ArchGIS, QGIS, Architecture, Urban Planning, Infrastructure Design" 
  },
]

const Grid = () => {
  const cardRefs = useRef([])
  const loadedCountRef = useRef(0)
  const [allLoaded, setAllLoaded] = useState(false)

  const handleImgLoad = useCallback(() => {
    loadedCountRef.current += 1
    if (loadedCountRef.current >= items.length) {
      setAllLoaded(true)
    }
  }, [])

  useLayoutEffect(() => {
    if (!allLoaded) return

    const els = cardRefs.current.filter(Boolean)

    // Sort by *visual position* (top-to-bottom, then left-to-right),
    // so stagger matches what you see (not "by columns").
    const sorted = els
      .map((el) => {
        const r = el.getBoundingClientRect()
        return { el, top: r.top, left: r.left }
      })
      .sort((a, b) => (a.top - b.top) || (a.left - b.left))
      .map((x) => x.el)

    const ctx = gsap.context(() => {
      // they are already hidden via inline style; this just guarantees baseline
      gsap.set(sorted, { y: 40 })

      gsap.to(sorted, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        overwrite: true,
      })
    })

    return () => ctx.revert()
  }, [allLoaded])

  return (
    <div className="mix-blend-multiply mt-10 mx-40 columns-1 md:columns-2 lg:columns-3 gap-14 space-y-14 px-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="break-inside-avoid"
          ref={(el) => (cardRefs.current[index] = el)}
          // Prevent the “loads first, then animates” flash:
          // keep hidden until we run the GSAP reveal after all images load.
          style={{ opacity: 0, transform: 'translateY(40px)' }}
        >
          {/* Caption above the card */}
          {item.title && (
            <div className="font-italiana text-3xl mt-1 text-gray-700 px-1">
              {item.title}
            </div>
          )}

          {/* Card */}
          <div className="relative group overflow-hidden shadow-md">
            <Link to={item.path} className="block">
            <img
              src={item.image}
              alt={item.keywords || `Image ${index + 1}`}
              className="w-full h-auto object-cover"
              onLoad={handleImgLoad}
              onError={handleImgLoad} // don't block the animation if one asset fails
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
  )
}

export default Grid