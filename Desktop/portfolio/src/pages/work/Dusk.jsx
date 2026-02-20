import React from "react";
import Gallery from "../../components/Gallery";

import view1 from "../../assets/dusk/dusk01.webp";
import view2 from "../../assets/dusk/dusk02.webp";
import view3 from "../../assets/dusk/dusk03.webp";
import view4 from "../../assets/dusk/dusk04.webp";
import view5 from "../../assets/dusk/dusk05.webp";
import view6 from "../../assets/dusk/dusk07.webp";

const images = [view1, view2, view6, view3, view4, view5];

const Dusk = () => {
  return (
    <>
      <Gallery
        title="Dusk"
        subtitle="A Relaxing Memory"
        meta="Personal, Rhinoceros 3D, 3DS MAX, Blender, Rendering"
        caption="Wanted to create something that's relaxing to look at. Modeled with Rhino 3D and Blender, and rendered with Enscape."
        images={images}
      />
    </>
  );
};

export default Dusk;
