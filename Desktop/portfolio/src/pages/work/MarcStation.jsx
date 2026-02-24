import React from "react";
import Gallery from "../../components/Gallery";

import view1 from "../../assets/marc/nb01.jpg";
import view2 from "../../assets/marc/nb02.jpg";
import view3 from "../../assets/marc/sb01.jpg";
import view4 from "../../assets/marc/sb02.jpg";

import light01 from "../../assets/marc/light-nb01.webp";
import light02 from "../../assets/marc/light-nb02.webp";
import light03 from "../../assets/marc/light-sb01.webp";
import light04 from "../../assets/marc/light-sb02.webp";

import ext01 from "../../assets/marc/ext01.png";
import ext02 from "../../assets/marc/ext02.png";
import ext03 from "../../assets/marc/ext03.png";
import ext04 from "../../assets/marc/ext04.png";
import ext05 from "../../assets/marc/ext05.png";
import ext06 from "../../assets/marc/ext06.png";

import siteplan from "../../assets/marc/siteplan.jpg";

const images = [
  ext01,
  ext02,
  ext03,
  ext04,
  ext05,
  ext06,
  view1,
  view2,
  view3,
  view4,
  light01,
  light02,
  light03,
  light04,

  siteplan,
];

const MarcStation = () => {
  return (
    <>
      <div>
        <Gallery
          title="West Baltimore MARC Station"
          subtitle="Federal Project Involving Architectural Design, Visualization and Client Portal"
          meta="Professional, Infrastructure, Transit, Architecture, Urban Planning, Rendering, 3D Modeling, 3D Visualization, UI Design"
          caption="Worked as an architect to deliver design, construction documents and 3D visualization for the new West Baltimore MARC Station in Baltimore, MD."
          images={images}
        />
      </div>
      <div className="flex flex-center justify-center mt-10 mb-20">
        Due to the nature of the sensitive project and personal information
        involved, the client portal is not publicly shown at the moment.
      </div>
    </>
  );
};

export default MarcStation;
