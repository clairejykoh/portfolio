import React from "react";
import CaseStudy from "../../components/Casestudy";
import ScrollAutoplayVideo from "../../components/ScrollAutoplayVideo";

import gymnastics01 from "../../assets/gymnastics/gymnastics01.jpg";
import gymnastics02 from "../../assets/gymnastics/gymnastics02.jpg";
import gymnastics03 from "../../assets/gymnastics/gymnastics03.jpg";
import gymnastics04 from "../../assets/gymnastics/gymnastics04.jpg";
import gymnastics05 from "../../assets/gymnastics/gymnastics05.jpg";
import gymnastics06 from "../../assets/gymnastics/gymnastics06.jpg";
import gymnastics07 from "../../assets/gymnastics/gymnastics07.jpg";
import gymnastics10 from "../../assets/gymnastics/gymnastics10.jpg";

import usgym from "../../assets/gymnastics/usgym.mp4";
import aboutus from "../../assets/gymnastics/aboutUs.mp4";
import rec from "../../assets/gymnastics/rec.mp4";
import comp from "../../assets/gymnastics/comp.mp4";
import lastpart from "../../assets/gymnastics/lastpart.mp4";

const images = [
  gymnastics01,
  gymnastics02,
  gymnastics03,
  gymnastics04,
  gymnastics07,
];

const images2 = [gymnastics05, gymnastics06, gymnastics10];

const Gymnastics = () => {
  return (
    <>
      <div>
        <CaseStudy
          title="U.S. Gymnastics Development Center"
          subtitle="Redesigning Digital Experience and Communication System for the Gymnastics Facility"
          meta="Professional, UX/UI, Website, Web Design, Concept Design"
          caption="Presenting a preliminary web/UI design idea and communication strategy for US Gymnastics Development Center, where I have been a student for the past three years."
          images={images}
        />
      </div>

      <div className="mx-40">
        <ScrollAutoplayVideo
          src={usgym}
          muted={true}
          className="flex w-full items-center justify-center mix-blend-multiply mt-40"
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
