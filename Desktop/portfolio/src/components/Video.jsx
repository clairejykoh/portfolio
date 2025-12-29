// Video.jsx
import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import videoFile from '../assets/homevideo.mp4'
import { Link } from 'react-router-dom'

// messages: array of "chunks" per letterbox
const messages = [
  [
    { text: "Hi! I'm a ", variant: "base" },
    { text: "REGISTERED ARCHITECT ", variant: "accent" },
    { text: "working in Transit and Infrastructure", variant: "base" },
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
    { text: "and challenge the limit of physical world through \n", variant: "base" },
    { text: "VIRTUAL WORLD BUILDING ", variant: "accent" },
  ],
  [
    { text: "I experiment with building materials through various methods of ", variant: "base" },
    { text: "FABRICATION ", variant: "accent" },
    { text: "and \n", variant: "base" },
    { text: "INDUSTRIAL DESIGN.", variant: "accent" },
  ],
  [
    { text: "and with digital information through \n", variant: "base" },
    { text: " INTERACTION DESIGN AND PROGRAMMING,", variant: "accent" },
  ],
  [
    { text: "and bring the best of both worlds through", variant: "base" },
    { text: " PHYSICAL COMPUTING.", variant: "accent" },
  ],
  [
    { text: "And while doing so, consider the intersection of ", variant: "base" },
    { text: "SPIRITUAL AND DESIGN/TECHNICAL \n", variant: "accent" },
    { text: "in the context of built space", variant: "base" },
  ],
  [{ text: "My skills span across multiple layers of expertise", variant: "base" }],
  [{ text: "My goal is to design interactions with different types and layers of reality in a 3D space", variant: "base" }],
  [{ text: "I'm only at the beginning. To be continued!", variant: "base" }],
]

const Video = () => {
  const videoRef = useRef(null)
  const progressRef = useRef(null) // used ONLY for the 55s bar tween
  const boxesRef = useRef([])              // one ref per letterbox
  const lastTriggeredIndexRef = useRef(0)  // highest box index triggered
  const exitsTriggeredRef = useRef({})     // which boxes have started exiting
  const ctaRef = useRef(null)

  const [activeBoxIndex, setActiveBoxIndex] = useState(0)

  // Video chunks + play/pause (runs ONCE)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const video = videoRef.current
    if (!video) return

    const segmentDurations = [5.3, 5.2, 4.1, 2.3, 4.3, 4.6, 4.6, 4.2, 5] // chunks 0-8
    const pauseDuration = 0

    let segmentIndex = 0
    let isPausing = false
    let pauseTimeoutId = null
    let startTime = 0.5

    const onTimeUpdate = () => {
      if (!video || isPausing) return

      if (segmentIndex < segmentDurations.length) {
        const elapsed = video.currentTime - startTime
        const target = segmentDurations[segmentIndex]

        // 1) Start exit of current box 1.3s before chunk end
        if (
          elapsed >= target - 1.3 &&
          !exitsTriggeredRef.current[segmentIndex] &&
          segmentIndex < messages.length
        ) {
          exitsTriggeredRef.current[segmentIndex] = true

          const box = boxesRef.current[segmentIndex]
          if (box) {
            gsap.to(box, {
              y: -500,
              duration: 0.8,
              ease: 'power2.in',
            })
          }
        }

        // 2) PRE-TRIGGER next box ~0.5s before chunk end
        if (
          elapsed >= target - 0.5 &&
          segmentIndex + 1 < messages.length &&
          lastTriggeredIndexRef.current < segmentIndex + 1
        ) {
          lastTriggeredIndexRef.current = segmentIndex + 1
          setActiveBoxIndex(segmentIndex + 1)
        }

        // 3) Pause exactly at chunk end
        if (elapsed >= target - 0.05) {
          isPausing = true
          video.pause()

          pauseTimeoutId = setTimeout(() => {
            segmentIndex += 1
            isPausing = false
            startTime = video.currentTime
            video.play().catch(() => {})
          }, pauseDuration * 1000)
        }
      }
    }

    // when the video finishes, slide last box up, then fade CTA in
    const onEnded = () => {
      const lastIndex = messages.length - 1
      const lastBox = boxesRef.current[lastIndex]
      const cta = ctaRef.current

      if (!lastBox || !cta) return
      if (exitsTriggeredRef.current[lastIndex]) return

      exitsTriggeredRef.current[lastIndex] = true

      const viewportH = window.innerHeight
      const centerY = viewportH / 2 - lastBox.offsetHeight / 2

      gsap.timeline()
        .set(lastBox, { y: centerY })
        .to(lastBox, { y: -500, duration: 0.8, ease: 'power2.in' })
        .fromTo(
          cta,
          { autoAlpha: 0, y: centerY + 30 },
          { autoAlpha: 1, y: centerY, duration: 0.8, ease: 'power2.out' },
          '>-0.1'
        )
    }

    // init
    video.currentTime = 1
    startTime = 1
    lastTriggeredIndexRef.current = 0
    exitsTriggeredRef.current = {}
    setActiveBoxIndex(0)
    video.play().catch(() => {})

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended', onEnded)
      if (pauseTimeoutId) clearTimeout(pauseTimeoutId)
    }
  }, [])

  // NEW: simple 55s progress bar (independent of video)
  useEffect(() => {
    const bar = progressRef.current
    if (!bar) return

    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })

    const tween = gsap.to(bar, {
      scaleX: 1,
      duration: 43,
      ease: 'none',
    })

    return () => tween.kill()
  }, [])

  // Floating animation on the video element (y: 0 <-> 13)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const floatTl = gsap.to(video, {
      y: 13,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => {
      floatTl.kill()
    }
  }, [])

  // Letterbox entrance when a new index becomes active
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (activeBoxIndex == null) return

    const box = boxesRef.current[activeBoxIndex]
    if (!box) return

    const viewportH = window.innerHeight
    const startBelow = viewportH + 200
    const centerY = viewportH / 2 - box.offsetHeight / 2

    gsap.timeline()
      .set(box, { y: startBelow })
      .to(box, { y: centerY, duration: 0.8, ease: 'power2.out' })
  }, [activeBoxIndex])

  // helper to map variant -> font class
  const getFontClass = (variant) => {
    switch (variant) {
      case 'accent':
        return 'font-sans'
      case 'base':
      default:
        return 'font-italiana'
    }
  }

  return (
    <>
      <div className="fixed inset-0 overflow-hidden bg-transparent mix-blend-multiply">
        {/* Background video (floating) */}
        <div className="mix-blend-multiply w-full h-screen overflow-hidden relative">
          <video
            ref={videoRef}
            src={videoFile}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            autoPlay
            loop={false}
            muted
            playsInline
          />
        </div>

        {/* Multiple letterboxes */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-full z-10">
          {messages.map((chunks, i) =>
            i <= activeBoxIndex ? (
              <div
                key={i}
                ref={(el) => (boxesRef.current[i] = el)}
                style={{ transform: 'translateY(150vh)' }}
                className="text-right shadow-card backdrop-blur-3xl absolute w-[630px] left-[180px] px-5 py-3 text-[27px]"
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
            ) : null
          )}

          {/* CTA: fades in after final letterbox exits */}
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
                Explore Work <span className="inline-block ml-2">------&gt;</span>
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Progress Bar: fills in 55 seconds */}
        <div className="fixed left-0 bottom-0 w-full h-[3px] z-50 pointer-events-none">
          <div
            ref={progressRef}
            className="h-full w-full bg-black"
            style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
          />
        </div>
      </div>
    </>
  )
}

export default Video