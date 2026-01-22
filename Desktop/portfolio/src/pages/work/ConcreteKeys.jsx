import React from 'react'
import Gallery from "../../components/Gallery"

import cover from "../../assets/concrete_keys/cover.png"
import concrete from'../../assets/concrete_keys/concrete.jpg'

import frame01 from '../../assets/penn_station/frame01.jpg'
import frame02 from '../../assets/penn_station/frame02.jpg'
import frame03 from '../../assets/penn_station/frame03.jpg'
import frame04 from '../../assets/penn_station/frame04.jpg'
import frame05 from '../../assets/penn_station/frame05.jpg'
import frame06 from '../../assets/penn_station/frame06.jpg'
import frame07 from '../../assets/penn_station/frame07.jpg'
import ScrollGallery from '../../components/ScrollGallery'
import GalleryFull from '../../components/GalleryFull'

const frames = [ frame01, frame02, frame03, frame04, frame05, frame06, frame07 ]

const ConcreteKeys = () => {
  return (
      <>
      <Gallery 
        title="Concrete Keycaps"
        subtitle="Architecture Meets Industrial Design"
        meta="Personal, 3D Modeling, 3D Printing, Digital Fabrication, Industrial Design"
        caption="Making of a Concrete Keycap, from Concept to the Finishing Layer."        

      />

            <GalleryFull 
        images={[concrete]}
        />
        <Gallery 
        className="h-50"
                images={[cover]}/>

      </>
  )
}

export default ConcreteKeys
