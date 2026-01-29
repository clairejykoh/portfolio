import React from "react";
import Gallery from "../../components/Gallery";

import chestnut01 from "../../assets/interior/35chestnut01.png";
import chestnut02 from "../../assets/interior/35chestnut02.png";
import chestnut03 from "../../assets/interior/35chestnut03.png";
import chestnut04 from "../../assets/interior/35chestnut04.png";

import ellsworth01 from "../../assets/interior/ellsworth01.png";
import ellsworth02 from "../../assets/interior/ellsworth02.png";
import ellsworth03 from "../../assets/interior/ellsworth03.png";
import ellsworth04 from "../../assets/interior/ellsworth04.png";

import primarybath01 from "../../assets/interior/primarybath01.png";
import primarybath02 from "../../assets/interior/primarybath02.png";
import primarybath03 from "../../assets/interior/primarybath03.png";

import maplelane01 from "../../assets/interior/305maplelane01.png";
import maplelane02 from "../../assets/interior/305maplelane02.png";
import maplelane03 from "../../assets/interior/305maplelane03.png";

const chestnuts = [chestnut01, chestnut02, chestnut03, chestnut04];

const ellsworths = [ellsworth01, ellsworth02, ellsworth03, ellsworth04];

const primarybaths = [primarybath01, primarybath02, primarybath03];

const maplelanes = [maplelane01, maplelane02, maplelane03];

const Interior = () => {
  return (
    <>
      <Gallery
        title="Interior Renderings"
        subtitle="Helping Designers & Clients Visualize"
        meta="Professional, Freelance, Interior Design, Photorealistic Renderings"
        caption="Ellsworth Residence Kitchen"
        images={ellsworths}
      />

      <Gallery caption="Finke Residence Primary Bath" images={primarybaths} />

      <Gallery caption="35 Chestnut Living Room" images={chestnuts} />

      <Gallery caption="305 Maple Lane Dining Room" images={maplelanes} />
    </>
  );
};

export default Interior;
