import React from 'react'
import workstation from '../assets/workstation.jpg';
import concrete_key from '../assets/concrete_key.jpg';
import east_liberty from '../assets/east_liberty.jpg';
import final_bench from '../assets/final_bench.png';
import huguenot from '../assets/huguenot.png';
import interior from '../assets/interior.png';
import museum from '../assets/museum.jpg';
import penn from '../assets/penn.png';
import homevideo from '../assets/homevideo.png';
import woodworking from '../assets/woodworking.jpg';
import steam from '../assets/steam.jpg';
import cartography from '../assets/cartography.jpg';
import shape from '../assets/shape.gif';
import language from '../assets/lla.jpg';



const items = [
    { image: workstation, 
      title: "Workstation", 
      subtitle: "Modeled in AutoCAD, Animated in 3DS MAX",
      keywords: "3DS MAX, AutoCAD, 3D Modeling, 3D Animation, Motion Graphics", 
    },
    { image: concrete_key, 
      title: "Concrete Keycaps",
      subtitle: "Industrial Design Meets Architecture",
      keywords: "3D Modeling, 3D Printing, Digital Fabrication, Industrial Design",
    },
    { image: shape, 
      title: "Play (p5.js)",
      subtitle: "Spatial Data and Representation",
      keywords: "Academic, Professional, GIS, ArchGIS, QGIS, Architecture, Urban Planning, Infrastructure Design"
    },
    { image: east_liberty, 
      title: "Porous City",
      subtitle: "Porous Architecture",
      keywords: "Academic, Urban Planning, Architecture, Rhino 3D, Enscape, Digital Collage, Three.js",
    },
    { image: final_bench, 
      title: "Dusk",
      subtitle: "Nostalgic for What, I Can't Tell",
      keywords: "Rhinoceros 3D, 3DS MAX, Blender, Rendering"
    },
    { image: huguenot, 
      title: "Huguenot Station ADA Upgrade",
      subtitle: "Accessibility Upgrade in Huguenot Station, Staten Island",
      keywords: "Professional, Infrastructure, Transit, Architecture, ADA, Design-Build"
    },
    { image: steam, 
      title: "Hacking the Steam",
      subtitle: "Imagining Playful New Possibilities for the Geothermal Infrastructure in Olkaria, Kenya",
      keywords: "Academic, Renewable Energy, 3D Modeling, Architecture, Virtual Architecture, Storytelling"
    },
    { image: homevideo, 
      title: "Homepage Video",
      subtitle: "Introducing Myself",
      keywords: "3D Modeling, Rendering, Motion Graphics, After Effects, Premiere Pro, 3DS MAX"
    },
    { image: museum, 
      title: "Memorials of Forgotten Names",
      subtitle: "Anthropocene Museum 5.0: What is a Museum Anyways?",
      keywords: "Academic, Geography, Architecture, Landscape Design, Urban Planning, Anthropocene, Settler Colonialism, Museum"
    },
    { image: language, 
      title: "Language, Landscape, Architecture",
      subtitle: "Final Thesis Portfolio, Columbia University",
      keywords: "Academic, Portfolio, Architecture, Planning, PDF, InDesign, Linguistics, Toponym, Storytelling"
    },
    { image: penn, 
      title: "Penn Station Reconstruction",
      subtitle: "For the Busiest Station in the World",
      keywords: "Professional, Transit, Infrastructure, Federal Project, NYC, Three.js"
    },
    { image: woodworking, 
      title: "Woodworking",
      subtitle: "Anthropocene Museum 5.0: What is a Museum Anyways?",
      keywords: "Professional, Transit, Infrastructure, Federal Project, NYC"
    },
    { image: interior, 
      title: "Interior Renderings",
      subtitle: "Helping Designers and Clients Visualize Their Homes",
      keywords: "Professional, Freelance, Interior Design, Photorealistic Renderings"
    },
    { image: cartography, 
      title: "Cartography and GIS",
      subtitle: "Spatial Data and Representation",
      keywords: "Academic, Professional, GIS, ArchGIS, QGIS, Architecture, Urban Planning, Infrastructure Design"
    },


];

const Grid = () => {
  return (
    <div className="mix-blend-multiply mt-50 mx-40 columns-1 md:columns-2 lg:columns-3 gap-14 space-y-14 px-4">
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