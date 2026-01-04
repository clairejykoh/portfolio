import React, { useRef, useState, useLayoutEffect, useCallback } from 'react'
import { gsap } from 'gsap'

import AAD1 from '../../assets/lla/AAD-1.jpg'
import AAD2 from '../../assets/lla/AAD-2.jpg'
import AAD3 from '../../assets/lla/AAD-3.jpg'
import AAD4 from '../../assets/lla/AAD-4.jpg'
import AAD5 from '../../assets/lla/AAD-5.jpg'
import AAD6 from '../../assets/lla/AAD-6.jpg'
import AAD7 from '../../assets/lla/AAD-7.jpg'
import AAD8 from '../../assets/lla/AAD-8.jpg'
import AAD9 from '../../assets/lla/AAD-9.jpg'
import AAD10 from '../../assets/lla/AAD-10.jpg'
import AAD11 from '../../assets/lla/AAD-11.jpg'
import AAD12 from '../../assets/lla/AAD-12.jpg'
import AAD13 from '../../assets/lla/AAD-13.jpg'
import AAD14 from '../../assets/lla/AAD-14.jpg'
import AAD15 from '../../assets/lla/AAD-15.jpg'
import AAD16 from '../../assets/lla/AAD-16.jpg'
import AAD17 from '../../assets/lla/AAD-17.jpg'
import AAD18 from '../../assets/lla/AAD-18.jpg'
import AAD19 from '../../assets/lla/AAD-19.jpg'
import AAD20 from '../../assets/lla/AAD-20.jpg'
import AAD21 from '../../assets/lla/AAD-21.jpg'
import AAD22 from '../../assets/lla/AAD-22.jpg'
import AAD23 from '../../assets/lla/AAD-23.jpg'
import AAD24 from '../../assets/lla/AAD-24.jpg'
import AAD25 from '../../assets/lla/AAD-25.jpg'
import AAD26 from '../../assets/lla/AAD-26.jpg'
import AAD27 from '../../assets/lla/AAD-27.jpg'
import AAD28 from '../../assets/lla/AAD-28.jpg'
import AAD29 from '../../assets/lla/AAD-29.jpg'
import AAD30 from '../../assets/lla/AAD-30.jpg'
import AAD31 from '../../assets/lla/AAD-31.jpg'
import AAD32 from '../../assets/lla/AAD-32.jpg'
import AAD33 from '../../assets/lla/AAD-33.jpg'
import AAD34 from '../../assets/lla/AAD-34.jpg'
import AAD35 from '../../assets/lla/AAD-35.jpg'
import AAD36 from '../../assets/lla/AAD-36.jpg'
import AAD37 from '../../assets/lla/AAD-37.jpg'
import AAD38 from '../../assets/lla/AAD-38.jpg'
import AAD39 from '../../assets/lla/AAD-39.jpg'
import AAD40 from '../../assets/lla/AAD-40.jpg'
import AAD41 from '../../assets/lla/AAD-41.jpg'
import AAD42 from '../../assets/lla/AAD-42.jpg'
import AAD43 from '../../assets/lla/AAD-43.jpg'
import AAD44 from '../../assets/lla/AAD-44.jpg'
import AAD45 from '../../assets/lla/AAD-45.jpg'
import AAD46 from '../../assets/lla/AAD-46.jpg'
import AAD47 from '../../assets/lla/AAD-47.jpg'
import AAD48 from '../../assets/lla/AAD-48.jpg'
import AAD49 from '../../assets/lla/AAD-49.jpg'
import AAD50 from '../../assets/lla/AAD-50.jpg'
import AAD51 from '../../assets/lla/AAD-51.jpg'
import AAD52 from '../../assets/lla/AAD-52.jpg'
import AAD53 from '../../assets/lla/AAD-53.jpg'
import AAD54 from '../../assets/lla/AAD-54.jpg'

const images = [
  AAD1, AAD2, AAD3, AAD4, AAD5, AAD6, AAD7, AAD8, AAD9, 
  AAD10, AAD11, AAD12, AAD13, AAD14, AAD15, AAD16, AAD17, AAD18, AAD19, 
  AAD20, AAD21, AAD22, AAD23, AAD24, AAD25, AAD26, AAD27, AAD28, AAD29, 
  AAD30, AAD31, AAD32, AAD33, AAD34, AAD35, AAD36, AAD37, AAD38, AAD39, 
  AAD40, AAD41, AAD42, AAD43, AAD44, AAD45, AAD46, AAD47, AAD48, AAD49, 
  AAD50, AAD51, AAD52, AAD53, AAD54 
]

const Language = () => {
  return (
<div className="image-column mix-blend-multiply">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`AAD-${i + 1}`}
          className="image-item"
          loading="lazy"
        />
      ))}
    </div>
  )
}

export default Language
