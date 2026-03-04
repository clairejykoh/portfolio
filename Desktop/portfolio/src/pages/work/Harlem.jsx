import React from "react";
import Gallery from "../../components/Gallery";

import view1 from "../../assets/harlem/view01.webp";
import view2 from "../../assets/harlem/view02.webp";
import view3 from "../../assets/harlem/view03.webp";
import view4 from "../../assets/harlem/view04.webp";
import view5 from "../../assets/harlem/view05.webp";
import view6 from "../../assets/harlem/view06.webp";

const harlems = [view1, view2, view3, view4, view5, view6];

const Harlem = () => {
  return (
    <>
      <Gallery
        title="Harlem 148th Station ADA Upgrade"
        subtitle="Accessibility Upgrade at 148th Street Station, Harlem"
        meta="Professional, Infrastructure, Transit, Architecture, Urban Planning, Rendering, 3D Modeling, ADA, Design-Build"
        caption="Worked as an architect to deliver design and construction documents of the new ramps to be installed at the Harlem 148th St Station in New York, NY.
        Collaboration with disciplines included but are not limited to: Civil, Geotechnical, Structural, Mechanical, Electrical, Plumbing, Fire Protection, Communication.
        I was responsible for architectural design and drawings, and the following renderings."
        images={images}
      />
    </>
  );
};

export default Harlem;
