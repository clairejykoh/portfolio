import React from "react";
import Gallery from "../../components/Gallery";

import image01 from "../../assets/patchogue/patchogue01.webp";
import image02 from "../../assets/patchogue/patchogue02.webp";
import image03 from "../../assets/patchogue/patchogue03.webp";
import image04 from "../../assets/patchogue/patchogue04.webp";
import image05 from "../../assets/patchogue/patchogue05.webp";
import image06 from "../../assets/patchogue/patchogue06.webp";

const images = [image01, image02, image03, image04, image05, image06];

const Patchogue = () => {
  return (
    <>
      <Gallery
        title="Patchogue Station Renovation"
        subtitle="Breathing New Life into the Town's Beloved Station in Patchogue, Long Island"
        meta="Professional, Infrastructure, Transit, Architecture, Rendering, 3D Modeling, Urban Planning, ADA, Design-Build"
        caption="Worked as an architect to deliver proposal graphics to the Patchogue Station Renovation project in Long Island, NY.
        I was responsible for producing the 3D model and renderings from scratch."
        images={images}
      />
    </>
  );
};

export default Patchogue;
