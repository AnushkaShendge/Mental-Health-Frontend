import React, { useContext } from "react";
import header1 from "../../../../../assets/images/headerImage.png";
import { Switch } from "@material-tailwind/react";
import { ThemeBgContext } from "../ContextWrapper/ThemeContext";
import { useNavigate } from "react-router-dom";

const Header = ({ topRef }) => {
  const { theme, handleTheme } = useContext(ThemeBgContext);
  const navigate = useNavigate();

  return (
    <div ref={topRef} className="mx-auto pt-16">
      <div className="sm:grid-cols-1 grid grid-cols-2 justify-items-center items-center">
        <div className="sm:w-full sm:pl-4 w-4/5 pl-24">
          <Switch
            label={theme === "light" ? "Switch to Dark" : "Switch to Light"}
            defaultChecked={theme === "dark"}
            onClick={handleTheme}
          />
          <h1
            className={
              theme === "light"
                ? "sm:text-3xl text-5xl font-russonOne font-medium no-underline align-middle tracking-wide normal-case leading-normal text-black"
                : "sm:text-3xl text-5xl font-russonOne font-medium no-underline align-middle tracking-wide normal-case leading-normal text-white"
            }
          >
            {" "} 
            <span
              className={
                theme === "light"
                  ? "sm:text-4xl text-black text-6xl font-petitFormal font-bold"
                  : "sm:text-4xl text-white text-6xl font-petitFormal font-bold"
              }
            >
               Welcome to WellCare
            </span>{" "}
          </h1>
          <div className="mt-4">
            <p
              className={
                theme === "light"
                  ? "sm:text-lg w-4/5 font-inter font-medium no-underline align-middle tracking-wide normal-case text-black text-2xl"
                  : "sm:text-lg w-4/5 font-inter font-medium no-underline align-middle tracking-wide normal-case text-white text-2xl"
              }
            >
              Prioritize your mental health with our all-in-one application. 
              Engage in meditation, quizzes, games, and blogs 
              to enhance your well-being every day.
            </p>
          </div>
          <div className="pb-20">
            <button className="pushable mt-4" onClick={() => navigate("/login")}>
              <span className="front">Get Started</span>
            </button>
          </div>
        </div>
        <div className="sm:pl-4 mt-4">
          <div>
            <h2
              className={
                theme === "light"
                  ? "sm:text-3xl text-5xl pb-4 font-russonOne font-medium no-underline align-middle tracking-wide normal-case leading-normal text-black"
                  : "sm:text-3xl text-5xl pb-4 font-russonOne font-medium no-underline align-middle tracking-wide normal-case leading-normal text-white"
              }
            >
              
            Enhance Your Well-Being
            </h2>
          </div>
          <img
            className="sm:h-[475px] h-[765px] w-fullb bg-no-repeat bg-center relative z-10 header rounded-xl"
            src={header1}
            alt="header-phone"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
