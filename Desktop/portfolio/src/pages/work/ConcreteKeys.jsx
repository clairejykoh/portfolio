import React from "react";
import Gallery from "../../components/Gallery";
import ScrollAutoplayVideo from "../../components/ScrollAutoplayVideo";
import ConcreteIntro from "../../components/ConcreteIntro";
import TypeAnimation from "../../components/TypeAnimation";
import TypeAnimationMultiline from "../../components/TypeAnimationMultiline";

import ScrollGallery from "../../components/ScrollGallery";

import concrete from "../../assets/concrete_keys/concretewall.jpg";
import obsidian from "../../assets/concrete_keys/obsidian.jpg";

import progress01 from "../../assets/concrete_keys/progress01.jpg";
import progress02 from "../../assets/concrete_keys/progress02.jpg";
import progress03 from "../../assets/concrete_keys/progress03.jpg";
import progress04 from "../../assets/concrete_keys/progress04.jpg";
import progress05 from "../../assets/concrete_keys/progress05.jpg";
import progress06 from "../../assets/concrete_keys/progress06.jpg";
import progress07 from "../../assets/concrete_keys/progress07.jpg";

import axon from "../../assets/concrete_keys/axon.jpg";

import architecture01 from "../../assets/concrete_keys/architecture01.jpg";
import architecture02 from "../../assets/concrete_keys/architecture02.jpg";
import architecture03 from "../../assets/concrete_keys/architecture03.jpg";
import architecture04 from "../../assets/concrete_keys/architecture04.jpg";
import architecture05 from "../../assets/concrete_keys/architecture05.jpg";
import architecture06 from "../../assets/concrete_keys/architecture06.jpg";
import architecture07 from "../../assets/concrete_keys/architecture07.jpg";
import architecture08 from "../../assets/concrete_keys/architecture08.jpg";
import architecture09 from "../../assets/concrete_keys/architecture09.jpg";
import architecture10 from "../../assets/concrete_keys/architecture10.jpg";
import architecture11 from "../../assets/concrete_keys/architecture11.jpg";
import architecture12 from "../../assets/concrete_keys/architecture12.jpg";
import architecture13 from "../../assets/concrete_keys/architecture13.jpg";
import architecture14 from "../../assets/concrete_keys/architecture14.jpg";
import architecture15 from "../../assets/concrete_keys/architecture15.jpg";
import architecture16 from "../../assets/concrete_keys/architecture16.jpg";
import architecture17 from "../../assets/concrete_keys/architecture17.jpg";
import architecture18 from "../../assets/concrete_keys/architecture18.jpg";
import architecture19 from "../../assets/concrete_keys/architecture19.jpg";
import architecture20 from "../../assets/concrete_keys/architecture20.jpg";

import cover from "../../assets/concrete_keys/samples.jpg";
import concretekeycaps from "../../assets/concrete_keys/concretekeycaps.jpg";
import GalleryFull from "../../components/GalleryFull";
import ConcreteType from "../../components/ConcreteType";

const finishes = [cover, concretekeycaps];
const architecture = [
  architecture01,
  architecture02,
  architecture03,
  architecture04,
  architecture05,
  architecture06,
  architecture07,
  architecture08,
  architecture09,
  architecture10,
  architecture11,
  architecture12,
  architecture13,
  architecture14,
  architecture15,
  architecture16,
  architecture17,
  architecture18,
  architecture19,
  architecture20,
];

const ConcreteKeys = () => {
  return (
    <>
      <Gallery
        title="Concrete Keycaps"
        subtitle="Architecture Meets Industrial Design"
        meta="Personal, 3D Modeling, 3D Printing, Digital Fabrication, Industrial Design, Brand Design, Advertising"
        caption="Making of a concrete keycap, from Concept to Finish."
      />

      <ConcreteIntro imgTopSrc={concrete} imgBottomSrc={obsidian} />

      <div className="flex flex-col items-center justify">
        <div className="my-30"></div>
        <ScrollGallery
          frames={architecture}
          heightVh={300}
          className="mix-blend-multiply"
        />
        <ConcreteType
          videoSrc="/portfolio/videos/typing.mp4"
          heightVh={220}
          overlayMaxOpacity={0.6}
          justify="center" // "left" | "center" | "right"
          headline="Typing is a Multisensory Experience."
          maxWidthClass="max-w-3xl"
          typeEndAt={0.96}
          postTypeHoldSpan={0.12}
          overlayRestSpan={0.14}
          typeRestSpan={0.12}
        />

        <TypeAnimationMultiline
          text="That's why I wanted to try this unconventional material - to give keycaps the new look, sound and feel, and to let us experience the beauty of raw material, and expand it to an everyday object."
          panelClassName="w-full h-auto bg-[#010101] flex flex-center px-5 md:px-0"
          textClassName="text-3xl md:text-2xl font-extralight tracking-tight text-[#f5f5f5] max-w-[1000px]"
          startAt={0}
          endAt={0.9}
        />

        <div className="w-full h-auto bg-[#010101] flex flex-center">
          <div className="max-w-[1000px]">
            <p className="font-inter mb-5 text-2xl text-[#f5f5f5]">
              The Vision
            </p>
            <img src={axon} />
          </div>
        </div>

        <div className="w-full h-200 mb-20 bg-linear-to-b from-[rgb(1,1,1)] to-[#f5f5f5]"></div>
        <ScrollAutoplayVideo
          src="/portfolio/videos/sequence1.mp4"
          muted={true}
          className="w-[1600px] h-auto items-center mix-blend-multiply brightness-130 mt-10 my-20"
        />
      </div>

      <ScrollAutoplayVideo
        src="/portfolio/videos/sequence2.mp4"
        muted={true}
        className="w-full h-auto mix blend-multiply brightness-130"
      />

      <div className="flex flex-row justify-center mt-60">
        <div className="mx-auto max-w-[1000px]">
          <p className="font-inter mb-5 text-2xl">The Process</p>
          <div className="grid grid-cols-4 items-center">
            <Gallery images={[progress01]} className="col-span-2" />
            <div className="ml-10 text-xs text-justify col-span-2">
              <p className="text-xl font-inter">
                1
                <br />
              </p>
              <br />
              <br />
              Prepare a digital 3D model of the keycap stems.
            </div>
            <Gallery images={[progress02]} className="col-span-2" />
            <div className="ml-10 text-xs text-justify col-span-2">
              <p className="text-xl font-inter">2</p>
              <br />
              <br />
              Import the model to 3D printing program.
            </div>
            <Gallery images={[progress03]} className="col-span-2" />
            <div className="ml-10 text-xs text-justify col-span-2">
              <p className="text-xl font-inter">3</p>
              <br />
              <br />
              3D print the stems.
            </div>
            <Gallery images={[progress04]} className="col-span-2" />
            <div className="ml-10 text-xs text-justify col-span-2">
              <p className="text-xl font-inter">4</p>
              <br />
              <br />
              Pour the cement into mold with the stems fixed on the center and
              flushed with the top. Take out when dry.
            </div>
            <Gallery images={[progress05]} className="col-span-2" />
            <div className="ml-10 text-xs text-justify col-span-2">
              <p className="text-xl font-inter">5</p>
              <br />
              <br />
              Experiment with the texture.
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-center items-center">
        <div className="max-w-[1000px]">
          <p className="font-inter mt-35 mb-5 text-2xl">Finished Product</p>
          <Gallery images={finishes} className="mb-15" />
        </div>
      </div>
    </>
  );
};

export default ConcreteKeys;
