import React from "react";
import Gallery from "../../components/Gallery";

import image01 from "../../assets/patchogue/view01.png";
import image02 from "../../assets/patchogue/view02.png";
import image03 from "../../assets/patchogue/view03.png";
import image04 from "../../assets/patchogue/view04.png";
import image05 from "../../assets/patchogue/exterior01.png";
import image06 from "../../assets/patchogue/exterior02.png";

const images = [image01, image02, image03, image04, image05, image06];

const Patchogue = () => {
  return (
    <>
      <Gallery
        title="Patchogue Station Renovation"
        subtitle="Breathing New Life into the Town's Beloved Station"
        meta="Professional, Infrastructure, Transit, Architecture, Rendering, 3D Modeling, Urban Planning, ADA, Design-Build"
        caption="Worked as an architect to deliver proposal graphics to the Patchogue Station Renovation project in Long Island, NY.
        I was responsible for producing the 3D model and renderings from scratch."
        images={images}
      />
    </>
  );
};

export default Patchogue;
