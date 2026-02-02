import React from "react";
import Gallery from "../../components/Gallery";

import view1 from "../../assets/harlem/view01.png";
import view2 from "../../assets/harlem/view02.png";
import view3 from "../../assets/harlem/view03.png";
import view4 from "../../assets/harlem/view04.png";
import view5 from "../../assets/harlem/view05.png";
import view6 from "../../assets/harlem/view06.png";

const images = [view1, view2, view3, view4, view5, view6];

const Harlem = () => {
  return (
    <>
      <Gallery
        title="Harlem 148th Station ADA Upgrade"
        subtitle="Accessibility Upgrade at 148th Street Station, Harlem"
        meta="Professional, Infrastructure, Transit, Architecture, Urban Planning, Rendering, 3D Modeling, ADA, Design-Build"
        caption="Worked as an architect to deliver design and construction documents of the new ramps to be installed at Huguenot Station in Staten Island, NY.
        Collaboration with disciplines included but are not limited to: Civil, Geotechnical, Structural, Mechanical, Electrical, Plumbing, Fire Protection, Communication.
        I was responsible for architectural design and drawings, and the following renderings."
        images={images}
      />
    </>
  );
};

export default Harlem;
