import React, { useState, useEffect, useContext } from "react";
import { navbarData } from "../../DataForPage/dummyData";
import logoLight from "../../../../../assets/images/logoL.svg";
import logoDark from "../../../../../assets/images/logoD.svg";
import { Link } from "react-scroll";
import { ThemeBgContext } from "../ContextWrapper/ThemeContext";

const Navbar = () => {
  const { theme } = useContext(ThemeBgContext);
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    setScroll(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoSrc = theme === 'dark' ? logoDark : logoLight;

  return (
    <div>
      <div
        className={`sm:hidden h-16 w-full fixed transition ease-in-out duration-500 flex items-center z-20 ${
          scroll
            ? "bg-white bg-opacity-40 rounded-sm backdrop-filter backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <div className="grid grid-cols-2 justify-items-center items-center content-center w-full">
          <div className="pl-20 w-4/5">
            <img
              src={logoSrc}
              alt="Logo"
              className="h-20 cursor-pointer"
            />
          </div>
          <div className="flex flex-row items-center w-full">
            {navbarData.map((item) => (
              <div key={item.id}>
                <Link
                  to={item.link}
                  spy={true}
                  smooth={true}
                  hashSpy={true}
                  offset={50}
                  duration={500}
                  isDynamic={true}
                  ignoreCancelEvents={false}
                  spyThrottle={500}
                  className={`cursor-pointer font-inter text-lg font-medium tracking-tight py-1 px-2 hover:text-blue-500 ${
                    theme === "light" ? "text-black" : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
