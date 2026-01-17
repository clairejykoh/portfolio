import React from 'react'
import Gallery from "../../components/Gallery"

import chestnut01 from '../../assets/interior/35chestnut01.png'
import chestnut02 from '../../assets/interior/35chestnut02.png'
import chestnut03 from '../../assets/interior/35chestnut03.png'
import chestnut04 from '../../assets/interior/35chestnut04.png'
import chestnut05 from '../../assets/interior/35chestnut05.png'
import chestnuttop from '../../assets/interior/35chestnut-top.png'

const chestnuts = [
  chestnut01, chestnut02, chestnut03, chestnut04, chestnut05, chestnuttop
]

const Interior = () => {
  return (
    <>
      <Gallery
        title="Interior Renderings"
        subtitle="Helping Designers & Clients Visualize"
        meta="Professional, Freelance, Interior Design, Photorealistic Renderings"
        caption="35 Chestnut Living Room Renders"
        images={chestnuts}
      />


    </>
  )
}

export default Interior
