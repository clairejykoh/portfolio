import React from 'react'
import IFrame from '../../components/IFrame'
import Gallery from '../../components/Gallery'
import RoseSketch from '../../components/RoseSketch'


const P5JS = () => {
  return (
    <>
        <Gallery 
            title="Playe (p5.js)"
            subtitle="Creative Coding Using p5.js"
            meta="Academic, Programming, Javascript, p5.js"
        />
        <div className="my-20 flex flex-col items-center gap-20">
            <RoseSketch />

            <IFrame
                src="https://editor.p5js.org/clairejykoh/full/OYEPNoKzm"
                title="Tangled"
                width={602}
                height={470}
            />
            <IFrame
                src="https://editor.p5js.org/clairejykoh/full/aUzVT9YBv"
                title="Sled"
                width={602}
                height={470}
            />
        </div>
    </>
  )
}

export default P5JS
