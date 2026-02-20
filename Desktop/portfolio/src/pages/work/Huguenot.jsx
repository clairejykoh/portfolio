import React from "react";
import Gallery from "../../components/Gallery";

import view1 from "../../assets/huguenot/view01.webp";
import view2 from "../../assets/huguenot/view02.webp";
import view3 from "../../assets/huguenot/view03.webp";
import view4 from "../../assets/huguenot/view04.webp";
import view5 from "../../assets/huguenot/view05.webp";
import view6 from "../../assets/huguenot/view06.webp";

const images = [view1, view2, view3, view4, view5, view6];

const Huguenot = () => {
  return (
    <>
      <Gallery
        title="Huguenot Station ADA Upgrade"
        subtitle="Accessibility Upgrade at Huguenot Station, Staten Island"
        meta="Professional, Infrastructure, Transit, Architecture, Rendering, 3D Modeling, Urban Planning, ADA, Design-Build"
        caption="Worked as an architect to deliver design and construction documents of the new ramps to be installed at Huguenot Station in Staten Island, NY.
        Collaboration with disciplines included but are not limited to: Civil, Geotechnical, Structural, Mechanical, Electrical, Plumbing, Fire Protection, Communication.
        I was responsible for architectural design and drawings, and the following renderings."
        images={images}
      />
    </>
  );
};

export default Huguenot;
