import React from "react";
import Gallery from "../../components/Gallery";
import ProjectNav from "../../components/ProjectNav";

import image01 from "../../assets/cartography/canada-relief.jpg";
import image02 from "../../assets/cartography/canada-landcover.jpg";
import image03 from "../../assets/cartography/canada-shipping.jpg";
import image04 from "../../assets/cartography/canada-foodinsecurity.jpg";
import image05 from "../../assets/cartography/canada-foodnetwork.jpg";
import image06 from "../../assets/cartography/nunavut.jpg";
import image07 from "../../assets/cartography/kitikmeot.jpg";
import image08 from "../../assets/cartography/cambridgebay1.jpg";
import image09 from "../../assets/cartography/cambridgebay2.jpg";

import image10 from "../../assets/cartography/siteplan.jpg";

import image11 from "../../assets/cartography/museum-axon1.jpg";
import image12 from "../../assets/cartography/museum-axon2.jpg";
import image13 from "../../assets/cartography/site.jpg";

const images = [
  image01,
  image02,
  image03,
  image04,
  image05,
  image06,
  image07,
  image08,
  image09,
  image10,
  image11,
  image12,
  image13,
];

const Cartography = () => {
  return (
    <>
      <Gallery
        title="Cartography and GIS"
        subtitle="Spatial Data and its Representation"
        meta="Academic, Professional, GIS, ArchGIS, Graphic Design, Architecture, Urban Planning"
        caption="Include a series of maps produced for both academic and professional work"
        images={images}
      />

      <ProjectNav
        prev={{
          path: "/work/gymnastics",
          label: "U.S. Gymnastics Development Center",
        }}
        next={{ path: "/work/homepagevideo", label: "Homepage Video" }}
      />
    </>
  );
};

export default Cartography;
