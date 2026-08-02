import React from "react";
import Gallery from "../../components/Gallery";
import ProjectNav from "../../components/ProjectNav";

import sbc1 from "../../assets/southbanktheatre/sbc-0.jpg";
import sbc2 from "../../assets/southbanktheatre/sbc-2.jpg";
import sbc3 from "../../assets/southbanktheatre/sbc-3.jpg";
import sbc4 from "../../assets/southbanktheatre/sbc-4.jpg";
import sbc5 from "../../assets/southbanktheatre/sbc-5.jpg";
import sbc6 from "../../assets/southbanktheatre/sbc-6.jpg";
import sbc9 from "../../assets/southbanktheatre/sbc-9.jpg";
import sbc10 from "../../assets/southbanktheatre/sbc-10.jpg";
import sbc11 from "../../assets/southbanktheatre/sbc-13.jpg";
import sbc12 from "../../assets/southbanktheatre/sbc-15.jpg";
import sbc13 from "../../assets/southbanktheatre/sbc-16.jpg";
import sbc17 from "../../assets/southbanktheatre/sbc-17.jpg";
import sbc18 from "../../assets/southbanktheatre/sbc-18.jpg";
import sbc19 from "../../assets/southbanktheatre/sbc-11.jpg";
import sbc20 from "../../assets/southbanktheatre/sbc-12.jpg";

const images = [
  sbc1,
  sbc9,
  sbc10,
  sbc11,
  sbc12,
  sbc13,
  sbc17,
  sbc2,
  sbc3,
  sbc18,
  sbc4,
  sbc5,
  sbc6,
  sbc19,
  sbc20,
];

const SouthbankTheatre = () => {
  return (
    <>
      <Gallery
        title="New Southbank Theatre"
        subtitle="English Garden, Landscape, and a Midsummer Night's Dream Lending a Humanizing Touch to Brutalism"
        meta="Architecture, Landscape Architecture, Planning, 3D Modeling, Rendering, Storytelling, Proposal"
        caption="The Southbank Centre of London is a cultural complex built in the 1950s as Britain's postwar effort to elevate the morale of the nation. The site and the buildings adopted brutalism as their architectural style for its functionality and efficiency. Its multi-leveled walkways provide multiple points of access and circulation, but also present many unused/inaccessible spaces.

The project goal was to design a new buiding to sit on the site — a flexible blackbox theatre that could house multiple types of programs. 
I developed a concept of celebrating English Landscape, Garden and Romanticism - as seen in the valleys of Peak Districts, the fields of Yorkshire Moors and the rough cliffs of Cornwall - that has borne some of the greatest literary and theatrical pieces such as The Remains of the Day, Wuthering Heights, and The Midsummer Night’s Dream. The result will liven up the site that used to be comprised of continuous monochrome concrete. Buildings and walkways will be designed to emphasize the landscape-like morphology of the site and to enhance the holistic theatrical experience for the visitors."
        images={images}
      />

      <ProjectNav
        prev={{
          path: "/work/p5js",
          label: "Play (p5.js)",
        }}
        next={{ path: "/work/noir", label: "Noir" }}
      />
    </>
  );
};

export default SouthbankTheatre;
