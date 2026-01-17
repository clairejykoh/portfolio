import React from 'react'
import Gallery from '../../components/Gallery'
import Slideshow from '../../components/Slideshow';

import bookcover01 from '../../assets/olkaria/bookcover1.jpg'
import bookcover02 from '../../assets/olkaria/bookcover2.jpg'

import image01 from '../../assets/olkaria/action1.jpg'
import image02 from '../../assets/olkaria/action2.jpg'
import image03 from '../../assets/olkaria/action3.jpg'
import image04 from '../../assets/olkaria/action4.jpg'
import image05 from '../../assets/olkaria/action5.jpg'
import image06 from '../../assets/olkaria/action6.jpg'
import image07 from '../../assets/olkaria/action7.jpg'

const bookcovers = [
  bookcover01, bookcover02
]

const images = [
  image01, image02, image03, image04, image05, image06, image07
]

const Olkaria = () => {
  return (
    <> 
          <Gallery
        title="Hacking the Steam"
        subtitle="Imagining Playful New Possibilities for the Geothermal Infrastructure in Olkaria, Kenya"
        meta="Academic, Renewable Energy, 3D Modeling, Architecture, Virtual Architecture, Storytelling"
        caption="Advanced VI Studio: Capitalocene Energetic Landscapes | Columbia University GSAPP | Instructors: Mireia Luzarraga, Alejandro Muino, Andrea Molina. 
        Collaborator: Carley Pasqualotto, Yifei Yuan"
        images={bookcovers}
     />
    <div className="flex justify-center my-20">

      <Slideshow
        images={images}
          width={900}
          height={900}>
      </Slideshow>
  </div>
    </>
  )
}

export default Olkaria
