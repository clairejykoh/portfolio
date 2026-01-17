import React from 'react'
import Gallery from '../../components/Gallery'
import Slideshow from '../../components/Slideshow'
import Marquee from '../../components/Marquee'

import bookcover01 from '../../assets/olkaria/bookcover1.jpg'
import bookcover02 from '../../assets/olkaria/bookcover2.jpg'

import action01 from '../../assets/olkaria/action1.jpg'
import action02 from '../../assets/olkaria/action2.jpg'
import action03 from '../../assets/olkaria/action3.jpg'
import action04 from '../../assets/olkaria/action4.jpg'
import action05 from '../../assets/olkaria/action5.jpg'
import action06 from '../../assets/olkaria/action6.jpg'
import action07 from '../../assets/olkaria/action7.jpg'

import perspective01 from '../../assets/olkaria/perspective01.jpg'
import perspective02 from '../../assets/olkaria/perspective02.jpg'
import perspective03 from '../../assets/olkaria/perspective03.jpg'

import TOO00 from '../../assets/olkaria/TOO.webp'
import TOO01 from '../../assets/olkaria/TOO01.webp'
import TOO02 from '../../assets/olkaria/TOO02.webp'
import TOO03 from '../../assets/olkaria/TOO03.webp'
import TOO04 from '../../assets/olkaria/TOO04.webp'
import TOO05 from '../../assets/olkaria/TOO05.webp'
import TOO06 from '../../assets/olkaria/TOO06.webp'
import TOO07 from '../../assets/olkaria/TOO07.webp'


const bookcovers = [
  bookcover01, bookcover02
]

const actions = [
  action01, action02, action03, action04, action05, action06, action07
]

const perspectives = [
  perspective01, perspective02, perspective03
]

const TOO = [
  TOO00, TOO01, TOO02, TOO03, TOO04, TOO05, TOO06, TOO07
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
    <div className="flex flex-col items-center justify-center my-20">
      <Slideshow
        images={TOO} 
        width={900}
        height={900}
      />
      <Slideshow
        images={actions}
        width={900}
        height={900}
      />
      <Gallery
        images= {perspectives}
      />
  </div>
    </>
  )
}

export default Olkaria
