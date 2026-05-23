import React from "react";
import Gallery from "../../components/Gallery";
import Slideshow from "../../components/Slideshow";
import ProjectNav from "../../components/ProjectNav";

import view1 from "../../assets/huguenot/view01.webp";
import view2 from "../../assets/huguenot/view02.webp";
import view3 from "../../assets/huguenot/view03.webp";
import view4 from "../../assets/huguenot/view04.webp";
import view5 from "../../assets/huguenot/view05.webp";
import view6 from "../../assets/huguenot/view06.webp";

import harlem1 from "../../assets/harlem/view01.webp";
import harlem2 from "../../assets/harlem/view02.webp";
import harlem3 from "../../assets/harlem/view03.webp";
import harlem4 from "../../assets/harlem/view04.webp";
import harlem5 from "../../assets/harlem/view05.webp";
import harlem6 from "../../assets/harlem/view06.webp";

import patchogue01 from "../../assets/patchogue/patchogue01.webp";
import patchogue02 from "../../assets/patchogue/patchogue02.webp";
import patchogue03 from "../../assets/patchogue/patchogue03.webp";
import patchogue04 from "../../assets/patchogue/patchogue04.webp";
import patchogue05 from "../../assets/patchogue/patchogue05.webp";
import patchogue06 from "../../assets/patchogue/patchogue06.webp";

import marc01 from "../../assets/marc/ext01.png";
import marc02 from "../../assets/marc/ext02.png";
import marc03 from "../../assets/marc/ext03.png";
import marc04 from "../../assets/marc/ext04.png";
import marc05 from "../../assets/marc/ext05.png";
import marc06 from "../../assets/marc/ext06.png";
import marc07 from "../../assets/marc/nb01.jpg";
import marc08 from "../../assets/marc/nb02.jpg";
import marc09 from "../../assets/marc/sb01.jpg";
import marc10 from "../../assets/marc/sb02.jpg";

import marclight01 from "../../assets/marc/light-nb01.webp";
import marclight02 from "../../assets/marc/light-nb02.webp";
import marclight03 from "../../assets/marc/light-sb01.webp";
import marclight04 from "../../assets/marc/light-sb02.webp";

const patchogues = [
  patchogue01,
  patchogue02,
  patchogue03,
  patchogue04,
  patchogue05,
  patchogue06,
];

const images = [view1, view2, view3, view4, view5, view6];

const harlems = [harlem1, harlem2, harlem3, harlem4, harlem5, harlem6];

const marc = [
  marc01,
  marc02,
  marc03,
  marc04,
  marc05,
  marc06,
  marc07,
  marc08,
  marc09,
  marc10,
];

const marclights = [marclight01, marclight02, marclight03, marclight04];

const Huguenot = () => {
  return (
    <>
      <Gallery
        title="Huguenot Station ADA Upgrade"
        subtitle="Accessibility Upgrade at Huguenot Station, Staten Island"
        meta="Professional, Infrastructure, Transit, Architecture, Rendering, 3D Modeling, Urban Planning, ADA, Design-Build"
        caption="Worked as an architect to deliver design and construction documents of the new ramps to be installed at Huguenot Station in Staten Island, NY.
        Collaboration with disciplines included but are not limited to: Civil, Geotechnical, Structural, Mechanical, Electrical, Plumbing, Fire Protection, Communication.
        I was responsible for architectural design and drawings, and the following renderings."
      />

      <div className="flex flex-col justify-center items-center">
        <Slideshow images={images} />
      </div>
      <Gallery
        title="Harlem 148th Station ADA Upgrade"
        subtitle="Accessibility Upgrade at 148th Street Station, Harlem"
        meta="Professional, Infrastructure, Transit, Architecture, Urban Planning, Rendering, 3D Modeling, ADA, Design-Build"
        caption="Worked as an architect to deliver design and construction documents of the new ramps to be installed at the Harlem 148th St Station in New York, NY.
        Collaboration with disciplines included but are not limited to: Civil, Geotechnical, Structural, Mechanical, Electrical, Plumbing, Fire Protection, Communication.
        I was responsible for architectural design and drawings, and the following renderings."
      />

      <div className="flex flex-col justify-center items-center">
        <Slideshow images={harlems} />
      </div>

      <Gallery
        title="Patchogue Station Renovation"
        subtitle="Breathing A New Life Into the Oceanside Town's Beloved Train Station"
        meta="Professional, Infrastructure, Transit, Architecture, Rendering, 3D Modeling, Urban Planning, ADA, Design-Build"
        caption="Worked as an architect to deliver proposal graphics to the Patchogue Station Renovation project in Long Island, NY.
              I was responsible for producing the 3D model and renderings from scratch."
      />
      <div className="flex flex-col justify-center items-center">
        <Slideshow images={patchogues} />
      </div>

      <Gallery
        title="West Baltimore MARC Station"
        subtitle="Breathing A New Life Into the Oceanside Town's Beloved Train Station"
        meta="Professional, Infrastructure, Transit, Architecture, Rendering, 3D Modeling, Urban Planning, ADA, Design-Build"
        caption="Worked as an architect to deliver proposal graphics to the Patchogue Station Renovation project in Long Island, NY.
              I was responsible for producing the 3D model and renderings from scratch."
      />
      <div className="flex flex-col justify-center items-center">
        <Slideshow images={marc} />
      </div>

      <div className="flex flex-col justify-center items-center">
        <Slideshow images={marclights} />
      </div>

      <ProjectNav
        prev={{ path: "/work/language", label: "Final Thesis Portfolio" }}
        next={{ path: "/work/penn", label: "Penn Station Reconstruction" }}
      />
    </>
  );
};

export default Huguenot;
