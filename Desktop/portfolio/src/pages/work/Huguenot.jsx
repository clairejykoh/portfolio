import React from 'react'
import Gallery from "../../components/Gallery"

import view1 from '../../assets/huguenot/view1.png'
import view2 from '../../assets/huguenot/view2.png'
import view3 from '../../assets/huguenot/view3.png'
import view4 from '../../assets/huguenot/view4.png'
import view5 from '../../assets/huguenot/view5.png'

const images = [
  view1, view2, view3, view4, view5
]

const Huguenot = () => {
  return (
    <>
      <Gallery
        title="Huguenot Station ADA Upgrade"
        subtitle="Accessibility Upgrade at Huguenot Station, Staten Island"
        meta="Professional, Infrastructure, Transit, Architecture, Urban Planning, ADA, Design-Build"
        caption="Worked as an architect to deliver design and construction documents of the new ramps to be installed at Huguenot Station in Staten Island, NY.
        Collaboration with disciplines included but are not limited to: Civil, Geotechnical, Structural, Mechanical, Electrical, Plumbing, Fire Protection, Communication."
        images={images}
      />


    </>
  )
}

export default Huguenot
