import React from 'react'
import { NavLink } from 'react-router-dom';

const Navigation = () => {
        const navLists = ["Home", "Work", "About"];
  return (
    <header className="flex flex-1 fixed top-0 z-20 justify-end max-sm:hidden w-full py-10 sm:px-40 px-5 items-center">

        <nav className="flex gap-80 my-5 text-md">
          <NavLink to="/portfolio" className={({ isActive }) =>
              `relative inline-block px-1
              ${isActive ? 'text-amber-400' : 'text-black'}
              after:content-[''] after:absolute after:left-0 after:-bottom-2
              after:h-[4px] after:w-full after:bg-amber-400
              after:origin-left after:scale-x-0
              after:transition-transform after:duration-300
              hover:after:scale-x-100`
            }
            >
              HOME
          </NavLink>
          <NavLink to="/work" className={({ isActive }) =>
              `relative inline-block px-1
              ${isActive ? 'text-amber-400' : 'text-black'}
              after:content-[''] after:absolute after:left-0 after:-bottom-2
              after:h-[4px] after:w-full after:bg-amber-400
              after:origin-left after:scale-x-0
              after:transition-transform after:duration-300
              hover:after:scale-x-100`
            }
            >
              WORK
          </NavLink>

          <NavLink
            to="/about" className={({ isActive }) =>
              `relative inline-block px-1
              ${isActive ? 'text-amber-400' : 'text-black'}
              after:content-[''] after:absolute after:left-0 after:-bottom-2
              after:h-[4px] after:w-full after:bg-amber-400
              after:origin-left after:scale-x-0
              after:transition-transform after:duration-300
              hover:after:scale-x-100`
            }
          >
            ABOUT
          </NavLink>
        </nav>

    </header>
  )
}

export default Navigation
