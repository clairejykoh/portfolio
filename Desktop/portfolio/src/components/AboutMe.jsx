import React from 'react'
import dreaming from '../assets/dreaming.jpg';
import daydreaming from '../assets/daydreaming.gif';

const AboutMe = () => {
  return (
      <>
    <div className="flex items-center justify-center mt-25">
      <div className="flex items-center mix-blend-multiply">
        <img src={daydreaming} className="w-120"
            />
        <p className="flex-auto items-center text-xl font-italiana"> She's probably daydreaming right now... <br/>Please leave her a message at clairejuyeon@gmail.com</p>
    </div>
    </div>
    </>
  )
}

export default AboutMe
