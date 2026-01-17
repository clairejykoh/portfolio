import React from 'react'
import Gallery from "../../components/Gallery"

import ws1 from '../../assets/workstation/ws1.png'
import ws2 from '../../assets/workstation/ws2.png'
import ws3 from '../../assets/workstation/ws3.png'
import ws4 from '../../assets/workstation/ws5.png'
import ws5 from '../../assets/workstation/ws4.png'
import ws6 from '../../assets/workstation/ws6.png'
import ws7 from '../../assets/workstation/ws7.png'
import ws8 from '../../assets/workstation/ws8.png'
import ws9 from '../../assets/workstation/ws9.png'
import ws10 from '../../assets/workstation/ws10.png'

import workstation from '../../assets/workstation/workstation.mp4'

const images = [ ws1, ws2, ws3, ws4, ws5, ws6 ,ws7, ws8, ws9, ws10 ];



const Workstation = () => {
  return (
    <>
      <Gallery
        title="Workstation"
        subtitle="My First Animation"
        meta="Academic, 3DS MAX, AutoCAD, 3D Modeling, 3D Animation, Motion Graphics"
        images={images}
        />
        <div className="flex flex-col overflow-hidden items-center justify-center h-[584px] w-[970px] my-20 mx-auto">
          <video 
            src={workstation}
            type="video/mp4"
            className="flex flex-col justify-center items-center w-full h-full object-cover"
            controls
            playsInline>
          </video>
        </div>
    </>
  )
}

export default Workstation
