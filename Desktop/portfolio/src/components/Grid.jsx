import React from 'react'
import workstation from '../assets/workstation.jpg';
import concrete_key from '../assets/concrete_key.jpg';
import east_liberty from '../assets/east_liberty.jpg';
import final_bench from '../assets/final_bench.png';

const items = [
    { image: workstation, 
      title: "Workstation", 
      subtitle: "Modeled in AutoCAD, Animated in 3DS MAX",
      keywords: "3D Modeling, 3D Animation Motion Graphics", 
    },
    { image: concrete_key, 
      title: "Concrete Keycaps",
      subtitle: "Industrial Design Meets Architecture",
      keywords: "3D Modeling, 3D Printing",
    },
    { image: east_liberty, 
      title: "Porous City",
      subtitle: "Porous Architecture",
      keywords: "Urban Planning, Architecture, Rhino 3D, Enscape, Digital Collage",
    },
    { image: final_bench, 
      title: "Dusk",
      subtitle: "Nostalgic for What, I Can't Tell",
      keywords: "Rhino, 3DS MAX, Blender"

    }
];

const Grid = () => {
  return (
    <div className="mix-blend-multiply mt-50 mx-40 columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 px-4">
      {items.map((item, index) => (

        
        <div key={index} className="break-inside-avoid">
                    {/* Caption below the card */}
          {item.title && (
            <div className="font-italiana text-3xl mt-1 text-gray-700 px-1">
              {item.title}
            </div>
          )}
          {/* Card with rounded shadow */}
          <div className="relative group overflow-hidden shadow-md">
            <img
              src={item.image}
              alt={item.keywords || `Image ${index + 1}`}
              className="w-full h-auto object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

            {/* Title and subtitle */}
            {(item.title || item.subtitle) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                {item.keywords && (
                  <p className="font-italiana text-gray-200 text-2xl mt-1 drop-shadow-sm">
                    {item.subtitle}
                  </p>
                )}
                {item.subtitle && (
                  <p className=" text-gray-200 text-[15px] mt-1 drop-shadow-sm">
                    {item.keywords}
                  </p>
                )}
              </div>
            )}
          </div>




        </div>
      ))}
    </div>
  );
};


export default Grid