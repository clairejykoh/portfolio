import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import ModelOrbitCanvas from "../../components/ModelOrbitCanvas";
import Gallery from "../../components/Gallery";
import Reveal from "../../components/Reveal";
import PopulateGallery from "../../components/PopulateGallery";

import pennlogo from "../../assets/penn_station/pennlogo-01.jpg";

import frame01 from "../../assets/penn_station/frame01.jpg";
import frame02 from "../../assets/penn_station/frame02.jpg";
import frame03 from "../../assets/penn_station/frame03.jpg";
import frame04 from "../../assets/penn_station/frame04.jpg";
import frame05 from "../../assets/penn_station/frame05.jpg";
import frame06 from "../../assets/penn_station/frame06.jpg";
import frame07 from "../../assets/penn_station/frame07.jpg";
import frame08 from "../../assets/penn_station/frame08.jpg";

import frame10 from "../../assets/penn_station/frame10.jpg";
import frame11 from "../../assets/penn_station/frame11.jpg";
import frame12 from "../../assets/penn_station/frame12.jpg";

import ScrollGalleryNonSticky from "../../components/ScrollGalleryNonSticky";

const images = [frame02, frame04, frame06, frame07, frame10, frame11, frame12];

const Penn = ({ frames }) => {
  const { key } = useLocation();
  const scrollRef = useRef(null);
  return (
    <>
      <Gallery
        title="Penn Station Reconstruction"
        subtitle="Redesigning the Busiest Station in the World"
        meta="Professional, Transit, Infrastructure, Federal Project, NYC, Three.js, Rhino 3D, Grasshopper, Parametric Design"
        caption=" "
      />

      <Reveal delay={0.2}>
        <ModelOrbitCanvas />
      </Reveal>

      <div className="flex flex-row mb-10">
        <div className="mx-auto max-w-[1000px] max-h-[1000px] grid grid-cols-5 items-center">
          <div className="mt-25 col-span-3">
            <Gallery images={[pennlogo]} />
          </div>

          <div className="col-span-2"></div>
        </div>
      </div>
      <PopulateGallery
        images={images}
        width="min(930px, 92vw)"
        align="center"
        columns={2}
        columnGap={18}
        itemGap={18}
        startAfterTopPx={0} // starts revealing 120px after component top
        pxPerItem={110} // reveal speed
        randomSeed="gallery-v1" // change this string to reshuffle
        className="mt-20 mb-100"
      />
    </>
  );
};

export default Penn;
