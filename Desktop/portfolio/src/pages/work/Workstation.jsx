import React from 'react'

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

const images = [ ws1, ws2, ws3, ws4, ws5, ws6 ,ws7, ws8, ws9, ws10 ];



const Workstation = () => {
  return (
    <>
    <div className="mt-20">
        <div className="image-column mix-blend-multiply">
            <p className="text-3xl/1 font-italiana">Workstation</p>
            <p className="text-2xl/1 font-italiana"><br></br>My First Animation</p>
            <p className="text xl/1">Academic, 3DS MAX, AutoCAD, 3D Modeling, 3D Animation, Motion Graphics</p>
            {images.map((src, i) => (
                <img
                key={i}
                src={src}
                alt={`ws-${i + 1}`}
                className="image-item"
                loading="lazy"
                />
            ))}
        </div>
    </div>
    </>
  )
}

export default Workstation
