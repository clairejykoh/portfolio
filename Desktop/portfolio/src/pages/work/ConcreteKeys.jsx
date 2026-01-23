import React from 'react'
import Gallery from "../../components/Gallery"
import ScrollAutoplayVideo from '../../components/ScrollAutoplayVideo'
import ConcreteIntro from '../../components/ConcreteIntro'
import ScrollGallery from '../../components/ScrollGallery'


import concrete from '../../assets/concrete_keys/concrete.jpg'
import obsidian from '../../assets/concrete_keys/obsidian.jpg'

import frame01 from '../../assets/penn_station/frame01.jpg'
import frame02 from '../../assets/penn_station/frame02.jpg'
import frame03 from '../../assets/penn_station/frame03.jpg'
import frame04 from '../../assets/penn_station/frame04.jpg'
import frame05 from '../../assets/penn_station/frame05.jpg'
import frame06 from '../../assets/penn_station/frame06.jpg'
import frame07 from '../../assets/penn_station/frame07.jpg'

import GalleryFull from '../../components/GalleryFull'


const frames = [ frame01, frame02, frame03, frame04, frame05, frame06, frame07 ]

const ConcreteKeys = () => {
  return (
      <>
      <Gallery 
        title="Concrete Keycaps"
        subtitle="Architecture Meets Industrial Design"
        meta="Personal, 3D Modeling, 3D Printing, Digital Fabrication, Industrial Design"
        caption="Making of a concrete keycap, from Concept to Finish."        
      />



      <ConcreteIntro imgTopSrc={concrete} imgBottomSrc={obsidian} />
<div className="flex flex-center items-center justify">
      <ScrollAutoplayVideo
        src="/portfolio/videos/sequence1.mp4"
        muted={true}
        className="w-[1600px] h-auto items-center mix-blend-multiply brightness-130 mt-10 my-20"
      />
      </div>
      <ScrollAutoplayVideo
        src="/portfolio/videos/sequence2.mp4"
        muted={true}
        className="w-full h-auto mix blend-multiply brightness-130"
      />
    </>
  )
}

export default ConcreteKeys
