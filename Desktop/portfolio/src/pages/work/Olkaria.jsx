import React from 'react'
import Gallery from '../../components/Gallery'
import Slideshow from '../../components/Slideshow'
import Marquee from '../../components/Marquee'

import bookcover01 from '../../assets/olkaria/bookcover1.jpg'
import bookcover02 from '../../assets/olkaria/bookcover2.jpg'

import action01 from '../../assets/olkaria/action01.jpg'
import action02 from '../../assets/olkaria/action02.jpg'
import action03 from '../../assets/olkaria/action03.jpg'
import action04 from '../../assets/olkaria/action04.jpg'
import action05 from '../../assets/olkaria/action05.jpg'
import action06 from '../../assets/olkaria/action06.jpg'
import action07 from '../../assets/olkaria/action07.jpg'

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

import booklet01 from '../../assets/olkaria/booklet01.jpg'
import booklet02 from '../../assets/olkaria/booklet02.jpg'
import booklet03 from '../../assets/olkaria/booklet03.jpg'
import booklet04 from '../../assets/olkaria/booklet04.jpg'
import booklet05 from '../../assets/olkaria/booklet05.jpg'
import booklet06 from '../../assets/olkaria/booklet06.jpg'
import booklet07 from '../../assets/olkaria/booklet07.jpg'
import booklet08 from '../../assets/olkaria/booklet08.jpg'
import booklet09 from '../../assets/olkaria/booklet09.jpg'
import booklet10 from '../../assets/olkaria/booklet10.jpg'
import booklet11 from '../../assets/olkaria/booklet11.jpg'
import booklet12 from '../../assets/olkaria/booklet12.jpg'
import booklet13 from '../../assets/olkaria/booklet13.jpg'



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

const booklets = [
  booklet01, booklet02, booklet03, booklet04, booklet05, booklet06, booklet07, booklet08, booklet09, booklet10, booklet11, booklet12, booklet13
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
      <Marquee 
        images={booklets}
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
