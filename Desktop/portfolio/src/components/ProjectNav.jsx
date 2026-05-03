import { Link } from "react-router-dom";

export default function ProjectNav({
  prev = null, // { path: "/project-1", label: "Project 1" }
  next = null, // { path: "/project-2", label: "Project 2" }
}) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="font-antic-didone text-black w-full mt-24 mb-16">
      <div className="max-w-[1200px] mx-auto flex items-center justify-start">
        {/* Previous */}
        <div className="flex-1">
          {prev ? (
            <Link to={prev.path} className="group inline-block">
              <div className="text-xs opacity-50 leading-none">← Previous</div>
              <div className="text-sm relative inline-block">
                {prev.label}
                <span className="absolute left-0 -bottom-0 h-[1px] w-0 bg-current transition-all duration-150 group-hover:w-full" />
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Scroll to top */}
        <div className="flex-shrink-0">
          <button
            onClick={scrollToTop}
            className="text-sm opacity-60 hover:opacity-100 transition cursor-pointer"
          >
            ↑ Top
          </button>
        </div>

        {/* Next */}
        <div className="flex-1 text-right">
          {next ? (
            <Link to={next.path} className="group inline-block">
              <div className="text-xs opacity-50 leading-none">Next →</div>
              <div className="text-sm relative inline-block">
                {next.label}
                <span className="absolute left-0 -bottom-0 h-[1px] w-0 bg-current transition-all duration-150 group-hover:w-full text-gray-400" />
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
