import React from 'react'
import Gallery from "../../components/Gallery"

import view1 from '../../assets/dusk/dusk01.png'
import view2 from '../../assets/dusk/dusk02.png'
import view3 from '../../assets/dusk/dusk03.png'
import view4 from '../../assets/dusk/dusk04.png'
import view5 from '../../assets/dusk/dusk05.png'

const images = [
  view1, view2, view3, view4, view5
]

const Dusk = () => {
  return (
    <>
      <Gallery
        title="Dusk"
        subtitle="A Relaxing Memory"
        meta="Personal, Rhinoceros 3D, 3DS MAX, Blender, Rendering"
        caption="Wanted to create something that makes you feel relaxed."
        images={images}
      />


    </>
  )
}

export default Dusk
