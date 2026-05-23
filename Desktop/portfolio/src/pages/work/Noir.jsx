import React from "react";
import Gallery from "../../components/Gallery";
import ScrollAutoplayVideo from "../../components/ScrollAutoplayVideo";
import ProjectNav from "../../components/ProjectNav";

import view1 from "../../assets/noir/image01.jpg";
import view2 from "../../assets/noir/image02.jpg";
import view3 from "../../assets/noir/image03.jpg";
import view4 from "../../assets/noir/image04.jpg";
import view5 from "../../assets/noir/image05.jpg";
import view6 from "../../assets/noir/image06.jpg";
import view7 from "../../assets/noir/image07.jpg";

const images = [view1, view2, view3, view4, view5, view6, view7];

const Noir = () => {
  return (
    <>
      <Gallery
        title="Noir"
        subtitle="Render Material Study"
        meta="3D Modeling, Rendering, Photorealism, Motion Graphics, Brand Design"
        caption="Studying various rendering material textures."
      />
      <div className="bg-[#121212] mt-20">
        "
        <div className="mix-blend-normal mx-80 grid grid-cols-2 gap-10 my-30">
          <img
            src={view1}
            alt="Noir Image 06"
            className="flex w-full h-auto col-span-1"
          />

          <img
            src={view4}
            alt="Noir Image 05"
            className="flex w-full h-auto col-span-1"
          />

          <img
            src={view2}
            alt="Noir Image 04"
            className="flex w-full h-auto col-span-1"
          />

          <img
            src={view3}
            alt="Noir Image 04"
            className="flex w-full h-auto col-span-1"
          />
        </div>
        <div className="mx-80">
          <ScrollAutoplayVideo
            src="/portfolio/videos/noir.mp4"
            muted={true}
            className="flex w-full items-center justify-center mix-blend-normal brightness-120 mt-40 mb-20"
          />
          "
        </div>
      </div>

      <ProjectNav
        prev={{ path: "/work/patchogue", label: "New Southbank Theatre" }}
        next={{ path: "/work/language", label: "Final Thesis Portfolio" }}
      />
    </>
  );
};

export default Noir;
