import React from "react";
import Gallery from "../../components/Gallery";

import marc01 from "../../assets/marcclient/marc01.jpg";
import marc02 from "../../assets/marcclient/marc02.jpg";
import marc03 from "../../assets/marcclient/marc03.jpg";
import marc04 from "../../assets/marcclient/marc04.jpg";
import marc05 from "../../assets/marcclient/marc05.jpg";
import marc06 from "../../assets/marcclient/marc06.jpg";
import marc07 from "../../assets/marcclient/marc07.jpg";

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
  marc01,
  marc02,
  marc03,
  marc04,
  marc05,
  marc06,
  marc07,
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
          title="Client Portal & Project Visualization"
          subtitle="for West Baltimore MARC Station"
          meta="Professional, Infrastructure, Transit, Architecture, Urban Planning, 3D Modeling, 3D Visualization, UX/UI Design"
          caption="Worked as a designer to deliver client subsite design and layout, as well as visualization tools."
          images={images}
        />
      </div>
    </>
  );
};

export default MarcStation;
