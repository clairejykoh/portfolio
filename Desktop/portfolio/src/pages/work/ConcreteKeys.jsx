import React from 'react'
import Gallery from "../../components/Gallery"
import ScrollAutoplayVideo from '../../components/ScrollAutoplayVideo'
import ConcreteIntro from '../../components/ConcreteIntro'
import TypeAnimation from '../../components/TypeAnimation'


import ScrollGallery from '../../components/ScrollGallery'


import concrete from '../../assets/concrete_keys/concretewall.jpg'
import obsidian from '../../assets/concrete_keys/obsidian.jpg'

import progress01 from '../../assets/concrete_keys/progress01.jpg'
import progress02 from '../../assets/concrete_keys/progress02.jpg'
import progress03 from '../../assets/concrete_keys/progress03.jpg'
import progress04 from '../../assets/concrete_keys/progress04.jpg'
import progress05 from '../../assets/concrete_keys/progress05.jpg'
import progress06 from '../../assets/concrete_keys/progress06.jpg'
import progress07 from '../../assets/concrete_keys/progress07.jpg'

import architecture01 from '../../assets/concrete_keys/architecture01.jpg'
import architecture02 from '../../assets/concrete_keys/architecture02.jpg'
import architecture03 from '../../assets/concrete_keys/architecture03.jpg'
import architecture04 from '../../assets/concrete_keys/architecture04.jpg'
import architecture05 from '../../assets/concrete_keys/architecture05.jpg'
import architecture06 from '../../assets/concrete_keys/architecture06.jpg'
import architecture07 from '../../assets/concrete_keys/architecture07.jpg'
import architecture08 from '../../assets/concrete_keys/architecture08.jpg'
import architecture09 from '../../assets/concrete_keys/architecture09.jpg'
import architecture10 from '../../assets/concrete_keys/architecture10.jpg'

import cover from '../../assets/concrete_keys/samples.jpg'
import concretekeycaps from '../../assets/concrete_keys/concretekeycaps.jpg'
import GalleryFull from '../../components/GalleryFull'

const finishes = [ cover, concretekeycaps ]
const architecture = [ architecture01, architecture03, architecture02, architecture04, architecture05, architecture06, architecture07,
                      architecture08, architecture09, architecture10 ]


const ConcreteKeys = () => {
  return (
    <>
      <Gallery 
        title="Concrete Keycaps"
        subtitle="Architecture Meets Industrial Design"
        meta="Personal, 3D Modeling, 3D Printing, Digital Fabrication, Industrial Design"
        caption="Making of a concrete keycap, from Concept to Finish."        
      />
      <ConcreteIntro 
        imgTopSrc={concrete} imgBottomSrc={obsidian} 
      />

      <div className="flex flex-col items-center justify">
       
       <div className="my-30">

      </div>

      <ScrollGallery 
        frames={architecture}
          heightVh = {300}
          className="mix-blend-multiply"
      />

      <div className="w-full h-200 my-20 bg-[#303030]">
        <TypeAnimation 
          text="Typing is a Multisensory Experience"
          className="flex flex-center items-center justify-center font-italiana text-5xl text-white py-100"
        />
        </div>

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
      <div className="flex flex-center items-center">
      <div className="max-w-[600px]">

      <Gallery 
        images={finishes}
        className="my-35"       
      />
      </div>

</div>
        <div className="flex flex-row justify-center">
          <div className="mx-auto max-w-[600px]">
            <div className="grid grid-cols-4 items-center">
              <Gallery
                images={[progress01]} 
                className="col-span-2"
              />
              <div className="ml-10 text-xs text-justify col-span-2">
                <p className="text-xl font-italiana">
                  1
                  <br />
                  </p>
                  <br />
                  <br />
                    Prepare a digital 3D model of the keycap stems.
              </div>
              <Gallery
                images={[progress02]} 
                className="col-span-2"
              />
              <div className="ml-10 text-xs text-justify col-span-2">
                <p className="text-xl font-italiana">
                  2
                  </p>
                  <br />
                  <br />
                    Import the model to 3D printing program.  
              </div>
              <Gallery 
              images={[progress03]}
              className="col-span-2"
              />
            <div className="ml-10 text-xs text-justify col-span-2">
              <p className="text-xl font-italiana">
                3
              </p>
                <br />
                <br />
                    3D print the stems. 
            </div>
                          <Gallery 
              images={[progress04]}
              className="col-span-2"
              />
            <div className="ml-10 text-xs text-justify col-span-2">
              <p className="text-xl font-italiana">
                4
              </p>
                <br />
                <br />
                    Pour the cement into mold with the stems fixed on the center and flushed with the top. Take out when dry.
            </div>
                          <Gallery 
              images={[progress05]}
              className="col-span-2"
              />
            <div className="ml-10 text-xs text-justify col-span-2">
              <p className="text-xl font-italiana">
                5
              </p>
                <br />
                <br />
                    Experiment with the texture.
            </div>

            </div>
          </div>
        </div>
    </>
  )
}

export default ConcreteKeys
