import React from "react";
import Gallery from "../../components/Gallery";
import ScrollGallery from "../../components/ScrollGallery";

import cubehouse1 from "../../assets/woodworking/1.jpg";
import cubehouse2 from "../../assets/woodworking/2.jpg";
import cubehouse3 from "../../assets/woodworking/3.jpg";
import cubehouse4 from "../../assets/woodworking/5.jpg";
import cubehouse5 from "../../assets/woodworking/6.jpg";
import cubehouse6 from "../../assets/woodworking/7.jpg";
import cubehouse7 from "../../assets/woodworking/8.jpg";

import fcd1 from "../../assets/woodworking/2-1.jpg";

const images = [
  cubehouse1,
  cubehouse2,
  cubehouse3,
  cubehouse4,
  cubehouse5,
  cubehouse6,
  cubehouse7,
  fcd1,
];

const Woodworking = () => {
  return (
    <Gallery
      title="Woodworking"
      subtitle="Fabricating with the Most Versatile Material"
      meta="Academic, Personal, Architecture, Fabrication, Modeling, Prototyping"
      images={images}
    />
  );
};

export default Woodworking;
