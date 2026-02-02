import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import ModelOrbitCanvas from "../../components/ModelOrbitCanvas";
import Gallery from "../../components/Gallery";
import Reveal from "../../components/Reveal";
import PopulateGallery from "../../components/PopulateGallery";

import pennlogo from "../../assets/penn_station/pennlogo-01.jpg";
import nyt from "../../assets/penn_station/nyt.jpg";

import frame02 from "../../assets/penn_station/frame02.jpg";

import frame04 from "../../assets/penn_station/frame04.jpg";

import frame06 from "../../assets/penn_station/frame06.jpg";
import frame07 from "../../assets/penn_station/frame07.jpg";

import frame10 from "../../assets/penn_station/frame10.jpg";
import frame11 from "../../assets/penn_station/frame11.jpg";

import ScrollGalleryNonSticky from "../../components/ScrollGalleryNonSticky";

const images = [frame02, pennlogo, frame04, frame06, frame07, frame10];

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

      <PopulateGallery
        images={images}
        pinnedIndex={1}
        pxPerItem={140}
        finalOverlaySrc={nyt}
        className="mix-blend-multiply mt-10 mb-40"
      />
    </>
  );
};

export default Penn;
