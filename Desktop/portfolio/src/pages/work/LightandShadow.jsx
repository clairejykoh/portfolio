import React from "react";
import Gallery from "../../components/Gallery";
import lightandshadow from "../../assets/light_and_shadow/lightandshadow.mp4";

import ls01 from "../../assets/light_and_shadow/ls01.jpg";
import ls02 from "../../assets/light_and_shadow/ls02.jpg";
import ls03 from "../../assets/light_and_shadow/ls03.jpg";

import shadow01 from "../../assets/light_and_shadow/shadow01.webp";
import shadow02 from "../../assets/light_and_shadow/shadow02.webp";
import shadow03 from "../../assets/light_and_shadow/shadow03.webp";

import middle01 from "../../assets/light_and_shadow/middle01.webp";
import middle02 from "../../assets/light_and_shadow/middle02.webp";
import middle03 from "../../assets/light_and_shadow/middle03.webp";
import middle04 from "../../assets/light_and_shadow/middle04.webp";
import middle05 from "../../assets/light_and_shadow/middle05.webp";

import light01 from "../../assets/light_and_shadow/light01.webp";
import light02 from "../../assets/light_and_shadow/light02.webp";
import light03 from "../../assets/light_and_shadow/light03.webp";
import light04 from "../../assets/light_and_shadow/light04.webp";

import model01 from "../../assets/light_and_shadow/model01.webp";
import model02 from "../../assets/light_and_shadow/model02.webp";
import model03 from "../../assets/light_and_shadow/model03.webp";

const images = [
  ls01,
  ls02,
  ls03,
  shadow01,
  shadow02,
  shadow03,
  middle01,
  middle02,
  middle03,
  middle04,
  middle05,
  light01,
  light02,
  light03,
  light04,
  model01,
  model02,
  model03,
];

const LightandShadow = () => {
  return (
    <>
      <Gallery
        title="Light and Shadow"
        subtitle="Questioning the Limit of Architecture in Virtual Reality Using Unreal Engine"
        meta="Academic, Unreal Engine, 3D Design, Game Design, Level Design, Virtual Architecture, World Building, Optics, Caustics, Dramatic"
        caption="Virtual Reality - I believe the biggest challenge is the lack of holistic sensory experience. We only rely on visual and auditory stimulations, without tactile, olfactory or taste. We wanted to maximize and dramatize the effects of visual and auditory stimulations and experiment how these two senses could instill a specific and heightened mood, atmosphere or feelings.
        We chose the theme of light and shadow to see if the high contrast in visual stimulations through optics and caustics could make one feel totally immersed in the virtual environment.
        It starts out in pitch darkness, which is punctured only by occassional lights diffused in fog. Then you're carried through the middle section to the other side of the model: the light. "
      />
      <div className="flex flex-center mt-10 mb-35 bg-black">
        <div className="max-w-[1800px]">
          <video
            src={lightandshadow}
            type="video/mp4"
            className="flex flex-col justify-center items-center w-full h-full object-cover"
            controls
            playsInline
          ></video>
        </div>
      </div>

      <Gallery images={images} />
    </>
  );
};

export default LightandShadow;
