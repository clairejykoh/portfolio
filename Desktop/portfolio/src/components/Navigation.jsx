import React from "react";
import { NavLink, useMatch } from "react-router-dom";

const Navigation = () => {
  const navLists = ["Home", "Work", "About"];
  return (
    <header className="navbar relative flex flex-1 top-0 z-[1000] justify-end max-sm:hidden w-full py-10 sm:px-45 px-5 items-center">
      <nav className="flex gap-[16.6vw] my-5 text-md">
        <NavLink
          to="/portfolio"
          className={({ isActive }) =>
            `relative inline-block px-1
              ${isActive ? "text-amber-400" : "text-gray-750"}
              after:content-[''] after:absolute after:left-0 after:-bottom-2
              after:h-[4px] after:w-full after:bg-amber-400
              after:origin-left after:scale-x-0
              after:transition-transform after:duration-300
              hover:after:scale-x-100`
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/work"
          end={false}
          className={({ isActive }) =>
            `relative inline-block px-1
              ${isActive ? "text-amber-400" : "text-gray-750"}
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
          to="/about"
          className={({ isActive }) =>
            `relative inline-block px-1
              ${isActive ? "text-amber-400" : "text-gray-750"}
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
  );
};

export default Navigation;
