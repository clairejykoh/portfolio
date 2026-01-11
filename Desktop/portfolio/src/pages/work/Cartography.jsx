import React from 'react'
import Gallery from "../../components/Gallery"

import image01 from '../../assets/cartography/canada-relief.jpg'
import image02 from '../../assets/cartography/canada-landcover.jpg'
import image03 from '../../assets/cartography/canada-shipping.jpg'
import image04 from '../../assets/cartography/canada-foodinsecurity.jpg'
import image05 from '../../assets/cartography/canada-foodnetwork.jpg'

const images = [
  image01, image02, image03, image04, image05
]

const Cartography = () => {
  return (
    <>
      <Gallery
        title="Cartography and GIS"
        subtitle="Spatial Data and its Representation"
        meta="Academic, Professional, GIS, ArchGIS, QGIS, Architecture, Urban Planning, Infrastructure Design"
        caption="Include a series of maps produced for both academic and professional work"
        images={images}
      />


    </>
  )
}

export default Cartography
