import React from 'react'
import ModelOrbitCanvas from '../../components/ModelOrbitCanvas'
import Gallery from '../../components/Gallery'

const Penn = () => {
  return (
    <>
    <Gallery
            title="Penn Station Reconstruction"
            subtitle="Redesigning the Busiest Station in the World"
            meta="Professional, Transit, Infrastructure, Federal Project, NYC, Three.js, Rhino 3D, Grasshopper, Parametric Design"
            caption=" "
           ></Gallery>

      <ModelOrbitCanvas />
<div className="my-20" />
    </>
  )
}

export default Penn
