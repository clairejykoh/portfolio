import React from "react";
import CaseStudy from "../../components/Casestudy";
import ScrollAutoplayVideo from "../../components/ScrollAutoplayVideo";

import gymnastics01 from "../../assets/gymnastics/gymnastics.png";
import gymnastics05 from "../../assets/gymnastics/gymnastics05.jpg";
import gymnastics06 from "../../assets/gymnastics/gymnastics06.jpg";

import usgym from "../../assets/gymnastics/usgym.mp4";
import aboutus from "../../assets/gymnastics/aboutUs.mp4";
import rec from "../../assets/gymnastics/rec.mp4";
import comp from "../../assets/gymnastics/comp.mp4";
import lastpart from "../../assets/gymnastics/lastpart.mp4";

const images = [gymnastics01];

const images2 = [gymnastics05, gymnastics06];

const Gymnastics = () => {
  return (
    <>
      <div>
        <CaseStudy
          title="U.S. Gymnastics Development Center"
          subtitle="Redesigning Digital Experience and Communication System for the Gymnastics Facility"
          meta="Professional, UX/UI, Website, Web Design, Concept Design, Product Design, Figma"
          caption="Presenting a preliminary web/UI design idea and communication strategy for US Gymnastics Development Center, where I have been a student for the past three years."
          images={images}
        />
      </div>

      <div className="mx-85">
        <ScrollAutoplayVideo
          src={usgym}
          muted={true}
          className="flex w-full items-center justify-center mix-blend-multiply mt-10"
        />
        <ScrollAutoplayVideo
          src={aboutus}
          muted={true}
          className="flex w-full items-center justify-center mix-blend-multiply"
        />
        <ScrollAutoplayVideo
          src={rec}
          muted={true}
          className="flex w-full items-center justify-center mix-blend-multiply"
        />
        <ScrollAutoplayVideo
          src={comp}
          muted={true}
          className="flex w-full items-center justify-center mix-blend-multiply"
        />
        <ScrollAutoplayVideo
          src={lastpart}
          muted={true}
          className="flex w-full items-center justify-center mix-blend-multiply"
        />
      </div>

      <div>
        <CaseStudy images={images2} className="mb-20" />
      </div>
    </>
  );
};

export default Gymnastics;
