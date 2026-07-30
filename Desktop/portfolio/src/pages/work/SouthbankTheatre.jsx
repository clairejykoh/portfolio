import React from "react";
import Gallery from "../../components/Gallery";

import sbc1 from "../../assets/southbanktheatre/sbc-1.jpg";
import sbc2 from "../../assets/southbanktheatre/sbc-2.jpg";

const images = [sbc1, sbc2];

import ProjectNav from "../../components/ProjectNav";

const SouthbankTheatre = () => {
  return (
    <div>
      <Gallery
        title="New Southbank Theatre"
        subtitle="Exploring Three-Way Intersection of Linguistics, Environments, and Built Space"
        meta="Academic, Portfolio, Architecture, Planning, InDesign, Linguistics, Toponym, Storytelling"
        images={images}
      />
    </div>
  );
};

export default SouthbankTheatre;
