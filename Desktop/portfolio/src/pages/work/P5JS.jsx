import React from "react";
import IFrame from "../../components/IFrame";
import Gallery from "../../components/Gallery";
import RoseSketch from "../../components/RoseSketch";
import TangledSketch from "../../components/TangledSketch";

const P5JS = () => {
  return (
    <>
      <Gallery
        title="Play (p5.js)"
        subtitle="Creative Coding Using p5.js"
        meta="Academic, Programming, Javascript, p5.js"
      />
      <div className="my-20 flex flex-col items-center gap-20">
        <RoseSketch />
        <TangledSketch />
      </div>
    </>
  );
};

export default P5JS;
