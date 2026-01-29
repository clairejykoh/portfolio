import React from "react";
import CaseStudy from "../../components/Casestudy";

import gymnastics01 from "../../assets/gymnastics/gymnastics01.jpg";
import gymnastics02 from "../../assets/gymnastics/gymnastics02.jpg";
import gymnastics03 from "../../assets/gymnastics/gymnastics03.jpg";
import gymnastics04 from "../../assets/gymnastics/gymnastics04.jpg";
import gymnastics05 from "../../assets/gymnastics/gymnastics05.jpg";
import gymnastics06 from "../../assets/gymnastics/gymnastics06.jpg";
import gymnastics07 from "../../assets/gymnastics/gymnastics07.jpg";
import gymnastics08 from "../../assets/gymnastics/gymnastics08.jpg";

const images = [
  gymnastics01,
  gymnastics02,
  gymnastics03,
  gymnastics04,
  gymnastics05,
  gymnastics06,
  gymnastics07,
  gymnastics08,
];

const Gymnastics = () => {
  return (
    <div>
      <CaseStudy
        title="U.S. Gymnastics Development Center"
        subtitle="Redesigning Digital Experience and Communication System for the Gymnastics Facility"
        meta="Professional, UX/UI, Website, Web Design, Concept Design"
        caption="Presenting a preliminary web/UI design idea and communication strategy for US Gymnastics Development Center, where I have been a student for the past three years."
        images={images}
      />
    </div>
  );
};

export default Gymnastics;
