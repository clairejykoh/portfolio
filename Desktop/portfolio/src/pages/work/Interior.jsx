import React from "react";
import Gallery from "../../components/Gallery";
import Slideshow from "../../components/Slideshow";
import ProjectNav from "../../components/ProjectNav";

import chestnut01 from "../../assets/interior/35chestnut01.webp";
import chestnut02 from "../../assets/interior/35chestnut02.webp";
import chestnut03 from "../../assets/interior/35chestnut03.webp";
import chestnut04 from "../../assets/interior/35chestnut04.webp";

import ellsworth01 from "../../assets/interior/ellsworth01.webp";
import ellsworth02 from "../../assets/interior/ellsworth02.webp";
import ellsworth03 from "../../assets/interior/ellsworth03.webp";
import ellsworth04 from "../../assets/interior/ellsworth04.webp";

import primarybath01 from "../../assets/interior/primarybath01.png";
import primarybath02 from "../../assets/interior/primarybath02.png";
import primarybath03 from "../../assets/interior/primarybath03.png";

import maplelane01 from "../../assets/interior/maplelane01.webp";
import maplelane02 from "../../assets/interior/maplelane02.webp";
import maplelane03 from "../../assets/interior/maplelane03.webp";

import view1 from "../../assets/dusk/dusk01.webp";
import view2 from "../../assets/dusk/dusk02.webp";
import view3 from "../../assets/dusk/dusk03.webp";
import view4 from "../../assets/dusk/dusk04.webp";
import view5 from "../../assets/dusk/dusk05.webp";
import view6 from "../../assets/dusk/dusk07.webp";

const chestnuts = [chestnut01, chestnut02, chestnut03, chestnut04];

const ellsworths = [ellsworth01, ellsworth02, ellsworth03, ellsworth04];

const primarybaths = [primarybath01, primarybath02, primarybath03];

const maplelanes = [maplelane01, maplelane02, maplelane03];

const dusks = [view6, view2, view1, view3, view4, view5];

const Interior = () => {
  return (
    <>
      <Gallery
        title="Interior Renderings"
        subtitle="Helping Designers & Clients Visualize Their Dream Home"
        meta="Professional, Freelance, Interior Design, 3D Modeling, Photorealistic Renderings"
        caption="Ellsworth Residence Kitchen"
      />
      <div className="flex flex-col justify-center items-center">
        <Slideshow images={ellsworths} width={1200} height={565} />
      </div>

      <Gallery caption="Finke Residence Primary Bath" />
      <div className="flex flex-col justify-center items-center">
        <Slideshow images={primarybaths} width={1200} height={565} />
      </div>
      <Gallery caption="35 Chestnut Living Room" />
      <div className="flex flex-col justify-center items-center">
        <Slideshow images={chestnuts} width={1200} height={525} />
      </div>

      <Gallery caption="305 Maple Lane Dining Room" />
      <div className="flex flex-col justify-center items-center">
        <Slideshow images={maplelanes} width={1200} height={508} />
      </div>
      <Gallery caption="Personal Project: Dusk" />
      <div className="flex flex-col justify-center items-center">
        <Slideshow images={dusks} width={1200} height={568} />
      </div>

      <ProjectNav
        prev={{
          path: "/work/marcstation",
          label: "Client Site & Project Visualization",
        }}
        next={{ path: "/work/p5js", label: "Play (p5.js)" }}
      />
    </>
  );
};

export default Interior;
