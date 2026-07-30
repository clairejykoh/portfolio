import React from "react";
import Gallery from "../../components/Gallery";
import OverlappingImage from "../../components/OverlappingImage";
import ProjectNav from "../../components/ProjectNav";

import homevideoUnderlay from "../../assets/homevideo/homevideo_underlay.png";
import homevideoOverlay from "../../assets/homevideo/homevideo_overlay.png";
import portfoliovideo from "../../assets/homevideo/Portfolio_Video.mp4";

const images = [homevideoUnderlay, homevideoOverlay];

const HomepageVideo = () => {
  return (
    <>
      <Gallery
        title="Homepage Video"
        subtitle="Introducing Myself"
        meta="Personal, 3D Modeling, Rendering, Motion Graphics, Visual Storytelling, After Effects, Premiere Pro, 3DS MAX"
        caption="Planning and execution of the landing page video. (Scroll to see video control on Chrome)"
      />
      <div className="flex flex-col overflow-hidden items-center justify-center h-auto w-[1500px] my-25 mx-auto shadow-card">
        <video
          src={portfoliovideo}
          type="video/mp4"
          className="flex flex-col justify-center items-center w-[1500px] h-full object-cover mix-blend-multiply"
          controls
          playsInline
        ></video>
      </div>
      <OverlappingImage images={images} className="items-center mb-20 mt-10" />
    </>
  );
};

export default HomepageVideo;
