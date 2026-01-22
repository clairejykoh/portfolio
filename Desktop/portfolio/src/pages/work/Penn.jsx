import React, { useRef } from 'react'
import { useLocation } from "react-router-dom";
import ModelOrbitCanvas from '../../components/ModelOrbitCanvas'
import Gallery from '../../components/Gallery'
import Reveal from '../../components/Reveal'

import pennlogo from '../../assets/penn_station/pennlogo-01.jpg'

import frame01 from '../../assets/penn_station/frame01.jpg'
import frame02 from '../../assets/penn_station/frame02.jpg'
import frame03 from '../../assets/penn_station/frame03.jpg'
import frame04 from '../../assets/penn_station/frame04.jpg'
import frame05 from '../../assets/penn_station/frame05.jpg'
import frame06 from '../../assets/penn_station/frame06.jpg'
import frame07 from '../../assets/penn_station/frame07.jpg'
import ScrollGallery from '../../components/ScrollGallery'

const images = [ frame01, frame02, frame03, frame04, frame05, frame06, frame07 ]

const Penn = ({ frames }) => {
  const { key } = useLocation();
  
  return (
    <>

    
    <Gallery
            title="Penn Station Reconstruction"
            subtitle="Redesigning the Busiest Station in the World"
            meta="Professional, Transit, Infrastructure, Federal Project, NYC, Three.js, Rhino 3D, Grasshopper, Parametric Design"
            caption=" "
    />

    <Reveal delay={0.2}><ModelOrbitCanvas /></Reveal>



      <div className="flex flex-row justify-center">
        <div className="mx-auto max-w-[1000px]">
          <div className="my-20 grid grid-cols-3 items-center">
            <Gallery 
              images={[pennlogo]}
              className="col-span-2"
            />
          </div>

      </div>
      </div>
    </>
  )
}

export default Penn
