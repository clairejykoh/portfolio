import React from 'react'
import Gallery from '../../components/Gallery'

import homevideo01 from '../../assets/homevideo/homevideo01.jpg'
import homevideo02 from '../../assets/homevideo/homevideo02.jpg'
import homevideo03 from '../../assets/homevideo/homevideo03.jpg'
import homevideo04 from '../../assets/homevideo/homevideo04.jpg'
import homevideo05 from '../../assets/homevideo/homevideo05.jpg'
import homevideo06 from '../../assets/homevideo/homevideo06.jpg'

const images = [
    homevideo01, homevideo02, homevideo03, homevideo04, homevideo05, homevideo06
]

const HomepageVideo = () => {
  return (
    <>
    <Gallery
        title="Homepage Video"
        subtitle="Introducing Myself"
        meta="Personal, 3D Modeling, Rendering, Motion Graphics, After Effects, Premiere Pro, 3DS MAX"
        images={images}
        />
    </>
  )
}

export default HomepageVideo
