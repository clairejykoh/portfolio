import React from 'react'
import Gallery from '../../components/Gallery'
import OverlappingImage from '../../components/OverlappingImage'

import homevideoUnderlay from '../../assets/homevideo/homevideo_underlay.png'
import homevideoOverlay from '../../assets/homevideo/homevideo_overlay.png'


const images = [
    homevideoUnderlay, homevideoOverlay
]

const HomepageVideo = () => {
  return (
    <>
      <Gallery
        title="Homepage Video"
        subtitle="Introducing Myself"
        meta="Personal, 3D Modeling, Rendering, Motion Graphics, After Effects, Premiere Pro, 3DS MAX"
      />
      <OverlappingImage
        images={images}
        className="items-center mb-20"
      />  
    </>
  )
}

export default HomepageVideo
